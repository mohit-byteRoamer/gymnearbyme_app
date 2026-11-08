import React, { useState } from 'react'
import { View, Text, Pressable, ScrollView, Platform, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Phone, Compass } from 'lucide-react-native'
import { PhotoMosaic } from '../components/PhotoMosaic'
import { GoogleButton } from '../components/GoogleButton'
import { GoogleButtonState } from '../types'

interface HeroLoginScreenProps {
  buttonState?: GoogleButtonState
  onGoogleSignIn?: () => void
  onPhoneSignIn?: () => void
  onGuestExplore?: () => void
  enablePhoneAuth?: boolean
  onSupportPress?: () => void
  onTermsPress?: () => void
  onPrivacyPress?: () => void
}

export function HeroLoginScreen({
  buttonState = 'default',
  onGoogleSignIn,
  onPhoneSignIn,
  onGuestExplore,
  enablePhoneAuth = true, // Both Google and Phone login options present by default
  onSupportPress,
  onTermsPress,
  onPrivacyPress,
}: HeroLoginScreenProps) {
  const insets = useSafeAreaInsets()
  // Ensure Android and iOS status bar has clean spacing and never clashes with photos
  const topInset = Math.max(insets.top, Platform.OS === 'android' ? 24 : 0)

  const [isPhonePressed, setIsPhonePressed] = useState(false)
  const [isGuestPressed, setIsGuestPressed] = useState(false)

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

      {/* Top Status Bar Protected Zone */}
      <View
        style={{
          height: topInset,
          backgroundColor: '#FFFFFF',
          width: '100%',
        }}
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Photo Mosaic with Clean Top Spacing */}
        <View style={{ height: 340, width: '100%' }}>
          <PhotoMosaic height={340} topPadding={8} />
        </View>

        {/* White background below: Main content */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 24,
            paddingTop: 18,
            paddingBottom: 24,
            justifyContent: 'space-between',
          }}
        >
          {/* Headline & Subtext */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 28,
                fontWeight: '700',
                color: '#0F172A',
                lineHeight: 34,
                letterSpacing: -0.5,
              }}
            >
              Find your gym.{'\n'}Join in minutes.
            </Text>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: '400',
                color: '#64748B',
                lineHeight: 22,
                marginTop: 6,
              }}
            >
              Sign in to find gyms near you and manage your plan.
            </Text>
          </View>

          {/* Action Buttons: Google + Phone Login + Guest Option */}
          <View style={{ gap: 10 }}>
            {/* Primary Action: Google Button */}
            <GoogleButton
              state={buttonState}
              onPress={onGoogleSignIn}
            />

            {/* Phone Login Option */}
            {enablePhoneAuth && (
              <>
                {/* Divider "or" between primary and phone login */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 2,
                    width: '100%',
                  }}
                >
                  <View style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }} />
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 13,
                      color: '#94A3B8',
                      fontWeight: '400',
                      marginHorizontal: 12,
                    }}
                  >
                    or
                  </Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: '#E2E8F0' }} />
                </View>

                {/* Secondary Button: Continue with phone number */}
                <View style={{ width: '100%' }}>
                  <Pressable
                    onPress={onPhoneSignIn}
                    onPressIn={() => setIsPhonePressed(true)}
                    onPressOut={() => setIsPhonePressed(false)}
                    style={[
                      styles.actionButton,
                      {
                        backgroundColor: isPhonePressed ? '#F8FAFC' : '#FFFFFF',
                        borderColor: isPhonePressed ? '#CBD5E1' : '#E2E8F0',
                      },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel="Continue with phone number"
                  >
                    <View style={styles.actionButtonContent}>
                      <Phone size={18} color="#0F172A" style={{ marginRight: 10 }} />
                      <Text style={styles.actionButtonText}>
                        Continue with phone number
                      </Text>
                    </View>
                  </Pressable>
                </View>
              </>
            )}

            {/* Guest Option Button: Explore without login */}
            {onGuestExplore && (
              <View style={{ width: '100%', marginTop: 2 }}>
                <Pressable
                  onPress={onGuestExplore}
                  onPressIn={() => setIsGuestPressed(true)}
                  onPressOut={() => setIsGuestPressed(false)}
                  style={[
                    styles.guestButton,
                    {
                      backgroundColor: isGuestPressed ? '#EFF6FF' : '#F8FAFC',
                      borderColor: isGuestPressed ? '#BFDBFE' : '#E2E8F0',
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel="Explore as Guest"
                >
                  <View style={styles.actionButtonContent}>
                    <Compass size={18} color="#2563EB" style={{ marginRight: 8 }} />
                    <Text style={styles.guestButtonText}>
                      Explore as Guest
                    </Text>
                  </View>
                </Pressable>
              </View>
            )}

            {/* Helper reassurance */}
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 13,
                fontWeight: '400',
                color: '#64748B',
                textAlign: 'center',
                marginTop: 2,
              }}
            >
              We only use your name and email.
            </Text>

            {/* Terms and Privacy policy */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 12,
                  color: '#64748B',
                  lineHeight: 18,
                }}
              >
                By continuing you agree to our{' '}
              </Text>
              <Pressable onPress={onTermsPress}>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 12,
                    color: '#2563EB',
                    fontWeight: '500',
                    lineHeight: 18,
                  }}
                >
                  Terms
                </Text>
              </Pressable>
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 12,
                  color: '#64748B',
                  lineHeight: 18,
                }}
              >
                {' '}and{' '}
              </Text>
              <Pressable onPress={onPrivacyPress}>
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 12,
                    color: '#2563EB',
                    fontWeight: '500',
                    lineHeight: 18,
                  }}
                >
                  Privacy Policy
                </Text>
              </Pressable>
            </View>

            {/* Contact Support */}
            <Pressable
              onPress={onSupportPress}
              style={{ marginTop: 4, alignItems: 'center' }}
            >
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 13,
                  fontWeight: '500',
                  color: '#64748B',
                }}
              >
                Need help? Contact support
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  actionButton: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
  },
  guestButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  guestButtonText: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '600',
    color: '#2563EB',
  },
})
