export interface Transaction {
  id: string
  gymId: string
  gymName: string
  locality: string
  planName: string
  planDuration: string
  amount: number
  status: 'PAID' | 'REFUNDED' | 'FAILED' | 'PENDING'
  date: string
  displayDate: string
  monthGroup: string
  paymentMethod: string
  paymentId: string
  orderId: string
  voucherCode: string
  voucherValidUntil: string
  canRefund: boolean
}

export interface ActivePlan {
  id: string
  gymId: string
  gymName: string
  locality: string
  planName: string
  durationDays: number
  amountPaid: number
  status: 'ACTIVE' | 'EXPIRING' | 'PAID_NOT_ACTIVATED' | 'EXPIRED' | 'EMPTY'
  startedAt: string | null
  expiresAt: string | null
  daysLeft: number
  progressPct: number
  voucherCode: string
  validUntil: string
  validUntilFull?: string
  lat: number
  lng: number
}

export interface PastPlan {
  id: string
  gymName: string
  locality: string
  planName: string
  dates: string
  status: string
}

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-109281',
    gymId: 'iron-forge-fitness',
    gymName: 'Iron Forge Fitness & CrossFit',
    locality: 'Model Town',
    planName: 'Monthly',
    planDuration: '30 days',
    amount: 1000,
    status: 'PAID',
    date: '2026-11-01T18:30:00.000Z',
    displayDate: '1 Nov 2026, 6:30 PM',
    monthGroup: 'November 2026',
    paymentMethod: 'UPI (Google Pay)',
    paymentId: 'pay_UPI_9821389421',
    orderId: 'ord_LDH_981120',
    voucherCode: 'GYM-LDH-8921',
    voucherValidUntil: '2026-11-08T18:30:00.000Z',
    canRefund: false,
  },
  {
    id: 'tx-104921',
    gymId: 'cult-fit-sarabha',
    gymName: 'Cult.Fit Sarabha Nagar',
    locality: 'Sarabha Nagar',
    planName: 'Monthly',
    planDuration: '30 days',
    amount: 1200,
    status: 'PAID',
    date: '2026-10-01T11:15:00.000Z',
    displayDate: '1 Oct 2026, 11:15 AM',
    monthGroup: 'October 2026',
    paymentMethod: 'UPI (PhonePe)',
    paymentId: 'pay_UPI_7719238410',
    orderId: 'ord_LDH_771290',
    voucherCode: 'GYM-LDH-7712',
    voucherValidUntil: '2026-10-08T11:15:00.000Z',
    canRefund: false,
  },
  {
    id: 'tx-098211',
    gymId: 'titan-strength-pakhowal',
    gymName: 'Titan Strength Club',
    locality: 'Pakhowal Road',
    planName: 'Day Pass',
    planDuration: '1 day',
    amount: 250,
    status: 'REFUNDED',
    date: '2026-09-15T09:45:00.000Z',
    displayDate: '15 Sep 2026, 9:45 AM',
    monthGroup: 'September 2026',
    paymentMethod: 'UPI (Paytm)',
    paymentId: 'pay_UPI_6619284102',
    orderId: 'ord_LDH_661204',
    voucherCode: 'GYM-LDH-6612',
    voucherValidUntil: '2026-09-22T09:45:00.000Z',
    canRefund: false,
  },
]

export const INITIAL_ACTIVE_PLAN: ActivePlan = {
  id: 'plan-active-1',
  gymId: 'iron-forge-fitness',
  gymName: 'Iron Forge Fitness & CrossFit',
  locality: 'Model Town',
  planName: 'Monthly',
  durationDays: 30,
  amountPaid: 1000,
  status: 'ACTIVE',
  startedAt: '1 Nov 2026',
  expiresAt: '30 Nov 2026',
  daysLeft: 12,
  progressPct: 60,
  voucherCode: 'GYM-LDH-8921',
  validUntil: '7 Nov 2026',
  lat: 30.8936,
  lng: 75.8344,
}

export const PAST_PLANS: PastPlan[] = [
  {
    id: 'past-1',
    gymName: 'Cult.Fit Sarabha Nagar',
    locality: 'Sarabha Nagar',
    planName: 'Monthly',
    dates: '1 Oct 2026 - 31 Oct 2026',
    status: 'Expired',
  },
  {
    id: 'past-2',
    gymName: 'Gold Standard Gym & Spa',
    locality: 'BRS Nagar',
    planName: 'Monthly',
    dates: '1 Aug 2026 - 31 Aug 2026',
    status: 'Expired',
  },
]

