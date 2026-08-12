import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HelpCircle, MessageSquare, Phone, Send, Info, Calendar, User, Check,
  AlertTriangle, ArrowRight, Shield, ShieldAlert, Plus, Search, Filter,
  TrendingUp, Clock, Star, Paperclip, ChevronRight, X, Reply, CornerDownRight, CheckSquare
} from 'lucide-react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { fetchSupportTickets, createSupportTicket } from '@/services/api'
import { useAuth } from '@/context/AuthContext'

// Prepopulated categories for Planners
const plannerCategories = [
  'Payment Verification',
  'Business Verification',
  'Package Issue',
  'Customer Dispute',
  'Trip Operations',
  'Marketing Hub',
  'Subscription',
  'Analytics',
  'Technical Support',
  'Feature Request',
  'API',
  'Account',
  'Other'
]

// Prepopulated categories for Admin to view
const allCategories = [
  'Booking Issue',
  'Payment Issue',
  'Refund Request',
  'Package Change',
  'Cancellation',
  'Planner Complaint',
  'Traveller Complaint',
  'Trip Issue',
  'Accommodation Issue',
  'Food Issue',
  'Technical Bug',
  'Account Verification',
  'Business Verification',
  'Marketing Hub',
  'Analytics',
  'Subscription',
  'Feature Request',
  'General Question',
  'Other'
]

// Mock support tickets database
const initialTickets = [
  {
    id: 'BCN-SUP-2026-000241',
    subject: 'Client payment verified locally but sync delayed',
    category: 'Payment Verification',
    priority: 'High',
    status: 'In Progress',
    createdDate: '2026-07-28 09:30',
    assignedTo: 'Support Bot',
    estimatedResolution: '2 hours',
    latestUpdate: 'Verifying Vite reverse proxy logs for state latency.',
    description: 'We are seeing some issues when a user confirms a booking on the front-end that it does not sync dynamically to the active bookings screen.',
    timeline: [
      { status: 'Ticket Created', date: '2026-07-28 09:30', by: 'You' }
    ],
    conversations: [
      { sender: 'Planner', message: 'Hi support team, my bookings view is lagging payment updates. Can you check?', time: '2026-08-01 02:30 PM' },
      { sender: 'Support', message: 'Hello, we are investigating the state propagation. Could you share the transaction ID?', time: '2026-08-01 02:50 PM' }
    ],
    internalNotes: [
      { text: 'Checked webhook endpoints. Delay is due to local database replication lags.', time: '02:52 PM', author: 'Siddharth' }
    ]
  },
  {
    id: 'BCN-SUP-2026-000238',
    subject: 'Stranded traveller emergency at check-in desk',
    category: 'Trip Operations',
    priority: 'Critical',
    status: 'Open',
    createdDate: '2026-08-01 04:10 PM',
    assignedTo: 'Unassigned',
    estimatedResolution: 'Immediate',
    latestUpdate: 'Awaiting escalation response from regional guide.',
    description: 'Customer checked in at Soneva Jani Overwater Villa. Hotel desk reports booking is not registered in their local portal records. Urgent support needed.',
    timeline: [
      { status: 'Ticket Created', date: '2026-08-01 04:10 PM', by: 'Aarav Mehta Tours' }
    ],
    conversations: [
      { sender: 'Planner', message: 'EMERGENCY: Traveler stranded at hotel check-in desk. Soneva Jani claims booking not found in system!', time: '2026-08-01 04:10 PM' }
    ],
    internalNotes: []
  },
  {
    id: 'BCN-SUP-2026-000222',
    subject: 'Requesting API webhooks for booking automations',
    category: 'API',
    priority: 'Medium',
    status: 'Resolved',
    createdDate: '2026-07-28 10:00 AM',
    assignedTo: 'Neha Sen',
    estimatedResolution: 'Completed',
    latestUpdate: 'Sent developer integration documentation.',
    description: 'We want to hook our internal CRM triggers with Beacon webhook events. Please provide access keys.',
    timeline: [
      { status: 'Ticket Created', date: '2026-07-28 10:00 AM', by: 'WanderWorld Travels' },
      { status: 'Assigned', date: '2026-07-28 10:15 AM', by: 'System' },
      { status: 'Support Replied', date: '2026-07-28 11:30 AM', by: 'Neha Sen' },
      { status: 'Resolved', date: '2026-07-28 04:00 PM', by: 'Neha Sen' },
      { status: 'Closed', date: '2026-07-29 09:00 AM', by: 'System' }
    ],
    conversations: [
      { sender: 'Planner', message: 'Hi, where can I download API webhooks documentation?', time: '2026-07-28 10:00 AM' },
      { sender: 'Support', message: 'Hello! I have sent the API keys and setup handbook to your official email.', time: '2026-07-28 11:30 AM' },
      { sender: 'Planner', message: 'Got it, thank you! It works fine.', time: '2026-07-28 03:50 PM' }
    ],
    internalNotes: [
      { text: 'Webhooks activated on account PK-390.', time: '02:00 PM', author: 'Neha' }
    ]
  }
]

