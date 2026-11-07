import { GYMS } from '../data/gyms.js'
import { LOCALITIES } from '../data/localities.js'

const FAKE_DELAY_MS = 600

export function delay(ms = FAKE_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Fetch gyms with optional locality and search filter
 */
export async function getGyms({ locality = 'all', search = '' } = {}) {
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
export async function getGymById(id) {
  await delay(FAKE_DELAY_MS)
  const gym = GYMS.find((g) => g.id === id)
  if (!gym) throw new Error('Gym not found')
  return gym
}

/**
 * Fetch all localities
 */
export async function getLocalities() {
  await delay(200)
  return LOCALITIES
}

/**
 * Simulate Google OAuth sign-in with 600ms delay
 */
export async function simulateGoogleSignIn(shouldFail = false) {
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
export async function simulatePayment(plan, gym, { fail = false, cancel = false } = {}) {
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
    displayDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
  }
}

