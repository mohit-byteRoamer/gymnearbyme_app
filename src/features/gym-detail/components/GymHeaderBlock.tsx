import React from 'react'
import { View, Text, Pressable, Linking, Share } from 'react-native'
import {
  Star,
  MapPin,
  BadgeCheck,
  Phone,
  Navigation,
  MessageCircle,
  Share2,
} from 'lucide-react-native'
import * as Clipboard from 'expo-clipboard'
import { Gym } from '../types/index'
import { getLiveOpenStatus } from '../utils/pricing'
import { useToast } from '@/context/ToastContext'

interface Props {
  gym: Gym
}

export function GymHeaderBlock({ gym }: Props) {
  const { showToast } = useToast()
  const liveStatus = getLiveOpenStatus(gym.timingsSchedule)

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${gym.lat},${gym.lng}`
    Linking.openURL(url)
  }

  const handleCall = () => {
    Linking.openURL(`tel:${gym.phone}`)
  }

  const handleWhatsApp = () => {
    const cleanNumber = gym.whatsapp.replace(/\D/g, '')
    const msg = encodeURIComponent(
      `Hi, I found ${gym.name} on GymApp Ludhiana and would like to know more about trial passes.`
    )
    Linking.openURL(`https://wa.me/${cleanNumber}?text=${msg}`)
  }

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
    <View className="gap-4 pt-1">
      {/* Title & Verified Badge */}
      <View className="gap-1">
        <View className="flex-row items-center gap-2 flex-wrap">
          <Text className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
            {gym.name}
          </Text>
          {gym.verified && (
            <View className="flex-row items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200">
              <BadgeCheck size={14} color="#2563EB" fill="#2563EB" />
              <Text className="text-brand text-xs font-semibold">Verified Partner</Text>
            </View>
          )}
        </View>
        {gym.tagline && (
          <Text className="text-sm sm:text-base text-slate-600 font-medium">
            {gym.tagline}
          </Text>
        )}
      </View>

      {/* Meta Row: Rating, Live Status, Location */}
      <View className="flex-row items-center gap-3 flex-wrap text-sm">
        {/* Rating Pill */}
        <View className="flex-row items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200/80 shadow-xs">
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <Text className="font-bold text-amber-900 text-xs">{gym.rating}</Text>
          <Text className="font-normal text-amber-700 text-xs">
            ({gym.reviewsCount} reviews)
          </Text>
        </View>

        {/* Live Open Status */}
        <View className="flex-row items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
          <View className="h-2 w-2 rounded-full bg-emerald-500" />
          <Text className="text-xs font-semibold text-emerald-800">
            {liveStatus.statusText}
          </Text>
        </View>

        {/* Locality */}
        <View className="flex-row items-center gap-1">
          <MapPin size={14} color="#64748B" />
          <Text className="text-xs font-semibold text-slate-700">
            {gym.locality}, Ludhiana
          </Text>
          <Text className="text-xs text-slate-400">({gym.distance})</Text>
        </View>
      </View>

      {/* Quick Action Buttons */}
      <View className="flex-row items-center gap-2 flex-wrap pt-1">
        <Pressable
          onPress={handleDirections}
          className="flex-row items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-xs active:bg-slate-50"
        >
          <Navigation size={14} color="#2563EB" />
          <Text className="text-xs font-semibold text-slate-800">Directions</Text>
        </Pressable>

        <Pressable
          onPress={handleCall}
          className="flex-row items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-xs active:bg-slate-50"
        >
          <Phone size={14} color="#059669" />
          <Text className="text-xs font-semibold text-slate-800">Call</Text>
        </Pressable>

        <Pressable
          onPress={handleWhatsApp}
          className="flex-row items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-xs active:bg-slate-50"
        >
          <MessageCircle size={14} color="#16A34A" />
          <Text className="text-xs font-semibold text-slate-800">WhatsApp</Text>
        </Pressable>

        <Pressable
          onPress={handleShare}
          className="flex-row items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-xs active:bg-slate-50"
        >
          <Share2 size={14} color="#64748B" />
          <Text className="text-xs font-semibold text-slate-800">Share</Text>
        </Pressable>
      </View>
    </View>
  )
}