export default function SupportCenterPage() {
  const [tickets, setTickets] = useState(initialTickets)
  const [viewMode, setViewMode] = useState<'planner' | 'admin'>('planner') // Switch between B2B planner support & B2B admin support

  // Active tickets lists state
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null)
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedPriority, setSelectedPriority] = useState('All')

  // Support conversation state
  const [replyText, setReplyText] = useState('')
  const [internalNoteText, setInternalNoteText] = useState('')

  // Raise Ticket Wizard state (Step 1-4)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [ticketStep, setTicketStep] = useState(1)
  
  // New ticket state fields
  const [newCategory, setNewCategory] = useState('Payment Verification')
  const [newPriority, setNewPriority] = useState('Low')
  const [newSubject, setNewSubject] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newBookingId, setNewBookingId] = useState('')
  const [newPackageId, setNewPackageId] = useState('')
  const [newTripDate, setNewTripDate] = useState('')

  // Emergency Modal state
  const [showEmergencyModal, setShowEmergencyModal] = useState(false)

  // Report Traveler Complaint Modal state
  const [showComplaintModal, setShowComplaintModal] = useState(false)
  const [complaintTravelerName, setComplaintTravelerName] = useState('')
  const [complaintType, setComplaintType] = useState('Fake Payment')
  const [complaintDetails, setComplaintDetails] = useState('')

  // Selected Executive for assignment (Admin view)
  const [selectedAssignee, setSelectedAssignee] = useState('Siddharth Roy (Senior Executive)')

  // Auto Notifications simulation logs
  const [notificationLogs, setNotificationLogs] = useState<string[]>([])

  // CSAT state
  const [showCsatModal, setShowCsatModal] = useState(false)
  const [ratingVal, setRatingVal] = useState(5)
  const [csatComment, setCsatComment] = useState('')

  // Sync log updates
  const addNotificationLog = (msg: string) => {
    setNotificationLogs(prev => [`[Notification Sent] ${msg}`, ...prev])
  }

  // Handle Create Support Ticket submission (Step 4)
  const handleCreateTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSubject.trim() || !newDescription.trim()) {
      toast.error('Subject and Description fields are required.')
      return
    }

    try {
      const payload = {
        customerId: user?.id || 'mock-customer-id',
        plannerId: user?.id || 'mock-planner-id',
        bookingId: newBookingId || null,
        packageId: newPackageId || null,
        subject: newSubject,
        message: newDescription,
        status: 'Open'
      };

      const ticketObj = await createSupportTicket(payload);

      const newTicket = {
        id: ticketObj.id,
        subject: newSubject,
        category: newCategory,
        priority: newPriority,
        status: 'Open',
        createdDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
        assignedTo: 'Unassigned',
        estimatedResolution: newPriority === 'Critical' ? 'Immediate' : newPriority === 'High' ? '4 hours' : '24 hours',
        latestUpdate: 'Ticket initialized and dispatched to support queue.',
        description: newDescription,
        timeline: [
          { status: 'Ticket Created', date: 'Just now', by: 'You' }
        ],
        conversations: [
          { sender: 'Planner', message: newDescription, time: 'Just now' }
        ],
        internalNotes: []
      }

      setTickets([newTicket, ...tickets])
      addNotificationLog(`Ticket ${newTicket.id} created successfully. Priority: ${newPriority}.`)
      toast.success(`Support Ticket ${newTicket.id} raised successfully! Our crew will respond shortly.`)
    } catch (err) {
      console.error(err);
      toast.error('Failed to create support ticket in the database.');
    }
    
    // Reset wizard
    setNewSubject('')
    setNewDescription('')
    setNewBookingId('')
    setNewPackageId('')
    setNewTripDate('')
    setTicketStep(1)
    setShowCreateModal(false)
  }

  // Handle support replies
  const handleSendReply = (senderType: 'Planner' | 'Support') => {
    if (!replyText.trim() || !activeTicketId) return

    setTickets(prev =>
      prev.map(t => {
        if (t.id === activeTicketId) {
          const nextTime = new Date().toISOString().replace('T', ' ').substring(0, 16)
          const updatedConvo = [...t.conversations, { sender: senderType, message: replyText, time: nextTime }]
          const updatedTimeline = [...t.timeline, { status: senderType === 'Support' ? 'Support Replied' : 'Customer Responded', date: nextTime, by: senderType === 'Support' ? 'Support Executive' : 'You' }]
          return {
            ...t,
            conversations: updatedConvo,
            timeline: updatedTimeline,
            latestUpdate: senderType === 'Support' ? 'Support Executive replied.' : 'Waiting for Support analysis.'
          }
        }
        return t
      })
    )

    addNotificationLog(`New message posted in ticket ${activeTicketId} by ${senderType}.`)
    setReplyText('')
    toast.success('Message posted to ticket chat successfully.')
  }

  // Handle internal notes
  const handleAddInternalNote = () => {
    if (!internalNoteText.trim() || !activeTicketId) return

    setTickets(prev =>
      prev.map(t => {
        if (t.id === activeTicketId) {
          const nextTime = new Date().toISOString().replace('T', ' ').substring(0, 16)
          return {
            ...t,
            internalNotes: [...t.internalNotes, { text: internalNoteText, time: nextTime, author: 'Admin Exec' }]
          }
        }
        return t
      })
    )

    setInternalNoteText('')
    toast.success('Internal notes saved successfully (invisible to clients).')
  }

  // Handle Admin controls (priority, status, assigned)
  const handleUpdateTicketMeta = (id: string, field: 'status' | 'priority' | 'assignedTo', value: string) => {
    setTickets(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextTime = new Date().toISOString().replace('T', ' ').substring(0, 16)
          const updatedTimeline = [...t.timeline, { status: `${field.toUpperCase()} Updated`, date: nextTime, by: 'Admin Admin' }]
          return {
            ...t,
            [field]: value,
            timeline: updatedTimeline
          }
        }
        return t
      })
    )
    addNotificationLog(`Ticket ${id} metadata updated: ${field} set to "${value}".`)
    toast.success(`Ticket ${field} updated successfully.`)
  }

  // Close ticket helper
  const handleCloseTicket = (id: string) => {
    setTickets(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextTime = new Date().toISOString().replace('T', ' ').substring(0, 16)
          const updatedTimeline = [...t.timeline, { status: 'Resolved', date: nextTime, by: 'Support Exec' }, { status: 'Closed', date: nextTime, by: 'System' }]
          return {
            ...t,
            status: 'Closed',
            timeline: updatedTimeline
          }
        }
        return t
      })
    )
    addNotificationLog(`Ticket ${id} has been marked closed.`)
    toast.success('Ticket closed successfully.')
    setShowCsatModal(true) // Trigger CSAT satisfaction modal
  }

  // Handle Traveler Complaint submission
  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault()
    if (!complaintTravelerName.trim() || !complaintDetails.trim()) {
      toast.error('Traveler Name and Description are required.')
      return
    }

    // Automatically trigger notification alert to system admins
    addNotificationLog(`🚨 Admin Notice: Planner reported Traveler "${complaintTravelerName}" for "${complaintType}".`)
    toast.success(`Complaint regarding "${complaintTravelerName}" filed successfully. Beacon Admin will investigate.`)
    
    setComplaintTravelerName('')
    setComplaintDetails('')
    setShowComplaintModal(false)
  }

  // CSAT score submission
  const handleCsatSubmit = () => {
    toast.success('Thank you for rating Beacon Support Center! Your feedback is saved.')
    setCsatComment('')
    setShowCsatModal(false)
  }

  // Filtered tickets logic
  const filteredTickets = tickets.filter(t => {
    const matchSearch = t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        t.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = selectedStatus === 'All' || t.status === selectedStatus
    const matchPriority = selectedPriority === 'All' || t.priority === selectedPriority
    return matchSearch && matchStatus && matchPriority
  })

  // Selected ticket for chat workspace
  const activeTicket = tickets.find(t => t.id === activeTicketId)

  return (
    <div className="space-y-6">
      
      {/* Header bar and Admin switch toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
            Support Center <span className="text-xs font-normal text-muted bg-teal/10 text-teal px-2.5 py-0.5 rounded-full border border-teal/20">🛟 Support & Arbitration</span>
          </h1>
          <p className="text-muted text-sm mt-1">Raise support tickets, track queries, manage departures issues, and file complaints</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Executive switcher */}
          <div className="flex gap-1.5 bg-navy/5 p-1 rounded-lg border border-border shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('planner')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                viewMode === 'planner' ? 'bg-white shadow text-teal' : 'text-muted hover:text-navy'
              }`}
            >
              Planner Desk
            </button>
            <button
              type="button"
              onClick={() => setViewMode('admin')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                viewMode === 'admin' ? 'bg-white shadow text-teal' : 'text-muted hover:text-navy'
              }`}
            >
              Admin Dashboard
            </button>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={() => setShowComplaintModal(true)}
            className="border-red-500/20 text-red-500 hover:bg-red-500/5 font-semibold text-xs py-2 gap-1.5"
          >
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span>Report Traveller</span>
          </Button>

          <Button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="font-semibold text-xs py-2 gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Raise Support Ticket</span>
          </Button>
        </div>
      </div>

      {/* Emergency Section Warning Alert */}
      <div className="bg-red-500/10 border border-red-500/25 p-4 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div className="flex gap-3">
          <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-extrabold text-navy">⚠️ Urgent Travel Emergency?</h4>
            <p className="text-[11px] text-muted leading-relaxed">
              If travelers are stranded, guides unreachable, departures starting within 24h, or a medical emergency has occurred, use direct channels.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowEmergencyModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg px-4 py-2 text-xs shrink-0 cursor-pointer shadow"
        >
          🚨 Get Emergency Support
        </button>
      </div>

      {/* Admin view Statistics (Show when viewMode === 'admin') */}
      {viewMode === 'admin' && (
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {[
            { label: 'Open Tickets', value: tickets.filter(t => t.status === 'Open').length, sub: '🟢 Verification pending', icon: HelpCircle, color: 'text-teal' },
            { label: 'Pending Response', value: tickets.filter(t => t.status === 'In Progress').length, sub: '🟣 Assigned executives', icon: Clock, color: 'text-purple-500' },
            { label: 'Critical Tickets', value: tickets.filter(t => t.priority === 'Critical' && t.status !== 'Closed').length, sub: '🔴 Urgent attention', icon: ShieldAlert, color: 'text-red-500' },
            { label: 'Avg Response Time', value: '4.5m', sub: '⚡ Direct SLA target', icon: Clock, color: 'text-teal' },
            { label: 'Resolved Today', value: tickets.filter(t => t.status === 'Resolved').length, sub: 'Done operations', icon: Check, color: 'text-green-500' },
            { label: 'Customer CSAT', value: '4.8 / 5.0', sub: 'Satisfaction level', icon: Star, color: 'text-amber-500' }
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
      )}

      {/* Main Support Center Interface Workspaces Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Ticket lists + search filters */}
        <div className="space-y-4 lg:col-span-1">
          <div className="bg-surface p-4 rounded-xl border border-border space-y-3">
            <h3 className="text-xs font-bold text-teal uppercase tracking-wider">Tickets Database</h3>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted" />
              <input
                type="text"
                placeholder="Search ticket, category, subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-page border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
              />
            </div>

            {/* Filter selectors */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-page border border-border rounded-lg p-1.5 text-navy focus:outline-none focus:border-teal font-medium"
              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>

              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="bg-page border border-border rounded-lg p-1.5 text-navy focus:outline-none focus:border-teal font-medium"
              >
                <option value="All">All Priorities</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Ticket lists view */}
          <div className="space-y-3">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setActiveTicketId(ticket.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left space-y-2.5 ${
                  activeTicketId === ticket.id
                    ? 'bg-teal/5 border-teal border-2 ring-1 ring-teal/30 shadow'
                    : 'bg-surface border-border hover:border-teal/20'
                }`}
              >
                <div className="flex justify-between items-start gap-1">
                  <span className="text-[10px] font-bold text-teal bg-teal/10 px-1.5 py-0.5 rounded border border-teal/20 font-medium tracking-wider">
                    {ticket.id}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    ticket.priority === 'Critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                    ticket.priority === 'High' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                    ticket.priority === 'Medium' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                    'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-navy line-clamp-1">{ticket.subject}</h4>
                  <p className="text-[11px] text-muted line-clamp-1">{ticket.category} • Updated: {ticket.createdDate}</p>
                </div>

                <div className="flex justify-between items-center text-[10px] text-muted border-t border-border/40 pt-2 font-medium">
                  <span className="capitalize">Status: <strong>{ticket.status}</strong></span>
                  <span className="truncate max-w-[120px]">Executive: <strong>{ticket.assignedTo}</strong></span>
                </div>
              </div>
            ))}
            {filteredTickets.length === 0 && (
              <div className="p-8 text-center text-xs text-muted font-medium bg-surface border border-border rounded-xl">
                No tickets matches active filters query.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Conversation workspace */}
        <div className="lg:col-span-2 space-y-4 flex flex-col h-full">
          {activeTicket ? (
            <>
              {/* Active Ticket Details card */}
              <div className="bg-surface p-5 rounded-xl border border-border space-y-4 text-left">
                <div className="flex flex-wrap justify-between items-start gap-2 border-b border-border/60 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded border border-teal/20 uppercase tracking-wider font-medium">{activeTicket.id}</span>
                    <h2 className="text-sm font-extrabold text-navy mt-1.5">{activeTicket.subject}</h2>
                    <p className="text-[11px] text-muted mt-0.5">Category: <strong>{activeTicket.category}</strong> • Created on: {activeTicket.createdDate}</p>
                  </div>
                  
                  {/* Actions drawer for Admin executives */}
                  {viewMode === 'admin' ? (
                    <div className="flex flex-wrap items-center gap-2 bg-navy/5 p-2 rounded-lg border border-border">
                      {/* Priority toggle */}
                      <select
                        value={activeTicket.priority}
                        onChange={(e) => handleUpdateTicketMeta(activeTicket.id, 'priority', e.target.value)}
                        className="bg-page border border-border rounded px-2 py-1 text-[10px] text-navy focus:outline-none focus:border-teal font-bold"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>

                      {/* Status toggle */}
                      <select
                        value={activeTicket.status}
                        onChange={(e) => handleUpdateTicketMeta(activeTicket.id, 'status', e.target.value)}
                        className="bg-page border border-border rounded px-2 py-1 text-[10px] text-navy focus:outline-none focus:border-teal font-bold"
                      >
                        <option value="Open">Open 🟡</option>
                        <option value="Assigned">Assigned 🔵</option>
                        <option value="In Progress">In Progress 🟣</option>
                        <option value="Resolved">Resolved 🟢</option>
                        <option value="Closed">Closed ⚫</option>
                      </select>

                      {/* Assignee toggle */}
                      <select
                        value={activeTicket.assignedTo}
                        onChange={(e) => handleUpdateTicketMeta(activeTicket.id, 'assignedTo', e.target.value)}
                        className="bg-page border border-border rounded px-2 py-1 text-[10px] text-navy focus:outline-none focus:border-teal font-bold"
                      >
                        <option value="Siddharth Roy (Senior Executive)">Siddharth Roy</option>
                        <option value="Neha Sen">Neha Sen</option>
                        <option value="Rohan Verma">Rohan Verma</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => handleCloseTicket(activeTicket.id)}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold rounded px-2 py-1 text-[10px] cursor-pointer"
                      >
                        Mark Resolved
                      </button>
                    </div>
                  ) : (
                    /* Customer simple action: Close ticket */
                    <div className="flex gap-2">
                      <Badge className="bg-teal text-navy font-extrabold capitalize">{activeTicket.status}</Badge>
                      {activeTicket.status !== 'Closed' && (
                        <button
                          type="button"
                          onClick={() => handleCloseTicket(activeTicket.id)}
                          className="bg-navy/5 hover:bg-red-500/10 text-muted hover:text-red-500 border border-border px-2.5 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors"
                        >
                          Close Ticket
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Description details content */}
                <div className="p-3 bg-navy/5 rounded-lg border border-border/80 text-xs text-muted leading-relaxed font-medium">
                  <strong>Issue Detail Description:</strong>
                  <p className="mt-1">{activeTicket.description}</p>
                </div>

                {/* Ticket Progress Timeline */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-teal uppercase tracking-wider block">Ticket Audit Timeline Trace</span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[10px]">
                    {activeTicket.timeline.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 shrink-0 bg-page px-2 py-1 rounded border border-border text-muted font-medium">
                        <Check className="w-3 h-3 text-green-500 shrink-0" />
                        <span>{step.status}</span>
                        <span className="text-[8px] font-medium">({step.date.split(' ')[1] || step.date})</span>
                        {idx < activeTicket.timeline.length - 1 && <ArrowRight className="w-2.5 h-2.5 text-muted/50 ml-1" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversation Chat workspace grid */}
                <div className="border-t border-border/60 pt-4 space-y-4">
                  <span className="text-xs font-bold text-teal uppercase tracking-wider block">Discussion Chat Log</span>
                  
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {activeTicket.conversations.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex flex-col max-w-[80%] p-3 rounded-xl border text-xs leading-relaxed ${
                          msg.sender === 'Support'
                            ? 'bg-teal/5 border-teal/20 mr-auto text-left'
                            : 'bg-navy/5 border-border ml-auto text-right'
                        }`}
                      >
                        <span className="text-[9px] text-muted font-extrabold block mb-1">
                          {msg.sender === 'Support' ? 'Beacon Support Crew' : 'You (Planner)'} • {msg.time}
                        </span>
                        <span className="text-navy font-semibold">{msg.message}</span>
                      </div>
                    ))}
                  </div>

                  {/* Send text dialog box */}
                  {activeTicket.status !== 'Closed' ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Write message reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendReply(viewMode === 'admin' ? 'Support' : 'Planner')}
                        className="flex-1 bg-page border border-border rounded-lg px-3 py-2 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => handleSendReply(viewMode === 'admin' ? 'Support' : 'Planner')}
                        className="bg-teal text-navy font-bold rounded-lg px-4 py-2 text-xs hover:bg-teal-light cursor-pointer shadow flex items-center gap-1 shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 bg-gray-500/10 border border-gray-500/25 rounded-lg text-center text-xs text-muted font-bold">
                      🚫 Ticket is Closed. Reopen or raise a new ticket to continue.
                    </div>
                  )}
                </div>

                {/* Admin Internal Notes section */}
                {viewMode === 'admin' && (
                  <div className="border-t border-border/60 pt-4 space-y-3">
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider block">Internal Office Notes (Invisible to customer)</span>
                    
                    <div className="space-y-2">
                      {activeTicket.internalNotes.map((note, i) => (
                        <div key={i} className="bg-amber-500/5 border border-amber-500/20 p-2.5 rounded-lg text-[11px] text-muted flex justify-between items-center">
                          <span><strong>{note.author}:</strong> {note.text}</span>
                          <span className="font-medium text-[9px] text-slate-500">{note.time}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add internal verification note..."
                        value={internalNoteText}
                        onChange={(e) => setInternalNoteText(e.target.value)}
                        className="flex-1 bg-page border border-border rounded-lg px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                      />
                      <button
                        type="button"
                        onClick={handleAddInternalNote}
                        className="bg-navy/10 border border-border hover:bg-navy/20 text-navy font-bold rounded-lg px-3.5 py-1.5 text-xs cursor-pointer shrink-0"
                      >
                        Add Note
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </>
          ) : (
            <div className="bg-surface p-12 rounded-xl border border-border text-center flex flex-col items-center justify-center space-y-3 h-full">
              <HelpCircle className="w-12 h-12 text-teal/40" />
              <h3 className="text-base font-bold text-navy">No Ticket Selected</h3>
              <p className="text-xs text-muted max-w-sm">Select an active ticket from the database list on the left, or raise a new support ticket query.</p>
            </div>
          )}
        </div>

      </div>

      {/* Global Notifications logs panel (Future SMS webhook updates) */}
      <Card className="p-5 border border-border">
        <h3 className="font-bold text-navy text-sm mb-4 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-teal" />
          <span>Real-Time Notifications & Email Sync Log</span>
        </h3>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
          {notificationLogs.map((log, i) => (
            <div key={i} className="text-[11px] text-muted bg-page p-2 rounded border border-border/80 font-medium">
              {log}
            </div>
          ))}
          {notificationLogs.length === 0 && (
            <div className="text-xs text-muted text-center py-4 font-semibold">
              No recent notifications dispatched. Actions on tickets will generate email/in-app logs.
            </div>
          )}
        </div>
      </Card>

      {/* =======================================================
          MODAL: RAISE SUPPORT TICKET (WIZARD STEPS 1-4)
          ======================================================= */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setTicketStep(1)
                setShowCreateModal(false)
              }}
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
                onClick={() => {
                  setTicketStep(1)
                  setShowCreateModal(false)
                }}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-page text-muted hover:text-navy transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-navy mb-1">Raise Support Ticket</h3>
              <p className="text-xs text-muted mb-4">Step {ticketStep} of 4: Setup your query details</p>

              {/* STEP 1: Select Category */}
              {ticketStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-navy block" htmlFor="category-select">What is the query regarding?</label>
                    <select
                      id="category-select"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-page border border-border rounded-lg px-3 py-2 text-xs text-navy focus:outline-none focus:border-teal font-semibold"
                    >
                      {plannerCategories.map((cat, i) => (
                        <option key={i} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-border/60">
                    <Button type="button" onClick={() => setTicketStep(2)}>Next Step <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button>
                  </div>
                </div>
              )}

              {/* STEP 2: Priority Selection */}
              {ticketStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-navy block">Select Priority level</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Low', 'Medium', 'High', 'Critical'].map((pr) => (
                        <button
                          key={pr}
                          type="button"
                          onClick={() => setNewPriority(pr)}
                          className={`p-3 rounded-lg border text-xs font-bold capitalize transition-colors text-left ${
                            newPriority === pr
                              ? 'bg-teal/5 border-teal border-2 text-teal'
                              : 'bg-page border-border text-navy hover:border-teal/20'
                          }`}
                        >
                          {pr}
                        </button>
                      ))}
                    </div>
                  </div>

                  {newPriority === 'Critical' && (
                    <div className="p-3 bg-red-500/10 border border-red-500/25 rounded-lg text-[10px] text-red-500 leading-relaxed font-bold flex gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Notice: Critical issues are reviewed immediately by our support desk team. Please only select this for active departure emergencies.</span>
                    </div>
                  )}

                  <div className="flex justify-between gap-2 pt-2 border-t border-border/60">
                    <Button type="button" variant="outline" onClick={() => setTicketStep(1)}>Back</Button>
                    <Button type="button" onClick={() => setTicketStep(3)}>Next Step <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button>
                  </div>
                </div>
              )}

              {/* STEP 3: Details Description & attachments */}
              {ticketStep === 3 && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-muted font-bold block" htmlFor="new-subject">Subject Title</label>
                      <input
                        id="new-subject"
                        type="text"
                        required
                        placeholder="Brief summary of the issue"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        className="w-full bg-page border border-border rounded-lg px-3 py-2 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-muted font-bold block" htmlFor="new-desc">Description details</label>
                      <textarea
                        id="new-desc"
                        rows={3}
                        required
                        placeholder="Provide details about the issue..."
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="w-full bg-page border border-border rounded-lg p-2.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] text-muted font-bold block" htmlFor="new-bkgId">Booking ID (Optional)</label>
                        <input
                          id="new-bkgId"
                          type="text"
                          placeholder="e.g. BKG-781"
                          value={newBookingId}
                          onChange={(e) => setNewBookingId(e.target.value)}
                          className="w-full bg-page border border-border rounded-lg p-1.5 text-[10px] text-navy focus:outline-none focus:border-teal font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-muted font-bold block" htmlFor="new-pkgId">Package ID (Optional)</label>
                        <input
                          id="new-pkgId"
                          type="text"
                          placeholder="e.g. PKG-002"
                          value={newPackageId}
                          onChange={(e) => setNewPackageId(e.target.value)}
                          className="w-full bg-page border border-border rounded-lg p-1.5 text-[10px] text-navy focus:outline-none focus:border-teal font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] text-muted font-bold block" htmlFor="new-tripDate">Trip Date (Optional)</label>
                        <input
                          id="new-tripDate"
                          type="date"
                          value={newTripDate}
                          onChange={(e) => setNewTripDate(e.target.value)}
                          className="w-full bg-page border border-border rounded-lg p-1.5 text-[10px] text-navy focus:outline-none focus:border-teal"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Attachment zone */}
                  <div className="bg-navy/5 p-3 rounded-lg border border-dashed border-border/80 flex items-center justify-between text-[10px]">
                    <span className="text-muted flex items-center gap-1">
                      <Paperclip className="w-3.5 h-3.5 text-teal" />
                      <span>Attachment Limit: Max 20 MB (PDF, Images, DOC)</span>
                    </span>
                    <button type="button" onClick={() => toast.success('Mock file attached successfully.')} className="text-teal font-bold hover:underline cursor-pointer">Attach File</button>
                  </div>

                  <div className="flex justify-between gap-2 pt-2 border-t border-border/60">
                    <Button type="button" variant="outline" onClick={() => setTicketStep(2)}>Back</Button>
                    <Button type="button" onClick={() => setTicketStep(4)}>Review Step <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button>
                  </div>
                </div>
              )}

              {/* STEP 4: Review and Submit */}
              {ticketStep === 4 && (
                <div className="space-y-4">
                  <div className="space-y-3 bg-page p-4 rounded-xl border border-border/80 text-xs text-muted leading-relaxed font-medium">
                    <span className="text-xs font-bold text-teal block uppercase tracking-wider mb-2">Review Ticket Summary</span>
                    <div className="space-y-1.5">
                      <div>Subject: <strong className="text-navy">{newSubject}</strong></div>
                      <div>Category: <strong className="text-navy">{newCategory}</strong></div>
                      <div>Priority Level: <strong className="text-navy">{newPriority}</strong></div>
                      <div className="line-clamp-3">Description: {newDescription}</div>
                      {newBookingId && <div>Booking Reference: <span className="font-medium text-navy">{newBookingId}</span></div>}
                    </div>
                  </div>

                  <div className="flex justify-between gap-2 pt-2 border-t border-border/60">
                    <Button type="button" variant="outline" onClick={() => setTicketStep(3)}>Back</Button>
                    <Button type="button" onClick={handleCreateTicketSubmit} className="font-bold">Submit Ticket</Button>
                  </div>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =======================================================
          MODAL: EMERGENCY SUPPORT CONTACT CHANNELS
          ======================================================= */}
      <AnimatePresence>
        {showEmergencyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEmergencyModal(false)}
              className="absolute inset-0"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-surface border border-border rounded-[24px] shadow-2xl p-6 overflow-hidden z-10 space-y-4 text-left"
            >
              <button
                type="button"
                onClick={() => setShowEmergencyModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-page text-muted hover:text-navy transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 pb-2 border-b border-border/60">
                <ShieldAlert className="w-6 h-6 text-red-500 shrink-0" />
                <div>
                  <h3 className="text-base font-extrabold text-navy">Emergency Arbitration Hub</h3>
                  <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Critical priority response</p>
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                Connect directly to our operations room. These channels bypass standard queues and alert dedicated executive teams.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  { title: 'Call Beacon Hotline', sub: 'Instant voice response (24/7)', detail: '+91 80 5024 1000', icon: Phone, action: () => toast.info('Initiating voice call: +91 80 5024 1000') },
                  { title: 'WhatsApp Live Coordinator', sub: 'Instant text dispatch', detail: '+91 98765 99999', icon: MessageSquare, action: () => toast.success('Opening WhatsApp coordinator channel...') },
                  { title: 'System-wide Emergency Escalation', sub: 'Flag current bookings to admins immediately', detail: 'Trigger alert now', icon: Shield, action: () => {
                    addNotificationLog('🚨 EMERGENCY: Planner triggered global system emergency escalation.');
                    toast.success('Emergency alert sent! Admin team notified.');
                    setShowEmergencyModal(false);
                  }}
                ].map((ch, idx) => (
                  <div
                    key={idx}
                    onClick={ch.action}
                    className="p-3.5 rounded-xl border border-border hover:border-red-500/20 bg-navy/5 hover:bg-red-500/5 transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-navy group-hover:text-red-500 transition-colors block">{ch.title}</span>
                      <span className="text-[10px] text-muted block">{ch.sub}</span>
                      <span className="text-[10px] text-teal block font-semibold">{ch.detail}</span>
                    </div>
                    <ch.icon className="w-5 h-5 text-muted group-hover:text-red-500 shrink-0" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =======================================================
          MODAL: FILING TRAVELLER COMPLAINTS (TO ADMIN)
          ======================================================= */}
      <AnimatePresence>
        {showComplaintModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowComplaintModal(false)}
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
                onClick={() => setShowComplaintModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-page text-muted hover:text-navy transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-lg font-bold text-navy mb-1">File Traveler Complaint / Report</h3>
              <p className="text-xs text-muted mb-4">Report traveler misbehavior, fraud, or property damage directly to Beacon admins</p>

              <form onSubmit={handleSubmitComplaint} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted font-bold block" htmlFor="complaint-name">Traveler Full Name</label>
                    <input
                      id="complaint-name"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={complaintTravelerName}
                      onChange={(e) => setComplaintTravelerName(e.target.value)}
                      className="w-full bg-page border border-border rounded-lg px-3 py-2 text-xs text-navy focus:outline-none focus:border-teal font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted font-bold block" htmlFor="complaint-type">Violation Category</label>
                    <select
                      id="complaint-type"
                      value={complaintType}
                      onChange={(e) => setComplaintType(e.target.value)}
                      className="w-full bg-page border border-border rounded-lg px-2.5 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-semibold"
                    >
                      <option value="Fake Payment">Fake Payment / Fraud UTR</option>
                      <option value="Property Damage">Property Damage / Vandalism</option>
                      <option value="Abusive Behaviour">Abusive Behaviour / Misbehaviour</option>
                      <option value="Late Arrival">Late Arrival (No-show)</option>
                      <option value="Policy Violation">Policy Violation</option>
                      <option value="Fraud Attempt">Fraud / Identity Theft</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-muted font-bold block" htmlFor="complaint-desc">Details & Proof Description</label>
                  <textarea
                    id="complaint-desc"
                    rows={4}
                    required
                    placeholder="Provide details about the occurrence. Please specify bookings reference and attachment files if applicable..."
                    value={complaintDetails}
                    onChange={(e) => setComplaintDetails(e.target.value)}
                    className="w-full bg-page border border-border rounded-lg p-2.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                  />
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-lg text-[10px] text-muted leading-relaxed font-bold flex gap-2">
                  <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>Notice: Beacon Administration will investigate this report. False reports may lead to planner account restrictions.</span>
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3 pt-2 border-t border-border/50">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowComplaintModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="font-bold text-xs"
                  >
                    Submit Report
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =======================================================
          MODAL: CUSTOMER SATISFACTION FEEDBACK (CSAT)
          ======================================================= */}
      <AnimatePresence>
        {showCsatModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCsatModal(false)}
              className="absolute inset-0"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-surface border border-border rounded-[24px] shadow-2xl p-6 overflow-hidden z-10 text-center space-y-4"
            >
              <h3 className="text-base font-bold text-navy">Rate Your Support Experience</h3>
              <p className="text-xs text-muted">How satisfied are you with Beacon Support Center crew assistance?</p>

              {/* Star grid */}
              <div className="flex justify-center gap-1.5 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRatingVal(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-125"
                  >
                    <Star className={`w-7 h-7 ${star <= ratingVal ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} />
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Additional feedback (optional)..."
                rows={2}
                value={csatComment}
                onChange={(e) => setCsatComment(e.target.value)}
                className="w-full bg-page border border-border rounded-lg p-2.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
              />

              <div className="flex gap-2 justify-center pt-2">
                <Button type="button" onClick={handleCsatSubmit} className="w-full font-bold">Submit Feedback</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}
