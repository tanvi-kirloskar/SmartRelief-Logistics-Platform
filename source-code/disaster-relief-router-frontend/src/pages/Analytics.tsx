import { BarChart3 } from 'lucide-react'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, Legend,
} from 'recharts'
import { analyticsData } from '../data'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg px-3 py-2 text-xs" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.1)' }}>
      {label && <div className="text-white/50 mb-1">{label}</div>}
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ color: p.color || p.fill }}>{p.name}: {p.value}</div>
      ))}
    </div>
  )
}

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={600}>
      {(percent * 100).toFixed(0)}%
    </text>
  )
}

export function Analytics() {
  return (
    <div className="p-5 flex flex-col gap-5 overflow-y-auto h-full">
      <div className="flex items-center gap-2">
        <BarChart3 size={16} className="text-info" />
        <h1 className="text-sm font-semibold text-white">Analytics Overview</h1>
        <span className="text-[11px] text-white/30 ml-2">Last 24 hours</span>
      </div>

      {/* Top 2 pies */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl p-5" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="text-[10px] font-semibold tracking-widest text-white/40 uppercase mb-4">Incident Distribution</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={analyticsData.incidentDistribution} cx="50%" cy="50%"
                labelLine={false} label={renderCustomizedLabel} outerRadius={80} dataKey="value">
                {analyticsData.incidentDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2">
            {analyticsData.incidentDistribution.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span className="text-[11px] text-white/50">{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-5" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="text-[10px] font-semibold tracking-widest text-white/40 uppercase mb-4">Severity Breakdown</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={analyticsData.severityBreakdown} cx="50%" cy="50%"
                labelLine={false} label={renderCustomizedLabel} outerRadius={80} dataKey="value">
                {analyticsData.severityBreakdown.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2">
            {analyticsData.severityBreakdown.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                <span className="text-[11px] text-white/50">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resource utilization */}
      <div className="rounded-xl p-5" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="text-[10px] font-semibold tracking-widest text-white/40 uppercase mb-4">Resource Utilization</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={analyticsData.resourceUtilization} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="resource" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="utilized" name="Utilized" fill="#ef4444" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
            <Bar dataKey="available" name="Available" fill="#22c55e" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Response times */}
      <div className="rounded-xl p-5" style={{ background: '#081221', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="text-[10px] font-semibold tracking-widest text-white/40 uppercase mb-4">Average Response Time (minutes)</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={analyticsData.responseTimes}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} unit="m" />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="avg" name="Avg Time" stroke="#3b82f6" strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 3 }} activeDot={{ r: 5, fill: '#22c55e' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
