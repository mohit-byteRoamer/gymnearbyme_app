import React from 'react'
import { View } from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg'

interface AppLogoMarkProps {
  size?: number
  className?: string
}

export function AppLogoMark({ size = 96, className = '' }: AppLogoMarkProps) {
  const borderRadius = Math.round(size * 0.25)
  const iconSize = Math.round(size * 0.5)

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius,
        backgroundColor: '#2563EB',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className={className}
    >
      <Svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
      >
        {/* Dumbbell bar */}
        <Rect x="6" y="10.5" width="12" height="3" rx="1.5" fill="#FFFFFF" />
        {/* Left inner weight */}
        <Rect x="4" y="6" width="2.5" height="12" rx="1.25" fill="#FFFFFF" />
        {/* Left outer weight */}
        <Rect x="1.5" y="8" width="2.5" height="8" rx="1.25" fill="#FFFFFF" />
        {/* Right inner weight */}
        <Rect x="17.5" y="6" width="2.5" height="12" rx="1.25" fill="#FFFFFF" />
        {/* Right outer weight */}
        <Rect x="20" y="8" width="2.5" height="8" rx="1.25" fill="#FFFFFF" />
      </Svg>
    </View>
  )
}

