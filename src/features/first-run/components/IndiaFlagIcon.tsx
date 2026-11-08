import React from 'react'
import { View } from 'react-native'
import Svg, { Rect, Circle } from 'react-native-svg'

export function IndiaFlagIcon() {
  return (
    <View
      style={{
        width: 20,
        height: 14,
        borderRadius: 2,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E2E8F0',
      }}
    >
      <Svg width={20} height={14} viewBox="0 0 20 14" fill="none">
        {/* Saffron band */}
        <Rect x="0" y="0" width="20" height="4.66" fill="#FF9933" />
        {/* White band */}
        <Rect x="0" y="4.66" width="20" height="4.66" fill="#FFFFFF" />
        {/* Green band */}
        <Rect x="0" y="9.33" width="20" height="4.67" fill="#128807" />
        {/* Ashoka Chakra */}
        <Circle cx="10" cy="7" r="1.6" stroke="#000080" strokeWidth="0.6" fill="none" />
      </Svg>
    </View>
  )
}

