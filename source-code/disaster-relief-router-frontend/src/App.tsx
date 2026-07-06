import { Sidebar } from './components/layout/Sidebar'
import { Topbar } from './components/layout/Topbar'
import { Dashboard } from './pages/Dashboard'
import { Incidents } from './pages/Incidents'
import { Resources } from './pages/Resources'
import { Teams } from './pages/Teams'
import { Notifications } from './pages/Notifications'
import { Analytics } from './pages/Analytics'
import { Settings } from './pages/Settings'
import { useAppStore } from './store'

const PAGE_MAP: Record<string, React.ComponentType> = {
  dashboard: Dashboard,
  incidents: Incidents,
  resources: Resources,
  teams: Teams,
  notifications: Notifications,
  analytics: Analytics,
  settings: Settings,
}

export default function App() {
  const { activePage } = useAppStore()
  const PageComponent = PAGE_MAP[activePage] || Dashboard

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#020817', color: 'white' }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 min-h-0">
        <Topbar />
        <main className="flex-1 min-h-0 overflow-y-auto" style={{ background: '#020817' }}>
          <PageComponent />
        </main>
      </div>
    </div>
  )
}