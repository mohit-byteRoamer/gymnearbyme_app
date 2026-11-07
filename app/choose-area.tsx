import React, { useState } from 'react'
import { View, Text, ScrollView, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { ArrowLeft, Search, Navigation, Check, MapPin } from 'lucide-react-native'
import { LOCALITIES } from '../src/data/localities'
import { useLocation } from '../src/context/LocationContext'
import { Input } from '../src/components/common/Input'

export default function ChooseAreaScreen() {
  const router = useRouter()
  const { selectedLocality, setLocalityById, allowLocation } = useLocation()
  const [search, setSearch] = useState('')

  const filteredLocalities = LOCALITIES.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (id: string) => {
    setLocalityById(id)
    router.replace('/home' as any)
  }

  const handleUseCurrentLocation = async () => {
    await allowLocation()
    router.replace('/home' as any)
  }

  return (
    <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={{ paddingBottom: 40 }}>
      <View className="max-w-form w-full mx-auto px-4 py-4 sm:py-6 gap-4">
        {/* Top Bar with Back Button */}
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-xs items-center justify-center active:scale-95"
            accessibilityRole="button"
            accessibilityLabel="Back"
          >
            <ArrowLeft size={18} color="#334155" />
          </Pressable>
          <Text className="text-lg font-bold text-slate-900">Choose your area</Text>
        </View>

        {/* Search Field */}
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Search locality in Ludhiana"
          leftIcon={Search}
          onClear={() => setSearch('')}
        />

        {/* Localities Card */}
        <View className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          {/* Use My Current Location */}
          <Pressable
            onPress={handleUseCurrentLocation}
            className="w-full px-4 py-3.5 flex-row items-center justify-between active:bg-blue-50/50 border-b border-slate-100"
          >
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-full bg-blue-50 items-center justify-center">
                <Navigation size={16} color="#2563EB" />
              </View>
              <View>
                <Text className="text-sm font-semibold text-brand">
                  Use my current location
                </Text>
                <Text className="text-xs text-slate-400">
                  Detects nearby gyms (Model Town, Ludhiana)
                </Text>
              </View>
            </View>
          </Pressable>

          {/* Localities List */}
          {filteredLocalities.map((loc, idx) => {
            const isSelected = selectedLocality.id === loc.id
            return (
              <Pressable
                key={loc.id}
                onPress={() => handleSelect(loc.id)}
                className={`w-full px-4 py-3.5 flex-row items-center justify-between active:bg-slate-50 ${
                  idx > 0 ? 'border-t border-slate-100' : ''
                }`}
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-9 h-9 rounded-full bg-slate-100 items-center justify-center">
                    <MapPin size={16} color="#64748B" />
                  </View>
                  <View>
                    <Text
                      className={`text-sm ${
                        isSelected ? 'font-bold text-brand' : 'font-medium text-slate-800'
                      }`}
                    >
                      {loc.name}
                    </Text>
                    <Text className="text-xs text-slate-400">
                      {loc.count} gym{loc.count > 1 ? 's' : ''} available
                    </Text>
                  </View>
                </View>

                {isSelected && <Check size={18} color="#2563EB" />}
              </Pressable>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}
