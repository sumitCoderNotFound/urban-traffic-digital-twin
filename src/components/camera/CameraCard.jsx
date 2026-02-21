import { Camera, MapPin, Clock, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import Card from '../common/Card'
import Badge from '../common/Badge'
import clsx from 'clsx'

function CameraCard({ camera, onClick, isSelected = false }) {
  const getTrafficBadgeVariant = (level) => {
    switch (level) {
      case 'low': return 'green'
      case 'medium': return 'amber'
      case 'high': return 'red'
      default: return 'gray'
    }
  }

  const isOnline = camera.status === 'online'

  return (
    <Card
      glow
      className={clsx(
        'cursor-pointer transition-all duration-300',
        isSelected && 'border-primary-500 shadow-glow',
        !isOnline && 'opacity-60'
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={clsx(
            'w-10 h-10 rounded-xl flex items-center justify-center',
            isOnline ? 'bg-primary-600/20' : 'bg-gray-600/20'
          )}>
            <Camera className={clsx(
              'w-5 h-5',
              isOnline ? 'text-primary-400' : 'text-gray-500'
            )} />
          </div>
          <div>
            <h4 className="font-display font-semibold text-white">{camera.name}</h4>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{camera.location.lat.toFixed(4)}, {camera.location.lng.toFixed(4)}</span>
            </div>
          </div>
        </div>
        <Badge 
          variant={getTrafficBadgeVariant(camera.trafficLevel)} 
          dot
        >
          {camera.trafficLevel}
        </Badge>
      </div>

      {/* Simulated camera feed placeholder */}
      <div className={clsx(
        'relative aspect-video rounded-lg mb-4 overflow-hidden',
        isOnline ? 'bg-dark-bg' : 'bg-gray-800'
      )}>
        {isOnline ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-xs text-gray-500">Live Feed Preview</p>
              </div>
            </div>
            {/* Live indicator */}
            <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-traffic-high/90 rounded-md">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              <span className="text-xs font-medium text-white">LIVE</span>
            </div>
            {/* Detection count overlay */}
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-md backdrop-blur-sm">
              <span className="text-xs text-white font-mono">
                {camera.vehicles + camera.pedestrians + camera.cyclists} detections
              </span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Camera Offline</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-2 bg-dark-bg rounded-lg">
          <p className="text-lg font-display font-bold text-white">{camera.vehicles}</p>
          <p className="text-xs text-gray-500">Vehicles</p>
        </div>
        <div className="text-center p-2 bg-dark-bg rounded-lg">
          <p className="text-lg font-display font-bold text-white">{camera.pedestrians}</p>
          <p className="text-xs text-gray-500">Pedestrians</p>
        </div>
        <div className="text-center p-2 bg-dark-bg rounded-lg">
          <p className="text-lg font-display font-bold text-white">{camera.cyclists}</p>
          <p className="text-xs text-gray-500">Cyclists</p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-dark-border">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Updated {format(new Date(camera.lastUpdate), 'HH:mm:ss')}</span>
        </div>
        <div className={clsx(
          'flex items-center gap-1.5 text-xs',
          isOnline ? 'text-traffic-low' : 'text-gray-500'
        )}>
          <span className={clsx(
            'w-1.5 h-1.5 rounded-full',
            isOnline ? 'bg-traffic-low' : 'bg-gray-500'
          )} />
          <span>{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>
    </Card>
  )
}

export default CameraCard
