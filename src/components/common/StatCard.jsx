import clsx from 'clsx'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import Card from './Card'

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = 'primary',
  delay = 0 
}) {
  const colorClasses = {
    primary: 'from-primary-500 to-primary-700',
    green: 'from-traffic-low to-emerald-600',
    amber: 'from-traffic-medium to-orange-600',
    red: 'from-traffic-high to-rose-600',
  }

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'text-traffic-low' : trend === 'down' ? 'text-traffic-high' : 'text-gray-500'

  return (
    <Card 
      glow 
      className={clsx(
        'animate-slide-up',
        delay && `animate-delay-${delay}`
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="stat-label mb-2">{title}</p>
          <p className="stat-value text-white">{value.toLocaleString()}</p>
          
          {trendValue !== undefined && (
            <div className={clsx('flex items-center gap-1 mt-2', trendColor)}>
              <TrendIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{trendValue}%</span>
              <span className="text-xs text-gray-500 ml-1">vs last hour</span>
            </div>
          )}
        </div>
        
        <div className={clsx(
          'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center',
          colorClasses[color]
        )}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </Card>
  )
}

export default StatCard
