import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Receipt, Dumbbell, ChevronRight } from 'lucide-react'
import { useTransactions } from '../context/TransactionContext.jsx'
import { formatINR } from '../utils/formatters.js'
import { Chip } from '../components/common/Chip.jsx'

export function TransactionsPage() {
  const navigate = useNavigate()
  const { transactions } = useTransactions()
  const [filter, setFilter] = useState('ALL') // 'ALL' | 'PAID' | 'REFUNDED'

  // Filter transactions
  const filtered = transactions.filter((tx) => {
    if (filter === 'PAID') return tx.status === 'PAID'
    if (filter === 'REFUNDED') return tx.status === 'REFUNDED'
    return true
  })

  // Group by month
  const grouped = filtered.reduce((acc, tx) => {
    const month = tx.monthGroup || 'Recent'
    if (!acc[month]) acc[month] = []
    acc[month].push(tx)
    return acc
  }, {})

  const statusColorMap = {
    PAID: 'green',
    REFUNDED: 'red',
    FAILED: 'red',
    PENDING: 'yellow',
  }

  const statusLabelMap = {
    PAID: 'Paid',
    REFUNDED: 'Refunded',
    FAILED: 'Failed',
    PENDING: 'Pending',
  }

  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
        Transactions
      </h1>

      {/* Filter Chips: All, Paid, Refunded */}
      <div className="flex items-center gap-2">
        {[
          { label: 'All', val: 'ALL' },
          { label: 'Paid', val: 'PAID' },
          { label: 'Refunded', val: 'REFUNDED' },
        ].map((f) => (
          <button
            key={f.val}
            onClick={() => setFilter(f.val)}
            className={`
              px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all select-none
              ${
                filter === f.val
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List grouped by month */}
      {Object.keys(grouped).length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-card border border-slate-200/80 p-8 sm:p-12 text-center shadow-card max-w-md mx-auto my-6 space-y-3">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Receipt className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No payments yet
          </h3>
          <p className="text-xs text-slate-500">
            Your membership purchases and receipts will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6 max-w-3xl">
          {Object.entries(grouped).map(([month, items]) => (
            <div key={month} className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                {month}
              </h3>

              <div className="bg-white rounded-card border border-slate-200/80 shadow-card divide-y divide-slate-100 overflow-hidden">
                {items.map((tx) => (
                  <div
                    key={tx.id}
                    onClick={() => navigate(`/transactions/${tx.id}`)}
                    className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50/80 transition cursor-pointer active:scale-[0.99] group"
                  >
                    {/* Left: Round light-blue icon + Gym Name (16/500) + Subtitle */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-brand flex items-center justify-center shrink-0 border border-blue-100">
                        <Dumbbell className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base font-medium text-slate-900 group-hover:text-brand transition-colors truncate">
                          {tx.gymName}
                        </h4>
                        <p className="text-xs text-slate-400 truncate">
                          {tx.planName} plan • {tx.displayDate}
                        </p>
                      </div>
                    </div>

                    {/* Right: Amount "₹1,000" + Status chip below */}
                    <div className="text-right shrink-0 space-y-1">
                      <span className="text-base font-bold text-slate-900 block">
                        {formatINR(tx.amount)}
                      </span>
                      <Chip color={statusColorMap[tx.status] || 'slate'} size="xs">
                        {statusLabelMap[tx.status] || tx.status}
                      </Chip>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

