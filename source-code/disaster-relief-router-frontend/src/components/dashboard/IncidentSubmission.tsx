import { motion } from 'framer-motion'
import { Zap, Activity } from 'lucide-react'
import { useAppStore } from '../../store'
import { SAMPLE_INCIDENTS } from '../../data'

const TYPES = ['Building Collapse', 'Flood Rescue', 'Medical Emergency', 'Shelter Overcrowding', 'Custom']

export function IncidentSubmission() {
  const {
    incidentType, setIncidentType,
    incidentDescription, setIncidentDescription,
    triggerWorkflow, workflowRunning,
  } = useAppStore()

  const handleTypeChange = (type: string) => {
    setIncidentType(type)
    if (type !== 'Custom') {
      setIncidentDescription(SAMPLE_INCIDENTS[type] || '')
    } else {
      setIncidentDescription('')
    }
  }

  return (
    <div className="rounded-xl p-5" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap size={15} className="text-accent" />
          <h2 className="text-sm font-semibold text-white">New Incident Report</h2>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-semibold"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#22c55e' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Live Mode
        </div>
      </div>

      {/* Type selector */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {TYPES.map(type => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className="px-3 py-1.5 rounded text-xs font-medium transition-all"
            style={incidentType === type ? {
              background: 'rgba(34, 197, 94, 0.15)',
              border: '1px solid rgba(34, 197, 94, 0.5)',
              color: '#22c55e',
            } : {
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Description + Button */}
      <div className="flex gap-3">
        <textarea
          value={incidentDescription}
          onChange={e => setIncidentDescription(e.target.value)}
          placeholder="Describe the incident..."
          rows={3}
          className="flex-1 rounded-lg px-4 py-3 text-sm text-white/80 resize-none outline-none"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        />
        <motion.button
          onClick={triggerWorkflow}
          disabled={workflowRunning || !incidentDescription.trim()}
          className="w-36 h-full rounded-xl flex flex-col items-center justify-center gap-2 font-semibold text-sm transition-all disabled:opacity-50"
          style={{
            background: workflowRunning ? 'rgba(34, 197, 94, 0.2)' : '#22c55e',
            color: workflowRunning ? '#22c55e' : '#020817',
            border: workflowRunning ? '1px solid rgba(34,197,94,0.4)' : 'none',
            minHeight: '80px',
          }}
          whileHover={!workflowRunning ? { scale: 1.02, boxShadow: '0 0 20px rgba(34,197,94,0.4)' } : {}}
          whileTap={!workflowRunning ? { scale: 0.98 } : {}}
        >
          {workflowRunning ? (
            <>
              <Activity size={20} className="animate-pulse" />
              <span className="text-xs">Analyzing...</span>
            </>
          ) : (
            <>
              <Activity size={20} />
              <span>Analyze Incident</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}
