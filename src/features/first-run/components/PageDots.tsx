import React from 'react'
import { View } from 'react-native'

interface PageDotsProps {
  total?: number
  activeIndex: number
  className?: string
}

export function PageDots({ total = 3, activeIndex, className = '' }: PageDotsProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
      className={className}
    >
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === activeIndex
        return (
          <View
            key={i}
            style={{
              width: isActive ? 24 : 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: isActive ? '#2563EB' : '#CBD5E1',
            }}
          />
        )
      })}
    </View>
  )
}

