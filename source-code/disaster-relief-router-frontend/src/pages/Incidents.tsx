import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Filter, Search } from 'lucide-react'
import { incidents } from '../data'
import type { Severity, IncidentStatus } from '../types'

const SEVERITY_COLORS: Record<Severity, string> = {
  CRITICAL: '#ef4444', HIGH: '#f59e0b', MEDIUM: '#3b82f6', LOW: '#22c55e'
}
const STATUS_COLORS: Record<IncidentStatus, string> = {
  ACTIVE: '#ef4444', IN_PROGRESS: '#f59e0b', PENDING: '#3b82f6', RESOLVED: '#22c55e'
}

export function Incidents() {
  const [search, setSearch] = useState('')
  const [severityFilter, setSeverityFilter] = useState<string>('ALL')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')

  const filtered = incidents.filter(inc => {
    const matchSearch = inc.location.toLowerCase().includes(search.toLowerCase()) ||
      inc.type.toLowerCase().includes(search.toLowerCase())
    const matchSev = severityFilter === 'ALL' || inc.severity === severityFilter
    const matchStat = statusFilter === 'ALL' || inc.status === statusFilter
    return matchSearch && matchSev && matchStat
  })

  return (
    <div className="p-5 flex flex-col gap-5 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle size={16} className="text-warning" />
          <h1 className="text-sm font-semibold text-white">Active Incidents</h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-danger/10 text-danger border border-danger/20 font-bold">
            {incidents.length} Total
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-lg"
          style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}>
          <Search size={13} className="text-white/30" />
          <input className="bg-transparent text-xs text-white/70 outline-none flex-1 placeholder:text-white/20"
            placeholder="Search by location or type..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-white/30" />
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(s => (
            <button key={s} onClick={() => setSeverityFilter(s)}
              className="px-2.5 py-1.5 rounded text-[10px] font-medium transition-all"
              style={severityFilter === s ? {
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e'
              } : { background: '#081221', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="grid text-[10px] font-semibold tracking-widest text-white/30 uppercase px-5 py-3"
          style={{ gridTemplateColumns: '100px 1fr 140px 90px 100px 1fr', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span>Incident ID</span>
          <span>Location</span>
          <span>Type</span>
          <span>Severity</span>
          <span>Status</span>
          <span>Timestamp</span>
        </div>

        {filtered.map((inc, i) => (
          <motion.div key={inc.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="grid px-5 py-3.5 items-center hover:bg-white/[0.02] cursor-pointer transition-colors"
            style={{ gridTemplateColumns: '100px 1fr 140px 90px 100px 1fr', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
            <span className="text-xs font-mono text-accent/70">{inc.id}</span>
            <span className="text-xs text-white/80 font-medium">{inc.location}</span>
            <span className="text-xs text-white/50">{inc.type}</span>
            <span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold"
                style={{ background: `${SEVERITY_COLORS[inc.severity]}15`, color: SEVERITY_COLORS[inc.severity], border: `1px solid ${SEVERITY_COLORS[inc.severity]}30` }}>
                {inc.severity}
              </span>
            </span>
            <span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium"
                style={{ background: `${STATUS_COLORS[inc.status]}15`, color: STATUS_COLORS[inc.status] }}>
                {inc.status.replace('_', ' ')}
              </span>
            </span>
            <span className="text-[11px] text-white/30">
              {new Date(inc.timestamp).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
