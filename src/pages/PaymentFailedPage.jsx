import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AlertCircle, XCircle } from 'lucide-react'
import { Button } from '../components/common/Button.jsx'

export function PaymentFailedPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isCancelled = searchParams.get('type') === 'cancelled'

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-form bg-white rounded-card border border-slate-200/80 p-8 shadow-card text-center space-y-6">
        {/* Red Icon or Warning Icon */}
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto ring-8 ring-rose-50/60 shadow-xs">
          {isCancelled ? (
            <AlertCircle className="w-8 h-8 stroke-[2.2]" />
          ) : (
            <XCircle className="w-8 h-8 stroke-[2.2]" />
          )}
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">
            {isCancelled ? 'Payment Cancelled' : 'Payment Failed'}
          </h2>
          <p className="text-sm text-slate-500 max-w-xs mx-auto">
            {isCancelled
              ? 'Payment cancelled. You were not charged.'
              : 'Bank server timeout or transaction declined. Your money is safe.'}
          </p>
        </div>

        {/* Action Button */}
        <div className="space-y-3 pt-2">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigate(-1)}
          >
            Try again
          </Button>

          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => navigate('/home')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

