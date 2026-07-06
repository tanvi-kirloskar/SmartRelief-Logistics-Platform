import { create } from 'zustand'
import type { Agent, AnalysisResult, BackendResponse, Notification } from '../types'

// ─── Constants ────────────────────────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const AGENTS_TEMPLATE: Agent[] = [
  { id: 'intake',       name: 'Intake Agent',           status: 'pending' },
  { id: 'security',     name: 'Security Agent',          status: 'pending' },
  { id: 'severity',     name: 'Severity Agent',          status: 'pending' },
  { id: 'resource',     name: 'Resource Planner Agent',  status: 'pending' },
  { id: 'human',        name: 'Human Review Agent',      status: 'pending' },
  { id: 'notification', name: 'Notification Agent',      status: 'pending' },
]

// Agent animation timing (ms) — purely visual, independent of backend latency
const AGENT_DELAYS    = [300,  1100, 2000, 3100, 4200, 5100]
const AGENT_DURATIONS = [700,  800,  1000, 1000, 900,  700 ]

// ─── Helper: map raw backend response → AnalysisResult ────────────────────────

function mapBackendResponse(data: BackendResponse): AnalysisResult {

  const severityMap: Record<string, AnalysisResult['severity']> = {
    CRITICAL: 'CRITICAL',
    HIGH: 'HIGH',
    MEDIUM: 'MEDIUM',
    LOW: 'LOW',
  }

  const securityMap: Record<string, AnalysisResult['securityStatus']> = {
    PASSED: 'PASSED',
    FAILED: 'FAILED',
    REVIEWING: 'REVIEWING',
    FLAGGED: 'REVIEWING',
  }

  const reviewMap: Record<string, AnalysisResult['humanReview']> = {
    APPROVED: 'APPROVED',
    PENDING: 'PENDING',
    REJECTED: 'REJECTED',
    NOT_REQUIRED: 'APPROVED',
  }

  console.log("===== BACKEND RESPONSE =====")
  console.log(data)
  console.log("Recommended Resources:", data.recommended_resources)

  const mapped: AnalysisResult = {
    severity: severityMap[data.severity?.toUpperCase()] ?? 'HIGH',
    securityStatus:
      securityMap[data.security_status?.toUpperCase()] ?? 'PASSED',
    humanReview:
      reviewMap[data.review_status?.toUpperCase()] ?? 'PENDING',

    resources: data.recommended_resources ?? [],
    notifications: data.notifications ?? [],

    incidentType: data.incident_type ?? '',
    location: data.location ?? '',
    securityNotes: data.security_notes ?? [],
    humanReviewRequired: data.human_review_required ?? false,
    incidentId: data.incident_id ?? '',
    timestamp: data.timestamp ?? '',

    reasoning: data.reasoning ?? "",
    confidence: data.confidence ?? 0,
    redactedReport: data.redacted_report ?? "",
  }

  console.log("===== MAPPED RESULT =====")
  console.log(mapped)

  return mapped
}

// ─── Helper: derive notification type ───────────────────────────────────────

function deriveNotifType(msg: string): Notification['type'] {
  const u = msg.toUpperCase()

  if (u.includes('MEDICAL') || u.includes('HOSPITAL')) {
    return 'medical'
  }

  if (u.includes('RESOURCE') || u.includes('SUPPLY')) {
    return 'resource'
  }

  if (u.includes('WEATHER') || u.includes('STORM')) {
    return 'weather'
  }

  if (u.includes('ROUTE') || u.includes('ROAD') || u.includes('TRAFFIC')) {
    return 'route'
  }

  return 'team'
}

// ─── Helper: derive notification severity ───────────────────────────────────

function deriveNotifSeverity(msg: string): Notification['severity'] {
  const u = msg.toUpperCase()

  if (u.includes('CRITICAL') || u.includes('EMERGENCY')) {
    return 'critical'
  }

  if (u.includes('WARNING') || u.includes('ALERT')) {
    return 'warning'
  }

  if (u.includes('SUCCESS') || u.includes('CLEARED')) {
    return 'success'
  }

  return 'info'
}

// ─── Store interface ───────────────────────────────────────────────────────────

interface AppState {
  activePage: string
  setActivePage: (page: string) => void

  incidentType: string
  setIncidentType: (type: string) => void
  incidentDescription: string
  setIncidentDescription: (desc: string) => void

