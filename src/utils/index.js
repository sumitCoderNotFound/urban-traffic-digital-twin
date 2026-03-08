/**
 * Utility Functions
 */

// Classname merge utility (like clsx/cn)
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

// Format number with K/M suffix
export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// Format date/time
export function formatDateTime(date) {
  return new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Format time only
export function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Get traffic level based on counts
export function getTrafficLevel(vehicles, pedestrians) {
  if (vehicles > 40 || pedestrians > 150) return 'high'
  if (vehicles > 20 || pedestrians > 80) return 'medium'
  return 'low'
}

// Get color for traffic level
export function getTrafficColor(level) {
  const colors = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444',
    unknown: '#6b7280',
  }
  return colors[level] || colors.unknown
}
