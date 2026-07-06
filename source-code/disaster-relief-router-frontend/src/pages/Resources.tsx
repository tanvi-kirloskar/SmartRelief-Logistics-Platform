import { motion } from 'framer-motion'
import { Package, Users, Truck, Building2, Heart } from 'lucide-react'
import { resources } from '../data'

const ICON_MAP: Record<string, any> = { rescue: Users, ambulance: Truck, medical: Package, hospital: Building2, truck: Truck, ngo: Heart }

export function Resources() {
  return (
    <div className="p-5 flex flex-col gap-5 overflow-y-auto h-full">
      <div className="flex items-center gap-2">
        <Package size={16} className="text-warning" />
        <h1 className="text-sm font-semibold text-white">Resource Deployment</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {resources.map((r, i) => {
          const Icon = ICON_MAP[r.type] || Package
          const total = r.available + r.assigned + r.inTransit
          return (
            <motion.div key={r.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }} className="rounded-xl p-5"
              style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                    <Icon size={18} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{r.label}</div>
                    <div className="text-[11px] text-white/40">{total} Total</div>
                  </div>
                </div>
                <span className="text-2xl font-bold text-white">{r.available + r.assigned}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Available', value: r.available, color: '#22c55e' },
                  { label: 'Assigned', value: r.assigned, color: '#f59e0b' },
                  { label: 'In Transit', value: r.inTransit, color: '#3b82f6' },
                ].map(stat => (
                  <div key={stat.label} className="rounded-lg p-2 text-center"
                    style={{ background: `${stat.color}08`, border: `1px solid ${stat.color}20` }}>
                    <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-[10px] text-white/40">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
