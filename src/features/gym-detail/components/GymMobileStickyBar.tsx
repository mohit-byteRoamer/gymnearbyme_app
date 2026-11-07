import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Gym, Plan } from '../types/index.ts'
import { formatINR, calculatePerDay } from '../utils/pricing.ts'
import { useGymDetailStore } from '../store/gymDetailStore.ts'

interface Props {
  gym: Gym
}

export function GymMobileStickyBar({ gym }: Props) {
  const { selectedPlanId, setIsMobileSheetOpen } = useGymDetailStore()

  const plans = gym.plans || []
  const activePlan: Plan =
    plans.find((p) => p.id === selectedPlanId) ||
    plans.find((p) => p.isRecommended) ||
    plans[0]

  // Find lowest per-day price across all plans
  const minPerDay = Math.min(
    ...plans.map((p) => calculatePerDay(p.price, p.durationDays))
  )

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 shadow-2xl p-3 sm:px-6 pb-safe">
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        {/* Left: Price & Anchor */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              From
            </span>
            <span className="text-lg font-black text-slate-900 dark:text-slate-100">
              ₹{minPerDay}/day
            </span>
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-current" />
            <span>Instant QR Activation</span>
          </span>
        </div>

        {/* Right: CTA Button */}
        <button
          onClick={() => setIsMobileSheetOpen(true)}
          className="h-12 px-5 rounded-2xl bg-brand hover:bg-brand-700 text-white font-extrabold text-sm flex items-center gap-1.5 shadow-md active:scale-95 transition"
        >
          <span>Choose Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

