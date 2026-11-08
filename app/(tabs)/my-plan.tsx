import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  Linking,
  Alert,
  Platform,
} from 'react-native'
import { useRouter } from 'expo-router'
import {
  QrCode,
  Navigation,
  AlertTriangle,
  RotateCw,
  Dumbbell,
  X,
  MapPin,
} from 'lucide-react-native'
import QRCode from 'react-native-qrcode-svg'
import { formatINR } from '../../src/utils/formatters'
import { usePlan } from '../../src/context/PlanContext'
import { useAuth } from '../../src/context/AuthContext'
import { useDevState } from '../../src/context/DevStateContext'
import { useToast } from '../../src/context/ToastContext'
import { useBreakpoint } from '../../src/hooks/useBreakpoint'
import { Button } from '../../src/components/common/Button'
import { Chip } from '../../src/components/common/Chip'
import { softShadow, softShadowSm } from '../../src/theme/shadows'

export default function MyPlanScreen() {
  const router = useRouter()
  const { isGuest } = useAuth()
  const { activePlan, pastPlans, renewPlan, requestRefund } = usePlan()
  const { activePlanOverride } = useDevState()
  const { showToast } = useToast()
  const { isPhone } = useBreakpoint()

  const [isQrModalOpen, setIsQrModalOpen] = useState(false)

  // Determine current plan state
  let effectiveState = activePlanOverride || activePlan?.status || 'EMPTY'

  if (!activePlanOverride && activePlan && activePlan.status === 'ACTIVE' && activePlan.daysLeft <= 5) {
    effectiveState = 'EXPIRING'
  }

  const gymName = activePlan?.gymName || 'Iron Forge Fitness & CrossFit'
  const locality = activePlan?.locality || 'Model Town'
  const planName = activePlan?.planName || 'Monthly'
  const amountPaid = activePlan?.amountPaid || 1000
  const startedAt = activePlan?.startedAt || '1 Nov 2026'
  const expiresAt = activePlan?.expiresAt || '30 Nov 2026'
  const daysLeft = effectiveState === 'EXPIRING' ? 5 : activePlan?.daysLeft ?? 12
  const progressPct = effectiveState === 'EXPIRING' ? 83 : activePlan?.progressPct ?? 60
  const voucherCode = activePlan?.voucherCode || 'GYM-LDH-8921'
  const validUntil = activePlan?.validUntil || '7 Nov 2026'

  const handleDirections = () => {
    const lat = activePlan?.lat || 30.8936
    const lng = activePlan?.lng || 75.8344
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`)
  }

  const handleRenew = () => {
    renewPlan(1000)
    showToast('Plan renewed for 30 days! ₹1,000', 'info')
  }

  const handleRefund = () => {
    const executeRefund = () => {
      requestRefund('User requested refund')
      showToast('Refund requested. Funds returned to UPI account.', 'info')
    }

    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined' && window.confirm('Request 100% refund for this unredeemed voucher?')) {
        executeRefund()
      }
    } else {
      Alert.alert(
        'Request Refund',
        'Request 100% refund for this unredeemed voucher? Funds will be returned via UPI within 24 hours.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Confirm Refund', style: 'destructive', onPress: executeRefund },
        ]
      )
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ paddingBottom: isPhone ? 96 : 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="max-w-container w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 gap-6">
        {/* Title */}
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-slate-900 tracking-tight">
            My plan
          </Text>
          {effectiveState === 'PAID_NOT_ACTIVATED' && (
            <Text className="text-xs text-brand font-medium">
              1 pass pending scan
            </Text>
          )}
        </View>

        {/* GUEST EXPLORER STATE */}
        {isGuest && (
          <View
            style={[softShadow, { borderRadius: 20 }]}
            className="bg-white border border-black/[0.04] p-8 sm:p-12 items-center text-center max-w-md mx-auto my-6 w-full gap-4"
          >
            <View className="w-16 h-16 rounded-full bg-blue-50 items-center justify-center">
              <Dumbbell size={32} color="#2563EB" />
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-slate-900 mb-1 text-center">
                Guest Explorer
              </Text>
              <Text className="text-xs text-slate-500 max-w-xs text-center leading-relaxed">
                You are currently browsing as a guest. Sign in to purchase plans, track membership days, and generate entry passes.
              </Text>
            </View>
            <View className="flex-row gap-2 w-full justify-center">
              <Button
                variant="primary"
                size="md"
                onPress={() => router.push('/login' as any)}
                className="px-5"
              >
                Sign In
              </Button>
              <Button
                variant="secondary"
                size="md"
                onPress={() => router.push('/home' as any)}
                className="px-5"
              >
                Browse Gyms
              </Button>
            </View>
          </View>
        )}

        {/* STATE 1: EMPTY */}
        {!isGuest && effectiveState === 'EMPTY' && (
          <View
            style={[softShadow, { borderRadius: 20 }]}
            className="bg-white border border-black/[0.04] p-8 sm:p-12 items-center text-center max-w-md mx-auto my-6 w-full gap-4"
          >
            <View className="w-16 h-16 rounded-full bg-slate-100 items-center justify-center">
              <Dumbbell size={32} color="#94A3B8" />
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-slate-900 mb-1 text-center">
                You have no plan yet
              </Text>
              <Text className="text-xs text-slate-500 max-w-xs text-center">
                Find a gym near you and join in minutes.
              </Text>
            </View>
            <Button
              variant="primary"
              size="md"
              onPress={() => router.push('/home' as any)}
              className="px-6"
            >
              Find a gym
            </Button>
          </View>
        )}

        {/* STATE 2: PAID NOT ACTIVATED */}
        {effectiveState === 'PAID_NOT_ACTIVATED' && (
          <View
            style={[softShadow, { borderRadius: 20 }]}
            className="bg-white border border-black/[0.04] p-5 sm:p-6 max-w-xl mx-auto w-full gap-5 items-center"
          >
            <View className="w-full gap-1">
              <View className="flex-row items-center justify-between">
                <Text className="text-lg font-bold text-slate-900">{gymName}</Text>
                <Chip color="green" size="xs">
                  Paid - visit gym to activate
                </Chip>
              </View>
              <Text className="text-xs text-slate-500">{locality}, Ludhiana • {planName} plan</Text>
            </View>

            {/* QR Code */}
            <View className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm items-center justify-center">
              <QRCode value={voucherCode} size={200} />
            </View>

            <View className="items-center gap-1">
              <Text className="font-mono text-base font-bold text-slate-900 tracking-wider">
                {voucherCode}
              </Text>
              <View className="bg-amber-50 py-1 px-3 rounded-full">
                <Text className="text-xs text-amber-800 font-medium">
                  Valid until {validUntil} (6 days left)
                </Text>
              </View>
            </View>

            <Text className="text-xs text-slate-500 max-w-sm text-center leading-relaxed">
              Show this screen to the reception at {gymName}. Your 30 days will start the moment they scan it.
            </Text>

            <View className="pt-2 flex-col sm:flex-row gap-3 w-full justify-center items-center">
              <Button
                variant="primary"
                size="md"
                onPress={handleDirections}
                icon={Navigation}
                className="w-full sm:w-auto px-6"
              >
                Directions
              </Button>

              <Pressable onPress={handleRefund} className="py-2">
                <Text className="text-xs text-slate-400 active:text-rose-600 underline">
                  Request refund
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* STATE 3: EXPIRED */}
        {effectiveState === 'EXPIRED' && (
          <View
            style={[softShadow, { borderRadius: 20 }]}
            className="bg-white border border-black/[0.04] p-6 max-w-xl mx-auto w-full gap-5"
          >
            <View className="flex-row items-start justify-between">
              <View>
                <Text className="text-lg font-bold text-slate-900">{gymName}</Text>
                <Text className="text-xs text-slate-500">{locality}, Ludhiana • {planName}</Text>
              </View>
              <Chip color="slate" size="xs">
                Expired
              </Chip>
            </View>

            <View className="p-4 bg-slate-50 rounded-xl items-center gap-1">
              <Text className="text-xs text-slate-500">Status</Text>
              <Text className="text-sm font-semibold text-slate-800">
                Your plan ended on 30 Oct 2026
              </Text>
            </View>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onPress={handleRenew}
              icon={RotateCw}
            >
              Renew for {formatINR(amountPaid)}
            </Button>
          </View>
        )}

        {/* STATE 4 & 5: ACTIVE OR EXPIRING */}
        {(effectiveState === 'ACTIVE' || effectiveState === 'EXPIRING') && (
          <View className="gap-6 max-w-xl mx-auto w-full">
            <View
              style={[softShadow, { borderRadius: 20 }]}
              className="bg-white border border-black/[0.04] p-5 sm:p-6 gap-5"
            >
              {/* Expiring Banner */}
              {effectiveState === 'EXPIRING' && (
                <View className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex-row items-center gap-2">
                  <AlertTriangle size={16} color="#D97706" />
                  <Text className="text-xs text-amber-800 font-semibold flex-1">
                    Your plan ends in {daysLeft} days! Renew now to keep workout streak.
                  </Text>
                </View>
              )}

              {/* Gym Name & Locality */}
              <View className="flex-row items-start justify-between gap-3">
                <View className="flex-1">
                  <Text className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                    {gymName}
                  </Text>
                  <View className="flex-row items-center gap-1 mt-0.5">
                    <MapPin size={14} color="#94A3B8" />
                    <Text className="text-xs text-slate-500">{locality}, Ludhiana</Text>
                  </View>
                </View>

                <View className="flex-row items-center gap-1.5">
                  <View className="bg-slate-100 px-2 py-0.5 rounded">
                    <Text className="text-xs font-semibold text-slate-600">
                      {planName}
                    </Text>
                  </View>
                  <Chip color="green" size="xs">
                    Active
                  </Chip>
                </View>
              </View>

              {/* Days left and Progress bar */}
              <View className="py-2 gap-2">
                <View className="flex-row items-baseline justify-between">
                  <Text className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {daysLeft} days left
                  </Text>
                  <Text className="text-xs text-slate-400 font-medium">
                    {30 - daysLeft}/30 days used
                  </Text>
                </View>

                <View className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <View
                    className={`h-full rounded-full ${
                      effectiveState === 'EXPIRING' ? 'bg-amber-500' : 'bg-brand'
                    }`}
                    style={{ width: `${progressPct}%` }}
                  />
                </View>
              </View>

              {/* Details table */}
              <View className="border-t border-slate-100 pt-3 gap-2">
                <View className="flex-row justify-between py-0.5">
                  <Text className="text-xs text-slate-400">Started</Text>
                  <Text className="text-xs font-medium text-slate-800">{startedAt}</Text>
                </View>
                <View className="flex-row justify-between py-0.5">
                  <Text className="text-xs text-slate-400">Expires</Text>
                  <Text className="text-xs font-medium text-slate-800">{expiresAt}</Text>
                </View>
                <View className="flex-row justify-between py-0.5">
                  <Text className="text-xs text-slate-400">Amount paid</Text>
                  <Text className="text-xs font-bold text-slate-900">{formatINR(amountPaid)}</Text>
                </View>
              </View>

              {/* Action Buttons */}
              {effectiveState === 'EXPIRING' ? (
                <View className="gap-2 pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onPress={handleRenew}
                    icon={RotateCw}
                  >
                    Renew for {formatINR(amountPaid)}
                  </Button>
                  <View className="flex-row gap-2">
                    <View className="flex-1">
                      <Button
                        variant="secondary"
                        size="md"
                        onPress={() => setIsQrModalOpen(true)}
                        icon={QrCode}
                      >
                        Show my QR
                      </Button>
                    </View>
                    <View className="flex-1">
                      <Button
                        variant="secondary"
                        size="md"
                        onPress={handleDirections}
                        icon={Navigation}
                      >
                        Directions
                      </Button>
                    </View>
                  </View>
                </View>
              ) : (
                <View className="flex-row gap-3 pt-2">
                  <View className="flex-1">
                    <Button
                      variant="primary"
                      size="md"
                      onPress={() => setIsQrModalOpen(true)}
                      icon={QrCode}
                    >
                      Show my QR
                    </Button>
                  </View>
                  <View className="flex-1">
                    <Button
                      variant="secondary"
                      size="md"
                      onPress={handleDirections}
                      icon={Navigation}
                    >
                      Directions
                    </Button>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Past Plans Section */}
        {pastPlans && pastPlans.length > 0 && effectiveState !== 'EMPTY' && (
          <View className="gap-3 max-w-xl mx-auto w-full pt-4 border-t border-slate-200/80">
            <Text className="text-sm font-bold text-slate-700">Past plans</Text>
            <View className="gap-2">
              {pastPlans.map((past) => (
                <View
                  key={past.id}
                  style={[softShadowSm, { borderRadius: 12 }]}
                  className="bg-white border border-black/[0.04] p-3.5 flex-row items-center justify-between"
                >
                  <View>
                    <Text className="text-xs font-bold text-slate-800">{past.gymName}</Text>
                    <Text className="text-[11px] text-slate-400">
                      {past.planName} • {past.dates}
                    </Text>
                  </View>
                  <Chip color={past.status === 'Refunded' ? 'red' : 'slate'} size="xs">
                    {past.status}
                  </Chip>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* QR MODAL */}
        <Modal
          visible={isQrModalOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsQrModalOpen(false)}
        >
          <View className="flex-1 bg-black/60 items-center justify-center p-4">
            <View className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl max-w-sm w-full items-center gap-4">
              <Pressable
                onPress={() => setIsQrModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-full active:bg-slate-100"
              >
                <X size={20} color="#94A3B8" />
              </Pressable>

              <View className="items-center">
                <Text className="text-lg font-bold text-slate-900 text-center">
                  {gymName}
                </Text>
                <Text className="text-xs text-slate-500 text-center">
                  Scan at gym turnstile or desk
                </Text>
              </View>

              <View className="p-3 bg-white border border-slate-100 rounded-2xl shadow-xs items-center justify-center">
                <QRCode value={voucherCode} size={220} />
              </View>

              <Text className="font-mono text-sm font-bold text-slate-800">
                {voucherCode}
              </Text>

              <Text className="text-[11px] text-slate-400 text-center">
                Valid for {daysLeft} more days until {expiresAt}
              </Text>

              <Button
                variant="secondary"
                size="sm"
                fullWidth
                onPress={() => setIsQrModalOpen(false)}
              >
                Close
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  )
}
