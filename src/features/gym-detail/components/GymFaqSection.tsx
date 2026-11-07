import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react-native'
import { Gym } from '../types/index'

interface Props {
  gym: Gym
}

export function GymFaqSection({ gym }: Props) {
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3'])

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const faqs = gym.faqs || []
  if (faqs.length === 0) return null

  return (
    <View className="gap-4 pt-4">
      <View className="flex-row items-center gap-2">
        <HelpCircle size={20} color="#2563EB" />
        <Text className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </Text>
      </View>

      <View className="gap-2.5">
        {faqs.map((faq) => {
          const isOpen = openIds.includes(faq.id)

          return (
            <View
              key={faq.id}
              className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs"
            >
              <Pressable
                onPress={() => toggle(faq.id)}
                className="w-full flex-row items-center justify-between p-4 sm:p-5"
                accessibilityRole="button"
                accessibilityLabel={faq.question}
              >
                <Text className="text-sm sm:text-base font-bold text-slate-900 flex-1 mr-3">
                  {faq.question}
                </Text>
                {isOpen ? (
                  <ChevronUp size={18} color="#94A3B8" />
                ) : (
                  <ChevronDown size={18} color="#94A3B8" />
                )}
              </Pressable>

              {isOpen && (
                <View className="px-4 pb-4 sm:px-5 sm:pb-5 border-t border-slate-100 pt-3">
                  <Text className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </Text>
                </View>
              )}
            </View>
          )
        })}
      </View>
    </View>
  )
}
