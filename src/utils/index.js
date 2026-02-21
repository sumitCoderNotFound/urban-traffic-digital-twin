import { clsx } from 'clsx'

/**
 * Merge class names with clsx
 */
export function cn(...inputs) {
  return clsx(inputs)
}

/**
 * Format large numbers with K/M suffix
 */
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * Get traffic level color
 */
export function getTrafficColor(level) {
  const colors = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444',
    unknown: '#6b7280',
  }
  return colors[level] || colors.unknown
}

/**
 * Get traffic level badge variant
 */
export function getTrafficBadgeVariant(level) {
  const variants = {
    low: 'green',
    medium: 'amber',
    high: 'red',
    unknown: 'gray',
  }
  return variants[level] || variants.unknown
}

/**
 * Calculate congestion level based on counts
 */
export function calculateCongestionLevel(vehicles, pedestrians) {
  if (vehicles > 40 || pedestrians > 150) return 'high'
  if (vehicles > 20 || pedestrians > 80) return 'medium'
  return 'low'
}

/**
 * Generate random ID
 */
export function generateId() {
  return Math.random().toString(36).substring(2, 9)
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * Format date for display
 */
export function formatDate(date, format = 'short') {
  const d = new Date(date)
  if (format === 'short') {
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }
  if (format === 'time') {
    return d.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }
  return d.toISOString()
}
