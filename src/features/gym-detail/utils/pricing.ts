import { TimingSchedule } from '../types/index.ts'

/**
 * Format amounts into Indian Rupee format (₹1,000)
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0'
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Calculate per-day price
 */
export function calculatePerDay(price: number, durationDays: number): number {
  if (!durationDays || durationDays <= 0) return 0
  return Math.round(price / durationDays)
}

/**
 * Calculate effective monthly price
 */
export function calculatePerMonth(price: number, durationDays: number): number {
  if (!durationDays || durationDays <= 0) return price
  const months = durationDays / 30
  return Math.round(price / months)
}

/**
 * Calculate savings compared to repeating the monthly base price
 */
export function calculateSavings(
  price: number,
  durationDays: number,
  monthlyBasePrice: number
): { amount: number; percent: number } {
  if (durationDays <= 30 || !monthlyBasePrice || monthlyBasePrice <= 0) {
    return { amount: 0, percent: 0 }
  }
  const months = durationDays / 30
  const standardCost = monthlyBasePrice * months
  const amount = Math.max(0, Math.round(standardCost - price))
  const percent = Math.max(0, Math.round((amount / standardCost) * 100))
  return { amount, percent }
}

/**
 * Determine live open / closed status from schedule
 */
export function getLiveOpenStatus(schedule: TimingSchedule[]): {
  isOpen: boolean
  statusText: string
  statusColor: 'emerald' | 'amber' | 'rose'
} {
  if (!schedule || schedule.length === 0) {
    return {
      isOpen: true,
      statusText: 'Open until 10:00 PM',
      statusColor: 'emerald',
    }
  }

  const now = new Date()
  const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDayName = daysMap[now.getDay()]

  const todaySchedule = schedule.find(
    (s) => s.day.toLowerCase() === currentDayName.toLowerCase() || s.isToday
  ) || schedule[0]

  if (todaySchedule.isClosed) {
    return {
      isOpen: false,
      statusText: 'Closed today',
      statusColor: 'rose',
    }
  }

  // Parse hours (e.g. "5:00 AM", "10:00 PM")
  const parseTime = (timeStr: string) => {
    const [time, period] = timeStr.trim().split(' ')
    const [hours, minutes] = time.split(':').map(Number)
    let h = hours
    if (period === 'PM' && h !== 12) h += 12
    if (period === 'AM' && h === 12) h = 0
    return h * 60 + (minutes || 0)
  }

  try {
    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    const openMinutes = parseTime(todaySchedule.openTime)
    const closeMinutes = parseTime(todaySchedule.closeTime)

    if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
      const minutesLeft = closeMinutes - currentMinutes
      if (minutesLeft <= 60) {
        return {
          isOpen: true,
          statusText: `Closing soon · in ${minutesLeft}m`,
          statusColor: 'amber',
        }
      }
      return {
        isOpen: true,
        statusText: `Open now · closes at ${todaySchedule.closeTime}`,
        statusColor: 'emerald',
      }
    } else {
      return {
        isOpen: false,
        statusText: `Closed now · opens ${todaySchedule.openTime}`,
        statusColor: 'rose',
      }
    }
  } catch {
    return {
      isOpen: true,
      statusText: `Open until ${todaySchedule.closeTime || '10:00 PM'}`,
      statusColor: 'emerald',
    }
  }
}

/**
 * Relative time helper (e.g. "2 days ago")
 */
export function getRelativeTime(dateString: string): string {
  if (!dateString) return 'recently'
  return dateString
}

