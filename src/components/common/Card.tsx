import React from 'react'
import { View, Pressable, ViewProps } from 'react-native'

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
  ...props
}: CardProps) {
  const handlePress = onPress || onClick
  const isClickable = typeof handlePress === 'function' || hoverable

  if (isClickable) {
    return (
      <Pressable
        onPress={handlePress}
        className={`
          bg-white rounded-2xl border border-slate-200/80 shadow-sm
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
      className={`
        bg-white rounded-2xl border border-slate-200/80 shadow-sm
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </View>
  )
}

