/**
 * CameraCard Component - Displays single camera info
 */

import Card from '../common/Card'
import Badge from '../common/Badge'
import { Camera, Car, Users, Bike } from 'lucide-react'
import { cn } from '../../utils'
import { TRAFFIC_COLORS } from '../../utils/constants'

export default function CameraCard({ camera, onClick, selected }) {
  const trafficColor = TRAFFIC_COLORS[camera.trafficLevel] || TRAFFIC_COLORS.unknown

  const statusVariant = {
    online: 'success',
    offline: 'danger',
    maintenance: 'warning',
  }

  return (
    <Card 
      className={cn(
        'cursor-pointer transition-all hover:border-primary/50',
        selected && 'border-primary ring-1 ring-primary/30'
      )}
      onClick={() => onClick?.(camera)}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: trafficColor.bg }}
            >
              <Camera className="w-4 h-4" style={{ color: trafficColor.primary }} />
            </div>
            <div>
              <h4 className="font-medium text-white text-sm">{camera.name}</h4>
              <p className="text-xs text-gray-500">{camera.id}</p>
            </div>
          </div>
          <Badge variant={statusVariant[camera.status] || 'default'}>
            {camera.status}
          </Badge>
        </div>

        {/* Stats */}
        {camera.status === 'online' && (
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 rounded-lg bg-white/5">
              <Car className="w-4 h-4 text-blue-400 mx-auto mb-1" />
              <p className="text-sm font-semibold text-white">{camera.vehicles}</p>
              <p className="text-xs text-gray-500">Vehicles</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-white/5">
              <Users className="w-4 h-4 text-green-400 mx-auto mb-1" />
              <p className="text-sm font-semibold text-white">{camera.pedestrians}</p>
              <p className="text-xs text-gray-500">People</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-white/5">
              <Bike className="w-4 h-4 text-amber-400 mx-auto mb-1" />
              <p className="text-sm font-semibold text-white">{camera.cyclists}</p>
              <p className="text-xs text-gray-500">Cyclists</p>
            </div>
          </div>
        )}

        {/* Traffic Level Indicator */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">Traffic Level</span>
          <span 
            className="text-xs font-medium capitalize px-2 py-0.5 rounded"
            style={{ 
              color: trafficColor.primary,
              backgroundColor: trafficColor.bg,
            }}
          >
            {camera.trafficLevel}
          </span>
        </div>
      </div>
    </Card>
  )
}
