export interface SystemHealthItem {
  id: string
  name: string
  category: 'server' | 'database' | 'storage' | 'gateway' | 'third_party'
  status: 'operational' | 'degraded' | 'maintenance' | 'outage'
  latency: string
  uptime: string
  usagePercent?: number
  details: string
}

export interface PlatformKPICards {
  totalCustomers: number
  totalPlanners: number
  todaysBookings: number
  todaysRevenue: number
  activeTrips: number
  pendingPlannerVerifications: number
  pendingPaymentVerifications: number
  refundRequests: number
  customerSupportTickets: number
  disputesCount: number
  cancelledTripsCount: number
}

export interface ActivityFeedItem {
  id: string
  timestamp: string
  type: 'planner_reg' | 'customer_reg' | 'package_pub' | 'booking' | 'payment_verif' | 'trip_dept' | 'trip_cancel' | 'refund_req' | 'review_sub' | 'ticket_create' | 'account_susp'
  title: string
  description: string
  actorName: string
  actorRole: 'planner' | 'customer' | 'system' | 'admin'
  severity?: 'normal' | 'important' | 'critical'
}

export interface AlertItem {
  id: string
  timestamp: string
  type: 'pending_verif' | 'suspicious_payment' | 'duplicate_doc' | 'delayed_trip' | 'high_cancellation' | 'low_rating' | 'fake_review' | 'failed_payment' | 'storage_warning' | 'critical'
  title: string
  summary: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  targetId: string
  targetType: 'planner' | 'customer' | 'booking' | 'trip' | 'payment' | 'review' | 'system'
  recommendedAction: string
}

export interface PlannerProfile {
  id: string
  agencyName: string
  ownerName: string
  email: string
  phone: string
  location: string
  verificationStatus: 'verified' | 'pending' | 'rejected' | 'suspended' | 'under_review'
  verifiedBadge: boolean
  subscriptionPlan: 'Enterprise Pro' | 'Growth' | 'Starter'
  totalPackages: number
  publishedPackages: number
  totalRevenue: number
  totalBookings: number
  rating: number
  cancellationRate: number
  refundRate: number
  complaintCount: number
  riskScore: number // 0 - 100
  documentsUploaded: {
    aadhaar: boolean
    pan: boolean
    gst: boolean
    businessReg: boolean
    tourismLicense: boolean
    bankPassbook: boolean
    officeAddress: boolean
    businessLogo: boolean
    businessPhotos: boolean
  }
  duplicateDocFlag?: boolean
  duplicateDetails?: string
  joinedDate: string
  lastActive: string
  payoutFrozen: boolean
}

export interface CustomerProfile {
  id: string
  fullName: string
  email: string
  phone: string
  location: string
  joinedDate: string
  status: 'active' | 'suspended' | 'blacklisted'
  fraudRiskScore: number // 0 - 100
  totalBookings: number
  totalSpent: number
  reviewCount: number
  wishlistCount: number
  emergencyContact: { name: string; relation: string; phone: string }
  travelHistoryCount: number
  supportHistoryCount: number
  lastBookingDate: string
}

export interface MandatoryDocument {
  id: string
  plannerId: string
  plannerName: string
  docType: 'Aadhaar Card' | 'PAN Card' | 'GST Certificate' | 'Business Registration' | 'Tourism License' | 'Cancelled Cheque' | 'Office Address Proof' | 'Business Logo' | 'Business Photos'
  docNumber: string
  fileUrl: string
  uploadDate: string
  expiryDate?: string
  status: 'pending' | 'approved' | 'rejected' | 'reupload_requested'
  rejectionReason?: string
  duplicateAlert?: boolean
  duplicateMatchId?: string
}

export interface PackageItem {
  id: string
  title: string
  plannerId: string
  plannerName: string
  destination: string
  duration: string
  price: number
  status: 'draft' | 'published' | 'hidden' | 'archived' | 'reported' | 'trending' | 'duplicate' | 'featured'
  qualityScore: number // 0 - 100
  duplicateContentScore?: number
  bookingsCount: number
  rating: number
  reviewCount: number
  createdAt: string
  category: string
}

export interface BookingRecord {
  id: string
  bookingCode: string
  packageId: string
  packageName: string
  destination: string
  customerName: string
  customerPhone: string
  customerEmail: string
  plannerName: string
  plannerPhone: string
  amount: number
  paymentMethod: 'UPI / UTR' | 'Razorpay Credit Card' | 'Netbanking' | 'Wallet'
  utrNumber?: string
  status: 'confirmed' | 'pending_verification' | 'completed' | 'cancelled' | 'refunded' | 'frozen'
  bookingDate: string
  departureDate: string
  travellersCount: number
  pickupPoint: string
  mealPreference: string
  invoiceNumber: string
  tripStatus: 'upcoming' | 'ongoing' | 'completed' | 'cancelled'
}

export interface PaymentTransaction {
  id: string
  transactionId: string
  utrNumber: string
  bookingCode: string
  customerName: string
  plannerName: string
  amount: number
  commissionAmount: number
  commissionPercent: number
  settlementAmount: number
  gateway: 'Razorpay' | 'Direct UPI' | 'Stripe India' | 'ICICI e-Banking'
  paymentStatus: 'verified' | 'pending_verification' | 'rejected' | 'duplicate_utr' | 'refunded' | 'frozen'
  fraudFlag: boolean
  timestamp: string
  settlementStatus: 'settled' | 'pending' | 'frozen' | 'processing'
}

