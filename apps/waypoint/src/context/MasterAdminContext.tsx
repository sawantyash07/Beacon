import React, { createContext, useContext, useState } from 'react'
import { toast } from 'sonner'
import {
  initialSystemHealth,
  initialKPICards,
  initialActivityFeed,
  initialAlerts,
  initialPlanners,
  initialCustomers,
  initialDocuments,
  initialPackages,
  initialBookings,
  initialPayments,
  initialLiveTrips,
  initialSupportTickets,
  initialDisputes,
  initialReviews,
  initialCampaigns,
  initialAuditLogs,
  initialSettings,
  type SystemHealthItem,
  type PlatformKPICards,
  type ActivityFeedItem,
  type AlertItem,
  type PlannerProfile,
  type CustomerProfile,
  type MandatoryDocument,
  type PackageItem,
  type BookingRecord,
  type PaymentTransaction,
  type LiveTripDeparture,
  type SupportTicket,
  type DisputeCase,
  type ModeratedReview,
  type MarketingCampaign,
  type AuditLogEntry,
  type SystemSettingsConfig,
} from '@/data/masterAdminData'

export type MasterAdminRole =
  | 'Super Admin'
  | 'CEO'
  | 'Operations Head'
  | 'Verification Manager'
  | 'Finance Manager'
  | 'Finance Executive'
  | 'Customer Care Manager'
  | 'Customer Care Executive'
  | 'Technical Support Engineer'
  | 'Marketing Manager'
  | 'Content Moderator'
  | 'Analytics Viewer'
  | 'Legal & Compliance Officer'

interface MasterAdminContextType {
  currentRole: MasterAdminRole
  setRole: (role: MasterAdminRole) => void
  currentAdminName: string
  currentAdminEmail: string

  systemHealth: SystemHealthItem[]
  kpis: PlatformKPICards
  activityFeed: ActivityFeedItem[]
  alerts: AlertItem[]
  planners: PlannerProfile[]
  customers: CustomerProfile[]
  documents: MandatoryDocument[]
  packages: PackageItem[]
  bookings: BookingRecord[]
  payments: PaymentTransaction[]
  liveTrips: LiveTripDeparture[]
  tickets: SupportTicket[]
  disputes: DisputeCase[]
  reviews: ModeratedReview[]
  campaigns: MarketingCampaign[]
  auditLogs: AuditLogEntry[]
  settings: SystemSettingsConfig

  // Actions
  verifyPlanner: (plannerId: string) => void
  rejectPlanner: (plannerId: string, reason: string) => void
  suspendPlanner: (plannerId: string, reason: string) => void
  togglePayoutFreeze: (plannerId: string) => void
  suspendCustomer: (customerId: string, reason: string) => void
  blacklistCustomer: (customerId: string) => void

  verifyDocument: (docId: string) => void
  rejectDocument: (docId: string, reason: string) => void
  
  approvePackage: (packageId: string) => void
  featurePackage: (packageId: string) => void
  hidePackage: (packageId: string) => void
  deletePackage: (packageId: string) => void

  approvePayment: (paymentId: string) => void
  freezePayment: (paymentId: string) => void
  refundBooking: (bookingId: string) => void

  updateTicketStatus: (ticketId: string, status: SupportTicket['status'], note?: string) => void
  addTicketMessage: (ticketId: string, text: string) => void

  resolveDispute: (disputeId: string, verdict: string) => void
  moderateReview: (reviewId: string, status: ModeratedReview['status']) => void

  broadcastAnnouncement: (title: string, message: string) => void
  toggleMaintenanceMode: () => void
  toggleEmergencyLockdown: () => void
  addAuditLog: (action: string, module: string, target: string, prev: string, next: string, reason: string) => void
}

const MasterAdminContext = createContext<MasterAdminContextType | null>(null)

