import { createContext, useContext, useState, useEffect } from 'react'

// Mock data for cameras
const MOCK_CAMERAS = [
  {
    id: 'cam-001',
    name: 'Grey Street',
    location: { lat: 54.9714, lng: -1.6120 },
    status: 'online',
    trafficLevel: 'high',
    vehicles: 47,
    pedestrians: 123,
    cyclists: 8,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: 'cam-002',
    name: 'Quayside',
    location: { lat: 54.9695, lng: -1.6037 },
    status: 'online',
    trafficLevel: 'medium',
    vehicles: 28,
    pedestrians: 89,
    cyclists: 15,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: 'cam-003',
    name: 'Central Station',
    location: { lat: 54.9686, lng: -1.6174 },
    status: 'online',
    trafficLevel: 'high',
    vehicles: 62,
    pedestrians: 234,
    cyclists: 5,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: 'cam-004',
    name: 'Jesmond Road',
    location: { lat: 54.9812, lng: -1.5987 },
    status: 'online',
    trafficLevel: 'low',
    vehicles: 12,
    pedestrians: 34,
    cyclists: 22,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: 'cam-005',
    name: 'Gateshead Millennium Bridge',
    location: { lat: 54.9697, lng: -1.5993 },
    status: 'online',
    trafficLevel: 'medium',
    vehicles: 8,
    pedestrians: 156,
    cyclists: 31,
    lastUpdate: new Date().toISOString(),
  },
  {
    id: 'cam-006',
    name: 'Haymarket',
    location: { lat: 54.9784, lng: -1.6148 },
    status: 'offline',
    trafficLevel: 'unknown',
    vehicles: 0,
    pedestrians: 0,
    cyclists: 0,
    lastUpdate: new Date().toISOString(),
  },
]

// Mock historical data
const generateHistoricalData = () => {
  const data = []
  const now = new Date()
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      time: hour.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      vehicles: Math.floor(Math.random() * 60) + 10,
      pedestrians: Math.floor(Math.random() * 150) + 20,
      cyclists: Math.floor(Math.random() * 30) + 5,
    })
  }
  return data
}

const TrafficContext = createContext(null)

export function TrafficProvider({ children }) {
  const [cameras, setCameras] = useState(MOCK_CAMERAS)
  const [selectedCamera, setSelectedCamera] = useState(null)
  const [historicalData, setHistoricalData] = useState(generateHistoricalData())
  const [isLoading, setIsLoading] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCameras(prevCameras => 
        prevCameras.map(camera => {
          if (camera.status === 'offline') return camera
          
          const vehicleChange = Math.floor(Math.random() * 7) - 3
          const pedestrianChange = Math.floor(Math.random() * 11) - 5
          const cyclistChange = Math.floor(Math.random() * 5) - 2
          
          const newVehicles = Math.max(0, camera.vehicles + vehicleChange)
          const newPedestrians = Math.max(0, camera.pedestrians + pedestrianChange)
          const newCyclists = Math.max(0, camera.cyclists + cyclistChange)
          
          // Determine traffic level
          let trafficLevel = 'low'
          if (newVehicles > 40 || newPedestrians > 150) {
            trafficLevel = 'high'
          } else if (newVehicles > 20 || newPedestrians > 80) {
            trafficLevel = 'medium'
          }
          
          return {
            ...camera,
            vehicles: newVehicles,
            pedestrians: newPedestrians,
            cyclists: newCyclists,
            trafficLevel,
            lastUpdate: new Date().toISOString(),
          }
        })
      )
      setLastRefresh(new Date())
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  // Calculate totals
  const totals = cameras.reduce(
    (acc, camera) => ({
      vehicles: acc.vehicles + camera.vehicles,
      pedestrians: acc.pedestrians + camera.pedestrians,
      cyclists: acc.cyclists + camera.cyclists,
      activeCameras: acc.activeCameras + (camera.status === 'online' ? 1 : 0),
    }),
    { vehicles: 0, pedestrians: 0, cyclists: 0, activeCameras: 0 }
  )

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setHistoricalData(generateHistoricalData())
    setLastRefresh(new Date())
    setIsLoading(false)
  }

  const value = {
    cameras,
    selectedCamera,
    setSelectedCamera,
    historicalData,
    totals,
    isLoading,
    lastRefresh,
    refreshData,
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
