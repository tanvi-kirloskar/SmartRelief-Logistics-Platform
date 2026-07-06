import { motion, AnimatePresence } from 'framer-motion'
import { Check, Clock, Loader, ChevronRight } from 'lucide-react'
import { useAppStore } from '../../store'

export function WorkflowTimeline() {
  const { agents, workflowRunning, workflowComplete } = useAppStore()

  const hasStarted = agents.some(a => a.status !== 'pending')

  if (!hasStarted) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-5"
      style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">Workflow Progress Timeline</span>
        {workflowRunning && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent/10 text-accent border border-accent/20 blink">
            LIVE
          </span>
        )}
        {workflowComplete && (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-info/10 text-info border border-info/20">
            COMPLETE
          </span>
        )}
      </div>

      <div className="flex items-center gap-0">
        {agents.map((agent, i) => (
          <div key={agent.id} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center gap-2 flex-1">
              {/* Circle */}
              <div className="relative">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center relative"
                  style={{
                    background: agent.status === 'completed' ? 'rgba(34,197,94,0.1)'
                      : agent.status === 'processing' ? 'rgba(245,158,11,0.1)'
                      : 'rgba(255,255,255,0.04)',
                    border: agent.status === 'completed' ? '2px solid #22c55e'
                      : agent.status === 'processing' ? '2px solid #f59e0b'
                      : '2px solid rgba(255,255,255,0.1)',
                  }}
                  animate={agent.status === 'processing' ? { boxShadow: ['0 0 0 0 rgba(245,158,11,0.4)', '0 0 0 8px rgba(245,158,11,0)', '0 0 0 0 rgba(245,158,11,0)'] } : {}}
                  transition={agent.status === 'processing' ? { duration: 1.2, repeat: Infinity } : {}}
                >
                  {agent.status === 'completed' && <Check size={16} className="text-accent" />}
                  {agent.status === 'processing' && (
                    <Loader size={16} className="text-warning animate-spin" />
                  )}
                  {agent.status === 'pending' && <Clock size={16} className="text-white/20" />}
                </motion.div>
              </div>

              {/* Label */}
              <div className="text-center">
                <div className={`text-[11px] font-semibold leading-tight ${
                  agent.status === 'completed' ? 'text-white/80'
                  : agent.status === 'processing' ? 'text-warning'
                  : 'text-white/30'
                }`}>
                  {agent.name}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={agent.status}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`text-[10px] mt-0.5 ${
                      agent.status === 'completed' ? 'text-accent'
                      : agent.status === 'processing' ? 'text-warning/70'
                      : 'text-white/20'
                    }`}
                  >
                    {agent.status === 'completed' ? 'Completed'
                      : agent.status === 'processing' ? 'Processing...'
                      : 'Pending'}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Connector */}
            {i < agents.length - 1 && (
              <div className="flex-shrink-0 mb-5">
                <div className="w-6 h-px relative overflow-hidden">
                  <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  {agent.status === 'completed' && (
                    <motion.div
                      className="absolute inset-0 bg-accent"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
