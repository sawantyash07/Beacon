import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users, UserPlus, Shield, Clipboard, CheckSquare, Calendar, Mail,
  Phone, Plus, Edit2, ShieldAlert, Key, Trash2, Search, Filter,
  TrendingUp, Activity, Check, X, ShieldCheck, UserCheck, AlertTriangle
} from 'lucide-react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'

// Predefined roles descriptions
const roleDescriptions = {
  'Owner': 'Complete access to all modules and settings.',
  'Operations Manager': 'Manages packages, bookings, trip operations, and travelers. Cannot edit business settings.',
  'Sales Executive': 'Manages enquiries, bookings, and traveler communications. Cannot verify payments.',
  'Finance Manager': 'Controls payments, refunds, receipts, and reports. Cannot edit packages.',
  'Marketing Executive': 'Handles Marketing Hub, social posts, QR codes, campaigns, and posters. Cannot access finance.',
  'Tour Leader': 'Manages only assigned trips, traveler lists, emergency contacts, and trip checklists.',
  'Driver': 'Manages only assigned trips, pickup lists, routes, and traveler contacts.',
  'Freelancer Planner': 'Can only manage their own packages and bookings.'
}

// Initial mock team members with department assigned
const initialTeamMembers = [
  {
    id: 'MEM-01',
    name: 'Rahul Mehta',
    email: 'rahul.mehta@beacon.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    role: 'Owner',
    status: 'Active',
    employeeId: 'EMP-001',
    joinedDate: '2026-01-10',
    lastLogin: '2026-08-01 10:32 AM',
    assignedTrips: 5,
    assignedTasks: 2,
    notes: 'Primary business owner and administrator.',
    department: 'Management'
  },
  {
    id: 'MEM-02',
    name: 'Priya Sharma',
    email: 'priya.sharma@beacon.com',
    phone: '+91 98765 43211',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    role: 'Finance Manager',
    status: 'Active',
    employeeId: 'EMP-002',
    joinedDate: '2026-02-15',
    lastLogin: '2026-08-01 09:15 AM',
    assignedTrips: 0,
    assignedTasks: 4,
    notes: 'Handles client invoice auditing and refunds.',
    department: 'Finance'
  },
  {
    id: 'MEM-03',
    name: 'Amit Patel',
    email: 'amit.patel@beacon.com',
    phone: '+91 98765 43212',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    role: 'Operations Manager',
    status: 'Active',
    employeeId: 'EMP-003',
    joinedDate: '2026-03-20',
    lastLogin: '2026-07-31 06:45 PM',
    assignedTrips: 8,
    assignedTasks: 7,
    notes: 'Oversees logistics, drivers, and guide crew.',
    department: 'Operations'
  },
  {
    id: 'MEM-04',
    name: 'Rohit Verma',
    email: 'rohit.verma@beacon.com',
    phone: '+91 98765 43213',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80',
    role: 'Sales Executive',
    status: 'Active',
    employeeId: 'EMP-004',
    joinedDate: '2026-04-05',
    lastLogin: '2026-08-01 11:20 AM',
    assignedTrips: 0,
    assignedTasks: 3,
    notes: 'Specializes in high-budget customized packages.',
    department: 'Sales'
  },
  {
    id: 'MEM-05',
    name: 'Anjali Gupta',
    email: 'anjali.g@beacon.com',
    phone: '+91 98765 43214',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    role: 'Marketing Executive',
    status: 'Pending Invitation',
    employeeId: 'EMP-005',
    joinedDate: '2026-07-28',
    lastLogin: 'Never',
    assignedTrips: 0,
    assignedTasks: 1,
    notes: 'Focusing on social campaigns and QR distributions.',
    department: 'Marketing'
  },
  {
    id: 'MEM-06',
    name: 'Suresh Kumar',
    email: 'suresh.k@beacon.com',
    phone: '+91 98765 43215',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&q=80',
    role: 'Tour Leader',
    status: 'Inactive',
    employeeId: 'EMP-006',
    joinedDate: '2026-05-10',
    lastLogin: '2026-07-20 04:00 PM',
    assignedTrips: 2,
    assignedTasks: 0,
    notes: 'Certified mountaineer and group trek leader.',
    department: 'Trip Coordination'
  }
]

