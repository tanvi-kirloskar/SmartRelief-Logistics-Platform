import type { Incident, MapMarker, Resource, Notification, Team } from '../types'

export const SAMPLE_INCIDENTS: Record<string, string> = {
  'Building Collapse': 'School building collapsed in Ahmedabad. Multiple floors pancaked. Approximately 200 students and teachers trapped. Rescue teams needed immediately with heavy lifting equipment.',
  'Flood Rescue': 'Severe flooding reported in multiple districts of Bihar and Assam. Approximately 12,000 residents displaced. Rescue operations initiated but additional resources required urgently.',
  'Medical Emergency': 'Mass casualty event at industrial plant near Pune. Chemical exposure affecting 500+ workers. Hazmat teams and medical personnel required on priority.',
  'Shelter Overcrowding': 'Cyclone shelter in Odisha at 340% capacity. 8,200 displaced civilians housed in facility designed for 2,400. Medical supplies depleted. Sanitation failing.',
  'Custom': '',
}

export const incidents: Incident[] = [
  {
    id: 'INC-001',
    location: 'Patna, Bihar',
    type: 'Flood Rescue',
    severity: 'CRITICAL',
    status: 'ACTIVE',
    timestamp: '2026-06-29T08:30:00',
    description: 'Mass displacement event. 12,000+ civilians require immediate evacuation.',
    peopleImpacted: 12000,
    resourcesAssigned: 24,
    coordinates: [25.5941, 85.1376],
  },
  {
    id: 'INC-002',
    location: 'Muzaffarpur, Bihar',
    type: 'Flood Rescue',
    severity: 'HIGH',
    status: 'IN_PROGRESS',
    timestamp: '2026-06-29T07:15:00',
    description: 'Flood depth exceeds 4m. Night operations restricted.',
    peopleImpacted: 3400,
    resourcesAssigned: 8,
    coordinates: [26.1209, 85.3647],
  },
  {
    id: 'INC-003',
    location: 'Guwahati, Assam',
    type: 'Flood Rescue',
    severity: 'HIGH',
    status: 'ACTIVE',
    timestamp: '2026-06-29T06:45:00',
    description: 'Brahmaputra river overflow. Multiple localities submerged.',
    peopleImpacted: 7800,
    resourcesAssigned: 12,
    coordinates: [26.1445, 91.7362],
  },
  {
    id: 'INC-004',
    location: 'Nagpur, Maharashtra',
    type: 'Building Collapse',
    severity: 'CRITICAL',
    status: 'ACTIVE',
    timestamp: '2026-06-29T09:10:00',
    description: 'Residential building collapse. Victims trapped under debris.',
    peopleImpacted: 45,
    resourcesAssigned: 6,
    coordinates: [21.1458, 79.0882],
  },
  {
    id: 'INC-005',
    location: 'Bhubaneswar, Odisha',
    type: 'Shelter Overcrowding',
    severity: 'MEDIUM',
    status: 'IN_PROGRESS',
    timestamp: '2026-06-28T22:00:00',
    description: 'Cyclone shelter at 340% capacity. Sanitation failing.',
    peopleImpacted: 8200,
    resourcesAssigned: 5,
    coordinates: [20.2961, 85.8245],
  },
  {
    id: 'INC-006',
    location: 'Chennai, Tamil Nadu',
    type: 'Medical Emergency',
    severity: 'HIGH',
    status: 'PENDING',
    timestamp: '2026-06-29T10:00:00',
    description: 'Hospital overflow due to heat wave casualties.',
    peopleImpacted: 1200,
    resourcesAssigned: 3,
    coordinates: [13.0827, 80.2707],
  },
]

