import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { ArrowLeft, ShieldCheck } from 'lucide-react-native'

interface CompleteProfileScreenProps {
  initialFirstName?: string
  initialLastName?: string
  onBack?: () => void
  onSubmit: (firstName: string, lastName: string) => void
}

export function CompleteProfileScreen({
  initialFirstName = '',
  initialLastName = '',
  onBack,
  onSubmit,
}: CompleteProfileScreenProps) {
  const insets = useSafeAreaInsets()
  const topInset = Math.max(insets.top, Platform.OS === 'android' ? 24 : 0)

  const [firstName, setFirstName] = useState(initialFirstName)
  const [lastName, setLastName] = useState(initialLastName)
  const [focusedField, setFocusedField] = useState<'first' | 'last' | null>(null)

  const isValid = firstName.trim().length >= 1

  const handleContinue = () => {
    if (isValid) {
      onSubmit(firstName.trim(), lastName.trim())
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

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
            paddingHorizontal: 24,
            paddingTop: 8,
            paddingBottom: 24,
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header & Inputs */}
          <View>
            {/* Top Navigation */}
            {onBack && (
              <Pressable
                onPress={onBack}
                hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
                style={{ width: 40, height: 40, justifyContent: 'center' }}
                accessibilityRole="button"
                accessibilityLabel="Back"
              >
                <ArrowLeft size={24} color="#0F172A" />
              </Pressable>
            )}

            {/* Headline & Subtext */}
            <View style={{ marginTop: onBack ? 16 : 24 }}>
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
                What's your name?
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
                Enter your name to complete your GymApp profile.
              </Text>
            </View>

            {/* Form Fields: First Name and Second Name */}
            <View style={{ marginTop: 32, gap: 20 }}>
              {/* First Name Field */}
              <View>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#0F172A',
                    marginBottom: 8,
                  }}
                >
                  First name
                </Text>
                <View
                  style={{
                    height: 52,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: focusedField === 'first' ? '#2563EB' : '#E2E8F0',
                    backgroundColor: '#FFFFFF',
                    paddingHorizontal: 16,
                    justifyContent: 'center',
                  }}
                >
                  <TextInput
                    value={firstName}
                    onChangeText={setFirstName}
                    placeholder="e.g. Amritpal"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="words"
                    autoFocus
                    onFocus={() => setFocusedField('first')}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#0F172A',
                      paddingVertical: 0,
                    }}
                  />
                </View>
              </View>

              {/* Second Name / Last Name Field */}
              <View>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#0F172A',
                    marginBottom: 8,
                  }}
                >
                  Second name (Last name)
                </Text>
                <View
                  style={{
                    height: 52,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: focusedField === 'last' ? '#2563EB' : '#E2E8F0',
                    backgroundColor: '#FFFFFF',
                    paddingHorizontal: 16,
                    justifyContent: 'center',
                  }}
                >
                  <TextInput
                    value={lastName}
                    onChangeText={setLastName}
                    placeholder="e.g. Singh"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="words"
                    onFocus={() => setFocusedField('last')}
                    onBlur={() => setFocusedField(null)}
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 16,
                      fontWeight: '500',
                      color: '#0F172A',
                      paddingVertical: 0,
                    }}
                  />
                </View>
              </View>

              {/* Reassurance Notice */}
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderColor: '#E2E8F0',
                  borderRadius: 10,
                  padding: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 4,
                }}
              >
                <ShieldCheck size={18} color="#2563EB" />
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 12,
                    color: '#64748B',
                    lineHeight: 18,
                    flex: 1,
                  }}
                >
                  Your name will appear on your verified gym entry pass and QR vouchers.
                </Text>
              </View>
            </View>
          </View>

          {/* Primary Action Button */}
          <View style={{ marginTop: 24 }}>
            <Pressable
              onPress={handleContinue}
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
              accessibilityLabel="Continue"
            >
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#FFFFFF',
                }}
              >
                Continue
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
