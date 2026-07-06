import { motion } from 'framer-motion'
import { Bell, AlertCircle, AlertTriangle, Info, CheckCircle, Cloud } from 'lucide-react'
import { useAppStore } from '../store'

const TYPE_CONFIG = {
  medical: { icon: AlertCircle, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)' },
  resource: { icon: AlertTriangle, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  weather: { icon: Cloud, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  route: { icon: CheckCircle, color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
  team: { icon: Info, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
}

export function Notifications() {
  const { notifications, markRead } = useAppStore()

  return (
    <div className="p-5 flex flex-col gap-5 overflow-y-auto h-full">
      <div className="flex items-center gap-2">
        <Bell size={16} className="text-warning" />
        <h1 className="text-sm font-semibold text-white">Live Notifications</h1>
        <span className="px-2 py-0.5 rounded-full text-[10px] bg-danger/10 text-danger border border-danger/20 font-bold">
          {notifications.filter(n => !n.read).length} Unread
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {notifications.map((n, i) => {
          const cfg = TYPE_CONFIG[n.type]
          const Icon = cfg.icon
          return (
            <motion.div key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded-xl p-4 cursor-pointer transition-all"
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, opacity: n.read ? 0.6 : 1 }}
              onClick={() => markRead(n.id)}>
              <div className="flex items-start gap-3">
                <Icon size={16} className="mt-0.5 flex-shrink-0" style={{ color: cfg.color }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="text-xs font-bold tracking-wider" style={{ color: cfg.color }}>{n.title}</span>
                    <span className="text-[11px] text-white/30 flex-shrink-0">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">{n.message}</p>
                </div>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: cfg.color }} />
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
