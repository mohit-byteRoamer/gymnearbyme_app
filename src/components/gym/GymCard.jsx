import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Star, MapPin, Sparkles, BadgeCheck, ChevronRight } from 'lucide-react'
import { formatINR } from '../../utils/formatters.js'

export function GymCard({ gym }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/gym/${gym.id}`)}
      className="group bg-white rounded-2xl border border-slate-200/90 shadow-subtle hover:shadow-card hover:border-brand/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full hover:-translate-y-1 active:scale-[0.99] select-none"
    >
      {/* 1. Gym Image Section */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 rounded-t-2xl">
        {/* Cover Photo with smooth hover zoom */}
        <img
          src={gym.coverPhoto}
          alt={gym.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Subtle dark gradient overlay for badge readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* Top Badges Row */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {/* Featured Badge */}
          {gym.isFeatured ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand/90 backdrop-blur-md text-white text-[11px] font-semibold shadow-sm border border-white/20">
              <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span>Featured</span>
            </div>
          ) : (
            <div />
          )}
        </div>

        {/* Bottom Overlay: Open Status Badge with Live Pulsing Indicator */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/75 backdrop-blur-md text-white text-[11px] font-medium border border-white/10 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Open until {gym.openUntil}</span>
          </div>
        </div>
      </div>

      {/* 2. Gym Information & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Title Row with Rating Badge */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <h3 className="text-base sm:text-[17px] font-bold text-slate-900 group-hover:text-brand transition-colors truncate tracking-tight">
                {gym.name}
              </h3>
              {gym.verified && (
                <span title="Verified by GymApp" className="shrink-0">
                  <BadgeCheck className="w-4 h-4 text-brand fill-blue-50" />
                </span>
              )}
            </div>

            {/* Compact Attractive Rating Pill */}
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-50/90 border border-amber-200/60 shadow-2xs shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
              <span className="text-xs font-bold text-slate-900">{gym.rating}</span>
              <span className="text-[11px] font-medium text-slate-400">
                ({gym.reviewsCount})
              </span>
            </div>
          </div>

          {/* Location & Distance Information */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
            <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
            <span className="font-semibold text-slate-700">{gym.distance}</span>
            <span className="text-slate-300">•</span>
            <span className="truncate text-slate-500">{gym.locality}</span>
          </div>
        </div>

        {/* 3. Pricing Section with Visual Separation */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Starts from
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-brand transition-colors tracking-tight">
                {formatINR(gym.minPrice)}
              </span>
              <span className="text-xs font-normal text-slate-500">/month</span>
            </div>
          </div>

          {/* Interactive CTA Pill */}
          <div className="inline-flex items-center gap-1 text-xs font-semibold text-brand bg-brand-50 group-hover:bg-brand group-hover:text-white px-3 py-1.5 rounded-lg border border-brand-100 group-hover:border-brand transition-all duration-200 shadow-2xs">
            <span>View</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  )
}
