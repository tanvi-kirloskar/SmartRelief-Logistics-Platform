import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, AlertTriangle, Info, CheckCircle, Cloud } from 'lucide-react'
import { useAppStore } from '../../store'

const TYPE_CONFIG = {
  medical: { icon: AlertCircle, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)' },
  resource: { icon: AlertTriangle, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  weather: { icon: Cloud, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  route: { icon: CheckCircle, color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
  team: { icon: Info, color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
}

export function NotificationCenter({ limit = 4 }: { limit?: number }) {
  const { notifications, markRead } = useAppStore()
  const displayed = notifications.slice(0, limit)

  return (
    <div className="rounded-xl p-5 h-full flex flex-col" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">Notifications</span>
        <button className="text-[11px] text-accent hover:underline">View All →</button>
      </div>

      <div className="flex flex-col gap-2.5 overflow-y-auto flex-1">
        <AnimatePresence>
          {displayed.map((n, i) => {
            const cfg = TYPE_CONFIG[n.type]
            const Icon = cfg.icon
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-lg p-3 cursor-pointer transition-all"
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, opacity: n.read ? 0.7 : 1 }}
                onClick={() => markRead(n.id)}
              >
                <div className="flex items-start gap-2">
                  <Icon size={13} className="mt-0.5 flex-shrink-0" style={{ color: cfg.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold tracking-wider" style={{ color: cfg.color }}>
                        {n.title}
                      </span>
                      <span className="text-[10px] text-white/30 flex-shrink-0">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed mt-0.5">{n.message}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
