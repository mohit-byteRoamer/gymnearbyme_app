import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { FloatingMiniCard } from './FloatingMiniCard'

export interface HeroPhotoCardProps {
  photoUrl: string
  photoAlt?: string
  variant: 'gym' | 'plan' | 'qr'
  heightPercentage?: string | number
}

export function HeroPhotoCard({
  photoUrl,
  variant,
}: HeroPhotoCardProps) {
  return (
    <View
      style={{
        marginHorizontal: 16,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: '#F1F5F9',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        flex: 1,
        position: 'relative',
      }}
    >
      <Image
        source={{ uri: photoUrl }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        transition={200}
      />

      {/* Floating mini card overlapping bottom-left edge of photo */}
      <View
        style={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          right: 12,
          alignItems: 'flex-start',
        }}
      >
        <FloatingMiniCard variant={variant} />
      </View>
    </View>
  )
}

