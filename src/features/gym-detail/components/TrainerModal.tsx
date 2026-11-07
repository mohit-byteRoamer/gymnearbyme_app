import React from 'react'
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
} from 'react-native'
import { Image } from 'expo-image'
import { X, Star, Award, Users, Clock, ShieldCheck } from 'lucide-react-native'
import { useGymDetailStore } from '../store/gymDetailStore'

export function TrainerModal() {
  const { selectedTrainer, setSelectedTrainer } = useGymDetailStore()

  if (!selectedTrainer) return null

  return (
    <Modal
      visible={!!selectedTrainer}
      transparent
      animationType="fade"
      onRequestClose={() => setSelectedTrainer(null)}
    >
      <View className="flex-1 bg-black/70 justify-center items-center p-4">
        <View className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden max-h-[90%]">
          {/* Header with Photo */}
          <View className="relative h-44 bg-slate-900 overflow-hidden">
            <Image
              source={{ uri: selectedTrainer.photo }}
              className="w-full h-full opacity-80"
              contentFit="cover"
            />
            <View className="absolute inset-0 bg-black/40" />

            <Pressable
              onPress={() => setSelectedTrainer(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 items-center justify-center active:bg-black/80"
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <X size={18} color="#FFFFFF" />
            </Pressable>

            <View className="absolute bottom-4 left-5 right-5">
              <Text className="text-xl font-bold text-white tracking-tight">
                {selectedTrainer.name}
              </Text>
              <Text className="text-xs text-blue-200 font-medium">
                {selectedTrainer.role}
              </Text>
            </View>
          </View>

          {/* Details Scroll */}
          <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
            {/* Quick Stats Grid */}
            <View className="flex-row items-center justify-around p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <View className="items-center">
                <View className="flex-row items-center gap-1">
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text className="font-bold text-sm text-slate-900">
                    {selectedTrainer.rating}
                  </Text>
                </View>
                <Text className="text-[10px] text-slate-400 uppercase font-semibold">
                  Rating
                </Text>
              </View>

              <View className="h-6 w-px bg-slate-200" />

              <View className="items-center">
                <View className="flex-row items-center gap-1">
                  <Clock size={14} color="#2563EB" />
                  <Text className="font-bold text-sm text-slate-900">
                    {selectedTrainer.experienceYears}y+
                  </Text>
                </View>
                <Text className="text-[10px] text-slate-400 uppercase font-semibold">
                  Experience
                </Text>
              </View>

              <View className="h-6 w-px bg-slate-200" />

              <View className="items-center">
                <View className="flex-row items-center gap-1">
                  <Users size={14} color="#059669" />
                  <Text className="font-bold text-sm text-slate-900">
                    {selectedTrainer.clientsTrained || 200}+
                  </Text>
                </View>
                <Text className="text-[10px] text-slate-400 uppercase font-semibold">
                  Trained
                </Text>
              </View>
            </View>

            {/* Bio */}
            <View className="gap-1">
              <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                About the Coach
              </Text>
              <Text className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedTrainer.bio}
              </Text>
            </View>

            {/* Certifications */}
            {selectedTrainer.certifications && selectedTrainer.certifications.length > 0 && (
              <View className="gap-2">
                <Text className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Verified Certifications
                </Text>
                <View className="gap-1.5">
                  {selectedTrainer.certifications.map((cert, i) => (
                    <View
                      key={i}
                      className="flex-row items-center gap-2 p-2 bg-slate-50 rounded-xl"
                    >
                      <Award size={14} color="#2563EB" />
                      <Text className="text-xs font-medium text-slate-700">{cert}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Guarantee */}
            <View className="flex-row items-center gap-2 p-3 bg-emerald-50 rounded-xl">
              <ShieldCheck size={18} color="#059669" />
              <Text className="text-xs text-emerald-800 font-medium flex-1">
                Included with all Monthly, Quarterly, and Yearly passes.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}
