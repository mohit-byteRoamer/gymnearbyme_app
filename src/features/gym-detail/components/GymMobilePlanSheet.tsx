import React from 'react'
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native'
import { useRouter } from 'expo-router'
import { X, Check, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Gym, Plan } from '../types/index'
import {
  formatINR,
  calculatePerDay,
  calculateSavings,
} from '../utils/pricing'
import { useGymDetailStore } from '../store/gymDetailStore'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/common/Button'

interface Props {
  gym: Gym
}

export function GymMobilePlanSheet({ gym }: Props) {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { showToast } = useToast()
  const {
    isMobileSheetOpen,
    setIsMobileSheetOpen,
    selectedPlanId,
    setSelectedPlanId,
  } = useGymDetailStore()

  const plans = gym.plans || []
  const monthlyPlan = plans.find((p) => p.durationDays === 30) || plans[0]
  const baseMonthlyPrice = monthlyPlan?.price || 1200

  const activePlan: Plan =
    plans.find((p) => p.id === selectedPlanId) ||
    plans.find((p) => p.isRecommended) ||
    plans[0]

  const handleCheckout = () => {
    if (!gym.acceptsOnlineJoining) {
      showToast('This gym is not accepting online joins right now.', 'warning')
      return
    }
    setIsMobileSheetOpen(false)
    router.push({
      pathname: '/checkout',
      params: { gym: gym.id, plan: activePlan.id },
    } as any)
  }

  if (!isMobileSheetOpen) return null

  return (
    <Modal
      visible={isMobileSheetOpen}
      transparent
      animationType="slide"
      onRequestClose={() => setIsMobileSheetOpen(false)}
    >
      <View className="flex-1 bg-black/60 justify-end">
        <View
          className="w-full bg-white rounded-t-3xl shadow-2xl max-h-[85%] flex-col"
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        >
          {/* Drag Handle */}
          <View className="items-center pt-3 pb-1">
            <View className="w-10 h-1.5 bg-slate-200 rounded-full" />
          </View>

          {/* Header */}
          <View className="flex-row items-center justify-between px-5 py-3 border-b border-slate-100">
            <View>
              <Text className="text-base font-extrabold text-slate-900">
                Select Membership Pass
              </Text>
              <Text className="text-xs text-slate-500">
                {gym.name}
              </Text>
            </View>
            <Pressable
              onPress={() => setIsMobileSheetOpen(false)}
              className="p-1.5 rounded-full active:bg-slate-100"
            >
              <X size={20} color="#64748B" />
            </Pressable>
          </View>

          {/* Scrollable Plan Cards */}
          <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
            {plans.map((p) => {
              const isSelected = p.id === activePlan.id
              const perDay = calculatePerDay(p.price, p.durationDays)
              const savings = calculateSavings(p.price, p.durationDays, baseMonthlyPrice)

              return (
                <Pressable
                  key={p.id}
                  onPress={() => setSelectedPlanId(p.id)}
                  className={`p-4 rounded-2xl border ${
                    isSelected
                      ? 'border-brand bg-blue-50/40 shadow-xs'
                      : 'border-slate-200/90 bg-white'
                  }`}
                >
                  <View className="flex-row items-center justify-between mb-1.5">
                    <View className="flex-row items-center gap-2">
                      <Text className="font-extrabold text-slate-900 text-sm">
                        {p.name}
                      </Text>
                      {p.isRecommended && (
                        <View className="bg-amber-400 px-2 py-0.5 rounded-full">
                          <Text className="text-[10px] font-extrabold text-amber-900">
                            Best value
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text className="font-extrabold text-slate-900 text-base">
                      {formatINR(p.price)}
                    </Text>
                  </View>

                  <View className="flex-row items-center justify-between text-xs">
                    <Text className="text-xs text-slate-500">
                      ₹{perDay}/day · {p.durationDays} days access
                    </Text>
                    {savings.amount > 0 && (
                      <Text className="text-xs font-bold text-emerald-600">
                        Save {savings.percent}%
                      </Text>
                    )}
                  </View>

                  {/* Features */}
                  {isSelected && (
                    <View className="gap-1 mt-3 pt-3 border-t border-blue-100">
                      {p.features?.map((f, i) => (
                        <View key={i} className="flex-row items-center gap-1.5">
                          <Check size={12} color="#059669" />
                          <Text className="text-xs text-slate-700">{f}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </Pressable>
              )
            })}
          </ScrollView>

          {/* Checkout CTA */}
          <View className="px-5 pt-3 border-t border-slate-100 gap-2">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleCheckout}
              icon={ArrowRight}
            >
              Proceed to Pay {formatINR(activePlan.price)}
            </Button>
            <View className="flex-row items-center justify-center gap-1.5">
              <ShieldCheck size={14} color="#059669" />
              <Text className="text-[11px] text-slate-500">
                100% money back before turnstile scan
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}
