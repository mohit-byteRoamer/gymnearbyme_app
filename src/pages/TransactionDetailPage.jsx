import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Copy, Check, Download, AlertCircle } from 'lucide-react'
import { useTransactions } from '../context/TransactionContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { formatINR } from '../utils/formatters.js'
import { Chip } from '../components/common/Chip.jsx'
import { Button } from '../components/common/Button.jsx'

export function TransactionDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getTransactionById, refundTransaction } = useTransactions()
  const { showToast } = useToast()

  const [copied, setCopied] = useState(false)
  const tx = getTransactionById(id)

  if (!tx) {
    return (
      <div className="max-w-form mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Transaction not found</h2>
        <Button variant="primary" onClick={() => navigate('/transactions')}>
          Back to Transactions
        </Button>
      </div>
    )
  }

  const handleCopyPaymentId = () => {
    navigator.clipboard.writeText(tx.paymentId)
    setCopied(true)
    showToast('Payment ID copied to clipboard', 'info')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadInvoice = () => {
    showToast('Invoice download coming soon for GST compliance.', 'info')
  }

  const handleRefund = () => {
    if (window.confirm('Request a refund for this transaction?')) {
      refundTransaction(tx.id)
      showToast('Refund initiated. Funds will be returned via UPI within 24 hours.', 'info')
    }
  }

  const statusColorMap = {
    PAID: 'green',
    REFUNDED: 'red',
    FAILED: 'red',
    PENDING: 'yellow',
  }

  return (
    <div className="max-w-form mx-auto px-4 py-4 sm:py-6 space-y-5">
      {/* Top Bar with Back */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-700 hover:bg-slate-50 active:scale-95 transition"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-bold text-slate-900">Payment Details</h1>
      </div>

      {/* Big Amount + Status Chip */}
      <div className="text-center py-4 space-y-2">
        <div className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          {formatINR(tx.amount)}
        </div>
        <div>
          <Chip color={statusColorMap[tx.status] || 'slate'} size="sm">
            {tx.status}
          </Chip>
        </div>
      </div>

      {/* White Card with Breakdown Rows */}
      <div className="bg-white rounded-card border border-slate-200/90 p-5 shadow-card space-y-3.5 text-xs text-slate-600 divide-y divide-slate-100">
        <div className="flex justify-between py-1">
          <span className="text-slate-400 font-medium">Gym</span>
          <span className="font-semibold text-slate-900 text-right">
            {tx.gymName} ({tx.locality})
          </span>
        </div>

        <div className="flex justify-between pt-2.5">
          <span className="text-slate-400 font-medium">Plan</span>
          <span className="font-semibold text-slate-900">
            {tx.planName} ({tx.planDuration})
          </span>
        </div>

        <div className="flex justify-between pt-2.5">
          <span className="text-slate-400 font-medium">Date & time</span>
          <span className="font-medium text-slate-800">{tx.displayDate}</span>
        </div>

        <div className="flex justify-between pt-2.5">
          <span className="text-slate-400 font-medium">Payment method</span>
          <span className="font-medium text-slate-800">{tx.paymentMethod}</span>
        </div>

        {/* Payment ID with copy icon */}
        <div className="flex items-center justify-between pt-2.5">
          <span className="text-slate-400 font-medium">Payment ID</span>
          <button
            onClick={handleCopyPaymentId}
            className="flex items-center gap-1.5 font-mono text-slate-800 hover:text-brand transition cursor-pointer"
            title="Click to copy"
          >
            <span>{tx.paymentId}</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        </div>

        <div className="flex justify-between pt-2.5">
          <span className="text-slate-400 font-medium">Order ID</span>
          <span className="font-mono text-slate-800">{tx.orderId}</span>
        </div>

        <div className="flex justify-between pt-2.5">
          <span className="text-slate-400 font-medium">Status</span>
          <span className="font-semibold text-slate-900">{tx.status}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-3 pt-2">
        <Button
          variant="secondary"
          size="md"
          fullWidth
          onClick={handleDownloadInvoice}
          icon={Download}
        >
          Download invoice
        </Button>

        {/* Only when allowed: text link "Request refund" */}
        {tx.canRefund && tx.status === 'PAID' && (
          <button
            onClick={handleRefund}
            className="text-xs text-slate-400 hover:text-rose-600 transition underline block mx-auto pt-1"
          >
            Request refund
          </button>
        )}
      </div>
    </div>
  )
}

