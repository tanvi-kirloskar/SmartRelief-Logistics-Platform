import { motion } from 'framer-motion'
import { AlertCircle, Shield, Truck, Bell } from 'lucide-react'
import { useAppStore } from '../../store'
//Added externally 
// import { overviewStats } from '../../data'
// import { systemMetrics } from '../../data'

export function OverviewCards() {
  const { analysisResult, workflowComplete } = useAppStore()

  const severityColor = analysisResult?.severity === 'CRITICAL' ? '#ef4444'
    : analysisResult?.severity === 'HIGH' ? '#f59e0b'
    : analysisResult?.severity === 'MEDIUM' ? '#3b82f6' : '#22c55e'

  const severityLevel = analysisResult?.severity === 'CRITICAL' ? 5
    : analysisResult?.severity === 'HIGH' ? 4
    : analysisResult?.severity === 'MEDIUM' ? 3 : 2

  const analysis = useAppStore(state => state.analysisResult)
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">Incident Overview</span>
        <button className="text-[11px] text-accent hover:underline">View All →</button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {/* Severity */}
        <motion.div className="rounded-xl p-4" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}
          whileHover={{ borderColor: 'rgba(239,68,68,0.3)', boxShadow: '0 0 20px rgba(239,68,68,0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">Severity</span>
            <AlertCircle size={14} className="text-danger" />
          </div>
          <div className="text-xl font-bold mb-1" style={{ color: workflowComplete ? severityColor : '#ef4444' }}>
            {workflowComplete ? analysisResult?.severity : 'CRITICAL'}
          </div>
          <div className="w-full h-1 rounded-full bg-white/10 mt-3">
            <motion.div
              className="h-full rounded-full"
              style={{ background: severityColor }}
              initial={{ width: '80%' }}
              animate={{ width: `${(severityLevel / 5) * 100}%` }}
            />
          </div>
          <div className="text-[10px] text-white/30 mt-1.5">Level {severityLevel} / 5</div>
        </motion.div>

        {/* Security */}
        <motion.div className="rounded-xl p-4" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}
          whileHover={{ borderColor: 'rgba(34,197,94,0.3)', boxShadow: '0 0 20px rgba(34,197,94,0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">Security</span>
            <Shield size={14} className="text-accent" />
          </div>
          <div className="text-xl font-bold text-accent mb-2">
            {workflowComplete ? analysisResult?.securityStatus : 'PASSED'}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-white/50">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {analysisResult?.securityNotes?.length || 0} Security Notes
          </div>

          <div className="text-[11px] text-white/40 mt-1">
            {analysisResult?.securityStatus === 'PASSED'
              ? 'All Checkpoints Clear'
              : 'Security Review Required'}
          </div>

        </motion.div>

        {/* Resources */}
        <motion.div className="rounded-xl p-4" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}
          whileHover={{ borderColor: 'rgba(59,130,246,0.3)', boxShadow: '0 0 20px rgba(59,130,246,0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">Resources</span>
            <Truck size={14} className="text-info" />
          </div>

          <div className="text-xl font-bold text-white">
            {analysisResult?.resources?.length || 0}
          </div>

          <div className="w-full h-1 rounded-full bg-white/10 mt-3">
            <div
              className="h-full rounded-full bg-warning"
              style={{
                width: `${Math.min((analysisResult?.resources?.length || 0) * 25, 100)}%`,
              }}
            />
          </div>
          <div className="text-[11px] text-warning mt-1.5">{analysisResult?.resources?.length || 0} Resources Recommended</div>
        </motion.div>

        {/* Alerts */}
        <motion.div className="rounded-xl p-4" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}
          whileHover={{ borderColor: 'rgba(245,158,11,0.3)', boxShadow: '0 0 20px rgba(245,158,11,0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">Alerts</span>
            <Bell size={14} className="text-warning" />
          </div>
          <div className="text-xl font-bold text-white">
          {analysisResult?.notifications?.length || 0}
          </div>
          <div className="text-[11px] text-white/40 mt-3">
          {analysisResult?.notifications?.length || 0} Notifications Generated
          </div>
        </motion.div>
      </div>
    </div>
  )
}
