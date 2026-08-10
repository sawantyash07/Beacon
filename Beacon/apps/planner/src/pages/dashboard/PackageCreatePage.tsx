import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, X, Save, Send,
  Check, Building2, Mountain, Tent, Compass,
  Car, Shield, Heart, Users, MapPin, Calendar, DollarSign, Image as ImageIcon,
  FileText, CheckCircle2, AlertTriangle, Eye, Layers, Clock, Award,
  Sparkles, ChevronRight, RefreshCw
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatCurrency, cn } from '@/lib/utils'
import { toast } from 'sonner'
import { createPackage } from '@/services/api'
import { addMockPackage } from '@/data/mockData'

// ----------------------------------------------------------------------
// 1. PACKAGE EXPERIENCE TYPES CONFIGURATION
// ----------------------------------------------------------------------
export interface ExperienceType {
  id: string
  name: string
  icon: any
  tagline: string
  description: string
  badgeColor: string
  accentColor: string
  allowedModules: string[]
}

export const EXPERIENCE_TYPES: ExperienceType[] = [
  {
    id: 'tour',
    name: 'Tour / Holiday',
    icon: Compass,
    tagline: 'Sightseeing, Hotels & Comfort Travel',
    description: 'Leisure tours, family vacations, resort getaways, and guided sightseeing trips.',
    badgeColor: 'bg-cyan/15 text-cyan border-cyan/30',
    accentColor: '#06B6D4',
    allowedModules: ['basic', 'locations', 'accommodation', 'batches', 'pricing', 'itinerary', 'inclusions', 'media', 'policies']
  },
  {
    id: 'trekking',
    name: 'Trekking & Hiking',
    icon: Mountain,
    tagline: 'Mountain Trails, Summits & Pass Crossings',
    description: 'High-altitude treks, trail hikes, summit climbs, and wilderness expeditions.',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    accentColor: '#10B981',
    allowedModules: ['basic', 'trekking_spec', 'locations', 'accommodation', 'batches', 'pricing', 'itinerary', 'inclusions', 'media', 'policies']
  },
  {
    id: 'camping',
    name: 'Camping & Outdoors',
    icon: Tent,
    tagline: 'Night Skies, Tents & Bonfires',
    description: 'Lakeside camping, stargazing, forest stays, and campfire outdoor experiences.',
    badgeColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    accentColor: '#F59E0B',
    allowedModules: ['basic', 'camping_spec', 'locations', 'accommodation', 'batches', 'pricing', 'itinerary', 'inclusions', 'media', 'policies']
  },
  {
    id: 'adventure',
    name: 'Adventure Experience',
    icon: Shield,
    tagline: 'Extreme Sports, Rafting & Paragliding',
    description: 'Thrill-seeking activities including river rafting, scuba, ziplining, and bungee.',
    badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    accentColor: '#8B5CF6',
    allowedModules: ['basic', 'adventure_spec', 'locations', 'batches', 'pricing', 'itinerary', 'inclusions', 'media', 'policies']
  },
  {
    id: 'roadtrip',
    name: 'Road Trip & Bike Tour',
    icon: Car,
    tagline: 'Scenic Highways, Expeditions & Rides',
    description: 'Self-drive, motorcycle tours, caravan trips, and coastal highway drives.',
    badgeColor: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    accentColor: '#6366F1',
    allowedModules: ['basic', 'roadtrip_spec', 'locations', 'batches', 'pricing', 'itinerary', 'inclusions', 'media', 'policies']
  },
  {
    id: 'backpacking',
    name: 'Backpacking Trip',
    icon: Users,
    tagline: 'Budget Travel, Hostels & Social Journeys',
    description: 'Youth group trips, hostel hops, local bus/train transit, and budget explorations.',
    badgeColor: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
    accentColor: '#14B8A6',
    allowedModules: ['basic', 'locations', 'accommodation', 'batches', 'pricing', 'itinerary', 'inclusions', 'media', 'policies']
  },
  {
    id: 'spiritual',
    name: 'Spiritual / Pilgrimage',
    icon: Heart,
    tagline: 'Sacred Temples, Yatra & Wellness',
    description: 'Temple circuits, Char Dham, retreat meditation, and cultural heritage journeys.',
    badgeColor: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    accentColor: '#F97316',
    allowedModules: ['basic', 'locations', 'accommodation', 'batches', 'pricing', 'itinerary', 'inclusions', 'media', 'policies']
  },
  {
    id: 'custom',
    name: 'Custom / Other Experience',
    icon: Sparkles,
    tagline: 'Tailor-Made Unique Travel',
    description: 'Bespoke corporate retreats, weddings, photo tours, or specialized itineraries.',
    badgeColor: 'bg-pink-500/15 text-pink-400 border-pink-500/30',
    accentColor: '#EC4899',
    allowedModules: ['basic', 'locations', 'accommodation', 'batches', 'pricing', 'itinerary', 'inclusions', 'media', 'policies']
  }
]

// ----------------------------------------------------------------------
// 2. DATA MODELS & INTERFACES
// ----------------------------------------------------------------------
export interface DayItinerary {
  day: number
  title: string
  activities: string
  meals: string[]
  hotelName?: string
  hotelAddress?: string
  lat?: number
  lng?: number
  photoUrl?: string
}

