import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Camera, 
  BarChart3, 
  Settings,
  Map,
  Activity
} from 'lucide-react'
import clsx from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Cameras', href: '/cameras', icon: Camera },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

function Sidebar() {
  return (
    <aside className="w-64 bg-dark-card border-r border-dark-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <Map className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-white">Urban Twin</h1>
            <p className="text-xs text-gray-500">Newcastle Traffic</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary-600/10 text-primary-400 border border-primary-500/20'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-dark-hover'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Status indicator */}
      <div className="p-4 border-t border-dark-border">
        <div className="card-glow p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Activity className="w-5 h-5 text-traffic-low" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-traffic-low rounded-full animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">System Active</p>
              <p className="text-xs text-gray-500">All services running</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
