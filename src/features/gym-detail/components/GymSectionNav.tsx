import React from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { useGymDetailStore } from '../store/gymDetailStore'

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'trainers', label: 'Trainers' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'timings', label: 'Timings' },
  { id: 'location', label: 'Location' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faqs', label: 'FAQs' },
]

export function GymSectionNav() {
  const { activeSection, setActiveSection } = useGymDetailStore()

  return (
    <View className="bg-white/95 border-b border-slate-200/80 py-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8, alignItems: 'center' }}
      >
        {SECTIONS.map((tab) => {
          const isActive = activeSection === tab.id

          return (
            <Pressable
              key={tab.id}
              onPress={() => setActiveSection(tab.id)}
              className={`px-3.5 py-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-blue-50 border border-blue-200 shadow-2xs'
                  : 'active:bg-slate-100'
              }`}
            >
              <Text
                className={`text-xs sm:text-sm ${
                  isActive ? 'font-bold text-brand' : 'font-medium text-slate-600'
                }`}
              >
                {tab.label}
              </Text>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}
