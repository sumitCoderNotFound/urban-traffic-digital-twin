/**
 * TrafficMap Component - Interactive map with camera markers
 */

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import { useTraffic } from '../../context/TrafficContext'
import { NEWCASTLE_CENTER, DEFAULT_ZOOM, TRAFFIC_COLORS } from '../../utils/constants'
import 'leaflet/dist/leaflet.css'

// Map controller to handle updates
function MapController() {
  const map = useMap()
  
  useEffect(() => {
    map.invalidateSize()
  }, [map])
  
  return null
}

export default function TrafficMap({ height = '400px', onCameraClick }) {
  const { cameras, selectedCamera, setSelectedCamera } = useTraffic()

  const getMarkerColor = (trafficLevel) => {
    return TRAFFIC_COLORS[trafficLevel]?.primary || TRAFFIC_COLORS.unknown.primary
  }

  const handleMarkerClick = (camera) => {
    setSelectedCamera(camera)
    if (onCameraClick) onCameraClick(camera)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-dark-border" style={{ height }}>
      <MapContainer
        center={[NEWCASTLE_CENTER.lat, NEWCASTLE_CENTER.lng]}
        zoom={DEFAULT_ZOOM}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <MapController />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        
        {cameras.map((camera) => (
          <CircleMarker
            key={camera.id}
            center={[camera.location.lat, camera.location.lng]}
            radius={camera.status === 'offline' ? 8 : 12}
            fillColor={getMarkerColor(camera.trafficLevel)}
            color={selectedCamera?.id === camera.id ? '#ffffff' : getMarkerColor(camera.trafficLevel)}
            weight={selectedCamera?.id === camera.id ? 3 : 2}
            opacity={1}
            fillOpacity={0.7}
            eventHandlers={{
              click: () => handleMarkerClick(camera),
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-bold text-gray-900">{camera.name}</p>
                <p className="text-gray-600">Status: {camera.status}</p>
                {camera.status === 'online' && (
                  <>
                    <p className="text-gray-600">Vehicles: {camera.vehicles}</p>
                    <p className="text-gray-600">Pedestrians: {camera.pedestrians}</p>
                    <p className="text-gray-600">Cyclists: {camera.cyclists}</p>
                  </>
                )}
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}
