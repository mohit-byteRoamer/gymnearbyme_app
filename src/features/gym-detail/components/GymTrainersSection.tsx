import React from 'react'
import { Dumbbell, Star, Award, ChevronRight } from 'lucide-react'
import { Gym } from '../types/index.ts'
import { useGymDetailStore } from '../store/gymDetailStore.ts'

interface Props {
  gym: Gym
}

export function GymTrainersSection({ gym }: Props) {
  const { setSelectedTrainer } = useGymDetailStore()

  if (!gym.trainers || gym.trainers.length === 0) return null

  return (
    <section id="trainers-section" className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-5 h-5 text-brand" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Certified Trainers ({gym.trainers.length})
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          Tap coach to view full bio & credentials
        </span>
      </div>

      {/* Horizontal Scroll of Larger Rich Cards */}
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:-mx-0 sm:px-0">
        {gym.trainers.map((trainer) => (
          <div
            key={trainer.id}
            onClick={() => setSelectedTrainer(trainer)}
            className="w-72 sm:w-80 shrink-0 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/90 dark:border-slate-700/80 p-4 shadow-subtle hover:shadow-card hover:border-brand/40 transition-all duration-300 cursor-pointer group flex flex-col justify-between active:scale-[0.99]"
          >
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand/20 group-hover:ring-brand transition-all shrink-0 shadow-xs"
                />
                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base leading-tight group-hover:text-brand transition-colors truncate">
                    {trainer.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5 font-medium">
                    {trainer.speciality}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{trainer.rating}</span>
                    </div>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {trainer.experienceYears} yrs exp
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Certification Badge */}
              {trainer.certifications?.[0] && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-slate-700/60 text-slate-700 dark:text-slate-200 text-xs font-semibold border border-slate-200/60 dark:border-slate-700">
                  <Award className="w-3.5 h-3.5 text-brand shrink-0" />
                  <span className="truncate">{trainer.certifications[0]}</span>
                </div>
              )}
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-brand font-semibold">
              <span>View credentials & bio</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

