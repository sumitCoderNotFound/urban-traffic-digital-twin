/**
 * Analytics Page - Detailed traffic analytics
 */

import { useTraffic } from '../context/TrafficContext'
import { Card, TrafficChart } from '../components'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { TrendingUp, TrendingDown, Minus, Clock, Target } from 'lucide-react'
import { CHART_COLORS, TRAFFIC_COLORS } from '../utils/constants'

export default function Analytics() {
  const { cameras, totals, historicalData } = useTraffic()

  // Traffic level distribution
  const trafficDistribution = [
    { name: 'Low', value: cameras.filter(c => c.trafficLevel === 'low').length, color: TRAFFIC_COLORS.low.primary },
    { name: 'Medium', value: cameras.filter(c => c.trafficLevel === 'medium').length, color: TRAFFIC_COLORS.medium.primary },
    { name: 'High', value: cameras.filter(c => c.trafficLevel === 'high').length, color: TRAFFIC_COLORS.high.primary },
  ]

  // Camera comparison data
  const cameraComparison = cameras
    .filter(c => c.status === 'online')
    .map(c => ({
      name: c.name.length > 10 ? c.name.substring(0, 10) + '...' : c.name,
      vehicles: c.vehicles,
      pedestrians: c.pedestrians,
      cyclists: c.cyclists,
    }))
    .sort((a, b) => b.vehicles - a.vehicles)
    .slice(0, 6)

  // Peak hour calculation
  const peakHour = historicalData.reduce((max, item) => 
    (item.vehicles + item.pedestrians) > (max.vehicles + max.pedestrians) ? item : max
  , historicalData[0] || { time: 'N/A', vehicles: 0, pedestrians: 0 })

  // Average calculations
  const avgVehicles = Math.round(historicalData.reduce((sum, item) => sum + item.vehicles, 0) / historicalData.length)
  const avgPedestrians = Math.round(historicalData.reduce((sum, item) => sum + item.pedestrians, 0) / historicalData.length)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400 mt-1">Detailed traffic analysis and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg Vehicles/hr</p>
              <p className="text-xl font-bold text-white">{avgVehicles}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg Pedestrians/hr</p>
              <p className="text-xl font-bold text-white">{avgPedestrians}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Peak Hour</p>
              <p className="text-xl font-bold text-white">{peakHour.time}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Today</p>
              <p className="text-xl font-bold text-white">{totals.vehicles + totals.pedestrians + totals.cyclists}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Over Time */}
        <TrafficChart title="Traffic Pattern (24h)" height={280} />

        {/* Camera Comparison */}
        <Card className="p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Top Cameras by Vehicles</h3>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cameraComparison} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={11} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="vehicles" fill={CHART_COLORS.vehicles} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Distribution Pie */}
        <Card className="p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Traffic Level Distribution</h3>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {trafficDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Summary Stats */}
        <Card className="p-5 lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-4">Current Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-gray-400">Vehicles</p>
              <p className="text-3xl font-bold text-blue-400">{totals.vehicles}</p>
              <p className="text-xs text-gray-500 mt-1">Across all cameras</p>
            </div>
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-sm text-gray-400">Pedestrians</p>
              <p className="text-3xl font-bold text-green-400">{totals.pedestrians}</p>
              <p className="text-xs text-gray-500 mt-1">Across all cameras</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <p className="text-sm text-gray-400">Cyclists</p>
              <p className="text-3xl font-bold text-amber-400">{totals.cyclists}</p>
              <p className="text-xs text-gray-500 mt-1">Across all cameras</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 rounded-xl bg-white/5">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Camera Uptime</span>
              <span className="text-white font-semibold">
                {Math.round((totals.activeCameras / cameras.length) * 100)}%
              </span>
            </div>
            <div className="mt-2 h-2 bg-dark-bg rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${(totals.activeCameras / cameras.length) * 100}%` }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
