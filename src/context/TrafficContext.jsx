/**
 * Traffic Context - State Management
 * Connects to real Backend API
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import * as api from '../services/api'
import { REFRESH_INTERVAL } from '../utils/constants'

// Transform API camera response to frontend format
const transformCamera = (apiCamera) => ({
  id: apiCamera.id,
  name: apiCamera.name,
  location: apiCamera.location || { lat: apiCamera.latitude || 54.9783, lng: apiCamera.longitude || -1.6178 },
  status: apiCamera.status || 'unknown',
  trafficLevel: apiCamera.traffic_level || 'unknown',
  vehicles: apiCamera.vehicles || 0,
  pedestrians: apiCamera.pedestrians || 0,
  cyclists: apiCamera.cyclists || 0,
  lastUpdate: apiCamera.last_update || new Date().toISOString(),
  area: apiCamera.area || 'Newcastle',
})

// Calculate totals from cameras array
const calculateTotals = (cameras) => {
  return cameras.reduce(
    (acc, camera) => ({
      vehicles: acc.vehicles + (camera.vehicles || 0),
      pedestrians: acc.pedestrians + (camera.pedestrians || 0),
      cyclists: acc.cyclists + (camera.cyclists || 0),
      activeCameras: acc.activeCameras + (camera.status === 'online' ? 1 : 0),
    }),
    { vehicles: 0, pedestrians: 0, cyclists: 0, activeCameras: 0 }
  )
}

const TrafficContext = createContext(null)

export function TrafficProvider({ children }) {
  const [cameras, setCameras] = useState([])
  const [selectedCamera, setSelectedCamera] = useState(null)
  const [historicalData, setHistoricalData] = useState([])
  const [totals, setTotals] = useState({ vehicles: 0, pedestrians: 0, cyclists: 0, activeCameras: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [isRunningPipeline, setIsRunningPipeline] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [apiStatus, setApiStatus] = useState('checking')
  const [pipelineResult, setPipelineResult] = useState(null)

  // Fetch cameras and metrics from backend
  const fetchData = useCallback(async () => {
    try {
      await api.checkLiveness()
      setApiStatus('online')

      // Fetch cameras
      const camerasData = await api.getCameras()
      if (camerasData && camerasData.length > 0) {
        const transformed = camerasData.map(transformCamera)
        setCameras(transformed)
        setTotals(calculateTotals(transformed))
      }

      // Fetch hourly metrics
      try {
        const hourly = await api.getHourlyMetrics(24)
        if (hourly && hourly.length > 0) {
          setHistoricalData(hourly)
        }
      } catch {
        // keep existing
      }

    } catch (error) {
      console.warn('API unavailable:', error.message)
      setApiStatus('offline')
    }

    setLastRefresh(new Date())
    setIsLoading(false)
  }, [])

  // Run the full detection pipeline
  const runPipeline = useCallback(async (maxCameras = 10) => {
    setIsRunningPipeline(true)
    setPipelineResult(null)
    try {
      const result = await api.runDetectionPipeline(maxCameras)
      setPipelineResult(result)
      // Refresh data after pipeline completes
      await fetchData()
      return result
    } catch (error) {
      console.error('Pipeline error:', error)
      setPipelineResult({ status: 'error', message: error.message })
    } finally {
      setIsRunningPipeline(false)
    }
  }, [fetchData])

  // Initial load
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Auto refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchData, REFRESH_INTERVAL * 60)
    return () => clearInterval(interval)
  }, [fetchData])

  // Update totals when cameras change
  useEffect(() => {
    setTotals(calculateTotals(cameras))
  }, [cameras])

  const refreshData = useCallback(async () => {
    setIsLoading(true)
    await fetchData()
  }, [fetchData])

  const value = {
    cameras,
    selectedCamera,
    setSelectedCamera,
    historicalData,
    totals,
    isLoading,
    isRunningPipeline,
    lastRefresh,
    apiStatus,
    pipelineResult,
    refreshData,
    runPipeline,
  }

  return (
    <TrafficContext.Provider value={value}>
      {children}
    </TrafficContext.Provider>
  )
}

export function useTraffic() {
  const context = useContext(TrafficContext)
  if (!context) {
    throw new Error('useTraffic must be used within a TrafficProvider')
  }
  return context
}

export default TrafficContext
