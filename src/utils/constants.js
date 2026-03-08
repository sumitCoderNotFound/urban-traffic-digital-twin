/**
 * Application Constants
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

// Map Configuration
export const NEWCASTLE_CENTER = {
  lat: 54.9783,
  lng: -1.6178,
}

export const DEFAULT_ZOOM = 13

// Refresh Intervals (milliseconds)
export const REFRESH_INTERVAL = 5000

// Traffic Level Colors
export const TRAFFIC_COLORS = {
  low: { primary: '#22c55e', bg: 'rgba(34, 197, 94, 0.2)' },
  medium: { primary: '#f59e0b', bg: 'rgba(245, 158, 11, 0.2)' },
  high: { primary: '#ef4444', bg: 'rgba(239, 68, 68, 0.2)' },
  unknown: { primary: '#6b7280', bg: 'rgba(107, 114, 128, 0.2)' },
}

// Chart Colors
export const CHART_COLORS = {
  vehicles: '#3b82f6',
  pedestrians: '#22c55e',
  cyclists: '#f59e0b',
}

// Project Information
export const PROJECT_INFO = {
  name: 'Urban Digital Twin',
  description: 'Real-Time Traffic State Estimation for Newcastle',
  version: '1.0.0',
  author: 'Sumit Malviya',
  supervisor: 'Dr. Jason Moore',
  university: 'Northumbria University',
  module: 'KF7029 MSc Computer Science Project',
}
