/**
 * API Service - Backend Communication
 */

import { API_BASE_URL } from '../utils/constants'

// Generic fetch wrapper
async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  try {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error.message)
    throw error
  }
}

// Camera Endpoints
export const getCameras = () => fetchAPI('/cameras')
export const getCamera = (id) => fetchAPI(`/cameras/${id}`)
export const getCameraDetections = (id, hours = 24) =>
  fetchAPI(`/cameras/${id}/detections?hours=${hours}`)

// Detection Endpoints
export const getLatestDetections = () => fetchAPI('/detections/latest')
export const getDetections = (hours = 24) => fetchAPI(`/detections?hours=${hours}`)

// Run the full detection pipeline against live Urban Observatory cameras
export const runDetectionPipeline = (maxCameras = 10) =>
  fetchAPI(`/detections/run?max_cameras=${maxCameras}`, { method: 'POST' })

// Metrics Endpoints
export const getTotalMetrics = () => fetchAPI('/metrics/totals')
export const getHourlyMetrics = (hours = 24) => fetchAPI(`/metrics/hourly?hours=${hours}`)
export const getTrafficMetrics = () => fetchAPI('/metrics/traffic')

// Health Endpoints
export const getHealthStatus = () => fetchAPI('/health')
export const checkLiveness = () => fetchAPI('/health/live')

export default {
  getCameras,
  getCamera,
  getCameraDetections,
  getLatestDetections,
  getDetections,
  runDetectionPipeline,
  getTotalMetrics,
  getHourlyMetrics,
  getTrafficMetrics,
  getHealthStatus,
  checkLiveness,
}