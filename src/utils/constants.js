// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
export const URBAN_OBSERVATORY_URL = 'https://api.newcastle.urbanobservatory.ac.uk'

// Map Configuration
export const NEWCASTLE_CENTER = {
  lat: 54.9733,
  lng: -1.6145,
}
export const DEFAULT_ZOOM = 14

// Refresh Intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  FAST: 1000,
  NORMAL: 5000,
  SLOW: 30000,
}

// Traffic Thresholds
export const TRAFFIC_THRESHOLDS = {
  VEHICLES: {
    LOW: 20,
    MEDIUM: 40,
  },
  PEDESTRIANS: {
    LOW: 80,
    MEDIUM: 150,
  },
}

// Traffic Level Colors
export const TRAFFIC_COLORS = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
  unknown: '#6b7280',
}

// Camera Status
export const CAMERA_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  MAINTENANCE: 'maintenance',
}

// Chart Colors
export const CHART_COLORS = {
  vehicles: '#33a5ff',
  pedestrians: '#22c55e',
  cyclists: '#f59e0b',
}

// Local Storage Keys
export const STORAGE_KEYS = {
  SETTINGS: 'urban-twin-settings',
  THEME: 'urban-twin-theme',
  SELECTED_CAMERAS: 'urban-twin-selected-cameras',
}
