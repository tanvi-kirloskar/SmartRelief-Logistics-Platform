import { motion, AnimatePresence } from 'framer-motion'
import { Package, Users, Truck, Building2, Heart, Stethoscope, Shield } from 'lucide-react'
import { useAppStore } from '../../store'

// Best-effort icon matching from resource name keywords
function getResourceIcon(name: string) {
  const n = name.toLowerCase()
  if (n.includes('rescue') || n.includes('team'))     return Users
  if (n.includes('truck') || n.includes('vehicle'))   return Truck
  if (n.includes('hospital') || n.includes('field'))  return Building2
  if (n.includes('ngo') || n.includes('partner'))     return Heart
  if (n.includes('medical') || n.includes('kit'))     return Stethoscope
  if (n.includes('police') || n.includes('security')) return Shield
  return Package
}

export function ResourceDeployment() {
  const analysisResult = useAppStore(state => state.analysisResult)
  const workflowComplete = useAppStore(state => state.workflowComplete)
  const workflowRunning = useAppStore(state => state.workflowRunning)
  const resources = analysisResult?.resources ?? []

  return (
    <div className="rounded-xl p-5" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">Recommended Resources</span>
        <button className="text-[11px] text-accent hover:underline">View All →</button>
      </div>

      {/* Idle — before first analysis */}
      {!workflowComplete && !workflowRunning && (
        <div className="flex items-center justify-center py-8">
          <p className="text-white/20 text-xs">Resources appear after analysis</p>
        </div>
      )}

      {/* Processing */}
      {workflowRunning && !workflowComplete && (
        <div className="flex items-center justify-center py-8 gap-2">
          <div className="w-3 h-3 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          <span className="text-xs text-white/30">Loading resources...</span>
        </div>
      )}

      {/* analysisResult.resources — one card per string from backend */}
      <AnimatePresence>
        {workflowComplete && resources.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
            {resources.map((name, i) => {
              const Icon = getResourceIcon(name)
              return (
                <motion.div
                  key={`${name}-${i}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                    <Icon size={14} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-white/80">{name}</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-accent/10 text-accent">
                        Recommended
                      </span>
                    </div>
                    <div className="h-1 rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ delay: i * 0.06 + 0.2, duration: 0.5 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No resources edge case */}
      {workflowComplete && resources.length === 0 && (
        <p className="text-white/20 text-xs text-center py-4">No resources recommended</p>
      )}
    </div>
  )
}