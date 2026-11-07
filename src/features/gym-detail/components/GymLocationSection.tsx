import React, { useState } from 'react'
import { View, Text, Pressable, Linking } from 'react-native'
import {
  MapPin,
  Copy,
  Check,
  Car,
  Compass,
  ExternalLink,
} from 'lucide-react-native'
import * as Clipboard from 'expo-clipboard'
import { Gym } from '../types/index'
import { LeafletMap } from '@/components/gym/LeafletMap'
import { useToast } from '@/context/ToastContext'
import { softShadow } from '@/theme/shadows'

interface Props {
  gym: Gym
}

export function GymLocationSection({ gym }: Props) {
  const { showToast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await Clipboard.setStringAsync(gym.address)
    setCopied(true)
    showToast('Address copied to clipboard!', 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${gym.lat},${gym.lng}`
    Linking.openURL(url)
  }

  return (
    <View className="gap-4 pt-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <MapPin size={20} color="#2563EB" />
          <Text className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Location & Getting Here
          </Text>
        </View>

        <Pressable
          onPress={handleOpenMaps}
          className="flex-row items-center gap-1 active:opacity-75"
        >
          <Text className="text-xs sm:text-sm font-semibold text-brand">
            Open in Google Maps
          </Text>
          <ExternalLink size={14} color="#2563EB" />
        </Pressable>
      </View>

      {/* Address Card with Copy Button */}
      <View
        style={[softShadow, { borderRadius: 24 }]}
        className="p-4 sm:p-5 bg-white border border-black/[0.04] gap-3"
      >
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-row items-start gap-2.5 flex-1">
            <MapPin size={18} color="#2563EB" style={{ marginTop: 2 }} />
            <View className="flex-1">
              <Text className="text-sm font-bold text-slate-900 leading-snug">
                {gym.address}
              </Text>
              <Text className="text-xs text-slate-500 mt-1">
                Approx. <Text className="font-bold text-slate-700">{gym.distance}</Text> from your selected location
              </Text>
            </View>
          </View>

          <Pressable
            onPress={handleCopy}
            className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 active:bg-slate-200 shrink-0"
            accessibilityRole="button"
            accessibilityLabel="Copy address"
          >
            {copied ? (
              <Check size={14} color="#059669" />
            ) : (
              <Copy size={14} color="#334155" />
            )}
            <Text className="text-slate-700 text-xs font-semibold">
              {copied ? 'Copied' : 'Copy'}
            </Text>
          </Pressable>
        </View>

        {/* Landmarks & Parking Context */}
        <View className="flex-row flex-wrap gap-2 pt-2 border-t border-slate-100">
          {gym.landmarks && (
            <View className="flex-row items-center gap-2 flex-1 min-w-[200px]">
              <Compass size={16} color="#2563EB" />
              <Text className="text-xs text-slate-600">{gym.landmarks}</Text>
            </View>
          )}
          {gym.parkingInfo && (
            <View className="flex-row items-center gap-2 flex-1 min-w-[200px]">
              <Car size={16} color="#10B981" />
              <Text className="text-xs text-slate-600">{gym.parkingInfo}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Map */}
      <LeafletMap
        lat={gym.lat}
        lng={gym.lng}
        gymName={gym.name}
        address={gym.address}
      />
    </View>
  )
}
