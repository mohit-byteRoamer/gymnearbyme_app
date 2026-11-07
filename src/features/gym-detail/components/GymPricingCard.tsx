import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Check,
  ShieldCheck,
  Zap,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Gift,
} from 'lucide-react'
import { Gym, Plan } from '../types/index.ts'
import {
  formatINR,
  calculatePerDay,
  calculatePerMonth,
  calculateSavings,
} from '../utils/pricing.ts'
import { useGymDetailStore } from '../store/gymDetailStore.ts'
import { useToast } from '../../../context/ToastContext.jsx'

interface Props {
  gym: Gym
}

export function GymPricingCard({ gym }: Props) {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { selectedPlanId, setSelectedPlanId } = useGymDetailStore()

  const plans = gym.plans || []
  const monthlyPlan = plans.find((p) => p.durationDays === 30) || plans[0]
  const baseMonthlyPrice = monthlyPlan?.price || 1200

  // Active selected plan
  const activePlan: Plan =
    plans.find((p) => p.id === selectedPlanId) ||
    plans.find((p) => p.isRecommended) ||
    plans[0]

  const perDay = calculatePerDay(activePlan.price, activePlan.durationDays)
  const perMonth = calculatePerMonth(activePlan.price, activePlan.durationDays)
  const savings = calculateSavings(
    activePlan.price,
    activePlan.durationDays,
    baseMonthlyPrice
  )

  const handleCheckout = () => {
    if (!gym.acceptsOnlineJoining) {
      showToast('This gym is not accepting online joins right now.', 'warning')
      return
    }
    navigate(`/checkout?gym=${gym.id}&plan=${activePlan.id}`)
  }

  const handleFreeTrial = () => {
    showToast('Free 1-Day Trial Pass generated! Show at front desk.', 'success')
  }

  return (
    <div className="sticky top-24 rounded-3xl border border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-slate-800 shadow-floating p-5 sm:p-6 space-y-5 transition-all">
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-brand dark:text-brand-400">
            Membership Plans
          </span>
          {activePlan.isRecommended && (
            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-900 bg-amber-400 px-2 py-0.5 rounded-full shadow-2xs">
              <Sparkles className="w-3 h-3 fill-current" />
              Most Popular
            </span>
          )}
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-0.5">
          Select Your Plan
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Pay online once. Activate with QR voucher upon first visit.
        </p>
      </div>

      {/* Segmented Duration Selector (Tabs) */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl">
        {plans.map((p) => {
          const isSelected = p.id === activePlan.id

          return (
            <button
              key={p.id}
              onClick={() => setSelectedPlanId(p.id)}
              className={`relative py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center select-none ${
                isSelected
                  ? 'bg-white dark:bg-slate-800 text-brand dark:text-brand-300 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <span>{p.durationDays}d</span>
              <span className="text-[10px] font-medium opacity-80">
                {p.name.replace(' Pass', '').replace(' Elite', '')}
              </span>
              {p.isRecommended && (
                <span className="absolute -top-1.5 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>
          )
        })}
      </div>

      {/* Big Hero Price Display with Anchors */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-850 dark:to-slate-900 border border-blue-100/80 dark:border-slate-700/60">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                {formatINR(activePlan.price)}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                / {activePlan.durationDays} days
              </span>
            </div>

            {/* Per-day and effective per-month anchor */}
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="font-extrabold text-brand dark:text-brand-400">
                ₹{perDay}/day
              </span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <span className="text-slate-600 dark:text-slate-400 font-medium">
                ₹{perMonth}/mo effective
              </span>
            </div>
          </div>

          {/* Savings Badge */}
          {savings.amount > 0 && (
            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-black shadow-xs">
                Save {formatINR(savings.amount)}
              </span>
              <span className="block text-[10px] text-emerald-700 dark:text-emerald-400 font-bold mt-0.5">
                {savings.percent}% discount
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Feature Bullets for Selected Plan */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
          What’s Included:
        </span>
        <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          {activePlan.features.map((feat, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Primary & Secondary Action CTAs */}
      <div className="space-y-2.5 pt-1">
        <button
          onClick={handleCheckout}
          className="w-full h-12 rounded-2xl bg-brand hover:bg-brand-700 text-white font-extrabold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 group"
        >
          <span>Continue · {formatINR(activePlan.price)}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={handleFreeTrial}
          className="w-full h-10 rounded-2xl bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition flex items-center justify-center gap-1.5"
        >
          <Gift className="w-3.5 h-3.5 text-brand" />
          <span>Book a Free 1-Day Trial Pass</span>
        </button>
      </div>

      {/* Trust Signals Row */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-3 gap-1 text-center">
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
            100% Secure
          </span>
          <span className="text-[9px] text-slate-400">UPI / Cards</span>
        </div>

        <div className="flex flex-col items-center">
          <Zap className="w-4 h-4 text-amber-500 mb-1" />
          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
            Instant QR
          </span>
          <span className="text-[9px] text-slate-400">Zero wait</span>
        </div>

        <div className="flex flex-col items-center">
          <RotateCcw className="w-4 h-4 text-brand mb-1" />
          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
            Free Pause
          </span>
          <span className="text-[9px] text-slate-400">Travel cover</span>
        </div>
      </div>
    </div>
  )
}
