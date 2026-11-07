import React from 'react'
import { View } from 'react-native'

function PulseBox({ className = '' }: { className?: string }) {
  return <View className={`bg-slate-200 rounded-xl ${className}`} />
}

export function GymDetailSkeleton() {
  return (
    <View className="max-w-container mx-auto px-4 sm:px-6 lg:px-8 py-4 gap-6">
      {/* Top Bar Skeleton */}
      <View className="flex-row justify-between items-center py-2">
        <PulseBox className="w-10 h-10 rounded-xl" />
        <View className="flex-row gap-2">
          <PulseBox className="w-10 h-10 rounded-xl" />
          <PulseBox className="w-10 h-10 rounded-xl" />
          <PulseBox className="w-10 h-10 rounded-xl" />
        </View>
      </View>

      {/* Gallery Skeleton */}
      <View className="h-[280px] sm:h-[380px] w-full">
        <PulseBox className="w-full h-full rounded-3xl" />
      </View>

      {/* Main Grid */}
      <View className="flex-col lg:flex-row gap-8 pt-4">
        <View className="flex-1 gap-6">
          <View className="gap-3">
            <PulseBox className="h-9 w-2/3 rounded-xl" />
            <PulseBox className="h-4 w-1/3 rounded-lg" />
            <View className="flex-row gap-3 pt-2">
              <PulseBox className="h-8 w-24 rounded-xl" />
              <PulseBox className="h-8 w-32 rounded-xl" />
            </View>
          </View>

          <View className="gap-3">
            <PulseBox className="h-6 w-36 rounded-lg" />
            <PulseBox className="h-20 w-full rounded-2xl" />
          </View>
        </View>

        {/* Right Sticky Card on Desktop */}
        <View className="hidden lg:flex w-80">
          <PulseBox className="h-96 w-full rounded-3xl" />
        </View>
      </View>
    </View>
  )
}