export const mapMarkers: MapMarker[] = [
  // Active Incidents
  { id: 'm1', type: 'incident', lat: 25.5941, lng: 85.1376, title: 'Patna Flood Crisis', severity: 'CRITICAL', peopleImpacted: 12000, resourcesAssigned: 24 },
  { id: 'm2', type: 'incident', lat: 26.1209, lng: 85.3647, title: 'Muzaffarpur Flood', severity: 'HIGH', peopleImpacted: 3400, resourcesAssigned: 8 },
  { id: 'm3', type: 'incident', lat: 26.1445, lng: 91.7362, title: 'Guwahati Flood', severity: 'HIGH', peopleImpacted: 7800, resourcesAssigned: 12 },
  { id: 'm4', type: 'incident', lat: 21.1458, lng: 79.0882, title: 'Nagpur Collapse', severity: 'CRITICAL', peopleImpacted: 45, resourcesAssigned: 6 },
  { id: 'm5', type: 'incident', lat: 13.0827, lng: 80.2707, title: 'Chennai Medical', severity: 'HIGH', peopleImpacted: 1200, resourcesAssigned: 3 },
  // Rescue Teams
  { id: 'm6', type: 'rescue', lat: 25.3176, lng: 82.9739, title: 'NDRF Team Alpha', status: 'Deployed' },
  { id: 'm7', type: 'rescue', lat: 22.5726, lng: 88.3639, title: 'SDRF Team Bravo', status: 'Available' },
  { id: 'm8', type: 'rescue', lat: 19.0760, lng: 72.8777, title: 'Coast Guard Unit 3', status: 'Deployed' },
  { id: 'm9', type: 'rescue', lat: 28.6139, lng: 77.2090, title: 'Fire Brigade Delta', status: 'Available' },
  // Hospitals
  { id: 'm10', type: 'hospital', lat: 25.6140, lng: 85.1458, title: 'Patna Civil Hospital', status: '98% Capacity' },
  { id: 'm11', type: 'hospital', lat: 26.8467, lng: 80.9462, title: 'KGMU Lucknow', status: 'Normal' },
  { id: 'm12', type: 'hospital', lat: 22.7196, lng: 75.8577, title: 'MY Hospital Indore', status: 'Normal' },
  { id: 'm13', type: 'hospital', lat: 12.9716, lng: 77.5946, title: 'NIMHANS Bangalore', status: 'Normal' },
  // NGOs
  { id: 'm14', type: 'ngo', lat: 26.9124, lng: 75.7873, title: 'Red Cross Jaipur', status: 'Active' },
  { id: 'm15', type: 'ngo', lat: 17.3850, lng: 78.4867, title: 'Goonj Hyderabad', status: 'Active' },
  { id: 'm16', type: 'ngo', lat: 23.2599, lng: 77.4126, title: 'CRY Bhopal', status: 'Active' },
]

export const resources: Resource[] = [
  { id: 'r1', type: 'rescue', label: 'Rescue Teams', available: 8, assigned: 12, inTransit: 3, icon: 'users' },
  { id: 'r2', type: 'ambulance', label: 'Ambulances', available: 14, assigned: 18, inTransit: 6, icon: 'ambulance' },
  { id: 'r3', type: 'medical', label: 'Medical Supplies', available: 45, assigned: 32, inTransit: 8, icon: 'package' },
  { id: 'r4', type: 'hospital', label: 'Field Hospitals', available: 3, assigned: 2, inTransit: 1, icon: 'building2' },
  { id: 'r5', type: 'truck', label: 'Relief Trucks', available: 12, assigned: 24, inTransit: 12, icon: 'truck' },
  { id: 'r6', type: 'ngo', label: 'NGO Partners', available: 5, assigned: 5, inTransit: 0, icon: 'heart' },
]

export const notifications: Notification[] = [
  {
    id: 'n1', type: 'medical', title: 'MEDICAL ALERT', severity: 'critical',
    message: 'Patna Civil Hospital at 98% capacity. Overflow protocol required.',
    timestamp: '2m ago', read: false,
  },
  {
    id: 'n2', type: 'resource', title: 'RESOURCE WARNING', severity: 'warning',
    message: 'Helicopter fuel reserves below 30% at Muzaffarpur base.',
    timestamp: '8m ago', read: false,
  },
  {
    id: 'n3', type: 'team', title: 'TEAM UPDATE', severity: 'info',
    message: 'Rescue Team Delta successfully evacuated 340 civilians. Returning for second run.',
    timestamp: '15m ago', read: true,
  },
  {
    id: 'n4', type: 'route', title: 'ROUTE CLEARED', severity: 'success',
    message: 'NH-57 reopened for heavy vehicle passage via Samastipur.',
    timestamp: '22m ago', read: true,
  },
  {
    id: 'n5', type: 'weather', title: 'WEATHER ALERT', severity: 'warning',
    message: 'Storm system strengthening. Wind speed forecast 85 km/h by 18:00.',
    timestamp: '31m ago', read: true,
  },
  {
    id: 'n6', type: 'medical', title: 'MEDICAL ALERT', severity: 'critical',
    message: 'Cholera outbreak risk elevated in Darbhanga flood zone.',
    timestamp: '45m ago', read: true,
  },
]

