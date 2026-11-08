import '../global.css'
import React, { useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { OtpVerificationScreen } from '../src/features/first-run/screens/OtpVerificationScreen'
import { useAuth } from '../src/context/AuthContext'
import { useLocation } from '../src/context/LocationContext'
import { useToast } from '../src/context/ToastContext'

export default function OtpRoute() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const phone = (params.phone as string) || '98765 43210'
  const { signInWithPhone, isFirstTimeUser } = useAuth()
  const { hasPromptedLocation, openLocationSheet } = useLocation()
  const { showToast } = useToast()
  const [isError, setIsError] = useState(false)

  const handleVerify = async (code: string) => {
    // If user enters '0000', treat as test error
    if (code === '0000') {
      setIsError(true)
      return
    }

    try {
      const result = await signInWithPhone(phone, isFirstTimeUser)
      if (result.isFirstTime || !result.user.hasCompletedProfile) {
        showToast('Phone verified! Please enter your name.')
        router.push('/complete-profile' as any)
      } else {
        if (!hasPromptedLocation) {
          openLocationSheet()
        }
        showToast('Welcome back!')
        router.replace('/home' as any)
      }
    } catch {
      setIsError(true)
    }
  }

  return (
    <OtpVerificationScreen
      phoneNumber={phone}
      isError={isError}
      onBack={() => router.back()}
      onVerify={handleVerify}
    />
  )
}