// Initial mock activity log
const initialActivityLogs = [
  { id: 1, member: 'Rahul Mehta', action: 'edited Goa Package pricing', module: 'Packages', time: '10m ago' },
  { id: 2, member: 'Priya Sharma', action: 'verified client payment UTR9012', module: 'Payments', time: '25m ago' },
  { id: 3, member: 'Amit Patel', action: 'confirmed booking BKG-7811', module: 'Bookings', time: '1h ago' },
  { id: 4, member: 'Rohit Verma', action: 'replied to Kashmir inquiry request', module: 'Enquiries', time: '2h ago' },
  { id: 5, member: 'Rahul Mehta', action: 'scheduled new departure for Bali', module: 'Trip Operations', time: '1d ago' }
]

// Modules for permissions matrix
const permissionModules = [
  { name: 'Home', actions: ['View'] },
  { name: 'Enquiries', actions: ['View', 'Create', 'Edit', 'Delete'] },
  { name: 'Packages', actions: ['View', 'Create', 'Edit', 'Duplicate', 'Publish', 'Archive', 'Delete'] },
  { name: 'Bookings', actions: ['View', 'Confirm', 'Cancel', 'Modify'] },
  { name: 'Trip Operations', actions: ['View', 'Manage', 'Transfer Package', 'Merge Trips', 'Send Offers'] },
  { name: 'Payments', actions: ['View', 'Verify', 'Refund', 'Download Receipts'] },
  { name: 'Travellers', actions: ['View', 'Edit', 'Download Documents'] },
  { name: 'Analytics', actions: ['View', 'Export'] },
  { name: 'Reviews', actions: ['View', 'Reply'] },
  { name: 'Marketing Hub', actions: ['View', 'Promote Package', 'Download Posters', 'Schedule Campaign'] },
  { name: 'Business Profile', actions: ['View', 'Edit'] },
  { name: 'Team Management', actions: ['View', 'Invite Members', 'Remove Members', 'Change Roles'] },
  { name: 'Settings', actions: ['View', 'Edit'] }
]

