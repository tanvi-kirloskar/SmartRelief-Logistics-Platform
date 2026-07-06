import { motion } from 'framer-motion'
import { Users, Heart, Building2, Stethoscope } from 'lucide-react'
import { teams } from '../data'
import type { TeamStatus } from '../types'

const STATUS_STYLES: Record<TeamStatus, { bg: string, color: string, label: string }> = {
  available: { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', label: 'Available' },
  deployed: { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', label: 'Deployed' },
  offline: { bg: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)', label: 'Offline' },
}

const TYPE_ICONS = { rescue: Users, medical: Stethoscope, ngo: Heart, hospital: Building2 }
const TYPE_COLORS = { rescue: '#22c55e', medical: '#3b82f6', ngo: '#f59e0b', hospital: '#8b5cf6' }
const TYPE_LABELS = { rescue: 'Rescue', medical: 'Medical', ngo: 'NGO', hospital: 'Field Hospital' }

const SECTIONS = [
  { key: 'rescue', label: 'Rescue Teams' },
  { key: 'medical', label: 'Medical Teams' },
  { key: 'ngo', label: 'NGO Partners' },
  { key: 'hospital', label: 'Field Hospitals' },
]

export function Teams() {
  return (
    <div className="p-5 flex flex-col gap-5 overflow-y-auto h-full">
      <div className="flex items-center gap-2">
        <Users size={16} className="text-info" />
        <h1 className="text-sm font-semibold text-white">Team Management</h1>
        <span className="px-2 py-0.5 rounded-full text-[10px] bg-info/10 text-info border border-info/20 font-bold">
          {teams.length} Units
        </span>
      </div>

      {SECTIONS.map(section => {
        const sectionTeams = teams.filter(t => t.type === section.key)
        if (!sectionTeams.length) return null
        const color = TYPE_COLORS[section.key as keyof typeof TYPE_COLORS]
        const Icon = TYPE_ICONS[section.key as keyof typeof TYPE_ICONS]
        return (
          <div key={section.key}>
            <div className="flex items-center gap-2 mb-3">
              <Icon size={13} style={{ color }} />
              <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">{section.label}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: `${color}15`, color }}>
                {sectionTeams.length}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {sectionTeams.map((team, i) => {
                const status = STATUS_STYLES[team.status]
                return (
                  <motion.div key={team.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-xl p-4"
                    style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}
                    whileHover={{ borderColor: `${color}30` }}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{team.name}</div>
                        <div className="text-[11px] text-white/40 mt-0.5">{team.location}</div>
                      </div>
                      <span className="px-2 py-1 rounded-full text-[10px] font-bold"
                        style={{ background: status.bg, color: status.color, border: `1px solid ${status.color}30` }}>
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="text-white/40">Lead: <span className="text-white/70">{team.lead}</span></div>
                      <div className="text-white/40">{team.members} members</div>
                    </div>
                    <div className="text-[10px] text-white/25 mt-2">Updated {team.lastUpdate}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
