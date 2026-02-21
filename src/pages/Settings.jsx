import { useState } from 'react'
import { 
  Bell, 
  Monitor, 
  Database, 
  Wifi, 
  Moon, 
  Sun,
  Save,
  RotateCcw,
  ChevronRight
} from 'lucide-react'
import Card from '../components/common/Card'
import clsx from 'clsx'

function Settings() {
  const [settings, setSettings] = useState({
    refreshInterval: 5,
    notifications: true,
    darkMode: true,
    autoRefresh: true,
    showOfflineCameras: true,
    dataRetention: 30,
  })

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white">
          Settings
        </h1>
        <p className="text-gray-400 mt-1">
          Configure your dashboard preferences
        </p>
      </div>

      {/* General Settings */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-primary-400" />
            Display Settings
          </Card.Title>
        </Card.Header>
        <Card.Content className="space-y-4">
          {/* Dark Mode */}
          <div className="flex items-center justify-between py-3 border-b border-dark-border">
            <div className="flex items-center gap-3">
              {settings.darkMode ? (
                <Moon className="w-5 h-5 text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-gray-400" />
              )}
              <div>
                <p className="text-white font-medium">Dark Mode</p>
                <p className="text-sm text-gray-500">Use dark theme for the interface</p>
              </div>
            </div>
            <button
              onClick={() => handleChange('darkMode', !settings.darkMode)}
              className={clsx(
                'relative w-12 h-6 rounded-full transition-colors',
                settings.darkMode ? 'bg-primary-600' : 'bg-gray-600'
              )}
            >
              <span
                className={clsx(
                  'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                  settings.darkMode ? 'translate-x-7' : 'translate-x-1'
                )}
              />
            </button>
          </div>

          {/* Show Offline Cameras */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-white font-medium">Show Offline Cameras</p>
              <p className="text-sm text-gray-500">Display cameras that are currently offline</p>
            </div>
            <button
              onClick={() => handleChange('showOfflineCameras', !settings.showOfflineCameras)}
              className={clsx(
                'relative w-12 h-6 rounded-full transition-colors',
                settings.showOfflineCameras ? 'bg-primary-600' : 'bg-gray-600'
              )}
            >
              <span
                className={clsx(
                  'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                  settings.showOfflineCameras ? 'translate-x-7' : 'translate-x-1'
                )}
              />
            </button>
          </div>
        </Card.Content>
      </Card>

      {/* Data Settings */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary-400" />
            Data Settings
          </Card.Title>
        </Card.Header>
        <Card.Content className="space-y-4">
          {/* Refresh Interval */}
          <div className="flex items-center justify-between py-3 border-b border-dark-border">
            <div className="flex items-center gap-3">
              <Wifi className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-white font-medium">Refresh Interval</p>
                <p className="text-sm text-gray-500">How often to fetch new data</p>
              </div>
            </div>
            <select
              value={settings.refreshInterval}
              onChange={(e) => handleChange('refreshInterval', Number(e.target.value))}
              className="input w-32 py-2 text-sm"
            >
              <option value={1}>1 second</option>
              <option value={5}>5 seconds</option>
              <option value={10}>10 seconds</option>
              <option value={30}>30 seconds</option>
              <option value={60}>1 minute</option>
            </select>
          </div>

          {/* Auto Refresh */}
          <div className="flex items-center justify-between py-3 border-b border-dark-border">
            <div>
              <p className="text-white font-medium">Auto Refresh</p>
              <p className="text-sm text-gray-500">Automatically update data</p>
            </div>
            <button
              onClick={() => handleChange('autoRefresh', !settings.autoRefresh)}
              className={clsx(
                'relative w-12 h-6 rounded-full transition-colors',
                settings.autoRefresh ? 'bg-primary-600' : 'bg-gray-600'
              )}
            >
              <span
                className={clsx(
                  'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                  settings.autoRefresh ? 'translate-x-7' : 'translate-x-1'
                )}
              />
            </button>
          </div>

          {/* Data Retention */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-white font-medium">Data Retention</p>
              <p className="text-sm text-gray-500">How long to keep historical data</p>
            </div>
            <select
              value={settings.dataRetention}
              onChange={(e) => handleChange('dataRetention', Number(e.target.value))}
              className="input w-32 py-2 text-sm"
            >
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
            </select>
          </div>
        </Card.Content>
      </Card>

      {/* Notification Settings */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary-400" />
            Notifications
          </Card.Title>
        </Card.Header>
        <Card.Content>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-white font-medium">Enable Notifications</p>
              <p className="text-sm text-gray-500">Receive alerts for high congestion</p>
            </div>
            <button
              onClick={() => handleChange('notifications', !settings.notifications)}
              className={clsx(
                'relative w-12 h-6 rounded-full transition-colors',
                settings.notifications ? 'bg-primary-600' : 'bg-gray-600'
              )}
            >
              <span
                className={clsx(
                  'absolute top-1 w-4 h-4 rounded-full bg-white transition-transform',
                  settings.notifications ? 'translate-x-7' : 'translate-x-1'
                )}
              />
            </button>
          </div>
        </Card.Content>
      </Card>

      {/* API Configuration */}
      <Card>
        <Card.Header>
          <Card.Title className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary-400" />
            API Configuration
          </Card.Title>
        </Card.Header>
        <Card.Content className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Urban Observatory API Endpoint
            </label>
            <input
              type="text"
              defaultValue="https://api.newcastle.urbanobservatory.ac.uk"
              className="input"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Backend API URL
            </label>
            <input
              type="text"
              defaultValue="http://localhost:8000/api"
              className="input"
            />
          </div>
        </Card.Content>
      </Card>

      {/* About Section */}
      <Card>
        <Card.Header>
          <Card.Title>About</Card.Title>
        </Card.Header>
        <Card.Content className="space-y-3">
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Version</span>
            <span className="text-white">1.0.0 (MVP)</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Project</span>
            <span className="text-white">Urban Digital Twin</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Author</span>
            <span className="text-white">Sumit Malviya</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Supervisor</span>
            <span className="text-white">Dr. Jason Moore</span>
          </div>
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
        <button className="btn-secondary flex items-center gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </button>
      </div>
    </div>
  )
}

export default Settings
