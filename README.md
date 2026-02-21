# 🌆 Urban Digital Twin

> Real-Time Traffic State Estimation Using Deep Learning and Live Camera Feeds for Urban Digital Twins

A modern React dashboard for monitoring real-time traffic data from Newcastle Urban Observatory cameras.

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## 📸 Screenshots

The dashboard includes:
- **Dashboard** - Overview with stats, map, and live camera feeds
- **Cameras** - Detailed view of all traffic cameras
- **Analytics** - Charts and insights from traffic data
- **Settings** - Configure dashboard preferences

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or extract the project
cd urban-digital-twin

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
urban-digital-twin/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Generic components (Card, Badge, StatCard)
│   │   ├── layout/          # Layout components (Sidebar, Header)
│   │   ├── map/             # Map components (TrafficMap)
│   │   ├── charts/          # Chart components (TrafficChart)
│   │   ├── camera/          # Camera components (CameraCard, CameraList)
│   │   └── index.js         # Component exports
│   ├── context/             # React Context (TrafficContext)
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── CameraView.jsx   # Camera management
│   │   ├── Analytics.jsx    # Analytics & charts
│   │   └── Settings.jsx     # App settings
│   ├── styles/              # Global CSS & Tailwind
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Root component
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🧩 Component Architecture

### Common Components

| Component | Description |
|-----------|-------------|
| `Card` | Base card with optional glow effect |
| `Badge` | Status badges (green/amber/red/gray) |
| `StatCard` | Statistics card with icon and trend |

### Layout Components

| Component | Description |
|-----------|-------------|
| `Layout` | Main app layout wrapper |
| `Sidebar` | Navigation sidebar |
| `Header` | Top header with search and actions |

### Feature Components

| Component | Description |
|-----------|-------------|
| `TrafficMap` | Interactive Leaflet map with markers |
| `TrafficChart` | Area chart for traffic over time |
| `CameraCard` | Individual camera display |
| `CameraList` | List of camera cards |

## 🎨 Design System

### Colors

```css
/* Primary */
--primary-500: #33a5ff;

/* Traffic Status */
--traffic-low: #22c55e;    /* Green */
--traffic-medium: #f59e0b; /* Amber */
--traffic-high: #ef4444;   /* Red */

/* Dark Theme */
--dark-bg: #0a0f1a;
--dark-card: #111827;
--dark-border: #1f2937;
```

### Typography

- **Display Font**: Space Grotesk (headings)
- **Body Font**: DM Sans (text)
- **Mono Font**: JetBrains Mono (code/numbers)

## 🔌 API Integration (Future)

The app is ready to connect to your FastAPI backend:

```javascript
// src/context/TrafficContext.jsx

// Replace mock data with API calls:
const fetchCameras = async () => {
  const response = await fetch('http://localhost:8000/api/cameras')
  const data = await response.json()
  setCameras(data)
}
```

### Expected API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/cameras` | GET | List all cameras |
| `/api/cameras/{id}` | GET | Get camera details |
| `/api/cameras/{id}/detections` | GET | Get detection data |
| `/api/metrics` | GET | Get aggregated metrics |
| `/api/metrics/historical` | GET | Get historical data |

## 🛠️ Technologies

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **Vite** | Build tool |
| **React Router** | Navigation |
| **Tailwind CSS** | Styling |
| **Recharts** | Charts |
| **Leaflet** | Maps |
| **Lucide React** | Icons |
| **date-fns** | Date formatting |
| **clsx** | Class names |

## 📝 Development Notes

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/components/layout/Sidebar.jsx`

### Adding a New Component

1. Create component in appropriate `src/components/` subfolder
2. Export from `src/components/index.js`
3. Import where needed

### Customizing Theme

Edit `tailwind.config.js` to modify:
- Colors
- Fonts
- Animations
- Shadows

## 🔜 Next Steps (Backend Integration)

1. **Set up FastAPI backend** with endpoints
2. **Connect to Urban Observatory API** for real camera data
3. **Implement YOLOv8 detection** pipeline
4. **Store results in PostgreSQL**
5. **Replace mock data** with real API calls

## 👤 Author

**Sumit Malviya** - MSc Advanced Computer Science  
Northumbria University  
Supervisor: Dr. Jason Moore

## 📄 License

This project is part of the MSc dissertation: "Real-Time Traffic State Estimation Using Deep Learning and Live Camera Feeds for Urban Digital Twins"

---

Built with ❤️ for Newcastle Urban Observatory
