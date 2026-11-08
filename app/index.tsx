import '../global.css'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '../src/context/AuthContext'
import { SplashScreen } from '../src/features/first-run/screens/SplashScreen'

export default function IndexScreen() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // If authenticated, go straight to home; otherwise go to walkthrough first-run flow
    const target = isAuthenticated ? '/home' : '/walkthrough'

    const timer = setTimeout(() => {
      router.replace(target as any)
    }, 1500)

    return () => clearTimeout(timer)
  }, [isAuthenticated, router])

  const handleContinue = () => {
    const target = isAuthenticated ? '/home' : '/walkthrough'
    router.replace(target as any)
  }

  return <SplashScreen onContinue={handleContinue} />
}
