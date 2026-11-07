import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  QrCode,
  Navigation,
  Clock,
  AlertTriangle,
  RotateCw,
  Dumbbell,
  X,
  MapPin,
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { formatINR } from '../utils/formatters.js'
import { usePlan } from '../context/PlanContext.jsx'
import { useDevState } from '../context/DevStateContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { Button } from '../components/common/Button.jsx'
import { Chip } from '../components/common/Chip.jsx'

export function MyPlanPage() {
  const navigate = useNavigate()
  const { activePlan, pastPlans, renewPlan, requestRefund } = usePlan()
  const { activePlanOverride } = useDevState()
  const { showToast } = useToast()

  const [isQrModalOpen, setIsQrModalOpen] = useState(false)

  // Determine current plan state
  // Overrides take precedence if active in dev switcher
  let effectiveState = activePlanOverride || activePlan?.status || 'EMPTY'

  // If activePlan has <= 5 days, automatically treat as EXPIRING if not overridden
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
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank')
  }

  const handleRenew = () => {
    renewPlan(1000)
    showToast('Plan renewed for 30 days! ₹1,000', 'info')
  }

  const handleRefund = () => {
    if (window.confirm('Request 100% refund for this unredeemed voucher?')) {
      requestRefund('User requested refund')
      showToast('Refund requested. Funds returned to UPI account.', 'info')
    }
  }

  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6">
      {/* Title "My plan" */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          My plan
        </h1>
        {effectiveState === 'PAID_NOT_ACTIVATED' && (
          <span className="text-xs text-brand font-medium">1 pass pending scan</span>
        )}
      </div>

      {/* STATE 1: EMPTY */}
      {effectiveState === 'EMPTY' && (
        <div className="bg-white rounded-card border border-slate-200/80 p-8 sm:p-12 text-center shadow-card max-w-md mx-auto my-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Dumbbell className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              You have no plan yet
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Find a gym near you and join in minutes.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/home')}
            className="px-6"
          >
            Find a gym
          </Button>
        </div>
      )}

      {/* STATE 2: PAID BUT NOT ACTIVATED */}
      {effectiveState === 'PAID_NOT_ACTIVATED' && (
        <div className="bg-white rounded-card border border-slate-200/90 p-5 sm:p-6 shadow-card max-w-xl mx-auto space-y-5 text-center">
          <div className="space-y-1 text-left">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{gymName}</h2>
              <Chip color="green" size="xs">
                Paid - visit the gym to activate
              </Chip>
            </div>
            <p className="text-xs text-slate-500">{locality}, Ludhiana • {planName} plan</p>
          </div>

          {/* Large Voucher QR */}
          <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-xs inline-block mx-auto">
            <QRCodeSVG value={voucherCode} size={200} level="H" />
          </div>

          <div className="space-y-1">
            <div className="font-mono text-base font-bold text-slate-900 tracking-wider">
              {voucherCode}
            </div>
            <p className="text-xs text-amber-800 bg-amber-50 py-1 px-3 rounded-full inline-block font-medium">
              Valid until {validUntil} (6 days left)
            </p>
          </div>

          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Show this screen to the reception at {gymName}. Your 30 days will start the moment they scan it.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              variant="primary"
              size="md"
              onClick={handleDirections}
              icon={Navigation}
              className="w-full sm:w-auto px-6"
            >
              Directions
            </Button>

            <button
              onClick={handleRefund}
              className="text-xs text-slate-400 hover:text-rose-600 transition underline pt-2 sm:pt-0"
            >
              Request refund
            </button>
          </div>
        </div>
      )}

      {/* STATE 3: EXPIRED */}
      {effectiveState === 'EXPIRED' && (
        <div className="bg-white rounded-card border border-slate-200/80 p-6 shadow-card max-w-xl mx-auto space-y-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">{gymName}</h2>
              <span className="text-xs text-slate-500">{locality}, Ludhiana • {planName}</span>
            </div>
            <Chip color="slate" size="xs">
              Expired
            </Chip>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl text-center space-y-1">
            <span className="text-xs text-slate-500 block">Status</span>
            <span className="text-sm font-semibold text-slate-800 block">
              Your plan ended on 30 Oct 2026
            </span>
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleRenew}
            icon={RotateCw}
          >
            Renew for {formatINR(amountPaid)}
          </Button>
        </div>
      )}

      {/* STATE 4 & 5: ACTIVE OR EXPIRING SOON */}
      {(effectiveState === 'ACTIVE' || effectiveState === 'EXPIRING') && (
        <div className="space-y-6 max-w-xl mx-auto">
          {/* Main Plan Card */}
          <div className="bg-white rounded-card border border-slate-200/90 p-5 sm:p-6 shadow-card space-y-5">
            {/* Yellow banner if expiring soon */}
            {effectiveState === 'EXPIRING' && (
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-center gap-2 text-xs text-amber-800 font-semibold animate-fade-in">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Your plan ends in {daysLeft} days! Renew now to keep workout streak.</span>
              </div>
            )}

            {/* Gym Name & Locality */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                  {gymName}
                </h2>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{locality}, Ludhiana</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {planName}
                </span>
                <Chip color="green" size="xs">
                  Active
                </Chip>
              </div>
            </div>

            {/* Big "12 days left" (24/700) & Progress Bar */}
            <div className="py-2 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {daysLeft} days left
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {30 - daysLeft}/30 days used
                </span>
              </div>

              {/* Thin blue progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    effectiveState === 'EXPIRING' ? 'bg-amber-500' : 'bg-brand'
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Rows: Started, Expires, Amount paid */}
            <div className="border-t border-slate-100 pt-3 text-xs space-y-2 text-slate-600">
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Started</span>
                <span className="font-medium text-slate-800">{startedAt}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Expires</span>
                <span className="font-medium text-slate-800">{expiresAt}</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Amount paid</span>
                <span className="font-bold text-slate-900">{formatINR(amountPaid)}</span>
              </div>
            </div>

            {/* Action Buttons: Show my QR & Directions, or Renew if expiring */}
            {effectiveState === 'EXPIRING' ? (
              <div className="space-y-2 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleRenew}
                  icon={RotateCw}
                >
                  Renew for {formatINR(amountPaid)}
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setIsQrModalOpen(true)}
                    icon={QrCode}
                  >
                    Show my QR
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={handleDirections}
                    icon={Navigation}
                  >
                    Directions
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setIsQrModalOpen(true)}
                  icon={QrCode}
                >
                  Show my QR
                </Button>

                <Button
                  variant="secondary"
                  size="md"
                  onClick={handleDirections}
                  icon={Navigation}
                >
                  Directions
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Past Plans Section */}
      {pastPlans && pastPlans.length > 0 && effectiveState !== 'EMPTY' && (
        <div className="space-y-3 max-w-xl mx-auto pt-4 border-t border-slate-200/80">
          <h3 className="text-sm font-bold text-slate-700">Past plans</h3>
          <div className="space-y-2">
            {pastPlans.map((past) => (
              <div
                key={past.id}
                className="bg-white rounded-xl border border-slate-200/70 p-3.5 shadow-2xs flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{past.gymName}</h4>
                  <span className="text-[11px] text-slate-400">
                    {past.planName} • {past.dates}
                  </span>
                </div>
                <Chip color={past.status === 'Refunded' ? 'red' : 'slate'} size="xs">
                  {past.status}
                </Chip>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR MODAL (When clicking "Show my QR") */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsQrModalOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
          />
          <div className="relative bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl max-w-sm w-full z-10 text-center space-y-4 animate-scale-up">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-slate-900">{gymName}</h3>
              <p className="text-xs text-slate-500">Scan at gym turnstile or desk</p>
            </div>

            <div className="p-3 bg-white border border-slate-100 rounded-2xl inline-block mx-auto shadow-xs">
              <QRCodeSVG value={voucherCode} size={220} level="H" />
            </div>

            <div className="font-mono text-sm font-bold text-slate-800">
              {voucherCode}
            </div>

            <p className="text-[11px] text-slate-400">
              Valid for {daysLeft} more days until {expiresAt}
            </p>

            <Button
              variant="secondary"
              size="sm"
              fullWidth
              onClick={() => setIsQrModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

