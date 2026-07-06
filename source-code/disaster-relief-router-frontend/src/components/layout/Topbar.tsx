import { useEffect } from 'react'
import { Radio, Clock, RefreshCw } from 'lucide-react'
import { useAppStore } from '../../store'

export function Topbar() {
  const { systemTime, setSystemTime } = useAppStore()

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString('en-IN', { hour12: false }))
    }, 1000)
    return () => clearInterval(interval)
  }, [setSystemTime])

  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

  return (
    <div className="h-[52px] flex items-center px-5 gap-4 flex-shrink-0"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#020817' }}>
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Radio size={14} className="text-accent" />
        <span className="text-xs font-semibold tracking-widest text-white/80 uppercase">
          Disaster Relief Logistics Router
        </span>
        <span className="text-white/20">|</span>
        <span className="text-xs text-white/40">Emergency Operations Command Center</span>
      </div>

      <div className="flex-1" />

      {/* Status */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="text-xs font-semibold text-accent">All Systems Operational</span>
      </div>

      {/* Time */}
      <div className="flex items-center gap-2 text-white/50">
        <Clock size={13} />
        <span className="text-xs font-mono">{systemTime} {today}</span>
      </div>

      <RefreshCw size={13} className="text-white/30 hover:text-white/60 cursor-pointer transition-colors" />
    </div>
  )
}
