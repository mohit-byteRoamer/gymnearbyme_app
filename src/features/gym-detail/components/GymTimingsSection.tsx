import React from 'react'
import { View, Text } from 'react-native'
import { Clock, Info } from 'lucide-react-native'
import { Gym } from '../types/index'
import { getLiveOpenStatus } from '../utils/pricing'

interface Props {
  gym: Gym
}

export function GymTimingsSection({ gym }: Props) {
  const liveStatus = getLiveOpenStatus(gym.timingsSchedule)

  const now = new Date()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const todayName = days[now.getDay()]

  return (
    <View className="gap-4 pt-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Clock size={20} color="#2563EB" />
          <Text className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Operating Hours & Timings
          </Text>
        </View>

        {/* Live Status Pill */}
        <View
          className={`flex-row items-center gap-1.5 px-3 py-1 rounded-full border ${
            liveStatus.statusColor === 'emerald'
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-amber-50 border-amber-200'
          }`}
        >
          <View className="w-2 h-2 rounded-full bg-emerald-500" />
          <Text
            className={`text-xs font-bold ${
              liveStatus.statusColor === 'emerald'
                ? 'text-emerald-800'
                : 'text-amber-800'
            }`}
          >
            {liveStatus.statusText}
          </Text>
        </View>
      </View>

      {/* Schedule Table */}
      <View className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
        {(gym.timingsSchedule || []).map((t, idx) => {
          const isToday =
            t.day.toLowerCase() === todayName.toLowerCase() || t.isToday

          return (
            <View
              key={idx}
              className={`flex-row items-center justify-between px-4 sm:px-6 py-3.5 ${
                idx > 0 ? 'border-t border-slate-100' : ''
              } ${isToday ? 'bg-blue-50/70' : ''}`}
            >
              <View className="flex-row items-center gap-2">
                <Text
                  className={`text-sm ${
                    isToday ? 'font-bold text-brand' : 'text-slate-700'
                  }`}
                >
                  {t.day}
                </Text>
                {isToday && (
                  <View className="bg-brand px-2 py-0.5 rounded-full">
                    <Text className="text-[10px] font-bold uppercase text-white">
                      Today
                    </Text>
                  </View>
                )}
              </View>

              <Text
                className={`text-xs sm:text-sm ${
                  isToday ? 'font-bold text-brand' : 'text-slate-600'
                }`}
              >
                {t.isClosed ? 'Closed' : `${t.openTime} – ${t.closeTime}`}
              </Text>
            </View>
          )
        })}
      </View>

      {/* Peak hour notice */}
      <View className="flex-row items-center gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
        <Info size={16} color="#64748B" />
        <Text className="text-xs text-slate-600 flex-1">
          Peak workout hours in Ludhiana are 6:00 AM – 8:30 AM and 6:30 PM – 9:00 PM.
        </Text>
      </View>
    </View>
  )
}
