import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react-native'
import { Gym } from '../types/index'

interface Props {
  gym: Gym
}

export function GymAboutSection({ gym }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <View className="gap-4 pt-2">
      <View className="flex-row items-center gap-2">
        <Sparkles size={20} color="#2563EB" />
        <Text className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          About this gym
        </Text>
      </View>

      {/* Description */}
      <View className="gap-2">
        <Text
          numberOfLines={isExpanded ? undefined : 3}
          className="text-sm sm:text-base text-slate-600 leading-relaxed"
        >
          {gym.about}
        </Text>

        <Pressable
          onPress={() => setIsExpanded(!isExpanded)}
          className="flex-row items-center gap-1 pt-1"
        >
          <Text className="text-brand font-semibold text-xs sm:text-sm">
            {isExpanded ? 'Show less' : 'Read full overview'}
          </Text>
          {isExpanded ? (
            <ChevronUp size={16} color="#2563EB" />
          ) : (
            <ChevronDown size={16} color="#2563EB" />
          )}
        </Pressable>
      </View>

      {/* 4 Highlight USPs */}
      {gym.usps && gym.usps.length > 0 && (
        <View className="flex-row flex-wrap gap-3 pt-2">
          {gym.usps.map((usp, i) => (
            <View
              key={i}
              className="flex-row items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 w-full sm:w-[48%]"
            >
              <CheckCircle2 size={16} color="#10B981" style={{ marginTop: 2 }} />
              <Text className="text-xs sm:text-sm font-medium text-slate-800 flex-1">
                {usp}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
