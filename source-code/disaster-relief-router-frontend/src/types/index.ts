export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
export type IncidentStatus = 'ACTIVE' | 'RESOLVED' | 'PENDING' | 'IN_PROGRESS'
export type AgentStatus = 'pending' | 'processing' | 'completed' | 'error'
export type ResourceStatus = 'available' | 'assigned' | 'in_transit'
export type TeamStatus = 'available' | 'deployed' | 'offline'

export interface Incident {
  id: string
  location: string
  type: string
  severity: Severity
  status: IncidentStatus
  timestamp: string
  description: string
  peopleImpacted: number
  resourcesAssigned: number
  coordinates: [number, number]
}

export interface Agent {
  id: string
  name: string
  status: AgentStatus
  message?: string
  completedAt?: string
}

export interface Resource {
  id: string
  type: string
  label: string
  available: number
  assigned: number
  inTransit: number
  icon: string
}

export interface Notification {
  id: string
  type: 'medical' | 'resource' | 'weather' | 'route' | 'team'
  title: string
  message: string
  timestamp: string
  severity: 'critical' | 'warning' | 'info' | 'success'
  read: boolean
}

export interface MapMarker {
  id: string
  type: 'rescue' | 'hospital' | 'ngo' | 'incident'
  lat: number
  lng: number
  title: string
  severity?: Severity
  resourcesAssigned?: number
  peopleImpacted?: number
  status?: string
}

export interface Team {
  id: string
  name: string
  type: 'rescue' | 'medical' | 'ngo' | 'hospital'
  status: TeamStatus
  location: string
  members: number
  lead: string
  lastUpdate: string
}

export interface AnalysisResult {
  severity: Severity

  securityStatus: 'PASSED' | 'FAILED' | 'REVIEWING'
  humanReview: 'APPROVED' | 'PENDING' | 'REJECTED'

  resources: string[]
  notifications: string[]

  incidentType: string
  location: string

  securityNotes: string[]

  humanReviewRequired: boolean

  incidentId: string
  timestamp: string

  // NEW
  reasoning: string
  confidence: number
  redactedReport: string
}

// Raw shape returned by the FastAPI backend
export interface BackendResponse {
  incident_id: string
  incident_type: string
  location: string

  severity: string

  security_status: string
  security_notes: string[]

  recommended_resources: string[]
  notifications: string[]

  review_status: string

  timestamp: string

  human_review_required: boolean

  // NEW
  reasoning: string
  confidence?: number
  redacted_report: string
}
