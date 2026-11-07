export interface Plan {
  id: string
  name: string
  durationDays: number
  price: number
  isRecommended?: boolean
  badge?: {
    text: string
    color: 'emerald' | 'amber' | 'blue'
  }
  features: string[]
  perDayPrice?: number
  perMonthPrice?: number
  savingsAmount?: number
  savingsPercent?: number
}

export interface Trainer {
  id: string
  name: string
  role: string
  speciality: string
  experienceYears: number
  certifications: string[]
  rating: number
  reviewCount: number
  clientsTrained: number
  photo: string
  bio: string
}

export interface FacilityItem {
  id: string
  name: string
  icon: string
  available: boolean
  description?: string
}

export interface FacilityCategory {
  category: string
  items: FacilityItem[]
}

export interface TimingSchedule {
  day: string
  openTime: string
  closeTime: string
  isToday?: boolean
  isClosed?: boolean
}

export interface Review {
  id: string
  author: string
  avatar?: string
  rating: number
  date: string
  text: string
  isVerifiedMember: boolean
  planType?: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface SimilarGym {
  id: string
  name: string
  locality: string
  distance: string
  rating: number
  reviewsCount: number
  minPrice: number
  coverPhoto: string
  isFeatured?: boolean
}

export interface VideoThumbnail {
  id: string
  title: string
  duration: string
  thumbnail: string
  videoUrl: string
}

export interface Gym {
  id: string
  name: string
  tagline: string
  locality: string
  localityId: string
  address: string
  landmarks: string
  parkingInfo: string
  phone: string
  whatsapp: string
  distance: string
  distanceNum: number
  lat: number
  lng: number
  rating: number
  reviewsCount: number
  ratingBreakdown: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
  categories: string[]
  openUntil: string
  minPrice: number
  isFeatured: boolean
  acceptsOnlineJoining: boolean
  verified: boolean
  coverPhoto: string
  galleryPhotos: string[]
  videoThumbnails: VideoThumbnail[]
  about: string
  usps: string[]
  facilitiesCategorized: FacilityCategory[]
  timingsSchedule: TimingSchedule[]
  trainers: Trainer[]
  plans: Plan[]
  reviews: Review[]
  faqs: FaqItem[]
}

