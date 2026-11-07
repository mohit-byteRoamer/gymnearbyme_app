import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
} from 'react-native'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { MapPin, ChevronDown, Search } from 'lucide-react-native'
import { useAuth } from '../../src/context/AuthContext'
import { useLocation } from '../../src/context/LocationContext'
import { useDevState } from '../../src/context/DevStateContext'
import { useBreakpoint } from '../../src/hooks/useBreakpoint'
import { getGyms } from '../../src/utils/api'
import { GymItem } from '../../src/data/gyms'
import { GymCard } from '../../src/components/gym/GymCard'
import { GymCardSkeleton } from '../../src/components/common/Skeleton'
import { Input } from '../../src/components/common/Input'
import { Button } from '../../src/components/common/Button'

export default function HomeScreen() {
  const router = useRouter()
  const { user } = useAuth()
  const { selectedLocality } = useLocation()
  const { forceEmptyGyms, forceLoading } = useDevState()
  const { isPhone, isTablet, isDesktop, numColumns } = useBreakpoint()

  const [gyms, setGyms] = useState<GymItem[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchGymList = useCallback(async () => {
    try {
      const data = await getGyms({
        locality: selectedLocality.id,
        search: searchQuery,
      })
      if (forceEmptyGyms) {
        setGyms([])
      } else {
        setGyms(data)
      }
    } catch {
      setGyms([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [selectedLocality.id, searchQuery, forceEmptyGyms])

  useEffect(() => {
    setLoading(true)
    fetchGymList()
  }, [fetchGymList])

  const onRefresh = () => {
    setRefreshing(true)
    fetchGymList()
  }

  const isLoadingState = loading || forceLoading

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      contentContainerStyle={{ paddingBottom: isPhone ? 96 : 40 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2563EB']} />
      }
    >
      <View className="max-w-container w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 gap-6">
        {/* Top Header Row on Mobile: Location Chip + Avatar */}
        {isPhone && (
          <View className="flex-row items-center justify-between gap-3">
            <Pressable
              onPress={() => router.push('/choose-area' as any)}
              className="flex-row items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-xs active:scale-[0.98] flex-1 mr-2"
            >
              <MapPin size={16} color="#2563EB" />
              <Text numberOfLines={1} className="text-sm font-semibold text-slate-900 flex-1">
                {selectedLocality.name}
              </Text>
              <ChevronDown size={16} color="#94A3B8" />
            </Pressable>

            {/* Avatar */}
            <Pressable
              onPress={() => router.push('/profile' as any)}
              className="w-10 h-10 rounded-full bg-brand items-center justify-center overflow-hidden border border-slate-200 shadow-xs"
            >
              {user?.avatar ? (
                <Image source={{ uri: user.avatar }} className="w-full h-full" />
              ) : (
                <Text className="text-sm font-bold text-white">
                  {user?.name?.[0] || 'U'}
                </Text>
              )}
            </Pressable>
          </View>
        )}

        {/* Location bar on Tablet/Desktop */}
        {!isPhone && (
          <View className="flex-row items-center justify-between">
            <Pressable
              onPress={() => router.push('/choose-area' as any)}
              className="flex-row items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300"
            >
              <MapPin size={16} color="#2563EB" />
              <Text className="text-sm font-semibold text-slate-900">
                {selectedLocality.name}
              </Text>
              <ChevronDown size={16} color="#94A3B8" />
            </Pressable>

            <Text className="text-xs text-slate-400 font-medium">
              Showing active gyms in Ludhiana
            </Text>
          </View>
        )}

        {/* Search Bar */}
        <Input
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search gyms by name or area"
          leftIcon={Search}
          onClear={() => setSearchQuery('')}
        />

        {/* Section Header */}
        <View className="flex-row items-center justify-between">
          <Text className="text-lg sm:text-xl font-bold text-slate-900">
            Gyms near you
          </Text>
          <Text className="text-xs text-slate-400 font-medium">
            Nearest first
          </Text>
        </View>

        {/* Content Grid */}
        {isLoadingState ? (
          <View
            className={`
              flex-row flex-wrap gap-4 sm:gap-6
            `}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <View
                key={i}
                style={{
                  width:
                    numColumns === 3
                      ? '31.5%'
                      : numColumns === 2
                      ? '48%'
                      : '100%',
                }}
              >
                <GymCardSkeleton />
              </View>
            ))}
          </View>
        ) : gyms.length === 0 ? (
          <View className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 items-center text-center shadow-sm max-w-md mx-auto my-6 w-full">
            <View className="w-14 h-14 rounded-full bg-slate-100 items-center justify-center mb-4">
              <MapPin size={28} color="#94A3B8" />
            </View>
            <Text className="text-base font-bold text-slate-900 mb-1 text-center">
              No gyms found here
            </Text>
            <Text className="text-xs text-slate-500 mb-6 text-center leading-relaxed">
              We couldn't find any gyms matching "{searchQuery || selectedLocality.shortName}". Try changing the area or clearing your search.
            </Text>
            <Button
              variant="primary"
              onPress={() => {
                setSearchQuery('')
                router.push('/choose-area' as any)
              }}
            >
              Change area
            </Button>
          </View>
        ) : (
          <View className="flex-row flex-wrap gap-4 sm:gap-6">
            {gyms.map((gym) => (
              <View
                key={gym.id}
                style={{
                  width:
                    numColumns === 3
                      ? '31.5%'
                      : numColumns === 2
                      ? '48%'
                      : '100%',
                }}
              >
                <GymCard gym={gym} />
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  )
}
