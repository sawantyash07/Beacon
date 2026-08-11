import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Award, Building2, CreditCard, ShieldCheck,
  Save, Sparkles, Lock, Globe, Mail,
  Shield, FileCheck, FileText, Phone, CheckCircle2, Check,
  AlertCircle, ChevronRight, CheckCircle, Info, Eye, UploadCloud, Download, X, Trash2, ExternalLink, Send, ArrowRight, ArrowLeft
} from 'lucide-react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Skeleton } from '@/components/ui/Skeleton'
import { MultiSelectChips } from '@/components/ui/MultiSelectChips'
import { FileUploader } from '@/components/ui/FileUploader'
import { formatDate } from '@/lib/utils'
import { fetchOrganizerProfile, updateOrganizerProfileSection } from '@/services/api'
import { useAuth } from '@/context/AuthContext'
import { submitPlannerApplicationToMaster } from '@/data/masterAdminData'
import {
  validateAadhaar,
  validatePAN,
  validateGSTIN,
  validateVoterID,
  validateCINorLLPIN,
  validateIFSC,
  validateBankAccount,
  validateUPI,
  validateIndianMobile,
  validatePINCode,
  maskAadhaar
} from '@/utils/indiaValidation'

// Specializations & Tag Presets
const SPECIALIZATION_OPTIONS = [
  'Trekking & Mountaineering', 'Luxury & Private Expeditions', 'Honeymoon & Romantic Getaways',
  'Wildlife & Jungle Safaris', 'Cultural & Heritage Tours', 'Beach & Island Escapes',
  'Road Trips & Motorbike Expeditions', 'Spiritual & Pilgrimage Journeys', 'Corporate Offsites & MICE',
  'Backpacking & Budget Treks', 'Photography & Birding Tours', 'Wellness & Ayurveda Retreats'
]

const LANGUAGE_OPTIONS = ['English', 'Hindi', 'Marathi', 'Gujarati', 'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Punjabi', 'French', 'German', 'Spanish', 'Japanese']
const COUNTRY_OPTIONS = ['India', 'Nepal', 'Bhutan', 'Sri Lanka', 'Maldives', 'Thailand', 'Vietnam', 'Indonesia (Bali)', 'Japan', 'Switzerland', 'UAE (Dubai)', 'Georgia']
const CERTIFICATION_OPTIONS = ['NIM Basic Mountaineering (BMC)', 'HMI Advanced Mountaineering (AMC)', 'WFR Wilderness First Responder', 'First Aid & CPR Certified', 'Authorized State Tour Guide License', 'Leave No Trace (LNT) Master']
const INDIA_ACCREDITATION_OPTIONS = ['Ministry of Tourism (MOT) Approved', 'IATO Member (Indian Association of Tour Operators)', 'TAAI Member (Travel Agents Association of India)', 'ADTOI Member (Association of Domestic Tour Operators of India)', 'ATOAI Member (Adventure Tour Operators Association of India)']

