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
  LineChart,
  Line
} from 'recharts'
import { useTraffic } from '../context/TrafficContext'
import Card from '../components/common/Card'
import TrafficChart from '../components/charts/TrafficChart'
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from 'lucide-react'

// Mock data for analytics
const weeklyData = [
  { day: 'Mon', vehicles: 1245, pedestrians: 3420, cyclists: 567 },
  { day: 'Tue', vehicles: 1456, pedestrians: 3210, cyclists: 623 },
  { day: 'Wed', vehicles: 1367, pedestrians: 3540, cyclists: 589 },
  { day: 'Thu', vehicles: 1523, pedestrians: 3680, cyclists: 612 },
  { day: 'Fri', vehicles: 1678, pedestrians: 4120, cyclists: 701 },
  { day: 'Sat', vehicles: 987, pedestrians: 4560, cyclists: 823 },
  { day: 'Sun', vehicles: 756, pedestrians: 3890, cyclists: 756 },
]

const congestionData = [
  { name: 'Low', value: 45, color: '#22c55e' },
  { name: 'Medium', value: 35, color: '#f59e0b' },
  { name: 'High', value: 20, color: '#ef4444' },
]

const peakHoursData = [
  { hour: '06:00', count: 234 },
  { hour: '08:00', count: 567 },
  { hour: '10:00', count: 423 },
  { hour: '12:00', count: 512 },
  { hour: '14:00', count: 489 },
  { hour: '16:00', count: 534 },
  { hour: '18:00', count: 612 },
  { hour: '20:00', count: 378 },
  { hour: '22:00', count: 234 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card border border-dark-border rounded-lg p-3 shadow-xl">
        <p className="text-gray-400 text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }} 
            />
            <span className="text-gray-300 text-sm capitalize">{entry.dataKey || entry.name}:</span>
            <span className="text-white font-medium text-sm">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function Analytics() {
  const { totals, cameras } = useTraffic()

  // Calculate average per camera
  const avgVehicles = Math.round(totals.vehicles / totals.activeCameras)
  const avgPedestrians = Math.round(totals.pedestrians / totals.activeCameras)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white">
          Traffic Analytics
        </h1>
        <p className="text-gray-400 mt-1">
          Detailed analysis and insights from traffic data
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card glow>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-600/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-400" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-white">{avgVehicles}</p>
              <p className="text-xs text-gray-500">Avg Vehicles/Camera</p>
            </div>
          </div>
        </Card>
        <Card glow>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-traffic-low/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-traffic-low" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-white">{avgPedestrians}</p>
              <p className="text-xs text-gray-500">Avg Pedestrians/Camera</p>
            </div>
          </div>
        </Card>
        <Card glow>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-traffic-medium/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-traffic-medium" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-white">18:00</p>
              <p className="text-xs text-gray-500">Peak Hour</p>
            </div>
          </div>
        </Card>
        <Card glow>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-traffic-high/20 flex items-center justify-center">
              <PieChartIcon className="w-5 h-5 text-traffic-high" />
            </div>
            <div>
              <p className="text-2xl font-display font-bold text-white">20%</p>
              <p className="text-xs text-gray-500">High Congestion</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly comparison */}
        <Card>
          <Card.Header>
            <Card.Title>Weekly Traffic Comparison</Card.Title>
          </Card.Header>
          <Card.Content className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  axisLine={{ stroke: '#1f2937' }}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#6b7280" 
                  tick={{ fill: '#6b7280', fontSize: 11 }}
                  axisLine={{ stroke: '#1f2937' }}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="vehicles" fill="#33a5ff" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pedestrians" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cyclists" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card.Content>
        </Card>

        {/* Congestion distribution */}
        <Card>
          <Card.Header>
            <Card.Title>Congestion Distribution</Card.Title>
          </Card.Header>
          <Card.Content className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={congestionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {congestionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend */}
            <div className="flex justify-center gap-6 -mt-4">
              {congestionData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-400">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Peak hours chart */}
      <Card>
        <Card.Header>
          <Card.Title>Traffic by Hour of Day</Card.Title>
        </Card.Header>
        <Card.Content className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={peakHoursData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis 
                dataKey="hour" 
                stroke="#6b7280" 
                tick={{ fill: '#6b7280', fontSize: 11 }}
                axisLine={{ stroke: '#1f2937' }}
                tickLine={false}
              />
              <YAxis 
                stroke="#6b7280" 
                tick={{ fill: '#6b7280', fontSize: 11 }}
                axisLine={{ stroke: '#1f2937' }}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#33a5ff" 
                strokeWidth={3}
                dot={{ fill: '#33a5ff', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#33a5ff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card.Content>
      </Card>

      {/* Hourly chart */}
      <TrafficChart title="Real-Time Traffic Flow (Last 24 Hours)" />
    </div>
  )
}

export default Analytics
