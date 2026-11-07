import React from 'react'

export function SkeletonBox({ className = '' }) {
  return <div className={`animate-pulse bg-slate-200/80 rounded-lg ${className}`} />
}

export function GymCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-subtle overflow-hidden flex flex-col h-full animate-pulse">
      <SkeletonBox className="w-full aspect-[16/10] rounded-none rounded-t-2xl" />
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        <div className="space-y-2">
          <div className="flex justify-between items-center gap-2">
            <SkeletonBox className="h-5 w-2/3 rounded-md" />
            <SkeletonBox className="h-5 w-14 rounded-lg" />
          </div>
          <SkeletonBox className="h-4 w-1/2 rounded-md" />
        </div>
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="space-y-1">
            <SkeletonBox className="h-3 w-16 rounded" />
            <SkeletonBox className="h-6 w-24 rounded" />
          </div>
          <SkeletonBox className="h-8 w-16 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export function GymDetailSkeleton() {
  return (
    <div className="max-w-container mx-auto px-4 py-4 space-y-6 animate-pulse">
      <div className="w-full aspect-[4/3] sm:aspect-[16/9] bg-slate-200 rounded-2xl" />
      <div className="space-y-3">
        <div className="h-8 bg-slate-200 rounded w-2/3" />
        <div className="h-4 bg-slate-200 rounded w-1/3" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="h-11 bg-slate-200 rounded-xl" />
        <div className="h-11 bg-slate-200 rounded-xl" />
      </div>
      <div className="space-y-3 pt-4">
        <div className="h-6 bg-slate-200 rounded w-24" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="h-28 bg-slate-200 rounded-xl" />
          <div className="h-28 bg-slate-200 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

