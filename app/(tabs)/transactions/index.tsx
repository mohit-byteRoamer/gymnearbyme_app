import React, { useState } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { Receipt, Dumbbell, ChevronRight } from 'lucide-react-native'
import { useTransactions } from '../../../src/context/TransactionContext'
import { formatINR } from '../../../src/utils/formatters'
import { Chip } from '../../../src/components/common/Chip'
import { useBreakpoint } from '../../../src/hooks/useBreakpoint'
import { Transaction } from '../../../src/data/transactions'
import { softShadow } from '../../../src/theme/shadows'

export default function TransactionsScreen() {
  const router = useRouter()
  const { transactions } = useTransactions()
  const { isPhone } = useBreakpoint()
  const [filter, setFilter] = useState<'ALL' | 'PAID' | 'REFUNDED'>('ALL')

  const filtered = transactions.filter((tx) => {
    if (filter === 'PAID') return tx.status === 'PAID'
    if (filter === 'REFUNDED') return tx.status === 'REFUNDED'
    return true
  })

  const grouped = filtered.reduce((acc: Record<string, Transaction[]>, tx) => {
    const month = tx.monthGroup || 'Recent'
    if (!acc[month]) acc[month] = []
    acc[month].push(tx)
    return acc
  }, {})

  const statusColorMap = {
    PAID: 'green' as const,
    REFUNDED: 'red' as const,
    FAILED: 'red' as const,
    PENDING: 'yellow' as const,
  }

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ paddingBottom: isPhone ? 96 : 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="max-w-container w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 gap-6">
        <Text className="text-2xl font-bold text-slate-900 tracking-tight">
          Transactions
        </Text>

        {/* Filter Chips */}
        <View className="flex-row items-center gap-2">
          {[
            { label: 'All', val: 'ALL' as const },
            { label: 'Paid', val: 'PAID' as const },
            { label: 'Refunded', val: 'REFUNDED' as const },
          ].map((f) => (
            <Pressable
              key={f.val}
              onPress={() => setFilter(f.val)}
              className={`px-3.5 py-1.5 rounded-full ${
                filter === f.val
                  ? 'bg-slate-900 shadow-xs'
                  : 'bg-white border border-slate-200'
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  filter === f.val ? 'text-white' : 'text-slate-600'
                }`}
              >
                {f.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Grouped List */}
        {Object.keys(grouped).length === 0 ? (
          <View
            style={[softShadow, { borderRadius: 16 }]}
            className="bg-white border border-black/[0.04] p-8 sm:p-12 items-center text-center max-w-md mx-auto my-6 w-full gap-3"
          >
            <View className="w-14 h-14 rounded-full bg-slate-100 items-center justify-center">
              <Receipt size={28} color="#94A3B8" />
            </View>
            <Text className="text-base font-bold text-slate-900 text-center">
              No payments yet
            </Text>
            <Text className="text-xs text-slate-500 text-center">
              Your membership purchases and receipts will appear here.
            </Text>
          </View>
        ) : (
          <View className="gap-6 max-w-3xl">
            {Object.entries(grouped).map(([month, items]) => (
              <View key={month} className="gap-2.5">
                <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                  {month}
                </Text>

                <View
                  style={[softShadow, { borderRadius: 16 }]}
                  className="bg-white border border-black/[0.04] overflow-hidden"
                >
                  {items.map((tx, idx) => (
                    <Pressable
                      key={tx.id}
                      onPress={() => router.push(`/transactions/${tx.id}` as any)}
                      className={`p-4 flex-row items-center justify-between gap-3 active:bg-slate-50 ${
                        idx > 0 ? 'border-t border-slate-100' : ''
                      }`}
                    >
                      <View className="flex-row items-center gap-3 flex-1 min-w-0">
                        <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center">
                          <Dumbbell size={18} color="#2563EB" />
                        </View>
                        <View className="flex-1 min-w-0">
                          <Text numberOfLines={1} className="text-sm font-bold text-slate-900">
                            {tx.gymName}
                          </Text>
                          <Text numberOfLines={1} className="text-xs text-slate-500">
                            {tx.planName} • {tx.displayDate}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row items-center gap-3">
                        <View className="items-end gap-1">
                          <Text className="text-sm font-bold text-slate-900">
                            {formatINR(tx.amount)}
                          </Text>
                          <Chip color={statusColorMap[tx.status] || 'slate'} size="xs">
                            {tx.status}
                          </Chip>
                        </View>
                        <ChevronRight size={16} color="#94A3B8" />
                      </View>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  )
}
