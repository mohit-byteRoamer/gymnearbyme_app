import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { useRouter, usePathname } from 'expo-router'
import {
  Dumbbell,
  Home,
  CalendarCheck,
  Receipt,
  User,
  Sparkles,
} from 'lucide-react-native'
import { useAuth } from '../../context/AuthContext'
import { usePlan } from '../../context/PlanContext'

export function DesktopNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()
  const { activePlan } = usePlan()

  const hasActivePlan = activePlan && activePlan.status === 'ACTIVE'

  const navItems = [
    { label: 'Home', path: '/home', icon: Home },
    {
      label: 'My plan',
      path: '/my-plan',
      icon: CalendarCheck,
      badge: hasActivePlan,
    },
    { label: 'Transactions', path: '/transactions', icon: Receipt },
    { label: 'Profile', path: '/profile', icon: User },
  ]

  return (
    <View className="bg-white border-b border-slate-200/80 shadow-xs z-40">
      <View className="max-w-container w-full mx-auto px-4 sm:px-6 lg:px-8 h-18 flex-row items-center justify-between">
        {/* 1. Branding */}
        <Pressable
          onPress={() => router.push('/home' as any)}
          className="flex-row items-center gap-3 select-none"
        >
          <View className="w-10 h-10 rounded-xl bg-brand items-center justify-center shadow-xs">
            <Dumbbell size={20} color="#FFFFFF" />
          </View>

          <View className="flex-col justify-center">
            <Text className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
              GymApp
            </Text>
            <Text className="text-[10px] sm:text-[11px] text-slate-400 font-semibold tracking-wider uppercase -mt-0.5">
              Ludhiana, Punjab
            </Text>
          </View>
        </Pressable>

        {/* 2. Navigation Links */}
        <View className="flex-row items-center gap-1.5 p-1 bg-slate-100/70 border border-slate-200/60 rounded-2xl">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path || pathname.startsWith(item.path + '/')

            return (
              <Pressable
                key={item.path}
                onPress={() => router.push(item.path as any)}
                className={`flex-row items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-blue-50 border border-blue-200/60 shadow-2xs'
                    : 'active:bg-slate-200/60'
                }`}
              >
                <Icon
                  size={16}
                  color={isActive ? '#2563EB' : '#475569'}
                />
                <Text
                  className={`text-sm ${
                    isActive ? 'font-semibold text-brand' : 'font-medium text-slate-600'
                  }`}
                >
                  {item.label}
                </Text>
                {item.badge && (
                  <View className="w-2 h-2 rounded-full bg-emerald-500" />
                )}
              </Pressable>
            )
          })}
        </View>

        {/* 3. User Avatar Pill */}
        <Pressable
          onPress={() => router.push('/profile' as any)}
          className="flex-row items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/80 active:bg-slate-100"
        >
          <View className="w-7 h-7 rounded-full bg-brand items-center justify-center">
            <Text className="text-xs font-bold text-white">
              {user?.name?.[0] || 'U'}
            </Text>
          </View>
          <Text className="text-xs font-semibold text-slate-800">
            {user?.name?.split(' ')[0] || 'Profile'}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
