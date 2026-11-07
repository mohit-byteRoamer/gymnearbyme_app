import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  Platform,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ArrowLeft, Copy, Check, Download, AlertCircle } from 'lucide-react-native'
import * as Clipboard from 'expo-clipboard'
import { useTransactions } from '../../../src/context/TransactionContext'
import { useToast } from '../../../src/context/ToastContext'
import { formatINR } from '../../../src/utils/formatters'
import { Chip } from '../../../src/components/common/Chip'
import { Button } from '../../../src/components/common/Button'
import { softShadow } from '../../../src/theme/shadows'

export default function TransactionDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const { getTransactionById, refundTransaction } = useTransactions()
  const { showToast } = useToast()

  const [copied, setCopied] = useState(false)
  const tx = id ? getTransactionById(id) : undefined

  if (!tx) {
    return (
      <View className="max-w-form mx-auto px-4 py-16 items-center gap-4">
        <Text className="text-xl font-bold text-slate-900">Transaction not found</Text>
        <Button variant="primary" onPress={() => router.push('/transactions' as any)}>
          Back to Transactions
        </Button>
      </View>
    )
  }

  const handleCopyPaymentId = async () => {
    await Clipboard.setStringAsync(tx.paymentId)
    setCopied(true)
    showToast('Payment ID copied to clipboard', 'info')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadInvoice = () => {
    showToast('Invoice download coming soon for GST compliance.', 'info')
  }

  const handleRefund = () => {
    const executeRefund = () => {
      refundTransaction(tx.id)
      showToast('Refund initiated. Funds will be returned via UPI within 24 hours.', 'info')
    }

    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm('Request a refund for this transaction?')) {
        executeRefund()
      }
    } else {
      Alert.alert(
        'Request Refund',
        'Request a refund for this transaction? Funds will be returned via UPI within 24 hours.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Confirm', style: 'destructive', onPress: executeRefund },
        ]
      )
    }
  }

  const statusColorMap = {
    PAID: 'green' as const,
    REFUNDED: 'red' as const,
    FAILED: 'red' as const,
    PENDING: 'yellow' as const,
  }

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="max-w-form w-full mx-auto px-4 py-4 sm:py-6 gap-5">
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
          <Text className="text-lg font-bold text-slate-900">Payment Details</Text>
        </View>

        {/* Big Amount + Status Chip */}
        <View className="items-center py-4 gap-2">
          <Text className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            {formatINR(tx.amount)}
          </Text>
          <Chip color={statusColorMap[tx.status] || 'slate'} size="sm">
            {tx.status}
          </Chip>
        </View>

        {/* Card with Breakdown Rows */}
        <View
          style={[softShadow, { borderRadius: 20 }]}
          className="bg-white border border-black/[0.04] p-5 gap-3.5"
        >
          <View className="flex-row justify-between py-1">
            <Text className="text-slate-400 font-medium text-xs">Gym</Text>
            <Text className="font-semibold text-slate-900 text-xs text-right">
              {tx.gymName} ({tx.locality})
            </Text>
          </View>

          <View className="flex-row justify-between pt-2.5 border-t border-slate-100">
            <Text className="text-slate-400 font-medium text-xs">Plan</Text>
            <Text className="font-semibold text-slate-900 text-xs">
              {tx.planName} ({tx.planDuration})
            </Text>
          </View>

          <View className="flex-row justify-between pt-2.5 border-t border-slate-100">
            <Text className="text-slate-400 font-medium text-xs">Date & time</Text>
            <Text className="font-medium text-slate-800 text-xs">{tx.displayDate}</Text>
          </View>

          <View className="flex-row justify-between pt-2.5 border-t border-slate-100">
            <Text className="text-slate-400 font-medium text-xs">Payment method</Text>
            <Text className="font-medium text-slate-800 text-xs">{tx.paymentMethod}</Text>
          </View>

          <View className="flex-row justify-between items-center pt-2.5 border-t border-slate-100">
            <Text className="text-slate-400 font-medium text-xs">Payment ID</Text>
            <Pressable
              onPress={handleCopyPaymentId}
              className="flex-row items-center gap-1.5 active:opacity-70"
            >
              <Text className="font-mono text-xs text-brand font-medium">
                {tx.paymentId}
              </Text>
              {copied ? (
                <Check size={12} color="#059669" />
              ) : (
                <Copy size={12} color="#2563EB" />
              )}
            </Pressable>
          </View>

          <View className="flex-row justify-between pt-2.5 border-t border-slate-100">
            <Text className="text-slate-400 font-medium text-xs">Order ID</Text>
            <Text className="font-mono text-slate-700 text-xs">{tx.orderId}</Text>
          </View>

          <View className="flex-row justify-between pt-2.5 border-t border-slate-100">
            <Text className="text-slate-400 font-medium text-xs">Voucher code</Text>
            <Text className="font-mono font-bold text-slate-900 text-xs">
              {tx.voucherCode}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="gap-3 pt-2">
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onPress={handleDownloadInvoice}
            icon={Download}
          >
            Download receipt
          </Button>

          {tx.status === 'PAID' && tx.canRefund && (
            <Button
              variant="outline"
              size="md"
              fullWidth
              onPress={handleRefund}
            >
              Request refund
            </Button>
          )}
        </View>
      </View>
    </ScrollView>
  )
}
