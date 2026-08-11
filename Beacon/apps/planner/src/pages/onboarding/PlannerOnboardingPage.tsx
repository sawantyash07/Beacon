import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Award, MapPin, Building2, Package, Clock, CreditCard,
  Share2, Settings, ShieldCheck, CheckCircle2, ChevronRight, ChevronLeft,
  UploadCloud, AlertCircle, Save, Sparkles, Check, ArrowRight, LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

export default function PlannerOnboardingPage() {
  const { user, kycStatus, updateKycStatus, logout } = useAuth()
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState<number>(() => {
    const savedStep = localStorage.getItem(`beacon_active_step_${user?.email || 'default'}`)
    if (savedStep && !isNaN(parseInt(savedStep))) return parseInt(savedStep)
    return 1
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user?.email && activeStep >= 1 && activeStep <= 10) {
      localStorage.setItem(`beacon_active_step_${user.email}`, activeStep.toString())
    }
  }, [activeStep, user?.email])

  const isDemo = user?.email === 'concierge@beaconplanner.com' || user?.email === 'demo@beaconplanner.com'

  // Profile Form State - Empty & Fresh for Real Planners
  const [profile, setProfile] = useState(() => {
    const storageKey = `beacon_profile_${user?.email || 'default'}`
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {}
    }

    return {
      partnerType: 'COMPANY' as 'COMPANY' | 'FREELANCER',
      displayName: user?.name || '',
      bio: '',
      avatarUrl: '',
      coverBannerUrl: '',
      phone: '',
      whatsappNumber: '',
      email: user?.email || '',
      city: '',
      country: 'India',
      specializations: [] as string[],
      languages: ['English', 'Hindi'] as string[],
      travelStyles: [] as string[],
      groupSizes: [] as string[],
      yearsExperience: 1,
      countriesServed: [] as string[],
      operatingRegions: [] as string[],
      popularDestinations: [] as string[],
      companyName: '',
      registrationNumber: '',
      gstNumber: '',
      panNumber: '',
      companyWebsite: '',
      officeAddress: '',
      numberOfEmployees: '1-10 Employees',
      establishedYear: new Date().getFullYear(),
      occupation: '',
      portfolioWebsite: '',
      govtIdType: 'Aadhaar Card',
      govtIdNumber: '',
      serviceFlights: true,
      serviceHotels: true,
      serviceMeals: true,
      serviceLocalTransport: true,
      serviceVisaAssistance: false,
      serviceTravelInsurance: false,
      serviceTourGuide: true,
      serviceCustomizedItinerary: true,
      serviceEquipmentRental: false,
      servicePhotography: false,
      workingDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as string[],
      workingHoursStart: '09:00',
      workingHoursEnd: '19:00',
      responseTimeSla: '< 30 mins',
      isTakingBookings: true,
      bankAccountName: '',
      bankAccountNumber: '',
      bankName: '',
      ifscOrSwiftCode: '',
      upiOrPaypalId: '',
      preferredCurrency: 'INR',
      acceptedPaymentMethods: ['UPI Payments', 'Bank Wire Transfer'] as string[],
      paymentTerms: '50% advance on confirmation, balance 7 days prior to departure.',
      socialWebsite: '',
      socialInstagram: '',
      socialFacebook: '',
      socialYouTube: '',
      socialLinkedIn: '',
      socialWhatsApp: '',
      acceptDirectBookings: true,
      notifyEmail: true,
      notifyWhatsApp: true,
      autoResponderMessage: 'Hello! Thank you for contacting us. We will get back to you within 30 minutes.',
    }
  })

  // Vault Documents
  const [documents, setDocuments] = useState<Array<{
    id: string
    title: string
    documentType: string
    fileName: string
    status: 'VERIFIED' | 'UNDER_REVIEW' | 'PENDING'
    uploadedAt: string
  }>>([])

  // Modal for new document upload
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadType, setUploadType] = useState('Government ID (Aadhaar/Passport)')
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null)

  // Persist changes
  useEffect(() => {
    const storageKey = `beacon_profile_${user?.email || 'default'}`
    localStorage.setItem(storageKey, JSON.stringify(profile))
  }, [profile, user?.email])

  // Step Completion Logic
  const isStepComplete = (stepId: number): boolean => {
    switch (stepId) {
      case 1:
        return Boolean(profile.displayName?.trim() && profile.email?.trim() && profile.phone?.trim() && profile.city?.trim())
      case 2:
        return (profile.specializations?.length || 0) > 0 && (profile.travelStyles?.length || 0) > 0
      case 3:
        return (profile.operatingRegions?.length || 0) > 0 || (profile.popularDestinations?.length || 0) > 0
      case 4:
        return profile.partnerType === 'COMPANY'
          ? Boolean(profile.companyName?.trim() && profile.panNumber?.trim())
          : Boolean(profile.occupation?.trim() && profile.govtIdNumber?.trim())
      case 5:
        return Boolean(profile.serviceFlights || profile.serviceHotels || profile.serviceMeals || profile.serviceTourGuide || profile.serviceCustomizedItinerary)
      case 6:
        return (profile.workingDays?.length || 0) > 0
      case 7:
        return Boolean((profile.bankAccountNumber?.trim() && profile.ifscOrSwiftCode?.trim()) || profile.upiOrPaypalId?.trim())
      case 8:
        return Boolean(profile.socialInstagram?.trim() || profile.socialWebsite?.trim() || profile.socialWhatsApp?.trim())
      case 9:
        return Boolean(profile.autoResponderMessage?.trim())
      case 10:
        return documents.length >= 1 || kycStatus === 'VERIFIED'
      default:
        return false
    }
  }

  const calculateCompletion = () => {
    let completed = 0
    for (let i = 1; i <= 10; i++) {
      if (isStepComplete(i)) completed++
    }
    return Math.round((completed / 10) * 100)
  }

  const completionPercentage = calculateCompletion()

  const steps = [
    { id: 1, title: 'Basic Information', shortTitle: 'Basic Info', icon: User, desc: 'Name, email, phone & city' },
    { id: 2, title: 'Travel Expertise', shortTitle: 'Expertise', icon: Award, desc: 'Specializations & travel styles' },
    { id: 3, title: 'Operating Locations', shortTitle: 'Locations', icon: MapPin, desc: 'Destinations & regions served' },
    { id: 4, title: profile.partnerType === 'COMPANY' ? 'Company Details' : 'Freelancer Details', shortTitle: 'Business', icon: Building2, desc: 'Registration, GST & PAN details' },
    { id: 5, title: 'Packages & Services', shortTitle: 'Services', icon: Package, desc: 'Services & inclusions offered' },
    { id: 6, title: 'Operating Availability', shortTitle: 'Availability', icon: Clock, desc: 'Business hours & working days' },
    { id: 7, title: 'Banking & Payments', shortTitle: 'Banking', icon: CreditCard, desc: 'UPI ID, bank account & terms' },
    { id: 8, title: 'Social & Brand Links', shortTitle: 'Social', icon: Share2, desc: 'Instagram, website & WhatsApp' },
    { id: 9, title: 'Preferences', shortTitle: 'Preferences', icon: Settings, desc: 'Instant bookings & auto-replies' },
    { id: 10, title: 'eKYC Document Vault', shortTitle: 'Verification', icon: ShieldCheck, desc: 'ID verification & compliance' },
  ]

  const handleNextStep = () => {
    if (activeStep < 10) {
      setActiveStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      handleCompleteOnboarding()
    }
  }

  const handlePrevStep = () => {
    if (activeStep > 1) {
      setActiveStep(prev => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadTitle.trim()) {
      toast.error('Please enter a document title')
      return
    }
    const newDoc = {
      id: `doc-${Date.now()}`,
      title: uploadTitle.trim(),
      documentType: uploadType,
      fileName: selectedUploadFile?.name || `${uploadTitle.replace(/\s+/g, '_')}.pdf`,
      status: 'UNDER_REVIEW' as const,
      uploadedAt: new Date().toISOString().slice(0, 10),
    }
    setDocuments(prev => [...prev, newDoc])
    updateKycStatus('UNDER_REVIEW')
    setUploadTitle('')
    setSelectedUploadFile(null)
    toast.success('Document uploaded to encrypted vault!')
  }

  const handleInstantApproval = () => {
    setDocuments(prev => prev.map(d => ({ ...d, status: 'VERIFIED' as const })))
    if (documents.length === 0) {
      setDocuments([
        { id: 'doc-1', title: 'Govt ID Proof', documentType: 'Government ID', fileName: 'Identity_Verification.pdf', status: 'VERIFIED', uploadedAt: '2026-08-11' }
      ])
    }
    updateKycStatus('VERIFIED')
    toast.success('🎉 eKYC Verified & Approved!')
  }

  const handleCompleteOnboarding = () => {
    toast.success('Welcome to Beacon Planner! Your workspace is ready.')
    navigate('/dashboard')
  }

  const toggleArrayItem = (field: 'specializations' | 'travelStyles' | 'groupSizes' | 'operatingRegions' | 'popularDestinations' | 'workingDays' | 'acceptedPaymentMethods', item: string) => {
    setProfile(prev => {
      const list = prev[field] || []
      const exists = list.includes(item)
      const updated = exists ? list.filter(i => i !== item) : [...list, item]
      return { ...prev, [field]: updated }
    })
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-navy flex flex-col antialiased select-none">
      {/* ---------------- FULL-SCREEN TOP HEADER BAR ---------------- */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-xs px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/planner/beacon-logo.png" alt="Beacon" className="h-8 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <div className="flex flex-col">
              <span className="font-extrabold text-navy text-base leading-tight">Beacon Planner</span>
              <span className="text-[10px] font-bold text-cyan tracking-wider uppercase">Organizer Setup</span>
            </div>
          </Link>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <span className="text-xs text-muted font-medium hidden sm:inline-block">
            Step {activeStep} of 10: <strong className="text-navy">{steps[activeStep - 1]?.title}</strong>
          </span>
        </div>

        {/* Center Aggregate Completion Indicator */}
        <div className="hidden md:flex items-center gap-3 w-64">
          <div className="flex-1 h-2 bg-page rounded-full overflow-hidden border border-border">
            <motion.div
              className="h-full bg-gradient-to-r from-teal to-cyan rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs font-bold text-navy shrink-0">{completionPercentage}%</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-navy block">{user?.name || 'New Planner'}</span>
            <span className="text-[10px] text-muted block">{user?.email}</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="text-xs font-semibold border-border hover:bg-page"
          >
            Skip to Dashboard
          </Button>
        </div>
      </header>

      {/* ---------------- MAIN ONBOARDING WORKSPACE ---------------- */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* ---------------- FULL-WIDTH HORIZONTAL STEP RAIL ---------------- */}
        <div className="w-full bg-white border border-border rounded-[24px] p-5 shadow-sm space-y-4">
          {/* Top Rail Sub-header */}
          <div className="flex items-center justify-between gap-4 border-b border-border/50 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-teal">
                Step {activeStep} of 10
              </span>
              <span className="text-muted/40">•</span>
              <span className="text-sm font-bold text-navy">
                {steps[activeStep - 1]?.title}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-muted hidden sm:inline">
                Completion: <strong className="text-navy">{completionPercentage}%</strong>
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                {steps.filter(s => isStepComplete(s.id)).length}/10 Done
              </span>
            </div>
          </div>

          {/* Connected Step Markers Row */}
          <div className="pt-2 pb-1 px-1">
            <div className="flex items-center justify-between relative">
              {steps.map((step, idx) => {
                const isCompleted = isStepComplete(step.id)
                const isActive = activeStep === step.id
                const isUpcoming = !isActive && !isCompleted

                return (
                  <div key={step.id} className="flex-1 flex items-center group relative min-w-0">
                    {/* Marker Button */}
                    <button
                      type="button"
                      onClick={() => setActiveStep(step.id)}
                      className="flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer group shrink-0"
                      title={`${step.id}. ${step.title}`}
                    >
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                          isActive
                            ? 'bg-cyan text-navy font-extrabold shadow-md rail-pulse ring-2 ring-cyan/40 scale-110 z-20'
                            : isCompleted
                            ? 'bg-emerald-50 border border-emerald-500/40 text-emerald-600/80 hover:bg-emerald-100/60 z-10'
                            : 'bg-white border border-border/80 text-muted/60 hover:border-border hover:text-muted z-10'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <span>{step.id}</span>
                        )}
                      </div>

                      {/* Label (Responsive: Abbreviated on medium/large, active step highlighted) */}
                      <span
                        className={`text-[10px] text-center max-w-[72px] truncate hidden md:block transition-all duration-200 ${
                          isActive
                            ? 'font-extrabold text-navy scale-105'
                            : isCompleted
                            ? 'font-medium text-muted/60'
                            : 'text-muted/40 font-normal'
                        }`}
                      >
                        {step.shortTitle}
                      </span>
                    </button>

                    {/* Connecting Line to Next Step */}
                    {idx < steps.length - 1 && (
                      <div className="flex-1 h-[2px] mx-1 sm:mx-2 rounded-full overflow-hidden transition-all duration-250">
                        <div
                          className={`h-full transition-all duration-250 ${
                            isCompleted
                              ? 'bg-emerald-300/40'
                              : isActive
                              ? 'bg-gradient-to-r from-cyan to-border'
                              : 'bg-border/60'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ---------------- ACTIVE STEP FORM CARD ---------------- */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-border rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6"
            >
              {/* SECTION HEADER */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-border">
                <div>
                  <span className="text-xs font-bold text-cyan uppercase tracking-wider">Step {activeStep} of 10</span>
                  <h1 className="text-xl font-extrabold text-navy mt-0.5">{steps[activeStep - 1]?.title}</h1>
                  <p className="text-xs text-muted mt-1">{steps[activeStep - 1]?.desc}</p>
                </div>
                
                {/* Partner Type Selector (for step 1 & 4) */}
                {(activeStep === 1 || activeStep === 4) && (
                  <div className="flex items-center gap-1.5 bg-page p-1 rounded-[12px] border border-border">
                    <button
                      type="button"
                      onClick={() => setProfile(p => ({ ...p, partnerType: 'COMPANY' }))}
                      className={`px-3 py-1 text-xs font-bold rounded-[8px] transition-all ${
                        profile.partnerType === 'COMPANY' ? 'bg-cyan text-navy shadow-xs' : 'text-muted hover:text-navy'
                      }`}
                    >
                      🏢 Company
                    </button>
                    <button
                      type="button"
                      onClick={() => setProfile(p => ({ ...p, partnerType: 'FREELANCER' }))}
                      className={`px-3 py-1 text-xs font-bold rounded-[8px] transition-all ${
                        profile.partnerType === 'FREELANCER' ? 'bg-teal text-white shadow-xs' : 'text-muted hover:text-navy'
                      }`}
                    >
                      👤 Freelancer
                    </button>
                  </div>
                )}
              </div>

              {/* ---------------- STEP 1: BASIC INFORMATION ---------------- */}
              {activeStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Display Name / Brand Title *"
                      placeholder="e.g. Himalayan Trail Explorers"
                      value={profile.displayName}
                      onChange={(e) => setProfile(p => ({ ...p, displayName: e.target.value }))}
                    />
                    <Input
                      label="Primary Contact Mobile Number *"
                      placeholder="+91 98765 43210"
                      value={profile.phone}
                      onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Business Email Address *"
                      type="email"
                      placeholder="planner@yourdomain.com"
                      value={profile.email}
                      onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                    />
                    <Input
                      label="WhatsApp Support Line"
                      placeholder="+91 98765 43210"
                      value={profile.whatsappNumber}
                      onChange={(e) => setProfile(p => ({ ...p, whatsappNumber: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="City *"
                      placeholder="e.g. Jalna"
                      value={profile.city || ''}
                      onChange={(e) => setProfile(p => ({ ...p, city: e.target.value }))}
                    />
                    <Input
                      label="State / Province *"
                      placeholder="e.g. Maharashtra"
                      value={profile.state || ''}
                      onChange={(e) => setProfile(p => ({ ...p, state: e.target.value }))}
                    />
                    <Input
                      label="Country *"
                      placeholder="e.g. India"
                      value={profile.country || ''}
                      onChange={(e) => setProfile(p => ({ ...p, country: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-navy mb-1.5">
                      Professional Bio / Agency Story
                    </label>
                    <textarea
                      rows={3}
                      value={profile.bio}
                      onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
                      placeholder="Tell travelers what makes your itineraries special and why they should book with you..."
                      className="w-full p-3 rounded-[12px] border border-border bg-page text-xs text-navy focus:outline-none focus:ring-1 focus:ring-cyan"
                    />
                  </div>
                </div>
              )}

              {/* ---------------- STEP 2: TRAVEL EXPERTISE ---------------- */}
              {activeStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-2">
                      Specializations (Select all that apply) *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Trekking & Hiking', 'Luxury Travel', 'Honeymoon & Romantic', 'Wildlife & Safari', 'Cultural & Heritage', 'Beach & Atolls', 'Road Trips & Biking', 'Corporate Offsites'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleArrayItem('specializations', tag)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            profile.specializations.includes(tag)
                              ? 'bg-cyan text-navy font-bold shadow-xs'
                              : 'bg-page border border-border text-muted hover:border-cyan/50'
                          }`}
                        >
                          {profile.specializations.includes(tag) ? '✓ ' : '+ '}{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-2">
                      Travel Styles Offered *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Custom Private Itineraries', 'Group Departures', 'Budget & Backpacking', 'Luxury & Premium', 'Solo Explorer'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleArrayItem('travelStyles', tag)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            profile.travelStyles.includes(tag)
                              ? 'bg-teal text-white font-bold shadow-xs'
                              : 'bg-page border border-border text-muted hover:border-teal/50'
                          }`}
                        >
                          {profile.travelStyles.includes(tag) ? '✓ ' : '+ '}{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Years of Experience in Travel Industry"
                      type="number"
                      value={profile.yearsExperience}
                      onChange={(e) => setProfile(p => ({ ...p, yearsExperience: parseInt(e.target.value) || 1 }))}
                    />
                    <Input
                      label="Languages Supported"
                      placeholder="English, Hindi, Marathi, etc."
                      value={profile.languages.join(', ')}
                      onChange={(e) => setProfile(p => ({ ...p, languages: e.target.value.split(',').map(s => s.trim()) }))}
                    />
                  </div>
                </div>
              )}

              {/* ---------------- STEP 3: OPERATING LOCATIONS ---------------- */}
              {activeStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-2">
                      Regions Served *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['North India & Himalayas', 'South India & Western Ghats', 'Northeast India', 'Goa & Coastal', 'Rajasthan & Desert', 'Southeast Asia', 'Middle East', 'Europe'].map((region) => (
                        <button
                          key={region}
                          type="button"
                          onClick={() => toggleArrayItem('operatingRegions', region)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            profile.operatingRegions.includes(region)
                              ? 'bg-cyan text-navy font-bold shadow-xs'
                              : 'bg-page border border-border text-muted hover:border-cyan/50'
                          }`}
                        >
                          {profile.operatingRegions.includes(region) ? '✓ ' : '+ '}{region}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-2">
                      Top Destinations Handled
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['Ladakh', 'Himachal Pradesh', 'Kashmir', 'Uttarakhand', 'Kerala', 'Goa', 'Andaman', 'Meghalaya', 'Bali', 'Dubai', 'Vietnam'].map((dest) => (
                        <button
                          key={dest}
                          type="button"
                          onClick={() => toggleArrayItem('popularDestinations', dest)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            profile.popularDestinations.includes(dest)
                              ? 'bg-teal text-white font-bold shadow-xs'
                              : 'bg-page border border-border text-muted hover:border-teal/50'
                          }`}
                        >
                          {profile.popularDestinations.includes(dest) ? '✓ ' : '+ '}{dest}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- STEP 4: COMPANY / FREELANCER DETAILS ---------------- */}
              {activeStep === 4 && (
                <div className="space-y-4">
                  {profile.partnerType === 'COMPANY' ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Registered Legal Company Name *"
                          placeholder="e.g. Beacon Voyages Pvt Ltd"
                          value={profile.companyName}
                          onChange={(e) => setProfile(p => ({ ...p, companyName: e.target.value }))}
                        />
                        <Input
                          label="Company PAN Number *"
                          placeholder="ABCDE1234F"
                          value={profile.panNumber}
                          onChange={(e) => setProfile(p => ({ ...p, panNumber: e.target.value.toUpperCase() }))}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="GST Identification Number (GSTIN)"
                          placeholder="27ABCDE1234F1Z5"
                          value={profile.gstNumber}
                          onChange={(e) => setProfile(p => ({ ...p, gstNumber: e.target.value.toUpperCase() }))}
                        />
                        <Input
                          label="CIN / Registration Number"
                          placeholder="U63040MH2024PTC123456"
                          value={profile.registrationNumber}
                          onChange={(e) => setProfile(p => ({ ...p, registrationNumber: e.target.value }))}
                        />
                      </div>
                      <Input
                        label="Registered Office Address"
                        placeholder="Street Address, City, State, Pincode"
                        value={profile.officeAddress}
                        onChange={(e) => setProfile(p => ({ ...p, officeAddress: e.target.value }))}
                      />
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Freelance Title / Profession *"
                          placeholder="e.g. Certified Trek Leader & Expedition Architect"
                          value={profile.occupation}
                          onChange={(e) => setProfile(p => ({ ...p, occupation: e.target.value }))}
                        />
                        <Input
                          label="Personal PAN Card Number *"
                          placeholder="ABCDE1234F"
                          value={profile.panNumber}
                          onChange={(e) => setProfile(p => ({ ...p, panNumber: e.target.value.toUpperCase() }))}
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Govt ID Number (Aadhaar / Passport) *"
                          placeholder="12-digit Aadhaar or Passport #"
                          value={profile.govtIdNumber}
                          onChange={(e) => setProfile(p => ({ ...p, govtIdNumber: e.target.value }))}
                        />
                        <Input
                          label="Portfolio / Instagram Link"
                          placeholder="https://instagram.com/your_handle"
                          value={profile.portfolioWebsite}
                          onChange={(e) => setProfile(p => ({ ...p, portfolioWebsite: e.target.value }))}
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* ---------------- STEP 5: PACKAGES & SERVICES ---------------- */}
              {activeStep === 5 && (
                <div className="space-y-4">
                  <p className="text-xs text-muted">Toggle services you provide to travelers:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { key: 'serviceFlights', label: '✈️ Flight Booking & Assistance' },
                      { key: 'serviceHotels', label: '🏨 Hotel & Resort Stays' },
                      { key: 'serviceMeals', label: '🍽️ Meals & Dining Arrangements' },
                      { key: 'serviceLocalTransport', label: '🚐 Private AC / Tempo Transit' },
                      { key: 'serviceTourGuide', label: '🧭 Certified Local Tour Guides' },
                      { key: 'serviceCustomizedItinerary', label: '📝 Custom Day-by-Day Itineraries' },
                      { key: 'serviceTravelInsurance', label: '🛡️ Travel Insurance Support' },
                      { key: 'servicePhotography', label: '📸 Expedition Photography' },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className={`flex items-center justify-between p-3.5 rounded-[14px] border cursor-pointer transition-all ${
                          (profile as any)[item.key]
                            ? 'bg-cyan/10 border-cyan text-navy font-bold'
                            : 'bg-page border-border text-muted hover:border-border/80'
                        }`}
                      >
                        <span className="text-xs font-semibold">{item.label}</span>
                        <input
                          type="checkbox"
                          checked={Boolean((profile as any)[item.key])}
                          onChange={(e) => setProfile(p => ({ ...p, [item.key]: e.target.checked }))}
                          className="w-4 h-4 rounded border-border text-cyan accent-cyan"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------- STEP 6: AVAILABILITY ---------------- */}
              {activeStep === 6 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-2">Working Days *</label>
                    <div className="flex flex-wrap gap-2">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleArrayItem('workingDays', day)}
                          className={`w-12 h-10 rounded-[10px] text-xs font-bold transition-all ${
                            profile.workingDays.includes(day)
                              ? 'bg-cyan text-navy font-bold shadow-xs'
                              : 'bg-page border border-border text-muted'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Opening Time"
                      type="time"
                      value={profile.workingHoursStart}
                      onChange={(e) => setProfile(p => ({ ...p, workingHoursStart: e.target.value }))}
                    />
                    <Input
                      label="Closing Time"
                      type="time"
                      value={profile.workingHoursEnd}
                      onChange={(e) => setProfile(p => ({ ...p, workingHoursEnd: e.target.value }))}
                    />
                  </div>

                  <Input
                    label="Response Time SLA to Inquiries"
                    value={profile.responseTimeSla}
                    onChange={(e) => setProfile(p => ({ ...p, responseTimeSla: e.target.value }))}
                    placeholder="e.g. < 15 mins, < 1 hour"
                  />
                </div>
              )}

              {/* ---------------- STEP 7: BANKING & PAYMENTS ---------------- */}
              {activeStep === 7 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Account Beneficiary Name *"
                      placeholder="Account holder name"
                      value={profile.bankAccountName}
                      onChange={(e) => setProfile(p => ({ ...p, bankAccountName: e.target.value }))}
                    />
                    <Input
                      label="Bank Account Number *"
                      placeholder="Account number"
                      value={profile.bankAccountNumber}
                      onChange={(e) => setProfile(p => ({ ...p, bankAccountNumber: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Bank Name *"
                      placeholder="e.g. HDFC Bank, ICICI Bank, SBI"
                      value={profile.bankName}
                      onChange={(e) => setProfile(p => ({ ...p, bankName: e.target.value }))}
                    />
                    <Input
                      label="IFSC Code *"
                      placeholder="HDFC0001234"
                      value={profile.ifscOrSwiftCode}
                      onChange={(e) => setProfile(p => ({ ...p, ifscOrSwiftCode: e.target.value.toUpperCase() }))}
                    />
                  </div>

                  <Input
                    label="Direct UPI ID for Instant Booking Deposits"
                    placeholder="yourname@upi or company@okhdfcbank"
                    value={profile.upiOrPaypalId}
                    onChange={(e) => setProfile(p => ({ ...p, upiOrPaypalId: e.target.value }))}
                  />

                  <Input
                    label="Payment & Refund Terms"
                    placeholder="e.g. 50% deposit upon booking, 100% refundable up to 14 days before trip."
                    value={profile.paymentTerms}
                    onChange={(e) => setProfile(p => ({ ...p, paymentTerms: e.target.value }))}
                  />
                </div>
              )}

              {/* ---------------- STEP 8: SOCIAL LINKS ---------------- */}
              {activeStep === 8 && (
                <div className="space-y-4">
                  <Input
                    label="Official Website URL"
                    placeholder="https://youragency.com"
                    value={profile.socialWebsite}
                    onChange={(e) => setProfile(p => ({ ...p, socialWebsite: e.target.value }))}
                  />
                  <Input
                    label="Instagram Profile Link"
                    placeholder="https://instagram.com/your_handle"
                    value={profile.socialInstagram}
                    onChange={(e) => setProfile(p => ({ ...p, socialInstagram: e.target.value }))}
                  />
                  <Input
                    label="WhatsApp Chat Link"
                    placeholder="https://wa.me/919876543210"
                    value={profile.socialWhatsApp}
                    onChange={(e) => setProfile(p => ({ ...p, socialWhatsApp: e.target.value }))}
                  />
                  <Input
                    label="Facebook Page Link"
                    placeholder="https://facebook.com/yourpage"
                    value={profile.socialFacebook}
                    onChange={(e) => setProfile(p => ({ ...p, socialFacebook: e.target.value }))}
                  />
                </div>
              )}

              {/* ---------------- STEP 9: PREFERENCES ---------------- */}
              {activeStep === 9 && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3.5 rounded-[14px] border border-border bg-page cursor-pointer">
                      <div>
                        <p className="text-xs font-bold text-navy">Accept Direct Traveler Bookings</p>
                        <p className="text-[11px] text-muted">Allow travelers to pay and hold seats immediately on your packages</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.acceptDirectBookings}
                        onChange={(e) => setProfile(p => ({ ...p, acceptDirectBookings: e.target.checked }))}
                        className="w-4 h-4 rounded text-cyan accent-cyan"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3.5 rounded-[14px] border border-border bg-page cursor-pointer">
                      <div>
                        <p className="text-xs font-bold text-navy">Instant WhatsApp Inquiry Alerts</p>
                        <p className="text-[11px] text-muted">Receive live notifications on WhatsApp whenever someone inquires</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.notifyWhatsApp}
                        onChange={(e) => setProfile(p => ({ ...p, notifyWhatsApp: e.target.checked }))}
                        className="w-4 h-4 rounded text-cyan accent-cyan"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5">Auto-Responder Welcome Message</label>
                    <textarea
                      rows={3}
                      value={profile.autoResponderMessage}
                      onChange={(e) => setProfile(p => ({ ...p, autoResponderMessage: e.target.value }))}
                      className="w-full p-3 rounded-[12px] border border-border bg-page text-xs text-navy focus:outline-none focus:ring-1 focus:ring-cyan"
                    />
                  </div>
                </div>
              )}

              {/* ---------------- STEP 10: eKYC DOCUMENT VAULT ---------------- */}
              {activeStep === 10 && (
                <div className="space-y-6">
                  <div className="p-4 rounded-[16px] bg-[#F0FDF4] border border-emerald-500/30 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
                      <div>
                        <h4 className="text-xs font-extrabold text-navy">Identity & Legal Compliance</h4>
                        <p className="text-[11px] text-muted">Upload Government ID, Business Registration, or GST document to unlock package publishing.</p>
                      </div>
                    </div>
                    {kycStatus === 'VERIFIED' ? (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full shrink-0">
                        ✓ Verified Account
                      </span>
                    ) : (
                      <Button size="sm" onClick={handleInstantApproval} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0">
                        ⚡ Quick Verify (Demo)
                      </Button>
                    )}
                  </div>

                  {/* Upload Form */}
                  <form onSubmit={handleUploadDocument} className="p-4 rounded-[16px] border border-border bg-page space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Document Type *</label>
                        <select
                          value={uploadType}
                          onChange={(e) => setUploadType(e.target.value)}
                          className="w-full p-2.5 rounded-[10px] border border-border bg-white text-xs text-navy focus:outline-none focus:ring-1 focus:ring-cyan"
                        >
                          <option value="Government ID (Aadhaar/Passport)">Government ID (Aadhaar / Passport)</option>
                          <option value="Company Registration / CIN">Company Incorporation Certificate</option>
                          <option value="GST Certificate">GST Certificate</option>
                          <option value="PAN Card Copy">PAN Card Copy</option>
                        </select>
                      </div>
                      <Input
                        label="Document Title *"
                        placeholder="e.g. Authorized Signatory Aadhaar"
                        value={uploadTitle}
                        onChange={(e) => setUploadTitle(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <input
                        type="file"
                        id="vault-doc-upload"
                        className="text-xs text-muted file:mr-3 file:py-1.5 file:px-3 file:rounded-[8px] file:border-0 file:text-xs file:font-semibold file:bg-cyan file:text-navy cursor-pointer"
                        onChange={(e) => setSelectedUploadFile(e.target.files?.[0] || null)}
                      />
                      <Button type="submit" size="sm" className="bg-navy text-white text-xs font-bold shrink-0">
                        Upload Document
                      </Button>
                    </div>
                  </form>

                  {/* Document List */}
                  <div className="space-y-2">
                    <h5 className="text-xs font-bold text-navy uppercase tracking-wider">Submitted Vault Documents ({documents.length})</h5>
                    {documents.length === 0 ? (
                      <p className="text-xs text-muted p-4 text-center border border-dashed border-border rounded-[14px]">
                        No documents submitted yet. Please upload at least 1 document or click Quick Verify.
                      </p>
                    ) : (
                      documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 rounded-[12px] border border-border bg-white shadow-2xs">
                          <div>
                            <p className="text-xs font-bold text-navy">{doc.title}</p>
                            <p className="text-[11px] text-muted">{doc.documentType} • {doc.fileName}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                            doc.status === 'VERIFIED'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {doc.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* ---------------- BOTTOM STEP CONTROLS ---------------- */}
              <div className="pt-6 border-t border-border flex items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={activeStep === 1}
                  onClick={handlePrevStep}
                  className="text-xs font-bold border-border gap-1"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </Button>

                <div className="flex items-center gap-3">
                  {activeStep < 10 ? (
                    <Button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-cyan hover:bg-cyan/90 text-navy font-bold text-xs px-5 py-2.5 rounded-[12px] gap-1 shadow-md shadow-cyan/20"
                    >
                      Next Section <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleCompleteOnboarding}
                      className="bg-gradient-to-r from-teal to-cyan text-navy font-extrabold text-xs px-6 py-2.5 rounded-[12px] gap-1.5 shadow-lg shadow-cyan/30"
                    >
                      🚀 Complete Setup & Enter Dashboard
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}
