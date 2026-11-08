export type FirstRunScreenId =
  | 'splash'
  | 'walkthrough-1'
  | 'walkthrough-2'
  | 'walkthrough-3'
  | 'login'
  | 'complete-profile'
  | 'phone-entry'
  | 'otp-verification'

export type GoogleButtonState = 'default' | 'pressed' | 'loading' | 'error' | 'offline'

export type ViewportMode = '390x844' | '360x640' | 'side-by-side'

export interface WalkthroughSlideData {
  id: number
  headline: string
  subtext: string
  photoUrl: string
  photoAlt: string
  cardType: 'gym' | 'plan' | 'qr'
  cardData: {
    title: string
    subtitle?: string
    badgeText?: string
  }
}
