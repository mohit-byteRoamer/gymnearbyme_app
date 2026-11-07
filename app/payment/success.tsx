import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Linking,
  Alert,
  Platform,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Check, Navigation } from 'lucide-react-native'
import QRCode from 'react-native-qrcode-svg'
import { formatINR } from '../../src/utils/formatters'
import { usePlan } from '../../src/context/PlanContext'
import { useToast } from '../../src/context/ToastContext'
import { Button } from '../../src/components/common/Button'
import { Chip } from '../../src/components/common/Chip'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { softShadow } from '../../src/theme/shadows'

export default function PaymentSuccessScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { activePlan, requestRefund } = usePlan()
  const { showToast } = useToast()

  const voucherCode = activePlan?.voucherCode || 'GYM-LDH-8921'
  const gymName = activePlan?.gymName || 'Iron Forge Fitness & CrossFit'
  const locality = activePlan?.locality || 'Model Town'
  const planName = activePlan?.planName || 'Monthly'
  const amountPaid = activePlan?.amountPaid || 1000
  const validUntil = activePlan?.validUntil || '7 Nov 2026'

  const handleDirections = () => {
    const lat = activePlan?.lat || 30.8936
    const lng = activePlan?.lng || 75.8344
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`)
  }

  const handleRefund = () => {
    const executeRefund = () => {
      requestRefund('User requested refund after checkout')
      showToast('Refund requested successfully. Funds will reflect in 24 hours.', 'info')
      setTimeout(() => router.replace('/transactions' as any), 1500)
    }

    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm('Are you sure you want to request a refund for this unredeemed pass? 100% of ₹1,000 will be refunded to your original UPI account.')) {
        executeRefund()
      }
    } else {
      Alert.alert(
        'Request Refund',
        'Are you sure you want to request a refund for this unredeemed pass? 100% will be refunded to your original UPI account.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Confirm', style: 'destructive', onPress: executeRefund },
        ]
      )
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      style={{ paddingTop: Math.max(insets.top, 24) }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View className="max-w-form w-full mx-auto px-4 py-6 sm:py-8 gap-6 items-center">
        {/* Green Check Icon */}
        <View className="items-center gap-2">
          <View className="w-16 h-16 rounded-full bg-emerald-50 items-center justify-center border-4 border-emerald-100 shadow-xs">
            <Check size={32} color="#059669" strokeWidth={2.5} />
          </View>
          <Text className="text-2xl font-bold text-slate-900 tracking-tight text-center">
            Payment successful
          </Text>
          <Text className="text-sm text-slate-500 max-w-xs text-center">
            Show this QR at the gym. Nothing to pay there.
          </Text>
        </View>

        {/* Card with QR */}
        <View
          style={[softShadow, { borderRadius: 24 }]}
          className="bg-white border border-black/[0.04] p-6 w-full items-center gap-5"
        >
          <View className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs items-center justify-center">
            <QRCode value={voucherCode} size={220} />
          </View>

          <View className="items-center gap-2">
            <Text className="font-mono text-base font-bold text-slate-900 tracking-wider">
              {voucherCode}
            </Text>
            <Chip color="green" size="sm">
              Paid - visit the gym to activate
            </Chip>
          </View>

          {/* Details Table */}
          <View className="border-t border-slate-100 pt-3 gap-2.5 w-full">
            <View className="flex-row justify-between py-1 border-b border-slate-50">
              <Text className="text-xs text-slate-400 font-medium">Gym</Text>
              <Text className="text-xs text-slate-900 font-semibold text-right">
                {gymName} ({locality})
              </Text>
            </View>

            <View className="flex-row justify-between py-1 border-b border-slate-50">
              <Text className="text-xs text-slate-400 font-medium">Plan</Text>
              <Text className="text-xs text-slate-900 font-semibold">{planName}</Text>
            </View>

            <View className="flex-row justify-between py-1 border-b border-slate-50">
              <Text className="text-xs text-slate-400 font-medium">Paid</Text>
              <Text className="text-xs text-brand font-bold">
                {formatINR(amountPaid)}
              </Text>
            </View>

            <View className="flex-row justify-between py-1">
              <Text className="text-xs text-slate-400 font-medium">Valid until</Text>
              <Text className="text-xs text-slate-900 font-medium">{validUntil}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="gap-2.5 w-full pt-1">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onPress={() => router.replace('/my-plan' as any)}
            >
              Go to My Plan
            </Button>

            <Button
              variant="secondary"
              size="md"
              fullWidth
              onPress={handleDirections}
              icon={Navigation}
            >
              Directions to gym
            </Button>

            <Pressable onPress={handleRefund} className="py-2 items-center">
              <Text className="text-xs text-slate-400 active:text-rose-600 underline">
                Request refund
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
