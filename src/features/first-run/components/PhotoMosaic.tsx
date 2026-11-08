import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import { AppLogoMark } from './AppLogoMark'

const MOSAIC_PHOTOS = [
  // Column 1
  [
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80',
  ],
  // Column 2
  [
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80',
  ],
  // Column 3
  [
    'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=600&q=80',
  ],
]

interface PhotoMosaicProps {
  height?: number
  topPadding?: number
}

export function PhotoMosaic({ height, topPadding = 8 }: PhotoMosaicProps) {
  return (
    <View
      style={{
        width: '100%',
        height: height || '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* 3 columns with staggered heights */}
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          paddingHorizontal: 8,
          paddingTop: topPadding,
          marginTop: 0,
        }}
      >
        {/* Column 1 */}
        <View style={{ flex: 1, gap: 8 }}>
          <View
            style={{
              height: 128,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: '#F1F5F9',
              borderWidth: 1,
              borderColor: '#E2E8F0',
            }}
          >
            <Image
              source={{ uri: MOSAIC_PHOTOS[0][0] }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
          </View>
          <View
            style={{
              height: 168,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: '#F1F5F9',
              borderWidth: 1,
              borderColor: '#E2E8F0',
            }}
          >
            <Image
              source={{ uri: MOSAIC_PHOTOS[0][1] }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
          </View>
        </View>

        {/* Column 2 (Center - slightly taller / offset) */}
        <View style={{ flex: 1, gap: 8 }}>
          <View
            style={{
              height: 160,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: '#F1F5F9',
              borderWidth: 1,
              borderColor: '#E2E8F0',
            }}
          >
            <Image
              source={{ uri: MOSAIC_PHOTOS[1][0] }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
          </View>
          <View
            style={{
              height: 136,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: '#F1F5F9',
              borderWidth: 1,
              borderColor: '#E2E8F0',
            }}
          >
            <Image
              source={{ uri: MOSAIC_PHOTOS[1][1] }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
          </View>
        </View>

        {/* Column 3 */}
        <View style={{ flex: 1, gap: 8 }}>
          <View
            style={{
              height: 112,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: '#F1F5F9',
              borderWidth: 1,
              borderColor: '#E2E8F0',
            }}
          >
            <Image
              source={{ uri: MOSAIC_PHOTOS[2][0] }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
          </View>
          <View
            style={{
              height: 184,
              borderRadius: 20,
              overflow: 'hidden',
              backgroundColor: '#F1F5F9',
              borderWidth: 1,
              borderColor: '#E2E8F0',
            }}
          >
            <Image
              source={{ uri: MOSAIC_PHOTOS[2][1] }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
            />
          </View>
        </View>
      </View>

      {/* Small white rounded badge carrying the blue logo mark centered over the mosaic */}
      <View
        style={{
          position: 'absolute',
          inset: 0,
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderWidth: 1,
            borderColor: '#E2E8F0',
            borderRadius: 16,
            padding: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AppLogoMark size={36} />
        </View>
      </View>
    </View>
  )
}