export const MasterAdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setRoleState] = useState<MasterAdminRole>('Super Admin')
  const [currentAdminName] = useState('Antigravity Command Master')
  const [currentAdminEmail] = useState('superadmin@beacon.travel')

  const [systemHealth] = useState<SystemHealthItem[]>(initialSystemHealth)
  const [kpis, setKpis] = useState<PlatformKPICards>(initialKPICards)
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>(initialActivityFeed)
  const [alerts] = useState<AlertItem[]>(initialAlerts)
  const [planners, setPlanners] = useState<PlannerProfile[]>(initialPlanners)
  const [customers, setCustomers] = useState<CustomerProfile[]>(initialCustomers)
  const [documents, setDocuments] = useState<MandatoryDocument[]>(initialDocuments)
  const [packages, setPackages] = useState<PackageItem[]>(initialPackages)
  const [bookings, setBookings] = useState<BookingRecord[]>(initialBookings)
  const [payments, setPayments] = useState<PaymentTransaction[]>(initialPayments)
  const [liveTrips] = useState<LiveTripDeparture[]>(initialLiveTrips)
  const [tickets, setTickets] = useState<SupportTicket[]>(initialSupportTickets)
  const [disputes, setDisputes] = useState<DisputeCase[]>(initialDisputes)
  const [reviews, setReviews] = useState<ModeratedReview[]>(initialReviews)
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(initialCampaigns)
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(initialAuditLogs)
  const [settings, setSettings] = useState<SystemSettingsConfig>(initialSettings)

  const setRole = (role: MasterAdminRole) => {
    setRoleState(role)
    toast.info(`Switched Active Role to ${role}`)
  }

  const addAuditLog = (action: string, module: string, target: string, prev: string, next: string, reason: string) => {
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      actorId: 'adm-001',
      actorName: currentAdminName,
      actorRole: currentRole,
      ipAddress: '103.21.124.88',
      deviceInfo: 'Command Center Workstation',
      action,
      affectedModule: module,
      targetEntity: target,
      previousValue: prev,
      newValue: next,
      reason,
    }
    setAuditLogs((prevLogs) => [newLog, ...prevLogs])
  }

  const verifyPlanner = (plannerId: string) => {
    setPlanners((prev) =>
      prev.map((p) =>
        p.id === plannerId
          ? { ...p, verificationStatus: 'verified', verifiedBadge: true, payoutFrozen: false, riskScore: Math.max(0, p.riskScore - 30) }
          : p
      )
    )
    setKpis((prev) => ({
      ...prev,
      pendingPlannerVerifications: Math.max(0, prev.pendingPlannerVerifications - 1),
    }))
    const planner = planners.find((p) => p.id === plannerId)
    const name = planner ? planner.agencyName : plannerId
    toast.success(`Planner Verified & Badge Issued: ${name}`)
    addAuditLog('VERIFY_PLANNER', 'Verification Center', name, 'Status: Pending', 'Status: Verified', 'Manual document check complete')
  }

  const rejectPlanner = (plannerId: string, reason: string) => {
    setPlanners((prev) =>
      prev.map((p) => (p.id === plannerId ? { ...p, verificationStatus: 'rejected', verifiedBadge: false } : p))
    )
    const planner = planners.find((p) => p.id === plannerId)
    const name = planner ? planner.agencyName : plannerId
    toast.error(`Planner Verification Rejected: ${name}`)
    addAuditLog('REJECT_PLANNER', 'Verification Center', name, 'Status: Pending', 'Status: Rejected', reason)
  }

  const suspendPlanner = (plannerId: string, reason: string) => {
    setPlanners((prev) =>
      prev.map((p) => (p.id === plannerId ? { ...p, verificationStatus: 'suspended', payoutFrozen: true, verifiedBadge: false } : p))
    )
    const planner = planners.find((p) => p.id === plannerId)
    const name = planner ? planner.agencyName : plannerId
    toast.warning(`Planner Suspended & Payout Frozen: ${name}`)
    addAuditLog('SUSPEND_PLANNER', 'User Management', name, 'Status: Active', 'Status: Suspended', reason)
  }

  const togglePayoutFreeze = (plannerId: string) => {
    setPlanners((prev) =>
      prev.map((p) => {
        if (p.id === plannerId) {
          const nextState = !p.payoutFrozen
          toast.info(`Planner Payout ${nextState ? 'Frozen' : 'Unfrozen'}: ${p.agencyName}`)
          addAuditLog('TOGGLE_PAYOUT_FREEZE', 'Planner Operations', p.agencyName, `Payout: ${p.payoutFrozen}`, `Payout: ${nextState}`, 'Admin toggle')
          return { ...p, payoutFrozen: nextState }
        }
        return p
      })
    )
  }

  const suspendCustomer = (customerId: string, reason: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, status: 'suspended' } : c))
    )
    const cust = customers.find((c) => c.id === customerId)
    const name = cust ? cust.fullName : customerId
    toast.warning(`Customer Account Suspended: ${name}`)
    addAuditLog('SUSPEND_CUSTOMER', 'User Management', name, 'Status: Active', 'Status: Suspended', reason)
  }

  const blacklistCustomer = (customerId: string) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, status: 'blacklisted', fraudRiskScore: 99 } : c))
    )
    const cust = customers.find((c) => c.id === customerId)
    const name = cust ? cust.fullName : customerId
    toast.error(`Customer Blacklisted: ${name}`)
    addAuditLog('BLACKLIST_CUSTOMER', 'User Management', name, 'Status: Active', 'Status: Blacklisted', 'High fraud score & policy violations')
  }

  const verifyDocument = (docId: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: 'approved' } : d))
    )
    const doc = documents.find((d) => d.id === docId)
    toast.success(`Document Approved: ${doc?.docType} (${doc?.plannerName})`)
    addAuditLog('APPROVE_DOCUMENT', 'Verification Engine', `${doc?.docType} - ${doc?.plannerName}`, 'Status: Pending', 'Status: Approved', 'OCR & manual validation passed')
  }

  const rejectDocument = (docId: string, reason: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, status: 'rejected', rejectionReason: reason } : d))
    )
    const doc = documents.find((d) => d.id === docId)
    toast.error(`Document Rejected: ${doc?.docType}`)
    addAuditLog('REJECT_DOCUMENT', 'Verification Engine', `${doc?.docType} - ${doc?.plannerName}`, 'Status: Pending', 'Status: Rejected', reason)
  }

  const approvePackage = (packageId: string) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === packageId ? { ...p, status: 'published' } : p))
    )
    toast.success(`Package Approved & Published: ${packageId}`)
    addAuditLog('APPROVE_PACKAGE', 'Package Management', packageId, 'Status: Under Review', 'Status: Published', 'Quality score audit passed')
  }

  const featurePackage = (packageId: string) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === packageId ? { ...p, status: 'featured' } : p))
    )
    toast.success(`Package Marked as Featured: ${packageId}`)
    addAuditLog('FEATURE_PACKAGE', 'Package Management', packageId, 'Status: Published', 'Status: Featured', 'Promoted to platform spotlight')
  }

  const hidePackage = (packageId: string) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === packageId ? { ...p, status: 'hidden' } : p))
    )
    toast.info(`Package Hidden: ${packageId}`)
    addAuditLog('HIDE_PACKAGE', 'Package Management', packageId, 'Status: Active', 'Status: Hidden', 'Admin moderation action')
  }

  const deletePackage = (packageId: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== packageId))
    toast.error(`Package Permanently Removed: ${packageId}`)
    addAuditLog('DELETE_PACKAGE', 'Package Management', packageId, 'Exists', 'Deleted', 'Policy violation removal')
  }

  const approvePayment = (paymentId: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, paymentStatus: 'verified', settlementStatus: 'pending' } : p))
    )
    setKpis((prev) => ({ ...prev, pendingPaymentVerifications: Math.max(0, prev.pendingPaymentVerifications - 1) }))
    toast.success(`Payment & UTR Verified: ${paymentId}`)
    addAuditLog('APPROVE_PAYMENT', 'Payment Center', paymentId, 'Status: Pending', 'Status: Verified', 'Bank settlement match confirmed')
  }

  const freezePayment = (paymentId: string) => {
    setPayments((prev) =>
      prev.map((p) => (p.id === paymentId ? { ...p, paymentStatus: 'frozen', settlementStatus: 'frozen', fraudFlag: true } : p))
    )
    toast.warning(`Payment Frozen & Flagged for Fraud: ${paymentId}`)
    addAuditLog('FREEZE_PAYMENT', 'Payment Center', paymentId, 'Status: Normal', 'Status: Frozen', 'Suspicious UTR/Transaction pattern')
  }

  const refundBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'refunded', tripStatus: 'cancelled' } : b))
    )
    setKpis((prev) => ({ ...prev, refundRequests: Math.max(0, prev.refundRequests - 1) }))
    toast.success(`Refund Approved & Issued for Booking: ${bookingId}`)
    addAuditLog('APPROVE_REFUND', 'Booking / Payment Center', bookingId, 'Status: Confirmed', 'Status: Refunded', 'Approved refund request')
  }

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status'], note?: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status, lastUpdated: 'Just now' } : t))
    )
    toast.info(`Ticket #${ticketId} Status Updated to ${status}`)
    addAuditLog('UPDATE_TICKET', 'Customer Care CRM', ticketId, 'Status Changed', `New Status: ${status}`, note || 'Admin status update')
  }

  const addTicketMessage = (ticketId: string, text: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            sender: 'support_agent' as const,
            senderName: `${currentAdminName} (${currentRole})`,
            text,
            timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST',
          }
          return { ...t, messages: [...t.messages, newMsg], lastUpdated: 'Just now' }
        }
        return t
      })
    )
    toast.success(`Response Sent to Ticket #${ticketId}`)
  }

  const resolveDispute = (disputeId: string, verdict: string) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === disputeId ? { ...d, status: 'verdict_passed', finalVerdict: verdict } : d))
    )
    setKpis((prev) => ({ ...prev, disputesCount: Math.max(0, prev.disputesCount - 1) }))
    toast.success(`Dispute Verdict Finalized: ${disputeId}`)
    addAuditLog('RESOLVE_DISPUTE', 'Disputes & Legal', disputeId, 'Status: Under Investigation', 'Status: Resolved', verdict)
  }

  const moderateReview = (reviewId: string, status: ModeratedReview['status']) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status } : r))
    )
    toast.info(`Review #${reviewId} Marked as ${status}`)
    addAuditLog('MODERATE_REVIEW', 'Review Moderation', reviewId, 'Status Updated', `Status: ${status}`, 'Content moderation policy')
  }

  const broadcastAnnouncement = (title: string, message: string) => {
    const newCamp: MarketingCampaign = {
      id: `cmp-${Date.now()}`,
      title,
      type: 'Emergency Announcement',
      targetAudience: 'All Users',
      status: 'active',
      startDate: '2026-08-05',
      endDate: '2026-08-06',
      sentCount: 50160,
      openRatePercent: 98.4,
      clickRatePercent: 74.2,
      conversionsCount: 0,
    }
    setCampaigns((prev) => [newCamp, ...prev])

    const newActivity: ActivityFeedItem = {
      id: `act-${Date.now()}`,
      timestamp: 'Just now',
      type: 'account_susp',
      title: `BROADCAST: ${title}`,
      description: message,
      actorName: currentAdminName,
      actorRole: 'admin',
      severity: 'critical',
    }
    setActivityFeed((prev) => [newActivity, ...prev])

    toast.success(`Platform Emergency Broadcast Sent: "${title}"`)
    addAuditLog('EMERGENCY_BROADCAST', 'Marketing & Announcements', title, 'N/A', 'Broadcast Dispatched to 50k+ Users', message)
  }

  const toggleMaintenanceMode = () => {
    setSettings((prev) => {
      const next = !prev.maintenanceMode
      toast.warning(`Platform Maintenance Mode is now ${next ? 'ENABLED' : 'DISABLED'}`)
      addAuditLog('TOGGLE_MAINTENANCE', 'Platform Settings', 'Global System', `Maintenance: ${prev.maintenanceMode}`, `Maintenance: ${next}`, 'Admin system trigger')
      return { ...prev, maintenanceMode: next }
    })
  }

  const toggleEmergencyLockdown = () => {
    setSettings((prev) => {
      const next = !prev.emergencyLockdown
      if (next) {
        toast.error('EMERGENCY LOCKDOWN ACTIVATED! All payouts and new bookings frozen!')
      } else {
        toast.success('Emergency Lockdown Deactivated. System restored to normal operations.')
      }
      addAuditLog('EMERGENCY_LOCKDOWN', 'Platform Security', 'Global System', `Lockdown: ${prev.emergencyLockdown}`, `Lockdown: ${next}`, 'Emergency Lockdown Command')
      return { ...prev, emergencyLockdown: next }
    })
  }

  return (
    <MasterAdminContext.Provider
      value={{
        currentRole,
        setRole,
        currentAdminName,
        currentAdminEmail,
        systemHealth,
        kpis,
        activityFeed,
        alerts,
        planners,
        customers,
        documents,
        packages,
        bookings,
        payments,
        liveTrips,
        tickets,
        disputes,
        reviews,
        campaigns,
        auditLogs,
        settings,
        verifyPlanner,
        rejectPlanner,
        suspendPlanner,
        togglePayoutFreeze,
        suspendCustomer,
        blacklistCustomer,
        verifyDocument,
        rejectDocument,
        approvePackage,
        featurePackage,
        hidePackage,
        deletePackage,
        approvePayment,
        freezePayment,
        refundBooking,
        updateTicketStatus,
        addTicketMessage,
        resolveDispute,
        moderateReview,
        broadcastAnnouncement,
        toggleMaintenanceMode,
        toggleEmergencyLockdown,
        addAuditLog,
      }}
    >
      {children}
    </MasterAdminContext.Provider>
  )
}

export const useMasterAdmin = () => {
  const ctx = useContext(MasterAdminContext)
  if (!ctx) throw new Error('useMasterAdmin must be used within MasterAdminProvider')
  return ctx
}
