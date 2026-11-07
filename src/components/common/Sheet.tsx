import React from 'react'
import {
  Modal,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native'
import { X } from 'lucide-react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useBreakpoint } from '../../hooks/useBreakpoint'

export interface SheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
  maxWidth?: string
}

export function Sheet({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  maxWidth = 'max-w-lg',
}: SheetProps) {
  const insets = useSafeAreaInsets()
  const { isPhone } = useBreakpoint()

  if (!isOpen) return null

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType={isPhone ? 'slide' : 'fade'}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-slate-900/50 justify-end sm:justify-center items-center p-0 sm:p-4">
          <TouchableWithoutFeedback>
            <View
              className={`
                w-full ${maxWidth} bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden
                max-h-[90%] flex-col
                ${className}
              `}
              style={{
                paddingBottom: isPhone ? Math.max(insets.bottom, 16) : 16,
              }}
            >
              {/* Drag Handle on phone */}
              {isPhone && (
                <View className="items-center pt-3 pb-1">
                  <View className="w-10 h-1.5 bg-slate-200 rounded-full" />
                </View>
              )}

              {/* Header */}
              {title && (
                <View className="flex-row items-center justify-between px-5 py-3.5 border-b border-slate-100">
                  <Text className="text-base sm:text-lg font-bold text-slate-900">
                    {title}
                  </Text>
                  <Pressable
                    onPress={onClose}
                    hitSlop={8}
                    className="p-1 rounded-full active:bg-slate-100"
                    accessibilityRole="button"
                    accessibilityLabel="Close"
                  >
                    <X size={20} color="#64748B" />
                  </Pressable>
                </View>
              )}

              {/* Scrollable content */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20 }}
              >
                {children}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