export interface LiveTripDeparture {
  id: string
  tripCode: string
  packageName: string
  destination: string
  plannerName: string
  plannerPhone: string
  departureTime: string
  returnTime: string
  travellerCount: number
  maxCapacity: number
  occupancyPercent: number
  vehicleInfo: string
  tourGuideName: string
  tourGuidePhone: string
  status: 'on_schedule' | 'delayed' | 'emergency_alert' | 'completed' | 'cancelled'
  currentLocationName: string
  gpsCoordinates: { lat: number; lng: number }
  openComplaintsCount: number
  plannerResponseStatus: 'responsive' | 'unresponsive' | 'action_taken'
}

export interface SupportTicket {
  id: string
  ticketCode: string
  customerName: string
  customerPhone: string
  plannerName?: string
  bookingCode?: string
  category: 'Refund Request' | 'Verification Help' | 'Trip Emergency' | 'Package Dispute' | 'Technical Bug' | 'Payment Issue' | 'General Query'
  priority: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'Open' | 'Waiting for Customer' | 'Waiting for Planner' | 'Escalated' | 'Resolved' | 'Closed'
  assignedExecutive: string
  slaTimeRemaining: string
  slaExceeded: boolean
  createdAt: string
  lastUpdated: string
  messages: Array<{
    id: string
    sender: 'customer' | 'planner' | 'support_agent' | 'system'
    senderName: string
    text: string
    timestamp: string
    attachments?: string[]
  }>
}

export interface DisputeCase {
  id: string
  caseNumber: string
  category: 'Planner Fraud' | 'Customer Fraud' | 'Fake Payments' | 'Fake Reviews' | 'Package Misrepresentation' | 'Safety Incident' | 'Refund Dispute' | 'Service Quality'
  complainantName: string
  complainantRole: 'customer' | 'planner'
  respondentName: string
  respondentRole: 'customer' | 'planner'
  bookingCode: string
  disputedAmount: number
  status: 'under_investigation' | 'evidence_requested' | 'verdict_passed' | 'refund_issued' | 'closed'
  assignedOfficer: string
  filedDate: string
  evidenceList: Array<{ name: string; url: string; uploadedBy: string; date: string }>
  investigationNotes: string
  finalVerdict?: string
}

export interface ModeratedReview {
  id: string
  reviewId: string
  packageName: string
  plannerName: string
  customerName: string
  rating: number
  comment: string
  createdAt: string
  status: 'approved' | 'reported' | 'hidden' | 'fake' | 'low_rated' | 'abusive' | 'under_investigation'
  reportReason?: string
  sentimentScore: number // -1 to 1
}

export interface MarketingCampaign {
  id: string
  title: string
  type: 'Homepage Banner' | 'Push Broadcast' | 'Email Campaign' | 'Festival Promo' | 'Emergency Announcement' | 'Planner Broadcast'
  targetAudience: 'All Users' | 'Verified Planners' | 'High-Value Customers' | 'North India Region' | 'Custom Segment'
  status: 'active' | 'scheduled' | 'draft' | 'completed'
  startDate: string
  endDate: string
  sentCount: number
  openRatePercent: number
  clickRatePercent: number
  conversionsCount: number
}

export interface AuditLogEntry {
  id: string
  timestamp: string
  actorId: string
  actorName: string
  actorRole: string
  ipAddress: string
  deviceInfo: string
  action: string
  affectedModule: string
  targetEntity: string
  previousValue: string
  newValue: string
  reason: string
}

export interface SystemSettingsConfig {
  maintenanceMode: boolean
  emergencyLockdown: boolean
  globalCommissionPercent: number
  gstPercent: number
  minPayoutThreshold: number
  autoVerificationAI: boolean
  duplicateUTRStrictCheck: boolean
  maxCancellationThreshold: number
  razorpayMode: 'live' | 'test'
  googleMapsApiKeyConfigured: boolean
  emailGatewayStatus: string
  smsGatewayStatus: string
}

