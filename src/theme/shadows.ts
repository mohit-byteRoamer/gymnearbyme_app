import { Platform, ViewStyle } from 'react-native'

/**
 * Shared Soft Shadow Tokens
 * Two-layered shadows calibrated for an ultra-smooth, subtle, and elegant falloff
 * identical across Web, iOS, and Android (no dark, heavy, or smudged elevation blobs).
 *
 * Card Shadow (softShadow):
 * - Layer 1: offsetY 1, blur 2, color rgba(16, 24, 40, 0.02)
 * - Layer 2: offsetY 6, blur 20, color rgba(16, 24, 40, 0.04)
 * - Android: uses native Fabric boxShadow (elevation 0 to avoid harsh Material spot shadows)
 * - iOS opacity: 0.04
 */
export const softShadow: ViewStyle = {
  backgroundColor: '#FFFFFF',
  ...Platform.select({
    web: {
      boxShadow: '0 1px 2px rgba(16, 24, 40, 0.02), 0 6px 20px rgba(16, 24, 40, 0.04)',
    },
    ios: {
      shadowColor: '#101828',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.04,
      shadowRadius: 20,
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(16, 24, 40, 0.02)' },
        { offsetX: 0, offsetY: 6, blurRadius: 20, color: 'rgba(16, 24, 40, 0.04)' },
      ],
    },
    android: {
      elevation: 0,
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(16, 24, 40, 0.02)' },
        { offsetX: 0, offsetY: 6, blurRadius: 20, color: 'rgba(16, 24, 40, 0.04)' },
      ],
    },
    default: {
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(16, 24, 40, 0.02)' },
        { offsetX: 0, offsetY: 6, blurRadius: 20, color: 'rgba(16, 24, 40, 0.04)' },
      ],
    },
  }),
}

/**
 * Soft Small Shadow Token (for search bar, chips, small buttons, subtle cards)
 * - Layer 1: offsetY 1, blur 2, color rgba(16, 24, 40, 0.02)
 * - Layer 2: offsetY 2, blur 6, color rgba(16, 24, 40, 0.03)
 * - Android: uses native Fabric boxShadow (elevation 0)
 * - iOS opacity: 0.03
 */
export const softShadowSm: ViewStyle = {
  backgroundColor: '#FFFFFF',
  ...Platform.select({
    web: {
      boxShadow: '0 1px 2px rgba(16, 24, 40, 0.02), 0 2px 6px rgba(16, 24, 40, 0.03)',
    },
    ios: {
      shadowColor: '#101828',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.03,
      shadowRadius: 6,
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(16, 24, 40, 0.02)' },
        { offsetX: 0, offsetY: 2, blurRadius: 6, color: 'rgba(16, 24, 40, 0.03)' },
      ],
    },
    android: {
      elevation: 0,
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(16, 24, 40, 0.02)' },
        { offsetX: 0, offsetY: 2, blurRadius: 6, color: 'rgba(16, 24, 40, 0.03)' },
      ],
    },
    default: {
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(16, 24, 40, 0.02)' },
        { offsetX: 0, offsetY: 2, blurRadius: 6, color: 'rgba(16, 24, 40, 0.03)' },
      ],
    },
  }),
}

/**
 * Soft Brand Shadow Token (for primary blue call-to-action buttons)
 * - Subtle blue-tinted elevation without dark harshness
 * - Android elevation: 0 (uses pure soft blue boxShadow)
 * - iOS opacity: 0.12
 */
export const softShadowBrand: ViewStyle = {
  ...Platform.select({
    web: {
      boxShadow: '0 1px 2px rgba(37, 99, 235, 0.08), 0 4px 12px rgba(37, 99, 235, 0.12)',
    },
    ios: {
      shadowColor: '#2563EB',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(37, 99, 235, 0.08)' },
        { offsetX: 0, offsetY: 3, blurRadius: 8, color: 'rgba(37, 99, 235, 0.12)' },
      ],
    },
    android: {
      elevation: 0,
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(37, 99, 235, 0.08)' },
        { offsetX: 0, offsetY: 3, blurRadius: 8, color: 'rgba(37, 99, 235, 0.12)' },
      ],
    },
    default: {
      boxShadow: [
        { offsetX: 0, offsetY: 1, blurRadius: 2, color: 'rgba(37, 99, 235, 0.08)' },
        { offsetX: 0, offsetY: 3, blurRadius: 8, color: 'rgba(37, 99, 235, 0.12)' },
      ],
    },
  }),
}
