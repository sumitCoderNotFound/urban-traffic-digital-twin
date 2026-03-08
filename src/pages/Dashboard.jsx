/**
 * Dashboard Page - Main overview with live detection pipeline
 */

import { useState } from 'react'
import { useTraffic } from '../context/TrafficContext'
import { StatCard, Card, TrafficMap, TrafficChart, CameraCard } from '../components'
import { Car, Users, Bike, Camera, Play, RefreshCw, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import * as api from '../services/api'

export default function Dashboard() {
  const { cameras, totals, selectedCamera, setSelectedCamera, refreshData } = useTraffic()

  const [maxCameras, setMaxCameras] = useState(10)
  const [isRunning, setIsRunning] = useState(false)
  const [pipelineResult, setPipelineResult] = useState(null) // null | { success, message }

  // Get top cameras by activity
  const topCameras = [...cameras]
    .filter(c => c.status === 'online')
    .sort((a, b) => (b.vehicles + b.pedestrians) - (a.vehicles + a.pedestrians))
    .slice(0, 4)

  const handleRunDetection = async () => {
    setIsRunning(true)
    setPipelineResult(null)

    try {
      const result = await api.runDetectionPipeline(maxCameras)

      // API returns { status, cameras_processed, results_saved, message }
      const saved = result.results_saved ?? result.cameras_processed ?? 0
      const msg = result.message || `${saved} results saved to database`

      setPipelineResult({ success: true, message: msg })

      // Refresh dashboard data after successful detection
      await refreshData()
    } catch (err) {
      setPipelineResult({
        success: false,
        message: err.message || 'Detection failed — check the backend is running'
      })
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time traffic monitoring — Newcastle upon Tyne</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
          Live Data &nbsp;·&nbsp; Updated {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>

      {/* Detection Pipeline Panel */}
      <div className="bg-dark-card border border-dark-border rounded-xl p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">

          <div className="flex items-start gap-3">
            <Play className="w-5 h-5 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-white">Detection Pipeline</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Fetch live CCTV images from Newcastle Urban Observatory and run YOLOv8 detection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-gray-400">Cameras:</label>
            <select
              value={maxCameras}
              onChange={e => setMaxCameras(Number(e.target.value))}
              disabled={isRunning}
              className="bg-dark-bg border border-dark-border text-white text-sm rounded-lg px-3 py-1.5 disabled:opacity-50"
            >
              {[5, 10, 20, 30, 50].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>

            <button
              onClick={handleRunDetection}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              {isRunning
                ? <><Loader className="w-4 h-4 animate-spin" /> Running...</>
                : <><Play className="w-4 h-4" /> Run Detection</>
              }
            </button>

            <button
              onClick={refreshData}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Result message */}
        {pipelineResult && (
          <div className={`mt-4 flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg ${
            pipelineResult.success
              ? 'bg-green-500/10 border border-green-500/20 text-green-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
            {pipelineResult.success
              ? <CheckCircle className="w-4 h-4 shrink-0" />
              : <AlertCircle className="w-4 h-4 shrink-0" />
            }
            {pipelineResult.message}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Vehicles"    value={totals.vehicles}      icon={Car}    color="primary" />
        <StatCard title="Total Pedestrians" value={totals.pedestrians}   icon={Users}  color="green"   />
        <StatCard title="Total Cyclists"    value={totals.cyclists}      icon={Bike}   color="amber"   />
        <StatCard
          title="Active Cameras"
          value={`${totals.activeCameras}/${cameras.length}`}
          icon={Camera}
          color="purple"
        />
      </div>

      {/* Map and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="text-lg font-semibold text-white mb-4">Camera Locations</h3>
          <TrafficMap height="350px" />
        </Card>
        <TrafficChart title="24-Hour Traffic Pattern" height={300} />
      </div>

      {/* Busiest Cameras */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Busiest Cameras</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topCameras.map(camera => (
            <CameraCard
              key={camera.id}
              camera={camera}
              onClick={setSelectedCamera}
              selected={selectedCamera?.id === camera.id}
            />
          ))}
        </div>
      </div>

    </div>
  )
}