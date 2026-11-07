import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { View, ActivityIndicator } from 'react-native'

import { AuthProvider } from '../src/context/AuthContext'
import { LocationProvider } from '../src/context/LocationContext'
import { PlanProvider } from '../src/context/PlanContext'
import { TransactionProvider } from '../src/context/TransactionContext'
import { DevStateProvider } from '../src/context/DevStateContext'
import { ToastProvider } from '../src/context/ToastContext'

import '../global.css'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto: Roboto_400Regular,
    'Roboto-Medium': Roboto_500Medium,
    'Roboto-Bold': Roboto_700Bold,
  })

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LocationProvider>
          <PlanProvider>
            <TransactionProvider>
              <DevStateProvider>
                <ToastProvider>
                  <StatusBar style="dark" />
                  <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen name="login" />
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="choose-area" options={{ presentation: 'modal' }} />
                    <Stack.Screen name="gym/[id]" />
                    <Stack.Screen name="checkout" />
                    <Stack.Screen name="payment/confirming" />
                    <Stack.Screen name="payment/success" />
                    <Stack.Screen name="payment/failed" />
                  </Stack>
                </ToastProvider>
              </DevStateProvider>
            </TransactionProvider>
          </PlanProvider>
        </LocationProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}
