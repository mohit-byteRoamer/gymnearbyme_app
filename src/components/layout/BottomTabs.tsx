import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useRouter, usePathname } from 'expo-router'
import { Home, CalendarCheck, Receipt, User } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePlan } from '../../context/PlanContext'

export function BottomTabs() {
  const router = useRouter()
  const pathname = usePathname()
  const insets = useSafeAreaInsets()
  const { activePlan } = usePlan()

  const tabs = [
    { label: 'Home', path: '/home', icon: Home },
    {
      label: 'My plan',
      path: '/my-plan',
      icon: CalendarCheck,
      badge: activePlan && activePlan.status === 'ACTIVE',
    },
    { label: 'Transactions', path: '/transactions', icon: Receipt },
    { label: 'Profile', path: '/profile', icon: User },
  ]

  return (
    <View
      className="bg-white/95 border-t border-slate-200/80 shadow-lg z-40"
      style={{ paddingBottom: Math.max(insets.bottom, 6) }}
    >
      <View className="flex-row items-center justify-around h-16 max-w-lg mx-auto w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.path || pathname.startsWith(tab.path + '/')

          return (
            <Pressable
              key={tab.path}
              onPress={() => router.push(tab.path as any)}
              className="flex-1 items-center justify-center py-1 select-none active:opacity-75"
              accessibilityRole="button"
              accessibilityLabel={tab.label}
            >
              <View className="relative items-center">
                <Icon
                  size={20}
                  color={isActive ? '#2563EB' : '#64748B'}
                />
                {tab.badge && (
                  <View className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white" />
                )}
              </View>
              <Text
                className={`text-[11px] mt-1 ${
                  isActive ? 'font-bold text-brand' : 'font-medium text-slate-500'
                }`}
              >
                {tab.label}
              </Text>
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}
