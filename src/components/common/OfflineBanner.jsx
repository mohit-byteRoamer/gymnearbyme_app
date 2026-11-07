import React from 'react'
import { WifiOff } from 'lucide-react'
import { useDevState } from '../../context/DevStateContext.jsx'

export function OfflineBanner() {
  const { isOffline } = useDevState()

  if (!isOffline) return null

  return (
    <div className="bg-slate-900 text-white text-xs font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2 sticky top-0 z-50 animate-fade-in">
      <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
      <span>You are offline. Showing cached gyms in Ludhiana.</span>
    </div>
  )
}

