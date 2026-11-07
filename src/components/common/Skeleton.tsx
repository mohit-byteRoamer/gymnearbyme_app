import React from 'react'
import { View } from 'react-native'

export function SkeletonBox({ className = '' }: { className?: string }) {
  return <View className={`bg-slate-200 rounded-lg ${className}`} />
}

export function GymCardSkeleton() {
  return (
    <View className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex-col h-full">
      <SkeletonBox className="w-full aspect-[16/10] rounded-none rounded-t-2xl" />
      <View className="p-4 sm:p-5 flex-1 justify-between gap-3">
        <View className="gap-2">
          <View className="flex-row justify-between items-center gap-2">
            <SkeletonBox className="h-5 w-2/3 rounded-md" />
            <SkeletonBox className="h-5 w-14 rounded-lg" />
          </View>
          <SkeletonBox className="h-4 w-1/2 rounded-md" />
        </View>
        <View className="pt-3 border-t border-slate-100 flex-row items-center justify-between">
          <View className="gap-1">
            <SkeletonBox className="h-3 w-16 rounded" />
            <SkeletonBox className="h-6 w-24 rounded" />
          </View>
          <SkeletonBox className="h-8 w-16 rounded-lg" />
        </View>
      </View>
    </View>
  )
}

export function GymDetailSkeleton() {
  return (
    <View className="max-w-container mx-auto px-4 py-4 gap-6">
      <View className="w-full aspect-[4/3] sm:aspect-[16/9] bg-slate-200 rounded-2xl" />
      <View className="gap-3">
        <View className="h-8 bg-slate-200 rounded w-2/3" />
        <View className="h-4 bg-slate-200 rounded w-1/3" />
      </View>
      <View className="flex-row gap-3">
        <View className="flex-1 h-11 bg-slate-200 rounded-xl" />
        <View className="flex-1 h-11 bg-slate-200 rounded-xl" />
      </View>
      <View className="gap-3 pt-4">
        <View className="h-6 bg-slate-200 rounded w-24" />
        <View className="flex-row gap-3">
          <View className="flex-1 h-28 bg-slate-200 rounded-xl" />
          <View className="flex-1 h-28 bg-slate-200 rounded-xl" />
        </View>
      </View>
    </View>
  )
}

