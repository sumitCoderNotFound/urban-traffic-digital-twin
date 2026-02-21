import { Routes, Route } from 'react-router-dom'
import { TrafficProvider } from './context/TrafficContext'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import CameraView from './pages/CameraView'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

function App() {
  return (
    <TrafficProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cameras" element={<CameraView />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </TrafficProvider>
  )
}

export default App
