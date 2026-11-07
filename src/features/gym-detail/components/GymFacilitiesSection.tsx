import React from 'react'
import {
  Shield,
  Wind,
  Car,
  Lock,
  ShowerHead,
  Dumbbell,
  Activity,
  Grid,
  Maximize2,
  Wifi,
  Coffee,
  Waves,
  Check,
  X,
} from 'lucide-react'
import { Gym } from '../types/index.ts'

interface Props {
  gym: Gym
}

const ICON_MAP: Record<string, any> = {
  Wind,
  Car,
  Lock,
  ShowerHead,
  Dumbbell,
  Activity,
  Grid,
  Maximize2,
  Wifi,
  Coffee,
  Waves,
}

export function GymFacilitiesSection({ gym }: Props) {
  if (!gym.facilitiesCategorized || gym.facilitiesCategorized.length === 0) {
    return null
  }

  return (
    <section id="facilities-section" className="space-y-6 pt-4">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-brand" />
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Club Facilities & Amenities
        </h2>
      </div>

      <div className="space-y-6">
        {gym.facilitiesCategorized.map((cat, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {cat.category}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {cat.items.map((item) => {
                const IconComponent = ICON_MAP[item.icon] || Dumbbell
                const isAvailable = item.available !== false

                return (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border transition ${
                      isAvailable
                        ? 'bg-white dark:bg-slate-800/80 border-slate-200/90 dark:border-slate-700/80 shadow-2xs'
                        : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isAvailable
                          ? 'bg-brand-50 dark:bg-brand-950/60 text-brand'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-sm font-bold truncate ${
                            isAvailable
                              ? 'text-slate-900 dark:text-slate-100'
                              : 'text-slate-500 line-through'
                          }`}
                        >
                          {item.name}
                        </span>

                        {isAvailable ? (
                          <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] shrink-0 font-bold">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-slate-400 uppercase">
                            N/A
                          </span>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

