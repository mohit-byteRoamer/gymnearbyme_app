import '../global.css'
import React from 'react'
import { useRouter } from 'expo-router'
import { PhoneEntryScreen } from '../src/features/first-run/screens/PhoneEntryScreen'

export default function PhoneLoginRoute() {
  const router = useRouter()

  return (
    <PhoneEntryScreen
      onBack={() => router.back()}
      onSendOtp={(phone) => {
        router.push({
          pathname: '/otp',
          params: { phone },
        } as any)
      }}
    />
  )
}

