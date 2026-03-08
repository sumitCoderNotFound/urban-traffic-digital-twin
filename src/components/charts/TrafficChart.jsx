/**
 * TrafficChart Component - Line chart for traffic data
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useTraffic } from '../../context/TrafficContext'
import Card from '../common/Card'
import { CHART_COLORS } from '../../utils/constants'

export default function TrafficChart({ title = 'Traffic Over Time', height = 300 }) {
  const { historicalData } = useTraffic()

  return (
    <Card className="p-5">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#9ca3af" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="vehicles"
              stroke={CHART_COLORS.vehicles}
              strokeWidth={2}
              dot={false}
              name="Vehicles"
            />
            <Line
              type="monotone"
              dataKey="pedestrians"
              stroke={CHART_COLORS.pedestrians}
              strokeWidth={2}
              dot={false}
              name="Pedestrians"
            />
            <Line
              type="monotone"
              dataKey="cyclists"
              stroke={CHART_COLORS.cyclists}
              strokeWidth={2}
              dot={false}
              name="Cyclists"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
