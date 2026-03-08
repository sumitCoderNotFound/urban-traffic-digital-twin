/**
 * Header Component
 */

import { useTraffic } from '../../context/TrafficContext'
import { RefreshCw, Bell } from 'lucide-react'
import { formatTime } from '../../utils'

export default function Header() {
  const { lastRefresh, refreshData, isLoading } = useTraffic()

  return (
    <header className="h-16 border-b border-dark-border bg-dark-card/50 backdrop-blur-sm px-6 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold text-white">Traffic Monitoring</h2>
        <p className="text-xs text-gray-500">
          Last updated: {formatTime(lastRefresh)}
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={refreshData}
          disabled={isLoading}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
        
        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors relative">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  )
}
