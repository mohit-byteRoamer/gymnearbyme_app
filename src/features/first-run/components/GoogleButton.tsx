import React, { useState } from 'react'
import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { GoogleButtonState } from '../types'

interface GoogleButtonProps {
  state?: GoogleButtonState
  onPress?: () => void
  disabled?: boolean
  errorMessage?: string
  offlineMessage?: string
}

export function GoogleButton({
  state = 'default',
  onPress,
  disabled = false,
  errorMessage = 'Sign in did not work. Please try again.',
  offlineMessage = 'You are offline. Check your internet and try again.',
}: GoogleButtonProps) {
  const [isLocallyPressed, setIsLocallyPressed] = useState(false)

  const isLoading = state === 'loading'
  const isError = state === 'error'
  const isOffline = state === 'offline'
  const isForcedPressed = state === 'pressed'

  const isPressed = isLocallyPressed || isForcedPressed

  return (
    <View style={{ width: '100%' }}>
      {/* Offline Banner */}
      {isOffline && (
        <View
          style={{
            backgroundColor: '#FFFBEB',
            borderWidth: 1,
            borderColor: '#FDE68A',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 14,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 13,
              fontWeight: '500',
              color: '#B45309',
              textAlign: 'center',
              lineHeight: 18,
            }}
          >
            {offlineMessage}
          </Text>
        </View>
      )}

      {/* Error Banner */}
      {isError && (
        <View
          style={{
            backgroundColor: '#FEF2F2',
            borderWidth: 1,
            borderColor: '#FECACA',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 14,
            marginBottom: 12,
          }}
        >
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 13,
              fontWeight: '500',
              color: '#B91C1C',
              textAlign: 'center',
              lineHeight: 18,
            }}
          >
            {errorMessage}
          </Text>
        </View>
      )}

      {/* Main Google Button */}
      <Pressable
        onPress={onPress}
        disabled={disabled || isLoading}
        onPressIn={() => setIsLocallyPressed(true)}
        onPressOut={() => setIsLocallyPressed(false)}
        style={{
          width: '100%',
          height: 52,
          borderRadius: 12,
          backgroundColor: isPressed ? '#F8FAFC' : '#FFFFFF',
          borderWidth: 1,
          borderColor: isPressed ? '#CBD5E1' : '#E2E8F0',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16,
          gap: 12,
        }}
        accessibilityRole="button"
        accessibilityLabel="Continue with Google"
      >
        {isLoading ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <ActivityIndicator size="small" color="#2563EB" />
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: '500',
                color: '#0F172A',
              }}
            >
              Signing in...
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Svg width={20} height={20} viewBox="0 0 24 24">
              <Path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <Path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <Path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <Path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </Svg>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: '500',
                color: '#0F172A',
              }}
            >
              Continue with Google
            </Text>
          </View>
        )}
      </Pressable>
    </View>
  )
}

