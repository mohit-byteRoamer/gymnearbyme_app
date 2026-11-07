import React from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { Image } from 'expo-image'
import { Dumbbell, Star, Award, ChevronRight } from 'lucide-react-native'
import { Gym } from '../types/index'
import { useGymDetailStore } from '../store/gymDetailStore'

interface Props {
  gym: Gym
}

export function GymTrainersSection({ gym }: Props) {
  const { setSelectedTrainer } = useGymDetailStore()

  if (!gym.trainers || gym.trainers.length === 0) return null

  return (
    <View className="gap-4 pt-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Dumbbell size={20} color="#2563EB" />
          <Text className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Certified Trainers ({gym.trainers.length})
          </Text>
        </View>
        <Text className="text-xs text-slate-400 font-medium hidden sm:flex">
          Tap coach to view bio & credentials
        </Text>
      </View>

      {/* Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 16, paddingRight: 16 }}
      >
        {gym.trainers.map((trainer) => (
          <Pressable
            key={trainer.id}
            onPress={() => setSelectedTrainer(trainer)}
            className="w-72 sm:w-80 bg-white rounded-3xl border border-slate-200/90 p-4 shadow-sm active:scale-[0.99] flex-col justify-between"
          >
            <View>
              <View className="flex-row items-center gap-3.5 mb-3">
                <Image
                  source={{ uri: trainer.photo }}
                  className="w-16 h-16 rounded-2xl"
                  contentFit="cover"
                />
                <View className="flex-1 min-w-0">
                  <Text numberOfLines={1} className="font-extrabold text-slate-900 text-base leading-tight">
                    {trainer.name}
                  </Text>
                  <Text numberOfLines={1} className="text-xs text-slate-500 font-medium mt-0.5">
                    {trainer.speciality}
                  </Text>
                  <View className="flex-row items-center gap-2 mt-1">
                    <View className="flex-row items-center gap-1">
                      <Star size={12} color="#F59E0B" fill="#F59E0B" />
                      <Text className="text-amber-500 font-bold text-xs">{trainer.rating}</Text>
                    </View>
                    <Text className="text-slate-300 text-xs">·</Text>
                    <Text className="text-[11px] text-slate-500 font-medium">
                      {trainer.experienceYears} yrs exp
                    </Text>
                  </View>
                </View>
              </View>

              <Text numberOfLines={2} className="text-xs text-slate-600 leading-relaxed mb-3">
                {trainer.bio}
              </Text>
            </View>

            <View className="flex-row items-center justify-between pt-3 border-t border-slate-100">
              <View className="flex-row items-center gap-1.5 flex-1 min-w-0 mr-2">
                <Award size={14} color="#2563EB" />
                <Text numberOfLines={1} className="text-[11px] font-semibold text-brand flex-1">
                  {trainer.certifications?.[0] || 'Certified Master Trainer'}
                </Text>
              </View>
              <ChevronRight size={14} color="#94A3B8" />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}
