import '../global.css'
import React from 'react'
import { useRouter } from 'expo-router'
import { CompleteProfileScreen } from '../src/features/first-run/screens/CompleteProfileScreen'
import { useAuth } from '../src/context/AuthContext'
import { useLocation } from '../src/context/LocationContext'
import { useToast } from '../src/context/ToastContext'

export default function CompleteProfileRoute() {
  const router = useRouter()
  const { user, completeProfile } = useAuth()
  const { hasPromptedLocation, openLocationSheet } = useLocation()
  const { showToast } = useToast()

  const handleProfileSubmit = async (firstName: string, lastName: string) => {
    try {
      await completeProfile(firstName, lastName)
      if (!hasPromptedLocation) {
        openLocationSheet()
      }
      showToast(`Welcome to GymApp, ${firstName}!`)
      router.replace('/home' as any)
    } catch {
      showToast('Could not save profile. Please try again.')
    }
  }

  return (
    <CompleteProfileScreen
      initialFirstName={user?.firstName || ''}
      initialLastName={user?.lastName || ''}
      onBack={() => router.back()}
      onSubmit={handleProfileSubmit}
    />
  )
}

