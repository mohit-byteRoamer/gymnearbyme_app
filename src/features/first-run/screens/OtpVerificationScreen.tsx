import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, Pressable, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { ArrowLeft } from 'lucide-react-native'

interface OtpVerificationScreenProps {
  phoneNumber?: string
  onBack?: () => void
  onVerify?: (otp: string) => void
  isError?: boolean
}

export function OtpVerificationScreen({
  phoneNumber = '98765 43210',
  onBack,
  onVerify,
  isError: initialError = false,
}: OtpVerificationScreenProps) {
  const insets = useSafeAreaInsets()
  const topInset = Math.max(insets.top, Platform.OS === 'android' ? 24 : 0)

  const [otp, setOtp] = useState(['', '', '', ''])
  const [secondsLeft, setSecondsLeft] = useState(30)
  const [isError, setIsError] = useState(initialError)

  const inputRefs = [
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
    useRef<any>(null),
  ]

  useEffect(() => {
    setIsError(initialError)
  }, [initialError])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const timer = setInterval(() => {
      setSecondsLeft((s) => s - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [secondsLeft])

  const handleOtpChange = (text: string, index: number) => {
    setIsError(false)
    const cleaned = text.replace(/\D/g, '')

    if (cleaned.length > 1) {
      // Pasted full 4 digits
      const digits = cleaned.slice(0, 4).split('')
      const nextOtp = [...otp]
      digits.forEach((d, i) => {
        nextOtp[i] = d
      })
      setOtp(nextOtp)
      inputRefs[Math.min(digits.length, 3)].current?.focus()
      return
    }

    const nextOtp = [...otp]
    nextOtp[index] = cleaned
    setOtp(nextOtp)

    if (cleaned && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const isComplete = otp.every((d) => d.length === 1)

  const handleVerify = () => {
    const code = otp.join('')
    if (code === '0000') {
      setIsError(true)
    } else {
      onVerify?.(code)
    }
  }

  const formattedTimer = `0:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}
    >
      <StatusBar style="dark" />

      {/* Top Safe Area Protection */}
      <View style={{ height: topInset, backgroundColor: '#FFFFFF', width: '100%' }} />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 8,
          paddingBottom: 24,
          justifyContent: 'space-between',
        }}
      >
      <View>
        {/* Top Back Arrow */}
        <Pressable
          onPress={onBack}
          hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
          style={{ width: 40, height: 40, justifyContent: 'center' }}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <ArrowLeft size={24} color="#0F172A" />
        </Pressable>

        {/* Title & Helper */}
        <View style={{ marginTop: 24 }}>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 28,
              fontWeight: '700',
              color: '#0F172A',
              letterSpacing: -0.5,
              lineHeight: 34,
            }}
          >
            Enter 4-digit code
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 16,
              fontWeight: '400',
              color: '#64748B',
              lineHeight: 22,
              marginTop: 8,
            }}
          >
            Code sent to +91 {phoneNumber}
          </Text>
        </View>

        {/* 4 OTP boxes 56x56 radius 8 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 32,
            gap: 12,
          }}
        >
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={inputRefs[idx]}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, idx)}
              onKeyPress={(e) => handleKeyPress(e, idx)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                borderWidth: isError ? 1.5 : digit ? 2 : 1,
                borderColor: isError ? '#EF4444' : digit ? '#2563EB' : '#E2E8F0',
                backgroundColor: '#FFFFFF',
                fontFamily: 'Roboto',
                fontSize: 22,
                fontWeight: '700',
                color: isError ? '#B91C1C' : '#0F172A',
              }}
            />
          ))}
        </View>

        {/* Error State */}
        {isError && (
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 14,
              fontWeight: '500',
              color: '#B91C1C',
              marginTop: 12,
              textAlign: 'center',
            }}
          >
            That OTP is not correct
          </Text>
        )}

        {/* Resend Timer */}
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          {secondsLeft > 0 ? (
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 14,
                fontWeight: '500',
                color: '#64748B',
              }}
            >
              Resend in {formattedTimer}
            </Text>
          ) : (
            <Pressable onPress={() => setSecondsLeft(30)}>
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#2563EB',
                }}
              >
                Resend code
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Primary Button "Verify" */}
      <View>
        <Pressable
          onPress={handleVerify}
          disabled={!isComplete}
          style={{
            width: '100%',
            height: 48,
            borderRadius: 12,
            backgroundColor: isComplete ? '#2563EB' : '#94A3B8',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          accessibilityRole="button"
          accessibilityLabel="Verify OTP"
        >
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 16,
              fontWeight: '600',
              color: '#FFFFFF',
            }}
          >
            Verify
          </Text>
        </Pressable>
      </View>
    </View>
  </View>
  )
}
