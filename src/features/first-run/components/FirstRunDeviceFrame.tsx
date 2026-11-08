import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg'

interface FirstRunDeviceFrameProps {
  width: number
  height: number
  label: string
  children: React.ReactNode
}

export function FirstRunDeviceFrame({
  width,
  height,
  label,
  children,
}: FirstRunDeviceFrameProps) {
  return (
    <View style={{ alignItems: 'center' }}>
      {/* Label above device */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          marginBottom: 12,
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#E2E8F0',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 12,
            fontWeight: '600',
            color: '#0F172A',
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 11,
            fontWeight: '500',
            color: '#64748B',
          }}
        >
          ({width} × {height})
        </Text>
      </View>

      {/* Outer Device Chassis */}
      <View
        style={{
          width: width + 20,
          height: height + 24,
          backgroundColor: '#FFFFFF',
          borderRadius: 44,
          borderWidth: 2,
          borderColor: '#CBD5E1',
          padding: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Screen Viewport */}
        <View
          style={{
            width,
            height,
            backgroundColor: '#FFFFFF',
            borderRadius: 36,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Status Bar */}
          <View
            style={{
              height: 38,
              width: '100%',
              backgroundColor: '#FFFFFF',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
              zIndex: 30,
            }}
          >
            {/* Time */}
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 13,
                fontWeight: '600',
                color: '#0F172A',
              }}
            >
              9:41
            </Text>

            {/* Dynamic Island / Speaker Pill */}
            <View
              style={{
                width: 90,
                height: 18,
                borderRadius: 9,
                backgroundColor: '#0F172A',
              }}
            />

            {/* Cellular & Battery Icons */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              {/* Cellular bars */}
              <Svg width={14} height={10} viewBox="0 0 14 10" fill="none">
                <Rect x="0" y="7" width="2.5" height="3" rx="0.5" fill="#0F172A" />
                <Rect x="4" y="5" width="2.5" height="5" rx="0.5" fill="#0F172A" />
                <Rect x="8" y="2.5" width="2.5" height="7.5" rx="0.5" fill="#0F172A" />
                <Rect x="12" y="0" width="2" height="10" rx="0.5" fill="#0F172A" />
              </Svg>
              {/* Battery pill */}
              <View
                style={{
                  width: 20,
                  height: 10,
                  borderRadius: 3,
                  borderWidth: 1,
                  borderColor: '#0F172A',
                  padding: 1,
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: '80%',
                    height: '100%',
                    backgroundColor: '#0F172A',
                    borderRadius: 1,
                  }}
                />
              </View>
            </View>
          </View>

          {/* Screen Content */}
          <View style={{ flex: 1, width: '100%' }}>
            {children}
          </View>

          {/* Bottom Home Indicator */}
          <View
            style={{
              height: 20,
              width: '100%',
              backgroundColor: '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 30,
            }}
          >
            <View
              style={{
                width: 130,
                height: 4,
                borderRadius: 2,
                backgroundColor: '#0F172A',
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