export interface FixedBatch {
  id: string
  startDate: string
  endDate: string
  totalSeats: number
  availableSeats: number
  price: number
  status: 'OPEN' | 'FILLING_FAST' | 'SOLD_OUT'
}

export interface PackageFormData {
  packageType: string
  title: string
  subtitle: string
  category: string
  difficulty: 'EASY' | 'MODERATE' | 'HARD' | 'EXPERT'
  bestSeasons: string[]
  days: number
  nights: number
  description: string

  // Trekking Specs
  maxAltitudeFt?: number
  trekDistanceKm?: number
  baseVillage?: string
  trailheadName?: string
  summitName?: string
  routeType?: 'Loop' | 'Out-and-back' | 'Point-to-point'
  equipmentProvided?: string
  equipmentRequired?: string
  safetyInfo?: string
  trekLeaderRatio?: string
  packingChecklist?: string

  // Camping Specs
  campsiteName?: string
  tentTypes?: string
  campFacilities?: string
  campfireDetails?: string

  // Road Trip Specs
  vehicleType?: string
  roadTripRoute?: string
  pitstops?: string
  fuelTollIncluded?: boolean

  // Adventure Specs
  adventureGear?: string
  minAgeRequired?: number
  fitnessLevelInfo?: string

  // Locations & Pickup
  startLocation: string
  destination: string
  pickupIncluded: boolean
  pickupDetails: string

  // Accommodation
  accommodationIncluded: boolean
  hotelDetails: string
  roomTypes: string

  // Dates & Batches
  fixedBatchesEnabled: boolean
  batches: FixedBatch[]

  // Pricing & Occupancy
  basePrice: number
  discount: number
  singleSharingPrice?: number
  doubleSharingPrice?: number
  tripleSharingPrice?: number
  taxPercent: number
  advanceDepositPercent: number

  // Itinerary
  itineraryDays: DayItinerary[]

  // Inclusions / Exclusions
  inclusions: string[]
  exclusions: string[]

  // Policies
  cancellationPolicy: string
  reschedulingPolicy: string
  requiredDocuments: string

  // Media
  coverImage: string
  galleryImages: string[]
  videoUrl: string

  status: 'DRAFT' | 'SUBMITTED' | 'UNDER_REVIEW' | 'APPROVED' | 'PUBLISHED'
}

const INITIAL_FORM_DATA: PackageFormData = {
  packageType: 'tour',
  title: '',
  subtitle: '',
  category: 'Leisure & Adventure',
  difficulty: 'MODERATE',
  bestSeasons: ['Spring', 'Autumn'],
  days: 5,
  nights: 4,
  description: '',

  maxAltitudeFt: 12500,
  trekDistanceKm: 34,
  baseVillage: 'Sankri Village',
  trailheadName: 'Sankri Trailhead',
  summitName: 'Kedarkantha Peak (12,500 ft)',
  routeType: 'Loop',
  equipmentProvided: 'Tents, Sleeping Bags, Crampons, Trekking Poles',
  equipmentRequired: 'Thermal Wear, Waterproof Trekking Shoes, Rucksack (50L)',
  safetyInfo: 'Oxygen Cylinders, First Aid Kit, Satellite Comm & Certified Leads',
  trekLeaderRatio: '1 Guide per 6 Trekkers',
  packingChecklist: 'Trekking shoes, Warm jacket, Headlamp, Personal meds, Water bottle',

  campsiteName: 'Pawna Lake Wilderness Camp',
  tentTypes: 'Dome Tents & Swiss Safari Tents',
  campFacilities: 'Clean Washrooms, Electricity, Charging Points, Music & Games',
  campfireDetails: 'Evening Bonfire with Live Music & Unlimited BBQ',

  vehicleType: 'SUV / Royal Enfield 500cc',
  roadTripRoute: 'Manali -> Rohtang Pass -> Keylong -> Jispa -> Sarchu -> Leh',
  pitstops: 'Solang Valley, Deepak Tal, Baralacha La, Tanglang La',
  fuelTollIncluded: true,

  adventureGear: 'Helmet, Life Jacket, Safety Harness, Carabiners',
  minAgeRequired: 14,
  fitnessLevelInfo: 'Basic physical fitness; able to swim 50 meters',

  startLocation: 'Dehradun, Uttarakhand',
  destination: 'Kedarkantha, Uttarakhand',
  pickupIncluded: true,
  pickupDetails: 'Pickup available from Dehradun Railway Station at 6:00 AM',

  accommodationIncluded: true,
  hotelDetails: '3-Star Deluxe Hotels / Mountain Guesthouses',
  roomTypes: 'Double Sharing & Triple Sharing',

  fixedBatchesEnabled: true,
  batches: [
    {
      id: 'batch-1',
      startDate: '2026-09-10',
      endDate: '2026-09-15',
      totalSeats: 15,
      availableSeats: 6,
      price: 14999,
      status: 'FILLING_FAST'
    },
    {
      id: 'batch-2',
      startDate: '2026-09-24',
      endDate: '2026-09-29',
      totalSeats: 15,
      availableSeats: 12,
      price: 14999,
      status: 'OPEN'
    }
  ],

  basePrice: 14999,
  discount: 10,
  singleSharingPrice: 18999,
  doubleSharingPrice: 14999,
  tripleSharingPrice: 12999,
  taxPercent: 5,
  advanceDepositPercent: 30,

  itineraryDays: [
    {
      day: 1,
      title: 'Arrival & Scenic Drive to Base Camp',
      activities: 'Pickup from Dehradun, drive along Yamuna valley to Sankri village. Briefing & dinner.',
      meals: ['Dinner'],
      hotelName: 'Sankri Alpine Lodge',
      hotelAddress: 'Sankri Village, Uttarkashi, Uttarakhand',
      lat: 31.0772,
      lng: 78.1818
    },
    {
      day: 2,
      title: 'Trek from Base Village to Juda Ka Talab',
      activities: 'Trek through pine & oak forests. Reach frozen lake camp Juda Ka Talab by afternoon.',
      meals: ['Breakfast', 'Lunch', 'Dinner'],
      hotelName: 'Juda Ka Talab Campsite',
      hotelAddress: 'Juda Ka Talab, Uttarakhand',
      lat: 31.0850,
      lng: 78.1920
    }
  ],

  inclusions: [
    'Accommodation during the trip',
    'All meals (Breakfast, Lunch, Dinner)',
    'Certified Trek Leader & Support Staff',
    'Forest Permits & Camping Charges',
    'First Aid & Emergency Support'
  ],
  exclusions: [
    'Personal Expenses & Backpack Offloading',
    'Travel Insurance',
    'Transit Meals before Pickup Point'
  ],

  cancellationPolicy: 'Full refund up to 15 days before departure. 50% refund 7-14 days prior.',
  reschedulingPolicy: 'Free rescheduling allowed up to 7 days before departure.',
  requiredDocuments: 'Government Issued Photo ID (Aadhaar / Passport) & Medical Fitness Certificate',

  coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
  galleryImages: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80'
  ],
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',

  status: 'DRAFT'
}