// MOCK DATA COLLECTION
export const initialSystemHealth: SystemHealthItem[] = [
  { id: 'sh-1', name: 'Primary API Cluster (US-East)', category: 'server', status: 'operational', latency: '24ms', uptime: '99.99%', details: '16/16 Nodes Healthy, CPU 34%, Memory 52%' },
  { id: 'sh-2', name: 'India Edge Gateway (Mumbai)', category: 'server', status: 'operational', latency: '8ms', uptime: '100%', details: '8/8 Nodes Healthy, Auto-scaled' },
  { id: 'sh-3', name: 'PostgreSQL Primary DB Cluster', category: 'database', status: 'operational', latency: '4ms', uptime: '99.98%', details: 'Replication lag 0.2s, Active connections 142/500' },
  { id: 'sh-4', name: 'Redis Cache & Session Cluster', category: 'database', status: 'operational', latency: '1ms', uptime: '100%', details: 'Hit ratio 96.8%, Used memory 4.2 GB' },
  { id: 'sh-5', name: 'AWS S3 Document & Image Vault', category: 'storage', status: 'operational', latency: '45ms', uptime: '99.99%', usagePercent: 68, details: 'Storage used 2.4 TB / 5 TB quota' },
  { id: 'sh-6', name: 'Razorpay Payment Gateway API', category: 'gateway', status: 'operational', latency: '110ms', uptime: '99.95%', details: 'Webhooks active, 0 failed callbacks' },
  { id: 'sh-7', name: 'Google Maps Places & Distance API', category: 'third_party', status: 'operational', latency: '82ms', uptime: '99.90%', details: 'Daily quota 42% consumed' },
  { id: 'sh-8', name: 'SendGrid Email Delivery Service', category: 'third_party', status: 'operational', latency: '150ms', uptime: '99.97%', details: 'Delivery rate 99.2%, 0 queued' },
  { id: 'sh-9', name: 'MSG91 SMS & WhatsApp Gateway', category: 'third_party', status: 'operational', latency: '95ms', uptime: '99.85%', details: 'OTP latency < 3 seconds' },
]

export const initialKPICards: PlatformKPICards = {
  totalCustomers: 48920,
  totalPlanners: 1240,
  todaysBookings: 342,
  todaysRevenue: 1845000,
  activeTrips: 186,
  pendingPlannerVerifications: 14,
  pendingPaymentVerifications: 28,
  refundRequests: 9,
  customerSupportTickets: 31,
  disputesCount: 5,
  cancelledTripsCount: 2,
}

export const initialActivityFeed: ActivityFeedItem[] = [
  { id: 'act-1', timestamp: 'Just now', type: 'booking', title: 'New Premium Booking', description: 'Booked "5D/4N Spiti Valley Expedition" for 4 travellers ₹88,000', actorName: 'Aarav Sharma', actorRole: 'customer' },
  { id: 'act-2', timestamp: '3 mins ago', type: 'payment_verif', title: 'UTR Payment Auto-Verified', description: 'UTR #429810482910 verified for Booking #BCN-84920 (₹24,500)', actorName: 'System Engine', actorRole: 'system', severity: 'normal' },
  { id: 'act-3', timestamp: '8 mins ago', type: 'planner_reg', title: 'New Planner Application', description: 'Himalayan Wayfarers Pvt Ltd submitted KYC for Verification', actorName: 'Vikramaditya Singh', actorRole: 'planner', severity: 'important' },
  { id: 'act-4', timestamp: '14 mins ago', type: 'trip_dept', title: 'Trip Departure Started', description: 'Departure #DEP-904 (Manali to Leh Biking) status marked ONGOING', actorName: 'Highland Expeditions', actorRole: 'planner' },
  { id: 'act-5', timestamp: '22 mins ago', type: 'refund_req', title: 'Refund Requested by Customer', description: 'Refund requested for Booking #BCN-81049 due to medical emergency', actorName: 'Priya Nambiar', actorRole: 'customer', severity: 'important' },
  { id: 'act-6', timestamp: '35 mins ago', type: 'ticket_create', title: 'Critical Support Ticket', description: 'Bus delay complaint logged for Departure #DEP-882 (Coorg Trek)', actorName: 'Rohan Mehta', actorRole: 'customer', severity: 'critical' },
  { id: 'act-7', timestamp: '48 mins ago', type: 'package_pub', title: 'New Package Published', description: 'Published "Goa Sunset Catamaran & Beach Stay (3D/2N)"', actorName: 'Oceanic Treks & Trails', actorRole: 'planner' },
  { id: 'act-8', timestamp: '1 hour ago', type: 'account_susp', title: 'Planner Payout Frozen', description: 'Payout frozen for "Apex Travels" pending document verification check', actorName: 'Admin Guard', actorRole: 'admin', severity: 'critical' },
]

export const initialAlerts: AlertItem[] = [
  { id: 'alt-1', timestamp: '10 mins ago', type: 'duplicate_doc', title: 'Duplicate PAN Card Detected', summary: 'Planner "Apex Adventures" uploaded PAN #ABCDE1234F which matches verified planner "Zenith Tours".', severity: 'critical', targetId: 'pln-102', targetType: 'planner', recommendedAction: 'Freeze payout & flag account for immediate document audit' },
  { id: 'alt-2', timestamp: '25 mins ago', type: 'suspicious_payment', title: 'Repeated UTR Submission Attempt', summary: 'UTR #9988112233 entered 3 times across different customer accounts within 10 minutes.', severity: 'critical', targetId: 'pay-409', targetType: 'payment', recommendedAction: 'Block UTR and flag accounts for payment fraud' },
  { id: 'alt-3', timestamp: '40 mins ago', type: 'delayed_trip', title: 'Trip Departure Delayed > 2 Hours', summary: 'Departure #DEP-774 (Kashmir Great Lakes) is 140 minutes behind schedule. Planner unresponsive.', severity: 'high', targetId: 'trp-304', targetType: 'trip', recommendedAction: 'Trigger automated traveller broadcast & contact local emergency guide' },
  { id: 'alt-4', timestamp: '1 hour ago', type: 'high_cancellation', title: 'High Cancellation Rate Warning', summary: 'Planner "Valley Nomads" cancellation rate reached 24.5% over the past 30 days (Threshold 15%).', severity: 'high', targetId: 'pln-108', targetType: 'planner', recommendedAction: 'Suspend package publishing until performance review' },
  { id: 'alt-5', timestamp: '2 hours ago', type: 'fake_review', title: 'Cluster Fake Reviews Flagged', summary: '5 five-star reviews posted from identical IP subnet within 4 minutes for Package #PKG-502.', severity: 'medium', targetId: 'rev-901', targetType: 'review', recommendedAction: 'Hide reviews & send warning notice to planner' },
  { id: 'alt-6', timestamp: '3 hours ago', type: 'storage_warning', title: 'Storage Capacity Alert', summary: 'AWS S3 Document bucket crossed 68% total capacity.', severity: 'low', targetId: 'sys-1', targetType: 'system', recommendedAction: 'Run archive policy job' },
]

