import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, RefreshCw } from 'lucide-react'
import { simulatePayment } from '../utils/api.js'
import { usePlan } from '../context/PlanContext.jsx'
import { useTransactions } from '../context/TransactionContext.jsx'
import { Button } from '../components/common/Button.jsx'

export function PaymentConfirmingPage() {
  const navigate = useNavigate()
  const { setPurchasedPlan } = usePlan()
  const { addTransaction } = useTransactions()

  const [seconds, setSeconds] = useState(0)
  const [isSlow, setIsSlow] = useState(false)

  useEffect(() => {
    // Read pending checkout info
    const raw = sessionStorage.getItem('gymapp_pending_checkout')
    let gym = { id: 'iron-forge-fitness', name: 'Iron Forge Fitness & CrossFit', locality: 'Model Town', lat: 30.8936, lng: 75.8344 }
    let plan = { id: 'plan-iron-monthly', name: 'Monthly', durationDays: 30, price: 1000 }

    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        gym = parsed.gym
        plan = parsed.plan
      } catch (e) {
        console.error(e)
      }
    }

    // Timer to track seconds
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s + 1 >= 60) setIsSlow(true)
        return s + 1
      })
    }, 1000)

    // Complete simulated payment after 3.2 seconds
    const paymentTimeout = setTimeout(async () => {
      try {
        const result = await simulatePayment(plan, gym)

        // Save purchase to My Plan and Transactions
        setPurchasedPlan(result, gym, plan)
        addTransaction(result, gym, plan)

        sessionStorage.setItem('gymapp_last_payment', JSON.stringify({ result, gym, plan }))
        navigate('/payment/success', { replace: true })
      } catch (err) {
        navigate('/payment/failed', { replace: true })
      }
    }, 3200)

    return () => {
      clearInterval(interval)
      clearTimeout(paymentTimeout)
    }
  }, [navigate, setPurchasedPlan, addTransaction])

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-form bg-white rounded-card border border-slate-200/80 p-8 shadow-card text-center space-y-6">
        {/* Centered Blue Progress Ring */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-brand/20 border-t-brand animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-brand" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">
            Confirming your payment
          </h2>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            This takes a few seconds. Please do not close the app.
          </p>
        </div>

        {/* 60 Seconds Timeout Notification State */}
        {isSlow && (
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-800 text-left space-y-3 animate-fade-in">
            <p className="font-medium">
              Still confirming. Your money is safe. We will notify you as soon as the bank responds.
            </p>
            <Button
              variant="secondary"
              size="sm"
              fullWidth
              onClick={() => window.location.reload()}
              icon={RefreshCw}
            >
              Check again
            </Button>
          </div>
        )}

        <div className="pt-2 text-xs text-slate-400">
          Encrypted 256-bit bank connection
        </div>
      </div>
    </div>
  )
}

