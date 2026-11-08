import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { ArrowLeft } from 'lucide-react-native'
import { IndiaFlagIcon } from '../components/IndiaFlagIcon'

interface PhoneEntryScreenProps {
  onBack?: () => void
  onSendOtp?: (phone: string) => void
}

export function PhoneEntryScreen({ onBack, onSendOtp }: PhoneEntryScreenProps) {
  const insets = useSafeAreaInsets()
  const topInset = Math.max(insets.top, Platform.OS === 'android' ? 24 : 0)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const isValid = phoneNumber.replace(/\D/g, '').length >= 10

  const handleSend = () => {
    if (isValid) {
      onSendOtp?.(phoneNumber)
    }
  }

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
      {/* Top Bar with Back Arrow */}
      <View>
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
            Enter your phone number
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
            We will send you a 4-digit OTP
          </Text>
        </View>

        {/* +91 Field with India Flag */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 52,
            borderWidth: 1,
            borderColor: isFocused ? '#2563EB' : '#E2E8F0',
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 14,
            marginTop: 32,
            gap: 10,
          }}
        >
          {/* Flag and Country Code */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <IndiaFlagIcon />
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: '600',
                color: '#0F172A',
              }}
            >
              +91
            </Text>
            <View style={{ width: 1, height: 20, backgroundColor: '#E2E8F0', marginLeft: 4 }} />
          </View>

          {/* Number Input */}
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="98765 43210"
            placeholderTextColor="#94A3B8"
            keyboardType="phone-pad"
            maxLength={10}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              flex: 1,
              fontFamily: 'Roboto',
              fontSize: 16,
              fontWeight: '500',
              color: '#0F172A',
              paddingVertical: 0,
            }}
          />
        </View>
      </View>

      {/* Primary Button "Send OTP" */}
      <View>
        <Pressable
          onPress={handleSend}
          disabled={!isValid}
          style={{
            width: '100%',
            height: 48,
            borderRadius: 12,
            backgroundColor: isValid ? '#2563EB' : '#94A3B8',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          accessibilityRole="button"
          accessibilityLabel="Send OTP"
        >
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 16,
              fontWeight: '600',
              color: '#FFFFFF',
            }}
          >
            Send OTP
          </Text>
        </Pressable>
      </View>
    </View>
  </View>
  )
}

