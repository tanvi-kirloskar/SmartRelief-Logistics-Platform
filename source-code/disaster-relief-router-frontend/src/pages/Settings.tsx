import { Settings as SettingsIcon, Bell, Map, Shield, Database, Monitor } from 'lucide-react'

const SETTING_GROUPS = [
  {
    icon: Monitor, label: 'Display', settings: [
      { key: 'theme', label: 'Interface Theme', value: 'Dark (EOC)' },
      { key: 'density', label: 'Data Density', value: 'Compact' },
      { key: 'animations', label: 'Animations', value: true },
    ]
  },
  {
    icon: Bell, label: 'Notifications', settings: [
      { key: 'critical_sound', label: 'Critical Alert Sound', value: true },
      { key: 'workflow_sound', label: 'Workflow Complete Sound', value: true },
      { key: 'notif_sound', label: 'Notification Sound', value: false },
    ]
  },
  {
    icon: Map, label: 'Map Settings', settings: [
      { key: 'map_tile', label: 'Map Style', value: 'Dark Tactical' },
      { key: 'auto_center', label: 'Auto-center on Incident', value: true },
      { key: 'pulse_markers', label: 'Animated Markers', value: true },
    ]
  },
  {
    icon: Shield, label: 'Security', settings: [
      { key: 'auto_logout', label: 'Auto Logout', value: '30 min' },
      { key: 'audit_log', label: 'Audit Logging', value: true },
    ]
  },
  {
    icon: Database, label: 'Data', settings: [
      { key: 'refresh_rate', label: 'Live Data Refresh', value: '10s' },
      { key: 'retention', label: 'Data Retention', value: '90 days' },
    ]
  },
]

export function Settings() {
  return (
    <div className="p-5 flex flex-col gap-5 overflow-y-auto h-full">
      <div className="flex items-center gap-2">
        <SettingsIcon size={16} className="text-white/50" />
        <h1 className="text-sm font-semibold text-white">System Settings</h1>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {SETTING_GROUPS.map(group => {
          const Icon = group.icon
          return (
            <div key={group.label} className="rounded-xl p-5" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Icon size={13} className="text-accent" />
                <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">{group.label}</span>
              </div>
              <div className="flex flex-col gap-3">
                {group.settings.map(s => (
                  <div key={s.key} className="flex items-center justify-between">
                    <span className="text-xs text-white/60">{s.label}</span>
                    {typeof s.value === 'boolean' ? (
                      <div className="w-9 h-5 rounded-full relative cursor-pointer"
                        style={{ background: s.value ? '#22c55e' : 'rgba(255,255,255,0.1)' }}>
                        <div className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                          style={{ left: s.value ? '18px' : '2px' }} />
                      </div>
                    ) : (
                      <span className="text-[11px] px-2 py-1 rounded text-white/60"
                        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        {s.value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl p-4 flex items-center justify-between"
        style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)' }}>
        <div>
          <div className="text-xs font-semibold text-white/80">Backend Connection</div>
          <div className="text-[11px] text-white/40 mt-0.5">Python Multi-Agent System · ws://localhost:8000</div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs text-accent font-semibold">Connected</span>
        </div>
      </div>
    </div>
  )
}