export default function TeamManagementPage() {
  const [members, setMembers] = useState(initialTeamMembers)
  const [logs, setLogs] = useState(initialActivityLogs)

  // Departments List State (supports unlimited creation)
  const [departments, setDepartments] = useState<string[]>([
    'Management',
    'Operations',
    'Sales',
    'Finance',
    'Marketing',
    'Customer Support',
    'Trip Coordination'
  ])

  // Filters state (including department selection)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedDept, setSelectedDept] = useState('All')

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showLogsModal, setShowLogsModal] = useState(false)
  const [activeLogMember, setActiveLogMember] = useState<any>(null)
  const [editingMember, setEditingMember] = useState<any>(null)

  // Onboarding Form state (re-enabled formDept)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMobile, setFormMobile] = useState('')
  const [formEmpId, setFormEmpId] = useState('')
  const [formDept, setFormDept] = useState('Sales')
  const [formRole, setFormRole] = useState('Sales Executive')
  const [formStatus, setFormStatus] = useState('Pending Invitation')
  const [formNotes, setFormNotes] = useState('')

  // Custom Department Form Input State
  const [newDeptInput, setNewDeptInput] = useState('')

  // Custom Role Form state
  const [customRoleName, setCustomRoleName] = useState('')
  const [customRoleDesc, setCustomRoleDesc] = useState('')
  const [customPermissions, setCustomPermissions] = useState<Record<string, string[]>>({})
  const [availableRoles, setAvailableRoles] = useState<string[]>(Object.keys(roleDescriptions))

  // Duties Assignment Form state
  const [selectedAssignMember, setSelectedAssignMember] = useState<any>(null)
  const [assignType, setAssignType] = useState('Task') // Task | Trip | Package | Enquiry
  const [assignName, setAssignName] = useState('')

  // Calculate Owner Dashboard Metrics
  const onlineCount = members.filter(m => m.status === 'Active').length
  const pendingCount = members.filter(m => m.status === 'Pending Invitation').length
  const suspendedCount = members.filter(m => m.status === 'Suspended').length
  const totalTasks = members.reduce((sum, m) => sum + m.assignedTasks, 0)
  const totalTrips = members.reduce((sum, m) => sum + m.assignedTrips, 0)

  // Permission Change Handler
  const handlePermissionToggle = (moduleName: string, action: string) => {
    const active = customPermissions[moduleName] || []
    if (active.includes(action)) {
      setCustomPermissions({
        ...customPermissions,
        [moduleName]: active.filter(a => a !== action)
      })
    } else {
      setCustomPermissions({
        ...customPermissions,
        [moduleName]: [...active, action]
      })
    }
  }

  // Create Custom Role Handler
  const handleCreateCustomRole = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customRoleName.trim()) {
      toast.error('Please enter a role name.')
      return
    }
    if (availableRoles.includes(customRoleName.trim())) {
      toast.error('Role name already exists.')
      return
    }

    setAvailableRoles([...availableRoles, customRoleName.trim()])
    toast.success(`Custom role "${customRoleName}" created successfully with granular permissions!`)
    setCustomRoleName('')
    setCustomRoleDesc('')
    setCustomPermissions({})
    setShowRoleModal(false)
  }

  // Create Custom Department Handler
  const handleCreateDepartment = (e: React.FormEvent) => {
    e.preventDefault()
    const name = newDeptInput.trim()
    if (!name) {
      toast.error('Please enter a department name.')
      return
    }
    if (departments.map(d => d.toLowerCase()).includes(name.toLowerCase())) {
      toast.error('Department already exists.')
      return
    }
    setDepartments([...departments, name])
    setNewDeptInput('')
    toast.success(`Department "${name}" created successfully!`)
  }

  // Onboarding Invite Handler with department support
  const handleInviteMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim() || !formEmail.trim() || !formMobile.trim()) {
      toast.error('Please fill in Name, Email, and Mobile fields.')
      return
    }

    const toastId = toast.loading(`Sending secure email invitation to ${formEmail}...`)

    setTimeout(() => {
      toast.dismiss(toastId)

      if (editingMember) {
        // Edit flow
        setMembers(prev => prev.map(m => m.id === editingMember.id ? {
          ...m,
          name: formName,
          email: formEmail,
          phone: formMobile,
          employeeId: formEmpId || m.employeeId,
          department: formDept,
          role: formRole,
          status: formStatus,
          notes: formNotes
        } : m))
        toast.success(`Member profile for "${formName}" updated successfully.`)
      } else {
        // New invite flow
        const newMember = {
          id: `MEM-0${members.length + 1}`,
          name: formName,
          email: formEmail,
          phone: formMobile,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80',
          role: formRole,
          status: formStatus,
          employeeId: formEmpId || `EMP-0${members.length + 1}`,
          joinedDate: new Date().toISOString().split('T')[0],
          lastLogin: 'Never',
          assignedTrips: 0,
          assignedTasks: 0,
          notes: formNotes,
          department: formDept
        }
        setMembers([...members, newMember])
        
        // Log action
        const newLog = {
          id: logs.length + 1,
          member: 'Rahul Mehta',
          action: `invited ${formName} as ${formRole} in ${formDept}`,
          module: 'Team Management',
          time: 'Just now'
        }
        setLogs([newLog, ...logs])
        
        toast.success(`Invitation link successfully generated and dispatched to ${formEmail}!`)
      }

      // Reset
      resetForm()
      setShowAddModal(false)
    }, 1200)
  }

  const resetForm = () => {
    setFormName('')
    setFormEmail('')
    setFormMobile('')
    setFormEmpId('')
    setFormDept('Sales')
    setFormRole('Sales Executive')
    setFormStatus('Pending Invitation')
    setFormNotes('')
    setEditingMember(null)
  }

  // Launch Edit Onboard Form
  const handleEditClick = (member: any) => {
    setEditingMember(member)
    setFormName(member.name)
    setFormEmail(member.email)
    setFormMobile(member.phone)
    setFormEmpId(member.employeeId)
    setFormDept(member.department || 'Sales')
    setFormRole(member.role)
    setFormStatus(member.status)
    setFormNotes(member.notes || '')
    setShowAddModal(true)
  }

  // Revoke/Delete Member helper
  const handleRemoveMember = (id: string, name: string, role: string) => {
    if (role === 'Owner') {
      toast.error('Security Lock: Cannot remove the primary business Owner.')
      return
    }

    const confirm = window.confirm(`Are you sure you want to revoke access and remove ${name} from your team?`)
    if (confirm) {
      setMembers(members.filter(m => m.id !== id))
      
      const newLog = {
        id: logs.length + 1,
        member: 'Rahul Mehta',
        action: `removed team member ${name}`,
        module: 'Team Management',
        time: 'Just now'
      }
      setLogs([newLog, ...logs])

      toast.success(`Revoked access keys and removed ${name} permanently.`)
    }
  }

  // Toggle user suspension helper
  const handleToggleSuspend = (id: string, name: string, currentStatus: string) => {
    if (id === 'MEM-01') {
      toast.error('Security Lock: Cannot suspend the primary Owner.')
      return
    }

    const nextStatus = currentStatus === 'Suspended' ? 'Active' : 'Suspended'
    setMembers(prev => prev.map(m => m.id === id ? { ...m, status: nextStatus } : m))
    
    const newLog = {
      id: logs.length + 1,
      member: 'Rahul Mehta',
      action: `${nextStatus === 'Suspended' ? 'suspended' : 'activated'} access for ${name}`,
      module: 'Team Management',
      time: 'Just now'
    }
    setLogs([newLog, ...logs])

    toast.success(nextStatus === 'Suspended' ? `Suspended keys for ${name}.` : `Restored active access for ${name}.`)
  }

  // Reset password helper
  const handleResetPassword = (email: string) => {
    toast.success(`Password reset wizard link dispatched to ${email}.`)
  }

  // Trigger Assignments
  const handleAssignDuty = (e: React.FormEvent) => {
    e.preventDefault()
    if (!assignName.trim() || !selectedAssignMember) {
      toast.error('Please enter assignment details and target member.')
      return
    }

    setMembers(prev => prev.map(m => {
      if (m.id === selectedAssignMember.id) {
        const isTrip = assignType === 'Trip'
        return {
          ...m,
          assignedTrips: isTrip ? m.assignedTrips + 1 : m.assignedTrips,
          assignedTasks: !isTrip ? m.assignedTasks + 1 : m.assignedTasks
        }
      }
      return m
    }))

    const newLog = {
      id: logs.length + 1,
      member: 'Rahul Mehta',
      action: `assigned ${assignType.toLowerCase()} "${assignName}" to ${selectedAssignMember.name}`,
      module: 'Team Management',
      time: 'Just now'
    }
    setLogs([newLog, ...logs])

    toast.success(`Assigned ${assignType} successfully to ${selectedAssignMember.name}!`)
    setAssignName('')
    setShowAssignModal(false)
  }

  // Filtered members list with search, status and department matching
  const filteredMembers = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        m.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = selectedStatus === 'All' || m.status === selectedStatus
    const matchDept = selectedDept === 'All' || m.department === selectedDept
    return matchSearch && matchStatus && matchDept
  })

  return (
    <div className="space-y-6">
      
      {/* Header with Title and Dashboard Quick buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
            Team Management <span className="text-xs font-normal text-muted bg-teal/10 text-teal px-2.5 py-0.5 rounded-full border border-teal/20">Operations</span>
          </h1>
          <p className="text-muted text-sm mt-1">Manage staff roles, custom permission matrixes, and audits logs</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              resetForm()
              setShowAddModal(true)
            }}
            className="border-navy/30 text-navy hover:bg-navy/5 font-semibold gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Team Member</span>
          </Button>

          <Button
            type="button"
            onClick={() => setShowRoleModal(true)}
            className="gap-1.5 font-semibold"
          >
            <Shield className="w-4 h-4" />
            <span>Create Custom Role</span>
          </Button>
        </div>
      </div>

      {/* Owner Dashboard KPIs Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Team', value: members.length, sub: 'Registered members', icon: Users, color: 'text-teal' },
          { label: 'Online / Active', value: onlineCount, sub: '🟢 Operational now', icon: UserCheck, color: 'text-green-500' },
          { label: 'Pending Invites', value: pendingCount, sub: '🟡 Awaiting accept', icon: Mail, color: 'text-amber-500' },
          { label: 'Suspended Keys', value: suspendedCount, sub: '🔴 Access revoked', icon: ShieldAlert, color: 'text-red-500' },
          { label: 'Trips Handled', value: totalTrips, sub: 'Active departures', icon: Calendar, color: 'text-teal' },
          { label: 'Assigned Duties', value: totalTasks, sub: 'Pending operations', icon: CheckSquare, color: 'text-teal' }
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 border border-border flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider">{stat.label}</span>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="mt-2">
              <span className="text-2xl font-extrabold text-navy font-medium">{stat.value}</span>
              <span className="text-[9px] text-muted block mt-0.5">{stat.sub}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left column: Filters & Members Card List (75% on large screens) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Filters Search and List Row */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface p-4 rounded-xl border border-border">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search name, role, employee ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-page border border-border rounded-lg pl-9 pr-4 py-2 text-xs text-navy focus:outline-none focus:border-teal font-medium"
              />
            </div>

            {/* Category selections */}
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              {/* Department Dropdown Filter */}
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-muted" />
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="bg-page border border-border rounded-lg px-2.5 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                >
                  <option value="All">All Departments</option>
                  {departments.map((dept, i) => (
                    <option key={i} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Status Dropdown Filter */}
              <div className="flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-muted" />
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-page border border-border rounded-lg px-2.5 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending Invitation">Pending Invite</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedStatus('All')
                  setSelectedDept('All')
                }}
                className="text-xs py-1.5 px-3"
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Main Members Grid Display */}
          {filteredMembers.length === 0 ? (
            <EmptyState
              icon={<Users className="w-8 h-8" />}
              title="No team members found"
              description="Try relaxing your filters or onboard a new helper to assign duties."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <Card key={member.id} hover className="p-5 border border-border rounded-xl space-y-4 relative group overflow-hidden">
                  
                  {/* Card Header Context */}
                  <div className="flex items-start gap-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover border border-border/80"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-extrabold text-navy truncate" title={member.name}>{member.name}</h3>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                          member.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          member.status === 'Pending Invitation' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                          member.status === 'Suspended' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                          'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                        }`}>
                          {member.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] text-muted font-medium font-bold">{member.employeeId}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specific info listings */}
                  <div className="space-y-1.5 text-xs text-muted font-medium border-t border-b border-border/60 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-teal shrink-0" />
                        <span className="text-navy font-bold">{member.role}</span>
                      </div>
                      <Badge variant="outline" className="text-[9px] font-bold border-teal/20 text-teal py-0 px-2 font-medium">
                        {member.department || 'General'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-muted shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-muted shrink-0" />
                      <span>{member.phone}</span>
                    </div>
                  </div>

                  {/* Assignment Summaries */}
                  <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                    <div className="bg-navy/5 p-2 rounded-lg border border-border">
                      <span className="text-[9px] text-muted uppercase block">Assigned Trips</span>
                      <span className="text-sm font-extrabold text-navy font-medium">{member.assignedTrips} active</span>
                    </div>
                    <div className="bg-navy/5 p-2 rounded-lg border border-border">
                      <span className="text-[9px] text-muted uppercase block">Pending Tasks</span>
                      <span className="text-sm font-extrabold text-navy font-medium">{member.assignedTasks} duties</span>
                    </div>
                  </div>

                  {/* Metadata log times */}
                  <div className="flex justify-between items-center text-[10px] text-muted font-medium pt-1">
                    <span>Joined: {member.joinedDate}</span>
                    <span>Active: {member.lastLogin}</span>
                  </div>

                  {/* Bottom Quick Actions Row */}
                  <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleEditClick(member)}
                        className="p-1.5 rounded hover:bg-teal/10 text-muted hover:text-teal transition-colors cursor-pointer"
                        title="Edit Member Profile"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAssignMember(member)
                          setShowAssignModal(true)
                        }}
                        className="p-1.5 rounded hover:bg-teal/10 text-muted hover:text-teal transition-colors cursor-pointer"
                        title="Assign Trips/Tasks"
                      >
                        <CheckSquare className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleResetPassword(member.email)}
                        className="p-1.5 rounded hover:bg-teal/10 text-muted hover:text-teal transition-colors cursor-pointer"
                        title="Reset Password link"
                      >
                        <Key className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLogMember(member)
                          setShowLogsModal(true)
                        }}
                        className="p-1.5 rounded hover:bg-teal/10 text-muted hover:text-teal transition-colors cursor-pointer"
                        title="View Member Actions Logs"
                      >
                        <Activity className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleToggleSuspend(member.id, member.name, member.status)}
                        disabled={member.role === 'Owner'}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer disabled:opacity-20 ${
                          member.status === 'Suspended'
                            ? 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20'
                            : 'bg-amber-500/10 text-amber-500 border-amber-500/20 hover:bg-amber-500/20'
                        }`}
                      >
                        {member.status === 'Suspended' ? 'Activate' : 'Suspend'}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member.id, member.name, member.role)}
                        disabled={member.role === 'Owner'}
                        className="p-1.5 rounded hover:bg-red-50 text-red-500 transition-colors cursor-pointer disabled:opacity-20"
                        title="Remove access keys"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Departments list, Add department form, Recently joined members, Activity Log (25% on large screens) */}
        <div className="space-y-6">
          
          {/* Departments Directory Card */}
          <Card className="p-5 border border-border">
            <h3 className="font-extrabold text-navy text-sm mb-3 flex items-center justify-between">
              <span>Organizational Departments</span>
              <Badge variant="outline" className="text-[10px] py-0 px-2 border-teal/30 text-teal font-medium">
                {departments.length} total
              </Badge>
            </h3>

            {/* Department Quick List with member counters */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {departments.map((dept, idx) => {
                const count = members.filter(m => m.department === dept).length
                return (
                  <div key={idx} className="flex justify-between items-center bg-navy/5 border border-border/50 p-2 rounded-lg text-xs hover:border-teal/30 transition-colors">
                    <span className="font-semibold text-navy">{dept}</span>
                    <span className="text-[10px] font-bold text-muted bg-page px-2 py-0.5 rounded border border-border">
                      {count} {count === 1 ? 'member' : 'members'}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Inline Custom Department Creator Form */}
            <form onSubmit={handleCreateDepartment} className="mt-4 pt-3 border-t border-border/60 flex gap-2">
              <input
                type="text"
                placeholder="New department..."
                value={newDeptInput}
                onChange={(e) => setNewDeptInput(e.target.value)}
                className="flex-1 bg-page border border-border rounded-lg px-2.5 py-1 text-xs text-navy focus:outline-none focus:border-teal font-medium"
              />
              <Button
                type="submit"
                className="py-1 px-3 text-xs font-bold shrink-0"
              >
                + Add
              </Button>
            </form>
          </Card>

          {/* Recently Added Members section */}
          <Card className="p-5 border border-border">
            <h3 className="font-extrabold text-navy text-sm mb-3 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-teal" />
              <span>Recently Onboarded</span>
            </h3>

            <div className="space-y-3">
              {[...members]
                .sort((a, b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime())
                .slice(0, 3)
                .map((member) => (
                  <div key={member.id} className="flex items-center gap-3 border-b border-border/30 pb-2.5 last:border-0 last:pb-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover border border-border"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-extrabold text-navy truncate">{member.name}</p>
                      <p className="text-[10px] text-muted truncate">
                        {member.role} · {member.department}
                      </p>
                    </div>
                    <span className="text-[9px] text-muted font-medium whitespace-nowrap">
                      {member.joinedDate}
                    </span>
                  </div>
                ))}
            </div>
          </Card>

          {/* Audit Activity Logs Feed */}
          <Card className="p-5 border border-border">
            <h3 className="font-bold text-navy text-sm mb-3 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-teal" />
              <span>Global Activity Feed</span>
            </h3>
            
            <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
              {logs.map((log) => (
                <div key={log.id} className="flex justify-between items-start text-xs border-b border-border/40 pb-2.5 last:border-0 last:pb-0">
                  <div className="space-y-0.5">
                    <p className="text-navy text-[11px] font-bold">
                      {log.member} <span className="text-muted font-normal">{log.action}</span>
                    </p>
                    <Badge variant="outline" className="text-[8px] border-teal/20 text-teal py-0 px-1 font-medium">
                      {log.module}
                    </Badge>
                  </div>
                  <span className="text-[9px] text-muted font-medium shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>

      {/* =======================================================
          MODAL: ADD TEAM MEMBER / INVITE MEMBER
          ======================================================= */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-surface border border-border rounded-[24px] shadow-2xl p-6 overflow-hidden z-10"
            >
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-page text-muted hover:text-navy transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-navy mb-1">
                {editingMember ? 'Edit Team Member Profile' : 'Onboard & Invite Team Member'}
              </h3>
              <p className="text-xs text-muted mb-4">
                {editingMember ? 'Modify staff details and role settings' : 'Send a secure email invitation to join your workspace'}
              </p>

              <form onSubmit={handleInviteMember} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted font-bold block" htmlFor="form-name">Full Name</label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      placeholder="e.g. Priyesh Shah"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-page border border-border rounded-lg px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted font-bold block" htmlFor="form-empId">Employee ID (Optional)</label>
                    <input
                      id="form-empId"
                      type="text"
                      placeholder="e.g. EMP-024"
                      value={formEmpId}
                      onChange={(e) => setFormEmpId(e.target.value)}
                      className="w-full bg-page border border-border rounded-lg px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted font-bold block" htmlFor="form-email">Email Address</label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full bg-page border border-border rounded-lg px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted font-bold block" htmlFor="form-mobile">Mobile Number</label>
                    <input
                      id="form-mobile"
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      value={formMobile}
                      onChange={(e) => setFormMobile(e.target.value)}
                      className="w-full bg-page border border-border rounded-lg px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted font-bold block" htmlFor="form-dept">Department</label>
                    <select
                      id="form-dept"
                      value={formDept}
                      onChange={(e) => setFormDept(e.target.value)}
                      className="w-full bg-page border border-border rounded-lg px-2.5 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                    >
                      {departments.map((dept, i) => (
                        <option key={i} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-muted font-bold block" htmlFor="form-role">Access Role</label>
                    <select
                      id="form-role"
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      className="w-full bg-page border border-border rounded-lg px-2.5 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                    >
                      {availableRoles.map((role, i) => (
                        <option key={i} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-muted font-bold block" htmlFor="form-status">Initial Status</label>
                    <select
                      id="form-status"
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value)}
                      className="w-full bg-page border border-border rounded-lg px-2.5 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                    >
                      <option value="Active">Active 🟢</option>
                      <option value="Pending Invitation">Pending Invite 🟡</option>
                      <option value="Inactive">Inactive ⚪</option>
                      <option value="Suspended">Suspended 🔴</option>
                    </select>
                  </div>
                </div>

                {/* Predefined Role Description Context note helper */}
                <div className="p-3 bg-navy/5 rounded-lg border border-border/80 text-[10px] text-muted leading-relaxed">
                  <strong>Role Capability Brief:</strong> {roleDescriptions[formRole as keyof typeof roleDescriptions] || 'Custom designated access permissions mapping configurations.'}
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-muted font-bold block" htmlFor="form-notes">Operational Notes</label>
                  <textarea
                    id="form-notes"
                    rows={2}
                    placeholder="Specific assignment details or general comments..."
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="w-full bg-page border border-border rounded-lg p-2.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                  />
                </div>

                {/* Submit buttons */}
                <div className="flex justify-end gap-3 pt-2 border-t border-border/50">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="font-bold text-xs"
                  >
                    {editingMember ? 'Update Profile' : 'Send Email Invitation'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =======================================================
          MODAL: CREATE CUSTOM ROLE & PERMISSION MATRIX
          ======================================================= */}
      <AnimatePresence>
        {showRoleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRoleModal(false)}
              className="absolute inset-0"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl h-[85vh] bg-surface border border-border rounded-[24px] shadow-2xl p-6 overflow-hidden z-10 flex flex-col justify-between"
            >
              <button
                type="button"
                onClick={() => setShowRoleModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-page text-muted hover:text-navy transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 pb-3 border-b border-border/80 shrink-0">
                <h3 className="text-lg font-bold text-navy">Create Custom Access Role</h3>
                <p className="text-xs text-muted">Draft a custom role and allocate granular view/edit authorizations</p>
              </div>

              <form onSubmit={handleCreateCustomRole} className="flex-1 overflow-y-auto my-4 space-y-4 pr-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted font-bold block" htmlFor="role-name">Role Name</label>
                    <input
                      id="role-name"
                      type="text"
                      required
                      placeholder="e.g. Senior Sales Executive"
                      value={customRoleName}
                      onChange={(e) => setCustomRoleName(e.target.value)}
                      className="w-full bg-page border border-border rounded-lg px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted font-bold block" htmlFor="role-desc">Short Description</label>
                    <input
                      id="role-desc"
                      type="text"
                      placeholder="Handles premium packages and high value clients..."
                      value={customRoleDesc}
                      onChange={(e) => setCustomRoleDesc(e.target.value)}
                      className="w-full bg-page border border-border rounded-lg px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                    />
                  </div>
                </div>

                {/* Permissions Matrix */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-teal uppercase tracking-wider block">Granular Permissions Matrix</span>
                  
                  <div className="border border-border rounded-xl overflow-hidden">
                    <table className="w-full border-collapse text-left text-xs bg-surface">
                      <thead>
                        <tr className="bg-navy/5 border-b border-border text-muted font-bold uppercase tracking-wider text-[9px]">
                          <th className="px-4 py-2.5">Module Name</th>
                          <th className="px-4 py-2.5">Authorizations matrix checkboxes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60">
                        {permissionModules.map((mod) => (
                          <tr key={mod.name} className="hover:bg-teal/5 transition-colors">
                            <td className="px-4 py-3 font-semibold text-navy w-1/3">{mod.name}</td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-4">
                                {mod.actions.map((act) => {
                                  const isChecked = (customPermissions[mod.name] || []).includes(act)
                                  return (
                                    <label key={act} className="inline-flex items-center gap-1.5 text-xs text-navy font-medium cursor-pointer select-none">
                                      <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => handlePermissionToggle(mod.name, act)}
                                        className="w-3.5 h-3.5 text-teal border-border rounded focus:ring-teal cursor-pointer"
                                      />
                                      <span>{act}</span>
                                    </label>
                                  )
                                })}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </form>

              {/* Submit triggers */}
              <div className="flex justify-end gap-3 pt-3 border-t border-border/80 shrink-0">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowRoleModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleCreateCustomRole}
                  className="font-bold text-xs"
                >
                  Create Custom Role
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =======================================================
          MODAL: VIEW MEMBER ACTIONS LOGS
          ======================================================= */}
      <AnimatePresence>
        {showLogsModal && activeLogMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogsModal(false)}
              className="absolute inset-0"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-surface border border-border rounded-[24px] shadow-2xl p-6 overflow-hidden z-10"
            >
              <button
                type="button"
                onClick={() => setShowLogsModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-page text-muted hover:text-navy transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border/80">
                <img
                  src={activeLogMember.avatar}
                  alt={activeLogMember.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base font-bold text-navy">{activeLogMember.name} Activity Log</h3>
                  <p className="text-[10px] text-muted">{activeLogMember.role}</p>
                </div>
              </div>

              {/* Specific logs grid */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {logs
                  .filter(l => l.member === activeLogMember.name)
                  .map((log) => (
                    <div key={log.id} className="flex justify-between items-center text-xs bg-navy/5 border border-border/50 p-2.5 rounded-lg">
                      <div className="space-y-1">
                        <span className="text-navy font-bold block">{log.action}</span>
                        <Badge variant="outline" className="text-[9px] border-teal/20 text-teal py-0 px-2 font-medium">
                          {log.module}
                        </Badge>
                      </div>
                      <span className="text-[10px] text-muted font-medium shrink-0">{log.time}</span>
                    </div>
                  ))}
                {logs.filter(l => l.member === activeLogMember.name).length === 0 && (
                  <div className="p-6 text-center text-xs text-muted font-medium">
                    No recent activity logs recorded for this member.
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4 border-t border-border/60 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowLogsModal(false)}
                  className="text-xs py-1.5"
                >
                  Close Log
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =======================================================
          MODAL: DUTY ASSIGNMENT ENGINE
          ======================================================= */}
      <AnimatePresence>
        {showAssignModal && selectedAssignMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAssignModal(false)}
              className="absolute inset-0"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-surface border border-border rounded-[24px] shadow-2xl p-6 overflow-hidden z-10"
            >
              <button
                type="button"
                onClick={() => setShowAssignModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-page text-muted hover:text-navy transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-navy mb-1">Assign Duty / Task</h3>
              <p className="text-xs text-muted mb-4">
                Allocate packages, trips, enquiries or tasks to <span className="font-bold text-teal">{selectedAssignMember.name}</span>
              </p>

              <form onSubmit={handleAssignDuty} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-muted font-bold block" htmlFor="assign-type">Assignment Type</label>
                  <select
                    id="assign-type"
                    value={assignType}
                    onChange={(e) => setAssignType(e.target.value)}
                    className="w-full bg-page border border-border rounded-lg px-2.5 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                  >
                    <option value="Task">General Task / Duty Checklist</option>
                    <option value="Trip">Active Departure Trip</option>
                    <option value="Package">Custom Travel Package</option>
                    <option value="Enquiry">Client Enquiry / Chat Room</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-muted font-bold block" htmlFor="assign-name">Duty Detail Description</label>
                  <input
                    id="assign-name"
                    type="text"
                    required
                    placeholder="e.g. Audit Himachal hotel rooms or lead Bali Departure..."
                    value={assignName}
                    onChange={(e) => setAssignName(e.target.value)}
                    className="w-full bg-page border border-border rounded-lg px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                  />
                </div>

                <div className="p-3 bg-navy/5 rounded-lg border border-border/80 text-[10px] text-muted leading-relaxed">
                  Assigning automatically updates this team member's personal dashboard alerts and updates their logs list.
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3 pt-2 border-t border-border/50">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowAssignModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="font-bold text-xs"
                  >
                    Assign Duty
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
