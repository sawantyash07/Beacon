import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Award, MapPin, Building2, Package, Clock, CreditCard, Share2, Settings, ShieldCheck,
  CheckCircle, Circle, Save, Sparkles, Lock, Globe, Mail, Plane, Hotel, Utensils,
  Car, Shield, FileCheck, FileText, RefreshCw, Phone
} from 'lucide-react'
import { FaInstagram, FaFacebook, FaYoutube, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { toast } from 'sonner'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Skeleton } from '@/components/ui/Skeleton'
import { MultiSelectChips } from '@/components/ui/MultiSelectChips'
import { ToggleCard } from '@/components/ui/ToggleCard'
import { DayPicker } from '@/components/ui/DayPicker'
import { FileUploader } from '@/components/ui/FileUploader'
import { formatDate } from '@/lib/utils'

// Data presets for multi-select components
const SPECIALIZATION_OPTIONS = [
  'Luxury Travel', 'Adventure Expeditions', 'Honeymoon & Romantic', 'Cultural & Heritage',
  'Eco Tourism', 'Private Atoll Cruises', 'Wildlife Safaris', 'Trekking & Mountaineering',
  'Beach & Island Escapes', 'Corporate & MICE', 'Budget Backpacking', 'Family Holidays'
]

const LANGUAGE_OPTIONS = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Hindi', 'Mandarin', 'Arabic', 'Italian', 'Russian']

const COUNTRY_OPTIONS = ['Maldives', 'India', 'Japan', 'Switzerland', 'France', 'Indonesia', 'Thailand', 'UAE', 'Italy', 'USA', 'Greece', 'Peru', 'Tanzania', 'Egypt']

const POPULAR_DESTINATIONS_OPTIONS = ['Baa Atoll', 'Kyoto', 'Swiss Alps', 'Bali', 'Santorini', 'Serengeti', 'Machu Picchu', 'Dubai', 'Amalfi Coast', 'Phuket', 'Paris', 'Goa']

const PAYMENT_METHOD_OPTIONS = ['Credit / Debit Card', 'Bank Wire Transfer', 'UPI Payments', 'PayPal', 'Installment EMI', 'Cryptocurrency']

