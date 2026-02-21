import { RefreshCw, Bell, Search } from 'lucide-react'
import { useTraffic } from '../../context/TrafficContext'
import { format } from 'date-fns'
import clsx from 'clsx'

function Header() {
  const { lastRefresh, refreshData, isLoading } = useTraffic()

  return (
    <header className="h-16 bg-dark-card border-b border-dark-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search cameras, locations..."
            className="input pl-10 py-2 text-sm"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Last update */}
        <div className="text-sm text-gray-500">
          Last updated: {format(lastRefresh, 'HH:mm:ss')}
        </div>

        {/* Refresh button */}
        <button
          onClick={refreshData}
          disabled={isLoading}
          className={clsx(
            'p-2 rounded-lg transition-all duration-200',
            'hover:bg-dark-hover text-gray-400 hover:text-white',
            isLoading && 'animate-spin'
          )}
        >
          <RefreshCw className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-dark-hover text-gray-400 hover:text-white transition-all duration-200">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-traffic-high rounded-full" />
        </button>

        {/* User avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-medium text-sm">
          SM
        </div>
      </div>
    </header>
  )
}

export default Header
