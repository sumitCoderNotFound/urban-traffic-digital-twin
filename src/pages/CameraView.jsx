import { useTraffic } from '../context/TrafficContext'
import CameraCard from '../components/camera/CameraCard'
import Card from '../components/common/Card'
import TrafficMap from '../components/map/TrafficMap'
import { Camera, Filter } from 'lucide-react'
import { useState } from 'react'
import clsx from 'clsx'

function CameraView() {
  const { cameras, selectedCamera, setSelectedCamera } = useTraffic()
  const [filter, setFilter] = useState('all') // all, online, offline

  const filteredCameras = cameras.filter(camera => {
    if (filter === 'all') return true
    if (filter === 'online') return camera.status === 'online'
    if (filter === 'offline') return camera.status === 'offline'
    return true
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">
            Camera Management
          </h1>
          <p className="text-gray-400 mt-1">
            View and manage all traffic cameras
          </p>
        </div>
        
        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <div className="flex bg-dark-card rounded-lg p-1 border border-dark-border">
            {['all', 'online', 'offline'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                  filter === f
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-400 hover:text-white'
                )}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary-400" />
              Cameras ({filteredCameras.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
            {filteredCameras.map((camera) => (
              <CameraCard
                key={camera.id}
                camera={camera}
                isSelected={selectedCamera?.id === camera.id}
                onClick={() => setSelectedCamera(camera)}
              />
            ))}
          </div>
        </div>

        {/* Map */}
        <Card className="h-[calc(100vh-250px)] sticky top-6">
          <Card.Header>
            <Card.Title>
              {selectedCamera ? selectedCamera.name : 'Select a Camera'}
            </Card.Title>
          </Card.Header>
          <Card.Content className="h-[calc(100%-60px)] -mx-6 -mb-6">
            <TrafficMap height="100%" />
          </Card.Content>
        </Card>
      </div>
    </div>
  )
}

export default CameraView
