import '../global.css'
import React, { useEffect } from 'react'
import { Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '../src/context/AuthContext'
import { SplashScreen } from '../src/features/first-run/screens/SplashScreen'

export default function IndexScreen() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // On web: do not show mobile walkthrough onboarding; take visitors straight to /home
    if (Platform.OS === 'web') {
      router.replace('/home' as any)
      return
    }

    // On native mobile (Android/iOS): show splash screen then route
    const target = isAuthenticated ? '/home' : '/walkthrough'

    const timer = setTimeout(() => {
      router.replace(target as any)
    }, 1500)

    return () => clearTimeout(timer)
  }, [isAuthenticated, router])

  const handleContinue = () => {
    if (Platform.OS === 'web') {
      router.replace('/home' as any)
      return
    }
    const target = isAuthenticated ? '/home' : '/walkthrough'
    router.replace(target as any)
  }

  return <SplashScreen onContinue={handleContinue} />
}
