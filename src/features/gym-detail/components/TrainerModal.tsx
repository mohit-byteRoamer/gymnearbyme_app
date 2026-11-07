import React, { useEffect } from 'react'
import { X, Star, Award, Users, Clock, ShieldCheck } from 'lucide-react'
import { Trainer } from '../types/index.ts'
import { useGymDetailStore } from '../store/gymDetailStore.ts'

export function TrainerModal() {
  const { selectedTrainer, setSelectedTrainer } = useGymDetailStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTrainer(null)
    }
    if (selectedTrainer) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedTrainer, setSelectedTrainer])

  if (!selectedTrainer) return null

  return (
    <div
      onClick={() => setSelectedTrainer(null)}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Header with Photo & Close */}
        <div className="relative h-44 bg-slate-900 overflow-hidden">
          <img
            src={selectedTrainer.photo}
            alt={selectedTrainer.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <button
            onClick={() => setSelectedTrainer(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <h3 className="text-xl font-extrabold tracking-tight">
              {selectedTrainer.name}
            </h3>
            <p className="text-xs text-brand-200 font-medium">
              {selectedTrainer.role}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Key Stats Row */}
          <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-amber-500 font-bold text-sm">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{selectedTrainer.rating}</span>
              </div>
              <span className="text-[11px] text-slate-500">
                {selectedTrainer.reviewCount} reviews
              </span>
            </div>

            <div className="border-x border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-center gap-1 text-slate-800 dark:text-slate-200 font-bold text-sm">
                <Clock className="w-3.5 h-3.5 text-brand" />
                <span>{selectedTrainer.experienceYears}+ yrs</span>
              </div>
              <span className="text-[11px] text-slate-500">Experience</span>
            </div>

            <div>
              <div className="flex items-center justify-center gap-1 text-slate-800 dark:text-slate-200 font-bold text-sm">
                <Users className="w-3.5 h-3.5 text-emerald-500" />
                <span>{selectedTrainer.clientsTrained}+</span>
              </div>
              <span className="text-[11px] text-slate-500">Transformed</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              About Coach
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedTrainer.bio}
            </p>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Verified Certifications
            </h4>
            <div className="space-y-1.5">
              {selectedTrainer.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setSelectedTrainer(null)}
            className="w-full h-11 rounded-xl bg-brand hover:bg-brand-700 text-white font-semibold text-sm transition shadow-sm active:scale-98"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

