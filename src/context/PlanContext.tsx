import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { INITIAL_ACTIVE_PLAN, PAST_PLANS, ActivePlan, PastPlan } from '../data/transactions'
import { GymItem, GymPlan } from '../data/gyms'
import { PaymentSimulationResult } from '../utils/api'
import { storage } from '../utils/storage'

interface PlanContextType {
  activePlan: ActivePlan | null
  pastPlans: PastPlan[]
  setPurchasedPlan: (paymentResult: PaymentSimulationResult, gym: GymItem, plan: GymPlan) => ActivePlan
  activatePlan: () => void
  requestRefund: (reason?: string) => boolean
  renewPlan: (amount?: number) => void
  setActivePlan: React.Dispatch<React.SetStateAction<ActivePlan | null>>
}

const PlanContext = createContext<PlanContextType | null>(null)

const ACTIVE_PLAN_KEY = 'gymapp_active_plan'
const PAST_PLANS_KEY = 'gymapp_past_plans'

export function PlanProvider({ children }: { children: ReactNode }) {
  const [activePlan, setActivePlan] = useState<ActivePlan | null>(INITIAL_ACTIVE_PLAN)
  const [pastPlans, setPastPlans] = useState<PastPlan[]>(PAST_PLANS)

  // Initialize from AsyncStorage
  useEffect(() => {
    storage.getItem<ActivePlan | null>(ACTIVE_PLAN_KEY, INITIAL_ACTIVE_PLAN).then((saved) => {
      if (saved) setActivePlan(saved)
    })
    storage.getItem<PastPlan[]>(PAST_PLANS_KEY, PAST_PLANS).then((saved) => {
      if (saved) setPastPlans(saved)
    })
  }, [])

  // Persist active plan
  useEffect(() => {
    if (activePlan) {
      storage.setItem(ACTIVE_PLAN_KEY, activePlan)
    } else {
      storage.removeItem(ACTIVE_PLAN_KEY)
    }
  }, [activePlan])

  // Persist past plans
  useEffect(() => {
    storage.setItem(PAST_PLANS_KEY, pastPlans)
  }, [pastPlans])

  // Helper to set new purchase as active/not activated plan
  const setPurchasedPlan = (paymentResult: PaymentSimulationResult, gym: GymItem, plan: GymPlan): ActivePlan => {
    const newPlan: ActivePlan = {
      id: `plan-${Date.now()}`,
      gymId: gym.id,
      gymName: gym.name,
      locality: gym.locality,
      planName: plan.name,
      durationDays: plan.durationDays,
      amountPaid: plan.price,
      status: 'PAID_NOT_ACTIVATED',
      startedAt: null,
      expiresAt: null,
      daysLeft: 7,
      progressPct: 0,
      voucherCode: paymentResult.voucherCode || `GYM-LDH-${Math.floor(1000 + Math.random() * 9000)}`,
      validUntil: '7 Nov 2026',
      validUntilFull: paymentResult.validUntil,
      lat: gym.lat,
      lng: gym.lng,
    }
    setActivePlan(newPlan)
    return newPlan
  }

  // Activate voucher pass (simulated when gym scans QR)
  const activatePlan = () => {
    if (!activePlan) return
    setActivePlan((prev) =>
      prev
        ? {
            ...prev,
            status: 'ACTIVE',
            startedAt: '3 Nov 2026',
            expiresAt: '3 Dec 2026',
            daysLeft: 30,
            progressPct: 0,
          }
        : null
    )
  }

  // Request refund for unredeemed voucher
  const requestRefund = (reason: string = 'Changed my mind'): boolean => {
    if (!activePlan) return false
    const refundedEntry: PastPlan = {
      id: `past-refund-${Date.now()}`,
      gymName: activePlan.gymName,
      locality: activePlan.locality,
      planName: activePlan.planName,
      dates: 'Refunded on ' + new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Refunded',
    }
    setPastPlans((prev) => [refundedEntry, ...prev])
    setActivePlan(null)
    return true
  }

  // Renew plan
  const renewPlan = (amount: number = 1000) => {
    if (!activePlan) return
    setActivePlan((prev) =>
      prev
        ? {
            ...prev,
            status: 'ACTIVE',
            startedAt: '3 Nov 2026',
            expiresAt: '3 Dec 2026',
            daysLeft: 30,
            progressPct: 0,
            amountPaid: amount,
          }
        : null
    )
  }

  return (
    <PlanContext.Provider
      value={{
        activePlan,
        pastPlans,
        setPurchasedPlan,
        activatePlan,
        requestRefund,
        renewPlan,
        setActivePlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  )
}

export function usePlan(): PlanContextType {
  const context = useContext(PlanContext)
  if (!context) throw new Error('usePlan must be used within PlanProvider')
  return context
}