export const initialPlanners: PlannerProfile[] = [
  {
    id: 'pln-101',
    agencyName: 'Himalayan Treks & Trails',
    ownerName: 'Rajesh Verma',
    email: 'rajesh@himalayantreks.in',
    phone: '+91 98765 43210',
    location: 'Manali, Himachal Pradesh',
    verificationStatus: 'verified',
    verifiedBadge: true,
    subscriptionPlan: 'Enterprise Pro',
    totalPackages: 18,
    publishedPackages: 14,
    totalRevenue: 14250000,
    totalBookings: 840,
    rating: 4.9,
    cancellationRate: 2.1,
    refundRate: 1.5,
    complaintCount: 1,
    riskScore: 4,
    documentsUploaded: { aadhaar: true, pan: true, gst: true, businessReg: true, tourismLicense: true, bankPassbook: true, officeAddress: true, businessLogo: true, businessPhotos: true },
    joinedDate: '2024-03-15',
    lastActive: '10 mins ago',
    payoutFrozen: false,
  },
  {
    id: 'pln-102',
    agencyName: 'Apex Adventures Pvt Ltd',
    ownerName: 'Sanjay Deshmukh',
    email: 'sanjay@apexadventures.com',
    phone: '+91 98112 33445',
    location: 'Rishikesh, Uttarakhand',
    verificationStatus: 'under_review',
    verifiedBadge: false,
    subscriptionPlan: 'Growth',
    totalPackages: 6,
    publishedPackages: 0,
    totalRevenue: 0,
    totalBookings: 0,
    rating: 0,
    cancellationRate: 0,
    refundRate: 0,
    complaintCount: 0,
    riskScore: 78,
    documentsUploaded: { aadhaar: true, pan: true, gst: true, businessReg: true, tourismLicense: false, bankPassbook: true, officeAddress: true, businessLogo: true, businessPhotos: false },
    duplicateDocFlag: true,
    duplicateDetails: 'PAN Card matches existing registered planner Zenith Tours',
    joinedDate: '2026-08-01',
    lastActive: '25 mins ago',
    payoutFrozen: true,
  },
  {
    id: 'pln-103',
    agencyName: 'Western Ghats Wanderers',
    ownerName: 'Ananya Nair',
    email: 'ananya@westernghats.com',
    phone: '+91 97445 66778',
    location: 'Munnar, Kerala',
    verificationStatus: 'verified',
    verifiedBadge: true,
    subscriptionPlan: 'Growth',
    totalPackages: 12,
    publishedPackages: 10,
    totalRevenue: 6800000,
    totalBookings: 410,
    rating: 4.8,
    cancellationRate: 1.8,
    refundRate: 0.9,
    complaintCount: 0,
    riskScore: 6,
    documentsUploaded: { aadhaar: true, pan: true, gst: true, businessReg: true, tourismLicense: true, bankPassbook: true, officeAddress: true, businessLogo: true, businessPhotos: true },
    joinedDate: '2024-09-10',
    lastActive: '1 hour ago',
    payoutFrozen: false,
  },
  {
    id: 'pln-104',
    agencyName: 'Desert Oasis Travels',
    ownerName: 'Vikram Rathore',
    email: 'vikram@desertoasis.in',
    phone: '+91 94140 98765',
    location: 'Jaisalmer, Rajasthan',
    verificationStatus: 'pending',
    verifiedBadge: false,
    subscriptionPlan: 'Starter',
    totalPackages: 4,
    publishedPackages: 0,
    totalRevenue: 0,
    totalBookings: 0,
    rating: 0,
    cancellationRate: 0,
    refundRate: 0,
    complaintCount: 0,
    riskScore: 22,
    documentsUploaded: { aadhaar: true, pan: true, gst: false, businessReg: true, tourismLicense: true, bankPassbook: true, officeAddress: true, businessLogo: true, businessPhotos: true },
    joinedDate: '2026-08-03',
    lastActive: '3 hours ago',
    payoutFrozen: false,
  },
  {
    id: 'pln-105',
    agencyName: 'Valley Nomads & Co',
    ownerName: 'Tashi Namgyal',
    email: 'tashi@valleynomads.com',
    phone: '+91 96229 11223',
    location: 'Leh, Ladakh',
    verificationStatus: 'suspended',
    verifiedBadge: false,
    subscriptionPlan: 'Growth',
    totalPackages: 8,
    publishedPackages: 0,
    totalRevenue: 3400000,
    totalBookings: 190,
    rating: 3.6,
    cancellationRate: 24.5,
    refundRate: 14.2,
    complaintCount: 7,
    riskScore: 88,
    documentsUploaded: { aadhaar: true, pan: true, gst: true, businessReg: true, tourismLicense: true, bankPassbook: true, officeAddress: true, businessLogo: true, businessPhotos: true },
    joinedDate: '2025-02-18',
    lastActive: 'Yesterday',
    payoutFrozen: true,
  },
]

