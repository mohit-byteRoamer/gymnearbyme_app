import React from 'react'
import { Check } from 'lucide-react'
import { formatINR } from '../../utils/formatters.js'
import { Chip } from '../common/Chip.jsx'
import { Button } from '../common/Button.jsx'
import { useNavigate } from 'react-router-dom'

export function PlanCard({
  plan,
  gymId,
  acceptsOnlineJoining = true,
  className = '',
}) {
  const navigate = useNavigate()

  const handleBuy = (e) => {
    e.stopPropagation()
    if (!acceptsOnlineJoining) return
    navigate(`/checkout?gym=${gymId}&plan=${plan.id}`)
  }

  return (
    <div
      className={`
        bg-white rounded-card border border-slate-200/80 p-4 shadow-subtle hover:border-slate-300 transition-all flex flex-col justify-between
        ${className}
      `}
    >
      <div>
        {/* Header: Name + Chip */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-slate-900">{plan.name}</h4>
            {plan.chip && (
              <Chip color={plan.chip.color} size="xs">
                {plan.chip.text}
              </Chip>
            )}
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {plan.durationDays} days
          </span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className="text-xl sm:text-2xl font-bold text-slate-900">
            {formatINR(plan.price)}
          </span>
          <span className="text-xs text-slate-500 font-normal"> / {plan.durationDays} days</span>
        </div>

        {/* Feature lines with check icons */}
        <div className="space-y-1.5 mb-4">
          {plan.features?.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Buy Button or Disabled message */}
      <div>
        {acceptsOnlineJoining ? (
          <Button
            variant="primary"
            size="sm"
            fullWidth
            onClick={handleBuy}
          >
            Buy {plan.name}
          </Button>
        ) : (
          <div className="pt-2 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-400 font-medium block">
              Online joining unavailable
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

