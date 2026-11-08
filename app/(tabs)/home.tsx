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
import { MapPin, ChevronDown, Search, Bookmark } from 'lucide-react-native'
import { useAuth } from '../../src/context/AuthContext'
import { useLocation } from '../../src/context/LocationContext'
import { useDevState } from '../../src/context/DevStateContext'
import { useBookmarks } from '../../src/context/BookmarkContext'
import { useBreakpoint } from '../../src/hooks/useBreakpoint'
import { getGyms } from '../../src/utils/api'
import { GymItem } from '../../src/data/gyms'
import { GymCard } from '../../src/components/gym/GymCard'
import { GymCardSkeleton } from '../../src/components/common/Skeleton'
import { Input } from '../../src/components/common/Input'
import { Button } from '../../src/components/common/Button'
import { softShadow } from '../../src/theme/shadows'

export default function HomeScreen() {
  const router = useRouter()
  const { user, isGuest } = useAuth()
  const { selectedLocality } = useLocation()
  const { forceEmptyGyms, forceLoading } = useDevState()
  const { isPhone, isTablet, isDesktop, numColumns } = useBreakpoint()
  const { bookmarkedIds } = useBookmarks()

  const [gyms, setGyms] = useState<GymItem[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterSavedOnly, setFilterSavedOnly] = useState(false)

  const bookmarkedCount = bookmarkedIds.length

  const displayedGyms = filterSavedOnly
    ? gyms.filter((g) => bookmarkedIds.includes(g.id))
    : gyms

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
        {/* Top Header Row on Mobile: Location Chip + Bookmarks + Avatar */}
        {isPhone && (
          <View className="flex-row items-center justify-between gap-2.5">
            <Pressable
              onPress={() => router.push('/choose-area' as any)}
              className="flex-row items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200/90 shadow-xs active:scale-[0.98] flex-1 mr-1"
            >
              <MapPin size={16} color="#2563EB" />
              <Text numberOfLines={1} className="text-sm font-semibold text-slate-900 flex-1">
                {selectedLocality.name}
              </Text>
              <ChevronDown size={16} color="#94A3B8" />
            </Pressable>

            {/* Bookmarks Button */}
            <Pressable
              onPress={() => router.push('/bookmarks' as any)}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 shadow-xs items-center justify-center relative active:scale-95"
              accessibilityRole="button"
              accessibilityLabel="View saved bookmarks"
            >
              <Bookmark
                size={18}
                color={bookmarkedCount > 0 ? '#2563EB' : '#475569'}
                fill={bookmarkedCount > 0 ? '#2563EB' : 'transparent'}
              />
              {bookmarkedCount > 0 && (
                <View className="absolute -top-1 -right-1 bg-brand rounded-full min-w-[17px] h-[17px] px-1 items-center justify-center border border-white">
                  <Text className="text-[10px] font-bold text-white leading-none">
                    {bookmarkedCount}
                  </Text>
                </View>
              )}
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

            <View className="flex-row items-center gap-3">
              <Pressable
                onPress={() => router.push('/bookmarks' as any)}
                className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-xs hover:border-slate-300 active:scale-95 transition-all"
                accessibilityRole="button"
                accessibilityLabel="View saved bookmarks"
              >
                <Bookmark
                  size={15}
                  color={bookmarkedCount > 0 ? '#2563EB' : '#475569'}
                  fill={bookmarkedCount > 0 ? '#2563EB' : 'transparent'}
                />
                <Text className="text-xs font-semibold text-slate-700">
                  Saved ({bookmarkedCount})
                </Text>
              </Pressable>

              <Text className="text-xs text-slate-400 font-medium">
                Showing active gyms in Ludhiana
              </Text>
            </View>
          </View>
        )}

        {/* Guest Explorer Banner */}
        {isGuest && (
          <View className="bg-blue-50 border border-blue-200/80 rounded-2xl p-3 sm:p-3.5 flex-row items-center justify-between gap-3">
            <View className="flex-1">
              <Text className="text-xs font-bold text-blue-900">
                Exploring as Guest
              </Text>
              <Text className="text-[11px] text-blue-700 mt-0.5">
                Browse gyms, photos, prices and timings. Sign in anytime to join.
              </Text>
            </View>
            <Pressable
              onPress={() => router.push('/login' as any)}
              className="bg-brand py-1.5 px-3 rounded-lg active:bg-blue-700 shrink-0"
            >
              <Text className="text-white text-xs font-semibold">Sign In</Text>
            </Pressable>
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

        {/* Section Header with All / Saved quick toggle */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => setFilterSavedOnly(false)}
              className={`px-3 py-1.5 rounded-full border transition-all ${
                !filterSavedOnly
                  ? 'bg-slate-900 border-slate-900'
                  : 'bg-white border-slate-200'
              }`}
            >
              <Text
                className={`text-xs font-bold ${
                  !filterSavedOnly ? 'text-white' : 'text-slate-600'
                }`}
              >
                All Gyms
              </Text>
            </Pressable>

            <Pressable
              onPress={() => setFilterSavedOnly(true)}
              className={`flex-row items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all ${
                filterSavedOnly
                  ? 'bg-brand border-brand'
                  : 'bg-white border-slate-200'
              }`}
            >
              <Bookmark
                size={12}
                color={filterSavedOnly ? '#FFFFFF' : '#64748B'}
                fill={filterSavedOnly ? '#FFFFFF' : 'transparent'}
              />
              <Text
                className={`text-xs font-bold ${
                  filterSavedOnly ? 'text-white' : 'text-slate-600'
                }`}
              >
                Saved ({bookmarkedCount})
              </Text>
            </Pressable>
          </View>

          <Text className="text-xs text-slate-400 font-medium">
            {filterSavedOnly
              ? `${displayedGyms.length} saved`
              : 'Nearest first'}
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
        ) : displayedGyms.length === 0 ? (
          <View
            style={[softShadow, { borderRadius: 16 }]}
            className="bg-white border border-black/[0.04] p-8 sm:p-12 items-center text-center max-w-md mx-auto my-6 w-full"
          >
            <View className="w-14 h-14 rounded-full bg-blue-50 items-center justify-center mb-4">
              {filterSavedOnly ? (
                <Bookmark size={28} color="#2563EB" />
              ) : (
                <MapPin size={28} color="#94A3B8" />
              )}
            </View>
            <Text className="text-base font-bold text-slate-900 mb-1 text-center">
              {filterSavedOnly ? 'No saved gyms here' : 'No gyms found here'}
            </Text>
            <Text className="text-xs text-slate-500 mb-6 text-center leading-relaxed">
              {filterSavedOnly
                ? 'You have not saved any gyms in this area yet. Tap the bookmark icon on any gym card to save it.'
                : `We couldn't find any gyms matching "${searchQuery || selectedLocality.shortName}". Try changing the area or clearing your search.`}
            </Text>
            <Button
              variant={filterSavedOnly ? 'secondary' : 'primary'}
              onPress={() => {
                if (filterSavedOnly) {
                  setFilterSavedOnly(false)
                } else {
                  setSearchQuery('')
                  router.push('/choose-area' as any)
                }
              }}
            >
              {filterSavedOnly ? 'Show all gyms' : 'Change area'}
            </Button>
          </View>
        ) : (
          <View className="flex-row flex-wrap gap-4 sm:gap-6">
            {displayedGyms.map((gym) => (
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