export const teams: Team[] = [
  { id: 't1', name: 'NDRF Alpha', type: 'rescue', status: 'deployed', location: 'Patna, Bihar', members: 45, lead: 'Cmd. Rajesh Kumar', lastUpdate: '5m ago' },
  { id: 't2', name: 'NDRF Bravo', type: 'rescue', status: 'available', location: 'Varanasi Base', members: 45, lead: 'Cmd. Priya Singh', lastUpdate: '1h ago' },
  { id: 't3', name: 'SDRF Delta', type: 'rescue', status: 'deployed', location: 'Muzaffarpur', members: 30, lead: 'Cmd. Amit Verma', lastUpdate: '12m ago' },
  { id: 't4', name: 'Medical Unit 1', type: 'medical', status: 'deployed', location: 'Patna Civil Hospital', members: 20, lead: 'Dr. Sunita Roy', lastUpdate: '8m ago' },
  { id: 't5', name: 'Medical Unit 2', type: 'medical', status: 'available', location: 'Gaya Base Hospital', members: 18, lead: 'Dr. Vikram Das', lastUpdate: '2h ago' },
  { id: 't6', name: 'Red Cross Bihar', type: 'ngo', status: 'deployed', location: 'Darbhanga', members: 60, lead: 'Ms. Kavitha M', lastUpdate: '20m ago' },
  { id: 't7', name: 'Goonj Relief', type: 'ngo', status: 'available', location: 'Patna Hub', members: 25, lead: 'Mr. Sanjay P', lastUpdate: '3h ago' },
  { id: 't8', name: 'Field Hospital Alpha', type: 'hospital', status: 'deployed', location: 'Hajipur', members: 35, lead: 'Dr. Meena K', lastUpdate: '35m ago' },
  { id: 't9', name: 'Field Hospital Beta', type: 'hospital', status: 'offline', location: 'Samastipur', members: 35, lead: 'Dr. Ravi N', lastUpdate: '4h ago' },
]

export const analyticsData = {
  incidentDistribution: [
    { name: 'Flood Rescue', value: 8, color: '#3b82f6' },
    { name: 'Medical Emergency', value: 4, color: '#ef4444' },
    { name: 'Building Collapse', value: 3, color: '#f59e0b' },
    { name: 'Shelter Overcrowding', value: 2, color: '#22c55e' },
  ],
  severityBreakdown: [
    { name: 'Critical', value: 5, color: '#ef4444' },
    { name: 'High', value: 6, color: '#f59e0b' },
    { name: 'Medium', value: 3, color: '#3b82f6' },
    { name: 'Low', value: 2, color: '#22c55e' },
  ],
  resourceUtilization: [
    { resource: 'Rescue', utilized: 75, available: 25 },
    { resource: 'Medical', utilized: 60, available: 40 },
    { resource: 'Trucks', utilized: 85, available: 15 },
    { resource: 'Hospitals', utilized: 50, available: 50 },
    { resource: 'NGOs', utilized: 55, available: 45 },
  ],
  responseTimes: [
    { time: '00:00', avg: 18 },
    { time: '04:00', avg: 22 },
    { time: '08:00', avg: 12 },
    { time: '10:00', avg: 8 },
    { time: '12:00', avg: 10 },
    { time: '14:00', avg: 9 },
    { time: '16:00', avg: 11 },
    { time: '18:00', avg: 14 },
    { time: '20:00', avg: 16 },
    { time: '22:00', avg: 20 },
  ],
}
