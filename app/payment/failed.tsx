import React from 'react'
import { View, Text } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { AlertCircle, XCircle } from 'lucide-react-native'
import { Button } from '../../src/components/common/Button'

export default function PaymentFailedScreen() {
  const router = useRouter()
  const params = useLocalSearchParams<{ type?: string }>()
  const isCancelled = params.type === 'cancelled'

  return (
    <View className="flex-1 bg-slate-50 items-center justify-center p-4">
      <View className="w-full max-w-form bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm items-center text-center gap-6">
        {/* Red Icon */}
        <View className="w-16 h-16 rounded-full bg-rose-50 items-center justify-center border-4 border-rose-100 shadow-xs">
          {isCancelled ? (
            <AlertCircle size={32} color="#E11D48" strokeWidth={2.2} />
          ) : (
            <XCircle size={32} color="#E11D48" strokeWidth={2.2} />
          )}
        </View>

        {/* Text */}
        <View className="items-center gap-2">
          <Text className="text-xl font-bold text-slate-900 text-center">
            {isCancelled ? 'Payment Cancelled' : 'Payment Failed'}
          </Text>
          <Text className="text-sm text-slate-500 max-w-xs text-center leading-relaxed">
            {isCancelled
              ? 'Payment cancelled. You were not charged.'
              : 'Bank server timeout or transaction declined. Your money is safe.'}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="gap-3 w-full pt-2">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => router.back()}
          >
            Try again
          </Button>

          <Button
            variant="secondary"
            size="md"
            fullWidth
            onPress={() => router.replace('/home' as any)}
          >
            Back to Home
          </Button>
        </View>
      </View>
    </View>
  )
}
