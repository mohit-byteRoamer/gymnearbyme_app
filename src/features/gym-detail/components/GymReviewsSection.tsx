import React, { useState } from 'react'
import { Star, ShieldCheck, ThumbsUp, Filter } from 'lucide-react'
import { Gym, Review } from '../types/index.ts'
import { useGymDetailStore } from '../store/gymDetailStore.ts'

interface Props {
  gym: Gym
}

export function GymReviewsSection({ gym }: Props) {
  const { reviewFilter, setReviewFilter } = useGymDetailStore()
  const [displayCount, setDisplayCount] = useState(3)

  const reviews = gym.reviews || []

  // Filter logic
  let filtered = [...reviews]
  if (reviewFilter === 'highest') {
    filtered.sort((a, b) => b.rating - a.rating)
  } else if (reviewFilter === 'lowest') {
    filtered.sort((a, b) => a.rating - b.rating)
  }

  const visibleReviews = filtered.slice(0, displayCount)
  const breakdown = gym.ratingBreakdown || { 5: 180, 4: 25, 3: 5, 2: 1, 1: 1 }
  const totalRatings =
    Object.values(breakdown).reduce((acc, curr) => acc + curr, 0) || 1

  return (
    <section id="reviews-section" className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Member Reviews ({gym.reviewsCount})
          </h2>
        </div>
      </div>

      {/* Rating Breakdown & Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 shadow-subtle items-center">
        {/* Left: Big Score */}
        <div className="md:col-span-4 text-center md:text-left flex flex-col justify-center md:border-r border-slate-200 dark:border-slate-700 md:pr-6">
          <span className="text-5xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none">
            {gym.rating}
          </span>
          <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 my-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Based on {gym.reviewsCount} verified reviews
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
            98% of members recommend this gym
          </p>
        </div>

        {/* Right: 5-bar Distribution */}
        <div className="md:col-span-8 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = (breakdown as any)[stars] || 0
            const pct = Math.round((count / totalRatings) * 100)

            return (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <span className="w-6 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-end gap-0.5">
                  <span>{stars}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </span>

                <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <span className="w-8 text-right text-slate-400 font-medium">
                  {pct}%
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {(['all', 'latest', 'highest', 'lowest'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setReviewFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
              reviewFilter === f
                ? 'bg-brand text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {f === 'all' ? 'All Reviews' : f}
          </button>
        ))}
      </div>

      {/* Review Cards List */}
      <div className="space-y-3.5">
        {visibleReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 shadow-2xs space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                {rev.avatar ? (
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-brand-50 text-brand font-bold text-sm flex items-center justify-center">
                    {rev.author[0]}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                      {rev.author}
                    </span>
                    {rev.isVerifiedMember && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        Verified Member
                      </span>
                    )}
                  </div>
                  {rev.planType && (
                    <span className="text-[11px] text-slate-500 font-medium block">
                      {rev.planType}
                    </span>
                  )}
                </div>
              </div>

              {/* Star Score & Relative Time */}
              <div className="text-right">
                <div className="flex items-center justify-end gap-0.5 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 mt-0.5 block font-medium">
                  {rev.date}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {rev.text}
            </p>
          </div>
        ))}
      </div>

      {/* Show more pagination */}
      {filtered.length > displayCount && (
        <button
          onClick={() => setDisplayCount((prev) => prev + 3)}
          className="w-full h-11 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm font-semibold hover:border-brand hover:text-brand transition shadow-2xs"
        >
          Show more reviews ({filtered.length - displayCount} remaining)
        </button>
      )}
    </section>
  )
}