  agents: Agent[]
  workflowRunning: boolean
  workflowComplete: boolean
  workflowError: string | null
  analysisResult: AnalysisResult | null

  triggerWorkflow: () => void
  resetWorkflow: () => void

  notifications: Notification[]
  addNotification: (n: Notification) => void
  markRead: (id: string) => void

  mapFilters: { rescue: boolean; hospital: boolean; ngo: boolean; incident: boolean }
  toggleMapFilter: (key: 'rescue' | 'hospital' | 'ngo' | 'incident') => void

  systemTime: string
  setSystemTime: (t: string) => void
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useAppStore = create<AppState>((set, get) => ({
  activePage: 'dashboard',
  setActivePage: (page) => set({ activePage: page }),

  incidentType: 'Flood Rescue',
  setIncidentType: (type) => set({ incidentType: type }),
  incidentDescription: 'Severe flooding reported in multiple districts of Bihar and Assam. Approximately 12,000 residents displaced. Rescue operations initiated but additional resources required urgently.',
  setIncidentDescription: (desc) => set({ incidentDescription: desc }),

  agents: AGENTS_TEMPLATE.map(a => ({ ...a })),
  workflowRunning: false,
  workflowComplete: false,
  workflowError: null,
  analysisResult: null,

  triggerWorkflow: async () => {
    const { incidentType, incidentDescription } = get()

    // Reset state and start animation
    set({
      workflowRunning: true,
      workflowComplete: false,
      workflowError: null,
      analysisResult: null,
      agents: AGENTS_TEMPLATE.map(a => ({ ...a })),
    })

    // ── Fire backend request immediately (non-blocking) ──────────────────────
    const backendPromise = fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      report: incidentDescription,
      location: "Unknown",
    }),
    })
      .then(res => {
        if (!res.ok) throw new Error(`Backend error: ${res.status}`)
        return res.json() as Promise<BackendResponse>
      })

    // ── Run agent animations in parallel with the backend call ───────────────
    const animationDone = new Promise<void>(resolve => {
      AGENTS_TEMPLATE.forEach((agent, i) => {
        setTimeout(() => {
          set(state => ({
            agents: state.agents.map((a, idx) =>
              idx === i ? { ...a, status: 'processing' } : a
            ),
          }))
          setTimeout(() => {
            set(state => ({
              agents: state.agents.map((a, idx) =>
                idx === i ? { ...a, status: 'completed' } : a
              ),
            }))
            if (i === AGENTS_TEMPLATE.length - 1) resolve()
          }, AGENT_DURATIONS[i])
        }, AGENT_DELAYS[i])
      })
    })

    // ── Wait for BOTH animation and backend to finish ────────────────────────
    try {
      const [data] = await Promise.all([backendPromise, animationDone])
      const result = mapBackendResponse(data)

      // Prepend backend notifications into the store (newest first)
      const newNotifications: Notification[] = result.notifications.map((msg, i) => ({
        id: `backend-${Date.now()}-${i}`,
        type: deriveNotifType(msg),
        title: msg.split(':')[0]?.trim() || 'ALERT',
        message: msg.split(':').slice(1).join(':').trim() || msg,
        timestamp: 'just now',
        severity: deriveNotifSeverity(msg),
        read: false,
      }))

      set(state => ({
        workflowRunning: false,
        workflowComplete: true,
        analysisResult: result,
        notifications: [...newNotifications, ...state.notifications],
      }))
    } catch (err) {
      // If backend unreachable, still complete the UI gracefully with error state
      await animationDone
      set({
        workflowRunning: false,
        workflowComplete: false,
        workflowError: err instanceof Error ? err.message : 'Backend unreachable',
      })
    }
  },

  resetWorkflow: () => set({
    workflowRunning: false,
    workflowComplete: false,
    workflowError: null,
    analysisResult: null,
    agents: AGENTS_TEMPLATE.map(a => ({ ...a })),
  }),

  // Notifications start empty — populated by backend responses
  notifications: [],
  addNotification: (n) => set(state => ({ notifications: [n, ...state.notifications] })),
  markRead: (id) => set(state => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n),
  })),

  mapFilters: { rescue: true, hospital: true, ngo: true, incident: true },
  toggleMapFilter: (key) => set(state => ({
    mapFilters: { ...state.mapFilters, [key]: !state.mapFilters[key] },
  })),

  systemTime: new Date().toLocaleTimeString('en-IN', { hour12: false }),
  setSystemTime: (t) => set({ systemTime: t }),
}))
