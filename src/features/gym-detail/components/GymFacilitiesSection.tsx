import React from 'react'
import { View, Text } from 'react-native'
import {
  Shield,
  Wind,
  Car,
  Lock,
  ShowerHead,
  Dumbbell,
  Activity,
  Grid,
  Maximize2,
  Wifi,
  Coffee,
  Waves,
  Check,
  X,
} from 'lucide-react-native'
import { Gym } from '../types/index'

interface Props {
  gym: Gym
}

const ICON_MAP: Record<string, any> = {
  Wind,
  Car,
  Lock,
  ShowerHead,
  Dumbbell,
  Activity,
  Grid,
  Maximize2,
  Wifi,
  Coffee,
  Waves,
}

export function GymFacilitiesSection({ gym }: Props) {
  if (!gym.facilitiesCategorized || gym.facilitiesCategorized.length === 0) {
    return null
  }

  return (
    <View className="gap-6 pt-4">
      <View className="flex-row items-center gap-2">
        <Shield size={20} color="#2563EB" />
        <Text className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Club Facilities & Amenities
        </Text>
      </View>

      <View className="gap-6">
        {gym.facilitiesCategorized.map((cat, idx) => (
          <View key={idx} className="gap-3">
            <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {cat.category}
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {cat.items.map((item) => {
                const IconComponent = ICON_MAP[item.icon] || Dumbbell

                return (
                  <View
                    key={item.id}
                    className={`
                      w-full sm:w-[48%] flex-row items-center justify-between p-3.5 rounded-2xl border
                      ${
                        item.available
                          ? 'bg-white border-slate-200/90 shadow-2xs'
                          : 'bg-slate-50/60 border-slate-200/50 opacity-60'
                      }
                    `}
                  >
                    <View className="flex-row items-center gap-3 flex-1 min-w-0 mr-2">
                      <View
                        className={`w-9 h-9 rounded-xl items-center justify-center ${
                          item.available ? 'bg-blue-50 text-brand' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        <IconComponent
                          size={18}
                          color={item.available ? '#2563EB' : '#94A3B8'}
                        />
                      </View>
                      <View className="flex-1 min-w-0">
                        <Text
                          numberOfLines={1}
                          className={`text-sm font-bold ${
                            item.available ? 'text-slate-900' : 'text-slate-400'
                          }`}
                        >
                          {item.name}
                        </Text>
                        {item.description && (
                          <Text
                            numberOfLines={1}
                            className="text-xs text-slate-500 mt-0.5"
                          >
                            {item.description}
                          </Text>
                        )}
                      </View>
                    </View>

                    {item.available ? (
                      <View className="w-5 h-5 rounded-full bg-emerald-50 items-center justify-center">
                        <Check size={12} color="#059669" />
                      </View>
                    ) : (
                      <View className="w-5 h-5 rounded-full bg-slate-100 items-center justify-center">
                        <X size={12} color="#94A3B8" />
                      </View>
                    )}
                  </View>
                )
              })}
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}
