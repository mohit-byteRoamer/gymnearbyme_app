import React from 'react'
import { View, Text, Linking, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { MapPin, ExternalLink } from 'lucide-react-native'
import { Button } from '../common/Button'

export interface LeafletMapProps {
  lat?: number
  lng?: number
  gymName?: string
  address?: string
}

export function LeafletMap({ lat = 30.8936, lng = 75.8344, gymName, address }: LeafletMapProps) {
  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    Linking.openURL(url)
  }

  return (
    <View className="gap-3">
      {/* Map Container */}
      <View style={{ width: '100%', aspectRatio: 16 / 9 }} className="relative rounded-xl overflow-hidden border border-slate-200/80 shadow-xs">
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
        >
          <Marker
            coordinate={{ latitude: lat, longitude: lng }}
            title={gymName}
            description={address}
            pinColor="#2563EB"
          />
        </MapView>
      </View>

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
