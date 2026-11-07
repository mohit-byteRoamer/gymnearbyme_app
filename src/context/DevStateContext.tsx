import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Platform } from 'react-native'

interface DevStateContextType {
  isOffline: boolean
  isOfflineForced: boolean
  setIsOfflineForced: (v: boolean) => void
  forceEmptyGyms: boolean
  setForceEmptyGyms: (v: boolean) => void
  forceLoading: boolean
  setForceLoading: (v: boolean) => void
  forceLoginError: boolean
  setForceLoginError: (v: boolean) => void
  forceGymNotJoining: boolean
  setForceGymNotJoining: (v: boolean) => void
  activePlanOverride: string | null
  setActivePlanOverride: (v: string | null) => void
  isDevSwitcherOpen: boolean
  setIsDevSwitcherOpen: (v: boolean) => void
  resetAllOverrides: () => void
}

const DevStateContext = createContext<DevStateContextType | null>(null)

export function DevStateProvider({ children }: { children: ReactNode }) {
  const [isOfflineForced, setIsOfflineForced] = useState(false)
  const [isRealOffline, setIsRealOffline] = useState(false)
  const [forceEmptyGyms, setForceEmptyGyms] = useState(false)
  const [forceLoading, setForceLoading] = useState(false)
  const [forceLoginError, setForceLoginError] = useState(false)
  const [forceGymNotJoining, setForceGymNotJoining] = useState(false)
  const [activePlanOverride, setActivePlanOverride] = useState<string | null>(null)
  const [isDevSwitcherOpen, setIsDevSwitcherOpen] = useState(false)

  // Listen to network status on web
  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      setIsRealOffline(!navigator.onLine)
      const handleOnline = () => setIsRealOffline(false)
      const handleOffline = () => setIsRealOffline(true)
      window.addEventListener('online', handleOnline)
      window.addEventListener('offline', handleOffline)
      return () => {
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
      }
    }
  }, [])

  const isOffline = isOfflineForced || isRealOffline

  const resetAllOverrides = () => {
    setIsOfflineForced(false)
    setForceEmptyGyms(false)
    setForceLoading(false)
    setForceLoginError(false)
    setForceGymNotJoining(false)
    setActivePlanOverride(null)
  }

  return (
    <DevStateContext.Provider
      value={{
        isOffline,
        isOfflineForced,
        setIsOfflineForced,
        forceEmptyGyms,
        setForceEmptyGyms,
        forceLoading,
        setForceLoading,
        forceLoginError,
        setForceLoginError,
        forceGymNotJoining,
        setForceGymNotJoining,
        activePlanOverride,
        setActivePlanOverride,
        isDevSwitcherOpen,
        setIsDevSwitcherOpen,
        resetAllOverrides,
      }}
    >
      {children}
    </DevStateContext.Provider>
  )
}

export function useDevState(): DevStateContextType {
  const context = useContext(DevStateContext)
  if (!context) throw new Error('useDevState must be used within DevStateProvider')
  return context
}

