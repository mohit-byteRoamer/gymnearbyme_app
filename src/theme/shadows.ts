import { Platform, ViewStyle } from 'react-native'

/**
 * Shared Soft Shadow Tokens
 * Two-layered shadows for a smooth falloff matching modern design guidelines.
 *
 * Layer 1: offsetY 1, blur 2, color rgba(16, 24, 40, 0.04)
 * Layer 2: offsetY 8, blur 24, color rgba(16, 24, 40, 0.08)
 */

export const softShadow: ViewStyle = {
  backgroundColor: '#FFFFFF',
  ...Platform.select({
    web: {
      boxShadow: '0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px rgba(16, 24, 40, 0.08)',
    },
    ios: {
      shadowColor: '#101828',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 24,
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(16, 24, 40, 0.04)' },
        { offsetX: 0, offsetY: 8, blurRadius: 24, color: 'rgba(16, 24, 40, 0.08)' },
      ],
    },
    android: {
      elevation: 6,
      shadowColor: '#101828',
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(16, 24, 40, 0.04)' },
        { offsetX: 0, offsetY: 8, blurRadius: 24, color: 'rgba(16, 24, 40, 0.08)' },
      ],
    },
    default: {
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(16, 24, 40, 0.04)' },
        { offsetX: 0, offsetY: 8, blurRadius: 24, color: 'rgba(16, 24, 40, 0.08)' },
      ],
    },
  }),
}

/**
 * Soft Small Shadow Token (for chips, small buttons, subtle popups)
 */
export const softShadowSm: ViewStyle = {
  backgroundColor: '#FFFFFF',
  ...Platform.select({
    web: {
      boxShadow: '0 1px 2px rgba(16, 24, 40, 0.04), 0 2px 6px rgba(16, 24, 40, 0.06)',
    },
    ios: {
      shadowColor: '#101828',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.06,
      shadowRadius: 6,
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(16, 24, 40, 0.04)' },
        { offsetX: 0, offsetY: 2, blurRadius: 6, color: 'rgba(16, 24, 40, 0.06)' },
      ],
    },
    android: {
      elevation: 2,
      shadowColor: '#101828',
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(16, 24, 40, 0.04)' },
        { offsetX: 0, offsetY: 2, blurRadius: 6, color: 'rgba(16, 24, 40, 0.06)' },
      ],
    },
    default: {
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(16, 24, 40, 0.04)' },
        { offsetX: 0, offsetY: 2, blurRadius: 6, color: 'rgba(16, 24, 40, 0.06)' },
      ],
    },
  }),
}

