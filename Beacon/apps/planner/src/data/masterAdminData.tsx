import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ==========================================
// TYPES DEFINITIONS
// ==========================================

export type SystemMode = 'LIVE' | 'MAINTENANCE' | 'EMERGENCY_LOCKDOWN';
export type AdminRole = 
  | 'Super Admin' 
  | 'CEO' 
  | 'Operations Head' 
  | 'Verification Manager' 
  | 'Finance Manager' 
  | 'Customer Care Manager' 
  | 'Legal Officer'
  | 'Marketing Executive';

export interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  latency: number;
  uptime: number;
}

export interface InfrastructureHealth {
  cpuUsage: number;
  memoryUsage: number;
  dbConnections: number;
  storageUsage: number;
  services: ServiceStatus[];
}

export interface KpiMetric {
  value: string | number;
  change: string;
  isPositive: boolean;
}

export interface KpiMetrics {
  totalCustomers: KpiMetric;
  totalPlanners: KpiMetric;
  bookingsCount: KpiMetric;
  totalRevenue: KpiMetric;
  activeTrips: KpiMetric;
  pendingVerifications: KpiMetric;
  activeDisputes: KpiMetric;
  fraudAlertsCount: KpiMetric;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  type: 'booking' | 'user' | 'payment' | 'package' | 'system' | 'dispute' | 'support' | 'fraud';
  title: string;
  description: string;
  user: string;
  role?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface RiskAlert {
  id: string;
  timestamp: string;
  type: 'UTR_DUPLICATE' | 'CONTENT_PLAGIARISM' | 'GST_INVALID' | 'TX_VELOCITY' | 'SOS_ALERT' | 'RATING_SPIKE';
  title: string;
  description: string;
  score: number; // 0-100
  affectedEntity: string;
  affectedEntityId: string;
  status: 'PENDING' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';
  assignedTo?: AdminRole;
}

export interface VerificationDocument {
  name: string;
  type: 'Aadhaar' | 'PAN' | 'GST' | 'Tourism License' | 'Bank Passbook' | 'Address Proof';
  url: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  rejectionReason?: string;
}

export interface Planner {
  id: string;
  agencyName: string;
  ownerName: string;
  email: string;
  phone: string;
  status: 'UNVERIFIED' | 'VERIFIED' | 'SUSPENDED';
  tier: 'BASIC' | 'SILVER' | 'GOLD' | 'BLACK';
  revenue: number;
  bookings: number;
  rating: number;
  cancellationRate: number;
  refundRate: number;
  complaintsCount: number;
  riskScore: number;
  documents: VerificationDocument[];
  bankAccount: {
    holder: string;
    number: string;
    ifsc: string;
    bankName: string;
  };
  payoutsFrozen: boolean;
  packagesHidden: boolean;
  notes: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'BLACKLISTED';
  fraudScore: number;
  bookingsCount: number;
  totalSpent: number;
  wishlistCount: number;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  travelHistory: {
    tripId: string;
    destination: string;
    date: string;
    status: 'COMPLETED' | 'CANCELLED' | 'ACTIVE';
    amount: number;
  }[];
  supportHistory: {
    ticketId: string;
    subject: string;
    status: string;
  }[];
}

export interface Package {
  id: string;
  title: string;
  plannerId: string;
  plannerName: string;
  destination: string;
  duration: number; // Days
  basePrice: number;
  status: 'DRAFT' | 'PUBLISHED' | 'HIDDEN' | 'ARCHIVED' | 'REPORTED';
  qualityScore: number; // 0-100
  copyscapePercentage: number;
  copiedImagesFlag: boolean;
  isFeatured: boolean;
}

export interface Booking {
  id: string;
  packageId: string;
  packageTitle: string;
  customerId: string;
  customerName: string;
  plannerId: string;
  plannerName: string;
  travelDate: string;
  amount: number;
  status: 'PENDING' | 'CONFIRMED' | 'DEPARTED' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED' | 'FROZEN';
  utrNumber: string;
  invoiceUrl: string;
  mealPreference: 'VEG' | 'NON-VEG' | 'ANY';
  pickupPoint: string;
  paxCount: number;
  timeline: {
    timestamp: string;
    status: string;
    description: string;
  }[];
}

export interface FinancialTransaction {
  id: string;
  timestamp: string;
  bookingId: string;
  type: 'INBOUND' | 'OUTBOUND_SETTLEMENT' | 'REFUND';
  amount: number;
  utrNumber: string;
  plannerId: string;
  plannerName: string;
  commissionPercent: number;
  commissionEarned: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'FROZEN';
  duplicateUtrFound: boolean;
}

export interface LiveTrip {
  id: string;
  bookingId: string;
  destination: string;
  plannerId: string;
  plannerName: string;
  guideName: string;
  guidePhone: string;
  vehicleNumber: string;
  travellersCount: number;
  status: 'ON_TIME' | 'DELAYED' | 'EMERGENCY' | 'COMPLETED';
  gpsCoordinates: {
    lat: number;
    lng: number;
    lastUpdated: string;
  };
  emergencyFlags: string[];
}

export interface SupportTicket {
  id: string;
  customerId?: string;
  customerName?: string;
  plannerId?: string;
  plannerName?: string;
  subject: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'ESCALATED' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  slaSecondsLeft: number;
  assignedExecutive: string;
  messages: {
    sender: 'CUSTOMER' | 'PLANNER' | 'ADMIN';
    senderName: string;
    text: string;
    timestamp: string;
  }[];
  createdAt: string;
}

export interface DisputeCase {
  id: string;
  bookingId: string;
  customerName: string;
  plannerName: string;
  type: 'PLANNER_FRAUD' | 'REFUND_DISPUTE' | 'PACKAGE_MISREPRESENTATION' | 'SAFETY_VIOLATION' | 'CHARGEBACK';
  status: 'OPEN' | 'UNDER_INVESTIGATION' | 'RESOLVED';
  evidenceUrls: string[];
  verdict?: 'REFUNDED_TO_CUSTOMER' | 'SETTLED_TO_PLANNER' | 'REJECTED';
  internalNotes: string;
  timeline: {
    timestamp: string;
    action: string;
    actor: string;
  }[];
}

export interface ModeratedReview {
  id: string;
  packageTitle: string;
  customerName: string;
  rating: number;
  text: string;
  status: 'APPROVED' | 'FLAGGED' | 'FAKE' | 'HIDDEN';
  flagReason?: string;
  timestamp: string;
}

export interface MarketingCampaign {
  id: string;
  title: string;
  targetSegment: string;
  channels: ('EMAIL' | 'PUSH' | 'BANNER' | 'WHATSAPP')[];
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED';
  metrics: {
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    conversions: number;
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: AdminRole;
  ipAddress: string;
  device: string;
  action: string;
  module: string;
  beforeValue?: string;
  afterValue?: string;
}

export interface DestinationSettings {
  id: string;
  name: string;
  state: string;
  isPopular: boolean;
  packageCount: number;
  imageUrl: string;
}

export interface SystemSettings {
  destinations: DestinationSettings[];
  commissionRate: number; // e.g. 10%
  gstPercent: number; // e.g. 18%
  payoutCycleDays: number;
  maintenanceMode: boolean;
  emergencyLockdown: boolean;
  featureFlags: {
    aiItineraryGenerator: boolean;
    autoUtrVerification: boolean;
    directChatPlannerTraveler: boolean;
    instantRefunds: boolean;
  };
}

// ==========================================
// CONTEXT STATE INTERFACE
// ==========================================

export interface MasterAdminContextType {
  // Authentication & Session
  currentRole: AdminRole;
  setCurrentRole: (role: AdminRole) => void;
  systemMode: SystemMode;
  setSystemMode: (mode: SystemMode) => void;
  isSessionActive: boolean;
  loginSession: (pin: string, token: string) => boolean;
  logoutSession: () => void;

