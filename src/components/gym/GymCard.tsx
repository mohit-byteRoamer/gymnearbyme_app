import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { Star, MapPin, Sparkles, BadgeCheck, ChevronRight, Bookmark } from 'lucide-react-native'
import { formatINR } from '../../utils/formatters'
import { GymItem } from '../../data/gyms'
import { softShadow } from '../../theme/shadows'
import { useBookmarks } from '../../context/BookmarkContext'

export interface GymCardProps {
  gym: GymItem
}

export function GymCard({ gym }: GymCardProps) {
  const router = useRouter()
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const bookmarked = isBookmarked(gym.id)

  const handlePress = () => {
    router.push(`/gym/${gym.id}` as any)
  }

  const handleBookmarkPress = (e: any) => {
    e?.stopPropagation?.()
    toggleBookmark(gym.id, gym.name)
  }

  return (
    <Pressable
      onPress={handlePress}
      style={[softShadow, { borderRadius: 16 }]}
      className="bg-white border border-black/[0.04] active:scale-[0.99] select-none"
    >
      {/* Inner container with overflow hidden to clip cover image */}
      <View style={{ borderRadius: 16, overflow: 'hidden' }} className="flex-col">
        {/* 1. Cover Photo */}
        <View
          style={{ width: '100%', aspectRatio: 16 / 10 }}
          className="relative overflow-hidden bg-slate-100"
        >
          <Image
            source={{ uri: gym.coverPhoto }}
            contentFit="cover"
            transition={300}
            style={StyleSheet.absoluteFill}
          />

          {/* Top Badges & Bookmark Action */}
          <View className="absolute top-3 left-3 right-3 flex-row items-center justify-between">
            {gym.isFeatured ? (
              <View className="flex-row items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/90 border border-white/20 shadow-sm">
                <Sparkles size={12} color="#FDE047" fill="#FDE047" />
                <Text className="text-white text-[11px] font-semibold">Featured</Text>
              </View>
            ) : (
              <View />
            )}

            <Pressable
              onPress={handleBookmarkPress}
              hitSlop={8}
              className={`w-8 h-8 rounded-full items-center justify-center border shadow-xs transition-transform active:scale-90 ${
                bookmarked
                  ? 'bg-blue-50/95 border-blue-300'
                  : 'bg-white/90 border-slate-200/80 hover:bg-white'
              }`}
              accessibilityRole="button"
              accessibilityLabel={bookmarked ? `Remove ${gym.name} from bookmarks` : `Bookmark ${gym.name}`}
            >
              <Bookmark
                size={15}
                color={bookmarked ? '#2563EB' : '#475569'}
                fill={bookmarked ? '#2563EB' : 'transparent'}
              />
            </Pressable>
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
                <Text className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
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
      </View>
    </Pressable>
  )
}
