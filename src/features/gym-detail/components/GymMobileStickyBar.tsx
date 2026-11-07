import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { ArrowRight, Sparkles } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Gym, Plan } from '../types/index'
import { calculatePerDay } from '../utils/pricing'
import { useGymDetailStore } from '../store/gymDetailStore'
import { useBreakpoint } from '@/hooks/useBreakpoint'

interface Props {
  gym: Gym
}

export function GymMobileStickyBar({ gym }: Props) {
  const { selectedPlanId, setIsMobileSheetOpen } = useGymDetailStore()
  const insets = useSafeAreaInsets()
  const { isPhone } = useBreakpoint()

  if (!isPhone) return null

  const plans = gym.plans || []
  const minPerDay = Math.min(
    ...plans.map((p) => calculatePerDay(p.price, p.durationDays))
  )

  return (
    <View
      className="absolute bottom-0 left-0 right-0 z-40 bg-white/95 border-t border-slate-200/90 shadow-2xl p-3 sm:px-6"
      style={{ paddingBottom: Math.max(insets.bottom, 10) }}
    >
      <View className="flex-row items-center justify-between gap-3 max-w-lg mx-auto w-full">
        {/* Left: Price */}
        <View className="flex-col">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-xs text-slate-500 font-medium">From</Text>
            <Text className="text-lg font-black text-slate-900">
              ₹{minPerDay}/day
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Sparkles size={12} color="#059669" fill="#059669" />
            <Text className="text-[11px] text-emerald-600 font-bold">
              Instant QR Activation
            </Text>
          </View>
        </View>

        {/* Right: CTA Button */}
        <Pressable
          onPress={() => setIsMobileSheetOpen(true)}
          className="h-12 px-5 rounded-2xl bg-brand active:bg-blue-700 flex-row items-center gap-1.5 shadow-md active:scale-95"
        >
          <Text className="text-white font-extrabold text-sm">Choose Plan</Text>
          <ArrowRight size={16} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  )
}
