import React, { useState } from 'react'
import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { Dumbbell } from 'lucide-react-native'
import Svg, { Path } from 'react-native-svg'
import { useAuth } from '../src/context/AuthContext'
import { useLocation } from '../src/context/LocationContext'
import { useDevState } from '../src/context/DevStateContext'
import { softShadow } from '../src/theme/shadows'

export default function LoginScreen() {
  const { signIn, isLoading, error } = useAuth()
  const { hasPromptedLocation, openLocationSheet } = useLocation()
  const { forceLoginError } = useDevState()
  const router = useRouter()
  const [localError, setLocalError] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
    setLocalError(null)
    try {
      await signIn(forceLoginError)
      if (!hasPromptedLocation) {
        openLocationSheet()
      }
      router.replace('/home' as any)
    } catch (err: any) {
      setLocalError(err.message || 'Sign in did not work. Please try again.')
    }
  }

  const displayedError = localError || error

  return (
    <View className="flex-1 bg-slate-50 items-center justify-center p-4 sm:p-6">
      <View
        style={[softShadow, { borderRadius: 24 }]}
        className="w-full max-w-form bg-white border border-black/[0.04] p-6 sm:p-8 items-center"
      >
        {/* Logo */}
        <View className="w-14 h-14 rounded-2xl bg-brand items-center justify-center mb-5 shadow-sm">
          <Dumbbell size={28} color="#FFFFFF" />
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-slate-900 tracking-tight mb-2 text-center">
          Welcome to GymApp
        </Text>

        {/* Subtitle */}
        <Text className="text-sm text-slate-500 mb-8 max-w-xs text-center leading-relaxed">
          Sign in to find gyms near you and manage your plan.
        </Text>

        {/* Continue with Google Button */}
        <Pressable
          onPress={handleGoogleLogin}
          disabled={isLoading}
          className="w-full h-12 bg-white active:bg-slate-50 rounded-xl border border-slate-200/90 shadow-xs flex-row items-center justify-center gap-3 active:scale-[0.98]"
          accessibilityRole="button"
          accessibilityLabel="Continue with Google"
        >
          {isLoading ? (
            <View className="flex-row items-center gap-2">
              <ActivityIndicator size="small" color="#2563EB" />
              <Text className="text-sm font-medium text-slate-700">Signing in...</Text>
            </View>
          ) : (
            <View className="flex-row items-center gap-3">
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
              <Text className="text-slate-900 font-semibold text-sm">
                Continue with Google
              </Text>
            </View>
          )}
        </Pressable>

        {/* Error State */}
        {displayedError && (
          <Text className="text-xs text-rose-600 font-medium mt-3 text-center">
            {displayedError}
          </Text>
        )}

        {/* Disclaimer */}
        <Text className="text-xs text-slate-400 mt-8 text-center leading-relaxed">
          By continuing you agree to the Terms and Privacy Policy. Valid across participating gym clubs in Ludhiana.
        </Text>
      </View>
    </View>
  )
}
