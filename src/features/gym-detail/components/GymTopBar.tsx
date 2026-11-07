import React from 'react'
import { View, Text, Pressable, Share } from 'react-native'
import { useRouter } from 'expo-router'
import { ArrowLeft, Share2, Heart, Moon, Sun, ChevronRight } from 'lucide-react-native'
import * as Clipboard from 'expo-clipboard'
import { useGymDetailStore } from '../store/gymDetailStore'
import { Gym } from '../types/index'
import { useToast } from '@/context/ToastContext'

interface Props {
  gym: Gym
}

export function GymTopBar({ gym }: Props) {
  const router = useRouter()
  const { showToast } = useToast()
  const { isFavorite, toggleFavorite, theme, toggleTheme } = useGymDetailStore()

  const handleShare = async () => {
    try {
      await Share.share({
        title: gym.name,
        message: `Check out ${gym.name} on GymApp Ludhiana!`,
      })
    } catch {
      await Clipboard.setStringAsync(gym.name)
      showToast('Gym details copied to clipboard!', 'success')
    }
  }

  return (
    <View className="flex-row items-center justify-between py-3 mb-2">
      {/* Left: Back button & Breadcrumbs */}
      <View className="flex-row items-center gap-3">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-xs items-center justify-center active:scale-95"
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <ArrowLeft size={18} color="#334155" />
        </Pressable>

        {/* Desktop Breadcrumbs */}
        <View className="hidden md:flex flex-row items-center gap-1.5">
          <Pressable onPress={() => router.push('/home' as any)}>
            <Text className="text-xs text-slate-500 hover:text-brand">Gyms</Text>
          </Pressable>
          <ChevronRight size={14} color="#94A3B8" />
          <Text className="text-xs text-slate-600 font-medium">
            {gym.locality}
          </Text>
          <ChevronRight size={14} color="#94A3B8" />
          <Text numberOfLines={1} className="text-xs font-semibold text-slate-900 max-w-[200px]">
            {gym.name}
          </Text>
        </View>
      </View>

      {/* Right: Actions */}
      <View className="flex-row items-center gap-2">
        {/* Dark/Light mode toggle */}
        <Pressable
          onPress={toggleTheme}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-xs items-center justify-center active:scale-95"
          accessibilityRole="button"
          accessibilityLabel="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon size={16} color="#475569" />
          ) : (
            <Sun size={16} color="#F59E0B" />
          )}
        </Pressable>

        {/* Favorite */}
        <Pressable
          onPress={toggleFavorite}
          className={`w-10 h-10 rounded-xl bg-white border shadow-xs items-center justify-center active:scale-95 ${
            isFavorite ? 'border-rose-200' : 'border-slate-200/80'
          }`}
          accessibilityRole="button"
          accessibilityLabel="Save gym"
        >
          <Heart
            size={16}
            color={isFavorite ? '#EF4444' : '#475569'}
            fill={isFavorite ? '#EF4444' : 'transparent'}
          />
        </Pressable>

        {/* Share */}
        <Pressable
          onPress={handleShare}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-xs items-center justify-center active:scale-95"
          accessibilityRole="button"
          accessibilityLabel="Share gym"
        >
          <Share2 size={16} color="#475569" />
        </Pressable>
      </View>
    </View>
  )
}