export const initialCustomers: CustomerProfile[] = [
  {
    id: 'cst-201',
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '+91 98200 11223',
    location: 'Mumbai, Maharashtra',
    joinedDate: '2024-01-12',
    status: 'active',
    fraudRiskScore: 3,
    totalBookings: 9,
    totalSpent: 312000,
    reviewCount: 7,
    wishlistCount: 14,
    emergencyContact: { name: 'Sunita Sharma', relation: 'Mother', phone: '+91 98200 99887' },
    travelHistoryCount: 8,
    supportHistoryCount: 1,
    lastBookingDate: '2026-08-05',
  },
  {
    id: 'cst-202',
    fullName: 'Rohan Kulkarni',
    email: 'rohan.k@outlook.com',
    phone: '+91 98900 44556',
    location: 'Pune, Maharashtra',
    joinedDate: '2025-05-20',
    status: 'active',
    fraudRiskScore: 12,
    totalBookings: 4,
    totalSpent: 98000,
    reviewCount: 3,
    wishlistCount: 6,
    emergencyContact: { name: 'Neha Kulkarni', relation: 'Spouse', phone: '+91 98900 11223' },
    travelHistoryCount: 3,
    supportHistoryCount: 0,
    lastBookingDate: '2026-07-28',
  },
  {
    id: 'cst-203',
    fullName: 'Karan Malhotra',
    email: 'karan.malhotra99@tempmail.com',
    phone: '+91 91122 33445',
    location: 'Delhi NCR',
    joinedDate: '2026-07-30',
    status: 'suspended',
    fraudRiskScore: 92,
    totalBookings: 3,
    totalSpent: 75000,
    reviewCount: 0,
    wishlistCount: 0,
    emergencyContact: { name: 'Unknown', relation: 'None', phone: '+91 90000 00000' },
    travelHistoryCount: 0,
    supportHistoryCount: 4,
    lastBookingDate: '2026-08-02',
  },
]

