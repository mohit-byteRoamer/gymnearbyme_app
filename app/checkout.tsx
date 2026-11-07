import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import { Image } from 'expo-image'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ArrowLeft, Lock, Info, ShieldCheck } from 'lucide-react-native'
import { getGymById } from '../src/utils/api'
import { formatINR } from '../src/utils/formatters'
import { useAuth } from '../src/context/AuthContext'
import { storage } from '../src/utils/storage'
import { GymItem, GymPlan } from '../src/data/gyms'
import { Button } from '../src/components/common/Button'
import { Input } from '../src/components/common/Input'

export default function CheckoutScreen() {
  const router = useRouter()
  const params = useLocalSearchParams<{ gym?: string; plan?: string }>()
  const { user, updatePhone } = useAuth()

  const gymId = params.gym || 'iron-forge-fitness'
  const planId = params.plan || 'plan-iron-monthly'

  const [gym, setGym] = useState<GymItem | null>(null)
  const [plan, setPlan] = useState<GymPlan | null>(null)
  const [phone, setPhone] = useState(user?.phone ? user.phone.replace('+91', '') : '')
  const [phoneError, setPhoneError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    getGymById(gymId).then((g) => {
      setGym(g)
      const p = g.plans.find((x) => x.id === planId) || g.plans[0]
      setPlan(p)
    })
  }, [gymId, planId])

  if (!gym || !plan) {
    return (
      <View className="max-w-form mx-auto px-4 py-16 items-center justify-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    )
  }

  const handlePay = async () => {
    if (!user?.phone || user.phone === '+919876543210') {
      const cleanPhone = phone.trim()
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        setPhoneError('Please enter a valid 10-digit mobile number')
        return
      }
      updatePhone(`+91${cleanPhone}`)
    }

    setIsProcessing(true)

    // Store pending checkout in AsyncStorage
    await storage.setItem('gymapp_pending_checkout', { gym, plan })

    // Navigate to payment confirming
    router.replace('/payment/confirming' as any)
  }

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="max-w-form w-full mx-auto px-4 py-4 sm:py-6 gap-4">
        {/* Top Bar with Back Button */}
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs items-center justify-center active:scale-95"
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <ArrowLeft size={18} color="#334155" />
          </Pressable>
          <Text className="text-lg font-bold text-slate-900">Checkout</Text>
        </View>

        <View className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm gap-5">
          {/* Summary Card */}
          <View className="flex-row items-center gap-3.5 pb-4 border-b border-slate-100">
            <Image
              source={{ uri: gym.coverPhoto }}
              className="w-16 h-16 rounded-xl"
              contentFit="cover"
            />
            <View className="flex-1 min-w-0">
              <Text numberOfLines={1} className="text-sm font-bold text-slate-900">
                {gym.name}
              </Text>
              <Text className="text-xs text-slate-500 mb-1">
                {gym.locality}, Ludhiana
              </Text>
              <View className="flex-row items-center justify-between">
                <View className="bg-blue-50 px-2 py-0.5 rounded">
                  <Text className="text-xs font-semibold text-brand">
                    {plan.name}, {plan.durationDays} days
                  </Text>
                </View>
                <Text className="text-sm font-bold text-slate-900">
                  {formatINR(plan.price)}
                </Text>
              </View>
            </View>
          </View>

          {/* Member Details */}
          <View className="gap-1.5">
            <Text className="text-xs font-bold text-slate-700">Member</Text>
            <View className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <Text className="text-sm font-semibold text-slate-900">
                {user?.name || 'Amritpal Singh'}
              </Text>
              <Text className="text-xs text-slate-400">
                {user?.email || 'amrit.singh@gmail.com'}
              </Text>
            </View>
          </View>

          {/* Phone verification input */}
          <View className="gap-1.5">
            <Text className="text-xs font-bold text-slate-700">Mobile Number for SMS Voucher</Text>
            <View className="flex-row items-center bg-white rounded-xl border border-slate-200 shadow-xs h-11 px-3">
              <Text className="text-sm text-slate-500 font-semibold mr-2">+91</Text>
              <Input
                value={phone}
                onChangeText={(text) => {
                  setPhone(text)
                  setPhoneError('')
                }}
                placeholder="10-digit mobile number"
                keyboardType="phone-pad"
                maxLength={10}
                containerClassName="border-0 shadow-none flex-1"
                className="h-10 text-sm"
              />
            </View>
            {phoneError ? (
              <Text className="text-xs text-rose-600 font-medium">{phoneError}</Text>
            ) : (
              <Text className="text-[11px] text-slate-400">
                We will send your voucher pass code via SMS as well.
              </Text>
            )}
          </View>

          {/* Price Breakdown */}
          <View className="pt-2 border-t border-slate-100 gap-2">
            <View className="flex-row justify-between text-xs">
              <Text className="text-slate-500 text-xs">Plan fee ({plan.durationDays} days)</Text>
              <Text className="text-slate-800 font-medium text-xs">{formatINR(plan.price)}</Text>
            </View>
            <View className="flex-row justify-between text-xs">
              <Text className="text-slate-500 text-xs">GymApp platform fee</Text>
              <Text className="text-emerald-600 font-medium text-xs">FREE</Text>
            </View>
            <View className="flex-row justify-between pt-2 border-t border-slate-100">
              <Text className="text-sm font-bold text-slate-900">Total payable</Text>
              <Text className="text-base font-extrabold text-brand">
                {formatINR(plan.price)}
              </Text>
            </View>
          </View>

          {/* Trust badge */}
          <View className="bg-slate-50 rounded-xl p-3 flex-row items-center gap-2.5">
            <ShieldCheck size={18} color="#059669" />
            <Text className="text-xs text-slate-600 flex-1 leading-snug">
              100% Refund Guarantee. If you do not activate your pass, get an instant full refund.
            </Text>
          </View>

          {/* Pay Button */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isProcessing}
            onPress={handlePay}
            icon={Lock}
          >
            Pay {formatINR(plan.price)} via UPI
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}
