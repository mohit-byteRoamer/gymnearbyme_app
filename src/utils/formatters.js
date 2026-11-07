/**
 * Formats numeric price into standard Indian Rupee format, e.g. ₹1,000
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null) return '₹0'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount).replace(/\s+/g, '')
}

/**
 * Returns formatted date string like "7 Nov 2026"
 */
export function formatDate(dateInput) {
  if (!dateInput) return ''
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

/**
 * Returns formatted date & time like "1 Nov 2026, 6:30 PM"
 */
export function formatDateTime(dateInput) {
  if (!dateInput) return ''
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date)
}

