import React from 'react'
import { Slot, Redirect } from 'expo-router'
import { AppLayoutShell } from '../../src/components/layout/AppLayoutShell'
import { useAuth } from '../../src/context/AuthContext'
import { View, ActivityIndicator } from 'react-native'

export default function TabsLayout() {
  const { isAuthenticated, isGuest, isLoading } = useAuth()

  if (isLoading) {
    return (
      <View className="flex-1 bg-slate-50 items-center justify-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    )
  }

  // Allow both authenticated users AND guest explorers
  if (!isAuthenticated && !isGuest) {
    return <Redirect href="/login" />
  }

  return (
    <AppLayoutShell>
      <Slot />
    </AppLayoutShell>
  )
}
