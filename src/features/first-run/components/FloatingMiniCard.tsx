import React from 'react'
import { View, Text } from 'react-native'
import { MapPin, QrCode } from 'lucide-react-native'

export interface FloatingMiniCardProps {
  variant: 'gym' | 'plan' | 'qr'
}

export function FloatingMiniCard({ variant }: FloatingMiniCardProps) {
  if (variant === 'gym') {
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#E2E8F0',
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: '#EFF6FF',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MapPin size={16} color="#2563EB" />
        </View>
        <View>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 13,
              fontWeight: '600',
              color: '#0F172A',
              lineHeight: 16,
            }}
          >
            Iron Forge Fitness
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 11,
              fontWeight: '400',
              color: '#64748B',
              lineHeight: 14,
              marginTop: 2,
            }}
          >
            1.2 km • Open now
          </Text>
        </View>
      </View>
    )
  }

  if (variant === 'plan') {
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#E2E8F0',
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 13,
              fontWeight: '600',
              color: '#0F172A',
              lineHeight: 16,
            }}
          >
            Monthly • ₹1,000
          </Text>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 11,
              fontWeight: '400',
              color: '#64748B',
              lineHeight: 14,
              marginTop: 2,
            }}
          >
            All gym & crossfit access
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#2563EB',
            borderRadius: 6,
            paddingHorizontal: 10,
            paddingVertical: 4,
          }}
        >
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: 11,
              fontWeight: '600',
              color: '#FFFFFF',
            }}
          >
            Buy
          </Text>
        </View>
      </View>
    )
  }

  // variant === 'qr'
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          backgroundColor: '#EFF6FF',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <QrCode size={18} color="#2563EB" />
      </View>
      <View>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 13,
            fontWeight: '600',
            color: '#0F172A',
            lineHeight: 16,
          }}
        >
          Paid • show at the gym
        </Text>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 11,
            fontWeight: '400',
            color: '#16A34A',
            lineHeight: 14,
            marginTop: 2,
          }}
        >
          Instant entry verified
        </Text>
      </View>
    </View>
  )
}

