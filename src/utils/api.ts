import { GYMS, GymItem, GymPlan } from '../data/gyms'
import { LOCALITIES, Locality } from '../data/localities'

const FAKE_DELAY_MS = 600

export function delay(ms: number = FAKE_DELAY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export interface UserProfile {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  joinedDate: string
}

export interface PaymentSimulationResult {
  status: 'SUCCESS' | 'FAILED' | 'CANCELLED'
  voucherCode?: string
  paymentId?: string
  orderId?: string
  amount?: number
  gymName?: string
  locality?: string
  planName?: string
  durationDays?: number
  validUntil?: string
  message?: string
}

/**
 * Fetch gyms with optional locality and search filter
 */
export async function getGyms({ locality = 'all', search = '' }: { locality?: string; search?: string } = {}): Promise<GymItem[]> {
  await delay(FAKE_DELAY_MS)
  let results = [...GYMS]

  if (locality && locality !== 'all') {
    results = results.filter((g) => g.localityId === locality || g.locality.toLowerCase() === locality.toLowerCase())
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase()
    results = results.filter(
      (g) => g.name.toLowerCase().includes(q) || g.locality.toLowerCase().includes(q) || g.address.toLowerCase().includes(q)
    )
  }

  // Ensure featured gyms come first
  results.sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1
    if (!a.isFeatured && b.isFeatured) return 1
    return a.distanceNum - b.distanceNum
  })

  return results
}

/**
 * Fetch single gym by ID
 */
export async function getGymById(id: string): Promise<GymItem> {
  await delay(FAKE_DELAY_MS)
  const gym = GYMS.find((g) => g.id === id)
  if (!gym) throw new Error('Gym not found')
  return gym
}

/**
 * Fetch all localities
 */
export async function getLocalities(): Promise<Locality[]> {
  await delay(200)
  return LOCALITIES
}

/**
 * Simulate Google OAuth sign-in with 600ms delay
 */
export async function simulateGoogleSignIn(shouldFail: boolean = false): Promise<UserProfile> {
  await delay(800)
  if (shouldFail) {
    throw new Error('Sign in did not work. Please try again.')
  }
  return {
    id: 'user-amrit-singh',
    name: 'Amritpal Singh',
    email: 'amrit.singh@gmail.com',
    phone: '+919876543210',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    joinedDate: 'November 2026',
  }
}

/**
 * Simulate payment processing
 */
export async function simulatePayment(
  plan: GymPlan,
  gym: { name: string; locality: string },
  { fail = false, cancel = false }: { fail?: boolean; cancel?: boolean } = {}
): Promise<PaymentSimulationResult> {
  await delay(1200)
  if (cancel) {
    return { status: 'CANCELLED', message: 'Payment cancelled. You were not charged.' }
  }
  if (fail) {
    return { status: 'FAILED', message: 'Bank server timeout. Please try again.' }
  }

  const voucherCode = `GYM-LDH-${Math.floor(1000 + Math.random() * 9000)}`
  const paymentId = `pay_UPI_${Math.floor(1000000000 + Math.random() * 9000000000)}`
  const orderId = `ord_LDH_${Math.floor(100000 + Math.random() * 900000)}`

  return {
    status: 'SUCCESS',
    voucherCode,
    paymentId,
    orderId,
    amount: plan.price,
    gymName: gym.name,
    locality: gym.locality,
    planName: plan.name,
    durationDays: plan.durationDays,
    validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  }
}
