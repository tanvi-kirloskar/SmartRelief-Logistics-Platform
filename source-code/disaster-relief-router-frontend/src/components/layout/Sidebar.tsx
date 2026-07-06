import { motion } from 'framer-motion'
import { LayoutDashboard, AlertTriangle, Package, Users, Bell, BarChart3, Settings, Shield } from 'lucide-react'
import { useAppStore } from '../../store'

const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'incidents', icon: AlertTriangle, label: 'Incidents' },
  { id: 'resources', icon: Package, label: 'Resources' },
  { id: 'teams', icon: Users, label: 'Teams' },
  { id: 'notifications', icon: Bell, label: 'Notifications', badge: 3 },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  { id: 'settings', icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  const { activePage, setActivePage } = useAppStore()

  return (
    <div className="w-[60px] h-full bg-card flex flex-col items-center py-4 gap-1"
      style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Logo */}
      <div className="mb-6 w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center">
        <Shield size={18} className="text-accent" />
      </div>

      {/* Nav */}
      <div className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map(({ id, icon: Icon, label, badge }) => {
          const isActive = activePage === id
          return (
            <motion.button
              key={id}
              onClick={() => setActivePage(id)}
              className="relative w-10 h-10 rounded-lg flex items-center justify-center group transition-all"
              style={{
                background: isActive ? 'rgba(34, 197, 94, 0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid transparent',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={label}
            >
              <Icon
                size={18}
                className={isActive ? 'text-accent' : 'text-white/40 group-hover:text-white/70'}
              />
              {badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                  {badge}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 w-0.5 h-6 bg-accent rounded-r"
                  style={{ left: '-1px' }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
        <span className="text-xs font-bold text-accent">OP</span>
      </div>
    </div>
  )
}
