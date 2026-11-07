import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { View, Text } from 'react-native'

export type ToastType = 'info' | 'success' | 'warning' | 'error'

interface ToastState {
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null)

  const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 2500) => {
    setToast({ message, type })
    setTimeout(() => {
      setToast(null)
    }, duration)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <View
          pointerEvents="none"
          className="absolute bottom-20 md:bottom-8 left-0 right-0 items-center justify-center z-50 px-4"
        >
          <View className="bg-slate-900/95 px-4 py-2.5 rounded-full shadow-lg border border-slate-700/50 max-w-sm">
            <Text className="text-white text-xs sm:text-sm font-medium text-center">
              {toast.message}
            </Text>
          </View>
        </View>
      )}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

