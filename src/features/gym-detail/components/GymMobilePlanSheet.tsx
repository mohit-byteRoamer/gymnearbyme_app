import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react'
import { Gym, Plan } from '../types/index.ts'
import {
  formatINR,
  calculatePerDay,
  calculateSavings,
} from '../utils/pricing.ts'
import { useGymDetailStore } from '../store/gymDetailStore.ts'
import { useToast } from '../../../context/ToastContext.jsx'

interface Props {
  gym: Gym
}

export function GymMobilePlanSheet({ gym }: Props) {
  const navigate = useNavigate()
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileSheetOpen(false)
    }
    if (isMobileSheetOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isMobileSheetOpen, setIsMobileSheetOpen])

  const handleCheckout = () => {
    if (!gym.acceptsOnlineJoining) {
      showToast('This gym is not accepting online joins right now.', 'warning')
      return
    }
    setIsMobileSheetOpen(false)
    navigate(`/checkout?gym=${gym.id}&plan=${activePlan.id}`)
  }

  return (
    <AnimatePresence>
      {isMobileSheetOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileSheetOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Bottom Sheet Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 bg-white dark:bg-slate-900 rounded-t-3xl border-t border-slate-200 dark:border-slate-800 shadow-2xl max-h-[85vh] flex flex-col overflow-hidden pb-safe"
          >
            {/* Grab Handle & Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 text-center relative shrink-0">
              <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mb-2" />
              <div className="flex items-center justify-between px-2">
                <div className="text-left">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                    Choose Membership Plan
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pay online once. Activate with QR voucher at gym.
                  </p>
                </div>
                <button
                  onClick={() => setIsMobileSheetOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Plan Radio Cards */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {plans.map((p) => {
                const isSelected = p.id === activePlan.id
                const perDay = calculatePerDay(p.price, p.durationDays)
                const savings = calculateSavings(
                  p.price,
                  p.durationDays,
                  baseMonthlyPrice
                )

                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPlanId(p.id)}
                    className={`p-4 rounded-2xl border transition cursor-pointer select-none relative ${
                      isSelected
                        ? 'border-brand bg-brand-50/50 dark:bg-brand-950/40 ring-2 ring-brand'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                            {p.name}
                          </span>
                          {p.isRecommended && (
                            <span className="text-[10px] font-extrabold text-amber-900 bg-amber-400 px-2 py-0.5 rounded-full">
                              Best Value
                            </span>
                          )}
                          {savings.amount > 0 && !p.isRecommended && (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                              Save {formatINR(savings.amount)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xl font-black text-slate-900 dark:text-slate-100">
                            {formatINR(p.price)}
                          </span>
                          <span className="text-xs font-semibold text-brand">
                            ₹{perDay}/day
                          </span>
                          <span className="text-xs text-slate-400">
                            ({p.durationDays} days)
                          </span>
                        </div>
                      </div>

                      {/* Custom Radio Circle */}
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center border transition shrink-0 mt-0.5 ${
                          isSelected
                            ? 'border-brand bg-brand text-white'
                            : 'border-slate-300 dark:border-slate-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>

                    {/* Features snippet for selected plan */}
                    {isSelected && (
                      <div className="mt-3 pt-2.5 border-t border-brand-100 dark:border-slate-700 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {p.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Pinned Bottom CTA */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 space-y-2">
              <button
                onClick={handleCheckout}
                className="w-full h-12 rounded-2xl bg-brand hover:bg-brand-700 text-white font-extrabold text-base transition flex items-center justify-center gap-2 shadow-md active:scale-98"
              >
                <span>Continue · {formatINR(activePlan.price)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>100% Safe Online Booking · Instant QR Activation</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
