/**
 * StatCard Component - Displays a single statistic
 */

import Card from './Card'
import { cn } from '../../utils'

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  color = 'primary',
  className,
}) {
  const colors = {
    primary: 'from-primary to-blue-600 shadow-primary/30',
    green: 'from-green-500 to-emerald-600 shadow-green-500/30',
    amber: 'from-amber-500 to-orange-600 shadow-amber-500/30',
    purple: 'from-purple-500 to-violet-600 shadow-purple-500/30',
  }

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white">{value}</p>
            {trend && (
              <p className={cn(
                'text-sm mt-1',
                trend > 0 ? 'text-green-400' : 'text-red-400'
              )}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </p>
            )}
          </div>
          {Icon && (
            <div className={cn(
              'w-14 h-14 rounded-xl flex items-center justify-center',
              'bg-gradient-to-br shadow-lg',
              colors[color]
            )}>
              <Icon className="w-7 h-7 text-white" />
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
