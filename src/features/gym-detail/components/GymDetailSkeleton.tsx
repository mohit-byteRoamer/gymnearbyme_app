import React from 'react'

function PulseBox({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl ${className}`} />
}

export function GymDetailSkeleton() {
  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
      {/* Top Bar Skeleton */}
      <div className="flex justify-between items-center py-2">
        <PulseBox className="w-10 h-10 rounded-xl" />
        <div className="flex gap-2">
          <PulseBox className="w-10 h-10 rounded-xl" />
          <PulseBox className="w-10 h-10 rounded-xl" />
          <PulseBox className="w-10 h-10 rounded-xl" />
        </div>
      </div>

      {/* Gallery Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[300px] sm:h-[400px]">
        <PulseBox className="md:col-span-2 h-full rounded-3xl" />
        <div className="hidden md:grid col-span-2 grid-cols-2 gap-3 h-full">
          <PulseBox className="h-full rounded-2xl" />
          <PulseBox className="h-full rounded-2xl" />
          <PulseBox className="h-full rounded-2xl" />
          <PulseBox className="h-full rounded-2xl" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        {/* Left Column */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          <div className="space-y-3">
            <PulseBox className="h-9 w-2/3 rounded-xl" />
            <PulseBox className="h-4 w-1/3 rounded-lg" />
            <div className="flex gap-3 pt-2">
              <PulseBox className="h-8 w-24 rounded-xl" />
              <PulseBox className="h-8 w-32 rounded-xl" />
            </div>
          </div>

          <div className="h-12 border-b border-slate-200 dark:border-slate-800 flex gap-4">
            <PulseBox className="h-8 w-20 rounded-xl" />
            <PulseBox className="h-8 w-20 rounded-xl" />
            <PulseBox className="h-8 w-20 rounded-xl" />
            <PulseBox className="h-8 w-20 rounded-xl" />
          </div>

          <div className="space-y-3">
            <PulseBox className="h-6 w-36 rounded-lg" />
            <PulseBox className="h-20 w-full rounded-2xl" />
          </div>

          <div className="space-y-3">
            <PulseBox className="h-6 w-36 rounded-lg" />
            <div className="flex gap-4 overflow-hidden">
              <PulseBox className="w-72 h-36 rounded-3xl shrink-0" />
              <PulseBox className="w-72 h-36 rounded-3xl shrink-0" />
            </div>
          </div>
        </div>

        {/* Right Sticky Card Skeleton */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 space-y-4">
            <PulseBox className="h-6 w-1/2 rounded-lg" />
            <PulseBox className="h-10 w-full rounded-2xl" />
            <PulseBox className="h-28 w-full rounded-2xl" />
            <PulseBox className="h-12 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

