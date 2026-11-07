import React from 'react'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { MapPin, Navigation } from 'lucide-react-native'
import { Sheet } from '../common/Sheet'
import { Button } from '../common/Button'
import { useLocation } from '../../context/LocationContext'

export function LocationSheet() {
  const { isLocationSheetOpen, closeLocationSheet, allowLocation } = useLocation()
  const router = useRouter()

  const handleManual = () => {
    closeLocationSheet()
    router.push('/choose-area' as any)
  }

  return (
    <Sheet isOpen={isLocationSheetOpen} onClose={closeLocationSheet} maxWidth="max-w-md">
      <View className="items-center py-2">
        {/* Pin Icon */}
        <View className="w-16 h-16 rounded-full bg-blue-50 items-center justify-center mb-4 border border-blue-100">
          <MapPin size={32} color="#2563EB" />
        </View>

        <Text className="text-xl font-bold text-slate-900 mb-2 text-center">
          Show gyms near you
        </Text>
        <Text className="text-sm text-slate-500 max-w-xs text-center mb-6">
          We use your location only to find nearby gyms in Ludhiana.
        </Text>

        <View className="w-full gap-3">
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onPress={allowLocation}
            icon={Navigation}
          >
            Allow location
          </Button>

          <Button
            variant="secondary"
            fullWidth
            size="lg"
            onPress={handleManual}
          >
            Choose area manually
          </Button>
        </View>
      </View>
    </Sheet>
  )
}
