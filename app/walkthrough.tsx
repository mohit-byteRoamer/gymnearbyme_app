import '../global.css'
import React from 'react'
import { useRouter } from 'expo-router'
import { WalkthroughScreen } from '../src/features/first-run/screens/WalkthroughScreen'

export default function WalkthroughRoute() {
  const router = useRouter()

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

