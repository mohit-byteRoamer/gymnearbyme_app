import React from 'react'
import { View, TextInput, Pressable, TextInputProps } from 'react-native'
import { LucideIcon, X } from 'lucide-react-native'
import { softShadowSm } from '../../theme/shadows'

export interface InputProps extends TextInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  leftIcon?: LucideIcon
  rightIcon?: LucideIcon
  onRightIconPress?: () => void
  onClear?: () => void
  className?: string
  containerClassName?: string
}

export function Input({
  value,
  onChangeText,
  placeholder,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  onRightIconPress,
  onClear,
  className = '',
  containerClassName = '',
  ...props
}: InputProps) {
  return (
    <View
      style={[softShadowSm, { borderRadius: 12 }]}
      className={`relative flex-row items-center w-full bg-white border border-slate-200/80 ${containerClassName}`}
    >
      {LeftIcon && (
        <View className="pl-3.5 pr-2 justify-center items-center">
          <LeftIcon size={18} color="#94A3B8" />
        </View>
      )}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        className={`flex-1 h-12 text-sm text-slate-900 font-medium ${LeftIcon ? 'pl-0' : 'pl-3.5'} pr-10 ${className}`}
        style={{ outlineStyle: 'none' } as any}
        {...props}
      />

      {value && onClear ? (
        <Pressable
          onPress={onClear}
          hitSlop={8}
          className="pr-3.5 pl-2 justify-center items-center active:opacity-70"
          accessibilityRole="button"
          accessibilityLabel="Clear input"
        >
          <X size={16} color="#94A3B8" />
        </Pressable>
      ) : RightIcon ? (
        <Pressable
          onPress={onRightIconPress}
          hitSlop={8}
          className="pr-3.5 pl-2 justify-center items-center active:opacity-70"
        >
          <RightIcon size={18} color="#94A3B8" />
        </Pressable>
      ) : null}
    </View>
  )
}
