import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  Platform,
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { fetchGymDetail } from './api/gymApi'
import { Gym } from './types/index'
import { GymTopBar } from './components/GymTopBar'
import { GymHeroGallery } from './components/GymHeroGallery'
import { GymHeaderBlock } from './components/GymHeaderBlock'
import { GymSectionNav } from './components/GymSectionNav'
import { GymAboutSection } from './components/GymAboutSection'
import { GymTrainersSection } from './components/GymTrainersSection'
import { GymFacilitiesSection } from './components/GymFacilitiesSection'
import { GymTimingsSection } from './components/GymTimingsSection'
import { GymLocationSection } from './components/GymLocationSection'
import { GymReviewsSection } from './components/GymReviewsSection'
import { GymFaqSection } from './components/GymFaqSection'
import { GymSimilarSection } from './components/GymSimilarSection'
import { GymPricingCard } from './components/GymPricingCard'
import { GymMobileStickyBar } from './components/GymMobileStickyBar'
import { GymMobilePlanSheet } from './components/GymMobilePlanSheet'
import { TrainerModal } from './components/TrainerModal'
import { GymDetailSkeleton } from './components/GymDetailSkeleton'
import { Button } from '@/components/common/Button'
import { useBreakpoint } from '@/hooks/useBreakpoint'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function GymDetailPage() {
  const params = useLocalSearchParams<{ id?: string }>()
  const router = useRouter()
  const { isPhone, isTabletOrDesktop } = useBreakpoint()
  const insets = useSafeAreaInsets()

  const [gym, setGym] = useState<Gym | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const gymId = params.id || 'cult-fit-sarabha'

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    setError(null)

    fetchGymDetail(gymId)
      .then((data) => {
        if (!isMounted) return
        setGym(data)
      })
      .catch((err) => {
        if (!isMounted) return
        setError(err.message || 'Unable to load gym details')
      })
      .finally(() => {
        if (!isMounted) return
        setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [gymId])

  // SEO schema on web only
  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined' && gym) {
      document.title = `${gym.name} · GymApp Ludhiana`
    }
  }, [gym])

  if (loading) {
    return <GymDetailSkeleton />
  }

  if (error || !gym) {
    return (
      <View className="max-w-md mx-auto px-4 py-20 items-center text-center gap-4">
        <View className="w-16 h-16 rounded-full bg-rose-100 items-center justify-center">
          <Text className="text-rose-600 text-2xl font-bold">!</Text>
        </View>
        <Text className="text-xl font-extrabold text-slate-900">
          Gym Not Found
        </Text>
        <Text className="text-sm text-slate-500 text-center">
          We couldn’t find the details for this gym. It may have been relocated or temporarily unlisted.
        </Text>
        <View className="pt-2">
          <Button variant="primary" onPress={() => router.push('/home' as any)}>
            Back to Gym Listings
          </Button>
        </View>
      </View>
    )
  }

  return (
    <View
      className="flex-1 bg-slate-50"
      style={{ paddingTop: isPhone ? Math.max(insets.top, 24) : 0 }}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingBottom: isPhone ? 100 : 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="max-w-container w-full mx-auto px-4 sm:px-6 lg:px-8 py-3 gap-6">
          {/* 1. Top Bar */}
          <GymTopBar gym={gym} />

          {/* 2. Hero Gallery */}
          <GymHeroGallery gym={gym} />

          {/* 3. Main Adaptive Layout */}
          <View className="flex-col lg:flex-row gap-8 items-start pt-2">
            {/* LEFT COLUMN: Core Content */}
            <View className="flex-1 w-full gap-8">
              {/* Header Block */}
              <GymHeaderBlock gym={gym} />

              {/* Section Nav */}
              <GymSectionNav />

              {/* About & USPs */}
              <GymAboutSection gym={gym} />

              {/* Certified Trainers */}
              <GymTrainersSection gym={gym} />

              {/* Facilities */}
              <GymFacilitiesSection gym={gym} />

              {/* Timings */}
              <GymTimingsSection gym={gym} />

              {/* Location & Map */}
              <GymLocationSection gym={gym} />

              {/* Member Reviews */}
              <GymReviewsSection gym={gym} />

              {/* FAQs */}
              <GymFaqSection gym={gym} />

              {/* Similar Gyms Nearby */}
              <GymSimilarSection />
            </View>

            {/* RIGHT COLUMN: Desktop Sticky Booking Card (lg+) */}
            {isTabletOrDesktop && (
              <View className="hidden lg:flex w-96 sticky top-24">
                <GymPricingCard gym={gym} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Mobile Sticky Bottom Bar */}
      <GymMobileStickyBar gym={gym} />

      {/* Mobile Bottom Sheet Plan Selector */}
      <GymMobilePlanSheet gym={gym} />

      {/* Trainer Detail Modal */}
      <TrainerModal />
    </View>
  )
}
