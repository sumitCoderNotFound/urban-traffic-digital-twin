import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'
import { useTraffic } from '../../context/TrafficContext'
import Card from '../common/Card'

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
            <span className="text-gray-300 text-sm capitalize">{entry.dataKey}:</span>
            <span className="text-white font-medium text-sm">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function TrafficChart({ title = 'Traffic Over Time' }) {
  const { historicalData } = useTraffic()

  return (
    <Card className="h-full">
      <Card.Header>
        <Card.Title>{title}</Card.Title>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary-500" />
            <span className="text-gray-400">Vehicles</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-traffic-low" />
            <span className="text-gray-400">Pedestrians</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-traffic-medium" />
            <span className="text-gray-400">Cyclists</span>
          </div>
        </div>
      </Card.Header>
      <Card.Content className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={historicalData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorVehicles" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#33a5ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#33a5ff" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPedestrians" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCyclists" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
            <XAxis 
              dataKey="time" 
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
            <Area
              type="monotone"
              dataKey="vehicles"
              stroke="#33a5ff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorVehicles)"
            />
            <Area
              type="monotone"
              dataKey="pedestrians"
              stroke="#22c55e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPedestrians)"
            />
            <Area
              type="monotone"
              dataKey="cyclists"
              stroke="#f59e0b"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCyclists)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card.Content>
    </Card>
  )
}

export default TrafficChart
