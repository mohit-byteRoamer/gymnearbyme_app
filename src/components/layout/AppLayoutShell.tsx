import React from 'react'
import { View } from 'react-native'
import { useBreakpoint } from '../../hooks/useBreakpoint'
import { DesktopNavbar } from './DesktopNavbar'
import { BottomTabs } from './BottomTabs'
import { LocationSheet } from './LocationSheet'
import { OfflineBanner } from '../common/OfflineBanner'
import { DevStateSwitcher } from '../common/DevStateSwitcher'

export interface AppLayoutShellProps {
  children: React.ReactNode
}

export function AppLayoutShell({ children }: AppLayoutShellProps) {
  const { isPhone, isTabletOrDesktop } = useBreakpoint()

  return (
    <View className="flex-1 bg-slate-50 min-h-screen">
      {/* Offline Status Warning */}
      <OfflineBanner />

      {/* Top Navbar on Tablet & Desktop */}
      {isTabletOrDesktop && <DesktopNavbar />}

      {/* Main Content Area */}
      <View className="flex-1">
        {children}
      </View>

      {/* Bottom Tabs on Mobile Phone */}
      {isPhone && <BottomTabs />}

      {/* Global Location Prompt Sheet */}
      <LocationSheet />

      {/* Dev State Preview Switcher */}
      <DevStateSwitcher />
    </View>
  )
}
