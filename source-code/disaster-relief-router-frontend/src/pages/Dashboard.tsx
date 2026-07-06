import { IncidentSubmission } from '../components/dashboard/IncidentSubmission'
import { OverviewCards } from '../components/dashboard/OverviewCards'
import { IncidentAnalysis } from '../components/dashboard/IncidentAnalysis'
import { ResourceDeployment } from '../components/dashboard/ResourceDeployment'
import { NotificationCenter } from '../components/dashboard/NotificationCenter'
import { WorkflowTimeline } from '../components/workflow/WorkflowTimeline'
import { IndiaMap } from '../components/map/IndiaMap'

export function Dashboard() {
  return (
      <div className="flex flex-col gap-4 p-4 pb-8">

      {/* Incident Submission */}
      <IncidentSubmission />

      {/* Workflow Timeline */}
      <WorkflowTimeline />

      {/* Overview Cards */}
      <OverviewCards />

      {/* 3-column: Analysis | Resources | Notifications */}
      <div className="grid grid-cols-3 gap-4" style={{ minHeight: '280px' }}>
        <IncidentAnalysis />
        <ResourceDeployment />
        <NotificationCenter />
      </div>

      {/* India Map */}
      <IndiaMap />
      
    </div>
  )
}
