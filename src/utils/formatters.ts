/**
 * Formats numeric price into standard Indian Rupee format, e.g. ₹1,000
 */
export function formatINR(amount?: number | null): string {
  if (amount === undefined || amount === null) return '₹0'
  try {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount).replace(/\s+/g, '')
  } catch {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`
  }
}

/**
 * Returns formatted date string like "7 Nov 2026"
 */
export function formatDate(dateInput?: string | Date | null): string {
  if (!dateInput) return ''
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date)
  } catch {
    return date.toDateString()
  }
}

/**
 * Returns formatted date & time like "1 Nov 2026, 6:30 PM"
 */
export function formatDateTime(dateInput?: string | Date | null): string {
  if (!dateInput) return ''
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date)
  } catch {
    return date.toLocaleString()
  }
}

