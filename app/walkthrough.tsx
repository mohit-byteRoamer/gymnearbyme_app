import '../global.css'
import React from 'react'
import { Platform } from 'react-native'
import { useRouter, Redirect } from 'expo-router'
import { WalkthroughScreen } from '../src/features/first-run/screens/WalkthroughScreen'

export default function WalkthroughRoute() {
  const router = useRouter()

  // Walkthrough onboarding is exclusively for native mobile apps, not web
  if (Platform.OS === 'web') {
    return <Redirect href="/home" />
  }

  const handleFinish = () => {
    router.replace('/login' as any)
  }

  return (
    <WalkthroughScreen
      onComplete={handleFinish}
      onSkip={handleFinish}
    />
  )
}