// ----------------------------------------------------------------------
// 3. MAIN COMPONENT DEFINITION
// ----------------------------------------------------------------------
export default function PackageCreatePage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<PackageFormData>(() => {
    const saved = localStorage.getItem('beacon_package_draft')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse draft', e)
      }
    }
    return INITIAL_FORM_DATA
  })

  const [activeStepIndex, setActiveStepIndex] = useState<number>(0)
  const [isChoosingType, setIsChoosingType] = useState<boolean>(!formData.packageType)
  const [draftSavedAt, setDraftSavedAt] = useState<string>('')
  const [isAutosaving, setIsAutosaving] = useState<boolean>(false)
  const [activeTabPreview, setActiveTabPreview] = useState<'editor' | 'preview'>('editor')

  const currentTypeConfig = EXPERIENCE_TYPES.find(t => t.id === formData.packageType) || EXPERIENCE_TYPES[0]

  const steps = [
    { id: 'type', name: '1. Experience Type', icon: Layers, required: true },
    { id: 'basic', name: '2. Basic Info & Attributes', icon: Compass, required: true },
    { id: 'locations', name: '3. Locations & Pickup', icon: MapPin, required: true },
    ...(formData.accommodationIncluded ? [{ id: 'accommodation', name: '4. Accommodation & Stays', icon: Building2, required: false }] : []),
    ...(formData.fixedBatchesEnabled ? [{ id: 'batches', name: '5. Fixed Batches & Seats', icon: Calendar, required: false }] : []),
    { id: 'pricing', name: '6. Pricing & Occupancy', icon: DollarSign, required: true },
    { id: 'itinerary', name: '7. Day-wise Itinerary', icon: Clock, required: true },
    { id: 'inclusions', name: '8. Inclusions & Exclusions', icon: CheckCircle2, required: true },
    { id: 'media', name: '9. Media & Photos', icon: ImageIcon, required: true },
    { id: 'preview', name: '10. Preview & Readiness', icon: Eye, required: true }
  ]

  useEffect(() => {
    const targetDays = formData.days || 1
    if (formData.itineraryDays.length !== targetDays) {
      const current = [...formData.itineraryDays]
      if (current.length < targetDays) {
        for (let d = current.length + 1; d <= targetDays; d++) {
          current.push({
            day: d,
            title: `Day ${d} Experience`,
            activities: 'Day itinerary activities and details...',
            meals: ['Breakfast', 'Dinner'],
            hotelName: formData.accommodationIncluded ? 'Alpine View Resort' : undefined,
            hotelAddress: formData.destination || 'Destination Location',
            lat: 31.0772,
            lng: 78.1818
          })
        }
      } else {
        current.length = targetDays
      }
      setFormData(prev => ({ ...prev, itineraryDays: current }))
    }
  }, [formData.days, formData.accommodationIncluded, formData.destination])

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAutosaving(true)
      localStorage.setItem('beacon_package_draft', JSON.stringify(formData))
      setTimeout(() => {
        setIsAutosaving(false)
        setDraftSavedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
      }, 400)
    }, 5000)
    return () => clearInterval(timer)
  }, [formData])

  const handleSaveDraft = () => {
    localStorage.setItem('beacon_package_draft', JSON.stringify(formData))
    toast.success('Draft saved successfully to browser storage!')
    setDraftSavedAt(new Date().toLocaleTimeString())
  }

  const handleUpdateForm = (field: keyof PackageFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateReadiness = () => {
    let passed = 0
    let total = 7

    if (formData.title.trim().length > 3) passed++
    if (formData.destination.trim().length > 2) passed++
    if (formData.days >= 1) passed++
    if (formData.basePrice > 0) passed++
    if (formData.itineraryDays.length >= formData.days && formData.itineraryDays.every(d => d.title)) passed++
    if (formData.coverImage.trim().length > 5) passed++
    if (formData.inclusions.length > 0) passed++

    return Math.round((passed / total) * 100)
  }

  const readinessScore = calculateReadiness()

  const handleSelectExperienceType = (typeId: string) => {
    setFormData(prev => ({ ...prev, packageType: typeId }))
    setIsChoosingType(false)
    toast.success(`Selected Experience Type: ${EXPERIENCE_TYPES.find(t => t.id === typeId)?.name}`)
  }

  const handleSubmitPackage = async (finalStatus: 'DRAFT' | 'SUBMITTED') => {
    if (readinessScore < 70 && finalStatus === 'SUBMITTED') {
      toast.error('Package is incomplete! Please complete all required sections before submitting.')
      return
    }

    try {
      const payload = {
        ...formData,
        status: finalStatus
      }
      addMockPackage(payload as any)
      await createPackage(payload).catch(() => {})
      toast.success(finalStatus === 'SUBMITTED' ? 'Package submitted for review!' : 'Draft saved successfully!')
      localStorage.removeItem('beacon_package_draft')
      navigate('/dashboard/packages')
    } catch (err) {
      toast.error('Saved to local marketplace state!')
      navigate('/dashboard/packages')
    }
  }

  // VIEW A: FULL SCREEN EXPERIENCE TYPE SELECTION HERO PAGE
  if (isChoosingType) {
    return (
      <div className="min-h-screen bg-ocean-gradient p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-5xl relative z-10 space-y-8 my-8">
          <div className="text-center space-y-3">
            <Link to="/dashboard/packages" className="inline-flex items-center gap-2 text-cyan hover:underline text-xs font-bold mb-2">
              <ArrowLeft className="w-4 h-4" /> Back to Packages Console
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Create a New Experience
            </h1>
            <p className="text-white/70 text-sm sm:text-base max-w-2xl mx-auto">
              Select the travel category to unlock tailored modules, specialized fields, altitude specs, equipment lists, and route builders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXPERIENCE_TYPES.map((type) => {
              const Icon = type.icon
              const isSelected = formData.packageType === type.id
              return (
                <motion.button
                  key={type.id}
                  type="button"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectExperienceType(type.id)}
                  className={cn(
                    "p-5 rounded-[22px] text-left transition-all border relative flex flex-col justify-between cursor-pointer glass shadow-xl",
                    isSelected
                      ? "bg-cyan/20 border-cyan ring-2 ring-cyan/50 glow-cyan-sm"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/25"
                  )}
                >
                  <div>
                    <div
                      className="w-12 h-12 rounded-[16px] flex items-center justify-center mb-4 text-white shadow-md"
                      style={{ backgroundColor: type.accentColor }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border mb-2 inline-block", type.badgeColor)}>
                      {type.name}
                    </span>
                    <h3 className="font-extrabold text-white text-base leading-tight mb-1">
                      {type.name}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed font-normal">
                      {type.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyan">
                    <span>Build Experience</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // VIEW B: MULTI-STEP WIZARD EDITOR
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface p-5 rounded-[20px] border border-border shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsChoosingType(true)}
            className="p-2.5 rounded-[12px] bg-page border border-border hover:bg-border/40 transition-colors"
            title="Change Experience Type"
          >
            <ArrowLeft className="w-5 h-5 text-navy" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className={cn("text-xs font-bold px-2.5 py-0.5 rounded-full border", currentTypeConfig.badgeColor)}>
                {currentTypeConfig.name}
              </span>
              {isAutosaving ? (
                <span className="text-[10px] text-teal font-semibold animate-pulse flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin" /> Autosaving...
                </span>
              ) : draftSavedAt ? (
                <span className="text-[10px] text-muted font-mono">
                  Saved at {draftSavedAt}
                </span>
              ) : null}
            </div>
            <h1 className="text-xl font-bold text-navy mt-1">
              {formData.title || 'Untitled Travel Experience'}
            </h1>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex p-1 bg-page rounded-[12px] border border-border mr-2">
            <button
              type="button"
              onClick={() => setActiveTabPreview('editor')}
              className={cn(
                "px-3 py-1.5 text-xs font-bold rounded-[8px] transition-all flex items-center gap-1.5 cursor-pointer",
                activeTabPreview === 'editor' ? "bg-surface text-navy shadow-sm" : "text-muted hover:text-navy"
              )}
            >
              <FileText className="w-3.5 h-3.5 text-cyan" /> Builder Wizard
            </button>
            <button
              type="button"
              onClick={() => setActiveTabPreview('preview')}
              className={cn(
                "px-3 py-1.5 text-xs font-bold rounded-[8px] transition-all flex items-center gap-1.5 cursor-pointer",
                activeTabPreview === 'preview' ? "bg-surface text-navy shadow-sm" : "text-muted hover:text-navy"
              )}
            >
              <Eye className="w-3.5 h-3.5 text-teal" /> Live Preview
            </button>
          </div>

          <Button type="button" variant="outline" size="sm" onClick={handleSaveDraft}>
            <Save className="w-4 h-4" /> Save Draft
          </Button>
          <Button type="button" size="sm" glow onClick={() => handleSubmitPackage('SUBMITTED')}>
            <Send className="w-4 h-4" /> Submit for Review
          </Button>
        </div>
      </div>

      {/* Progress Bar (0 to 100%) */}
      <div className="w-full bg-page rounded-full h-2 overflow-hidden border border-border/60">
        <motion.div
          className="h-full bg-cyan-gradient"
          initial={{ width: 0 }}
          animate={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Grid: Left Sidebar Tracker + Right Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT SIDEBAR WIZARD PROGRESS TRACKER (lg:col-span-3) */}
        <div className="lg:col-span-3 space-y-4 sticky top-6">
          <Card className="p-4 space-y-4">
            {/* Readiness Gauge */}
            <div className="p-3 bg-page rounded-[14px] border border-border text-center">
              <div className="flex items-center justify-between text-xs font-bold text-navy mb-1">
                <span>Package Readiness</span>
                <span className={cn(readinessScore >= 80 ? "text-emerald-500" : "text-amber-500")}>
                  {readinessScore}%
                </span>
              </div>
              <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                <div
                  className={cn("h-full transition-all duration-500", readinessScore >= 80 ? "bg-emerald-500" : "bg-amber-500")}
                  style={{ width: `${readinessScore}%` }}
                />
              </div>
            </div>

            {/* Step Navigation List */}
            <div className="space-y-1">
              {steps.map((s, idx) => {
                const Icon = s.icon
                const isActive = activeStepIndex === idx
                const isCompleted = idx < activeStepIndex || (idx === 0 && formData.packageType)
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveStepIndex(idx)}
                    className={cn(
                      "w-full text-left px-3 py-2.5 rounded-[12px] flex items-center justify-between transition-all cursor-pointer text-xs font-semibold",
                      isActive
                        ? "bg-cyan/15 text-navy border border-cyan/40 shadow-sm font-bold"
                        : "text-muted hover:text-navy hover:bg-page"
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-[7px] flex items-center justify-center shrink-0 text-[11px]",
                          isActive
                            ? "bg-cyan text-navy font-bold"
                            : isCompleted
                            ? "bg-emerald-500/15 text-emerald-500"
                            : "bg-border/60 text-muted"
                        )}
                      >
                        {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <span className="truncate">{s.name}</span>
                    </div>
                    {s.required && <span className="text-red-500 text-xs font-bold">*</span>}
                  </button>
                )
              })}
            </div>
          </Card>
        </div>

        {/* RIGHT CONTENT AREA (lg:col-span-9) */}
        <div className="lg:col-span-9 space-y-6">
          <AnimatePresence mode="wait">
            {activeTabPreview === 'preview' ? (
              /* LIVE INTERACTIVE PUBLIC PREVIEW */
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <Card className="p-6 space-y-6 border-cyan/30">
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div>
                      <span className={cn("text-xs font-bold px-3 py-1 rounded-full border", currentTypeConfig.badgeColor)}>
                        {currentTypeConfig.name} PREVIEW
                      </span>
                      <h2 className="text-2xl font-extrabold text-navy mt-2">{formData.title || 'Package Preview'}</h2>
                      <p className="text-sm text-muted">{formData.destination} • {formData.days} Days / {formData.nights} Nights</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted">Starting From</p>
                      <p className="text-3xl font-extrabold text-teal font-mono">{formatCurrency(formData.basePrice * (1 - formData.discount / 100))}</p>
                    </div>
                  </div>

                  {formData.coverImage && (
                    <div className="h-64 sm:h-80 rounded-[20px] overflow-hidden border border-border relative">
                      <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 bg-navy/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                        Beacon Verified Experience
                      </div>
                    </div>
                  )}

                  {formData.packageType === 'trekking' && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-emerald-500/10 rounded-[16px] border border-emerald-500/20 text-emerald-400">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted">Max Altitude</p>
                        <p className="text-sm font-extrabold">{formData.maxAltitudeFt} ft</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted">Trek Distance</p>
                        <p className="text-sm font-extrabold">{formData.trekDistanceKm} km</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted">Base Village</p>
                        <p className="text-sm font-extrabold">{formData.baseVillage}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted">Summit Peak</p>
                        <p className="text-sm font-extrabold">{formData.summitName}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-navy text-lg mb-2">Experience Overview</h3>
                    <p className="text-sm text-navy/80 leading-relaxed whitespace-pre-line">{formData.description}</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-navy text-base mb-2">What's Included</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {formData.inclusions.map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-navy/90 p-2 bg-page rounded-[10px] border border-border">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {inc}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ) : (
              /* EDITOR WIZARD STEPS */
              <motion.div
                key={steps[activeStepIndex].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* STEP 1: TYPE SELECTION */}
                {steps[activeStepIndex].id === 'type' && (
                  <Card className="space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <div>
                        <h2 className="text-lg font-bold text-navy">Experience Type Selection</h2>
                        <p className="text-xs text-muted">Controls dynamic fields and wizard layout</p>
                      </div>
                      <span className={cn("text-xs font-bold px-3 py-1 rounded-full border", currentTypeConfig.badgeColor)}>
                        Selected: {currentTypeConfig.name}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {EXPERIENCE_TYPES.map((t) => {
                        const Icon = t.icon
                        const isSelected = formData.packageType === t.id
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => handleSelectExperienceType(t.id)}
                            className={cn(
                              "p-4 rounded-[16px] text-left transition-all border flex items-start gap-3 cursor-pointer",
                              isSelected ? "bg-cyan/15 border-cyan shadow-md ring-1 ring-cyan/40" : "bg-page border-border hover:border-border-dark"
                            )}
                          >
                            <div className="w-10 h-10 rounded-[12px] bg-navy text-white flex items-center justify-center shrink-0">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-bold text-navy text-sm">{t.name}</p>
                              <p className="text-xs text-muted mt-0.5">{t.tagline}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </Card>
                )}

                {/* STEP 2: BASIC INFO & DYNAMIC SPECS */}
                {steps[activeStepIndex].id === 'basic' && (
                  <Card className="space-y-6">
                    <h2 className="text-lg font-bold text-navy pb-3 border-b border-border">Basic Information & Attributes</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Package Experience Title *"
                        placeholder="e.g. Kedarkantha Winter Snow Trek"
                        value={formData.title}
                        onChange={(e) => handleUpdateForm('title', e.target.value)}
                      />
                      <Input
                        label="Subtitle / Tagline"
                        placeholder="e.g. Summit 12,500 ft Himalayan Trail"
                        value={formData.subtitle}
                        onChange={(e) => handleUpdateForm('subtitle', e.target.value)}
                      />
                      <Input
                        label="Duration (Days) *"
                        type="number"
                        min={1}
                        value={formData.days}
                        onChange={(e) => handleUpdateForm('days', Number(e.target.value))}
                      />
                      <Input
                        label="Duration (Nights) *"
                        type="number"
                        min={0}
                        value={formData.nights}
                        onChange={(e) => handleUpdateForm('nights', Number(e.target.value))}
                      />
                    </div>

                    {/* DYNAMIC EXPERIENCE SPECIFIC FIELDS */}
                    {formData.packageType === 'trekking' && (
                      <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-[16px] space-y-4">
                        <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                          <Mountain className="w-4 h-4" /> Trekking & Expedition Specifications
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <Input
                            label="Max Altitude (ft) *"
                            type="number"
                            value={formData.maxAltitudeFt}
                            onChange={(e) => handleUpdateForm('maxAltitudeFt', Number(e.target.value))}
                          />
                          <Input
                            label="Trek Distance (km) *"
                            type="number"
                            value={formData.trekDistanceKm}
                            onChange={(e) => handleUpdateForm('trekDistanceKm', Number(e.target.value))}
                          />
                          <Input
                            label="Base Village *"
                            value={formData.baseVillage}
                            onChange={(e) => handleUpdateForm('baseVillage', e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            label="Summit / Highest Point Name"
                            value={formData.summitName}
                            onChange={(e) => handleUpdateForm('summitName', e.target.value)}
                          />
                          <Input
                            label="Equipment Provided by Organizer"
                            value={formData.equipmentProvided}
                            onChange={(e) => handleUpdateForm('equipmentProvided', e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {formData.packageType === 'camping' && (
                      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-[16px] space-y-4">
                        <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                          <Tent className="w-4 h-4" /> Camping Specifications
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            label="Campsite Name *"
                            value={formData.campsiteName}
                            onChange={(e) => handleUpdateForm('campsiteName', e.target.value)}
                          />
                          <Input
                            label="Tent Types Offered"
                            value={formData.tentTypes}
                            onChange={(e) => handleUpdateForm('tentTypes', e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    {formData.packageType === 'roadtrip' && (
                      <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-[16px] space-y-4">
                        <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                          <Car className="w-4 h-4" /> Road Trip Specifications
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Input
                            label="Vehicle Category *"
                            value={formData.vehicleType}
                            onChange={(e) => handleUpdateForm('vehicleType', e.target.value)}
                          />
                          <Input
                            label="Main Road Trip Route"
                            value={formData.roadTripRoute}
                            onChange={(e) => handleUpdateForm('roadTripRoute', e.target.value)}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1.5">Detailed Description *</label>
                      <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleUpdateForm('description', e.target.value)}
                        className="w-full p-3 rounded-[12px] border border-border bg-page text-sm focus:outline-none focus:ring-2 focus:ring-cyan"
                        placeholder="Provide a compelling overview of this trip..."
                      />
                    </div>
                  </Card>
                )}

                {/* STEP 3: LOCATIONS & PICKUP */}
                {steps[activeStepIndex].id === 'locations' && (
                  <Card className="space-y-6">
                    <h2 className="text-lg font-bold text-navy pb-3 border-b border-border">Locations, Pickup & Google Places</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Starting Location / Base City *"
                        placeholder="e.g. Dehradun Railway Station"
                        value={formData.startLocation}
                        onChange={(e) => handleUpdateForm('startLocation', e.target.value)}
                      />
                      <Input
                        label="Main Destination *"
                        placeholder="e.g. Kedarkantha Peak"
                        value={formData.destination}
                        onChange={(e) => handleUpdateForm('destination', e.target.value)}
                      />
                    </div>

                    <div className="p-4 bg-page rounded-[16px] border border-border space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-navy text-sm">Pickup & Drop Included?</p>
                          <p className="text-xs text-muted">Toggle transportation services for travelers</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleUpdateForm('pickupIncluded', !formData.pickupIncluded)}
                          className={cn(
                            "w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer",
                            formData.pickupIncluded ? "bg-teal" : "bg-border"
                          )}
                        >
                          <div className={cn("w-5 h-5 bg-white rounded-full transition-transform shadow-md", formData.pickupIncluded && "translate-x-6")} />
                        </button>
                      </div>

                      {formData.pickupIncluded && (
                        <div className="pt-2 border-t border-border">
                          <Input
                            label="Pickup Points & Schedule Details"
                            placeholder="e.g. Pickup at 6:00 AM from Dehradun Railway Station"
                            value={formData.pickupDetails}
                            onChange={(e) => handleUpdateForm('pickupDetails', e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                )}

                {/* STEP 4: ACCOMMODATION (CONDITIONAL) */}
                {steps[activeStepIndex].id === 'accommodation' && (
                  <Card className="space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <div>
                        <h2 className="text-lg font-bold text-navy">Accommodation & Stay Details</h2>
                        <p className="text-xs text-muted">Hotel, resort, or homestay configurations</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleUpdateForm('accommodationIncluded', !formData.accommodationIncluded)}
                        className={cn(
                          "w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer",
                          formData.accommodationIncluded ? "bg-teal" : "bg-border"
                        )}
                      >
                        <div className={cn("w-5 h-5 bg-white rounded-full transition-transform shadow-md", formData.accommodationIncluded && "translate-x-6")} />
                      </button>
                    </div>

                    {formData.accommodationIncluded ? (
                      <div className="space-y-4">
                        <Input
                          label="Hotel / Stay Names & Standards"
                          placeholder="e.g. 3-Star Hotels / Alpine Dome Tents"
                          value={formData.hotelDetails}
                          onChange={(e) => handleUpdateForm('hotelDetails', e.target.value)}
                        />
                        <Input
                          label="Sharing / Room Types"
                          placeholder="e.g. Double Sharing & Triple Sharing Options"
                          value={formData.roomTypes}
                          onChange={(e) => handleUpdateForm('roomTypes', e.target.value)}
                        />
                      </div>
                    ) : (
                      <p className="text-xs text-muted p-4 bg-page rounded-[12px] text-center">
                        Accommodation is disabled for this experience type.
                      </p>
                    )}
                  </Card>
                )}

                {/* STEP 5: FIXED BATCHES */}
                {steps[activeStepIndex].id === 'batches' && (
                  <Card className="space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <div>
                        <h2 className="text-lg font-bold text-navy">Fixed Departure Batches</h2>
                        <p className="text-xs text-muted">Manage batch dates and seat availability</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleUpdateForm('fixedBatchesEnabled', !formData.fixedBatchesEnabled)}
                        className={cn(
                          "w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer",
                          formData.fixedBatchesEnabled ? "bg-teal" : "bg-border"
                        )}
                      >
                        <div className={cn("w-5 h-5 bg-white rounded-full transition-transform shadow-md", formData.fixedBatchesEnabled && "translate-x-6")} />
                      </button>
                    </div>

                    {formData.fixedBatchesEnabled && (
                      <div className="space-y-3">
                        {formData.batches.map((batch) => (
                          <div key={batch.id} className="p-4 bg-page rounded-[14px] border border-border grid grid-cols-1 sm:grid-cols-4 gap-3 items-center">
                            <div>
                              <p className="text-xs text-muted">Start Date</p>
                              <p className="font-bold text-navy text-sm">{batch.startDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted">End Date</p>
                              <p className="font-bold text-navy text-sm">{batch.endDate}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted">Seats Available</p>
                              <p className="font-bold text-teal text-sm">{batch.availableSeats} / {batch.totalSeats}</p>
                            </div>
                            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full text-center">
                              {batch.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                )}

                {/* STEP 6: PRICING */}
                {steps[activeStepIndex].id === 'pricing' && (
                  <Card className="space-y-6">
                    <h2 className="text-lg font-bold text-navy pb-3 border-b border-border">Pricing & Occupancy Engine</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Input
                        label="Base Price ($) *"
                        type="number"
                        value={formData.basePrice}
                        onChange={(e) => handleUpdateForm('basePrice', Number(e.target.value))}
                      />
                      <Input
                        label="Discount (%)"
                        type="number"
                        value={formData.discount}
                        onChange={(e) => handleUpdateForm('discount', Number(e.target.value))}
                      />
                      <Input
                        label="Advance Deposit (%)"
                        type="number"
                        value={formData.advanceDepositPercent}
                        onChange={(e) => handleUpdateForm('advanceDepositPercent', Number(e.target.value))}
                      />
                    </div>

                    <div className="p-4 bg-teal-gradient rounded-[18px] text-white flex items-center justify-between">
                      <div>
                        <p className="text-xs opacity-80">Calculated Final Price per traveler</p>
                        <p className="text-3xl font-extrabold font-mono mt-0.5">
                          {formatCurrency(formData.basePrice * (1 - formData.discount / 100))}
                        </p>
                      </div>
                      <Award className="w-10 h-10 opacity-40" />
                    </div>
                  </Card>
                )}

                {/* STEP 7: ITINERARY BUILDER */}
                {steps[activeStepIndex].id === 'itinerary' && (
                  <Card className="space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <div>
                        <h2 className="text-lg font-bold text-navy">Day-wise Itinerary ({formData.days} Days)</h2>
                        <p className="text-xs text-muted">Auto-generated based on package duration</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {formData.itineraryDays.map((day, i) => (
                        <div key={i} className="p-4 bg-page rounded-[16px] border border-border space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-cyan/15 text-navy font-bold text-xs rounded-full">
                              Day {day.day}
                            </span>
                          </div>
                          <Input
                            label="Day Title"
                            value={day.title}
                            onChange={(e) => {
                              const updated = [...formData.itineraryDays]
                              updated[i].title = e.target.value
                              handleUpdateForm('itineraryDays', updated)
                            }}
                          />
                          <div>
                            <label className="block text-xs font-semibold text-navy mb-1">Activities & Details</label>
                            <textarea
                              rows={2}
                              value={day.activities}
                              onChange={(e) => {
                                const updated = [...formData.itineraryDays]
                                updated[i].activities = e.target.value
                                handleUpdateForm('itineraryDays', updated)
                              }}
                              className="w-full p-2.5 rounded-[10px] border border-border bg-surface text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* STEP 8: INCLUSIONS / EXCLUSIONS */}
                {steps[activeStepIndex].id === 'inclusions' && (
                  <Card className="space-y-6">
                    <h2 className="text-lg font-bold text-navy pb-3 border-b border-border">Inclusions & Exclusions</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-navy mb-2">Inclusions</label>
                        <ul className="space-y-1.5">
                          {formData.inclusions.map((inc, i) => (
                            <li key={i} className="flex items-center justify-between text-xs p-2 bg-page rounded-[8px] border border-border">
                              <span>{inc}</span>
                              <button
                                type="button"
                                onClick={() => handleUpdateForm('inclusions', formData.inclusions.filter((_, idx) => idx !== i))}
                                className="text-muted hover:text-red-500"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy mb-2">Exclusions</label>
                        <ul className="space-y-1.5">
                          {formData.exclusions.map((exc, i) => (
                            <li key={i} className="flex items-center justify-between text-xs p-2 bg-page rounded-[8px] border border-border">
                              <span>{exc}</span>
                              <button
                                type="button"
                                onClick={() => handleUpdateForm('exclusions', formData.exclusions.filter((_, idx) => idx !== i))}
                                className="text-muted hover:text-red-500"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                )}

                {/* STEP 9: MEDIA */}
                {steps[activeStepIndex].id === 'media' && (
                  <Card className="space-y-6">
                    <h2 className="text-lg font-bold text-navy pb-3 border-b border-border">Media & Photos</h2>
                    
                    <Input
                      label="Cover Image URL *"
                      placeholder="e.g. https://images.unsplash.com/photo-1464822759023..."
                      value={formData.coverImage}
                      onChange={(e) => handleUpdateForm('coverImage', e.target.value)}
                    />

                    {formData.coverImage && (
                      <div className="h-44 rounded-[16px] overflow-hidden border border-border">
                        <img src={formData.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </Card>
                )}

                {/* STEP 10: PREVIEW & READINESS */}
                {steps[activeStepIndex].id === 'preview' && (
                  <Card className="space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-border">
                      <h2 className="text-lg font-bold text-navy">Package Readiness Checklist</h2>
                      <span className={cn("text-xs font-bold px-3 py-1 rounded-full border", readinessScore >= 80 ? "bg-emerald-500/15 text-emerald-500" : "bg-amber-500/15 text-amber-500")}>
                        {readinessScore}% Ready
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-3 bg-page rounded-[12px] flex items-center justify-between text-xs">
                        <span className="font-semibold text-navy">Experience Title</span>
                        {formData.title ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
                      </div>
                      <div className="p-3 bg-page rounded-[12px] flex items-center justify-between text-xs">
                        <span className="font-semibold text-navy">Destination Specified</span>
                        {formData.destination ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
                      </div>
                      <div className="p-3 bg-page rounded-[12px] flex items-center justify-between text-xs">
                        <span className="font-semibold text-navy">Base Price Set</span>
                        {formData.basePrice > 0 ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
                      </div>
                      <div className="p-3 bg-page rounded-[12px] flex items-center justify-between text-xs">
                        <span className="font-semibold text-navy">Cover Image Attached</span>
                        {formData.coverImage ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertTriangle className="w-4 h-4 text-amber-500" />}
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3">
                      <Button type="button" variant="outline" onClick={handleSaveDraft}>
                        Save as Draft
                      </Button>
                      <Button type="button" glow onClick={() => handleSubmitPackage('SUBMITTED')}>
                        Submit Package for Approval
                      </Button>
                    </div>
                  </Card>
                )}

                {/* BOTTOM WIZARD NAVIGATION BAR */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
                  >
                    Previous Step
                  </Button>

                  <Button
                    type="button"
                    glow
                    disabled={activeStepIndex === steps.length - 1}
                    onClick={() => setActiveStepIndex(Math.min(steps.length - 1, activeStepIndex + 1))}
                  >
                    Save & Continue <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