export const initialDocuments: MandatoryDocument[] = [
  { id: 'doc-1', plannerId: 'pln-102', plannerName: 'Apex Adventures Pvt Ltd', docType: 'PAN Card', docNumber: 'ABCDE1234F', fileUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', uploadDate: '2026-08-01', status: 'pending', duplicateAlert: true, duplicateMatchId: 'Zenith Tours (PAN #ABCDE1234F)' },
  { id: 'doc-2', plannerId: 'pln-102', plannerName: 'Apex Adventures Pvt Ltd', docType: 'GST Certificate', docNumber: '07ABCDE1234F1Z5', fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80', uploadDate: '2026-08-01', status: 'pending' },
  { id: 'doc-3', plannerId: 'pln-104', plannerName: 'Desert Oasis Travels', docType: 'Aadhaar Card', docNumber: '**** **** 8912', fileUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80', uploadDate: '2026-08-03', status: 'pending' },
  { id: 'doc-4', plannerId: 'pln-104', plannerName: 'Desert Oasis Travels', docType: 'Tourism License', docNumber: 'RAJ-TOUR-2025-8841', fileUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80', uploadDate: '2026-08-03', expiryDate: '2027-12-31', status: 'pending' },
  { id: 'doc-5', plannerId: 'pln-101', plannerName: 'Himalayan Treks & Trails', docType: 'GST Certificate', docNumber: '02AAACH1234K1Z2', fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80', uploadDate: '2024-03-15', status: 'approved' },
]

export const initialPackages: PackageItem[] = [
  { id: 'pkg-501', title: 'Spiti Valley Winter White Expedition (7D/6N)', plannerId: 'pln-101', plannerName: 'Himalayan Treks & Trails', destination: 'Spiti, Himachal Pradesh', duration: '7 Days / 6 Nights', price: 22500, status: 'featured', qualityScore: 98, bookingsCount: 142, rating: 4.9, reviewCount: 48, createdAt: '2025-10-12', category: 'Trekking & Adventure' },
  { id: 'pkg-502', title: 'Manali to Leh Motorbike Safari 2026', plannerId: 'pln-101', plannerName: 'Himalayan Treks & Trails', destination: 'Leh Ladakh', duration: '10 Days / 9 Nights', price: 34999, status: 'published', qualityScore: 94, duplicateContentScore: 8, bookingsCount: 98, rating: 4.8, reviewCount: 32, createdAt: '2026-01-15', category: 'Biking & Roadtrips' },
  { id: 'pkg-503', title: 'Munnar Tea Estate & Wayanad Eco Stays', plannerId: 'pln-103', plannerName: 'Western Ghats Wanderers', destination: 'Munnar, Kerala', duration: '4 Days / 3 Nights', price: 14500, status: 'published', qualityScore: 92, bookingsCount: 84, rating: 4.9, reviewCount: 29, createdAt: '2025-11-20', category: 'Nature & Luxury' },
  { id: 'pkg-504', title: 'Jaisalmer Desert Camping & Camel Trek', plannerId: 'pln-104', plannerName: 'Desert Oasis Travels', destination: 'Jaisalmer, Rajasthan', duration: '3 Days / 2 Nights', price: 8999, status: 'draft', qualityScore: 65, bookingsCount: 0, rating: 0, reviewCount: 0, createdAt: '2026-08-03', category: 'Cultural & Heritage' },
  { id: 'pkg-505', title: 'Kashmir Paradise Lakes Trek', plannerId: 'pln-105', plannerName: 'Valley Nomads & Co', destination: 'Srinagar, Kashmir', duration: '6 Days / 5 Nights', price: 18999, status: 'reported', qualityScore: 54, duplicateContentScore: 42, bookingsCount: 32, rating: 3.4, reviewCount: 12, createdAt: '2025-06-10', category: 'Trekking & Adventure' },
]

export const initialBookings: BookingRecord[] = [
  { id: 'bk-84920', bookingCode: 'BCN-84920', packageId: 'pkg-501', packageName: 'Spiti Valley Winter White Expedition', destination: 'Spiti, Himachal', customerName: 'Aarav Sharma', customerPhone: '+91 98200 11223', customerEmail: 'aarav.sharma@gmail.com', plannerName: 'Himalayan Treks & Trails', plannerPhone: '+91 98765 43210', amount: 88000, paymentMethod: 'UPI / UTR', utrNumber: '429810482910', status: 'confirmed', bookingDate: '2026-08-05', departureDate: '2026-08-20', travellersCount: 4, pickupPoint: 'Chandigarh ISBT Sector 43', mealPreference: 'Vegetarian & Jain', invoiceNumber: 'INV-2026-8812', tripStatus: 'upcoming' },
  { id: 'bk-84921', bookingCode: 'BCN-84921', packageId: 'pkg-503', packageName: 'Munnar Tea Estate & Wayanad Eco Stays', destination: 'Munnar, Kerala', customerName: 'Rohan Kulkarni', customerPhone: '+91 98900 44556', customerEmail: 'rohan.k@outlook.com', plannerName: 'Western Ghats Wanderers', plannerPhone: '+91 97445 66778', amount: 29000, paymentMethod: 'Razorpay Credit Card', utrNumber: 'PAY_RZP_99182', status: 'completed', bookingDate: '2026-07-20', departureDate: '2026-08-01', travellersCount: 2, pickupPoint: 'Kochi Airport Terminal 1', mealPreference: 'Non-Vegetarian', invoiceNumber: 'INV-2026-8104', tripStatus: 'completed' },
  { id: 'bk-84922', bookingCode: 'BCN-84922', packageId: 'pkg-505', packageName: 'Kashmir Paradise Lakes Trek', destination: 'Srinagar, Kashmir', customerName: 'Priya Nambiar', customerPhone: '+91 96112 23344', customerEmail: 'priya.n@gmail.com', plannerName: 'Valley Nomads & Co', plannerPhone: '+91 96229 11223', amount: 37998, paymentMethod: 'UPI / UTR', utrNumber: '119922883344', status: 'pending_verification', bookingDate: '2026-08-04', departureDate: '2026-08-15', travellersCount: 2, pickupPoint: 'Srinagar Airport Gate 2', mealPreference: 'Standard', invoiceNumber: 'INV-2026-8940', tripStatus: 'upcoming' },
]

export const initialPayments: PaymentTransaction[] = [
  { id: 'pay-401', transactionId: 'TXN-994812', utrNumber: '429810482910', bookingCode: 'BCN-84920', customerName: 'Aarav Sharma', plannerName: 'Himalayan Treks & Trails', amount: 88000, commissionAmount: 8800, commissionPercent: 10, settlementAmount: 79200, gateway: 'Direct UPI', paymentStatus: 'verified', fraudFlag: false, timestamp: '2026-08-05 09:42 IST', settlementStatus: 'pending' },
  { id: 'pay-402', transactionId: 'TXN-991204', utrNumber: '9988112233', bookingCode: 'BCN-84922', customerName: 'Karan Malhotra', plannerName: 'Valley Nomads & Co', amount: 37998, commissionAmount: 4559, commissionPercent: 12, settlementAmount: 33439, gateway: 'Direct UPI', paymentStatus: 'duplicate_utr', fraudFlag: true, timestamp: '2026-08-04 18:20 IST', settlementStatus: 'frozen' },
  { id: 'pay-403', transactionId: 'TXN-984410', utrNumber: 'PAY_RZP_99182', bookingCode: 'BCN-84921', customerName: 'Rohan Kulkarni', plannerName: 'Western Ghats Wanderers', amount: 29000, commissionAmount: 2900, commissionPercent: 10, settlementAmount: 26100, gateway: 'Razorpay', paymentStatus: 'verified', fraudFlag: false, timestamp: '2026-07-20 14:15 IST', settlementStatus: 'settled' },
]

export const initialLiveTrips: LiveTripDeparture[] = [
  {
    id: 'trp-301',
    tripCode: 'DEP-904',
    packageName: 'Manali to Leh Motorbike Safari 2026',
    destination: 'Leh Ladakh',
    plannerName: 'Himalayan Treks & Trails',
    plannerPhone: '+91 98765 43210',
    departureTime: '2026-08-03 06:00 IST',
    returnTime: '2026-08-13 18:00 IST',
    travellerCount: 16,
    maxCapacity: 20,
    occupancyPercent: 80,
    vehicleInfo: '12 Royal Enfield Himalayan 450s + 2 Backup Tempo Travelers',
    tourGuideName: 'Stanzin Dorjay',
    tourGuidePhone: '+91 94191 00998',
    status: 'on_schedule',
    currentLocationName: 'Sarchu Campsite (Alt: 4,290m)',
    gpsCoordinates: { lat: 32.908, lng: 77.581 },
    openComplaintsCount: 0,
    plannerResponseStatus: 'responsive',
  },
  {
    id: 'trp-302',
    tripCode: 'DEP-882',
    packageName: 'Munnar Tea Estate & Wayanad Eco Stays',
    destination: 'Munnar, Kerala',
    plannerName: 'Western Ghats Wanderers',
    plannerPhone: '+91 97445 66778',
    departureTime: '2026-08-04 07:00 IST',
    returnTime: '2026-08-08 20:00 IST',
    travellerCount: 12,
    maxCapacity: 12,
    occupancyPercent: 100,
    vehicleInfo: 'Urbania 17-Seater Luxury Bus (KL-07-BZ-9001)',
    tourGuideName: 'Suresh Kumar',
    tourGuidePhone: '+91 98470 12345',
    status: 'delayed',
    currentLocationName: 'En route to Anamudi Viewpoint (Heavy Rain Slowdown)',
    gpsCoordinates: { lat: 10.088, lng: 77.059 },
    openComplaintsCount: 1,
    plannerResponseStatus: 'action_taken',
  },
  {
    id: 'trp-303',
    tripCode: 'DEP-774',
    packageName: 'Kashmir Paradise Lakes Trek',
    destination: 'Srinagar, Kashmir',
    plannerName: 'Valley Nomads & Co',
    plannerPhone: '+91 96229 11223',
    departureTime: '2026-08-05 05:00 IST',
    returnTime: '2026-08-11 19:00 IST',
    travellerCount: 8,
    maxCapacity: 15,
    occupancyPercent: 53,
    vehicleInfo: 'Tempo Traveler (JK-01-X-4412)',
    tourGuideName: 'Mohammad Farooq',
    tourGuidePhone: '+91 99066 88776',
    status: 'emergency_alert',
    currentLocationName: 'Sonamarg Base Camp (Guide reported route delay)',
    gpsCoordinates: { lat: 34.305, lng: 75.293 },
    openComplaintsCount: 3,
    plannerResponseStatus: 'unresponsive',
  },
]

export const initialSupportTickets: SupportTicket[] = [
  {
    id: 'tkt-701',
    ticketCode: 'TCK-88102',
    customerName: 'Rohan Mehta',
    customerPhone: '+91 98199 00112',
    plannerName: 'Western Ghats Wanderers',
    bookingCode: 'BCN-84921',
    category: 'Trip Emergency',
    priority: 'Critical',
    status: 'Escalated',
    assignedExecutive: 'Neha Varma (Senior Care)',
    slaTimeRemaining: '00:14:30',
    slaExceeded: false,
    createdAt: '2026-08-05 08:30 IST',
    lastUpdated: '10 mins ago',
    messages: [
      { id: 'm-1', sender: 'customer', senderName: 'Rohan Mehta', text: 'Our bus driver has been driving recklessly near Munnar ghats in heavy rain. Please intervene!', timestamp: '08:30 IST' },
      { id: 'm-2', sender: 'support_agent', senderName: 'Neha Varma', text: 'We have received your emergency alert. Escalated immediately to Operations Command & Western Ghats Wanderers management.', timestamp: '08:32 IST' },
      { id: 'm-3', sender: 'planner', senderName: 'Ananya Nair (Planner)', text: 'We contacted the vehicle driver and assigned co-driver. Driver replaced at next highway halt.', timestamp: '08:45 IST' },
    ],
  },
  {
    id: 'tkt-702',
    ticketCode: 'TCK-88094',
    customerName: 'Priya Nambiar',
    customerPhone: '+91 96112 23344',
    plannerName: 'Valley Nomads & Co',
    bookingCode: 'BCN-84922',
    category: 'Refund Request',
    priority: 'High',
    status: 'Waiting for Planner',
    assignedExecutive: 'Vikram Sethi (Finance & Support)',
    slaTimeRemaining: '01:45:00',
    slaExceeded: false,
    createdAt: '2026-08-04 16:20 IST',
    lastUpdated: '1 hour ago',
    messages: [
      { id: 'm-10', sender: 'customer', senderName: 'Priya Nambiar', text: 'My flight to Srinagar got cancelled due to bad weather. Requesting full refund or date shift.', timestamp: '16:20 IST' },
    ],
  },
]

export const initialDisputes: DisputeCase[] = [
  {
    id: 'dsp-901',
    caseNumber: 'DSP-2026-004',
    category: 'Planner Fraud',
    complainantName: 'Karan Malhotra',
    complainantRole: 'customer',
    respondentName: 'Valley Nomads & Co',
    respondentRole: 'planner',
    bookingCode: 'BCN-84922',
    disputedAmount: 37998,
    status: 'under_investigation',
    assignedOfficer: 'Adv. Sameer Joshi (Legal Head)',
    filedDate: '2026-08-04',
    evidenceList: [
      { name: 'Flight_Cancellation_Proof.pdf', url: '#', uploadedBy: 'Customer', date: '2026-08-04' },
      { name: 'WhatsApp_Chat_Screenshot.png', url: '#', uploadedBy: 'Customer', date: '2026-08-04' },
    ],
    investigationNotes: 'Complainant submitted flight cancellation certificate. Planner refuses full refund citing 14-day cancellation policy. Under legal audit.',
  },
]

export const initialReviews: ModeratedReview[] = [
  { id: 'rev-1', reviewId: 'REV-901', packageName: 'Spiti Valley Winter White Expedition', plannerName: 'Himalayan Treks & Trails', customerName: 'Aarav Sharma', rating: 5, comment: 'Breathtaking experience! The homestays were warm, gear was top quality, and guide Stanzin was legendary.', createdAt: '2026-08-02', status: 'approved', sentimentScore: 0.95 },
  { id: 'rev-2', reviewId: 'REV-902', packageName: 'Kashmir Paradise Lakes Trek', plannerName: 'Valley Nomads & Co', customerName: 'SpamUser99', rating: 1, comment: 'Totally fraud agency! Cancelled my trip without refund and stolen money!', createdAt: '2026-08-04', status: 'fake', reportReason: 'Detected spam IP cluster & competitor defamation', sentimentScore: -0.9 },
]

export const initialCampaigns: MarketingCampaign[] = [
  { id: 'cmp-1', title: 'Independence Day August Freedom Trek Sale', type: 'Homepage Banner', targetAudience: 'All Users', status: 'active', startDate: '2026-08-01', endDate: '2026-08-16', sentCount: 48900, openRatePercent: 42.5, clickRatePercent: 18.2, conversionsCount: 1420 },
  { id: 'cmp-2', title: 'Early Bird Winter Spiti Expedition Blast', type: 'Push Broadcast', targetAudience: 'High-Value Customers', status: 'active', startDate: '2026-08-04', endDate: '2026-08-10', sentCount: 12400, openRatePercent: 64.1, clickRatePercent: 28.9, conversionsCount: 380 },
]

export const initialAuditLogs: AuditLogEntry[] = [
  { id: 'log-1001', timestamp: '2026-08-05 10:14:22 IST', actorId: 'adm-001', actorName: 'Master SuperAdmin', actorRole: 'Super Admin', ipAddress: '103.21.124.88', deviceInfo: 'macOS Chrome 127', action: 'FREEZE_PAYOUT', affectedModule: 'Planner Management', targetEntity: 'Apex Adventures Pvt Ltd (pln-102)', previousValue: 'Payout Status: Active', newValue: 'Payout Status: Frozen', reason: 'Duplicate PAN card detected across accounts' },
  { id: 'log-1002', timestamp: '2026-08-05 09:50:11 IST', actorId: 'adm-004', actorName: 'Ritu Kapoor', actorRole: 'Verification Manager', ipAddress: '49.207.19.45', deviceInfo: 'Windows Edge 126', action: 'APPROVE_VERIFICATION', affectedModule: 'Verification Center', targetEntity: 'Western Ghats Wanderers (pln-103)', previousValue: 'Status: Pending', newValue: 'Status: Verified (Badge Granted)', reason: 'All 9 mandatory documents verified successfully' },
  { id: 'log-1003', timestamp: '2026-08-05 08:32:05 IST', actorId: 'adm-008', actorName: 'Neha Varma', actorRole: 'Customer Care Executive', ipAddress: '115.240.88.12', deviceInfo: 'Ubuntu Firefox 128', action: 'ESCALATE_TICKET', affectedModule: 'Customer Care CRM', targetEntity: 'TCK-88102 (Rohan Mehta)', previousValue: 'Priority: High', newValue: 'Priority: Critical (Escalated to Ops Command)', reason: 'Reckless driving report on active departure' },
]

export const initialSettings: SystemSettingsConfig = {
  maintenanceMode: false,
  emergencyLockdown: false,
  globalCommissionPercent: 10,
  gstPercent: 18,
  minPayoutThreshold: 5000,
  autoVerificationAI: true,
  duplicateUTRStrictCheck: true,
  maxCancellationThreshold: 15,
  razorpayMode: 'live',
  googleMapsApiKeyConfigured: true,
  emailGatewayStatus: 'SendGrid Production Connected',
  smsGatewayStatus: 'MSG91 Enterprise Active',
}
