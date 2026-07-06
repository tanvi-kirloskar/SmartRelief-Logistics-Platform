import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, ShieldCheck, UserCheck, Brain, FileText } from 'lucide-react'
import { useAppStore } from '../../store'

export function IncidentAnalysis() {
  const { analysisResult, workflowComplete, workflowRunning } = useAppStore()

  return (
    <div className="rounded-xl p-5 h-full flex flex-col" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Brain size={13} className="text-info" />
        <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">Incident Analysis</span>
      </div>

      {!workflowComplete && !workflowRunning && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white/20 text-xs text-center">Submit an incident to begin analysis</p>
        </div>
      )}

      {workflowRunning && !workflowComplete && (
        <div className="flex-1 flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
          <span className="text-xs text-white/40">Agents processing...</span>
        </div>
      )}

      <AnimatePresence>
        {workflowComplete && analysisResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-3 flex-1 overflow-y-auto"
          >
            {/* Critical severity */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-lg p-3"
              style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <div className="text-[10px] font-bold text-danger tracking-widest mb-1">
                {analysisResult.severity}
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">
                Incident Type: {analysisResult.incidentType}
                <br />
                Location: {analysisResult.location}
              </p>
            </motion.div>

            {/* Security */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-lg p-3"
              style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)' }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <ShieldCheck size={11} className="text-warning" />
                <span className="text-[10px] font-bold text-warning tracking-widest">SECURITY RISK</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed">{analysisResult.securityNotes.length > 0
                ? analysisResult.securityNotes.join(", ")
                : "No security issues reported."}</p>
            </motion.div>

            {/* AI Reasoning */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-lg p-3"
              style={{
                background: 'rgba(59,130,246,0.06)',
                border: '1px solid rgba(59,130,246,0.15)',
              }}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Brain size={11} className="text-info" />
                <span className="text-[10px] font-bold tracking-widest text-info">
                  AI REASONING
                </span>
              </div>

              <p className="text-[11px] text-white/70 leading-relaxed">
                {analysisResult.reasoning}
              </p>
            </motion.div>

            {/* Security Sanitization */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28 }}
                className="rounded-lg p-3"
                style={{
                  background: 'rgba(34,197,94,0.06)',
                  border: '1px solid rgba(34,197,94,0.15)',
                }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <FileText size={11} className="text-accent" />
                  <span className="text-[10px] font-bold tracking-widest text-accent">
                    SECURITY SANITIZATION
                  </span>
                </div>

                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-2">
                  Sensitive information automatically removed before AI processing
                </p>

                <div
                  className="mt-3 rounded-lg p-3 text-[11px] leading-7 whitespace-pre-wrap"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                  }}
                >
                  {analysisResult.redactedReport}
                </div>
              </motion.div>

            {/* Approved */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-lg p-3"
              style={{
                background: 'rgba(34,197,94,0.06)',
                border: '1px solid rgba(34,197,94,0.15)',
              }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <UserCheck size={11} className="text-accent" />

                <span className="text-[10px] font-bold text-accent tracking-widest">
                  HUMAN REVIEW
                </span>
              </div>

              <p className="text-[11px] text-white/70 leading-relaxed">
                Status:{" "}
                <span className="font-semibold">
                  {analysisResult.humanReviewRequired
                    ? "Dispatcher Review Required"
                    : "Not Required"}
                </span>
              </p>
            </motion.div>

            </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}