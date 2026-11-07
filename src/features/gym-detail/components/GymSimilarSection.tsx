import React from 'react'
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { MapPin, Star, Sparkles, ChevronRight } from 'lucide-react-native'
import { SIMILAR_GYMS } from '../api/gymApi'
import { formatINR } from '../utils/pricing'
import { softShadow } from '@/theme/shadows'

export function GymSimilarSection() {
  const router = useRouter()

  return (
    <View className="gap-4 pt-6 border-t border-slate-200">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Sparkles size={20} color="#2563EB" />
          <Text className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Similar Gyms Nearby
          </Text>
        </View>
        <Pressable
          onPress={() => router.push('/home' as any)}
          className="flex-row items-center gap-1 active:opacity-75"
        >
          <Text className="text-xs font-semibold text-brand">View all in Ludhiana</Text>
          <ChevronRight size={14} color="#2563EB" />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingRight: 16 }}
      >
        {SIMILAR_GYMS.map((gym) => (
          <Pressable
            key={gym.id}
            onPress={() => router.push(`/gym/${gym.id}` as any)}
            style={[softShadow, { borderRadius: 24 }]}
            className="w-64 sm:w-72 bg-white border border-black/[0.04] active:scale-[0.99]"
          >
            <View style={{ borderRadius: 24, overflow: 'hidden' }} className="flex-col">
              <View style={{ width: '100%', aspectRatio: 16 / 10 }} className="relative bg-slate-100">
                <Image
                  source={{ uri: gym.coverPhoto }}
                  contentFit="cover"
                  style={StyleSheet.absoluteFill}
                />
              {gym.isFeatured && (
                <View className="absolute top-2.5 left-2.5 bg-brand px-2 py-0.5 rounded-full shadow">
                  <Text className="text-white text-[10px] font-bold">Featured</Text>
                </View>
              )}
            </View>

            <View className="p-4 gap-2 flex-1 justify-between">
              <View>
                <View className="flex-row items-start justify-between gap-1 mb-1">
                  <Text numberOfLines={1} className="font-bold text-slate-900 text-sm flex-1">
                    {gym.name}
                  </Text>
                  <View className="flex-row items-center gap-0.5">
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <Text className="text-xs font-bold text-amber-500">{gym.rating}</Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-1">
                  <MapPin size={12} color="#94A3B8" />
                  <Text className="text-xs text-slate-500">{gym.locality} ({gym.distance})</Text>
                </View>
              </View>

              <View className="flex-row items-baseline gap-1 pt-2 border-t border-slate-100">
                <Text className="text-sm font-extrabold text-slate-900">
                  {formatINR(gym.minPrice)}
                </Text>
                <Text className="text-[11px] text-slate-500">/month</Text>
              </View>
            </View>
          </View>
        </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}
