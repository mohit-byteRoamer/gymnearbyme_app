import React, { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { Gym } from '../types/index.ts'

interface Props {
  gym: Gym
}

export function GymFaqSection({ gym }: Props) {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3'])

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const faqs = gym.faqs || []
  if (faqs.length === 0) return null

  return (
    <section id="faqs-section" className="space-y-4 pt-4">
      <div className="flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-brand" />
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="space-y-2.5">
        {faqs.map((faq) => {
          const isOpen = openIds.includes(faq.id)

          return (
            <div
              key={faq.id}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-slate-800 overflow-hidden shadow-2xs transition"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 hover:text-brand transition select-none"
              >
                <span>{faq.question}</span>
                <span className="shrink-0 ml-3 text-slate-400">
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/60 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

