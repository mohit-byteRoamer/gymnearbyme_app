import React, { useState } from 'react'
import { View, Text, Pressable, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { HeroPhotoCard } from '../components/HeroPhotoCard'
import { PageDots } from '../components/PageDots'
import { WalkthroughSlideData } from '../types'

export const WALKTHROUGH_SLIDES: WalkthroughSlideData[] = [
  {
    id: 1,
    headline: 'Find gyms near you',
    subtext: 'See the best gyms around you with photos, prices and timings.',
    photoUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    photoAlt: 'Bright modern gym interior',
    cardType: 'gym',
    cardData: {
      title: 'Iron Forge Fitness',
      subtitle: '1.2 km • Open now',
    },
  },
  {
    id: 2,
    headline: 'Everything in one place',
    subtext: 'Compare plans, meet trainers, check the location and call the gym.',
    photoUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1000&q=80',
    photoAlt: 'Trainer coaching a member',
    cardType: 'plan',
    cardData: {
      title: 'Monthly • ₹1,000',
      badgeText: 'Buy',
    },
  },
  {
    id: 3,
    headline: 'Pay online, show your QR',
    subtext: 'Pay the full price in the app. Nothing to pay at the gym.',
    photoUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    photoAlt: 'Person smiling after workout holding phone',
    cardType: 'qr',
    cardData: {
      title: 'Paid • show at the gym',
    },
  },
]

interface WalkthroughScreenProps {
  initialSlide?: number
  onComplete?: () => void
  onSkip?: () => void
}

export function WalkthroughScreen({
  initialSlide = 0,
  onComplete,
  onSkip,
}: WalkthroughScreenProps) {
  const insets = useSafeAreaInsets()
  const topInset = Math.max(insets.top, Platform.OS === 'android' ? 24 : 0)

  const [currentSlideIndex, setCurrentSlideIndex] = useState(initialSlide)
  const isLastSlide = currentSlideIndex === WALKTHROUGH_SLIDES.length - 1
  const slide = WALKTHROUGH_SLIDES[currentSlideIndex]

  const handleNext = () => {
    if (isLastSlide) {
      onComplete?.()
    } else {
      setCurrentSlideIndex((prev) => Math.min(prev + 1, WALKTHROUGH_SLIDES.length - 1))
    }
  }

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
      }}
    >
      <StatusBar style="dark" />

      {/* Top Safe Area Inset */}
      <View style={{ height: topInset, backgroundColor: '#FFFFFF', width: '100%' }} />

      {/* Top Header Bar with Skip */}
      <View
        style={{
          height: 48,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingHorizontal: 16,
        }}
      >
        {!isLastSlide ? (
          <Pressable
            onPress={onSkip || onComplete}
            hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
            accessibilityRole="button"
            accessibilityLabel="Skip walkthrough"
          >
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: '500',
                color: '#64748B',
              }}
            >
              Skip
            </Text>
          </Pressable>
        ) : (
          <View style={{ width: 40, height: 20 }} />
        )}
      </View>

      {/* Top 58% of screen: Hero Photo Card */}
      <View style={{ height: '54%', minHeight: 280, maxHeight: 460 }}>
        <HeroPhotoCard
          photoUrl={slide.photoUrl}
          photoAlt={slide.photoAlt}
          variant={slide.cardType}
        />
      </View>

      {/* Bottom Area: Headline, Subtext, Dots, Button */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 24,
          paddingBottom: 24,
          justifyContent: 'space-between',
        }}
      >
        {/* Texts */}
        <View>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: 'Roboto',
              fontSize: 28,
              fontWeight: '700',
              color: '#0F172A',
              lineHeight: 34,
              letterSpacing: -0.5,
              textAlign: 'left',
            }}
          >
            {slide.headline}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: 'Roboto',
              fontSize: 16,
              fontWeight: '400',
              color: '#64748B',
              lineHeight: 22,
              marginTop: 8,
              textAlign: 'left',
            }}
          >
            {slide.subtext}
          </Text>
        </View>

        {/* Page Dots & Next / Get Started Button */}
        <View style={{ gap: 20 }}>
          <PageDots activeIndex={currentSlideIndex} total={3} />

          <Pressable
            onPress={handleNext}
            style={{
              width: '100%',
              height: 48,
              borderRadius: 12,
              backgroundColor: '#2563EB',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            accessibilityRole="button"
            accessibilityLabel={isLastSlide ? 'Get started' : 'Next slide'}
          >
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: '600',
                color: '#FFFFFF',
              }}
            >
              {isLastSlide ? 'Get started' : 'Next'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

