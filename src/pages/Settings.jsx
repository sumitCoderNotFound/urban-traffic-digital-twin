/**
 * Settings Page - Configuration and project info
 */

import { useState, useEffect } from 'react'
import { useTraffic } from '../context/TrafficContext'
import { Card } from '../components'
import { API_BASE_URL, PROJECT_INFO } from '../utils/constants'
import { 
  Settings as SettingsIcon, 
  Database, 
  Server,
  User,
  Info,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'

export default function Settings() {
  const { apiStatus, refreshData, isLoading } = useTraffic()
  const [backendHealth, setBackendHealth] = useState(null)
  const [checkingHealth, setCheckingHealth] = useState(false)

  // Check backend health
  const checkBackendHealth = async () => {
    setCheckingHealth(true)
    try {
      const response = await fetch(`${API_BASE_URL}/health`)
      if (response.ok) {
        const data = await response.json()
        setBackendHealth(data)
      } else {
        setBackendHealth({ status: 'error', message: 'Backend returned error' })
      }
    } catch (error) {
      setBackendHealth({ status: 'offline', message: error.message })
    } finally {
      setCheckingHealth(false)
    }
  }

  useEffect(() => {
    checkBackendHealth()
  }, [])

  const StatusIcon = ({ status }) => {
    if (status === 'healthy' || status === 'online' || status === 'ready') {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    }
    if (status === 'offline' || status === 'error') {
      return <XCircle className="w-5 h-5 text-red-500" />
    }
    return <AlertCircle className="w-5 h-5 text-amber-500" />
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">System configuration and project information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Backend Connection */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-white">Backend Connection</h3>
          </div>
          
          <div className="space-y-4">
            {/* Connection Status */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-3">
                <StatusIcon status={apiStatus} />
                <div>
                  <p className="font-medium text-white">Status</p>
                  <p className="text-sm text-gray-400">
                    {apiStatus === 'online' ? 'Connected to backend' : 'Using simulated data'}
                  </p>
                </div>
              </div>
              <span 
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  apiStatus === 'online' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-amber-500/20 text-amber-400'
                }`}
              >
                {apiStatus === 'online' ? 'Live' : 'Demo'}
              </span>
            </div>

            {/* API URL */}
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-gray-400 mb-1">API URL</p>
              <code className="text-sm text-primary font-mono">{API_BASE_URL}</code>
            </div>

            {/* Backend Health Details */}
            {backendHealth && backendHealth.status === 'healthy' && (
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="text-sm text-gray-400">Database</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusIcon status={backendHealth.database === 'healthy' ? 'healthy' : 'error'} />
                    <span className="text-white capitalize">{backendHealth.database}</span>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <p className="text-sm text-gray-400">YOLO Detector</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusIcon status={backendHealth.detector === 'ready' ? 'healthy' : 'warning'} />
                    <span className="text-white capitalize">{backendHealth.detector}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Check Health Button */}
            <button
              onClick={checkBackendHealth}
              disabled={checkingHealth}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${checkingHealth ? 'animate-spin' : ''}`} />
              {checkingHealth ? 'Checking...' : 'Check Connection'}
            </button>
          </div>
        </Card>

        {/* Data Sources */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold text-white">Data Sources</h3>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="font-medium text-white">Newcastle Urban Observatory</p>
              <p className="text-sm text-gray-400 mt-1">
                Live traffic camera data from Newcastle and Gateshead
              </p>
              <a 
                href="https://newcastle.urbanobservatory.ac.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline mt-2 inline-flex items-center gap-1"
              >
                Visit Website <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-3 rounded-lg bg-white/5">
              <p className="font-medium text-white">YOLOv8 Object Detection</p>
              <p className="text-sm text-gray-400 mt-1">
                Real-time vehicle, pedestrian, and cyclist detection
              </p>
              <a 
                href="https://docs.ultralytics.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline mt-2 inline-flex items-center gap-1"
              >
                Documentation <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </Card>

        {/* Project Information */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-white">About This Project</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <InfoRow label="Project" value={PROJECT_INFO.name} />
              <InfoRow label="Description" value={PROJECT_INFO.description} />
              <InfoRow label="Version" value={PROJECT_INFO.version} />
            </div>
            <div className="space-y-3">
              <InfoRow label="Author" value={PROJECT_INFO.author} />
              <InfoRow label="Supervisor" value={PROJECT_INFO.supervisor} />
              <InfoRow label="University" value={PROJECT_INFO.university} />
              <InfoRow label="Module" value={PROJECT_INFO.module} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// Helper component
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-dark-border">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium text-right">{value}</span>
    </div>
  )
}
