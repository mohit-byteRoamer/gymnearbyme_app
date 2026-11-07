import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Star, MapPin, Sparkles, BadgeCheck, ChevronRight } from 'lucide-react-native'
import { formatINR } from '../../utils/formatters'
import { GymItem } from '../../data/gyms'

export interface GymCardProps {
  gym: GymItem
}

export function GymCard({ gym }: GymCardProps) {
  const router = useRouter()

  const handlePress = () => {
    router.push(`/gym/${gym.id}` as any)
  }

  return (
    <Pressable
      onPress={handlePress}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex-col h-full active:scale-[0.99] select-none"
    >
      {/* 1. Cover Photo */}
      <View className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 rounded-t-2xl">
        <Image
          source={{ uri: gym.coverPhoto }}
          contentFit="cover"
          transition={300}
          className="w-full h-full"
        />

        {/* Top Badges */}
        <View className="absolute top-3 left-3 right-3 flex-row items-center justify-between">
          {gym.isFeatured ? (
            <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/90 border border-white/20 shadow-sm">
              <Sparkles size={12} color="#FDE047" fill="#FDE047" />
              <Text className="text-white text-[11px] font-semibold">Featured</Text>
            </View>
          ) : (
            <View />
          )}
        </View>

        {/* Bottom Overlay Status Badge */}
        <View className="absolute bottom-3 left-3">
          <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/80 border border-white/10 shadow-sm">
            <View className="h-2 w-2 rounded-full bg-emerald-500" />
            <Text className="text-white text-[11px] font-medium">
              Open until {gym.openUntil}
            </Text>
          </View>
        </View>
      </View>

      {/* 2. Information & Details */}
      <View className="p-4 sm:p-5 flex-1 justify-between gap-3">
        <View>
          {/* Title Row with Rating Badge */}
          <View className="flex-row items-start justify-between gap-2">
            <View className="flex-row items-center gap-1.5 flex-1 min-w-0">
              <Text
                numberOfLines={1}
                className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight flex-1"
              >
                {gym.name}
              </Text>
              {gym.verified && (
                <BadgeCheck size={16} color="#2563EB" fill="#EFF6FF" />
              )}
            </View>

            {/* Rating Pill */}
            <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200/60 shadow-xs">
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <Text className="text-xs font-bold text-slate-900">{gym.rating}</Text>
              <Text className="text-[11px] font-medium text-slate-400">
                ({gym.reviewsCount})
              </Text>
            </View>
          </View>

          {/* Location & Distance */}
          <View className="flex-row items-center gap-1.5 text-xs text-slate-500 mt-2">
            <MapPin size={13} color="#2563EB" />
            <Text className="font-semibold text-slate-700 text-xs">{gym.distance}</Text>
            <Text className="text-slate-300 text-xs">•</Text>
            <Text numberOfLines={1} className="text-slate-500 text-xs flex-1">
              {gym.locality}
            </Text>
          </View>
        </View>

        {/* 3. Pricing Section */}
        <View className="pt-3 border-t border-slate-100 flex-row items-center justify-between">
          <View className="flex-col">
            <Text className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Starts from
            </Text>
            <View className="flex-row items-baseline gap-1 mt-0.5">
              <Text className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                {formatINR(gym.minPrice)}
              </Text>
              <Text className="text-xs font-normal text-slate-500">/month</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100">
            <Text className="text-xs font-bold text-brand">View</Text>
            <ChevronRight size={14} color="#2563EB" />
          </View>
        </View>
      </View>
    </Pressable>
  )
}
