/**
 * Sidebar Component - Navigation
 */

import { NavLink } from 'react-router-dom'
import { useTraffic } from '../../context/TrafficContext'
import { 
  LayoutDashboard, 
  Camera, 
  BarChart3, 
  Settings, 
  Activity,
  MapPin 
} from 'lucide-react'

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/cameras', icon: Camera, label: 'Cameras' },
  { path: '/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const { apiStatus } = useTraffic()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dark-card border-r border-dark-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-5 border-b border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/30">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg leading-tight">
              Urban Twin
            </h1>
            <p className="text-xs text-gray-500">Newcastle Traffic</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/15 text-primary border border-primary/30'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Status */}
      <div className="p-4 border-t border-dark-border">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Activity 
                className="w-5 h-5" 
                style={{ color: apiStatus === 'online' ? '#22c55e' : '#f59e0b' }}
              />
              <span 
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: apiStatus === 'online' ? '#22c55e' : '#f59e0b' }}
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                {apiStatus === 'online' ? 'System Active' : 'Demo Mode'}
              </p>
              <p 
                className="text-xs"
                style={{ color: apiStatus === 'online' ? '#22c55e' : '#f59e0b' }}
              >
                {apiStatus === 'online' ? 'Live Data' : 'Simulated Data'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
