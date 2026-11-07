import React from 'react'
import {
  Star,
  MapPin,
  BadgeCheck,
  Phone,
  Navigation,
  MessageCircle,
  Share2,
} from 'lucide-react'
import { Gym } from '../types/index.ts'
import { getLiveOpenStatus } from '../utils/pricing.ts'
import { useToast } from '../../../context/ToastContext.jsx'

interface Props {
  gym: Gym
}

export function GymHeaderBlock({ gym }: Props) {
  const { showToast } = useToast()
  const liveStatus = getLiveOpenStatus(gym.timingsSchedule)

  const scrollToReviews = () => {
    const el = document.getElementById('reviews-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${gym.lat},${gym.lng}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCall = () => {
    window.location.href = `tel:${gym.phone}`
  }

  const handleWhatsApp = () => {
    const cleanNumber = gym.whatsapp.replace(/\D/g, '')
    const msg = encodeURIComponent(
      `Hi, I found ${gym.name} on GymApp Ludhiana and would like to know more about trial passes.`
    )
    window.open(`https://wa.me/${cleanNumber}?text=${msg}`, '_blank')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: gym.name,
          text: `Check out ${gym.name} on GymApp!`,
          url: window.location.href,
        })
        return
      } catch {}
    }
    await navigator.clipboard.writeText(window.location.href)
    showToast('Link copied to clipboard!', 'success')
  }

  return (
    <div className="space-y-4 pt-1">
      {/* Title & Verified Badge */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {gym.name}
          </h1>
          {gym.verified && (
            <div
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-brand text-xs font-semibold"
              title="Verified gym partner on GymApp"
            >
              <BadgeCheck className="w-4 h-4 fill-brand text-white" />
              <span>Verified Partner</span>
            </div>
          )}
        </div>
        {gym.tagline && (
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            {gym.tagline}
          </p>
        )}
      </div>

      {/* Meta Row: Rating, Live Status, Location */}
      <div className="flex items-center gap-3 flex-wrap text-sm">
        {/* Rating Button (scrolls to reviews) */}
        <button
          onClick={scrollToReviews}
          className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-xl text-amber-900 dark:text-amber-200 font-bold border border-amber-200/80 dark:border-amber-800/60 hover:bg-amber-100 transition shadow-2xs"
        >
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>{gym.rating}</span>
          <span className="font-normal text-amber-700 dark:text-amber-300 text-xs underline">
            ({gym.reviewsCount} reviews)
          </span>
        </button>

        {/* Live Open / Closed Status Pill */}
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border ${
            liveStatus.statusColor === 'emerald'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
              : liveStatus.statusColor === 'amber'
              ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/60'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              liveStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'
            }`}
          />
          <span>{liveStatus.statusText}</span>
        </div>

        {/* Distance & Locality */}
        <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-medium text-xs sm:text-sm">
          <MapPin className="w-4 h-4 text-brand shrink-0" />
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {gym.distance}
          </span>
          <span>·</span>
          <span>
            {gym.locality}, Ludhiana
          </span>
        </div>
      </div>

      {/* Category Badges */}
      {gym.categories && gym.categories.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          {gym.categories.map((cat) => (
            <span
              key={cat}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
            >
              {cat}
            </span>
          ))}
        </div>
      )}

      {/* Primary Action Buttons: Call, Directions, WhatsApp, Share */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
        <button
          onClick={handleCall}
          className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200 hover:border-brand hover:text-brand transition shadow-2xs active:scale-95"
        >
          <Phone className="w-4 h-4 text-brand" />
          <span>Call</span>
        </button>

        <button
          onClick={handleDirections}
          className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200 hover:border-brand hover:text-brand transition shadow-2xs active:scale-95"
        >
          <Navigation className="w-4 h-4 text-brand" />
          <span>Directions</span>
        </button>

        <button
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition shadow-2xs active:scale-95"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 font-semibold text-slate-800 dark:text-slate-200 hover:border-brand hover:text-brand transition shadow-2xs active:scale-95"
        >
          <Share2 className="w-4 h-4 text-slate-500" />
          <span>Share</span>
        </button>
      </div>
    </div>
  )
}

