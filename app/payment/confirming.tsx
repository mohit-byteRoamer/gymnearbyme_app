import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { ShieldCheck, RefreshCw } from 'lucide-react-native'
import { simulatePayment } from '../../src/utils/api'
import { storage } from '../../src/utils/storage'
import { usePlan } from '../../src/context/PlanContext'
import { useTransactions } from '../../src/context/TransactionContext'
import { Button } from '../../src/components/common/Button'

export default function PaymentConfirmingScreen() {
  const router = useRouter()
  const { setPurchasedPlan } = usePlan()
  const { addTransaction } = useTransactions()

  const [seconds, setSeconds] = useState(0)
  const [isSlow, setIsSlow] = useState(false)

  useEffect(() => {
    let isMounted = true

    const runPayment = async () => {
      const raw = await storage.getItem<any>('gymapp_pending_checkout', null)
      let gym = {
        id: 'iron-forge-fitness',
        name: 'Iron Forge Fitness & CrossFit',
        locality: 'Model Town',
        lat: 30.8936,
        lng: 75.8344,
      }
      let plan = {
        id: 'plan-iron-monthly',
        name: 'Monthly',
        durationDays: 30,
        price: 1000,
      }

      if (raw) {
        gym = raw.gym || gym
        plan = raw.plan || plan
      }

      try {
        const result = await simulatePayment(plan as any, gym as any)
        if (!isMounted) return

        setPurchasedPlan(result, gym as any, plan as any)
        addTransaction(result, gym as any, plan as any)

        await storage.setItem('gymapp_last_payment', { result, gym, plan })
        router.replace('/payment/success' as any)
      } catch (err) {
        if (!isMounted) return
        router.replace('/payment/failed' as any)
      }
    }

    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s + 1 >= 60) setIsSlow(true)
        return s + 1
      })
    }, 1000)

    const timer = setTimeout(() => {
      runPayment()
    }, 3200)

    return () => {
      isMounted = false
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [router, setPurchasedPlan, addTransaction])

  return (
    <View className="flex-1 bg-slate-50 items-center justify-center p-4">
      <View className="w-full max-w-form bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm items-center text-center gap-6">
        {/* Progress Spinner */}
        <View className="relative w-20 h-20 items-center justify-center">
          <ActivityIndicator size="large" color="#2563EB" />
          <View className="absolute">
            <ShieldCheck size={28} color="#2563EB" />
          </View>
        </View>

        {/* Text */}
        <View className="items-center gap-2">
          <Text className="text-xl font-bold text-slate-900 text-center">
            Confirming your payment
          </Text>
          <Text className="text-sm text-slate-500 max-w-xs text-center leading-relaxed">
            This takes a few seconds. Please do not close the app.
          </Text>
        </View>

        {/* Slow Alert */}
        {isSlow && (
          <View className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 gap-3 w-full">
            <Text className="text-xs text-amber-800 font-medium">
              Still confirming. Your money is safe. We will notify you as soon as the bank responds.
            </Text>
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              onPress={() => router.replace('/payment/confirming' as any)}
              icon={RefreshCw}
            >
              Check again
            </Button>
          </View>
        )}
      </View>
    </View>
  )
}
