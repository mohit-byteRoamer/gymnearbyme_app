import React from 'react'
import { View, Text } from 'react-native'
import { WifiOff } from 'lucide-react-native'
import { useDevState } from '../../context/DevStateContext'

export function OfflineBanner() {
  const { isOffline } = useDevState()

  if (!isOffline) return null

  return (
    <View className="bg-slate-900 py-2 px-4 flex-row items-center justify-center gap-2 z-50">
      <WifiOff size={14} color="#FBBF24" />
      <Text className="text-white text-xs font-medium text-center">
        You are offline. Showing cached gyms in Ludhiana.
      </Text>
    </View>
  )
}