export default function BusinessProfilePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user, kycStatus, updateKycStatus, clearBusinessProfileHighlight } = useAuth()
  const [loading, setLoading] = useState(true)

  const [activeStep, setActiveStep] = useState<number>(() => {
    const step = searchParams.get('step')
    if (step && !isNaN(parseInt(step))) return parseInt(step)
    if (searchParams.get('tab') === 'verification') return 4
    const savedStep = localStorage.getItem(`beacon_active_step_${user?.email || 'default'}`)
    if (savedStep && !isNaN(parseInt(savedStep))) return Math.min(5, parseInt(savedStep))
    return 1
  })

  const [autoSaving, setAutoSaving] = useState(false)
  const [showWelcomeDocs, setShowWelcomeDocs] = useState<boolean>(() => {
    const isDemo = user?.email === 'concierge@beaconplanner.com' || user?.email === 'demo@beaconplanner.com'
    if (isDemo) return false
    const seen = localStorage.getItem(`beacon_seen_docs_${user?.email || 'default'}`)
    return !seen
  })

  // Persist active step
  useEffect(() => {
    if (user?.email && activeStep >= 1 && activeStep <= 5) {
      localStorage.setItem(`beacon_active_step_${user.email}`, activeStep.toString())
    }
  }, [activeStep, user?.email])

  const isDemoUser = (email?: string | null) => email === 'concierge@beaconplanner.com' || email === 'demo@beaconplanner.com'

  const getInitialProfile = () => {
    const storageKey = `beacon_profile_${user?.email || 'default'}`
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (typeof parsed.avatarUrl === 'string' && parsed.avatarUrl.startsWith('blob:')) {
          parsed.avatarUrl = ''
        }
        delete parsed.coverBannerUrl
        return parsed
      } catch (e) {}
    }

    if (isDemoUser(user?.email)) {
      return {
        partnerType: 'COMPANY' as 'COMPANY' | 'FREELANCER',
        displayName: 'Beacon Planner Luxury Expeditions',
        personalName: 'Aditya Kumar',
        bio: 'We curate premium domestic and international travel experiences across the Himalayas, Western Ghats, and private atolls.',
        avatarUrl: 'https://images.unsplash.com/photo-1540959733336-eab4deabeeaf?w=200&q=80',
        phone: '9876682069',
        whatsappNumber: '9876682069',
        email: user?.email || 'concierge@beaconplanner.com',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India',
        pinCode: '400001',
        // Company Legal
        companyName: 'Beacon Planner Travel International Pvt Ltd',
        panNumber: 'AABCB1234F',
        registrationNumber: 'U63040MH2020PTC345678',
        gstNumber: '27AABCB1234F1Z5',
        isGstExempt: false,
        gstExemptionReason: '',
        officeAddress: 'Floor 4, Mittal Towers, Nariman Point, Mumbai',
        establishedYear: 2020,
        teamSize: '11-50 Employees',
        // Freelancer Legal
        legalName: 'Aditya Vijay Kumar',
        aadhaarNumber: '234567890123',
        voterIdNumber: 'ABC1234567',
        residentialAddress: 'Flat 402, Green Meadows, Bandra West, Mumbai',
        udyamNumber: 'UDYAM-MH-01-0012345',
        occupation: 'Senior Expedition Architect & Mountain Guide',
        portfolioUrl: 'https://adityatravels.in',
        // Banking
        bankAccountName: 'Beacon Planner Travel International Pvt Ltd',
        bankAccountNumber: '987654321098',
        bankName: 'HDFC Bank',
        ifscOrSwiftCode: 'HDFC0000123',
        upiOrPaypalId: 'beaconplanner@hdfcbank',
        preferredCurrency: 'INR',
        // Optional Track
        countriesServed: ['India', 'Nepal', 'Bhutan', 'Sri Lanka'],
        specializations: ['Trekking & Mountaineering', 'Luxury & Private Expeditions', 'Wildlife & Jungle Safaris'],
        languages: ['English', 'Hindi', 'Marathi'],
        yearsExperience: 8,
        certifications: ['NIM Basic Mountaineering (BMC)', 'First Aid & CPR Certified'],
        indiaAccreditations: ['Ministry of Tourism (MOT) Approved', 'ATOAI Member (Adventure Tour Operators Association of India)'],
        whyChooseMe: '10+ years organizing Himalayan treks, 24/7 dedicated on-ground support team, and zero-compromise safety protocols.',
        isVerified: true,
        verificationProgress: 'VERIFIED' as 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED',
        partnerLevel: 'Gold Organizer',
      }
    }

    // Fresh clean state for Indian Onboarding
    return {
      partnerType: 'COMPANY' as 'COMPANY' | 'FREELANCER',
      displayName: user?.name || '',
      personalName: '',
      bio: '',
      avatarUrl: '',
      phone: '',
      whatsappNumber: '',
      email: user?.email || '',
      city: '',
      state: '',
      country: 'India',
      pinCode: '',
      // Company Legal
      companyName: '',
      panNumber: '',
      registrationNumber: '',
      gstNumber: '',
      isGstExempt: false,
      gstExemptionReason: '',
      officeAddress: '',
      establishedYear: new Date().getFullYear(),
      teamSize: '1-10 Employees',
      // Freelancer Legal
      legalName: '',
      aadhaarNumber: '',
      voterIdNumber: '',
      residentialAddress: '',
      udyamNumber: '',
      occupation: '',
      portfolioUrl: '',
      // Banking
      bankAccountName: '',
      bankAccountNumber: '',
      bankName: '',
      ifscOrSwiftCode: '',
      upiOrPaypalId: '',
      preferredCurrency: 'INR',
      // Optional Track
      countriesServed: ['India'] as string[],
      specializations: [] as string[],
      languages: ['English', 'Hindi'] as string[],
      yearsExperience: 2,
      certifications: [] as string[],
      indiaAccreditations: [] as string[],
      whyChooseMe: '',
      isVerified: false,
      verificationProgress: 'PENDING' as 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED',
      partnerLevel: 'Starter Organizer',
    }
  }

  const [profile, setProfile] = useState(getInitialProfile)

  // Document Vault State
  const [documents, setDocuments] = useState<Array<{
    id: string
    title: string
    documentType: string
    fileName: string
    status: 'VERIFIED' | 'UNDER_REVIEW' | 'PENDING'
    uploadedAt: string
    fileDataUrl?: string
  }>>(() => {
    const storageKey = `beacon_docs_${user?.email || 'default'}`
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try { return JSON.parse(saved) } catch (e) {}
    }
    if (isDemoUser(user?.email)) {
      return [
        { id: '1', title: 'Certificate of Incorporation (ROC)', documentType: 'Company Registration', fileName: 'ROC_Certificate_2020.pdf', status: 'VERIFIED', uploadedAt: '2026-01-15' },
        { id: '2', title: 'GSTIN Registration Certificate', documentType: 'GST Certificate', fileName: 'GST_27AABCB1234F1Z5.pdf', status: 'VERIFIED', uploadedAt: '2026-01-15' },
        { id: '3', title: 'Company PAN Card', documentType: 'Company PAN', fileName: 'PAN_Corporate_AABCB.pdf', status: 'VERIFIED', uploadedAt: '2026-01-15' },
        { id: '4', title: 'Cancelled Cheque - HDFC Bank', documentType: 'Bank Account Proof', fileName: 'Cancelled_Cheque_HDFC.jpg', status: 'VERIFIED', uploadedAt: '2026-01-15' },
        { id: '5', title: 'Office Lease & Electricity Bill', documentType: 'Address Proof', fileName: 'Office_Address_Proof.pdf', status: 'VERIFIED', uploadedAt: '2026-01-15' }
      ]
    }
    return []
  })

  // Modal for new document upload
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadType, setUploadType] = useState('Company Registration / ROC')
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null)
  const [selectedUploadDataUrl, setSelectedUploadDataUrl] = useState<string | null>(null)

  // Document Preview Modal State
  const [previewDoc, setPreviewDoc] = useState<{
    id?: string
    title: string
    fileName: string
    documentType?: string
    uploadedAt?: string
    fileDataUrl?: string
  } | null>(null)

  // Inline Document Upload Handler for Table Rows
  const handleInlineFileUpload = (docKey: string, docTitle: string, docCategory: string, file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const newDoc = {
        id: docKey,
        title: docTitle,
        documentType: docCategory,
        fileName: file.name,
        status: 'VERIFIED' as const,
        uploadedAt: new Date().toISOString().split('T')[0],
        fileDataUrl: dataUrl
      }
      setDocuments(prev => {
        const filtered = prev.filter(d => d.id !== docKey && d.title.toLowerCase() !== docTitle.toLowerCase() && d.documentType.toLowerCase() !== docCategory.toLowerCase())
        const updated = [newDoc, ...filtered]
        localStorage.setItem(`beacon_docs_${user?.email || 'default'}`, JSON.stringify(updated))
        return updated
      })
      toast.success(`✓ "${docTitle}" uploaded successfully!`)
    }
    reader.readAsDataURL(file)
  }

  // Save changes locally
  const saveProfileLocally = (updated: typeof profile) => {
    const storageKey = `beacon_profile_${user?.email || 'default'}`
    localStorage.setItem(storageKey, JSON.stringify(updated))
  }

  // Verification Review Preview Modal & Master Submission State
  const [showVerificationPreviewModal, setShowVerificationPreviewModal] = useState(false)
  const [submittingToMaster, setSubmittingToMaster] = useState(false)

  // Submit profile & documents to Beacon Master Admin
  const handleSendToMaster = async () => {
    setSubmittingToMaster(true)
    try {
      // 1. Submit application into Master Admin Verification Queue
      submitPlannerApplicationToMaster(profile, documents)

      // 2. Update local profile state & storage
      const updated = {
        ...profile,
        isVerified: false,
        verificationProgress: 'UNDER_REVIEW' as const
      }
      setProfile(updated)
      saveProfileLocally(updated)
      updateKycStatus('UNDER_REVIEW')
      localStorage.setItem(`beacon_kyc_status_${user?.email || 'default'}`, 'UNDER_REVIEW')

      setShowVerificationPreviewModal(false)
      toast.success('🚀 Application Sent to Master Admin! Your KYC profile and documents are now under review.')
      navigate('/dashboard')
    } catch (e) {
      toast.error('Could not submit application. Please try again.')
    } finally {
      setSubmittingToMaster(false)
    }
  }

  // Auto-Save integration in background silently
  const triggerAutoSave = async (_sectionName: string, sectionKey: string = 'general') => {
    setAutoSaving(true)
    saveProfileLocally(profile)
    try {
      await updateOrganizerProfileSection(sectionKey, profile)
    } catch (err) {
      // silently persist locally
    } finally {
      setAutoSaving(false)
    }
  }

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const profileData = await fetchOrganizerProfile()
        if (profileData && Object.keys(profileData).length > 0) {
          setProfile(prev => {
            const merged = { ...prev, ...profileData }
            if (typeof merged.avatarUrl === 'string' && merged.avatarUrl.startsWith('blob:')) {
              merged.avatarUrl = ''
            }
            return merged
          })
        }
      } catch (err) {
        // use local
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // 4 Mandatory Steps + 1 Optional Profile Completion Track
  const steps = [
    { id: 1, title: 'Firm & Brand Information', shortTitle: 'Brand Info', icon: User, isMandatory: true },
    { id: 2, title: profile.partnerType === 'COMPANY' ? 'Company Legal & Tax Identity' : 'Freelancer Identity & Legal', shortTitle: 'Legal & Tax', icon: Building2, isMandatory: true },
    { id: 3, title: 'Banking & Payout Credentials', shortTitle: 'Banking', icon: CreditCard, isMandatory: true },
    { id: 4, title: 'Document Vault & eKYC Verification', shortTitle: 'eKYC Vault', icon: ShieldCheck, isMandatory: true },
    { id: 5, title: 'Specializations & Public Profile', shortTitle: 'Specializations', icon: Award, isMandatory: false },
  ]

  // Step Missing Fields Inspector
  const getStepMissingFields = (stepId: number): string[] => {
    const missing: string[] = []
    switch (stepId) {
      case 1: {
        if (!profile.displayName?.trim()) missing.push('Public Brand / Display Name')
        if (profile.partnerType === 'FREELANCER' && !profile.personalName?.trim()) missing.push("Planner's Personal Name")
        if (!profile.phone?.trim() || !validateIndianMobile(profile.phone).isValid) missing.push('Valid 10-Digit Mobile Number')
        if (!profile.email?.trim()) missing.push('Business Email')
        if (!profile.city?.trim()) missing.push('Operating City')
        if (!profile.state?.trim()) missing.push('Operating State')
        break
      }
      case 2: {
        if (profile.partnerType === 'COMPANY') {
          if (!profile.companyName?.trim()) missing.push('Registered Legal Company Name')
          if (!profile.panNumber?.trim() || !validatePAN(profile.panNumber, 'COMPANY').isValid) missing.push('Valid Company PAN Card')
          if (!profile.registrationNumber?.trim() || !validateCINorLLPIN(profile.registrationNumber).isValid) missing.push('Valid CIN / LLPIN / Registration Number')
          if (!profile.isGstExempt && (!profile.gstNumber?.trim() || !validateGSTIN(profile.gstNumber, profile.panNumber).isValid)) missing.push('Valid GSTIN Number')
          if (profile.isGstExempt && !profile.gstExemptionReason?.trim()) missing.push('GST Exemption Reason')
          if (!profile.officeAddress?.trim()) missing.push('Registered Office Address')
          if (!profile.pinCode?.trim() || !validatePINCode(profile.pinCode).isValid) missing.push('Valid 6-Digit PIN Code')
        } else {
          if (!profile.legalName?.trim()) missing.push('Full Legal Name as per Govt ID')
          if (!profile.panNumber?.trim() || !validatePAN(profile.panNumber, 'INDIVIDUAL').isValid) missing.push('Valid Personal PAN (4th letter P)')
          if (!profile.aadhaarNumber?.trim() || !validateAadhaar(profile.aadhaarNumber).isValid) missing.push('Valid 12-Digit Aadhaar (with Verhoeff Checksum)')
          if (!profile.voterIdNumber?.trim() || !validateVoterID(profile.voterIdNumber).isValid) missing.push('Valid Voter ID (EPIC Number)')
          if (!profile.residentialAddress?.trim()) missing.push('Residential / Operating Address')
          if (!profile.pinCode?.trim() || !validatePINCode(profile.pinCode).isValid) missing.push('Valid 6-Digit PIN Code')
        }
        break
      }
      case 3: {
        if (!profile.bankAccountName?.trim()) missing.push('Bank Account Beneficiary Name')
        if (!profile.bankAccountNumber?.trim() || !validateBankAccount(profile.bankAccountNumber).isValid) missing.push('Valid Bank Account Number')
        if (!profile.ifscOrSwiftCode?.trim() || !validateIFSC(profile.ifscOrSwiftCode).isValid) missing.push('Valid 11-Character IFSC Code')
        if (!profile.upiOrPaypalId?.trim() || !validateUPI(profile.upiOrPaypalId).isValid) missing.push('Valid UPI ID')
        break
      }
      case 4: {
        const requiredKeys = profile.partnerType === 'COMPANY'
          ? (profile.isGstExempt ? ['company_registration', 'company_pan', 'bank_proof', 'office_address_proof'] : ['company_registration', 'company_pan', 'bank_proof', 'office_address_proof', 'gst_certificate'])
          : ['personal_pan', 'aadhaar_doc', 'voter_id_doc', 'bank_proof', 'address_proof']

        const uploadedKeys = documents.map(d => d.id?.toLowerCase() || '')
        const missingDocs = requiredKeys.filter(k => 
          !uploadedKeys.includes(k.toLowerCase()) && 
          !documents.some(d => d.title.toLowerCase().includes(k.replace(/_/g, ' ').toLowerCase()) || d.documentType.toLowerCase().includes(k.replace(/_/g, ' ').toLowerCase()))
        )

        if (missingDocs.length > 0) {
          missing.push(`Required Documents (${documents.length}/${requiredKeys.length} uploaded)`)
        }
        break
      }
      default:
        break
    }
    return missing
  }

  // Step Completion Validation Rules
  const isStepComplete = (stepId: number): boolean => {
    return getStepMissingFields(stepId).length === 0
  }

  // Calculate Overall Completion Percentage
  const calculateCompletion = () => {
    let completedCount = 0
    if (isStepComplete(1)) completedCount += 25
    if (isStepComplete(2)) completedCount += 25
    if (isStepComplete(3)) completedCount += 25
    if (isStepComplete(4)) completedCount += 25
    return Math.min(100, completedCount)
  }

  const completionPercentage = calculateCompletion()
  const mandatoryComplete = isStepComplete(1) && isStepComplete(2) && isStepComplete(3) && isStepComplete(4)

  const handleNextStep = () => {
    const missing = getStepMissingFields(activeStep)
    if (missing.length > 0) {
      toast.error(`Please complete all required details in Step ${activeStep}: ${missing.slice(0, 2).join(', ')}${missing.length > 2 ? ` and ${missing.length - 2} more` : ''}`)
      return
    }

    triggerAutoSave(steps[activeStep - 1]?.title)
    if (activeStep < steps.length) {
      setActiveStep(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setShowVerificationPreviewModal(true)
    }
  }

  const handleNavigateToStep = (targetStep: number) => {
    if (targetStep < activeStep) {
      setActiveStep(targetStep)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Gated check: cannot jump forward if current or intermediate steps are incomplete
    for (let s = 1; s < targetStep; s++) {
      const stepMissing = getStepMissingFields(s)
      if (stepMissing.length > 0) {
        toast.error(`Please complete Step ${s} (${steps[s - 1]?.shortTitle}) first before moving ahead.`)
        return
      }
    }

    triggerAutoSave(steps[activeStep - 1]?.title)
    setActiveStep(targetStep)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDocumentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!uploadTitle.trim() || !selectedUploadFile) {
      toast.error('Please attach an official file and document title.')
      return
    }

    const newDoc = {
      id: Date.now().toString(),
      title: uploadTitle,
      documentType: uploadType,
      fileName: selectedUploadFile.name,
      status: 'UNDER_REVIEW' as const,
      uploadedAt: new Date().toISOString().split('T')[0],
      fileDataUrl: selectedUploadDataUrl || undefined
    }

    const updated = [newDoc, ...documents]
    setDocuments(updated)
    localStorage.setItem(`beacon_docs_${user?.email || 'default'}`, JSON.stringify(updated))
    setUploadTitle('')
    setSelectedUploadFile(null)
    setSelectedUploadDataUrl(null)
    setShowUploadModal(false)
    toast.success('Document uploaded to Vault. Verification status set to Under Review.')
  }

  if (loading) {
    return (
      <div className="space-y-6 pb-12 max-w-5xl mx-auto p-6">
        <Skeleton className="h-16 w-full rounded-[24px]" />
        <Skeleton className="h-[450px] w-full rounded-[24px]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-navy flex flex-col antialiased select-none pb-16">
      {/* ---------------- FULL-SCREEN TOP HEADER BAR ---------------- */}
      <header className="sticky top-0 z-40 bg-white border-b border-border shadow-xs px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/planner/beacon-logo.png" alt="Beacon" className="h-8 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <div className="flex flex-col">
              <span className="font-extrabold text-navy text-base leading-tight">Beacon Planner</span>
              <span className="text-[10px] font-bold text-cyan tracking-wider uppercase">KYC & Business Profile</span>
            </div>
          </Link>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <span className="text-xs text-muted font-medium hidden sm:inline-block">
            Step {activeStep} of {steps.length}: <strong className="text-navy">{steps[activeStep - 1]?.title}</strong>
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowWelcomeDocs(true)}
            className="border-border text-navy hover:bg-slate-100 font-bold text-xs px-3.5 py-2 rounded-[12px] shadow-xs gap-1.5 cursor-pointer"
          >
            <FileCheck className="w-3.5 h-3.5 text-teal" />
            <span className="hidden sm:inline">Required Documents</span> Guide
          </Button>

          <Button
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="bg-navy hover:bg-navy/90 text-white font-bold text-xs px-4 py-2 rounded-[12px] shadow-sm gap-1.5 cursor-pointer"
          >
            ← Back to Dashboard
          </Button>
        </div>
      </header>

      {/* ---------------- MAIN FULL-SCREEN CONTENT CONTAINER ---------------- */}
      <div className="max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 flex-1">
        {showWelcomeDocs ? (
          /* PRE-FLIGHT ENTITY BRANCH & DOCUMENTS CHECKLIST */
          <Card className="p-6 sm:p-8 border border-border shadow-xl rounded-[24px] bg-white space-y-8 max-w-4xl mx-auto my-4 animate-in fade-in-50 duration-300">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan/15 text-cyan border border-cyan/30 mb-1">
                <Building2 className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-navy">Select Your Entity Type</h2>
              <p className="text-sm text-muted max-w-xl mx-auto">
                India has two distinct KYC paths. Please select your operating structure to view your required verification documents.
              </p>
            </div>

            {/* Question 0: Are you a Company or Freelancer? */}
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Firm */}
                <button
                  type="button"
                  onClick={() => setProfile(prev => ({ ...prev, partnerType: 'COMPANY' }))}
                  className={`p-5 rounded-[20px] border-2 text-left transition-all cursor-pointer flex items-start gap-4 ${
                    profile.partnerType === 'COMPANY'
                      ? 'border-cyan bg-cyan/5 shadow-md ring-2 ring-cyan/20'
                      : 'border-border bg-page hover:border-cyan/40'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${profile.partnerType === 'COMPANY' ? 'bg-cyan text-navy' : 'bg-slate-200 text-slate-700'}`}>
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm flex items-center gap-2">
                      Registered Company / Firm
                      {profile.partnerType === 'COMPANY' && <CheckCircle2 className="w-4 h-4 text-cyan" />}
                    </h4>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      Pvt Ltd, LLP, Partnership firm, or MSME entity with CIN/LLPIN/GSTIN and commercial operations.
                    </p>
                  </div>
                </button>

                {/* Option 2: Freelancer */}
                <button
                  type="button"
                  onClick={() => setProfile(prev => ({ ...prev, partnerType: 'FREELANCER' }))}
                  className={`p-5 rounded-[20px] border-2 text-left transition-all cursor-pointer flex items-start gap-4 ${
                    profile.partnerType === 'FREELANCER'
                      ? 'border-cyan bg-cyan/5 shadow-md ring-2 ring-cyan/20'
                      : 'border-border bg-page hover:border-cyan/40'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${profile.partnerType === 'FREELANCER' ? 'bg-cyan text-navy' : 'bg-slate-200 text-slate-700'}`}>
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm flex items-center gap-2">
                      Individual Freelance Planner
                      {profile.partnerType === 'FREELANCER' && <CheckCircle2 className="w-4 h-4 text-cyan" />}
                    </h4>
                    <p className="text-xs text-muted mt-1 leading-relaxed">
                      Solo guide, trek leader, independent itinerary curator, or outdoor expert operating under personal PAN.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Dynamic Required Documents Checklist */}
            <div className="p-6 rounded-[20px] bg-slate-50 border border-border space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-navy flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal" />
                  Required Indian KYC Documents for {profile.partnerType === 'COMPANY' ? 'Travel Companies & Firms' : 'Freelance Planners'}
                </h4>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/60 px-2.5 py-1 rounded-full border border-emerald-300 shrink-0">
                  Mandatory for Step 4
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.partnerType === 'COMPANY' ? (
                  <>
                    <div className="flex items-start gap-3 p-3.5 bg-white rounded-[14px] border border-border/80 shadow-2xs">
                      <FileCheck className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs text-navy block font-bold">1. Company Registration Proof</strong>
                        <span className="text-[11px] text-muted">Certificate of Incorporation, ROC, LLPIN or Partnership Deed</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 bg-white rounded-[14px] border border-border/80 shadow-2xs">
                      <FileCheck className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs text-navy block font-bold">2. Company PAN Card</strong>
                        <span className="text-[11px] text-muted">10-digit PAN in corporate name (4th letter C/F/L)</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 bg-white rounded-[14px] border border-border/80 shadow-2xs">
                      <FileCheck className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs text-navy block font-bold">3. Current Bank Account Proof</strong>
                        <span className="text-[11px] text-muted">Cancelled cheque or bank statement showing account number & IFSC</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 bg-white rounded-[14px] border border-border/80 shadow-2xs">
                      <FileCheck className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs text-navy block font-bold">4. Registered Office Address Proof</strong>
                        <span className="text-[11px] text-muted">Utility bill, lease agreement, or property tax receipt matching Step 2</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3 p-3.5 bg-white rounded-[14px] border border-border/80 shadow-2xs">
                      <FileCheck className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs text-navy block font-bold">1. Personal PAN Card</strong>
                        <span className="text-[11px] text-muted">Individual PAN (4th letter P) for payout tax compliance</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 bg-white rounded-[14px] border border-border/80 shadow-2xs">
                      <FileCheck className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs text-navy block font-bold">2. Aadhaar eKYC Document</strong>
                        <span className="text-[11px] text-muted">Masked Aadhaar copy / XML pass with Verhoeff checksum</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 bg-white rounded-[14px] border border-border/80 shadow-2xs">
                      <FileCheck className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs text-navy block font-bold">3. Voter ID (EPIC) Card</strong>
                        <span className="text-[11px] text-muted">3 letters + 7 digits (confirms 18+ age eligibility)</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3.5 bg-white rounded-[14px] border border-border/80 shadow-2xs">
                      <FileCheck className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-xs text-navy block font-bold">4. Bank Account & Address Proof</strong>
                        <span className="text-[11px] text-muted">Cancelled cheque/passbook + address proof (or auto-satisfied via Aadhaar)</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Proceed Action Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-border">
              <p className="text-xs text-muted">
                You can switch between Company and Freelancer anytime from the top bar.
              </p>
              <Button
                size="lg"
                onClick={() => {
                  setShowWelcomeDocs(false)
                  localStorage.setItem(`beacon_seen_docs_${user?.email || 'default'}`, 'true')
                  saveProfileLocally(profile)
                  setActiveStep(1)
                }}
                className="w-full sm:w-auto bg-cyan hover:bg-cyan/90 text-navy font-black text-sm px-8 py-3.5 rounded-[14px] shadow-md gap-2 cursor-pointer"
              >
                Proceed to Step 1: Brand Info →
              </Button>
            </div>
          </Card>
        ) : (
          <>
            {/* ---------------- FULL-WIDTH HORIZONTAL STEP RAIL ---------------- */}
            <div className="w-full bg-surface border border-border rounded-[24px] p-4 sm:p-5 shadow-sm">
              {/* Connected Step Markers Row */}
              <div className="py-1 px-1">
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
                          onClick={() => handleNavigateToStep(step.id)}
                          className="flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer group shrink-0"
                          title={`${step.id}. ${step.title}`}
                        >
                          <div
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                              isActive
                                ? 'bg-cyan text-navy font-extrabold shadow-md rail-pulse ring-2 ring-cyan/40 scale-110 z-20'
                                : isCompleted
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-400 font-semibold z-10'
                                : 'bg-page border border-border text-muted/60 font-medium'
                            }`}
                          >
                            {isCompleted ? (
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            ) : (
                              <span>{step.id}</span>
                            )}
                          </div>
                          <span
                            className={`text-[11px] tracking-tight truncate max-w-[80px] sm:max-w-[100px] text-center transition-colors ${
                              isActive
                                ? 'text-navy font-black'
                                : isCompleted
                                ? 'text-navy/80 font-medium'
                                : 'text-muted/60 font-normal'
                            }`}
                          >
                            {step.shortTitle}
                          </span>
                        </button>

                        {/* Connector Line between markers */}
                        {idx < steps.length - 1 && (
                          <div className="flex-1 mx-2 h-0.5 self-center mb-5 rounded-full overflow-hidden bg-slate-200">
                            <div
                              className={`h-full transition-all duration-300 ${
                                isCompleted ? 'bg-emerald-400' : 'bg-transparent'
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

            {/* ---------------- ACTIVE STEP FORM CARDS ---------------- */}
            <AnimatePresence mode="wait">
              {/* ---------------- STEP 1: FIRM & BRAND INFORMATION ---------------- */}
              {activeStep === 1 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="pb-4 border-b border-border">
                    <h3 className="text-base font-bold text-navy flex items-center gap-2">
                      <User className="w-5 h-5 text-teal" /> 1. Firm & Brand Information
                    </h3>
                  </div>

                  {/* Brand Firm Photo / Logo Upload */}
                  <div>
                    <FileUploader
                      label="Brand Profile Photo / Firm Logo"
                      currentFileUrl={profile.avatarUrl}
                      onFileSelect={(_file, dataUrl) => {
                        if (dataUrl) {
                          setProfile((prev) => ({ ...prev, avatarUrl: dataUrl }))
                          triggerAutoSave('Firm Photo')
                        }
                      }}
                      onRemove={() => {
                        setProfile((prev) => ({ ...prev, avatarUrl: '' }))
                        triggerAutoSave('Firm Photo')
                      }}
                      helperText="Square logo or profile picture (PNG, JPG, SVG up to 10MB)"
                    />
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Public Brand / Display Name *"
                      placeholder="e.g. Beacon Luxury Expeditions or Alex Mountain Trails"
                      value={profile.displayName}
                      onChange={(e) => setProfile((prev) => ({ ...prev, displayName: e.target.value }))}
                      required
                    />

                    {profile.partnerType === 'FREELANCER' && (
                      <Input
                        label="Planner's Personal Name (Shown to Travelers) *"
                        placeholder="e.g. Alex Kumar"
                        value={profile.personalName || ''}
                        onChange={(e) => setProfile((prev) => ({ ...prev, personalName: e.target.value }))}
                        helperText="The human name travelers see when chatting or browsing your tours."
                        required
                      />
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Input
                          label="Primary Business Phone (10-Digit Mobile) *"
                          type="tel"
                          icon={<Phone className="w-4 h-4 text-teal" />}
                          placeholder="e.g. 9876543210"
                          value={profile.phone}
                          onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                        {profile.phone && !validateIndianMobile(profile.phone).isValid && (
                          <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3" /> {validateIndianMobile(profile.phone).message}
                          </p>
                        )}
                      </div>

                      <Input
                        label="Business Email *"
                        type="email"
                        icon={<Mail className="w-4 h-4 text-teal" />}
                        value={profile.email}
                        onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>

                    <Input
                      label="WhatsApp Support Line"
                      type="tel"
                      icon={<Phone className="w-4 h-4 text-teal" />}
                      placeholder="e.g. 9876543210"
                      value={profile.whatsappNumber}
                      onChange={(e) => setProfile((prev) => ({ ...prev, whatsappNumber: e.target.value }))}
                    />

                    {/* 3 Location Inputs with Country locked to India */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Input
                        label="Operating City *"
                        placeholder="e.g. Mumbai, Manali, Bengaluru"
                        value={profile.city || ''}
                        onChange={(e) => setProfile((prev) => ({ ...prev, city: e.target.value }))}
                        required
                      />
                      <Input
                        label="Operating State *"
                        placeholder="e.g. Maharashtra, Himachal Pradesh"
                        value={profile.state || ''}
                        onChange={(e) => setProfile((prev) => ({ ...prev, state: e.target.value }))}
                        required
                      />
                      <Input
                        label="Country *"
                        value="India"
                        disabled
                        helperText="Locked to India for this release"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-navy block mb-1.5">
                        Company Story / Professional Bio
                      </label>
                      <textarea
                        rows={3}
                        value={profile.bio}
                        onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell travelers what makes your itineraries special and why they should book with you..."
                        className="w-full p-3 rounded-[12px] border border-border bg-page text-xs text-navy focus:outline-none focus:ring-1 focus:ring-cyan"
                      />
                    </div>
                  </div>
                </Card>
              )}

              {/* ---------------- STEP 2: LEGAL & TAX IDENTITY (KYC GATE) ---------------- */}
              {activeStep === 2 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="pb-4 border-b border-border">
                    <h3 className="text-base font-bold text-navy flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-teal" /> 2. {profile.partnerType === 'COMPANY' ? 'Company Legal & Tax Identity' : 'Freelancer Identity & Legal'}
                    </h3>
                  </div>

                  {profile.partnerType === 'COMPANY' ? (
                    /* COMPANY LEGAL PATH */
                    <div className="space-y-4">
                      <Input
                        label="Registered Legal Company Name (as per ROC) *"
                        placeholder="e.g. Beacon Travel International Pvt Ltd"
                        value={profile.companyName}
                        onChange={(e) => setProfile((prev) => ({ ...prev, companyName: e.target.value }))}
                        helperText="Must match your Certificate of Incorporation."
                        required
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Input
                            label="Company PAN (10 Characters) *"
                            placeholder="e.g. AABCB1234F"
                            value={profile.panNumber}
                            onChange={(e) => setProfile((prev) => ({ ...prev, panNumber: e.target.value.toUpperCase() }))}
                            required
                          />
                          {profile.panNumber && !validatePAN(profile.panNumber, 'COMPANY').isValid && (
                            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3 h-3" /> {validatePAN(profile.panNumber, 'COMPANY').message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Input
                            label="CIN / LLPIN / Firm Registration No. *"
                            placeholder="e.g. U63040MH2020PTC345678 or AAA-1234"
                            value={profile.registrationNumber}
                            onChange={(e) => setProfile((prev) => ({ ...prev, registrationNumber: e.target.value.toUpperCase() }))}
                            required
                          />
                          {profile.registrationNumber && !validateCINorLLPIN(profile.registrationNumber).isValid && (
                            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3 h-3" /> {validateCINorLLPIN(profile.registrationNumber).message}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* GSTIN with Exemption Checkbox */}
                      <div className="p-4 bg-slate-50 border border-border rounded-[16px] space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold text-navy block">
                            GSTIN (Goods and Services Tax Number) *
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={profile.isGstExempt || false}
                              onChange={(e) => setProfile((prev) => ({ ...prev, isGstExempt: e.target.checked }))}
                              className="rounded border-border text-cyan focus:ring-cyan w-3.5 h-3.5"
                            />
                            <span className="text-xs text-muted font-medium">I am not GST-registered</span>
                          </label>
                        </div>

                        {profile.isGstExempt ? (
                          <Input
                            label="Reason for GST Exemption *"
                            placeholder="e.g. Turnover below ₹20 Lakhs statutory threshold"
                            value={profile.gstExemptionReason || ''}
                            onChange={(e) => setProfile((prev) => ({ ...prev, gstExemptionReason: e.target.value }))}
                            required
                          />
                        ) : (
                          <div>
                            <Input
                              placeholder="e.g. 27AABCB1234F1Z5"
                              value={profile.gstNumber}
                              onChange={(e) => setProfile((prev) => ({ ...prev, gstNumber: e.target.value.toUpperCase() }))}
                              helperText="Characters 3-12 must match entered PAN."
                              required
                            />
                            {profile.gstNumber && !validateGSTIN(profile.gstNumber, profile.panNumber).isValid && (
                              <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                                <AlertCircle className="w-3 h-3" /> {validateGSTIN(profile.gstNumber, profile.panNumber).message}
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <Input
                            label="Registered Office Address *"
                            placeholder="e.g. 4th Floor, Mittal Towers, Nariman Point, Mumbai"
                            value={profile.officeAddress}
                            onChange={(e) => setProfile((prev) => ({ ...prev, officeAddress: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Input
                            label="PIN Code *"
                            placeholder="e.g. 400001"
                            value={profile.pinCode || ''}
                            onChange={(e) => setProfile((prev) => ({ ...prev, pinCode: e.target.value }))}
                            required
                          />
                          {profile.pinCode && !validatePINCode(profile.pinCode).isValid && (
                            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3 h-3" /> {validatePINCode(profile.pinCode).message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Year of Establishment"
                          type="number"
                          value={profile.establishedYear?.toString() || ''}
                          onChange={(e) => setProfile((prev) => ({ ...prev, establishedYear: parseInt(e.target.value) || 2020 }))}
                        />
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-navy block">Company Team Size</label>
                          <select
                            value={profile.teamSize || '1-10 Employees'}
                            onChange={(e) => setProfile((prev) => ({ ...prev, teamSize: e.target.value }))}
                            className="w-full p-2.5 rounded-[12px] border border-border bg-page text-xs text-navy focus:outline-none focus:ring-1 focus:ring-cyan"
                          >
                            <option value="1-10 Employees">1-10 Employees</option>
                            <option value="11-50 Employees">11-50 Employees</option>
                            <option value="51-200 Employees">51-200 Employees</option>
                            <option value="200+ Employees">200+ Employees</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* FREELANCER LEGAL PATH */
                    <div className="space-y-4">
                      <Input
                        label="Full Legal Name (as per Govt ID) *"
                        placeholder="e.g. Aditya Vijay Kumar"
                        value={profile.legalName || profile.displayName}
                        onChange={(e) => setProfile((prev) => ({ ...prev, legalName: e.target.value }))}
                        required
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Input
                            label="Personal PAN Card Number *"
                            placeholder="e.g. ABCPK1234F"
                            value={profile.panNumber}
                            onChange={(e) => setProfile((prev) => ({ ...prev, panNumber: e.target.value.toUpperCase() }))}
                            helperText="4th character must be 'P' for Individual."
                            required
                          />
                          {profile.panNumber && !validatePAN(profile.panNumber, 'INDIVIDUAL').isValid && (
                            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3 h-3" /> {validatePAN(profile.panNumber, 'INDIVIDUAL').message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Input
                            label="Aadhaar Number (12-Digit + Verhoeff Checksum) *"
                            placeholder="e.g. 2345 6789 0123"
                            value={profile.aadhaarNumber || ''}
                            onChange={(e) => setProfile((prev) => ({ ...prev, aadhaarNumber: e.target.value }))}
                            helperText="Encrypted & masked. Verified via UIDAI Verhoeff checksum."
                            required
                          />
                          {profile.aadhaarNumber && !validateAadhaar(profile.aadhaarNumber).isValid && (
                            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3 h-3" /> {validateAadhaar(profile.aadhaarNumber).message}
                            </p>
                          )}
                          {profile.aadhaarNumber && validateAadhaar(profile.aadhaarNumber).isValid && (
                            <p className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-semibold">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Verhoeff Checksum Valid ({maskAadhaar(profile.aadhaarNumber)})
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Input
                            label="Voter ID (EPIC) Number *"
                            placeholder="e.g. ABC1234567"
                            value={profile.voterIdNumber || ''}
                            onChange={(e) => setProfile((prev) => ({ ...prev, voterIdNumber: e.target.value.toUpperCase() }))}
                            helperText="3 letters + 7 digits (confirms 18+ age eligibility)."
                            required
                          />
                          {profile.voterIdNumber && !validateVoterID(profile.voterIdNumber).isValid && (
                            <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                              <AlertCircle className="w-3 h-3" /> {validateVoterID(profile.voterIdNumber).message}
                            </p>
                          )}
                        </div>

                        <Input
                          label="Udyam (MSME) Registration"
                          placeholder="e.g. UDYAM-MH-01-0012345"
                          value={profile.udyamNumber || ''}
                          onChange={(e) => setProfile((prev) => ({ ...prev, udyamNumber: e.target.value.toUpperCase() }))}
                          helperText="Unlocks tourism scheme eligibility & adds trust badge."
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <Input
                            label="Residential / Operating Address *"
                            placeholder="e.g. Flat 402, Green Meadows, Bandra West, Mumbai"
                            value={profile.residentialAddress || ''}
                            onChange={(e) => setProfile((prev) => ({ ...prev, residentialAddress: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Input
                            label="PIN Code *"
                            placeholder="e.g. 400050"
                            value={profile.pinCode || ''}
                            onChange={(e) => setProfile((prev) => ({ ...prev, pinCode: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              )}

              {/* ---------------- STEP 3: BANKING & PAYOUTS ---------------- */}
              {activeStep === 3 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="pb-4 border-b border-border">
                    <h3 className="text-base font-bold text-navy flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-teal" /> 3. Banking & Payout Credentials
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <Input
                      label="Bank Account Beneficiary Name *"
                      placeholder="e.g. Beacon Travel International or Aditya Kumar"
                      value={profile.bankAccountName}
                      onChange={(e) => setProfile((prev) => ({ ...prev, bankAccountName: e.target.value }))}
                      helperText="Must match the legal name entered in Step 2."
                      required
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Input
                          label="Bank Account Number (9-18 Digits) *"
                          placeholder="e.g. 987654321098"
                          value={profile.bankAccountNumber}
                          onChange={(e) => setProfile((prev) => ({ ...prev, bankAccountNumber: e.target.value }))}
                          required
                        />
                        {profile.bankAccountNumber && !validateBankAccount(profile.bankAccountNumber).isValid && (
                          <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3" /> {validateBankAccount(profile.bankAccountNumber).message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Input
                          label="Bank IFSC Code *"
                          placeholder="e.g. HDFC0000123, SBIN0001234"
                          value={profile.ifscOrSwiftCode}
                          onChange={(e) => setProfile((prev) => ({ ...prev, ifscOrSwiftCode: e.target.value.toUpperCase() }))}
                          helperText="11 characters, 5th character is always 0."
                          required
                        />
                        {profile.ifscOrSwiftCode && !validateIFSC(profile.ifscOrSwiftCode).isValid && (
                          <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3" /> {validateIFSC(profile.ifscOrSwiftCode).message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Input
                          label="Primary UPI ID (handle@bank) *"
                          placeholder="e.g. beaconplanner@okaxis or 9876543210@paytm"
                          value={profile.upiOrPaypalId}
                          onChange={(e) => setProfile((prev) => ({ ...prev, upiOrPaypalId: e.target.value.toLowerCase() }))}
                          helperText="Primary payout rail for instant settlement."
                          required
                        />
                        {profile.upiOrPaypalId && !validateUPI(profile.upiOrPaypalId).isValid && (
                          <p className="text-[11px] text-rose-500 mt-1 flex items-center gap-1 font-medium">
                            <AlertCircle className="w-3 h-3" /> {validateUPI(profile.upiOrPaypalId).message}
                          </p>
                        )}
                      </div>

                      <Input
                        label="Settlement Currency"
                        value="INR (Indian Rupee ₹)"
                        disabled
                        helperText="Derived automatically from Indian Banking Rail"
                      />
                    </div>
                  </div>
                </Card>
              )}

              {/* ---------------- STEP 4: DOCUMENT VAULT & eKYC ---------------- */}
              {activeStep === 4 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <h3 className="text-base font-bold text-navy flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-teal" /> 4. Document Vault & eKYC Verification
                    </h3>
                    <Button
                      size="sm"
                      onClick={() => setShowUploadModal(true)}
                      className="bg-navy hover:bg-navy/90 text-white text-xs font-bold gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Lock className="w-3.5 h-3.5 text-cyan" /> + Add Other Document
                    </Button>
                  </div>

                  {/* Dynamic Document Verification Rows */}
                  <div className="space-y-3">
                    {(profile.partnerType === 'COMPANY' ? [
                      { key: 'company_registration', title: 'Certificate of Incorporation / ROC / LLPIN', category: 'Company Registration', desc: 'Certificate of Incorporation, LLP Agreement, or Partnership Deed', mandatory: true },
                      { key: 'company_pan', title: 'Company PAN Card Copy', category: 'Company PAN', desc: '10-character corporate PAN matching registered firm name', mandatory: true },
                      { key: 'bank_proof', title: 'Current Bank Account Proof', category: 'Bank Account Proof', desc: 'Cancelled cheque or bank statement showing account number & IFSC', mandatory: true },
                      { key: 'office_address_proof', title: 'Registered Office Address Proof', category: 'Address Proof', desc: 'Electricity bill, rent lease deed, or property tax receipt matching Step 2', mandatory: true },
                      { key: 'gst_certificate', title: 'GST Registration Certificate', category: 'GST Certificate', desc: 'Official GSTIN document (required if GST registered)', mandatory: !profile.isGstExempt },
                      { key: 'udyam_msme', title: 'MSME / Udyam Certificate', category: 'MSME Certificate', desc: 'Udyam registration document for MSME tourism benefits', mandatory: false },
                      { key: 'tourism_accreditation', title: 'Tourism Trade Body Accreditation', category: 'Tourism Accreditation', desc: 'MOT Approved, IATO, TAAI, ADTOI, or ATOAI membership proof', mandatory: false }
                    ] : [
                      { key: 'personal_pan', title: 'Personal PAN Card Copy', category: 'Personal PAN', desc: 'Individual PAN card (4th letter P) for payout tax compliance', mandatory: true },
                      { key: 'aadhaar_doc', title: 'Masked Aadhaar Card Proof', category: 'Aadhaar eKYC', desc: 'Masked Aadhaar copy / XML eKYC proof with Verhoeff checksum', mandatory: true },
                      { key: 'voter_id_doc', title: 'Voter ID (EPIC) Front & Back', category: 'Voter ID', desc: '3 letters + 7 digits (confirms 18+ adult age eligibility)', mandatory: true },
                      { key: 'bank_proof', title: 'Bank Account Proof / Cancelled Cheque', category: 'Bank Account Proof', desc: 'Cancelled cheque or passbook copy with account number & IFSC', mandatory: true },
                      { key: 'address_proof', title: 'Residential Address Proof Document', category: 'Address Proof', desc: 'Utility bill, rent agreement, or bank statement matching Step 2 address', mandatory: true },
                      { key: 'gst_certificate', title: 'GST Registration Certificate', category: 'GST Certificate', desc: 'Official GSTIN document (if GST registered)', mandatory: false },
                      { key: 'guide_cert', title: 'Mountaineering / Tour Guide License', category: 'Guide License', desc: 'NIM, HMI, Wilderness First Responder, or State Guide License', mandatory: false }
                    ]).map((req) => {
                      const uploaded = documents.find(d => 
                        d.id === req.key || 
                        d.title.toLowerCase() === req.title.toLowerCase() || 
                        d.documentType.toLowerCase() === req.category.toLowerCase()
                      )

                      return (
                        <div
                          key={req.key}
                          className={`p-4 rounded-[18px] border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                            uploaded
                              ? 'bg-white border-emerald-200/80 shadow-2xs'
                              : 'bg-page/60 border-border hover:border-cyan/40'
                          }`}
                        >
                          {/* LEFT: Name of document & details */}
                          <div className="flex items-start gap-3.5 min-w-0 flex-1">
                            <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 ${
                              uploaded
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                : 'bg-slate-200/70 text-slate-500'
                            }`}>
                              {uploaded ? <CheckCircle2 className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h5 className="text-sm font-bold text-navy truncate">{req.title}</h5>
                                {req.mandatory && (
                                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                                    Mandatory
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted mt-0.5">{req.desc}</p>
                              {uploaded && (
                                <p className="text-[11px] font-semibold text-emerald-600 mt-1 flex items-center gap-1">
                                  <span>✓ {uploaded.fileName}</span>
                                  <span className="text-muted/60">• Uploaded on {uploaded.uploadedAt}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          {/* RIGHT: Upload it to the right, and to its right View it */}
                          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                            <input
                              type="file"
                              id={`file-input-${req.key}`}
                              className="hidden"
                              accept=".pdf,.png,.jpg,.jpeg"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleInlineFileUpload(req.key, req.title, req.category, file)
                              }}
                            />

                            {/* UPLOAD ACTION (TO THE RIGHT) */}
                            <Button
                              size="sm"
                              variant={uploaded ? 'outline' : 'primary'}
                              onClick={() => document.getElementById(`file-input-${req.key}`)?.click()}
                              className={`font-bold text-xs px-4 py-2 rounded-[12px] gap-1.5 cursor-pointer shadow-xs ${
                                uploaded
                                  ? 'border-border text-navy hover:bg-slate-100'
                                  : 'bg-gradient-to-r from-teal to-cyan text-white hover:opacity-95'
                              }`}
                            >
                              <UploadCloud className="w-3.5 h-3.5" />
                              <span>{uploaded ? 'Replace' : 'Upload File'}</span>
                            </Button>

                            {/* VIEW ACTION (TO ITS RIGHT) */}
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={!uploaded}
                              onClick={() => {
                                if (uploaded) setPreviewDoc(uploaded)
                              }}
                              className={`font-bold text-xs px-4 py-2 rounded-[12px] gap-1.5 cursor-pointer shadow-xs ${
                                uploaded
                                  ? 'border-cyan/40 bg-cyan/10 text-navy hover:bg-cyan/20'
                                  : 'border-border/60 bg-slate-100/50 text-muted/40 cursor-not-allowed'
                              }`}
                            >
                              <Eye className="w-3.5 h-3.5 text-cyan" />
                              <span>View Document</span>
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Card>
              )}

              {/* ---------------- STEP 5: OPTIONAL PROFILE-COMPLETION TRACK ---------------- */}
              {activeStep === 5 && (
                <Card className="p-6 border border-border shadow-md space-y-6 rounded-[24px]">
                  <div className="pb-4 border-b border-border">
                    <h3 className="text-base font-bold text-navy flex items-center gap-2">
                      <Award className="w-5 h-5 text-teal" /> 5. Specializations & Public Profile
                    </h3>
                  </div>

                  <div className="space-y-5">
                    <MultiSelectChips
                      label="Countries Served"
                      options={COUNTRY_OPTIONS}
                      selected={profile.countriesServed}
                      onChange={(selected) => setProfile((prev) => ({ ...prev, countriesServed: selected }))}
                      placeholder="Search or add countries... (e.g. India, Nepal, Bhutan, Sri Lanka)"
                    />

                    <MultiSelectChips
                      label="Tour Specializations (Searchable Tags)"
                      options={SPECIALIZATION_OPTIONS}
                      selected={profile.specializations}
                      onChange={(selected) => setProfile((prev) => ({ ...prev, specializations: selected }))}
                      placeholder="Search or add specializations... (e.g. Trekking, Luxury Expeditions, Wildlife)"
                    />

                    <MultiSelectChips
                      label="Languages Spoken"
                      options={LANGUAGE_OPTIONS}
                      selected={profile.languages}
                      onChange={(selected) => setProfile((prev) => ({ ...prev, languages: selected }))}
                      placeholder="Search or add languages... (e.g. English, Hindi, Marathi, French)"
                    />

                    <MultiSelectChips
                      label="Certifications & Safety Training"
                      options={CERTIFICATION_OPTIONS}
                      selected={profile.certifications || []}
                      onChange={(selected) => setProfile((prev) => ({ ...prev, certifications: selected }))}
                      placeholder="e.g. NIM Basic Mountaineering (BMC), First Aid & CPR"
                    />

                    <MultiSelectChips
                      label="India Trade-Body Accreditations"
                      options={INDIA_ACCREDITATION_OPTIONS}
                      selected={profile.indiaAccreditations || []}
                      onChange={(selected) => setProfile((prev) => ({ ...prev, indiaAccreditations: selected }))}
                      placeholder="e.g. Ministry of Tourism (MOT) Approved, IATO, ATOAI"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Years in Tourism Industry"
                        type="number"
                        value={profile.yearsExperience?.toString() || '2'}
                        onChange={(e) => setProfile((prev) => ({ ...prev, yearsExperience: parseInt(e.target.value) || 1 }))}
                      />
                      <Input
                        label="In Your Own Words: Why Should a Traveler Book With You? (150-200 chars)"
                        value={profile.whyChooseMe || ''}
                        placeholder="e.g. 10+ years organizing Himalayan treks, 24/7 dedicated support, customized luxury plans"
                        onChange={(e) => setProfile((prev) => ({ ...prev, whyChooseMe: e.target.value }))}
                      />
                    </div>
                  </div>
                </Card>
              )}
            </AnimatePresence>

            {/* ---------------- BOTTOM STEP NAVIGATION BAR ---------------- */}
            <div className="sticky bottom-4 z-30 bg-surface/95 backdrop-blur-md border border-border rounded-[20px] p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                type="button"
                variant="outline"
                size="md"
                disabled={activeStep === 1}
                onClick={() => {
                  if (activeStep > 1) {
                    setActiveStep(prev => prev - 1)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
                className={`w-full sm:w-auto font-bold text-xs px-5 py-2.5 rounded-[12px] cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeStep === 1 ? 'opacity-40 cursor-not-allowed text-muted' : 'border-border text-navy hover:bg-page'
                }`}
              >
                <span className="text-sm">←</span>
                <span>Previous Step</span>
              </Button>

              <div className="flex items-center gap-2 text-xs text-muted">
                <span>Step <strong className="text-navy">{activeStep}</strong> of {steps.length}</span>
                <span>•</span>
                <span className="font-semibold text-teal">{steps[activeStep - 1]?.title}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                {activeStep === 4 ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={() => {
                        triggerAutoSave(steps[activeStep - 1]?.title)
                        setActiveStep(5)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className="font-bold text-xs px-4 py-2.5 rounded-[12px] border-border text-navy hover:bg-slate-100 cursor-pointer shadow-xs"
                    >
                      <span>Skip to Profile Track</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="md"
                      onClick={() => {
                        triggerAutoSave(steps[activeStep - 1]?.title)
                        setShowVerificationPreviewModal(true)
                      }}
                      className="bg-gradient-to-r from-teal to-cyan text-white font-extrabold text-xs px-6 py-2.5 rounded-[12px] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Save & Send for Verification</span>
                    </Button>
                  </>
                ) : activeStep === 5 ? (
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={() => {
                      triggerAutoSave(steps[activeStep - 1]?.title)
                      setShowVerificationPreviewModal(true)
                    }}
                    className="w-full sm:w-auto bg-gradient-to-r from-teal via-cyan to-navy text-white font-extrabold text-xs px-6 py-2.5 rounded-[12px] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Save & Send for Verification</span>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    onClick={handleNextStep}
                    className="w-full sm:w-auto bg-gradient-to-r from-teal to-cyan text-white font-extrabold text-xs px-6 py-2.5 rounded-[12px] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Save & Next Step</span>
                    <span className="text-sm font-bold">→</span>
                  </Button>
                )}
              </div>
            </div>
          </>
        )}
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
                <h3 className="font-bold text-navy text-base flex items-center gap-2">
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
                  label="Document Description / Title *"
                  placeholder="e.g. Certificate of Incorporation, PAN Card Copy"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  required
                />

                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy block">Document Category *</label>
                  <select
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value)}
                    className="w-full p-2.5 rounded-[12px] border border-border bg-page text-xs text-navy"
                  >
                    <option value="Company Registration / ROC">Company Registration / ROC / LLPIN</option>
                    <option value="PAN Card Copy">Company or Personal PAN Card Copy</option>
                    <option value="Aadhaar eKYC Document">Masked Aadhaar Card Document</option>
                    <option value="Voter ID (EPIC)">Voter ID (EPIC) Front & Back</option>
                    <option value="Bank Account Proof">Cancelled Cheque / Bank Statement / Passbook</option>
                    <option value="Address Proof">Registered Office / Residential Address Proof</option>
                    <option value="GST Certificate">GST Registration Certificate</option>
                    <option value="Tourism Accreditation">Tourism Accreditation (MOT / IATO / ATOAI)</option>
                  </select>
                </div>

                <FileUploader
                  label="Attach Document File *"
                  onFileSelect={(file, dataUrl) => {
                    setSelectedUploadFile(file)
                    if (dataUrl) setSelectedUploadDataUrl(dataUrl)
                  }}
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

        {/* DOCUMENT PREVIEW MODAL */}
        {previewDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewDoc(null)}
              className="absolute inset-0 bg-navy/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-surface border border-border rounded-[24px] p-6 shadow-2xl space-y-4 z-10 max-h-[92vh] flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-border pb-3 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan/15 text-cyan flex items-center justify-center font-bold">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm sm:text-base leading-tight">{previewDoc.title}</h3>
                    <p className="text-[11px] text-muted">{previewDoc.fileName} {previewDoc.uploadedAt && `• Uploaded ${previewDoc.uploadedAt}`}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewDoc(null)}
                  className="text-muted hover:text-navy cursor-pointer p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview Content Area with full PDF iframe & Image Support */}
              <div className="flex-1 overflow-auto rounded-[16px] bg-slate-100/70 border border-border p-2 sm:p-4 flex items-center justify-center min-h-[420px]">
                {previewDoc.fileDataUrl && (previewDoc.fileDataUrl.startsWith('data:image/') || /\.(png|jpg|jpeg|webp|svg)$/i.test(previewDoc.fileName)) ? (
                  <img
                    src={previewDoc.fileDataUrl}
                    alt={previewDoc.title}
                    className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-md"
                  />
                ) : previewDoc.fileDataUrl && (previewDoc.fileDataUrl.startsWith('data:application/pdf') || /\.pdf$/i.test(previewDoc.fileName)) ? (
                  <iframe
                    src={previewDoc.fileDataUrl}
                    title={previewDoc.title}
                    className="w-full h-[65vh] rounded-lg border border-border bg-white shadow-xs"
                  />
                ) : (
                  <div className="text-center space-y-3 p-8">
                    <div className="w-16 h-16 rounded-2xl bg-teal/10 text-teal flex items-center justify-center mx-auto shadow-inner">
                      <FileText className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-navy text-sm">{previewDoc.fileName}</h4>
                      <p className="text-xs text-muted max-w-sm mx-auto">
                        Official document securely encrypted in your verification vault.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-300 px-3 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Status: Verified & Encrypted
                    </span>
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPreviewDoc(null)}
                  className="text-xs font-bold px-4 py-2"
                >
                  Close Preview
                </Button>

                <div className="flex items-center gap-2">
                  {previewDoc.fileDataUrl && (
                    <a
                      href={previewDoc.fileDataUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-navy text-xs font-bold px-3.5 py-2 rounded-[12px] border border-border transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-teal" />
                      Open in New Tab
                    </a>
                  )}

                  {previewDoc.fileDataUrl && (
                    <a
                      href={previewDoc.fileDataUrl}
                      download={previewDoc.fileName || 'document.pdf'}
                      className="inline-flex items-center gap-1.5 bg-navy hover:bg-navy/90 text-white text-xs font-bold px-4 py-2 rounded-[12px] shadow-sm transition-all"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan" />
                      Download File
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* WHOLE PROFILE PREVIEW & MASTER VERIFICATION SUBMISSION MODAL */}
        {showVerificationPreviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowVerificationPreviewModal(false)}
              className="fixed inset-0 bg-navy/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative w-full max-w-4xl bg-surface border border-border rounded-[24px] p-6 sm:p-8 shadow-2xl space-y-6 z-10 max-h-[90vh] flex flex-col my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-border pb-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal/15 text-teal flex items-center justify-center font-bold">
                    <ShieldCheck className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-navy text-base sm:text-lg">
                        Application Verification Preview
                      </h3>
                      <span className="text-[10px] font-bold text-teal bg-teal/10 border border-teal/30 px-2.5 py-0.5 rounded-full">
                        Ready for Master Review
                      </span>
                    </div>
                    <p className="text-xs text-muted mt-0.5">
                      Review all your KYC details before sending to Beacon Master Admin for verification.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowVerificationPreviewModal(false)}
                  className="text-muted hover:text-navy cursor-pointer p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Preview Content */}
              <div className="flex-1 overflow-y-auto space-y-5 pr-1">
                
                {/* 1. Entity & Brand Identity */}
                <div className="bg-slate-50 border border-border rounded-[18px] p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-border/70 pb-2">
                    <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider flex items-center gap-2">
                      <User className="w-4 h-4 text-teal" /> 1. Firm & Brand Information
                    </h4>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-navy text-white">
                      {profile.partnerType === 'COMPANY' ? 'Travel Company / Firm' : 'Individual Freelance Planner'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-muted block text-[11px]">Brand / Display Name</span>
                      <strong className="text-navy font-bold">{profile.displayName || '—'}</strong>
                    </div>
                    {profile.partnerType === 'FREELANCER' && (
                      <div>
                        <span className="text-muted block text-[11px]">Planner Personal Name</span>
                        <strong className="text-navy font-bold">{profile.personalName || '—'}</strong>
                      </div>
                    )}
                    <div>
                      <span className="text-muted block text-[11px]">Primary Mobile</span>
                      <strong className="text-navy font-bold">{profile.phone || '—'}</strong>
                    </div>
                    <div>
                      <span className="text-muted block text-[11px]">Business Email</span>
                      <strong className="text-navy font-bold">{profile.email || user?.email || '—'}</strong>
                    </div>
                    <div>
                      <span className="text-muted block text-[11px]">Operating Location</span>
                      <strong className="text-navy font-bold">{profile.city ? `${profile.city}, ${profile.state || 'India'}` : 'India'}</strong>
                    </div>
                    <div>
                      <span className="text-muted block text-[11px]">WhatsApp Support</span>
                      <strong className="text-navy font-bold">{profile.whatsapp || '—'}</strong>
                    </div>
                  </div>
                </div>

                {/* 2. Legal & Tax Identity Credentials */}
                <div className="bg-slate-50 border border-border rounded-[18px] p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-border/70 pb-2">
                    <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-teal" /> 2. Legal & Tax Credentials (KYC Gate)
                    </h4>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      Validated Format
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-muted block text-[11px]">Legal Registered Name</span>
                      <strong className="text-navy font-bold">{profile.legalName || profile.displayName || '—'}</strong>
                    </div>
                    <div>
                      <span className="text-muted block text-[11px]">PAN Card Number</span>
                      <strong className="text-navy font-mono font-bold tracking-wider">{profile.panNumber || '—'}</strong>
                    </div>
                    {profile.partnerType === 'COMPANY' ? (
                      <>
                        <div>
                          <span className="text-muted block text-[11px]">CIN / LLPIN / Reg. Number</span>
                          <strong className="text-navy font-mono font-bold">{profile.cinOrLlpin || '—'}</strong>
                        </div>
                        <div>
                          <span className="text-muted block text-[11px]">GSTIN Status</span>
                          <strong className="text-navy font-mono font-bold">
                            {profile.isGstExempt ? 'Exempt (Turnover < ₹20L)' : profile.gstin || 'Not Provided'}
                          </strong>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <span className="text-muted block text-[11px]">Aadhaar eKYC (Masked)</span>
                          <strong className="text-navy font-mono font-bold">
                            {profile.aadhaarNumber ? maskAadhaar(profile.aadhaarNumber) : '—'}
                          </strong>
                        </div>
                        <div>
                          <span className="text-muted block text-[11px]">Voter ID (EPIC) Number</span>
                          <strong className="text-navy font-mono font-bold">{profile.voterIdNumber || '—'}</strong>
                        </div>
                      </>
                    )}
                    <div className="sm:col-span-2">
                      <span className="text-muted block text-[11px]">Operating Address & PIN</span>
                      <strong className="text-navy font-medium">
                        {profile.registeredOfficeAddress || profile.address || '—'} {profile.pinCode ? `(PIN: ${profile.pinCode})` : ''}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* 3. Banking & Settlement Rail */}
                <div className="bg-slate-50 border border-border rounded-[18px] p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-border/70 pb-2">
                    <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-teal" /> 3. Banking & Payout Settlement
                    </h4>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan/10 text-navy border border-cyan/30">
                      INR Rail (₹)
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div>
                      <span className="text-muted block text-[11px]">Beneficiary Name</span>
                      <strong className="text-navy font-bold">{profile.bankAccountName || '—'}</strong>
                    </div>
                    <div>
                      <span className="text-muted block text-[11px]">Account Number</span>
                      <strong className="text-navy font-mono font-bold">
                        {profile.bankAccountNumber ? `••••${profile.bankAccountNumber.slice(-4)}` : '—'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-muted block text-[11px]">Bank IFSC Code</span>
                      <strong className="text-navy font-mono font-bold">{profile.ifscOrSwiftCode || '—'}</strong>
                    </div>
                    <div>
                      <span className="text-muted block text-[11px]">Primary UPI ID</span>
                      <strong className="text-navy font-bold text-teal">{profile.upiOrPaypalId || '—'}</strong>
                    </div>
                  </div>
                </div>

                {/* 4. Uploaded Verification Documents */}
                <div className="bg-slate-50 border border-border rounded-[18px] p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between border-b border-border/70 pb-2">
                    <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-teal" /> 4. Attached Verification Documents ({documents.length})
                    </h4>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Encrypted Vault
                    </span>
                  </div>
                  {documents.length === 0 ? (
                    <p className="text-xs text-amber-700 font-medium">⚠️ No verification files attached yet. You can attach proofs in Step 4.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {documents.map((doc) => (
                        <div key={doc.id} className="p-2.5 bg-white border border-border rounded-[14px] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <FileCheck className="w-4 h-4 text-teal shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-navy truncate">{doc.title}</p>
                              <p className="text-[10px] text-muted truncate">{doc.fileName}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0 border border-emerald-200">
                            ✓ Attached
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 5. Specializations & Bio Preview */}
                {(profile.specializations?.length || profile.languages?.length || profile.whyChooseMe) && (
                  <div className="bg-slate-50 border border-border rounded-[18px] p-4 sm:p-5 space-y-3">
                    <h4 className="text-xs font-extrabold text-navy uppercase tracking-wider flex items-center gap-2 border-b border-border/70 pb-2">
                      <Award className="w-4 h-4 text-teal" /> 5. Specializations & Public Profile
                    </h4>
                    <div className="space-y-2 text-xs">
                      {profile.specializations?.length > 0 && (
                        <div>
                          <span className="text-muted block text-[11px] mb-1">Tour Specializations:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {profile.specializations.map((s: string) => (
                              <span key={s} className="px-2.5 py-0.5 bg-white border border-border rounded-full text-navy font-semibold text-[11px]">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {profile.whyChooseMe && (
                        <div className="pt-1">
                          <span className="text-muted block text-[11px]">Why Travelers Choose Me:</span>
                          <p className="text-navy font-medium italic mt-0.5 text-xs bg-white p-2.5 rounded-[12px] border border-border">
                            "{profile.whyChooseMe}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* TWO BOTTOM OPTIONS: 1) Back & Edit  2) Send for Verification */}
              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-border shrink-0">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setShowVerificationPreviewModal(false)}
                  className="w-full sm:w-auto font-bold text-xs px-6 py-2.5 rounded-[12px] border-border text-navy hover:bg-slate-100 cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4 text-muted" />
                  <span>Back & Edit</span>
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  disabled={submittingToMaster}
                  onClick={handleSendToMaster}
                  className="w-full sm:w-auto bg-gradient-to-r from-teal via-cyan to-navy text-white font-extrabold text-xs px-7 py-2.5 rounded-[12px] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {submittingToMaster ? (
                    <span>Submitting to Master Admin...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send for Verification</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
