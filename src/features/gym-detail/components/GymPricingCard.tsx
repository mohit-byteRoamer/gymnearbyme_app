import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import {
  Check,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  Gift,
} from 'lucide-react-native'
import { Gym, Plan } from '../types/index'
import {
  formatINR,
  calculatePerDay,
  calculatePerMonth,
  calculateSavings,
} from '../utils/pricing'
import { useGymDetailStore } from '../store/gymDetailStore'
import { useToast } from '@/context/ToastContext'
import { softShadow } from '@/theme/shadows'
import { Button } from '@/components/common/Button'

interface Props {
  gym: Gym
}

export function GymPricingCard({ gym }: Props) {
  const router = useRouter()
  const { showToast } = useToast()
  const { selectedPlanId, setSelectedPlanId } = useGymDetailStore()

  const plans = gym.plans || []
  const monthlyPlan = plans.find((p) => p.durationDays === 30) || plans[0]
  const baseMonthlyPrice = monthlyPlan?.price || 1200

  const activePlan: Plan =
    plans.find((p) => p.id === selectedPlanId) ||
    plans.find((p) => p.isRecommended) ||
    plans[0]

  const perDay = calculatePerDay(activePlan.price, activePlan.durationDays)
  const perMonth = calculatePerMonth(activePlan.price, activePlan.durationDays)
  const savings = calculateSavings(
    activePlan.price,
    activePlan.durationDays,
    baseMonthlyPrice
  )

  const handleCheckout = () => {
    if (!gym.acceptsOnlineJoining) {
      showToast('This gym is not accepting online joins right now.', 'warning')
      return
    }
    router.push({
      pathname: '/checkout',
      params: { gym: gym.id, plan: activePlan.id },
    } as any)
  }

  const handleFreeTrial = () => {
    showToast('Free 1-Day Trial Pass generated! Show at front desk.', 'success')
  }

  return (
    <View
      style={[softShadow, { borderRadius: 24 }]}
      className="border border-black/[0.04] bg-white p-5 sm:p-6 gap-5"
    >
      {/* Header */}
      <View>
        <View className="flex-row items-center justify-between">
          <Text className="text-xs font-bold uppercase tracking-wider text-brand">
            Membership Plans
          </Text>
          {activePlan.isRecommended && (
            <View className="flex-row items-center gap-1 bg-amber-400 px-2 py-0.5 rounded-full shadow-2xs">
              <Sparkles size={11} color="#78350F" fill="#78350F" />
              <Text className="text-[11px] font-extrabold text-amber-900">Most Popular</Text>
            </View>
          )}
        </View>
        <Text className="text-lg font-extrabold text-slate-900 tracking-tight mt-0.5">
          Select Your Plan
        </Text>
        <Text className="text-xs text-slate-500">
          Pay online once. Activate with QR voucher upon first visit.
        </Text>
      </View>

      {/* Segmented Duration Selector */}
      <View className="flex-row gap-1.5 p-1 bg-slate-100 rounded-2xl">
        {plans.map((p) => {
          const isSelected = p.id === activePlan.id

          return (
            <Pressable
              key={p.id}
              onPress={() => setSelectedPlanId(p.id)}
              className={`flex-1 py-2 px-1 rounded-xl items-center justify-center select-none ${
                isSelected
                  ? 'bg-white shadow-sm border border-slate-200'
                  : ''
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  isSelected ? 'text-brand' : 'text-slate-600'
                }`}
              >
                {p.durationDays}d
              </Text>
              <Text
                className={`text-[10px] font-medium ${
                  isSelected ? 'text-brand' : 'text-slate-400'
                }`}
              >
                {p.name.split(' ')[0]}
              </Text>
            </Pressable>
          )
        })}
      </View>

      {/* Price Showcase */}
      <View className="p-4 rounded-2xl bg-gradient-to-br from-blue-50/80 to-slate-50 border border-blue-100/80 gap-3">
        <View className="flex-row items-baseline justify-between">
          <View>
            <View className="flex-row items-baseline gap-1">
              <Text className="text-3xl font-black text-slate-900 tracking-tight">
                {formatINR(activePlan.price)}
              </Text>
              <Text className="text-xs text-slate-500 font-medium">
                /{activePlan.durationDays} days
              </Text>
            </View>
            <Text className="text-xs font-semibold text-brand mt-0.5">
              Effective {formatINR(perMonth)}/mo · ₹{perDay}/day
            </Text>
          </View>

          {savings.amount > 0 && (
            <View className="bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
              <Text className="text-xs font-extrabold text-emerald-800">
                Save {savings.percent}%
              </Text>
            </View>
          )}
        </View>

        {/* Benefits */}
        <View className="gap-2 pt-2 border-t border-slate-200/60">
          {activePlan.features?.map((feat, i) => (
            <View key={i} className="flex-row items-center gap-2">
              <View className="w-4 h-4 rounded-full bg-emerald-100 items-center justify-center">
                <Check size={10} color="#059669" />
              </View>
              <Text className="text-xs font-medium text-slate-700">{feat}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Checkout Button */}
      <View className="gap-2.5">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleCheckout}
          icon={ArrowRight}
        >
          Join {gym.name.split(' ')[0]} Now
        </Button>

        {gym.hasFreeTrial && (
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onPress={handleFreeTrial}
            icon={Gift}
          >
            Claim Free 1-Day Trial Pass
          </Button>
        )}
      </View>

      {/* Money-Back Guarantee Notice */}
      <View className="flex-row items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60">
        <ShieldCheck size={16} color="#059669" />
        <Text className="text-[11px] text-slate-600 font-medium flex-1">
          100% Refundable before first scan at gym turnstile.
        </Text>
      </View>
    </View>
  )
}
