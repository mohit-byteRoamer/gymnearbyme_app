import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { LucideIcon } from 'lucide-react-native'

export interface ChipProps {
  children: React.ReactNode
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'slate'
  size?: 'xs' | 'sm' | 'md'
  icon?: LucideIcon
  className?: string
  onClick?: () => void
  onPress?: () => void
}

export function Chip({
  children,
  color = 'slate',
  size = 'sm',
  icon: Icon,
  className = '',
  onClick,
  onPress,
}: ChipProps) {
  const handlePress = onPress || onClick

  const colorStyles = {
    green: 'bg-emerald-50 border-emerald-200/80',
    blue: 'bg-blue-50 border-blue-200/80',
    yellow: 'bg-amber-50 border-amber-200/80',
    red: 'bg-rose-50 border-rose-200/80',
    slate: 'bg-slate-100 border-slate-200/80',
  }

  const textColors = {
    green: 'text-emerald-700',
    blue: 'text-brand-700',
    yellow: 'text-amber-800',
    red: 'text-rose-700',
    slate: 'text-slate-700',
  }

  const iconColors = {
    green: '#047857',
    blue: '#1D4ED8',
    yellow: '#92400E',
    red: '#B91C1C',
    slate: '#334155',
  }

  const sizes = {
    xs: 'px-2 py-0.5 gap-1',
    sm: 'px-2.5 py-1 gap-1.5',
    md: 'px-3 py-1.5 gap-2',
  }

  const textSizes = {
    xs: 'text-[11px] font-semibold',
    sm: 'text-xs font-semibold',
    md: 'text-sm font-semibold',
  }

  const iconSizes = {
    xs: 11,
    sm: 13,
    md: 15,
  }

  const content = (
    <View
      className={`
        flex-row items-center rounded-full border
        ${colorStyles[color] || colorStyles.slate}
        ${sizes[size] || sizes.sm}
        ${className}
      `}
    >
      {Icon && (
        <Icon
          size={iconSizes[size] || iconSizes.sm}
          color={iconColors[color] || iconColors.slate}
        />
      )}
      <Text className={`${textSizes[size] || textSizes.sm} ${textColors[color] || textColors.slate}`}>
        {children}
      </Text>
    </View>
  )

  if (handlePress) {
    return (
      <Pressable onPress={handlePress} className="active:opacity-80 active:scale-95">
        {content}
      </Pressable>
    )
  }

  return content
}

