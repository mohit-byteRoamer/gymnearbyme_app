import React, { createContext, useContext, useState, useEffect } from 'react'

const DevStateContext = createContext(null)

export function DevStateProvider({ children }) {
  const [isOfflineForced, setIsOfflineForced] = useState(false)
  const [isRealOffline, setIsRealOffline] = useState(!navigator.onLine)
  const [forceEmptyGyms, setForceEmptyGyms] = useState(false)
  const [forceLoading, setForceLoading] = useState(false)
  const [forceLoginError, setForceLoginError] = useState(false)
  const [forceGymNotJoining, setForceGymNotJoining] = useState(false)
  const [activePlanOverride, setActivePlanOverride] = useState(null)
  const [isDevSwitcherOpen, setIsDevSwitcherOpen] = useState(false)

  // Listen to real network status
  useEffect(() => {
    const handleOnline = () => setIsRealOffline(false)
    const handleOffline = () => setIsRealOffline(true)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Listen for ?state= query param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const stateParam = params.get('state')
    if (!stateParam) return

    switch (stateParam.toLowerCase()) {
      case 'offline':
        setIsOfflineForced(true)
        break
      case 'empty':
      case 'empty_gyms':
        setForceEmptyGyms(true)
        break
      case 'loading':
        setForceLoading(true)
        break
      case 'login_error':
        setForceLoginError(true)
        break
      case 'plan_active':
        setActivePlanOverride('ACTIVE')
        break
      case 'plan_expiring':
      case 'plan_expiring_5d':
        setActivePlanOverride('EXPIRING')
        break
      case 'plan_not_activated':
        setActivePlanOverride('PAID_NOT_ACTIVATED')
        break
      case 'plan_expired':
        setActivePlanOverride('EXPIRED')
        break
      case 'plan_empty':
        setActivePlanOverride('EMPTY')
        break
      case 'gym_not_joining':
        setForceGymNotJoining(true)
        break
      default:
        break
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

export function useDevState() {
  const context = useContext(DevStateContext)
  if (!context) throw new Error('useDevState must be used within DevStateProvider')
  return context
}

