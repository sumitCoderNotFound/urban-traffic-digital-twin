import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useTraffic } from '../../context/TrafficContext'
import Badge from '../common/Badge'

// Custom marker icons
const createMarkerIcon = (color) => {
  const colors = {
    low: '#22c55e',
    medium: '#f59e0b',
    high: '#ef4444',
    unknown: '#6b7280',
  }

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="position: relative;">
        <div style="
          width: 32px;
          height: 32px;
          background: ${colors[color]};
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        ${color !== 'unknown' ? `
          <div style="
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            border-radius: 50%;
            background: ${colors[color]};
            opacity: 0.3;
            animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          "></div>
        ` : ''}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
  })
}

// Map center component
function MapCenter({ center }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])
  return null
}

function TrafficMap({ height = '100%', showControls = true }) {
  const { cameras, selectedCamera, setSelectedCamera } = useTraffic()
  const mapRef = useRef(null)

  // Newcastle center coordinates
  const center = [54.9733, -1.6145]

  const getTrafficBadgeVariant = (level) => {
    switch (level) {
      case 'low': return 'green'
      case 'medium': return 'amber'
      case 'high': return 'red'
      default: return 'gray'
    }
  }

  return (
    <div style={{ height }} className="rounded-xl overflow-hidden">
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        zoomControl={showControls}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {selectedCamera && (
          <MapCenter center={[selectedCamera.location.lat, selectedCamera.location.lng]} />
        )}

        {cameras.map((camera) => (
          <Marker
            key={camera.id}
            position={[camera.location.lat, camera.location.lng]}
            icon={createMarkerIcon(camera.trafficLevel)}
            eventHandlers={{
              click: () => setSelectedCamera(camera),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-display font-semibold text-white">
                    {camera.name}
                  </h4>
                  <Badge 
                    variant={getTrafficBadgeVariant(camera.trafficLevel)} 
                    size="sm"
                    dot
                  >
                    {camera.trafficLevel}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vehicles</span>
                    <span className="text-white font-medium">{camera.vehicles}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Pedestrians</span>
                    <span className="text-white font-medium">{camera.pedestrians}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cyclists</span>
                    <span className="text-white font-medium">{camera.cyclists}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-dark-border">
                  <span className={`text-xs ${camera.status === 'online' ? 'text-traffic-low' : 'text-gray-500'}`}>
                    ● {camera.status === 'online' ? 'Live' : 'Offline'}
                  </span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default TrafficMap
