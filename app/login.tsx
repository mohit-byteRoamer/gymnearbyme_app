import '../global.css'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { HeroLoginScreen } from '../src/features/first-run/screens/HeroLoginScreen'
import { useAuth } from '../src/context/AuthContext'
import { useLocation } from '../src/context/LocationContext'
import { useDevState } from '../src/context/DevStateContext'
import { GoogleButtonState } from '../src/features/first-run/types'
import { useToast } from '../src/context/ToastContext'

export default function LoginRoute() {
  const router = useRouter()
  const { signIn, continueAsGuest, isLoading, error, isFirstTimeUser } = useAuth()
  const { hasPromptedLocation, openLocationSheet } = useLocation()
  const { isOffline, forceLoginError } = useDevState()
  const { showToast } = useToast()
  const [localError, setLocalError] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
    if (isOffline) {
      showToast('You are offline. Check your internet connection.')
      return
    }

    setLocalError(null)
    try {
      const result = await signIn(forceLoginError, isFirstTimeUser)
      if (result.isFirstTime || !result.user.hasCompletedProfile) {
        // First-time user: collect first name and second name
        router.push('/complete-profile' as any)
      } else {
        if (!hasPromptedLocation) {
          openLocationSheet()
        }
        router.replace('/home' as any)
      }
    } catch (err: any) {
      setLocalError(err.message || 'Sign in did not work. Please try again.')
    }
  }

  const handleGuestExplore = () => {
    continueAsGuest()
    if (!hasPromptedLocation) {
      openLocationSheet()
    }
    showToast('Exploring GymApp as Guest. Welcome!')
    router.replace('/home' as any)
  }

  // Derive GoogleButtonState
  let buttonState: GoogleButtonState = 'default'
  if (isOffline) {
    buttonState = 'offline'
  } else if (isLoading) {
    buttonState = 'loading'
  } else if (localError || error || forceLoginError) {
    buttonState = 'error'
  }

  return (
    <HeroLoginScreen
      buttonState={buttonState}
      enablePhoneAuth={true} // Both Google login and Phone login options always active
      onGoogleSignIn={handleGoogleLogin}
      onPhoneSignIn={() => router.push('/phone-login' as any)}
      onGuestExplore={handleGuestExplore}
      onSupportPress={() => showToast('Support is available 24/7 at support@gymapp.in')}
      onTermsPress={() => showToast('Terms of Service: Standard GymApp terms apply.')}
      onPrivacyPress={() => showToast('Privacy Policy: We never sell or share your personal data.')}
    />
  )
}
