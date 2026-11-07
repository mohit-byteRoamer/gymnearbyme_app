import { useWindowDimensions } from 'react-native'

export type Breakpoint = 'phone' | 'tablet' | 'desktop'

export interface BreakpointInfo {
  width: number
  height: number
  breakpoint: Breakpoint
  isPhone: boolean
  isTablet: boolean
  isDesktop: boolean
  isTabletOrDesktop: boolean
  numColumns: number
}

/**
 * Custom hook to determine responsive breakpoint based on window width.
 * Breakpoints:
 * - Phone: < 768px (single column feed, bottom tabs, 44px+ touch targets)
 * - Tablet: 768px - 1199px (2-column gym grid)
 * - Desktop: >= 1200px (3-column gym grid, top navbar, max-w-container)
 */
export function useBreakpoint(): BreakpointInfo {
  const { width, height } = useWindowDimensions()

  const isPhone = width < 768
  const isTablet = width >= 768 && width < 1200
  const isDesktop = width >= 1200
  const isTabletOrDesktop = width >= 768

  let breakpoint: Breakpoint = 'phone'
  let numColumns = 1

  if (isDesktop) {
    breakpoint = 'desktop'
    numColumns = 3
  } else if (isTablet) {
    breakpoint = 'tablet'
    numColumns = 2
  } else {
    breakpoint = 'phone'
    numColumns = 1
  }

  return {
    width,
    height,
    breakpoint,
    isPhone,
    isTablet,
    isDesktop,
    isTabletOrDesktop,
    numColumns,
  }
}

