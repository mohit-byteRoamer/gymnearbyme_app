import React, { useState } from 'react'
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  Car,
  Compass,
  ExternalLink,
} from 'lucide-react'
import { Gym } from '../types/index.ts'
import { LeafletMap } from '../../../components/gym/LeafletMap.jsx'
import { useToast } from '../../../context/ToastContext.jsx'

interface Props {
  gym: Gym
}

export function GymLocationSection({ gym }: Props) {
  const { showToast } = useToast()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(gym.address)
    setCopied(true)
    showToast('Address copied to clipboard!', 'success')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${gym.lat},${gym.lng}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="location-section" className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-brand" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Location & Getting Here
          </h2>
        </div>

        <button
          onClick={handleOpenMaps}
          className="text-xs sm:text-sm font-semibold text-brand hover:underline inline-flex items-center gap-1"
        >
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Address Card with Copy Button */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700/80 shadow-subtle space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-5 h-5 text-brand shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {gym.address}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Approx. <strong>{gym.distance}</strong> from your selected location
              </p>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold shrink-0 transition"
            aria-label="Copy address"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Landmarks & Parking Context */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs">
          {gym.landmarks && (
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Compass className="w-4 h-4 text-brand shrink-0" />
              <span>{gym.landmarks}</span>
            </div>
          )}
          {gym.parkingInfo && (
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Car className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{gym.parkingInfo}</span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Leaflet Map Preview */}
      <div className="rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-700/80 shadow-md">
        <LeafletMap lat={gym.lat} lng={gym.lng} gymName={gym.name} />
      </div>
    </section>
  )
}

