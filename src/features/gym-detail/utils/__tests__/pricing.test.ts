import { describe, it, expect } from 'vitest'
import {
  formatINR,
  calculatePerDay,
  calculatePerMonth,
  calculateSavings,
  getLiveOpenStatus,
} from '../pricing.ts'

describe('Gym Pricing Utilities', () => {
  it('formats INR correctly', () => {
    expect(formatINR(1200)).toContain('1,200')
    expect(formatINR(9900)).toContain('9,900')
    expect(formatINR(0)).toContain('0')
  })

  it('calculates per day price accurately', () => {
    // 30 days for 1200 -> 40/day
    expect(calculatePerDay(1200, 30)).toBe(40)
    // 365 days for 9900 -> ~27/day
    expect(calculatePerDay(9900, 365)).toBe(27)
    // 90 days for 3200 -> ~36/day
    expect(calculatePerDay(3200, 90)).toBe(36)
  })

  it('calculates effective per month price', () => {
    expect(calculatePerMonth(1200, 30)).toBe(1200)
    // 9900 for 365 days (~12.16 months) -> ~814 or 825
    const monthlyFromYearly = calculatePerMonth(9900, 360)
    expect(monthlyFromYearly).toBe(825)
  })

  it('calculates savings compared to monthly base price', () => {
    // Monthly 1200. Quarterly 3200 (3 months * 1200 = 3600). Savings = 400
    const savings = calculateSavings(3200, 90, 1200)
    expect(savings.amount).toBe(400)
    expect(savings.percent).toBe(11)

    // Yearly 9900 vs 12 * 1200 (14400) = 4500
    const yearlySavings = calculateSavings(9900, 360, 1200)
    expect(yearlySavings.amount).toBe(4500)
    expect(yearlySavings.percent).toBe(31)
  })

  it('determines live open status gracefully', () => {
    const schedule = [
      { day: 'Monday', openTime: '5:00 AM', closeTime: '10:00 PM', isToday: true },
    ]
    const status = getLiveOpenStatus(schedule)
    expect(status).toHaveProperty('isOpen')
    expect(status).toHaveProperty('statusText')
    expect(status).toHaveProperty('statusColor')
  })
})