  // Global Search / Command Palette
  globalSearch: (query: string) => {
    planners: Planner[];
    customers: Customer[];
    bookings: Booking[];
    tickets: SupportTicket[];
  };

  // State Collections
  infraHealth: InfrastructureHealth;
  kpiMetrics: KpiMetrics;
  activityStream: ActivityEvent[];
  riskAlerts: RiskAlert[];
  planners: Planner[];
  customers: Customer[];
  packages: Package[];
  bookings: Booking[];
  ledger: FinancialTransaction[];
  liveTrips: LiveTrip[];
  tickets: SupportTicket[];
  disputes: DisputeCase[];
  reviews: ModeratedReview[];
  campaigns: MarketingCampaign[];
  auditLogs: AuditLogEntry[];
  settings: SystemSettings;

  // Actions
  resolveAlert: (alertId: string) => void;
  assignAlert: (alertId: string, role: AdminRole) => void;
  verifyPlanner: (plannerId: string, status: 'VERIFIED' | 'UNVERIFIED', notes: string) => void;
  verifyPlannerDocument: (plannerId: string, docName: string, verified: boolean, reason?: string) => void;
  suspendPlanner: (plannerId: string, suspend: boolean, reason: string) => void;
  freezePlannerPayouts: (plannerId: string, freeze: boolean) => void;
  hidePlannerPackages: (plannerId: string, hide: boolean) => void;
  suspendCustomer: (customerId: string, status: 'ACTIVE' | 'SUSPENDED' | 'BLACKLISTED', reason: string) => void;
  updateStaffPermissions: (roleName: AdminRole, key: string, enabled: boolean) => void;
  manageActiveTrip: (tripId: string, action: 'CONTACT_PLANNER' | 'BROADCAST' | 'REROUTE' | 'CANCEL', details?: string) => void;
  moderatePackage: (packageId: string, status: Package['status'], isFeatured?: boolean) => void;
  updateBookingStatus: (bookingId: string, status: Booking['status'], paymentStatus?: Booking['paymentStatus']) => void;
  processRefund: (bookingId: string, amount: number) => void;
  verifyUtr: (bookingId: string, verified: boolean) => void;
  settlePayout: (plannerId: string, amount: number) => void;
  replyToTicket: (ticketId: string, text: string) => void;
  updateTicketStatus: (ticketId: string, status: SupportTicket['status'], priority?: SupportTicket['priority']) => void;
  resolveDispute: (caseId: string, verdict: DisputeCase['verdict'], notes: string) => void;
  moderateReview: (reviewId: string, status: ModeratedReview['status']) => void;
  createCampaign: (campaign: Omit<MarketingCampaign, 'id' | 'metrics'>) => void;
  updateSystemSettings: (updated: Partial<SystemSettings>) => void;
  triggerEmergencyLockdown: () => void;
  addCustomAuditLog: (action: string, module: string, before?: string, after?: string) => void;
}

// ==========================================
// INITIAL MOCK DATA
// ==========================================

const initialInfraHealth: InfrastructureHealth = {
  cpuUsage: 42,
  memoryUsage: 64,
  dbConnections: 128,
  storageUsage: 37,
  services: [
    { name: 'NestJS Backend API', status: 'operational', latency: 48, uptime: 99.99 },
    { name: 'MongoDB Database', status: 'operational', latency: 12, uptime: 99.99 },
    { name: 'Razorpay Payment PG', status: 'operational', latency: 110, uptime: 99.95 },
    { name: 'Google Maps API', status: 'operational', latency: 85, uptime: 99.98 },
    { name: 'Twilio SMS Gateway', status: 'operational', latency: 180, uptime: 99.85 },
    { name: 'SendGrid Email Service', status: 'operational', latency: 95, uptime: 99.90 },
  ]
};

const initialKpiMetrics: KpiMetrics = {
  totalCustomers: { value: '45,210', change: '+12.4%', isPositive: true },
  totalPlanners: { value: '1,840', change: '+8.2%', isPositive: true },
  bookingsCount: { value: '12,840', change: '+24.1%', isPositive: true },
  totalRevenue: { value: '₹14,84,20,000', change: '+18.6%', isPositive: true },
  activeTrips: { value: '342', change: '+15.2%', isPositive: true },
  pendingVerifications: { value: '14', change: '-4.3%', isPositive: false },
  activeDisputes: { value: '6', change: '+50.0%', isPositive: false },
  fraudAlertsCount: { value: '9', change: '-12.5%', isPositive: true },
};

const initialActivityStream: ActivityEvent[] = [
  { id: 'act-1', timestamp: '2026-08-05T19:30:00Z', type: 'booking', title: 'New Booking Created', description: 'Booking #B-9284 confirmed for Manali adventure package.', user: 'Amit Patel', severity: 'low' },
  { id: 'act-2', timestamp: '2026-08-05T19:28:00Z', type: 'payment', title: 'Payment Settlement Processed', description: '₹4,50,000 settled to Wanderlust Travels.', user: 'System Settlement Engine', severity: 'low' },
  { id: 'act-3', timestamp: '2026-08-05T19:25:00Z', type: 'user', title: 'New Planner Registration', description: 'Himalayan Sherpas Ltd registered for verification.', user: 'Tenzing Norgay', severity: 'medium' },
  { id: 'act-4', timestamp: '2026-08-05T19:15:00Z', type: 'fraud', title: 'High Risk Booking Flagged', description: 'Booking #B-9271 flagged by Fraud Engine. Risk score 84%.', user: 'Fraud Engine AI', severity: 'high' },
  { id: 'act-5', timestamp: '2026-08-05T19:02:00Z', type: 'support', title: 'Emergency SOS Triggered', description: 'SOS activated on trip Group #G-82 in Leh Ladak. GPS reporting active.', user: 'Tour Guide - Rajesh', severity: 'critical' },
  { id: 'act-6', timestamp: '2026-08-05T19:02:00Z', type: 'dispute', title: 'Dispute Filed', description: 'Dispute CASE-302 filed against Wanderlust Travels for fake packages.', user: 'Anjali Sharma', severity: 'medium' },
  { id: 'act-7', timestamp: '2026-08-05T18:30:00Z', type: 'package', title: 'New Package Published', description: 'Goa Beaches luxury packages published.', user: 'Wanderlust Travels', severity: 'low' },
];

const initialRiskAlerts: RiskAlert[] = [
  { id: 'al-1', timestamp: '2026-08-05T19:15:00Z', type: 'UTR_DUPLICATE', title: 'Duplicate UTR Detected', description: 'UTR "PAY-RAZ912384" was submitted twice for booking settlement verification.', score: 92, affectedEntity: 'Booking #B-9271', affectedEntityId: 'B-9271', status: 'PENDING' },
  { id: 'al-2', timestamp: '2026-08-05T19:02:00Z', type: 'SOS_ALERT', title: 'SOS - Vehicle Breakdown', description: 'Emergency SOS triggered. Vehicle breakdown reported at Khardung La pass.', score: 99, affectedEntity: 'Trip Group #G-82', affectedEntityId: 'G-82', status: 'INVESTIGATING', assignedTo: 'Operations Head' },
  { id: 'al-3', timestamp: '2026-08-05T18:10:00Z', type: 'CONTENT_PLAGIARISM', title: 'Plagiarism Flag', description: 'Package "Leh-Ladakh Expedition 2026" has 98% text overlap with Adventure Tours Co.', score: 78, affectedEntity: 'Package #PKG-401', affectedEntityId: 'PKG-401', status: 'PENDING' },
  { id: 'al-4', timestamp: '2026-08-05T17:40:00Z', type: 'GST_INVALID', title: 'Invalid GST Registration', description: 'GSTIN check returned mismatch with legal name on Tourism Department record.', score: 85, affectedEntity: 'Planner: Wanderlust Travels', affectedEntityId: 'pl-1', status: 'PENDING' },
  { id: 'al-5', timestamp: '2026-08-05T15:20:00Z', type: 'TX_VELOCITY', title: 'High Velocity Transactions', description: 'Planner account created 10 fake bookings within 5 minutes under mock IP.', score: 89, affectedEntity: 'Planner: FakeHolidays Pvt Ltd', affectedEntityId: 'pl-3', status: 'RESOLVED', assignedTo: 'Super Admin' }
];

const initialPlanners: Planner[] = [
  {
    id: 'pl-1',
    agencyName: 'Wanderlust Travels Ltd',
    ownerName: 'Vikram Singh',
    email: 'vikram@wanderlust.com',
    phone: '+91 98765 43210',
    status: 'VERIFIED',
    tier: 'GOLD',
    revenue: 4850000,
    bookings: 142,
    rating: 4.8,
    cancellationRate: 1.2,
    refundRate: 0.8,
    complaintsCount: 2,
    riskScore: 15,
    documents: [
      { name: 'Aadhaar Card', type: 'Aadhaar', url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80', status: 'VERIFIED' },
      { name: 'PAN Card', type: 'PAN', url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80', status: 'VERIFIED' },
      { name: 'GST Certificate', type: 'GST', url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80', status: 'VERIFIED' }
    ],
    bankAccount: {
      holder: 'Wanderlust Travels Ltd',
      number: '98765432109876',
      ifsc: 'HDFC0001234',
      bankName: 'HDFC Bank'
    },
    payoutsFrozen: false,
    packagesHidden: false,
    notes: 'Premium gold tier agency. Clean track record.'
  },
  {
    id: 'pl-2',
    agencyName: 'Himalayan Sherpas Co',
    ownerName: 'Tenzing Norgay Jr',
    email: 'tenzing@sherpahim.com',
    phone: '+91 98111 22233',
    status: 'UNVERIFIED',
    tier: 'BASIC',
    revenue: 0,
    bookings: 0,
    rating: 0,
    cancellationRate: 0,
    refundRate: 0,
    complaintsCount: 0,
    riskScore: 25,
    documents: [
      { name: 'Aadhaar Card', type: 'Aadhaar', url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80', status: 'PENDING' },
      { name: 'PAN Card', type: 'PAN', url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80', status: 'PENDING' },
      { name: 'Tourism License', type: 'Tourism License', url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80', status: 'PENDING' }
    ],
    bankAccount: {
      holder: 'Tenzing Norgay',
      number: '11223344556677',
      ifsc: 'SBIN0004321',
      bankName: 'State Bank of India'
    },
    payoutsFrozen: false,
    packagesHidden: false,
    notes: 'New agency requesting validation for high altitude Leh packages.'
  },
  {
    id: 'pl-3',
    agencyName: 'FakeHolidays Pvt Ltd',
    ownerName: 'Ramesh Scammer',
    email: 'ramesh@fakeholidays.com',
    phone: '+91 99999 88888',
    status: 'SUSPENDED',
    tier: 'BASIC',
    revenue: 120000,
    bookings: 8,
    rating: 1.4,
    cancellationRate: 85.0,
    refundRate: 75.0,
    complaintsCount: 18,
    riskScore: 95,
    documents: [
      { name: 'Aadhaar Card', type: 'Aadhaar', url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80', status: 'REJECTED', rejectionReason: 'Fake aadhaar template detected' },
      { name: 'PAN Card', type: 'PAN', url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80', status: 'REJECTED', rejectionReason: 'Name mismatch on database check' }
    ],
    bankAccount: {
      holder: 'Ramesh Scammer',
      number: '999999999999',
      ifsc: 'ICIC0000001',
      bankName: 'ICICI Bank'
    },
    payoutsFrozen: true,
    packagesHidden: true,
    notes: 'Suspended due to high complaint count and fraudulent chargebacks.'
  }
];

const initialCustomers: Customer[] = [
  {
    id: 'cust-1',
    name: 'Amit Patel',
    email: 'amit@patel.com',
    phone: '+91 98888 77777',
    status: 'ACTIVE',
    fraudScore: 8,
    bookingsCount: 14,
    totalSpent: 350000,
    wishlistCount: 22,
    emergencyContact: {
      name: 'Rekha Patel',
      relation: 'Mother',
      phone: '+91 98888 77766'
    },
    travelHistory: [
      { tripId: 'trip-101', destination: 'Goa Beaches', date: '2026-05-12', status: 'COMPLETED', amount: 45000 },
      { tripId: 'trip-102', destination: 'Manali Heights', date: '2026-08-05', status: 'ACTIVE', amount: 55000 }
    ],
    supportHistory: [
      { ticketId: 't-1', subject: 'Refund delay', status: 'RESOLVED' }
    ]
  },
  {
    id: 'cust-2',
    name: 'Anjali Sharma',
    email: 'anjali@sharma.com',
    phone: '+91 97777 66666',
    status: 'ACTIVE',
    fraudScore: 12,
    bookingsCount: 2,
    totalSpent: 85000,
    wishlistCount: 5,
    emergencyContact: {
      name: 'Sunil Sharma',
      relation: 'Father',
      phone: '+91 97777 66655'
    },
    travelHistory: [
      { tripId: 'trip-103', destination: 'Shimla Getaway', date: '2026-07-10', status: 'COMPLETED', amount: 35000 }
    ],
    supportHistory: [
      { ticketId: 't-2', subject: 'Dispute with Wanderlust Travels', status: 'OPEN' }
    ]
  },
  {
    id: 'cust-3',
    name: 'Vikas Patel',
    email: 'vikas@scam.com',
    phone: '+91 90000 11111',
    status: 'BLACKLISTED',
    fraudScore: 90,
    bookingsCount: 5,
    totalSpent: 120000,
    wishlistCount: 0,
    emergencyContact: {
      name: 'Unknown',
      relation: 'Unknown',
      phone: '+91 00000 00000'
    },
    travelHistory: [
      { tripId: 'trip-104', destination: 'Fake Trip', date: '2026-06-01', status: 'CANCELLED', amount: 20000 }
    ],
    supportHistory: [
      { ticketId: 't-3', subject: 'Chargeback dispute', status: 'CLOSED' }
    ]
  }
];

const initialPackages: Package[] = [
  { id: 'PKG-401', title: 'Leh-Ladakh Expedition 2026', plannerId: 'pl-1', plannerName: 'Wanderlust Travels Ltd', destination: 'Leh Ladakh', duration: 7, basePrice: 42000, status: 'PUBLISHED', qualityScore: 88, copyscapePercentage: 78, copiedImagesFlag: false, isFeatured: true },
  { id: 'PKG-402', title: 'Romantic Luxury Goa Escapade', plannerId: 'pl-1', plannerName: 'Wanderlust Travels Ltd', destination: 'Goa', duration: 4, basePrice: 28000, status: 'PUBLISHED', qualityScore: 92, copyscapePercentage: 12, copiedImagesFlag: false, isFeatured: false },
  { id: 'PKG-403', title: 'Spiti Valley Rugged Road Trip', plannerId: 'pl-2', plannerName: 'Himalayan Sherpas Co', destination: 'Spiti Valley', duration: 9, basePrice: 38000, status: 'DRAFT', qualityScore: 70, copyscapePercentage: 20, copiedImagesFlag: false, isFeatured: false },
  { id: 'PKG-404', title: 'Scam Package Copied Text', plannerId: 'pl-3', plannerName: 'FakeHolidays Pvt Ltd', destination: 'Kashmir', duration: 5, basePrice: 15000, status: 'REPORTED', qualityScore: 15, copyscapePercentage: 98, copiedImagesFlag: true, isFeatured: false }
];

const initialBookings: Booking[] = [
  {
    id: 'B-9284',
    packageId: 'PKG-402',
    packageTitle: 'Romantic Luxury Goa Escapade',
    customerId: 'cust-1',
    customerName: 'Amit Patel',
    plannerId: 'pl-1',
    plannerName: 'Wanderlust Travels Ltd',
    travelDate: '2026-08-10',
    amount: 28000,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    utrNumber: 'PAY-RAZ912384',
    invoiceUrl: 'INV-9284.pdf',
    mealPreference: 'VEG',
    pickupPoint: 'Panaji Airport Terminal 1',
    paxCount: 2,
    timeline: [
      { timestamp: '2026-08-05T19:30:00Z', status: 'Booked', description: 'Booking initiated by traveler Amit Patel' },
      { timestamp: '2026-08-05T19:31:00Z', status: 'Paid', description: 'Razorpay payment verified. UTR: PAY-RAZ912384' }
    ]
  },
  {
    id: 'B-9271',
    packageId: 'PKG-401',
    packageTitle: 'Leh-Ladakh Expedition 2026',
    customerId: 'cust-1',
    customerName: 'Amit Patel',
    plannerId: 'pl-1',
    plannerName: 'Wanderlust Travels Ltd',
    travelDate: '2026-08-05',
    amount: 42000,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    utrNumber: 'PAY-RAZ912384', // Duplicate UTR for testing!
    invoiceUrl: 'INV-9271.pdf',
    mealPreference: 'ANY',
    pickupPoint: 'Leh Airport Arrival Gate',
    paxCount: 1,
    timeline: [
      { timestamp: '2026-08-05T18:15:00Z', status: 'Booked', description: 'Booking initiated' },
      { timestamp: '2026-08-05T18:20:00Z', status: 'Paid', description: 'Payment registered manually via UTR upload' }
    ]
  },
  {
    id: 'B-9210',
    packageId: 'PKG-404',
    packageTitle: 'Scam Package Copied Text',
    customerId: 'cust-3',
    customerName: 'Vikas Patel',
    plannerId: 'pl-3',
    plannerName: 'FakeHolidays Pvt Ltd',
    travelDate: '2026-06-01',
    amount: 20000,
    status: 'CANCELLED',
    paymentStatus: 'REFUNDED',
    utrNumber: 'PAY-REF921033',
    invoiceUrl: 'INV-9210.pdf',
    mealPreference: 'NON-VEG',
    pickupPoint: 'Srinagar Bus Stand',
    paxCount: 1,
    timeline: [
      { timestamp: '2026-05-15T12:00:00Z', status: 'Booked', description: 'Booking created' },
      { timestamp: '2026-05-30T10:00:00Z', status: 'Cancelled', description: 'Cancelled due to planner suspension' },
      { timestamp: '2026-06-02T14:00:00Z', status: 'Refunded', description: 'Refund of ₹20,000 processed to card' }
    ]
  }
];

const initialLedger: FinancialTransaction[] = [
  { id: 'tx-1', timestamp: '2026-08-05T19:31:00Z', bookingId: 'B-9284', type: 'INBOUND', amount: 28000, utrNumber: 'PAY-RAZ912384', plannerId: 'pl-1', plannerName: 'Wanderlust Travels Ltd', commissionPercent: 10, commissionEarned: 2800, status: 'COMPLETED', duplicateUtrFound: false },
  { id: 'tx-2', timestamp: '2026-08-05T18:20:00Z', bookingId: 'B-9271', type: 'INBOUND', amount: 42000, utrNumber: 'PAY-RAZ912384', plannerId: 'pl-1', plannerName: 'Wanderlust Travels Ltd', commissionPercent: 10, commissionEarned: 4200, status: 'FROZEN', duplicateUtrFound: true },
  { id: 'tx-3', timestamp: '2026-08-05T19:28:00Z', bookingId: 'B-9201', type: 'OUTBOUND_SETTLEMENT', amount: 450000, utrNumber: 'SETTLE-9872134', plannerId: 'pl-1', plannerName: 'Wanderlust Travels Ltd', commissionPercent: 0, commissionEarned: 0, status: 'COMPLETED', duplicateUtrFound: false },
];

const initialLiveTrips: LiveTrip[] = [
  {
    id: 'G-82',
    bookingId: 'B-9271',
    destination: 'Leh Ladakh',
    plannerId: 'pl-1',
    plannerName: 'Wanderlust Travels Ltd',
    guideName: 'Rajesh Negi',
    guidePhone: '+91 94590 12345',
    vehicleNumber: 'LA-02-B-9988',
    travellersCount: 15,
    status: 'EMERGENCY',
    gpsCoordinates: {
      lat: 34.1526,
      lng: 77.5771,
      lastUpdated: '2026-08-05T19:35:00Z'
    },
    emergencyFlags: ['VEHICLE_BREAKDOWN', 'HIGH_ALTITUDE_SICKNESS']
  },
  {
    id: 'G-83',
    bookingId: 'B-9284',
    destination: 'Goa Coast',
    plannerId: 'pl-1',
    plannerName: 'Wanderlust Travels Ltd',
    guideName: 'John Dsouza',
    guidePhone: '+91 98221 55667',
    vehicleNumber: 'GA-03-F-1234',
    travellersCount: 8,
    status: 'ON_TIME',
    gpsCoordinates: {
      lat: 15.2993,
      lng: 73.8278,
      lastUpdated: '2026-08-05T19:30:00Z'
    },
    emergencyFlags: []
  }
];

const initialTickets: SupportTicket[] = [
  {
    id: 'TKT-101',
    customerId: 'cust-1',
    customerName: 'Amit Patel',
    subject: 'Emergency help requested on Ladakh trip',
    description: 'Our vehicle has broken down at Khardung La. One traveler is feeling severe headaches and dizziness (altitude sickness). Please respond immediately!',
    status: 'ESCALATED',
    priority: 'CRITICAL',
    slaSecondsLeft: 450,
    assignedExecutive: 'Operations Team',
    messages: [
      { sender: 'CUSTOMER', senderName: 'Amit Patel', text: 'Our vehicle has broken down at Khardung La. One traveler is feeling severe headaches and dizziness (altitude sickness). Please respond immediately!', timestamp: '2026-08-05T19:02:00Z' },
      { sender: 'ADMIN', senderName: 'Admin System', text: 'Ticket escalated to Operations Head. Dispatching medical team alert in Leh.', timestamp: '2026-08-05T19:05:00Z' }
    ],
    createdAt: '2026-08-05T19:02:00Z'
  },
  {
    id: 'TKT-102',
    customerId: 'cust-2',
    customerName: 'Anjali Sharma',
    plannerId: 'pl-1',
    plannerName: 'Wanderlust Travels Ltd',
    subject: 'Refund Dispute - Tour cancelled by agent',
    description: 'Agent cancelled my booking at last moment but has not refunded the money. They say the terms did not allow it, but it was cancelled from their end!',
    status: 'OPEN',
    priority: 'HIGH',
    slaSecondsLeft: 5400,
    assignedExecutive: 'Neha Mehta',
    messages: [
      { sender: 'CUSTOMER', senderName: 'Anjali Sharma', text: 'Agent cancelled my booking at last moment but has not refunded the money.', timestamp: '2026-08-05T18:45:00Z' }
    ],
    createdAt: '2026-08-05T18:45:00Z'
  }
];

const initialDisputes: DisputeCase[] = [
  {
    id: 'DISP-302',
    bookingId: 'B-9271',
    customerName: 'Anjali Sharma',
    plannerName: 'Wanderlust Travels Ltd',
    type: 'REFUND_DISPUTE',
    status: 'UNDER_INVESTIGATION',
    evidenceUrls: [
      'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80'
    ],
    internalNotes: 'Customer claims travel agency cancelled the booking unilaterally. Agency claims customer did not arrive at pickup point.',
    timeline: [
      { timestamp: '2026-08-05T18:45:00Z', action: 'Dispute Case Opened', actor: 'Anjali Sharma' },
      { timestamp: '2026-08-05T19:10:00Z', action: 'Assigned to Legal Representative', actor: 'Legal Officer' }
    ]
  }
];

const initialReviews: ModeratedReview[] = [
  { id: 'rev-1', packageTitle: 'Leh-Ladakh Expedition 2026', customerName: 'Amit Patel', rating: 5, text: 'Awesome experience, highly recommended guide!', status: 'APPROVED', timestamp: '2026-08-04T12:00:00Z' },
  { id: 'rev-2', packageTitle: 'Scam Package Copied Text', customerName: 'Vikas Patel', rating: 1, text: 'Absolute scam! Ramesh ran away with my wallet! Do not book!', status: 'FLAGGED', flagReason: 'Profanity & fraud allegations', timestamp: '2026-08-03T10:00:00Z' }
];

const initialCampaigns: MarketingCampaign[] = [
  { id: 'camp-1', title: 'Independence Day Discount Blast', targetSegment: 'All Customers', channels: ['PUSH', 'EMAIL'], status: 'ACTIVE', metrics: { deliveryRate: 98.2, openRate: 42.1, clickRate: 15.4, conversions: 242 } },
  { id: 'camp-2', title: 'Planner Gold Tier Invitation', targetSegment: 'High Earning Planners', channels: ['BANNER'], status: 'COMPLETED', metrics: { deliveryRate: 100, openRate: 85.0, clickRate: 64.2, conversions: 22 } }
];

const initialAuditLogs: AuditLogEntry[] = [
  { id: 'log-1', timestamp: '2026-08-05T19:25:00Z', actor: 'Super Admin', role: 'Super Admin', ipAddress: '192.168.1.5', device: 'macOS / Chrome', action: 'System settings update: commission tier updated to 10%', module: 'Settings', beforeValue: 'Commission: 8%', afterValue: 'Commission: 10%' },
  { id: 'log-2', timestamp: '2026-08-05T19:28:00Z', actor: 'Finance Manager', role: 'Finance Manager', ipAddress: '192.168.1.12', device: 'Windows 11 / Firefox', action: 'Settlement transaction #SETTLE-9872134 approved for Wanderlust Travels', module: 'Payments', beforeValue: 'Pending', afterValue: 'Completed' },
  { id: 'log-3', timestamp: '2026-08-05T19:35:00Z', actor: 'Operations Head', role: 'Operations Head', ipAddress: '192.168.1.18', device: 'Linux / Chrome Mobile', action: 'Assigned emergency rescue handler for Ladakh SOS #G-82', module: 'Live Trips', beforeValue: 'Unassigned', afterValue: 'Assigned: Operations Head' }
];

const initialSettings: SystemSettings = {
  destinations: [
    { id: 'dest-1', name: 'Leh Ladakh', state: 'Jammu & Kashmir', isPopular: true, packageCount: 24, imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80' },
    { id: 'dest-2', name: 'Goa Coastline', state: 'Goa', isPopular: true, packageCount: 52, imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80' },
    { id: 'dest-3', name: 'Spiti Wilderness', state: 'Himachal Pradesh', isPopular: false, packageCount: 12, imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80' }
  ],
  commissionRate: 10,
  gstPercent: 18,
  payoutCycleDays: 7,
  maintenanceMode: false,
  emergencyLockdown: false,
  featureFlags: {
    aiItineraryGenerator: true,
    autoUtrVerification: false,
    directChatPlannerTraveler: true,
    instantRefunds: false
  }
};

// ==========================================
// CONTEXT CREATION
// ==========================================

const MasterAdminContext = createContext<MasterAdminContextType | undefined>(undefined);

export function MasterAdminProvider({ children }: { children: ReactNode }) {
  const [currentRole, setCurrentRole] = useState<AdminRole>('Super Admin');
  const [systemMode, setSystemMode] = useState<SystemMode>('LIVE');
  const [isSessionActive, setIsSessionActive] = useState<boolean>(true); // default active for demo/testing ease
  
  // Data States
  const [infraHealth, setInfraHealth] = useState<InfrastructureHealth>(initialInfraHealth);
  const [kpiMetrics, setKpiMetrics] = useState<KpiMetrics>(initialKpiMetrics);
  const [activityStream, setActivityStream] = useState<ActivityEvent[]>(() => {
    const saved = localStorage.getItem('master_activity_stream');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialActivityStream;
  });
  const [riskAlerts, setRiskAlerts] = useState<RiskAlert[]>(initialRiskAlerts);
  const [planners, setPlanners] = useState<Planner[]>(() => {
    const saved = localStorage.getItem('master_planners');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialPlanners;
  });

  // Sync back to local storage ONLY if it differs, to prevent infinite loops, 
  // but mostly just persist when state changes internally.
  useEffect(() => {
    const current = localStorage.getItem('master_planners');
    const next = JSON.stringify(planners);
    if (current !== next) {
      localStorage.setItem('master_planners', next);
    }
  }, [planners]);

  useEffect(() => {
    const current = localStorage.getItem('master_activity_stream');
    const next = JSON.stringify(activityStream);
    if (current !== next) {
      localStorage.setItem('master_activity_stream', next);
    }
  }, [activityStream]);

  // Listen for changes from other tabs (e.g. Planner submitting KYC)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'master_planners' && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          setPlanners(updated);
        } catch (err) {}
      }
      if (e.key === 'master_activity_stream' && e.newValue) {
        try {
          const updated = JSON.parse(e.newValue);
          setActivityStream(updated);
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [packages, setPackages] = useState<Package[]>(initialPackages);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [ledger, setLedger] = useState<FinancialTransaction[]>(initialLedger);
  const [liveTrips, setLiveTrips] = useState<LiveTrip[]>(initialLiveTrips);
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [disputes, setDisputes] = useState<DisputeCase[]>(initialDisputes);
  const [reviews, setReviews] = useState<ModeratedReview[]>(initialReviews);
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>(initialCampaigns);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(initialAuditLogs);
  const [settings, setSettings] = useState<SystemSettings>(initialSettings);

  // Auto-simulation of server latency updates and activity stream
  useEffect(() => {
    if (systemMode === 'EMERGENCY_LOCKDOWN') return;
    
    const interval = setInterval(() => {
      // Simulate changing server cpu/latency
      setInfraHealth(prev => ({
        ...prev,
        cpuUsage: Math.max(10, Math.min(95, prev.cpuUsage + Math.floor(Math.random() * 9) - 4)),
        memoryUsage: Math.max(20, Math.min(98, prev.memoryUsage + Math.floor(Math.random() * 5) - 2)),
        services: prev.services.map(s => ({
          ...s,
          latency: Math.max(5, s.latency + Math.floor(Math.random() * 15) - 7)
        }))
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [systemMode]);

  // Auth Functions
  const loginSession = (pin: string, token: string): boolean => {
    // Simulated verification: PIN 1234 or any input for demo purposes
    if (pin === '1234' || pin.length >= 4) {
      setIsSessionActive(true);
      addCustomAuditLog('User Login Successful via PIN + MFA', 'Auth');
      return true;
    }
    return false;
  };

  const logoutSession = () => {
    setIsSessionActive(false);
    addCustomAuditLog('User Logged Out', 'Auth');
  };

  // Helper to log audit logs
  const addCustomAuditLog = (action: string, module: string, before?: string, after?: string) => {
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: currentRole,
      role: currentRole,
      ipAddress: '192.168.1.100', // Simulator mock IP
      device: 'Chrome / Windows 11',
      action,
      module,
      beforeValue: before,
      afterValue: after
    };
    setAuditLogs(prev => [newLog, ...prev]);

    // Also push to activity feed
    const newEvent: ActivityEvent = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'system',
      title: action,
      description: `Performed by ${currentRole} in module: ${module}.`,
      user: currentRole,
      severity: 'low'
    };
    setActivityStream(prev => [newEvent, ...prev]);
  };

  // Global search autocomplete
  const globalSearch = (query: string) => {
    const q = query.toLowerCase().trim();
    if (!q) return { planners: [], customers: [], bookings: [], tickets: [] };

    return {
      planners: planners.filter(p => p.agencyName.toLowerCase().includes(q) || p.ownerName.toLowerCase().includes(q)),
      customers: customers.filter(c => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)),
      bookings: bookings.filter(b => b.id.toLowerCase().includes(q) || b.customerName.toLowerCase().includes(q) || b.plannerName.toLowerCase().includes(q)),
      tickets: tickets.filter(t => t.id.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || (t.customerName && t.customerName.toLowerCase().includes(q)))
    };
  };

  // Resolve Risk Alerts
  const resolveAlert = (alertId: string) => {
    setRiskAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'RESOLVED' } : a));
    const alert = riskAlerts.find(a => a.id === alertId);
    addCustomAuditLog(`Resolved risk alert: ${alert?.title}`, 'Fraud Engine', 'PENDING', 'RESOLVED');
  };

  const assignAlert = (alertId: string, role: AdminRole) => {
    setRiskAlerts(prev => prev.map(a => a.id === alertId ? { ...a, assignedTo: role, status: 'INVESTIGATING' } : a));
    addCustomAuditLog(`Assigned risk alert to ${role}`, 'Fraud Engine');
  };

  // Verification center
  const verifyPlanner = (plannerId: string, status: 'VERIFIED' | 'UNVERIFIED', notes: string) => {
    setPlanners(prev => prev.map(p => p.id === plannerId ? { ...p, status, notes: notes || p.notes } : p));
    
    // Add verification metric update
    if (status === 'VERIFIED') {
      setKpiMetrics(prev => ({
        ...prev,
        pendingVerifications: {
          ...prev.pendingVerifications,
          value: Math.max(0, parseInt(prev.pendingVerifications.value as string) - 1)
        }
      }));
    }
    
    addCustomAuditLog(`Planner verification status updated to ${status}`, 'Verification', 'PENDING', status);
  };

  const verifyPlannerDocument = (plannerId: string, docName: string, verified: boolean, reason?: string) => {
    setPlanners(prev => prev.map(p => {
      if (p.id !== plannerId) return p;
      return {
        ...p,
        documents: p.documents.map(d => d.name === docName ? {
          ...d,
          status: verified ? 'VERIFIED' : 'REJECTED',
          rejectionReason: reason
        } : d)
      };
    }));
    addCustomAuditLog(`Verified document "${docName}" for planner ID: ${plannerId}`, 'Verification', 'PENDING', verified ? 'VERIFIED' : 'REJECTED');
  };

  // User Management
  const suspendPlanner = (plannerId: string, suspend: boolean, reason: string) => {
    setPlanners(prev => prev.map(p => p.id === plannerId ? { 
      ...p, 
      status: suspend ? 'SUSPENDED' : 'UNVERIFIED',
      notes: reason ? `[Suspended: ${reason}] ${p.notes}` : p.notes
    } : p));
    addCustomAuditLog(`${suspend ? 'Suspended' : 'Un-suspended'} planner ID: ${plannerId}`, 'User Management', suspend ? 'ACTIVE' : 'SUSPENDED', suspend ? 'SUSPENDED' : 'ACTIVE');
  };

  const freezePlannerPayouts = (plannerId: string, freeze: boolean) => {
    setPlanners(prev => prev.map(p => p.id === plannerId ? { ...p, payoutsFrozen: freeze } : p));
    addCustomAuditLog(`${freeze ? 'Frozen' : 'Released'} payouts for planner ID: ${plannerId}`, 'Finance', freeze ? 'Active' : 'Frozen', freeze ? 'Frozen' : 'Active');
  };

  const hidePlannerPackages = (plannerId: string, hide: boolean) => {
    setPlanners(prev => prev.map(p => p.id === plannerId ? { ...p, packagesHidden: hide } : p));
    setPackages(prev => prev.map(pkg => pkg.plannerId === plannerId ? { ...pkg, status: hide ? 'HIDDEN' : 'PUBLISHED' } : pkg));
    addCustomAuditLog(`${hide ? 'Hidden' : 'Revealed'} packages for planner ID: ${plannerId}`, 'Content Moderation');
  };

  const suspendCustomer = (customerId: string, status: 'ACTIVE' | 'SUSPENDED' | 'BLACKLISTED', reason: string) => {
    setCustomers(prev => prev.map(c => c.id === customerId ? { ...c, status } : c));
    addCustomAuditLog(`Customer ID ${customerId} status updated to ${status}. Reason: ${reason}`, 'User Management');
  };

  const updateStaffPermissions = (roleName: AdminRole, key: string, enabled: boolean) => {
    // State log simulation
    addCustomAuditLog(`Updated permission ${key} for role ${roleName} to ${enabled}`, 'System Config');
  };

  // Live Trip Operations
  const manageActiveTrip = (tripId: string, action: 'CONTACT_PLANNER' | 'BROADCAST' | 'REROUTE' | 'CANCEL', details?: string) => {
    setLiveTrips(prev => prev.map(t => {
      if (t.id !== tripId) return t;
      if (action === 'CANCEL') return { ...t, status: 'COMPLETED' };
      return t;
    }));
    addCustomAuditLog(`Trip Operations: Executed ${action} on Trip Group ${tripId}`, 'Trip Operations');
  };

  // Content Moderation
  const moderatePackage = (packageId: string, status: Package['status'], isFeatured?: boolean) => {
    setPackages(prev => prev.map(p => p.id === packageId ? { 
      ...p, 
      status, 
      isFeatured: isFeatured !== undefined ? isFeatured : p.isFeatured 
    } : p));
    addCustomAuditLog(`Package ${packageId} moderated to status: ${status}. Featured: ${isFeatured}`, 'Content Moderation');
  };

  // Bookings
  const updateBookingStatus = (bookingId: string, status: Booking['status'], paymentStatus?: Booking['paymentStatus']) => {
    setBookings(prev => prev.map(b => {
      if (b.id !== bookingId) return b;
      const updatedTimeline = [
        ...b.timeline,
        { timestamp: new Date().toISOString(), status, description: `Status manually updated to ${status} by ${currentRole}` }
      ];
      return {
        ...b,
        status,
        paymentStatus: paymentStatus || b.paymentStatus,
        timeline: updatedTimeline
      };
    }));
    addCustomAuditLog(`Booking ${bookingId} status updated to ${status}`, 'Bookings');
  };

  // Payment Center
  const processRefund = (bookingId: string, amount: number) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, paymentStatus: 'REFUNDED', status: 'CANCELLED' } : b));
    
    // Add refund outbound transaction
    const newTx: FinancialTransaction = {
      id: `tx-ref-${Date.now()}`,
      timestamp: new Date().toISOString(),
      bookingId,
      type: 'REFUND',
      amount,
      utrNumber: `REFUND-UTR-${Math.floor(Math.random() * 900000 + 100000)}`,
      plannerId: bookings.find(b => b.id === bookingId)?.plannerId || '',
      plannerName: bookings.find(b => b.id === bookingId)?.plannerName || '',
      commissionPercent: 0,
      commissionEarned: 0,
      status: 'COMPLETED',
      duplicateUtrFound: false
    };

    setLedger(prev => [newTx, ...prev]);
    addCustomAuditLog(`Processed refund for booking ${bookingId} of amount ₹${amount}`, 'Finance');
  };

  const verifyUtr = (bookingId: string, verified: boolean) => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, paymentStatus: verified ? 'PAID' : 'UNPAID' } : b));
    setLedger(prev => prev.map(l => l.bookingId === bookingId ? { ...l, status: verified ? 'COMPLETED' : 'FAILED', duplicateUtrFound: false } : l));
    addCustomAuditLog(`Manually verified UTR payment status for Booking ID: ${bookingId}`, 'Finance', 'PENDING', verified ? 'PAID' : 'UNPAID');
  };

  const settlePayout = (plannerId: string, amount: number) => {
    const newTx: FinancialTransaction = {
      id: `tx-${Date.now()}`,
      timestamp: new Date().toISOString(),
      bookingId: 'N/A',
      type: 'OUTBOUND_SETTLEMENT',
      amount,
      utrNumber: `SETTLE-UTR-${Math.floor(Math.random() * 900000 + 100000)}`,
      plannerId,
      plannerName: planners.find(p => p.id === plannerId)?.agencyName || '',
      commissionPercent: 0,
      commissionEarned: 0,
      status: 'COMPLETED',
      duplicateUtrFound: false
    };
    setLedger(prev => [newTx, ...prev]);
    addCustomAuditLog(`Settled payout of ₹${amount} to Planner ID ${plannerId}`, 'Finance');
  };

  // Support CRM
  const replyToTicket = (ticketId: string, text: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t;
      return {
        ...t,
        status: 'IN_PROGRESS',
        messages: [
          ...t.messages,
          {
            sender: 'ADMIN',
            senderName: `Admin (${currentRole})`,
            text,
            timestamp: new Date().toISOString()
          }
        ]
      };
    }));
    addCustomAuditLog(`Replied to Support Ticket ${ticketId}`, 'Customer Care');
  };

  const updateTicketStatus = (ticketId: string, status: SupportTicket['status'], priority?: SupportTicket['priority']) => {
    setTickets(prev => prev.map(t => {
      if (t.id !== ticketId) return t;
      return {
        ...t,
        status,
        priority: priority || t.priority
      };
    }));
    addCustomAuditLog(`Ticket ${ticketId} status updated to ${status}`, 'Customer Care');
  };

  // Disputes
  const resolveDispute = (caseId: string, verdict: DisputeCase['verdict'], notes: string) => {
    setDisputes(prev => prev.map(d => {
      if (d.id !== caseId) return d;
      return {
        ...d,
        status: 'RESOLVED',
        verdict,
        internalNotes: notes,
        timeline: [
          ...d.timeline,
          { timestamp: new Date().toISOString(), action: `Resolved dispute with verdict: ${verdict}`, actor: currentRole }
        ]
      };
    }));
    
    // Automatically trigger refunds if verdict is customer refund
    const caseFile = disputes.find(d => d.id === caseId);
    if (verdict === 'REFUNDED_TO_CUSTOMER' && caseFile) {
      processRefund(caseFile.bookingId, 25000); // Mock refund amount
    }

    setKpiMetrics(prev => ({
      ...prev,
      activeDisputes: {
        ...prev.activeDisputes,
        value: Math.max(0, parseInt(prev.activeDisputes.value as string) - 1)
      }
    }));

    addCustomAuditLog(`Dispute case ${caseId} resolved. Verdict: ${verdict}`, 'Legal / Disputes');
  };

  // Reviews
  const moderateReview = (reviewId: string, status: ModeratedReview['status']) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status } : r));
    addCustomAuditLog(`Review ID ${reviewId} moderated to status: ${status}`, 'Content Moderation');
  };

  // Campaigns
  const createCampaign = (campaign: Omit<MarketingCampaign, 'id' | 'metrics'>) => {
    const newCamp: MarketingCampaign = {
      ...campaign,
      id: `camp-${Date.now()}`,
      metrics: { deliveryRate: 0, openRate: 0, clickRate: 0, conversions: 0 }
    };
    setCampaigns(prev => [newCamp, ...prev]);
    addCustomAuditLog(`Created marketing campaign: "${campaign.title}"`, 'Marketing');
  };

  // Global Configuration
  const updateSystemSettings = (updated: Partial<SystemSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...updated
    }));
    
    if (updated.emergencyLockdown !== undefined) {
      setSystemMode(updated.emergencyLockdown ? 'EMERGENCY_LOCKDOWN' : 'LIVE');
    }
    
    addCustomAuditLog(`System settings modified. Details: ${JSON.stringify(updated)}`, 'Settings');
  };

  const triggerEmergencyLockdown = () => {
    setSystemMode('EMERGENCY_LOCKDOWN');
    setSettings(prev => ({ ...prev, emergencyLockdown: true }));
    addCustomAuditLog(`!!! SYSTEM EMERGENCY LOCKDOWN TRIGGERED !!!`, 'Settings');
    
    // Auto flag alert for security audit
    const newAlert: RiskAlert = {
      id: `al-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'SOS_ALERT',
      title: 'Manual System Emergency Lockdown',
      description: 'System put into lockdown mode by administrative override.',
      score: 100,
      affectedEntity: 'Full Platform Systems',
      affectedEntityId: 'ALL',
      status: 'INVESTIGATING',
      assignedTo: 'Super Admin'
    };
    setRiskAlerts(prev => [newAlert, ...prev]);
  };

  return (
    <MasterAdminContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        systemMode,
        setSystemMode,
        isSessionActive,
        loginSession,
        logoutSession,
        globalSearch,

        infraHealth,
        kpiMetrics,
        activityStream,
        riskAlerts,
        planners,
        customers,
        packages,
        bookings,
        ledger,
        liveTrips,
        tickets,
        disputes,
        reviews,
        campaigns,
        auditLogs,
        settings,

        resolveAlert,
        assignAlert,
        verifyPlanner,
        verifyPlannerDocument,
        suspendPlanner,
        freezePlannerPayouts,
        hidePlannerPackages,
        suspendCustomer,
        updateStaffPermissions,
        manageActiveTrip,
        moderatePackage,
        updateBookingStatus,
        processRefund,
        verifyUtr,
        settlePayout,
        replyToTicket,
        updateTicketStatus,
        resolveDispute,
        moderateReview,
        createCampaign,
        updateSystemSettings,
        triggerEmergencyLockdown,
        addCustomAuditLog
      }}
    >
      {children}
    </MasterAdminContext.Provider>
  );
}

/**
 * Directly submits or updates a planner's KYC profile application to Master Admin's Verification Center.
 */
export function submitPlannerApplicationToMaster(profile: any, documents: any[]) {
  const storageKey = 'master_planners';
  let currentList: Planner[] = initialPlanners;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) currentList = JSON.parse(raw);
  } catch (e) {}

  const plannerId = profile.id || `pl-${(profile.email || 'planner').replace(/[^a-zA-Z0-9]/g, '_')}`;

  const mappedDocs: VerificationDocument[] = (documents || []).map(d => ({
    name: d.title || d.fileName || 'Verification Proof',
    type: (d.documentType?.includes('PAN') ? 'PAN' : d.documentType?.includes('GST') ? 'GST' : d.documentType?.includes('Aadhaar') ? 'Aadhaar' : d.documentType?.includes('Bank') ? 'Bank Passbook' : d.documentType?.includes('Address') ? 'Address Proof' : 'Tourism License') as any,
    url: (d.fileDataUrl && d.fileDataUrl.length < 30000) ? d.fileDataUrl : 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80',
    status: 'PENDING'
  }));

  const newOrUpdatedPlanner: Planner = {
    id: plannerId,
    agencyName: profile.displayName || profile.companyName || 'Registered Agency',
    ownerName: profile.personalName || profile.legalName || profile.displayName || 'Authorized Representative',
    email: profile.email || 'planner@beacon.com',
    phone: profile.phone || '+91 9876543210',
    status: 'UNVERIFIED',
    tier: profile.partnerLevel?.toUpperCase().includes('GOLD') ? 'GOLD' : 'STARTER',
    revenue: 0,
    bookings: 0,
    rating: 5.0,
    cancellationRate: 0,
    refundRate: 0,
    complaintsCount: 0,
    riskScore: 5,
    documents: mappedDocs.length > 0 ? mappedDocs : [
      { name: 'PAN Card Copy', type: 'PAN', url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80', status: 'PENDING' },
      { name: 'Bank Passbook / Cheque', type: 'Bank Passbook', url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80', status: 'PENDING' },
      { name: 'Identity Proof', type: 'Aadhaar', url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=400&q=80', status: 'PENDING' }
    ],
    bankAccount: {
      holder: profile.bankAccountName || profile.displayName || 'Authorized Account',
      number: profile.bankAccountNumber || '987654321098',
      ifsc: profile.ifscOrSwiftCode || 'HDFC0000123',
      bankName: profile.bankName || 'HDFC Bank'
    },
    payoutsFrozen: false,
    packagesHidden: false,
    notes: `Submitted for Indian Verification by ${profile.displayName} on ${new Date().toLocaleDateString()}. Partner Type: ${profile.partnerType || 'COMPANY'}. Operating State: ${profile.state || 'India'}. UPI: ${profile.upiOrPaypalId || 'N/A'}`
  };

  try {
    const filtered = currentList.filter(p => p.id !== plannerId && p.email !== profile.email);
    const updatedList = [newOrUpdatedPlanner, ...filtered];
    localStorage.setItem(storageKey, JSON.stringify(updatedList));
  } catch (e) {
    console.warn('Storage quota warning when updating master_planners:', e);
  }

  // Log activity in Master Admin feed
  try {
    const rawEvents = localStorage.getItem('master_activity_stream');
    const stream = rawEvents ? JSON.parse(rawEvents) : [];
    stream.unshift({
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: 'user',
      title: 'New Verification Submitted',
      description: `${profile.displayName} submitted KYC documents for Master Admin verification.`,
      user: profile.displayName,
      severity: 'medium'
    });
    localStorage.setItem('master_activity_stream', JSON.stringify(stream));
  } catch (e) {}

  return newOrUpdatedPlanner;
}

export function useMasterAdmin() {
  const context = useContext(MasterAdminContext);
  if (!context) {
    throw new Error('useMasterAdmin must be used within a MasterAdminProvider');
  }
  return context;
}
