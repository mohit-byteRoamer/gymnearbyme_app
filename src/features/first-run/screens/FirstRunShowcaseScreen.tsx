import React, { useState } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { FirstRunDeviceFrame } from '../components/FirstRunDeviceFrame'
import { SplashScreen } from './SplashScreen'
import { WalkthroughScreen } from './WalkthroughScreen'
import { HeroLoginScreen } from './HeroLoginScreen'
import { CompleteProfileScreen } from './CompleteProfileScreen'
import { PhoneEntryScreen } from './PhoneEntryScreen'
import { OtpVerificationScreen } from './OtpVerificationScreen'
import { FirstRunScreenId, GoogleButtonState, ViewportMode } from '../types'

export function FirstRunShowcaseScreen() {
  const router = useRouter()
  const [activeScreen, setActiveScreen] = useState<FirstRunScreenId>('login')
  const [viewportMode, setViewportMode] = useState<ViewportMode>('side-by-side')
  const [googleState, setGoogleState] = useState<GoogleButtonState>('default')
  const [enablePhoneVariant, setEnablePhoneVariant] = useState(false)
  const [isOtpError, setIsOtpError] = useState(false)

  // Render chosen screen component
  const renderScreenContent = (screenId: FirstRunScreenId) => {
    switch (screenId) {
      case 'splash':
        return <SplashScreen onContinue={() => setActiveScreen('walkthrough-1')} />
      case 'walkthrough-1':
        return (
          <WalkthroughScreen
            initialSlide={0}
            onComplete={() => setActiveScreen('login')}
            onSkip={() => setActiveScreen('login')}
          />
        )
      case 'walkthrough-2':
        return (
          <WalkthroughScreen
            initialSlide={1}
            onComplete={() => setActiveScreen('login')}
            onSkip={() => setActiveScreen('login')}
          />
        )
      case 'walkthrough-3':
        return (
          <WalkthroughScreen
            initialSlide={2}
            onComplete={() => setActiveScreen('login')}
          />
        )
      case 'login':
        return (
          <HeroLoginScreen
            buttonState={googleState}
            enablePhoneAuth={true}
            onGoogleSignIn={() => {
              setGoogleState('loading')
              setTimeout(() => {
                setGoogleState('default')
                setActiveScreen('complete-profile')
              }, 800)
            }}
            onPhoneSignIn={() => setActiveScreen('phone-entry')}
            onGuestExplore={() => router.replace('/home' as any)}
          />
        )
      case 'complete-profile':
        return (
          <CompleteProfileScreen
            initialFirstName="Amritpal"
            initialLastName="Singh"
            onBack={() => setActiveScreen('login')}
            onSubmit={() => router.replace('/home' as any)}
          />
        )
      case 'phone-entry':
        return (
          <PhoneEntryScreen
            onBack={() => setActiveScreen('login')}
            onSendOtp={() => setActiveScreen('otp-verification')}
          />
        )
      case 'otp-verification':
        return (
          <OtpVerificationScreen
            phoneNumber="98765 43210"
            isError={isOtpError}
            onBack={() => setActiveScreen('phone-entry')}
            onVerify={() => setActiveScreen('complete-profile')}
          />
        )
    }
  }

  const screenOptions: { id: FirstRunScreenId; label: string }[] = [
    { id: 'splash', label: '1. Splash' },
    { id: 'walkthrough-1', label: '2. Slide 1' },
    { id: 'walkthrough-2', label: '3. Slide 2' },
    { id: 'walkthrough-3', label: '4. Slide 3' },
    { id: 'login', label: '5. Login (Hero)' },
    { id: 'complete-profile', label: '6. Name Prompt' },
    { id: 'phone-entry', label: '7. Phone (Var)' },
    { id: 'otp-verification', label: '8. OTP (Var)' },
  ]

  const googleStates: GoogleButtonState[] = ['default', 'pressed', 'loading', 'error', 'offline']

  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      {/* Sticky Header / Controls Toolbar */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#E2E8F0',
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 10,
          }}
        >
          {/* Title & Brand */}
          <View>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 18,
                fontWeight: '700',
                color: '#0F172A',
              }}
            >
              GymApp • First-Run Design System
            </Text>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 12,
                color: '#64748B',
                marginTop: 2,
              }}
            >
              Roboto • One Blue #2563EB • Flat White Cards • No Shadows • No Emoji • 8pt Grid
            </Text>
          </View>

          {/* Viewport Selectors */}
          <View style={{ flexDirection: 'row', gap: 6 }}>
            {(['390x844', '360x640', 'side-by-side'] as ViewportMode[]).map((mode) => {
              const isSelected = viewportMode === mode
              return (
                <Pressable
                  key={mode}
                  onPress={() => setViewportMode(mode)}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 6,
                    backgroundColor: isSelected ? '#2563EB' : '#FFFFFF',
                    borderWidth: 1,
                    borderColor: isSelected ? '#2563EB' : '#E2E8F0',
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      fontSize: 12,
                      fontWeight: '600',
                      color: isSelected ? '#FFFFFF' : '#475569',
                    }}
                  >
                    {mode === '390x844'
                      ? '390 × 844'
                      : mode === '360x640'
                      ? '360 × 640'
                      : 'Side-by-Side'}
                  </Text>
                </Pressable>
              )
            })}
          </View>
        </View>

        {/* Screen Switcher Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingVertical: 4 }}
        >
          {screenOptions.map((opt) => {
            const isSelected = activeScreen === opt.id
            return (
              <Pressable
                key={opt.id}
                onPress={() => setActiveScreen(opt.id)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 7,
                  borderRadius: 8,
                  backgroundColor: isSelected ? '#0F172A' : '#FFFFFF',
                  borderWidth: 1,
                  borderColor: isSelected ? '#0F172A' : '#E2E8F0',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 13,
                    fontWeight: '600',
                    color: isSelected ? '#FFFFFF' : '#334155',
                  }}
                >
                  {opt.label}
                </Text>
              </Pressable>
            )
          })}
        </ScrollView>

        {/* Dynamic Context Controls */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            marginTop: 10,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: '#F1F5F9',
          }}
        >
          {activeScreen === 'login' && (
            <>
              {/* Google Button States */}
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ fontFamily: 'Roboto', fontSize: 12, color: '#64748B', fontWeight: '500' }}>
                  Button State:
                </Text>
                {googleStates.map((st) => (
                  <Pressable
                    key={st}
                    onPress={() => setGoogleState(st)}
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                      backgroundColor: googleState === st ? '#EFF6FF' : '#FFFFFF',
                      borderWidth: 1,
                      borderColor: googleState === st ? '#2563EB' : '#E2E8F0',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'Roboto',
                        fontSize: 11,
                        fontWeight: '600',
                        color: googleState === st ? '#2563EB' : '#64748B',
                      }}
                    >
                      {st}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {/* Feature Flag: Phone Login Variant */}
              <Pressable
                onPress={() => setEnablePhoneVariant(!enablePhoneVariant)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 6,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 6,
                  backgroundColor: enablePhoneVariant ? '#EFF6FF' : '#FFFFFF',
                  borderWidth: 1,
                  borderColor: enablePhoneVariant ? '#2563EB' : '#E2E8F0',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'Roboto',
                    fontSize: 11,
                    fontWeight: '600',
                    color: enablePhoneVariant ? '#2563EB' : '#475569',
                  }}
                >
                  Feature Flag: Phone Auth ({enablePhoneVariant ? 'ON' : 'OFF'})
                </Text>
              </Pressable>
            </>
          )}

          {activeScreen === 'otp-verification' && (
            <Pressable
              onPress={() => setIsOtpError(!isOtpError)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 6,
                backgroundColor: isOtpError ? '#FEF2F2' : '#FFFFFF',
                borderWidth: 1,
                borderColor: isOtpError ? '#EF4444' : '#E2E8F0',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 11,
                  fontWeight: '600',
                  color: isOtpError ? '#B91C1C' : '#475569',
                }}
              >
                Toggle OTP Error State ({isOtpError ? 'Triggered' : 'Normal'})
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Main Showcase Canvas */}
      <ScrollView
        contentContainerStyle={{
          padding: 24,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 32,
        }}
      >
        {viewportMode === 'side-by-side' ? (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              justifyContent: 'center',
              gap: 36,
            }}
          >
            {/* Standard iPhone 390x844 */}
            <FirstRunDeviceFrame
              width={390}
              height={844}
              label="Standard Viewport (iPhone 14/15)"
            >
              {renderScreenContent(activeScreen)}
            </FirstRunDeviceFrame>

            {/* Small Android 360x640 */}
            <FirstRunDeviceFrame
              width={360}
              height={640}
              label="Small Screen Viewport (Compact Check)"
            >
              {renderScreenContent(activeScreen)}
            </FirstRunDeviceFrame>
          </View>
        ) : viewportMode === '390x844' ? (
          <FirstRunDeviceFrame
            width={390}
            height={844}
            label="Standard Viewport (iPhone 14/15)"
          >
            {renderScreenContent(activeScreen)}
          </FirstRunDeviceFrame>
        ) : (
          <FirstRunDeviceFrame
            width={360}
            height={640}
            label="Small Screen Viewport (Compact Check)"
          >
            {renderScreenContent(activeScreen)}
          </FirstRunDeviceFrame>
        )}
      </ScrollView>
    </View>
  )
}

