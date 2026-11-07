import React from 'react'
import { View, Pressable, ViewProps, StyleSheet } from 'react-native'
import { softShadow } from '../../theme/shadows'

export interface CardProps extends ViewProps {
  children?: React.ReactNode
  className?: string
  onClick?: () => void
  onPress?: () => void
  hoverable?: boolean
  padding?: string
}

export function Card({
  children,
  className = '',
  onClick,
  onPress,
  hoverable = false,
  padding = 'p-4 sm:p-5',
  style,
  ...props
}: CardProps) {
  const handlePress = onPress || onClick
  const isClickable = typeof handlePress === 'function' || hoverable

  if (isClickable) {
    return (
      <Pressable
        onPress={handlePress}
        style={[softShadow, { borderRadius: 16 }, style as any]}
        className={`
          bg-white border border-black/[0.04]
          ${padding}
          active:scale-[0.99] active:opacity-95 transition-all
          ${className}
        `}
        {...props}
      >
        {children}
      </Pressable>
    )
  }

  return (
    <View
      style={[softShadow, { borderRadius: 16 }, style as any]}
      className={`
        bg-white border border-black/[0.04]
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </View>
  )
}
