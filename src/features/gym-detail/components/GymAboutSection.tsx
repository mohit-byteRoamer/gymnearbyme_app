import React, { useState } from 'react'
import { Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import { Gym } from '../types/index.ts'

interface Props {
  gym: Gym
}

export function GymAboutSection({ gym }: Props) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section id="overview-section" className="space-y-4 pt-2">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-brand" />
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          About this gym
        </h2>
      </div>

      {/* Description with Expandable text */}
      <div className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed space-y-2">
        <p className={isExpanded ? '' : 'line-clamp-3'}>{gym.about}</p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-brand font-semibold text-xs sm:text-sm inline-flex items-center gap-1 hover:underline pt-1"
        >
          <span>{isExpanded ? 'Show less' : 'Read full overview'}</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* 4 Highlight USPs */}
      {gym.usps && gym.usps.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {gym.usps.map((usp, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 shadow-2xs"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                {usp}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

