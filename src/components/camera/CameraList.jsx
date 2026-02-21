import { useTraffic } from '../../context/TrafficContext'
import CameraCard from './CameraCard'
import Card from '../common/Card'

function CameraList({ limit, showTitle = true }) {
  const { cameras, selectedCamera, setSelectedCamera } = useTraffic()

  const displayCameras = limit ? cameras.slice(0, limit) : cameras

  return (
    <div>
      {showTitle && (
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-semibold text-white">Active Cameras</h3>
          <span className="text-sm text-gray-500">
            {cameras.filter(c => c.status === 'online').length} of {cameras.length} online
          </span>
        </div>
      )}
      <div className="space-y-4">
        {displayCameras.map((camera) => (
          <CameraCard
            key={camera.id}
            camera={camera}
            isSelected={selectedCamera?.id === camera.id}
            onClick={() => setSelectedCamera(camera)}
          />
        ))}
      </div>
    </div>
  )
}

export default CameraList
