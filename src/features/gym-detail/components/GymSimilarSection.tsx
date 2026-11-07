import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Star, Sparkles, ChevronRight } from 'lucide-react'
import { SIMILAR_GYMS } from '../api/gymApi.ts'
import { formatINR } from '../utils/pricing.ts'

export function GymSimilarSection() {
  const navigate = useNavigate()

  return (
    <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Similar Gyms Nearby
          </h2>
        </div>
        <button
          onClick={() => navigate('/home')}
          className="text-xs font-semibold text-brand hover:underline flex items-center gap-1"
        >
          <span>View all in Ludhiana</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar -mx-4 px-4 sm:-mx-0 sm:px-0">
        {SIMILAR_GYMS.map((gym) => (
          <div
            key={gym.id}
            onClick={() => {
              navigate(`/gym/${gym.id}`)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="w-64 sm:w-72 shrink-0 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/90 dark:border-slate-700/80 shadow-subtle hover:shadow-card hover:border-brand/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group active:scale-[0.99]"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
              <img
                src={gym.coverPhoto}
                alt={gym.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              {gym.isFeatured && (
                <div className="absolute top-2.5 left-2.5 bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                  Featured
                </div>
              )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-1 mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-brand transition-colors line-clamp-1">
                    {gym.name}
                  </h3>
                  <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{gym.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
                  <span>{gym.distance} · {gym.locality}</span>
                </div>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                <span className="text-slate-400">From</span>
                <span className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">
                  {formatINR(gym.minPrice)}
                  <span className="text-slate-400 font-normal text-[11px]">/mo</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

