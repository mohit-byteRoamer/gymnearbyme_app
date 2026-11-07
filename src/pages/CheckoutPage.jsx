import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Lock, Info, ShieldCheck } from 'lucide-react'
import { getGymById } from '../utils/api.js'
import { formatINR } from '../utils/formatters.js'
import { useAuth } from '../context/AuthContext.jsx'
import { Button } from '../components/common/Button.jsx'
import { Card } from '../components/common/Card.jsx'

export function CheckoutPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, updatePhone } = useAuth()

  const gymId = searchParams.get('gym') || 'iron-forge-fitness'
  const planId = searchParams.get('plan') || 'plan-iron-monthly'

  const [gym, setGym] = useState(null)
  const [plan, setPlan] = useState(null)
  const [phone, setPhone] = useState(user?.phone ? user.phone.replace('+91', '') : '')
  const [phoneError, setPhoneError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    getGymById(gymId).then((g) => {
      setGym(g)
      const p = g.plans.find((x) => x.id === planId) || g.plans[0]
      setPlan(p)
    })
  }, [gymId, planId])

  if (!gym || !plan) {
    return (
      <div className="max-w-form mx-auto px-4 py-16 text-center">
        <div className="animate-spin w-6 h-6 border-2 border-brand border-t-transparent rounded-full mx-auto" />
      </div>
    )
  }

  const handlePay = () => {
    // If phone was missing, validate 10-digit Indian phone
    if (!user?.phone) {
      const cleanPhone = phone.trim()
      if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
        setPhoneError('Please enter a valid 10-digit mobile number')
        return
      }
      updatePhone(`+91${cleanPhone}`)
    }

    setIsProcessing(true)

    // Store pending checkout in sessionStorage for payment confirmation page
    sessionStorage.setItem(
      'gymapp_pending_checkout',
      JSON.stringify({
        gym,
        plan,
      })
    )

    // Navigate to payment confirming
    navigate('/payment/confirming')
  }

  return (
    <div className="max-w-form mx-auto px-4 py-4 sm:py-6 space-y-4">
      {/* Top Bar "Checkout" */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Checkout</h1>
      </div>

      <div className="bg-white rounded-card border border-slate-200/80 p-5 sm:p-6 shadow-card space-y-5">
        {/* Summary Card */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <img
            src={gym.coverPhoto}
            alt={gym.name}
            className="w-16 h-16 rounded-xl object-cover shrink-0 ring-1 ring-slate-100"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-900 truncate">
              {gym.name}
            </h3>
            <p className="text-xs text-slate-500 mb-1">
              {gym.locality}, Ludhiana
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand bg-blue-50 px-2 py-0.5 rounded">
                {plan.name}, {plan.durationDays} days
              </span>
              <span className="text-sm font-bold text-slate-900">
                {formatINR(plan.price)}
              </span>
            </div>
          </div>
        </div>

        {/* Light-blue Info Box */}
        <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-blue-900 leading-relaxed">
          <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold block mb-0.5">100% Online Payment</span>
            Pay {formatINR(plan.price)} now. Nothing to pay at the gym. Your plan starts when the gym scans your QR.
          </div>
        </div>

        {/* Phone number input if missing */}
        {!user?.phone && (
          <div className="space-y-1.5 pt-1">
            <label className="block text-xs font-semibold text-slate-800">
              Phone number
            </label>
            <div className="flex rounded-xl border border-slate-200 overflow-hidden shadow-2xs focus-within:border-brand focus-within:ring-1 focus-within:ring-brand">
              <span className="bg-slate-50 text-slate-500 text-xs px-3 py-2.5 border-r border-slate-200 flex items-center font-medium">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ''))
                  setPhoneError('')
                }}
                placeholder="98765 43210"
                className="flex-1 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
            {phoneError ? (
              <p className="text-xs text-rose-600 font-medium">{phoneError}</p>
            ) : (
              <p className="text-[11px] text-slate-400">
                The gym will use this to find your membership.
              </p>
            )}
          </div>
        )}

        {/* Total Row "Total ₹1,000" (20/700) */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm text-slate-500 font-medium">Total Amount</span>
          <span className="text-xl sm:text-2xl font-bold text-slate-900">
            {formatINR(plan.price)}
          </span>
        </div>

        {/* Links "Terms" and "Refund policy" */}
        <div className="text-center text-xs text-slate-400 space-x-2">
          <span>By paying you agree to our</span>
          <a
            href="#terms"
            onClick={(e) => {
              e.preventDefault()
              alert('Terms of Service: Plans are non-transferable. Valid for activation up to 7 days from purchase.')
            }}
            className="text-brand hover:underline font-medium"
          >
            Terms
          </a>
          <span>&</span>
          <a
            href="#refund"
            onClick={(e) => {
              e.preventDefault()
              alert('Refund Policy: 100% money back before the QR voucher is scanned at the gym within 7 days.')
            }}
            className="text-brand hover:underline font-medium"
          >
            Refund policy
          </a>
        </div>

        {/* Primary Pay Button */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isProcessing}
          onClick={handlePay}
        >
          Pay {formatINR(plan.price)}
        </Button>

        {/* Lock icon with "Secure payment with UPI and cards" */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-1">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Secure payment with UPI and cards</span>
        </div>
      </div>
    </div>
  )
}