export default function OrganizerProfilePage() {
  const [loading, setLoading] = useState(true)
  const [activeStep, setActiveStep] = useState<number>(1)
  const [autoSaving, setAutoSaving] = useState(false)

  // Profile Form State across 10 sections
  const [profile, setProfile] = useState({
    // Section 1: Basic Information
    partnerType: 'COMPANY' as 'COMPANY' | 'FREELANCER',
    displayName: 'Waypoint Luxury Expeditions',
    bio: 'We specialize in premium domestic and international travel experiences with personalized itinerary planning, luxury resort partnerships, and 24x7 dedicated traveler concierge support.',
    avatarUrl: 'https://images.unsplash.com/photo-1540959733336-eab4deabeeaf?w=200&q=80',
    coverBannerUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    phone: '+1 (555) 019-2831',
    whatsappNumber: '+1 (555) 019-2831',
    email: 'concierge@waypointtravel.com',
    city: 'New York',
    country: 'United States',

    // Section 2: Travel Expertise
    specializations: ['Luxury Travel', 'Honeymoon & Romantic', 'Private Atoll Cruises'],
    languages: ['English', 'French', 'Japanese'],
    travelStyles: ['Luxury', 'Custom Itinerary', 'Private Guided'],
    groupSizes: ['Solo', 'Couples', 'Small Groups (2-8)', 'Corporate (50+)'],
    yearsExperience: 8,

    // Section 3: Operating Locations
    countriesServed: ['Maldives', 'Japan', 'Switzerland', 'France', 'Indonesia'],
    operatingRegions: ['South Asia', 'Western Europe', 'East Asia', 'Southeast Asia'],
    popularDestinations: ['Baa Atoll', 'Kyoto', 'Swiss Alps', 'Bali'],

    // Section 4: Company / Freelancer Details
    companyName: 'Waypoint Travel International Ltd.',
    registrationNumber: 'REG-US-8819204',
    gstNumber: '29ABCDE1234F1Z5',
    panNumber: 'ABCDE1234F',
    companyWebsite: 'https://waypointtravel.com',
    officeAddress: '742 Evergreen Terrace, Suite 400, New York, NY 10001',
    numberOfEmployees: '11-50 Employees',
    establishedYear: 2016,

    occupation: 'Senior Expedition Architect',
    portfolioWebsite: 'https://alexwright.travel',
    govtIdType: 'Passport',
    govtIdNumber: 'P892104912',

    // Section 5: Packages & Services Offered (ON/OFF Toggles)
    serviceFlights: true,
    serviceHotels: true,
    serviceMeals: true,
    serviceLocalTransport: true,
    serviceVisaAssistance: true,
    serviceTravelInsurance: true,
    serviceTourGuide: true,
    serviceCustomizedItinerary: true,
    serviceEquipmentRental: false,
    servicePhotography: true,

    // Section 6: Availability
    workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    workingHoursStart: '08:00',
    workingHoursEnd: '20:00',
    responseTimeSla: '< 15 mins',
    isTakingBookings: true,

    // Section 7: Banking & Payments
    bankAccountName: 'Waypoint Travel International',
    bankAccountNumber: '987654321098',
    bankName: 'JPMorgan Chase Bank',
    ifscOrSwiftCode: 'CHASUS33XXX',
    upiOrPaypalId: 'payments@waypointtravel.com',
    preferredCurrency: 'USD',
    acceptedPaymentMethods: ['Credit / Debit Card', 'Bank Wire Transfer', 'PayPal'],
    paymentTerms: '50% deposit on booking confirmation, balance 14 days prior to departure.',

    // Section 8: Social Links
    socialWebsite: 'https://waypointtravel.com',
    socialInstagram: 'https://instagram.com/waypoint_expeditions',
    socialFacebook: 'https://facebook.com/waypointtravel',
    socialYouTube: 'https://youtube.com/c/waypointtravel',
    socialLinkedIn: 'https://linkedin.com/company/waypointtravel',
    socialTwitter: 'https://x.com/waypoint_travel',
    socialWhatsApp: 'https://wa.me/15550192831',

    // Section 9: Preferences
    acceptDirectBookings: true,
    notifyEmail: true,
    notifySms: true,
    notifyWhatsApp: true,
    autoResponderMessage: 'Hello! Thank you for contacting Waypoint. Our concierge team has received your request and will respond within 15 minutes.',

    // Section 10: Verification Vault & Documents
    isVerified: true,
    verificationProgress: 'VERIFIED' as 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED',
    rejectionReason: '',

    // Read-only system metrics
    partnerLevel: 'Gold Organizer',
    averageRating: 4.9,
    responseRate: 98,
    tripsCompleted: 154,
    happyTravelers: 3420,
    repeatCustomersRate: 42.5,
    cancellationRate: 0.4,
    totalReviewsCount: 142,
    yearsOnBeacon: 2,
  })

  // Vault Verification Documents
  const [documents, setDocuments] = useState<Array<{
    id: string
    title: string
    documentType: string
    fileName: string
    status: 'VERIFIED' | 'UNDER_REVIEW' | 'PENDING' | 'REJECTED'
    uploadedAt: string
  }>>([
    {
      id: 'doc-1',
      title: 'Business Registration Certificate',
      documentType: 'Company Registration',
      fileName: 'Waypoint_Inc_Registration.pdf',
      status: 'VERIFIED',
      uploadedAt: '2026-01-15',
    },
    {
      id: 'doc-2',
      title: 'Official Tourism Operator License (#TRV-88219)',
      documentType: 'Tourism License',
      fileName: 'Tourism_Operator_License_2026.pdf',
      status: 'VERIFIED',
      uploadedAt: '2026-01-15',
    },
    {
      id: 'doc-3',
      title: 'Corporate GST & Tax ID Certificate',
      documentType: 'Tax Document',
      fileName: 'GST_Certificate_2026.pdf',
      status: 'VERIFIED',
      uploadedAt: '2026-01-16',
    },
    {
      id: 'doc-4',
      title: 'Authorized Signatory Government ID (Passport)',
      documentType: 'Government ID',
      fileName: 'Passport_Front_Back.pdf',
      status: 'VERIFIED',
      uploadedAt: '2026-01-16',
    },
    {
      id: 'doc-5',
      title: 'Live Selfie Verification Photo',
      documentType: 'Selfie Verification',
      fileName: 'Selfie_Verification_Img.jpg',
      status: 'VERIFIED',
      uploadedAt: '2026-01-17',
    },
  ])

  // Modal for new document upload
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadType, setUploadType] = useState('Government ID')
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null)

  // Simulate Skeleton Loader on mount
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  // Auto-Save notification triggers whenever a section is saved
  const triggerAutoSave = (sectionName: string) => {
    setAutoSaving(true)
    setTimeout(() => {
      setAutoSaving(false)
      toast.success(`${sectionName} auto-saved successfully!`)
    }, 500)
  }

  // Calculate Overall Completion Percentage
  const calculateCompletion = () => {
    let score = 0
    if (profile.displayName && profile.bio && profile.phone) score += 10
    if (profile.specializations.length > 0 && profile.languages.length > 0) score += 10
    if (profile.countriesServed.length > 0 && profile.popularDestinations.length > 0) score += 10
    if (profile.companyName || profile.occupation) score += 10
    if (profile.serviceFlights || profile.serviceHotels) score += 10
    if (profile.workingDays.length > 0) score += 10
    if (profile.bankAccountNumber || profile.upiOrPaypalId) score += 10
    if (profile.socialWebsite || profile.socialInstagram) score += 10
    if (profile.autoResponderMessage) score += 10
    if (documents.length >= 3) score += 10
    return score
  }

  const completionPercentage = calculateCompletion()

  // 10 Setup Steps Definition
  const steps = [
    { id: 1, title: 'Basic Information', icon: User, key: 'basic' },
    { id: 2, title: 'Travel Expertise', icon: Award, key: 'expertise' },
    { id: 3, title: 'Operating Locations', icon: MapPin, key: 'locations' },
    { id: 4, title: profile.partnerType === 'COMPANY' ? 'Company Details' : 'Freelancer Details', icon: Building2, key: 'company' },
    { id: 5, title: 'Packages & Services', icon: Package, key: 'services' },
    { id: 6, title: 'Operating Availability', icon: Clock, key: 'availability' },
    { id: 7, title: 'Banking & Payments', icon: CreditCard, key: 'banking' },
    { id: 8, title: 'Social & Brand Links', icon: Share2, key: 'social' },
    { id: 9, title: 'Preferences', icon: Settings, key: 'preferences' },
    { id: 10, title: 'Verification Vault', icon: ShieldCheck, key: 'verification' },
  ]

  // Status helper for sidebar items
  const getStepStatus = (stepId: number) => {
    if (stepId === activeStep) return 'current'
    if (stepId < activeStep || completionPercentage > stepId * 9) return 'completed'
    return 'pending'
  }

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadTitle.trim()) return
    const newDoc = {
      id: `doc-${Date.now()}`,
      title: uploadTitle.trim(),
      documentType: uploadType,
      fileName: selectedUploadFile?.name || `${uploadTitle.replace(/\s+/g, '_')}.pdf`,
      status: 'UNDER_REVIEW' as const,
      uploadedAt: new Date().toISOString().slice(0, 10),
    }
    setDocuments((prev) => [...prev, newDoc])
    setShowUploadModal(false)
    setUploadTitle('')
    setSelectedUploadFile(null)
    toast.success('Verification document submitted. Vault status updated to Under Review.')
  }

  if (loading) {
    return (
      <div className="space-y-6 pb-12">
        <Skeleton className="h-28 w-full rounded-[24px]" />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Skeleton className="h-[500px] lg:col-span-1 rounded-[24px]" />
          <Skeleton className="h-[500px] lg:col-span-3 rounded-[24px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-16">
      {/* ---------------- HEADER & OVERALL PROGRESS BANNER ---------------- */}
      <Card className="p-6 border border-border shadow-xl rounded-[24px] bg-gradient-to-r from-navy via-slate-900 to-navy text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">Organizer Profile & Credentials Console</h1>
              <span className="bg-cyan/20 text-cyan border border-cyan/30 text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {profile.partnerLevel}
              </span>
              {profile.isVerified && (
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Beacon Verified
                </span>
              )}
            </div>

            <p className="text-xs text-white/70 max-w-2xl leading-relaxed">
              Complete your professional profile over time to maximize traveler trust. Each section auto-saves independently so you can return whenever convenient.
            </p>
          </div>

          {/* Type Toggle Pills & Auto-Save Status Indicator */}
          <div className="flex flex-col items-end gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-white/10 p-1 rounded-[14px] border border-white/15">
              <button
                type="button"
                onClick={() => {
                  setProfile((prev) => ({ ...prev, partnerType: 'COMPANY' }))
                  toast.success('Switched to Travel Company view')
                }}
                className={`px-3.5 py-1.5 rounded-[10px] text-xs font-bold transition-all cursor-pointer ${
                  profile.partnerType === 'COMPANY' ? 'bg-cyan text-navy shadow-md' : 'text-white/70 hover:text-white'
                }`}
              >
                🏢 Travel Company
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfile((prev) => ({ ...prev, partnerType: 'FREELANCER' }))
                  toast.success('Switched to Freelancer view')
                }}
                className={`px-3.5 py-1.5 rounded-[10px] text-xs font-bold transition-all cursor-pointer ${
                  profile.partnerType === 'FREELANCER' ? 'bg-teal text-white shadow-md' : 'text-white/70 hover:text-white'
                }`}
              >
                👤 Freelance Planner
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-cyan/90 font-mono">
              <RefreshCw className={`w-3.5 h-3.5 ${autoSaving ? 'animate-spin text-cyan' : ''}`} />
              <span>{autoSaving ? 'Saving changes...' : 'All changes auto-saved'}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Completion Percentage Bar */}
        <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span>Overall Profile Completion</span>
              <span className="text-[10px] font-normal text-white/60">({completionPercentage === 100 ? '100% Ready for Verification' : `${completionPercentage}% Completed`})</span>
            </span>
            <span className="font-extrabold text-cyan font-mono text-sm">{completionPercentage}%</span>
          </div>

          <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-teal via-cyan to-emerald-400 rounded-full"
            />
          </div>
        </div>
      </Card>

      {/* ---------------- MAIN LAYOUT: SIDEBAR WIZARD + CONTENT ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* SIDEBAR STEP NAVIGATION WIZARD */}
        <Card className="lg:col-span-1 p-3 border border-border shadow-md rounded-[20px] sticky top-20 bg-surface">
          <div className="p-3 border-b border-border mb-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-navy">Profile Setup Wizard</h3>
            <p className="text-[11px] text-muted mt-0.5">10 Steps to a 100% Verified Profile</p>
          </div>

          <nav className="space-y-1">
            {steps.map((step) => {
              const status = getStepStatus(step.id)
              const Icon = step.icon

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full text-left p-2.5 rounded-[14px] text-xs font-bold transition-all flex items-center justify-between gap-2 cursor-pointer ${
                    activeStep === step.id
                      ? 'bg-navy text-white shadow-md glow-cyan-sm'
                      : status === 'completed'
                      ? 'text-navy hover:bg-teal/10'
                      : 'text-muted hover:bg-border/30 hover:text-navy'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-[10px] flex items-center justify-center shrink-0 ${
                        activeStep === step.id
                          ? 'bg-cyan text-navy'
                          : status === 'completed'
                          ? 'bg-emerald-500/15 text-emerald-600'
                          : 'bg-border/50 text-muted'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="truncate">{step.title}</span>
                  </div>

                  {/* Status Indicator */}
                  {status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : activeStep === step.id ? (
                    <span className="w-2 h-2 rounded-full bg-cyan shrink-0 animate-ping" />
                  ) : (
                    <Circle className="w-4 h-4 text-muted/40 shrink-0" />
                  )}
                </button>
              )
            })}
          </nav>

          <div className="p-3 mt-4 border-t border-border bg-page rounded-[14px] text-[11px] text-muted space-y-1">
            <span className="font-bold text-navy block">🔒 Privacy Guarantee</span>
            <p>Verification documents are stored in an encrypted vault and never shown to travelers.</p>
          </div>
        </Card>

        {/* STEP CONTENT CONTAINER */}
        <div className="lg:col-span-3 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* ---------------- SECTION 1: BASIC INFORMATION ---------------- */}
              {activeStep === 1 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <h3 className="text-base font-bold text-navy flex items-center gap-2">
                        <User className="w-5 h-5 text-teal" /> 1. Basic Account & Brand Information
                      </h3>
                      <p className="text-xs text-muted mt-1">Manage your brand logo, cover banner, contact details, and public bio.</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => triggerAutoSave('Basic Information')}
                      className="bg-navy text-white text-xs font-bold gap-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-cyan" /> Save Section
                    </Button>
                  </div>

                  {/* Brand Assets Upload Previews */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FileUploader
                      label="Brand Profile Photo / Logo"
                      currentFileUrl={profile.avatarUrl}
                      onFileSelect={(file) => {
                        const url = URL.createObjectURL(file)
                        setProfile((prev) => ({ ...prev, avatarUrl: url }))
                        triggerAutoSave('Avatar Logo')
                      }}
                      helperText="Square logo or profile picture (PNG/JPG)"
                    />
                    <FileUploader
                      label="Cover Banner Image"
                      currentFileUrl={profile.coverBannerUrl}
                      onFileSelect={(file) => {
                        const url = URL.createObjectURL(file)
                        setProfile((prev) => ({ ...prev, coverBannerUrl: url }))
                        triggerAutoSave('Cover Banner')
                      }}
                      helperText="Landscape banner image (1200x400 recommended)"
                    />
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Display Name / Brand Title"
                      value={profile.displayName}
                      onChange={(e) => setProfile((prev) => ({ ...prev, displayName: e.target.value }))}
                    />
                    
                    <Input
                      label="Primary Mobile Number"
                      value={profile.phone}
                      onChange={(e) => {
                        const val = e.target.value
                        setProfile((prev) => ({ ...prev, phone: val, whatsappNumber: prev.whatsappNumber || val }))
                        triggerAutoSave('Mobile Number')
                      }}
                      icon={<Phone className="w-4 h-4 text-teal" />}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="WhatsApp Line"
                      value={profile.whatsappNumber}
                      onChange={(e) => setProfile((prev) => ({ ...prev, whatsappNumber: e.target.value }))}
                    />
                    <Input
                      label="Business Email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                      icon={<Mail className="w-4 h-4 text-teal" />}
                    />
                    <Input
                      label="City & Country"
                      value={`${profile.city}, ${profile.country}`}
                      onChange={(e) => {
                        const parts = e.target.value.split(',')
                        setProfile((prev) => ({ ...prev, city: parts[0] || '', country: parts[1] || '' }))
                      }}
                      icon={<MapPin className="w-4 h-4 text-teal" />}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-navy block">Professional Bio & Mission Statement</label>
                    <textarea
                      rows={4}
                      value={profile.bio}
                      onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                      className="w-full p-3 text-xs text-navy border border-border rounded-[14px] bg-page focus:border-teal focus:outline-none resize-none"
                    />
                  </div>
                </Card>
              )}

              {/* ---------------- SECTION 2: TRAVEL EXPERTISE ---------------- */}
              {activeStep === 2 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <h3 className="text-base font-bold text-navy flex items-center gap-2">
                        <Award className="w-5 h-5 text-teal" /> 2. Travel Expertise & Specializations
                      </h3>
                      <p className="text-xs text-muted mt-1">Define your niche, languages spoken, travel styles, and group size capabilities.</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => triggerAutoSave('Travel Expertise')}
                      className="bg-navy text-white text-xs font-bold gap-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-cyan" /> Save Section
                    </Button>
                  </div>

                  <MultiSelectChips
                    label="Tour Specializations (Searchable Tags)"
                    options={SPECIALIZATION_OPTIONS}
                    selected={profile.specializations}
                    onChange={(selected) => {
                      setProfile((prev) => ({ ...prev, specializations: selected }))
                      triggerAutoSave('Specializations')
                    }}
                    placeholder="Search or add specializations..."
                  />

                  <MultiSelectChips
                    label="Languages Spoken"
                    options={LANGUAGE_OPTIONS}
                    selected={profile.languages}
                    onChange={(selected) => {
                      setProfile((prev) => ({ ...prev, languages: selected }))
                      triggerAutoSave('Languages')
                    }}
                    placeholder="Search languages..."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Years of Industry Experience"
                      type="number"
                      value={profile.yearsExperience.toString()}
                      onChange={(e) => setProfile((prev) => ({ ...prev, yearsExperience: parseInt(e.target.value) || 1 }))}
                    />
                    <Input
                      label="Preferred Group Sizes Handled"
                      value={profile.groupSizes.join(', ')}
                      onChange={(e) => setProfile((prev) => ({ ...prev, groupSizes: e.target.value.split(',').map(s => s.trim()) }))}
                    />
                  </div>
                </Card>
              )}

              {/* ---------------- SECTION 3: OPERATING LOCATIONS ---------------- */}
              {activeStep === 3 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <h3 className="text-base font-bold text-navy flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-teal" /> 3. Operating Locations & Coverage
                      </h3>
                      <p className="text-xs text-muted mt-1">Specify countries, regions, and popular destinations where you organize tours.</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => triggerAutoSave('Operating Locations')}
                      className="bg-navy text-white text-xs font-bold gap-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-cyan" /> Save Section
                    </Button>
                  </div>

                  <MultiSelectChips
                    label="Countries Served"
                    options={COUNTRY_OPTIONS}
                    selected={profile.countriesServed}
                    onChange={(selected) => {
                      setProfile((prev) => ({ ...prev, countriesServed: selected }))
                      triggerAutoSave('Countries')
                    }}
                  />

                  <MultiSelectChips
                    label="Popular Destinations Offered"
                    options={POPULAR_DESTINATIONS_OPTIONS}
                    selected={profile.popularDestinations}
                    onChange={(selected) => {
                      setProfile((prev) => ({ ...prev, popularDestinations: selected }))
                      triggerAutoSave('Destinations')
                    }}
                  />

                  <Input
                    label="Operating Regions / Continents"
                    value={profile.operatingRegions.join(', ')}
                    onChange={(e) => setProfile((prev) => ({ ...prev, operatingRegions: e.target.value.split(',').map(s => s.trim()) }))}
                    placeholder="e.g. South Asia, Western Europe"
                  />
                </Card>
              )}

              {/* ---------------- SECTION 4: DYNAMIC COMPANY vs FREELANCER DETAILS ---------------- */}
              {activeStep === 4 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <h3 className="text-base font-bold text-navy flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-teal" />
                        4. {profile.partnerType === 'COMPANY' ? 'Company Details' : 'Freelancer Details'}
                      </h3>
                      <p className="text-xs text-muted mt-1">
                        {profile.partnerType === 'COMPANY'
                          ? 'Specify legal entity credentials, registration numbers, tax IDs, and office details.'
                          : 'Provide your personal freelance title, portfolio, and government ID details.'}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => triggerAutoSave('Legal Details')}
                      className="bg-navy text-white text-xs font-bold gap-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-cyan" /> Save Section
                    </Button>
                  </div>

                  {profile.partnerType === 'COMPANY' ? (
                    // COMPANY SPECIFIC FIELDS
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Company Registered Legal Name"
                          value={profile.companyName}
                          onChange={(e) => setProfile((prev) => ({ ...prev, companyName: e.target.value }))}
                        />
                        <Input
                          label="Business Registration Number (CIN / LLPIN / EIN)"
                          value={profile.registrationNumber}
                          onChange={(e) => setProfile((prev) => ({ ...prev, registrationNumber: e.target.value }))}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Input
                          label="GST / Tax Identification Number"
                          value={profile.gstNumber}
                          onChange={(e) => setProfile((prev) => ({ ...prev, gstNumber: e.target.value }))}
                        />
                        <Input
                          label="PAN Card Number"
                          value={profile.panNumber}
                          onChange={(e) => setProfile((prev) => ({ ...prev, panNumber: e.target.value }))}
                        />
                        <Input
                          label="Company Website URL"
                          value={profile.companyWebsite}
                          onChange={(e) => setProfile((prev) => ({ ...prev, companyWebsite: e.target.value }))}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Office / Headquarters Address"
                          value={profile.officeAddress}
                          onChange={(e) => setProfile((prev) => ({ ...prev, officeAddress: e.target.value }))}
                        />
                        <div className="grid grid-cols-2 gap-3">
                          <Input
                            label="Established Year"
                            type="number"
                            value={profile.establishedYear.toString()}
                            onChange={(e) => setProfile((prev) => ({ ...prev, establishedYear: parseInt(e.target.value) || 2020 }))}
                          />
                          <Input
                            label="Number of Employees"
                            value={profile.numberOfEmployees}
                            onChange={(e) => setProfile((prev) => ({ ...prev, numberOfEmployees: e.target.value }))}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // FREELANCER SPECIFIC FIELDS
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Occupation / Title"
                          value={profile.occupation}
                          onChange={(e) => setProfile((prev) => ({ ...prev, occupation: e.target.value }))}
                          placeholder="e.g. Expedition Leader & Freelance Planner"
                        />
                        <Input
                          label="Portfolio Website URL"
                          value={profile.portfolioWebsite}
                          onChange={(e) => setProfile((prev) => ({ ...prev, portfolioWebsite: e.target.value }))}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Government ID Type"
                          value={profile.govtIdType}
                          onChange={(e) => setProfile((prev) => ({ ...prev, govtIdType: e.target.value }))}
                          placeholder="Passport / Aadhaar / National ID"
                        />
                        <Input
                          label="Government ID Number"
                          value={profile.govtIdNumber}
                          onChange={(e) => setProfile((prev) => ({ ...prev, govtIdNumber: e.target.value }))}
                        />
                      </div>
                    </div>
                  )}
                </Card>
              )}

              {/* ---------------- SECTION 5: PACKAGES & SERVICES OFFERED ---------------- */}
              {activeStep === 5 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <h3 className="text-base font-bold text-navy flex items-center gap-2">
                        <Package className="w-5 h-5 text-teal" /> 5. Packages & Included Services
                      </h3>
                      <p className="text-xs text-muted mt-1">Use interactive ON/OFF cards to indicate standard inclusions for your trip packages.</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => triggerAutoSave('Package Services')}
                      className="bg-navy text-white text-xs font-bold gap-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-cyan" /> Save Section
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ToggleCard
                      icon={<Plane className="w-5 h-5" />}
                      title="Flight Bookings"
                      description="Domestic and international flight assistance"
                      enabled={profile.serviceFlights}
                      onChange={(enabled) => setProfile((prev) => ({ ...prev, serviceFlights: enabled }))}
                    />
                    <ToggleCard
                      icon={<Hotel className="w-5 h-5" />}
                      title="Hotels & Resorts"
                      description="Luxury & boutique accommodations included"
                      enabled={profile.serviceHotels}
                      onChange={(enabled) => setProfile((prev) => ({ ...prev, serviceHotels: enabled }))}
                    />
                    <ToggleCard
                      icon={<Utensils className="w-5 h-5" />}
                      title="Meals & Dining"
                      description="Daily breakfast, lunch, or gourmet dinner"
                      enabled={profile.serviceMeals}
                      onChange={(enabled) => setProfile((prev) => ({ ...prev, serviceMeals: enabled }))}
                    />
                    <ToggleCard
                      icon={<Car className="w-5 h-5" />}
                      title="Local Transport"
                      description="Private cab transfers & airport pickups"
                      enabled={profile.serviceLocalTransport}
                      onChange={(enabled) => setProfile((prev) => ({ ...prev, serviceLocalTransport: enabled }))}
                    />
                    <ToggleCard
                      icon={<FileCheck className="w-5 h-5" />}
                      title="Visa Assistance"
                      description="Express visa application & documentation"
                      enabled={profile.serviceVisaAssistance}
                      onChange={(enabled) => setProfile((prev) => ({ ...prev, serviceVisaAssistance: enabled }))}
                    />
                    <ToggleCard
                      icon={<Shield className="w-5 h-5" />}
                      title="Travel Insurance"
                      description="Comprehensive medical & trip coverage"
                      enabled={profile.serviceTravelInsurance}
                      onChange={(enabled) => setProfile((prev) => ({ ...prev, serviceTravelInsurance: enabled }))}
                    />
                    <ToggleCard
                      icon={<User className="w-5 h-5" />}
                      title="Licensed Tour Guide"
                      description="Dedicated local guide & concierge"
                      enabled={profile.serviceTourGuide}
                      onChange={(enabled) => setProfile((prev) => ({ ...prev, serviceTourGuide: enabled }))}
                    />
                    <ToggleCard
                      icon={<Sparkles className="w-5 h-5" />}
                      title="Customized Itineraries"
                      description="Tailor-made schedules according to traveler preferences"
                      enabled={profile.serviceCustomizedItinerary}
                      onChange={(enabled) => setProfile((prev) => ({ ...prev, serviceCustomizedItinerary: enabled }))}
                    />
                  </div>
                </Card>
              )}

              {/* ---------------- SECTION 6: OPERATING AVAILABILITY ---------------- */}
              {activeStep === 6 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <h3 className="text-base font-bold text-navy flex items-center gap-2">
                        <Clock className="w-5 h-5 text-teal" /> 6. Operating Availability & SLA
                      </h3>
                      <p className="text-xs text-muted mt-1">Configure your working days, business hours, and inquiry response SLAs.</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => triggerAutoSave('Availability')}
                      className="bg-navy text-white text-xs font-bold gap-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-cyan" /> Save Section
                    </Button>
                  </div>

                  <DayPicker
                    label="Working Days Selection"
                    selectedDays={profile.workingDays}
                    onChange={(days) => {
                      setProfile((prev) => ({ ...prev, workingDays: days }))
                      triggerAutoSave('Working Days')
                    }}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Opening Time"
                      type="time"
                      value={profile.workingHoursStart}
                      onChange={(e) => setProfile((prev) => ({ ...prev, workingHoursStart: e.target.value }))}
                    />
                    <Input
                      label="Closing Time"
                      type="time"
                      value={profile.workingHoursEnd}
                      onChange={(e) => setProfile((prev) => ({ ...prev, workingHoursEnd: e.target.value }))}
                    />
                    <Input
                      label="Response Time SLA"
                      value={profile.responseTimeSla}
                      onChange={(e) => setProfile((prev) => ({ ...prev, responseTimeSla: e.target.value }))}
                    />
                  </div>

                  <ToggleCard
                    title="Taking New Bookings"
                    description="When enabled, travelers can directly send inquiries and book packages."
                    enabled={profile.isTakingBookings}
                    onChange={(enabled) => setProfile((prev) => ({ ...prev, isTakingBookings: enabled }))}
                  />
                </Card>
              )}

              {/* ---------------- SECTION 7: BANKING & PAYMENTS ---------------- */}
              {activeStep === 7 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <h3 className="text-base font-bold text-navy flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-teal" /> 7. Banking & Payment Settlement Details
                      </h3>
                      <p className="text-xs text-muted mt-1">Configure payout bank accounts, accepted payment methods, and cancellation terms.</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => triggerAutoSave('Banking Details')}
                      className="bg-navy text-white text-xs font-bold gap-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-cyan" /> Save Section
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Bank Account Holder Name"
                      value={profile.bankAccountName}
                      onChange={(e) => setProfile((prev) => ({ ...prev, bankAccountName: e.target.value }))}
                    />
                    <Input
                      label="Bank Account Number / IBAN"
                      value={profile.bankAccountNumber}
                      onChange={(e) => setProfile((prev) => ({ ...prev, bankAccountNumber: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="Bank Name"
                      value={profile.bankName}
                      onChange={(e) => setProfile((prev) => ({ ...prev, bankName: e.target.value }))}
                    />
                    <Input
                      label="IFSC / SWIFT Code"
                      value={profile.ifscOrSwiftCode}
                      onChange={(e) => setProfile((prev) => ({ ...prev, ifscOrSwiftCode: e.target.value }))}
                    />
                    <Input
                      label="UPI ID / PayPal Email"
                      value={profile.upiOrPaypalId}
                      onChange={(e) => setProfile((prev) => ({ ...prev, upiOrPaypalId: e.target.value }))}
                    />
                  </div>

                  <MultiSelectChips
                    label="Accepted Payment Methods"
                    options={PAYMENT_METHOD_OPTIONS}
                    selected={profile.acceptedPaymentMethods}
                    onChange={(selected) => setProfile((prev) => ({ ...prev, acceptedPaymentMethods: selected }))}
                  />

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-navy block">Payment Terms & Cancellation Policy</label>
                    <textarea
                      rows={3}
                      value={profile.paymentTerms}
                      onChange={(e) => setProfile((prev) => ({ ...prev, paymentTerms: e.target.value }))}
                      className="w-full p-3 text-xs text-navy border border-border rounded-[14px] bg-page focus:border-teal focus:outline-none resize-none"
                    />
                  </div>
                </Card>
              )}

              {/* ---------------- SECTION 8: SOCIAL & BRAND LINKS ---------------- */}
              {activeStep === 8 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <h3 className="text-base font-bold text-navy flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-teal" /> 8. Social Links & Online Presence
                      </h3>
                      <p className="text-xs text-muted mt-1">Connect your website and social media profiles with live link previews.</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => triggerAutoSave('Social Links')}
                      className="bg-navy text-white text-xs font-bold gap-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-cyan" /> Save Section
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Official Website"
                      value={profile.socialWebsite}
                      onChange={(e) => setProfile((prev) => ({ ...prev, socialWebsite: e.target.value }))}
                      icon={<Globe className="w-4 h-4 text-teal" />}
                    />
                    <Input
                      label="Instagram Handle URL"
                      value={profile.socialInstagram}
                      onChange={(e) => setProfile((prev) => ({ ...prev, socialInstagram: e.target.value }))}
                      icon={<FaInstagram className="w-4 h-4 text-rose-500" />}
                    />
                    <Input
                      label="Facebook Page URL"
                      value={profile.socialFacebook}
                      onChange={(e) => setProfile((prev) => ({ ...prev, socialFacebook: e.target.value }))}
                      icon={<FaFacebook className="w-4 h-4 text-blue-600" />}
                    />
                    <Input
                      label="YouTube Channel"
                      value={profile.socialYouTube}
                      onChange={(e) => setProfile((prev) => ({ ...prev, socialYouTube: e.target.value }))}
                      icon={<FaYoutube className="w-4 h-4 text-red-600" />}
                    />
                    <Input
                      label="LinkedIn Profile"
                      value={profile.socialLinkedIn}
                      onChange={(e) => setProfile((prev) => ({ ...prev, socialLinkedIn: e.target.value }))}
                      icon={<FaLinkedin className="w-4 h-4 text-sky-600" />}
                    />
                    <Input
                      label="Twitter / X Profile"
                      value={profile.socialTwitter}
                      onChange={(e) => setProfile((prev) => ({ ...prev, socialTwitter: e.target.value }))}
                      icon={<FaTwitter className="w-4 h-4 text-slate-800" />}
                    />
                  </div>
                </Card>
              )}

              {/* ---------------- SECTION 9: PREFERENCES ---------------- */}
              {activeStep === 9 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <h3 className="text-base font-bold text-navy flex items-center gap-2">
                        <Settings className="w-5 h-5 text-teal" /> 9. Communication & Platform Preferences
                      </h3>
                      <p className="text-xs text-muted mt-1">Configure automated notifications, auto-responders, and booking controls.</p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => triggerAutoSave('Preferences')}
                      className="bg-navy text-white text-xs font-bold gap-1 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5 text-cyan" /> Save Section
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <ToggleCard
                      title="Direct Instant Booking"
                      description="Allow verified travelers to instantly book without prior chat approval."
                      enabled={profile.acceptDirectBookings}
                      onChange={(enabled) => setProfile((prev) => ({ ...prev, acceptDirectBookings: enabled }))}
                    />

                    <div className="p-4 bg-page border border-border rounded-[16px] space-y-3">
                      <h4 className="text-xs font-bold text-navy uppercase tracking-wider">Notification Delivery Channels</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profile.notifyEmail}
                            onChange={(e) => setProfile((prev) => ({ ...prev, notifyEmail: e.target.checked }))}
                            className="rounded border-border text-teal"
                          />
                          <span>Email Notifications</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profile.notifySms}
                            onChange={(e) => setProfile((prev) => ({ ...prev, notifySms: e.target.checked }))}
                            className="rounded border-border text-teal"
                          />
                          <span>SMS Alerts</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profile.notifyWhatsApp}
                            onChange={(e) => setProfile((prev) => ({ ...prev, notifyWhatsApp: e.target.checked }))}
                            className="rounded border-border text-teal"
                          />
                          <span>WhatsApp Messages</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-navy block">Auto-Responder Welcome Message</label>
                      <textarea
                        rows={3}
                        value={profile.autoResponderMessage}
                        onChange={(e) => setProfile((prev) => ({ ...prev, autoResponderMessage: e.target.value }))}
                        className="w-full p-3 text-xs text-navy border border-border rounded-[14px] bg-page focus:border-teal focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </Card>
              )}

              {/* ---------------- SECTION 10: VERIFICATION VAULT (PRIVATE & CONFIDENTIAL) ---------------- */}
              {activeStep === 10 && (
                <div className="space-y-6">
                  <Card className="p-6 border border-border shadow-xl rounded-[24px] bg-slate-900 text-white space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-cyan/20 text-cyan flex items-center justify-center font-bold shrink-0 mt-1">
                          <Lock className="w-5 h-5 text-cyan" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-white">Confidential Verification Documents Vault</h3>
                            <span className="text-[10px] font-mono uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-md">
                              Encrypted & Role Protected
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            Uploaded verification documents are accessible ONLY to you and platform compliance administrators. They are strictly excluded from public APIs and travelers.
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={() => setShowUploadModal(true)}
                        className="bg-cyan hover:bg-cyan/90 text-navy font-bold text-xs gap-1.5 shrink-0 cursor-pointer"
                      >
                        <FileText className="w-4 h-4" /> Upload Verification File
                      </Button>
                    </div>

                    {/* Vault Documents Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="p-4 bg-slate-800/90 border border-white/10 rounded-[18px] flex items-center justify-between gap-3 shadow-md"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-[12px] bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                              <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs text-white truncate">{doc.title}</h4>
                              <p className="text-[10px] text-slate-400 mt-0.5">
                                {doc.documentType} · {doc.fileName} · {formatDate(doc.uploadedAt)}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`text-[10px] font-extrabold px-3 py-1 rounded-full border uppercase shrink-0 font-mono ${
                              doc.status === 'VERIFIED'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                : doc.status === 'UNDER_REVIEW'
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                : 'bg-red-500/20 text-red-300 border-red-500/30'
                            }`}
                          >
                            {doc.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Status Alert Footer */}
                    <div className="p-4 bg-cyan/10 border border-cyan/20 rounded-[16px] text-xs text-cyan flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="font-bold block text-white">Vault Verification Status: 100% VERIFIED & APPROVED</span>
                        <span className="text-[11px] text-slate-300">All required documents have been verified by Beacon Compliance Team.</span>
                      </div>
                      <span className="text-[10px] font-mono bg-cyan/20 text-cyan px-3 py-1 rounded-full uppercase shrink-0">
                        Active Partner License
                      </span>
                    </div>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ---------------- READ-ONLY ORGANIZER PERFORMANCE SECTION ---------------- */}
          <Card className="p-6 border border-border shadow-md rounded-[24px] space-y-4 bg-surface">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-navy uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-teal" /> Organizer Performance & System Metrics (Read-Only)
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  Platform-generated metrics dynamically calculated from your activity, reviews, and booking completion rates.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold bg-teal/10 text-teal px-2.5 py-1 rounded-full">
                Auto-Calculated System Values
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
              <div className="p-3 bg-page border border-border rounded-[16px] text-center">
                <span className="text-[10px] uppercase font-bold text-muted block">Partner Level</span>
                <strong className="text-sm font-extrabold text-cyan font-mono">{profile.partnerLevel}</strong>
              </div>

              <div className="p-3 bg-page border border-border rounded-[16px] text-center">
                <span className="text-[10px] uppercase font-bold text-muted block">Average Rating</span>
                <strong className="text-base font-extrabold text-amber-500 font-mono flex items-center justify-center gap-1">
                  ⭐ {profile.averageRating} ({profile.totalReviewsCount})
                </strong>
              </div>

              <div className="p-3 bg-page border border-border rounded-[16px] text-center">
                <span className="text-[10px] uppercase font-bold text-muted block">Response Rate</span>
                <strong className="text-base font-extrabold text-emerald-600 font-mono">{profile.responseRate}%</strong>
              </div>

              <div className="p-3 bg-page border border-border rounded-[16px] text-center">
                <span className="text-[10px] uppercase font-bold text-muted block">Response SLA</span>
                <strong className="text-xs font-extrabold text-navy">{profile.responseTimeSla}</strong>
              </div>

              <div className="p-3 bg-page border border-border rounded-[16px] text-center">
                <span className="text-[10px] uppercase font-bold text-muted block">Trips Completed</span>
                <strong className="text-base font-extrabold text-teal font-mono">{profile.tripsCompleted}</strong>
              </div>

              <div className="p-3 bg-page border border-border rounded-[16px] text-center">
                <span className="text-[10px] uppercase font-bold text-muted block">Happy Travelers</span>
                <strong className="text-base font-extrabold text-navy font-mono">{profile.happyTravelers.toLocaleString()}</strong>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* UPLOAD DOCUMENT MODAL FOR VERIFICATION VAULT */}
      <AnimatePresence>
        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUploadModal(false)}
              className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-surface border border-border rounded-[24px] p-6 shadow-2xl space-y-4 z-10"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-bold text-navy text-lg flex items-center gap-2">
                  <Lock className="w-5 h-5 text-teal" /> Upload Verification Document
                </h3>
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="text-muted hover:text-navy cursor-pointer text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleDocumentSubmit} className="space-y-4">
                <Input
                  label="Document Description / Title"
                  placeholder="e.g. Tourism License 2026"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  required
                />

                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy block">Document Category</label>
                  <select
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value)}
                    className="w-full p-2.5 rounded-[12px] border border-border bg-page text-xs text-navy"
                  >
                    <option value="Government ID">Government Photo ID (Passport / Aadhaar)</option>
                    <option value="Business Registration">Business Registration Certificate</option>
                    <option value="GST Certificate">GST / Corporate Tax Certificate</option>
                    <option value="Tourism License">Tourism Operator License</option>
                    <option value="Selfie Verification">Selfie Photo Verification</option>
                    <option value="Address Proof">Headquarters Address Proof</option>
                  </select>
                </div>

                <FileUploader
                  label="Attach Document File"
                  onFileSelect={(file) => setSelectedUploadFile(file)}
                  helperText="Upload official document (PDF, PNG, JPG up to 10MB)"
                />

                <div className="flex justify-end gap-2 pt-2 border-t border-border">
                  <Button variant="ghost" size="sm" type="button" onClick={() => setShowUploadModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" type="submit" className="bg-navy text-white">
                    Submit to Vault
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
