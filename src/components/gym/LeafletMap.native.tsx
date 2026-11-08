import React from 'react'
import { View, Text, Linking, StyleSheet, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { MapPin, ExternalLink, Navigation } from 'lucide-react-native'
import { Button } from '../common/Button'

export interface LeafletMapProps {
  lat?: number
  lng?: number
  gymName?: string
  address?: string
}

export function LeafletMap({ lat = 30.8936, lng = 75.8344, gymName, address }: LeafletMapProps) {
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    Linking.openURL(url)
  }

  // OpenStreetMap static tile url for the gym coordinates
  const mapTileUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lng}&zoom=15&size=800x450&markers=${lat},${lng},ol-marker`

  return (
    <View className="gap-3">
      {/* Map Container */}
      <Pressable
        onPress={openGoogleMaps}
        style={{ width: '100%', aspectRatio: 16 / 9 }}
        className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-slate-100 active:opacity-95"
      >
        <Image
          source={{ uri: mapTileUrl }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />

        {/* Center Marker Pin Overlay */}
        <View className="absolute inset-0 items-center justify-center pointer-events-none">
          <View className="items-center" style={{ transform: [{ translateY: -14 }] }}>
            <View className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white items-center justify-center shadow-lg">
              <Text style={{ fontSize: 18 }}>🏋️</Text>
            </View>
            <View className="w-2.5 h-2.5 bg-blue-600 rotate-45 -mt-1 shadow-sm" />
          </View>
        </View>

        {/* Floating Tap to Navigate pill */}
        <View className="absolute bottom-3 right-3 flex-row items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/85 border border-white/20 shadow-md">
          <Navigation size={13} color="#FFFFFF" />
          <Text className="text-white text-xs font-semibold">Tap to Navigate</Text>
        </View>
      </Pressable>

      {/* Address & External Maps Button */}
      <View className="flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <View className="flex-row items-start gap-2 max-w-md flex-1">
          <MapPin size={16} color="#2563EB" style={{ marginTop: 2 }} />
          <Text className="text-sm text-slate-600 flex-1">{address}</Text>
        </View>

        <Button
          variant="secondary"
          size="sm"
          onPress={openGoogleMaps}
          icon={ExternalLink}
          className="shrink-0 self-start sm:self-auto"
        >
          Open in Maps
        </Button>
      </View>
    </View>
  )
}
