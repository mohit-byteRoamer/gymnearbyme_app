import React from 'react'
import { Pressable, Text, View, ActivityIndicator } from 'react-native'
import { LucideIcon } from 'lucide-react-native'

export interface ButtonProps {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  isLoading?: boolean
  disabled?: boolean
  onPress?: () => void
  onClick?: () => void
  className?: string
  icon?: LucideIcon
  accessibilityLabel?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  onPress,
  onClick,
  className = '',
  icon: Icon,
  accessibilityLabel,
}: ButtonProps) {
  const handlePress = onPress || onClick

  const baseStyles =
    'relative flex-row items-center justify-center rounded-xl transition-all duration-150 select-none'

  const variants = {
    primary: 'bg-brand active:bg-blue-700 shadow-sm border border-transparent',
    secondary: 'bg-white active:bg-slate-100 border border-slate-200/90 shadow-sm',
    outline: 'bg-transparent active:bg-blue-50/50 border border-brand/40',
    danger: 'bg-rose-600 active:bg-rose-700 shadow-sm border border-transparent',
    ghost: 'bg-transparent active:bg-slate-100/70 border border-transparent',
  }

  const textVariants = {
    primary: 'text-white font-semibold',
    secondary: 'text-slate-900 font-semibold',
    outline: 'text-brand font-semibold',
    danger: 'text-white font-semibold',
    ghost: 'text-slate-700 font-medium',
  }

  const sizes = {
    sm: 'h-9 px-3 gap-1.5',
    md: 'h-11 px-4 gap-2 min-h-[44px]',
    lg: 'h-13 px-6 gap-2.5 min-h-[48px]',
  }

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 20,
  }

  const iconColors = {
    primary: '#FFFFFF',
    secondary: '#0F172A',
    outline: '#2563EB',
    danger: '#FFFFFF',
    ghost: '#334155',
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || isLoading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || (typeof children === 'string' ? children : undefined)}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || isLoading ? 'opacity-50' : 'active:scale-[0.98]'}
        ${className}
      `}
    >
      {isLoading ? (
        <View className="flex-row items-center gap-2">
          <ActivityIndicator
            size="small"
            color={variant === 'primary' || variant === 'danger' ? '#FFFFFF' : '#2563EB'}
          />
          {typeof children === 'string' && (
            <Text className={`${textSizes[size] || textSizes.md} ${textVariants[variant] || textVariants.primary}`}>
              {children}
            </Text>
          )}
        </View>
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          {Icon && (
            <Icon
              size={iconSizes[size] || iconSizes.md}
              color={iconColors[variant] || iconColors.primary}
            />
          )}
          {typeof children === 'string' ? (
            <Text className={`${textSizes[size] || textSizes.md} ${textVariants[variant] || textVariants.primary}`}>
              {children}
            </Text>
          ) : (
            children
          )}
        </View>
      )}
    </Pressable>
  )
}

