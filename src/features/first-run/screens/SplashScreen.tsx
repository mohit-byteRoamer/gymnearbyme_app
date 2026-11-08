import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { AppLogoMark } from '../components/AppLogoMark'

interface SplashScreenProps {
  onContinue?: () => void
}

export function SplashScreen({ onContinue }: SplashScreenProps) {
  return (
    <Pressable
      onPress={onContinue}
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
      accessibilityRole="button"
      accessibilityLabel="GymApp Splash Screen"
    >
      {/* Centered blue rounded-square logo mark (96px, simple dumbbell, flat, white glyph) */}
      <AppLogoMark size={96} />

      {/* App Name */}
      <Text
        style={{
          fontFamily: 'Roboto',
          fontSize: 28,
          fontWeight: '700',
          color: '#0F172A',
          letterSpacing: -0.5,
          marginTop: 24,
          lineHeight: 34,
        }}
      >
        GymApp
      </Text>

      {/* Small muted tagline */}
      <Text
        style={{
          fontFamily: 'Roboto',
          fontSize: 16,
          fontWeight: '400',
          color: '#64748B',
          marginTop: 8,
          lineHeight: 22,
          textAlign: 'center',
        }}
      >
        Find your gym. Join in minutes.
      </Text>
    </Pressable>
  )
}

