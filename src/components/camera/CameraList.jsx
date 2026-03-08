/**
 * CameraList Component - Grid of camera cards
 */

import { useTraffic } from '../../context/TrafficContext'
import CameraCard from './CameraCard'

export default function CameraList({ onCameraClick }) {
  const { cameras, selectedCamera, setSelectedCamera } = useTraffic()

  const handleClick = (camera) => {
    setSelectedCamera(camera)
    if (onCameraClick) onCameraClick(camera)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cameras.map((camera) => (
        <CameraCard
          key={camera.id}
          camera={camera}
          onClick={handleClick}
          selected={selectedCamera?.id === camera.id}
        />
      ))}
    </div>
  )
}
