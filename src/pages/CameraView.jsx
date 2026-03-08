/**
 * CameraView Page - Camera list and details
 */

import { useState } from 'react'
import { useTraffic } from '../context/TrafficContext'
import { Card, CameraList, TrafficMap } from '../components'
import { Camera, MapPin, Clock, Car, Users, Bike } from 'lucide-react'
import { formatDateTime } from '../utils'
import { TRAFFIC_COLORS } from '../utils/constants'

export default function CameraView() {
  const { cameras, selectedCamera, setSelectedCamera } = useTraffic()
  const [filter, setFilter] = useState('all') // all, online, offline

  const filteredCameras = cameras.filter(camera => {
    if (filter === 'all') return true
    return camera.status === filter
  })

  const onlineCount = cameras.filter(c => c.status === 'online').length
  const offlineCount = cameras.filter(c => c.status === 'offline').length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Cameras</h1>
          <p className="text-gray-400 mt-1">Manage and monitor traffic cameras</p>
        </div>
        
        {/* Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            All ({cameras.length})
          </button>
          <button
            onClick={() => setFilter('online')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'online' 
                ? 'bg-green-500 text-white' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Online ({onlineCount})
          </button>
          <button
            onClick={() => setFilter('offline')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'offline' 
                ? 'bg-red-500 text-white' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            Offline ({offlineCount})
          </button>
        </div>
      </div>

      {/* Map */}
      <Card className="p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Camera Map</h3>
        <TrafficMap height="300px" />
      </Card>

      {/* Selected Camera Details */}
      {selectedCamera && (
        <Card className="p-5">
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ 
                backgroundColor: TRAFFIC_COLORS[selectedCamera.trafficLevel]?.bg || '#374151' 
              }}
            >
              <Camera 
                className="w-6 h-6" 
                style={{ 
                  color: TRAFFIC_COLORS[selectedCamera.trafficLevel]?.primary || '#9ca3af' 
                }}
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{selectedCamera.name}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {selectedCamera.location.lat.toFixed(4)}, {selectedCamera.location.lng.toFixed(4)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDateTime(selectedCamera.lastUpdate)}
                </span>
              </div>
              
              {selectedCamera.status === 'online' && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-2 text-blue-400">
                      <Car className="w-4 h-4" />
                      <span className="text-sm">Vehicles</span>
                    </div>
                    <p className="text-2xl font-bold text-white mt-1">{selectedCamera.vehicles}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-2 text-green-400">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Pedestrians</span>
                    </div>
                    <p className="text-2xl font-bold text-white mt-1">{selectedCamera.pedestrians}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Bike className="w-4 h-4" />
                      <span className="text-sm">Cyclists</span>
                    </div>
                    <p className="text-2xl font-bold text-white mt-1">{selectedCamera.cyclists}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Camera Grid */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          {filter === 'all' ? 'All Cameras' : filter === 'online' ? 'Online Cameras' : 'Offline Cameras'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCameras.map((camera) => (
            <Card 
              key={camera.id}
              className={`p-4 cursor-pointer transition-all hover:border-primary/50 ${
                selectedCamera?.id === camera.id ? 'border-primary ring-1 ring-primary/30' : ''
              }`}
              onClick={() => setSelectedCamera(camera)}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ 
                    backgroundColor: TRAFFIC_COLORS[camera.trafficLevel]?.bg || '#374151' 
                  }}
                >
                  <Camera 
                    className="w-5 h-5" 
                    style={{ 
                      color: TRAFFIC_COLORS[camera.trafficLevel]?.primary || '#9ca3af' 
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white truncate">{camera.name}</h4>
                  <p className={`text-xs ${camera.status === 'online' ? 'text-green-400' : 'text-red-400'}`}>
                    {camera.status}
                  </p>
                </div>
                {camera.status === 'online' && (
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">{camera.vehicles}</p>
                    <p className="text-xs text-gray-500">vehicles</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
