import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Navigation, Phone, ExternalLink } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { formatINR } from '../utils/formatters.js'
import { usePlan } from '../context/PlanContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { Button } from '../components/common/Button.jsx'
import { Chip } from '../components/common/Chip.jsx'

export function PaymentSuccessPage() {
  const navigate = useNavigate()
  const { activePlan, requestRefund } = usePlan()
  const { showToast } = useToast()
  const [refundRequested, setRefundRequested] = useState(false)

  // Fallback defaults if accessed directly
  const voucherCode = activePlan?.voucherCode || 'GYM-LDH-8921'
  const gymName = activePlan?.gymName || 'Iron Forge Fitness & CrossFit'
  const locality = activePlan?.locality || 'Model Town'
  const planName = activePlan?.planName || 'Monthly'
  const amountPaid = activePlan?.amountPaid || 1000
  const validUntil = activePlan?.validUntil || '7 Nov 2026'

  const handleDirections = () => {
    const lat = activePlan?.lat || 30.8936
    const lng = activePlan?.lng || 75.8344
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank')
  }

  const handleRefund = () => {
    if (window.confirm('Are you sure you want to request a refund for this unredeemed pass? 100% of ₹1,000 will be refunded to your original UPI account.')) {
      requestRefund('User requested refund after checkout')
      setRefundRequested(true)
      showToast('Refund requested successfully. Funds will reflect in 24 hours.', 'info')
      setTimeout(() => navigate('/transactions'), 1500)
    }
  }

  return (
    <div className="max-w-form mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Green check in light-green circle */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/60 shadow-xs">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Payment successful
        </h1>
        <p className="text-sm text-slate-500 max-w-xs mx-auto">
          Show this QR at the gym. Nothing to pay there.
        </p>
      </div>

      {/* White Card with QR (240x240) */}
      <div className="bg-white rounded-card border border-slate-200/90 p-6 shadow-card text-center space-y-5">
        {/* QR Code */}
        <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-2xs inline-block mx-auto">
          <QRCodeSVG
            value={voucherCode}
            size={240}
            level="H"
            includeMargin={false}
          />
        </div>

        {/* Voucher Code & Status Chip */}
        <div className="space-y-2">
          <div className="font-mono text-base font-bold text-slate-900 tracking-wider">
            {voucherCode}
          </div>
          <Chip color="green" size="sm">
            Paid - visit the gym to activate
          </Chip>
        </div>

        {/* Rows: Gym, Plan, Paid, Valid Until */}
        <div className="border-t border-slate-100 pt-3 text-xs space-y-2.5 text-left">
          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400 font-medium">Gym</span>
            <span className="text-slate-900 font-semibold text-right">
              {gymName} ({locality})
            </span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400 font-medium">Plan</span>
            <span className="text-slate-900 font-semibold">{planName}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400 font-medium">Paid</span>
            <span className="text-slate-900 font-bold text-brand">
              {formatINR(amountPaid)}
            </span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-slate-400 font-medium">Valid until</span>
            <span className="text-slate-900 font-medium">{validUntil}</span>
          </div>
        </div>

        {/* Action Buttons: Primary "Get directions", Secondary "Call gym" */}
        <div className="space-y-2.5 pt-2">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleDirections}
            icon={Navigation}
          >
            Get directions
          </Button>

          <a
            href="tel:+919876543210"
            className="w-full inline-flex items-center justify-center font-medium rounded-xl h-11 px-4 gap-2 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 shadow-sm active:scale-[0.98] transition text-sm"
          >
            <Phone className="w-4 h-4 text-slate-600" />
            <span>Call gym</span>
          </a>

          {/* Small link "Request refund" */}
          {!refundRequested ? (
            <button
              onClick={handleRefund}
              className="text-xs text-slate-400 hover:text-rose-600 transition underline pt-2 block mx-auto"
            >
              Request refund
            </button>
          ) : (
            <span className="text-xs text-rose-600 font-semibold pt-2 block">
              Refund Requested
            </span>
          )}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate('/my-plan')}
          className="text-sm font-semibold text-brand hover:underline"
        >
          View in My plan →
        </button>
      </div>
    </div>
  )
}

