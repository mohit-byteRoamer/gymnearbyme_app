import React, { createContext, useContext, useState, useEffect } from 'react'
import { INITIAL_ACTIVE_PLAN, PAST_PLANS } from '../data/transactions.js'

const PlanContext = createContext(null)

export function PlanProvider({ children }) {
  const [activePlan, setActivePlan] = useState(() => {
    try {
      const saved = localStorage.getItem('gymapp_active_plan')
      return saved ? JSON.parse(saved) : INITIAL_ACTIVE_PLAN
    } catch {
      return INITIAL_ACTIVE_PLAN
    }
  })

  const [pastPlans, setPastPlans] = useState(() => {
    try {
      const saved = localStorage.getItem('gymapp_past_plans')
      return saved ? JSON.parse(saved) : PAST_PLANS
    } catch {
      return PAST_PLANS
    }
  })

  useEffect(() => {
    if (activePlan) {
      localStorage.setItem('gymapp_active_plan', JSON.stringify(activePlan))
    } else {
      localStorage.removeItem('gymapp_active_plan')
    }
  }, [activePlan])

  useEffect(() => {
    localStorage.setItem('gymapp_past_plans', JSON.stringify(pastPlans))
  }, [pastPlans])

  // Helper to set new purchase as active/not activated plan
  const setPurchasedPlan = (paymentResult, gym, plan) => {
    const newPlan = {
      id: `plan-${Date.now()}`,
      gymId: gym.id,
      gymName: gym.name,
      locality: gym.locality,
      planName: plan.name,
      durationDays: plan.durationDays,
      amountPaid: plan.price,
      status: 'PAID_NOT_ACTIVATED', // Start as Paid - visit the gym to activate
      startedAt: null,
      expiresAt: null,
      daysLeft: 7,
      progressPct: 0,
      voucherCode: paymentResult.voucherCode,
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
    setActivePlan((prev) => ({
      ...prev,
      status: 'ACTIVE',
      startedAt: '3 Nov 2026',
      expiresAt: '3 Dec 2026',
      daysLeft: 30,
      progressPct: 0,
    }))
  }

  // Request refund for unredeemed voucher
  const requestRefund = (reason = 'Changed my mind') => {
    if (!activePlan) return false
    // Move to past plans or set to empty
    const refundedEntry = {
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

  // Renew plan for ₹1,000
  const renewPlan = (amount = 1000) => {
    if (!activePlan) return
    setActivePlan((prev) => ({
      ...prev,
      status: 'ACTIVE',
      startedAt: '3 Nov 2026',
      expiresAt: '3 Dec 2026',
      daysLeft: 30,
      progressPct: 0,
    }))
  }

  return (
    <PlanContext.Provider
      value={{
        activePlan,
        pastPlans,
        setActivePlan,
        setPurchasedPlan,
        activatePlan,
        requestRefund,
        renewPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  )
}

export function usePlan() {
  const context = useContext(PlanContext)
  if (!context) throw new Error('usePlan must be used within PlanProvider')
  return context
}

