import { Car, Users, Bike, Camera } from 'lucide-react'
import { useTraffic } from '../context/TrafficContext'
import StatCard from '../components/common/StatCard'
import Card from '../components/common/Card'
import TrafficMap from '../components/map/TrafficMap'
import TrafficChart from '../components/charts/TrafficChart'
import CameraList from '../components/camera/CameraList'

function Dashboard() {
  const { totals } = useTraffic()

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white">
          Traffic Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          Real-time traffic monitoring across Newcastle
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Vehicles"
          value={totals.vehicles}
          icon={Car}
          trend="up"
          trendValue={12}
          color="primary"
          delay="100"
        />
        <StatCard
          title="Pedestrians"
          value={totals.pedestrians}
          icon={Users}
          trend="up"
          trendValue={8}
          color="green"
          delay="200"
        />
        <StatCard
          title="Cyclists"
          value={totals.cyclists}
          icon={Bike}
          trend="down"
          trendValue={3}
          color="amber"
          delay="300"
        />
        <StatCard
          title="Active Cameras"
          value={totals.activeCameras}
          icon={Camera}
          color="primary"
          delay="400"
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map - takes 2 columns */}
        <div className="lg:col-span-2">
          <Card className="h-[500px]">
            <Card.Header>
              <Card.Title>Live Traffic Map</Card.Title>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-traffic-low" />
                  <span className="text-gray-400">Low</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-traffic-medium" />
                  <span className="text-gray-400">Medium</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-traffic-high" />
                  <span className="text-gray-400">High</span>
                </div>
              </div>
            </Card.Header>
            <Card.Content className="h-[420px] -mx-6 -mb-6">
              <TrafficMap height="100%" />
            </Card.Content>
          </Card>
        </div>

        {/* Camera list - takes 1 column */}
        <div className="lg:col-span-1 max-h-[500px] overflow-y-auto pr-2">
          <CameraList limit={3} />
        </div>
      </div>

      {/* Traffic chart */}
      <TrafficChart title="24-Hour Traffic Overview" />
    </div>
  )
}

export default Dashboard
