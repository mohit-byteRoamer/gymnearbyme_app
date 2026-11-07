import React from 'react'
import { View, Text } from 'react-native'
import { Check } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { formatINR } from '../../utils/formatters'
import { Chip } from '../common/Chip'
import { Button } from '../common/Button'
import { GymPlan } from '../../data/gyms'

export interface PlanCardProps {
  plan: GymPlan
  gymId: string
  acceptsOnlineJoining?: boolean
  className?: string
}

export function PlanCard({
  plan,
  gymId,
  acceptsOnlineJoining = true,
  className = '',
}: PlanCardProps) {
  const router = useRouter()

  const handleBuy = () => {
    if (!acceptsOnlineJoining) return
    router.push({
      pathname: '/checkout',
      params: { gym: gymId, plan: plan.id },
    } as any)
  }

  return (
    <View
      className={`
        bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex-col justify-between
        ${className}
      `}
    >
      <View>
        {/* Header: Name + Chip */}
        <View className="flex-row items-center justify-between gap-2 mb-2">
          <View className="flex-row items-center gap-2">
            <Text className="text-base font-bold text-slate-900">{plan.name}</Text>
            {plan.chip && (
              <Chip color={plan.chip.color} size="xs">
                {plan.chip.text}
              </Chip>
            )}
          </View>
          <Text className="text-xs text-slate-400 font-medium">
            {plan.durationDays} days
          </Text>
        </View>

        {/* Price */}
        <View className="flex-row items-baseline gap-1 mb-3">
          <Text className="text-xl sm:text-2xl font-bold text-slate-900">
            {formatINR(plan.price)}
          </Text>
          <Text className="text-xs text-slate-500 font-normal">
            / {plan.durationDays} days
          </Text>
        </View>

        {/* Features */}
        <View className="gap-1.5 mb-4">
          {plan.features?.map((feat, idx) => (
            <View key={idx} className="flex-row items-start gap-2">
              <Check size={14} color="#059669" style={{ marginTop: 2 }} />
              <Text className="text-xs text-slate-600 flex-1">{feat}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Buy Button */}
      <View>
        {acceptsOnlineJoining ? (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onPress={handleBuy}
          >
            Buy {plan.name}
          </Button>
        ) : (
          <View className="pt-2 border-t border-slate-100 items-center">
            <Text className="text-xs text-slate-400 font-medium">
              Online joining unavailable
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}
