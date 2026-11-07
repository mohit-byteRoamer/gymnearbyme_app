import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { Star, ShieldCheck, ThumbsUp } from 'lucide-react-native'
import { Gym, Review } from '../types/index'
import { useGymDetailStore } from '../store/gymDetailStore'

interface Props {
  gym: Gym
}

export function GymReviewsSection({ gym }: Props) {
  const { reviewFilter, setReviewFilter } = useGymDetailStore()
  const [displayCount, setDisplayCount] = useState(3)

  const reviews = gym.reviews || []

  let filtered = [...reviews]
  if (reviewFilter === 'highest') {
    filtered.sort((a, b) => b.rating - a.rating)
  } else if (reviewFilter === 'lowest') {
    filtered.sort((a, b) => a.rating - b.rating)
  }

  const visibleReviews = filtered.slice(0, displayCount)
  const breakdown = gym.ratingBreakdown || { 5: 180, 4: 25, 3: 5, 2: 1, 1: 1 }
  const totalRatings =
    Object.values(breakdown).reduce((acc, curr) => acc + curr, 0) || 1

  return (
    <View className="gap-6 pt-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Star size={20} color="#F59E0B" fill="#F59E0B" />
          <Text className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Member Reviews ({gym.reviewsCount})
          </Text>
        </View>
      </View>

      {/* Breakdown Card */}
      <View className="flex-col md:flex-row gap-6 p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm items-center">
        {/* Big Score */}
        <View className="items-center md:items-start md:border-r border-slate-200 md:pr-6">
          <Text className="text-5xl font-black text-slate-900 tracking-tight leading-none">
            {gym.rating}
          </Text>
          <View className="flex-row items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={16} color="#F59E0B" fill="#F59E0B" />
            ))}
          </View>
          <Text className="text-xs text-slate-500 font-medium text-center md:text-left">
            Based on {gym.reviewsCount} verified reviews
          </Text>
          <Text className="text-[11px] text-emerald-600 font-bold mt-1 text-center md:text-left">
            98% of members recommend this gym
          </Text>
        </View>

        {/* 5-bar Distribution */}
        <View className="flex-1 w-full gap-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = (breakdown as any)[stars] || 0
            const pct = Math.round((count / totalRatings) * 100)

            return (
              <View key={stars} className="flex-row items-center gap-3">
                <Text className="text-xs font-bold text-slate-600 w-4">
                  {stars}
                </Text>
                <View className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <View
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${pct}%` }}
                  />
                </View>
                <Text className="text-xs font-semibold text-slate-400 w-8 text-right">
                  {count}
                </Text>
              </View>
            )
          })}
        </View>
      </View>

      {/* Review List */}
      <View className="gap-3">
        {visibleReviews.map((rev) => (
          <View
            key={rev.id}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs gap-3"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Image
                  source={{ uri: rev.avatar }}
                  className="w-10 h-10 rounded-full"
                  contentFit="cover"
                />
                <View>
                  <Text className="font-bold text-slate-900 text-sm">
                    {rev.author}
                  </Text>
                  <Text className="text-xs text-slate-400">{rev.date}</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                <Star size={12} color="#F59E0B" fill="#F59E0B" />
                <Text className="text-xs font-bold text-amber-900">{rev.rating}</Text>
              </View>
            </View>

            <Text className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {rev.comment}
            </Text>

            {rev.likes !== undefined && rev.likes > 0 && (
              <View className="flex-row items-center gap-1 pt-1">
                <ThumbsUp size={12} color="#94A3B8" />
                <Text className="text-[11px] text-slate-400 font-medium">
                  {rev.likes} members found this helpful
                </Text>
              </View>
            )}
          </View>
        ))}

        {visibleReviews.length < filtered.length && (
          <Pressable
            onPress={() => setDisplayCount((prev) => prev + 3)}
            className="w-full py-3 bg-white rounded-xl border border-slate-200/80 items-center justify-center active:bg-slate-50 mt-1"
          >
            <Text className="text-xs font-bold text-brand">
              Show more reviews ({filtered.length - visibleReviews.length} remaining)
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  )
}
