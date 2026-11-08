import React, { useState, useMemo } from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  Platform,
} from 'react-native'
import { useRouter } from 'expo-router'
import { ArrowLeft, Bookmark, Search, Trash2 } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useBookmarks } from '../src/context/BookmarkContext'
import { useBreakpoint } from '../src/hooks/useBreakpoint'
import { GymCard } from '../src/components/gym/GymCard'
import { Input } from '../src/components/common/Input'
import { Button } from '../src/components/common/Button'
import { softShadow } from '../src/theme/shadows'

export default function BookmarksScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { isPhone, numColumns } = useBreakpoint()
  const { bookmarkedGyms, clearBookmarks } = useBookmarks()
  const [search, setSearch] = useState('')

  const filteredGyms = useMemo(() => {
    if (!search.trim()) return bookmarkedGyms
    const query = search.trim().toLowerCase()
    return bookmarkedGyms.filter(
      (gym) =>
        gym.name.toLowerCase().includes(query) ||
        gym.locality.toLowerCase().includes(query)
    )
  }, [bookmarkedGyms, search])

  const handleClearAll = () => {
    const executeClear = () => {
      clearBookmarks()
    }

    if (Platform.OS === 'web') {
      if (
        typeof window !== 'undefined' &&
        window.confirm('Are you sure you want to remove all saved gym bookmarks?')
      ) {
        executeClear()
      }
    } else {
      Alert.alert(
        'Clear Bookmarks',
        'Are you sure you want to remove all saved gym bookmarks?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Clear All', style: 'destructive', onPress: executeClear },
        ]
      )
    }
  }

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back()
    } else {
      router.replace('/home' as any)
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-slate-50"
      style={{ paddingTop: Math.max(insets.top, 24) }}
      contentContainerStyle={{ paddingBottom: isPhone ? 96 : 48 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="max-w-container w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 gap-6">
        {/* Top Header Bar */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={handleBack}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200/90 shadow-xs items-center justify-center active:scale-95"
              accessibilityRole="button"
              accessibilityLabel="Back"
            >
              <ArrowLeft size={18} color="#334155" />
            </Pressable>

            <View className="flex-row items-center gap-2">
              <Text className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Saved Gyms
              </Text>
              <View className="bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                <Text className="text-xs font-bold text-brand">
                  {bookmarkedGyms.length}
                </Text>
              </View>
            </View>
          </View>

          {/* Clear all action */}
          {bookmarkedGyms.length > 0 && (
            <Pressable
              onPress={handleClearAll}
              className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white active:bg-rose-50 hover:border-rose-200 active:scale-95 transition-all"
              accessibilityRole="button"
              accessibilityLabel="Clear all bookmarks"
            >
              <Trash2 size={13} color="#64748B" />
              <Text className="text-xs font-semibold text-slate-600">
                Clear all
              </Text>
            </Pressable>
          )}
        </View>

        {/* Search within bookmarks (shown when 2+ bookmarks) */}
        {bookmarkedGyms.length > 1 && (
          <Input
            value={search}
            onChangeText={setSearch}
            placeholder="Filter saved gyms by name or locality"
            leftIcon={Search}
            onClear={() => setSearch('')}
          />
        )}

        {/* Main Content */}
        {bookmarkedGyms.length === 0 ? (
          /* Empty State */
          <View
            style={[softShadow, { borderRadius: 20 }]}
            className="bg-white border border-black/[0.04] p-8 sm:p-12 items-center text-center max-w-md mx-auto my-8 w-full gap-4"
          >
            <View className="w-16 h-16 rounded-full bg-blue-50 items-center justify-center">
              <Bookmark size={30} color="#2563EB" />
            </View>
            <View className="items-center">
              <Text className="text-lg font-bold text-slate-900 mb-1 text-center">
                No saved gyms yet
              </Text>
              <Text className="text-xs text-slate-500 max-w-xs text-center leading-relaxed">
                When you find gyms you like, tap the bookmark icon on any gym card or detail page to save them here for quick access.
              </Text>
            </View>
            <Button
              variant="primary"
              size="md"
              onPress={() => router.push('/home' as any)}
              className="px-6 mt-2"
            >
              Explore Gyms
            </Button>
          </View>
        ) : filteredGyms.length === 0 ? (
          /* Search no results */
          <View
            style={[softShadow, { borderRadius: 16 }]}
            className="bg-white border border-black/[0.04] p-8 items-center text-center max-w-md mx-auto my-6 w-full gap-3"
          >
            <Text className="text-base font-bold text-slate-900 text-center">
              No matching gyms
            </Text>
            <Text className="text-xs text-slate-500 text-center">
              No bookmarked gyms match &quot;{search}&quot;.
            </Text>
            <Button
              variant="secondary"
              size="sm"
              onPress={() => setSearch('')}
              className="mt-1"
            >
              Clear filter
            </Button>
          </View>
        ) : (
          /* Grid of Bookmarked Gym Cards */
          <View className="flex-row flex-wrap gap-4 sm:gap-6">
            {filteredGyms.map((gym) => (
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

