import React from 'react'
import { Clock, Info } from 'lucide-react'
import { Gym } from '../types/index.ts'
import { getLiveOpenStatus } from '../utils/pricing.ts'

interface Props {
  gym: Gym
}

export function GymTimingsSection({ gym }: Props) {
  const liveStatus = getLiveOpenStatus(gym.timingsSchedule)

  const now = new Date()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const todayName = days[now.getDay()]

  return (
    <section id="timings-section" className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Operating Hours & Timings
          </h2>
        </div>

        {/* Live Status Pill */}
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
            liveStatus.statusColor === 'emerald'
              ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
              : 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200 dark:border-amber-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{liveStatus.statusText}</span>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-slate-800 overflow-hidden shadow-2xs divide-y divide-slate-100 dark:divide-slate-700/60">
        {gym.timingsSchedule.map((t, idx) => {
          const isToday =
            t.day.toLowerCase() === todayName.toLowerCase() || t.isToday

          return (
            <div
              key={idx}
              className={`flex items-center justify-between px-4 sm:px-6 py-3.5 text-sm transition ${
                isToday
                  ? 'bg-brand-50/70 dark:bg-brand-950/30 font-bold text-brand dark:text-brand-300'
                  : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{t.day}</span>
                {isToday && (
                  <span className="text-[10px] font-extrabold uppercase bg-brand text-white px-2 py-0.5 rounded-full shadow-2xs">
                    Today
                  </span>
                )}
              </div>

              <div className="font-semibold text-slate-900 dark:text-slate-100">
                {t.isClosed ? (
                  <span className="text-rose-500 font-bold">Closed</span>
                ) : (
                  <span>
                    {t.openTime} – {t.closeTime}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Holiday Note */}
      <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400">
        <Info className="w-4 h-4 text-brand shrink-0 mt-0.5" />
        <span>
          <strong>Holiday Policy:</strong> Center remains open 365 days a year. Special modified class schedules may apply on Diwali, Gurpurab, and New Year’s Day.
        </span>
      </div>
    </section>
  )
}

