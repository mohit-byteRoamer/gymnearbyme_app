import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar.jsx'
import { BottomTabs } from './BottomTabs.jsx'
import { LocationSheet } from './LocationSheet.jsx'
import { OfflineBanner } from '../common/OfflineBanner.jsx'
import { DevStateSwitcher } from '../common/DevStateSwitcher.jsx'

export function AppLayout() {
  const location = useLocation()

  // Tabs should ONLY be shown on these four screens
  const tabRoutes = ['/home', '/my-plan', '/transactions', '/profile']
  const showTabs = tabRoutes.includes(location.pathname)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Offline Warning Banner */}
      <OfflineBanner />

      {/* Top Navbar on Desktop for the 4 tab screens */}
      {showTabs && <Navbar />}

      {/* Main Content Area */}
      <main className={`flex-1 ${showTabs ? 'pb-20 lg:pb-12' : ''}`}>
        <Outlet />
      </main>

      {/* Fixed Bottom Tabs on Mobile & Tablet for the 4 tab screens */}
      {showTabs && <BottomTabs />}

      {/* Location Permission Sheet */}
      <LocationSheet />

      {/* Dev State Preview Switcher */}
      <DevStateSwitcher />
    </div>
  )
}

