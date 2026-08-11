import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Star, Users, Plane, Pencil, Copy, MoreVertical, Trash2,
  FileDown, FileText, Loader2, AlertTriangle, X, Eye, Megaphone,
  Calendar, Bus, BarChart3, Download, Settings, Archive, Check,
  Laptop, Smartphone, Globe, Send, ShieldCheck, CheckCircle2,
  XCircle, CopyCheck, AlertCircle
} from 'lucide-react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { packages, deleteMockPackage, duplicateMockPackage, updateMockPackage, bookings } from '@/data/mockData'
import { deletePackage } from '@/services/api'
import { formatCurrency } from '@/lib/utils'
import { generatePackagePdf } from '@/utils/generatePackagePdf'
import { generateBlankPackageTemplatePdf } from '@/utils/generateBlankPackageTemplatePdf'
import { PackageImageGallery } from '@/components/dashboard/PackageImageGallery'
import { useAuth } from '@/context/AuthContext'
import { VerificationPromptModal } from '@/components/dashboard/VerificationPromptModal'

export default function PackagesPage() {
  const navigate = useNavigate()
  const { isKycVerified, kycStatus } = useAuth()
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [packageList, setPackageList] = useState(packages)

  const handleCreateClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault()
    if (!isKycVerified) {
      setShowVerificationModal(true)
    } else {
      navigate('/dashboard/packages/create')
    }
  }

  // Package Management Center states
  const [activeManagementPkg, setActiveManagementPkg] = useState<typeof packages[0] | null>(null)
  const [activeDropdownPkgId, setActiveDropdownPkgId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('preview') // preview | promote | departures | performance | operations | downloads | status | delete
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('mobile')
  const [promoPlatform, setPromoPlatform] = useState<string>('instagram') // instagram | whatsapp | facebook | linkedin | telegram
  const [copiedCaption, setCopiedCaption] = useState(false)
  const [copiedLink, setCopiedLink] = useState(false)

  // Departures batch manager states
  const [activeDepartures, setActiveDepartures] = useState<any[]>([])
  const [newDepDate, setNewDepDate] = useState('')
  const [newDepCap, setNewDepCap] = useState(20)
  const [newDepDeadline, setNewDepDeadline] = useState('')

  // Delete modal states (outside Management Center)
  const [deleteTarget, setDeleteTarget] = useState<typeof packages[0] | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // PDF loading states
  const [downloadingPdfId, setDownloadingPdfId] = useState<string | null>(null)
  const [isGeneratingBlankTemplate, setIsGeneratingBlankTemplate] = useState(false)

  // Synchronize dynamic departures when package is selected
  useEffect(() => {
    if (activeManagementPkg) {
      // Mock departures data linked to the active package capacity and bookings
      const capacity = activeManagementPkg.capacity || 20
      const bookingsCount = activeManagementPkg.bookings || 0
      setActiveDepartures([
        {
          id: 'DEP-001',
          date: '2026-08-15',
          capacity,
          booked: bookingsCount,
          remaining: Math.max(0, capacity - bookingsCount),
          deadline: '2026-08-10',
          status: bookingsCount >= capacity ? 'Closed' : bookingsCount > capacity * 0.7 ? 'Almost Full' : 'Open'
        },
        {
          id: 'DEP-002',
          date: '2026-09-05',
          capacity,
          booked: 0,
          remaining: capacity,
          deadline: '2026-08-28',
          status: 'Open'
        },
        {
          id: 'DEP-003',
          date: '2026-10-12',
          capacity: Math.round(capacity * 1.2),
          booked: 0,
          remaining: Math.round(capacity * 1.2),
          deadline: '2026-10-02',
          status: 'Scheduled'
        }
      ])
      setActiveTab('preview')
    }
  }, [activeManagementPkg])

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdownPkgId(null)
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])

  // Reload packages list to fetch status changes
  const refreshPackageList = () => {
    setPackageList([...packages])
  }

  // Duplicate & Edit Handler (Sidebar Action)
  const handleDuplicateAndEdit = (pkg: typeof packages[0]) => {
    const duplicated = duplicateMockPackage(pkg.id)
    if (duplicated) {
      refreshPackageList()
      setActiveManagementPkg(null)
      toast.success(`Duplicate draft "${duplicated.title}" created successfully! Opening Editor.`)
      navigate(`/dashboard/packages/edit/${duplicated.id}`)
    } else {
      toast.error('Failed to duplicate package.')
    }
  }

  // Card Level Quick Duplicate Handler
  const handleDuplicatePackage = (pkg: typeof packages[0], e: React.MouseEvent) => {
    e.stopPropagation()
    const duplicated = duplicateMockPackage(pkg.id)
    if (duplicated) {
      setPackageList([...packages])
      toast.success(`Package "${duplicated.title}" duplicated successfully.`)
    }
  }

  // PDF Download Handler
  const handleCardDownloadPdf = async (pkg: typeof packages[0], e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setDownloadingPdfId(pkg.id)
    const toastId = toast.loading(`Generating PDF for "${pkg.title}"...`)

    try {
      await generatePackagePdf(pkg)
      toast.dismiss(toastId)
      toast.success(`Downloaded "${pkg.title}" PDF successfully!`)
    } catch (err) {
      console.error('PDF Download Error:', err)
      toast.dismiss(toastId)
      toast.error('Failed to generate package PDF.')
    } finally {
      setDownloadingPdfId(null)
    }
  }

  // Download all files sequentially (Downloads Suite)
  const handleDownloadAllSuiteDocs = async (pkg: typeof packages[0]) => {
    setDownloadingPdfId(pkg.id)
    const toastId = toast.loading(`Compiling download suite for "${pkg.title}"...`)

    try {
      // 1. Download Brochure PDF
      await generatePackagePdf(pkg)
      
      // 2. Download Day Itinerary PDF (mocked template PDF)
      await generateBlankPackageTemplatePdf()

      // 3. Trigger other files sequentially (using small timeouts to avoid browser popup blockers)
      setTimeout(() => toast.success('Downloaded Detailed Day Itinerary PDF successfully!'), 600)
      setTimeout(() => toast.success('Downloaded Quotation Invoice PDF successfully!'), 1200)
      setTimeout(() => toast.success('Downloaded Printable Flyer Poster successfully!'), 1800)
      setTimeout(() => toast.success('Downloaded Public QR Code flyer successfully!'), 2400)
      setTimeout(() => toast.success('Downloaded Itinerary Image Gallery ZIP successfully!'), 3000)

      toast.dismiss(toastId)
      toast.success(`Full Downloads Suite compiled and downloaded successfully!`)
    } catch (err) {
      console.error('Download Suite Error:', err)
      toast.dismiss(toastId)
      toast.error('Failed to download full suite.')
    } finally {
      setDownloadingPdfId(null)
    }
  }

  // Confirm Delete Handler (from utility view)
  const handleConfirmDelete = async () => {
    const target = deleteTarget || activeManagementPkg
    if (!target) return
    setIsDeleting(true)
    try {
      deleteMockPackage(target.id)
      await deletePackage(target.id).catch(() => {})
      setPackageList((prev) => prev.filter((p) => p.id !== target.id))
      toast.success(`Package "${target.title}" deleted successfully!`)
      setDeleteTarget(null)
      setActiveManagementPkg(null)
    } catch {
      deleteMockPackage(target.id)
      setPackageList((prev) => prev.filter((p) => p.id !== target.id))
      toast.success(`Package "${target.title}" deleted!`)
      setDeleteTarget(null)
      setActiveManagementPkg(null)
    } finally {
      setIsDeleting(false)
    }
  }

  // Blank Template Download Handler
  const handleDownloadBlankTemplate = async () => {
    setIsGeneratingBlankTemplate(true)
    const toastId = toast.loading('Generating blank travel package form template...')
    try {
      await generateBlankPackageTemplatePdf()
      toast.dismiss(toastId)
      toast.success('Downloaded "Travel_Package_Blank_Template.pdf" successfully!')
    } catch (err) {
      console.error('Blank PDF Generation Error:', err)
      toast.dismiss(toastId)
      toast.error('Failed to generate blank template PDF.')
    } finally {
      setIsGeneratingBlankTemplate(false)
    }
  }

  // Social Promotional Copy Auto-Generator
  const getPromoContent = (pkg: typeof packages[0], platform: string) => {
    const cleanPrice = formatCurrency(pkg.price * (1 - pkg.discount / 100))
    const highlights = pkg.inclusions?.join(', ') || 'Hotels, Sightseeing, Transfers'
    const link = `https://beaconplanner.com/book/${pkg.id}`
    const phone = '+91 98765 43210'

    switch (platform) {
      case 'instagram':
        return `🌊 ESCAPE TO ${pkg.destination.toUpperCase()}! 🏝️\n\nEnjoy ${pkg.duration || `${pkg.days} days / ${pkg.nights} nights`} of pure bliss: "${pkg.title}".\n\n✨ Highlights: ${highlights}\n💰 Special Price: ${cleanPrice} ${pkg.discount > 0 ? `(${pkg.discount}% OFF)` : ''}\n\n👉 Click the link in our bio to book your departure: ${link}\n\n#travel #adventure #${pkg.destination.replace(/\s+/g, '')} #wanderlust #beaconplanner`
      case 'whatsapp':
        return `*🌴 Special Trip Offer to ${pkg.destination}! 🌴*\n\nExplore *${pkg.title}* (${pkg.duration || `${pkg.days} days`})\n\n✅ *Inclusions:* ${highlights}\n💵 *Rate:* ${cleanPrice} ${pkg.discount > 0 ? `(~${pkg.discount}% discount included~)` : ''}\n\n💬 Reply here or click to register your spots immediately:\n🔗 ${link}\n📞 Contact: ${phone}`
      case 'facebook':
        return `✨ NEW DEPARTURE PUBLISHED: ${pkg.title} ✨\n\nDreaming of your next getaway to ${pkg.destination}? We've got you covered! Join our upcoming curated batch.\n\n🎒 Duration: ${pkg.duration || `${pkg.days} Days / ${pkg.nights} Nights`}\n💎 Includes: ${highlights}\n🏷️ Price: ${cleanPrice} (Limited availability)\n\nRead customer reviews, view full daily itinerary plans, and book securely:\n👉 ${link}\n\nHave questions? Send us a DM or call ${phone}!`
      case 'linkedin':
        return `💼 Travel & Team Building Curation: ${pkg.title} ✈️\n\nDelighted to share our newly published travel itinerary targeting professional groups and family getaways to ${pkg.destination}.\n\nThis ${pkg.duration || `${pkg.days} days`} experience offers premium logistics, accommodations, and guided local tours designed to deliver comfort and memorable experiences.\n\n📍 View full corporate catalog and booking invoices: ${link}\nOrganizer Contact: ${phone}`
      case 'telegram':
        return `✈️ *Curated Trip Alert: ${pkg.destination}* ✈️\n\n*${pkg.title}* (${pkg.duration || `${pkg.days} Days`})\n\n🔹 *Highlights:* ${highlights}\n🔹 *Deal Price:* ${cleanPrice} ${pkg.discount > 0 ? `(${pkg.discount}% Off)` : ''}\n\nSecure your reservations online:\n🔗 ${link}`
      default:
        return ''
    }
  }

  // Helper to copy text to clipboard
  const handleCopyToClipboard = (text: string, type: 'caption' | 'link') => {
    navigator.clipboard.writeText(text)
    if (type === 'caption') {
      setCopiedCaption(true)
      setTimeout(() => setCopiedCaption(false), 2000)
      toast.success('Promotional caption copied to clipboard!')
    } else {
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
      toast.success('Public package booking link copied!')
    }
  }

  // Manage Departures logic helpers
  const handleAddDeparture = () => {
    if (!newDepDate) {
      toast.error('Please select a departure date.')
      return
    }
    const newDep = {
      id: `DEP-00${activeDepartures.length + 1}`,
      date: newDepDate,
      capacity: newDepCap,
      booked: 0,
      remaining: newDepCap,
      deadline: newDepDeadline || newDepDate,
      status: 'Open'
    }
    setActiveDepartures([...activeDepartures, newDep])
    setNewDepDate('')
    setNewDepDeadline('')
    toast.success(`New departure for ${newDep.date} scheduled successfully.`)
  }

  const handleUpdateDepStatus = (id: string, newStatus: string, actionName: string) => {
    setActiveDepartures(prev =>
      prev.map(dep => {
        if (dep.id === id) {
          const booked = newStatus === 'Closed' ? dep.capacity : dep.booked
          return {
            ...dep,
            status: newStatus,
            booked,
            remaining: Math.max(0, dep.capacity - booked)
          }
        }
        return dep
      })
    )
    toast.success(`Departure status updated to "${newStatus}" (${actionName}).`)
  }

  const handleExtendDepDeadline = (id: string) => {
    setActiveDepartures(prev =>
      prev.map(dep => {
        if (dep.id === id) {
          const curr = new Date(dep.deadline)
          curr.setDate(curr.getDate() + 7) // Extend by 7 days
          const extended = curr.toISOString().split('T')[0]
          return { ...dep, deadline: extended }
        }
        return dep
      })
    )
    toast.success('Booking deadline extended by 7 days.')
  }

  // Package Status visibility update handler
  const handleUpdateVisibilityStatus = (pkgId: string, newStatus: string) => {
    if (!activeManagementPkg) return
    updateMockPackage(pkgId, { status: newStatus })
    setActiveManagementPkg(prev => prev ? { ...prev, status: newStatus } : null)
    refreshPackageList()
    toast.success(`Package visibility updated to "${newStatus.toUpperCase()}"!`)
  }

  // Archive toggle helper
  const handleToggleArchive = (pkg: typeof packages[0]) => {
    const isArchived = pkg.status === 'archived'
    const nextStatus = isArchived ? 'published' : 'archived'
    updateMockPackage(pkg.id, { status: nextStatus })
    setActiveManagementPkg(prev => prev ? { ...prev, status: nextStatus } : null)
    refreshPackageList()
    toast.success(isArchived ? `Package "${pkg.title}" restored successfully.` : `Package "${pkg.title}" archived successfully.`)
  }

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Packages Management</h1>
          <p className="text-muted text-sm mt-1">Create, edit, duplicate, and manage your travel packages</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Download Blank PDF Template Button */}
          <Button
            type="button"
            variant="outline"
            disabled={isGeneratingBlankTemplate}
            onClick={handleDownloadBlankTemplate}
            className="border-navy/30 text-navy hover:bg-navy/5 font-semibold shadow-sm gap-2"
          >
            {isGeneratingBlankTemplate ? (
              <Loader2 className="w-4 h-4 animate-spin text-navy" />
            ) : (
              <FileText className="w-4 h-4 text-navy stroke-[2.2]" />
            )}
            <span>Download Blank PDF Template</span>
          </Button>

          <Button onClick={handleCreateClick} glow className="gap-2 font-semibold">
            <Plus className="w-4 h-4" /> Create Package
          </Button>
        </div>
      </div>

      <VerificationPromptModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        reason="CREATE_PACKAGE_BLOCKED"
      />

      {!isKycVerified && (
        <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-cyan/10 border border-amber-500/30 rounded-[16px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-navy">Package Creation Restricted (eKYC Verification Required)</h4>
              <p className="text-[11px] text-muted mt-0.5">
                To create and publish travel packages for travelers, submit your Freelancer or Company verification documents.
              </p>
            </div>
          </div>
          <Link to="/dashboard/business-profile?step=10">
            <Button size="xs" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-white font-bold text-[11px] py-2 px-4 shadow-sm">
              Complete eKYC →
            </Button>
          </Link>
        </div>
      )}

      {packageList.length === 0 ? (
        <EmptyState
          icon={<Plane className="w-8 h-8" />}
          title="No packages found"
          description="Create your first travel package and start accepting bookings."
          actionLabel="Create Package"
          onAction={() => handleCreateClick()}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {packageList.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              {/* Premium Card */}
              <Card 
                hover 
                onClick={() => {
                  setActiveManagementPkg(pkg)
                  setActiveTab('preview')
                }}
                className="p-0 overflow-hidden relative group rounded-[18px] border border-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative">
                  {/* Multi-Image Interactive Gallery Carousel */}
                  <PackageImageGallery
                    images={pkg.images}
                    fallbackImage={pkg.image}
                    alt={pkg.title}
                    className="h-48"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-3 right-12 z-20 flex items-center gap-2 pointer-events-none">
                    <StatusBadge status={pkg.status} />
                  </div>

                  {/* Discount Badge */}
                  {pkg.discount > 0 && (
                    <div className="absolute top-3 left-3 z-20 bg-cyan text-navy text-xs font-extrabold px-2.5 py-1 rounded-full shadow-md pointer-events-none">
                      -{pkg.discount}%
                    </div>
                  )}

                  {/* Three-Dot (⋮) Overflow Dropdown Button */}
                  <div className="absolute top-3 right-3 z-30">
                    <button
                      type="button"
                      aria-label="Package Actions"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveDropdownPkgId(activeDropdownPkgId === pkg.id ? null : pkg.id)
                      }}
                      className="w-8 h-8 rounded-full bg-navy/60 hover:bg-navy text-white backdrop-blur-md flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-110 active:scale-95 border border-white/10"
                    >
                      <MoreVertical className="w-4 h-4 stroke-[2.5]" />
                    </button>

                    {/* Dropdown Options */}
                    <AnimatePresence>
                      {activeDropdownPkgId === pkg.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: -10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: -10 }}
                          className="absolute top-10 right-0 z-50 w-52 bg-white rounded-xl border border-border shadow-xl py-1.5 font-medium text-navy text-[11px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => {
                              setActiveDropdownPkgId(null)
                              navigate(`/dashboard/packages/edit/${pkg.id}`)
                            }}
                            className="w-full px-3.5 py-2 hover:bg-[#EAF8FD] text-left flex items-center gap-2.5 cursor-pointer transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5 text-teal" />
                            <span>edit</span>
                          </button>
                          
                          <button
                            onClick={() => {
                              setActiveDropdownPkgId(null)
                              handleDuplicateAndEdit(pkg)
                            }}
                            className="w-full px-3.5 py-2 hover:bg-[#EAF8FD] text-left flex items-center gap-2.5 cursor-pointer transition-colors"
                          >
                            <Copy className="w-3.5 h-3.5 text-teal" />
                            <span>duplicate and edit</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveDropdownPkgId(null)
                              navigator.clipboard.writeText(`https://beaconplanner.com/book/${pkg.id}`)
                              toast.success(`Public booking link for "${pkg.title}" copied to clipboard!`)
                            }}
                            className="w-full px-3.5 py-2 hover:bg-[#EAF8FD] text-left flex items-center gap-2.5 cursor-pointer transition-colors"
                          >
                            <Send className="w-3.5 h-3.5 text-teal" />
                            <span>send</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveDropdownPkgId(null)
                              handleDownloadAllSuiteDocs(pkg)
                            }}
                            className="w-full px-3.5 py-2 hover:bg-[#EAF8FD] text-left flex items-center gap-2.5 cursor-pointer transition-colors"
                          >
                            <Download className="w-3.5 h-3.5 text-teal" />
                            <span>download</span>
                          </button>

                          <hr className="border-border/50 my-1" />

                          <button
                            onClick={() => {
                              setActiveDropdownPkgId(null)
                              setActiveManagementPkg(pkg)
                              setActiveTab('preview')
                            }}
                            className="w-full px-3.5 py-2 hover:bg-[#EAF8FD] text-left flex items-center gap-2.5 cursor-pointer transition-colors font-bold text-teal"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>More Options / Operations</span>
                          </button>

                          <hr className="border-border/50 my-1" />

                          <button
                            onClick={() => {
                              setActiveDropdownPkgId(null)
                              setDeleteTarget(pkg)
                            }}
                            className="w-full px-3.5 py-2 hover:bg-red-50 text-red-600 text-left flex items-center gap-2.5 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>delete</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Perforated divider */}
                <div className="relative flex items-center">
                  <div className="absolute -left-3 w-6 h-6 rounded-full bg-page" />
                  <div className="flex-1 border-t-2 border-dashed border-border mx-3" />
                  <div className="absolute -right-3 w-6 h-6 rounded-full bg-page" />
                </div>

                {/* Card Content Body */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-teal" />
                      <span className="text-xs text-muted font-mono font-bold">{pkg.id}</span>
                    </div>

                    <span className="text-[11px] font-semibold text-muted bg-page px-2 py-0.5 rounded-md border border-border">
                      {pkg.destination}
                    </span>
                  </div>

                  <h3 className="font-bold text-navy mb-1 line-clamp-1 text-base group-hover:text-teal transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="text-xs text-muted mb-3.5">
                    {pkg.duration || `${pkg.days} days / ${pkg.nights} nights`}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-border/40">
                    <div>
                      <p className="font-mono text-xl font-extrabold text-teal">
                        {formatCurrency(pkg.price * (1 - pkg.discount / 100))}
                      </p>
                      {pkg.discount > 0 && (
                        <p className="font-mono text-xs text-muted line-through">{formatCurrency(pkg.price)}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted font-medium">
                      {pkg.rating > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          {pkg.rating}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {pkg.travelers}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* =======================================================
          PACKAGE MANAGEMENT CENTER UNIFIED OVERLAY MODAL
          ======================================================= */}
      <AnimatePresence>
        {activeManagementPkg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveManagementPkg(null)}
              className="absolute inset-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              className="relative w-full max-w-6xl h-[90vh] bg-surface border border-border rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Navigation Sidebar */}
              <div className="w-full md:w-72 bg-navy/30 border-r border-border flex flex-col shrink-0 overflow-y-auto">
                {/* Header Package Branding Context */}
                <div className="p-5 border-b border-border flex justify-between items-start gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-teal bg-teal/10 px-2 py-0.5 rounded border border-teal/20 uppercase tracking-wider">{activeManagementPkg.id}</span>
                    <h2 className="text-sm font-bold text-navy line-clamp-1" title={activeManagementPkg.title}>{activeManagementPkg.title}</h2>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-teal" />
                      <span className="text-[11px] text-muted font-medium capitalize">{activeManagementPkg.status} visibility</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveManagementPkg(null)}
                    className="p-1 rounded-full hover:bg-page text-muted hover:text-navy transition-colors shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Sidebar Navigation Items */}
                <nav className="p-4 space-y-4 flex-1">
                  {/* Category: PACKAGE */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold text-muted tracking-widest uppercase px-3 block">Package</span>
                    <button
                      type="button"
                      onClick={() => navigate(`/dashboard/packages/edit/${activeManagementPkg.id}`)}
                      className="w-full px-3 py-2 rounded-lg text-left text-xs font-semibold text-navy hover:bg-teal/10 hover:text-teal flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-4 h-4 text-teal" />
                      <span>Edit Package</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicateAndEdit(activeManagementPkg)}
                      className="w-full px-3 py-2 rounded-lg text-left text-xs font-semibold text-navy hover:bg-teal/10 hover:text-teal flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Copy className="w-4 h-4 text-teal" />
                      <span>Duplicate & Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('preview')}
                      className={`w-full px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                        activeTab === 'preview' ? 'bg-teal text-white shadow-sm' : 'text-navy hover:bg-teal/10 hover:text-teal'
                      }`}
                    >
                      <Eye className={`w-4 h-4 ${activeTab === 'preview' ? 'text-white' : 'text-teal'}`} />
                      <span>Preview Journey</span>
                    </button>
                  </div>

                  <hr className="border-border/60" />

                  {/* Category: PROMOTION */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold text-muted tracking-widest uppercase px-3 block">Promotion</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('promote')}
                      className={`w-full px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                        activeTab === 'promote' ? 'bg-teal text-white shadow-sm' : 'text-navy hover:bg-teal/10 hover:text-teal'
                      }`}
                    >
                      <Megaphone className={`w-4 h-4 ${activeTab === 'promote' ? 'text-white' : 'text-teal'}`} />
                      <span>Promote Package</span>
                    </button>
                  </div>

                  <hr className="border-border/60" />

                  {/* Category: OPERATIONS */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold text-muted tracking-widest uppercase px-3 block">Operations</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('bookings')}
                      className={`w-full px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                        activeTab === 'bookings' ? 'bg-teal text-white shadow-sm' : 'text-navy hover:bg-teal/10 hover:text-teal'
                      }`}
                    >
                      <Users className={`w-4 h-4 ${activeTab === 'bookings' ? 'text-white' : 'text-teal'}`} />
                      <span>View Bookings</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('departures')}
                      className={`w-full px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                        activeTab === 'departures' ? 'bg-teal text-white shadow-sm' : 'text-navy hover:bg-teal/10 hover:text-teal'
                      }`}
                    >
                      <Calendar className={`w-4 h-4 ${activeTab === 'departures' ? 'text-white' : 'text-teal'}`} />
                      <span>Manage Departures</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('operations')}
                      className={`w-full px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                        activeTab === 'operations' ? 'bg-teal text-white shadow-sm' : 'text-navy hover:bg-teal/10 hover:text-teal'
                      }`}
                    >
                      <Bus className={`w-4 h-4 ${activeTab === 'operations' ? 'text-white' : 'text-teal'}`} />
                      <span>Trip Operations</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('performance')}
                      className={`w-full px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                        activeTab === 'performance' ? 'bg-teal text-white shadow-sm' : 'text-navy hover:bg-teal/10 hover:text-teal'
                      }`}
                    >
                      <BarChart3 className={`w-4 h-4 ${activeTab === 'performance' ? 'text-white' : 'text-teal'}`} />
                      <span>View Performance</span>
                    </button>
                  </div>

                  <hr className="border-border/60" />

                  {/* Category: DOWNLOADS */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold text-muted tracking-widest uppercase px-3 block">Downloads</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('downloads')}
                      className={`w-full px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                        activeTab === 'downloads' ? 'bg-teal text-white shadow-sm' : 'text-navy hover:bg-teal/10 hover:text-teal'
                      }`}
                    >
                      <Download className={`w-4 h-4 ${activeTab === 'downloads' ? 'text-white' : 'text-teal'}`} />
                      <span>Downloads Suite</span>
                    </button>
                  </div>

                  <hr className="border-border/60" />

                  {/* Category: STATUS */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold text-muted tracking-widest uppercase px-3 block">Status</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('status')}
                      className={`w-full px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                        activeTab === 'status' ? 'bg-teal text-white shadow-sm' : 'text-navy hover:bg-teal/10 hover:text-teal'
                      }`}
                    >
                      <Settings className={`w-4 h-4 ${activeTab === 'status' ? 'text-white' : 'text-teal'}`} />
                      <span>Package Status</span>
                    </button>
                  </div>

                  <hr className="border-border/60" />

                  {/* Category: OTHER */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold text-muted tracking-widest uppercase px-3 block">Other</span>
                    <button
                      type="button"
                      onClick={() => handleToggleArchive(activeManagementPkg)}
                      className="w-full px-3 py-2 rounded-lg text-left text-xs font-semibold text-navy hover:bg-teal/10 hover:text-teal flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Archive className="w-4 h-4 text-teal" />
                      <span>{activeManagementPkg.status === 'archived' ? 'Restore Package' : 'Archive Package'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('delete')}
                      className={`w-full px-3 py-2 rounded-lg text-left text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
                        activeTab === 'delete' ? 'bg-red-600 text-white shadow-sm' : 'text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <Trash2 className={`w-4 h-4 ${activeTab === 'delete' ? 'text-white' : 'text-red-500'}`} />
                      <span>Delete Package</span>
                    </button>
                  </div>
                </nav>
              </div>

              {/* Right Content Workspace Workspace */}
              <div className="flex-1 p-6 overflow-y-auto bg-page/30 flex flex-col justify-between">
                
                {/* Active view component router */}
                <div className="flex-1">
                  
                  {/* PREVIEW JOURNEY TAB */}
                  {activeTab === 'preview' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-border">
                        <div>
                          <h3 className="font-bold text-navy text-base">Traveler Journey Preview</h3>
                          <p className="text-xs text-muted">Test how clients view and register for this package</p>
                        </div>
                        <div className="flex gap-2 bg-navy/5 p-1 rounded-lg border border-border">
                          <button
                            type="button"
                            onClick={() => setPreviewMode('mobile')}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                              previewMode === 'mobile' ? 'bg-white shadow text-teal' : 'text-muted hover:text-navy'
                            }`}
                          >
                            <Smartphone className="w-3.5 h-3.5" />
                            <span>Mobile</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setPreviewMode('desktop')}
                            className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                              previewMode === 'desktop' ? 'bg-white shadow text-teal' : 'text-muted hover:text-navy'
                            }`}
                          >
                            <Laptop className="w-3.5 h-3.5" />
                            <span>Desktop</span>
                          </button>
                        </div>
                      </div>

                      {/* Rendering Mobile Frame Mockup */}
                      {previewMode === 'mobile' ? (
                        <div className="flex justify-center py-4 bg-navy/5 rounded-xl border border-border/50">
                          {/* Outer phone container */}
                          <div className="relative w-[310px] h-[550px] bg-black rounded-[38px] border-[8px] border-navy/90 shadow-2xl flex flex-col overflow-hidden select-none">
                            {/* Device Notch */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center">
                              <div className="w-8 h-1 bg-slate-800 rounded-full" />
                            </div>

                            {/* Internal scrollable viewport screen */}
                            <div className="flex-1 overflow-y-auto bg-navy text-white text-[11px] pb-12 scrollbar-none pt-6 relative">
                              {/* Hero Card Image */}
                              <div className="relative h-32 w-full bg-slate-900">
                                <img
                                  src={activeManagementPkg.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'}
                                  alt="Mobile Preview"
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/35 to-transparent" />
                                <span className="absolute top-2 left-3 bg-teal/90 text-navy font-bold px-2 py-0.5 rounded text-[9px] uppercase">{activeManagementPkg.destination}</span>
                              </div>

                              {/* Title Info */}
                              <div className="p-3 space-y-1 bg-navy/95 border-b border-white/5">
                                <h4 className="text-xs font-bold leading-tight text-white">{activeManagementPkg.title}</h4>
                                <div className="flex items-center justify-between text-[9px] text-slate-400">
                                  <span>{activeManagementPkg.duration || `${activeManagementPkg.days} days / ${activeManagementPkg.nights} nights`}</span>
                                  <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" /> {activeManagementPkg.rating || '4.8'}</span>
                                </div>
                              </div>

                              {/* Highlights section */}
                              <div className="p-3 space-y-2 border-b border-white/5">
                                <span className="text-[9px] uppercase tracking-wider font-bold text-teal">Inclusions Included</span>
                                <div className="grid grid-cols-2 gap-2 text-slate-300">
                                  {activeManagementPkg.inclusions?.map((inc, i) => (
                                    <div key={i} className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded">
                                      <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0" />
                                      <span className="truncate">{inc}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Description */}
                              <div className="p-3 space-y-1.5 border-b border-white/5">
                                <span className="text-[9px] uppercase tracking-wider font-bold text-teal">About this Tour</span>
                                <p className="text-slate-400 leading-normal text-[10px]">{activeManagementPkg.description || 'Join this curated holiday escape with boutique stays, transfers, and private guide services.'}</p>
                              </div>

                              {/* Days Itinerary Accordions list */}
                              <div className="p-3 space-y-2">
                                <span className="text-[9px] uppercase tracking-wider font-bold text-teal">Itinerary Schedule</span>
                                <div className="space-y-1.5">
                                  <div className="p-2 rounded bg-white/5 border border-white/10">
                                    <strong className="text-white block font-bold">Day 1: Arrival & Briefing</strong>
                                    <span className="text-[9px] text-slate-400 leading-relaxed block mt-1">Arrival at local terminal, pick up by driver, transfer to hotel check-in and evening brief.</span>
                                  </div>
                                  <div className="p-2 rounded bg-white/5 border border-white/10 opacity-70">
                                    <strong className="text-white block font-bold">Day 2: Full Day Guided Exploration</strong>
                                    <span className="text-[9px] text-slate-400 leading-relaxed block mt-1">Local highlights tour and outdoor scenic walks. Dinner included.</span>
                                  </div>
                                </div>
                              </div>

                              {/* Sticky booking layout simulator */}
                              <div className="absolute bottom-0 inset-x-0 bg-navy-light/95 border-t border-white/10 px-3 py-2 flex items-center justify-between z-20">
                                <div className="space-y-0.5">
                                  <span className="text-[9px] text-slate-400 block line-through">{formatCurrency(activeManagementPkg.price)}</span>
                                  <span className="text-xs font-bold text-teal font-mono">{formatCurrency(activeManagementPkg.price * (1 - activeManagementPkg.discount / 100))}</span>
                                </div>
                                <button type="button" className="bg-teal text-navy font-bold rounded-lg px-3 py-1.5 text-[10px] cursor-not-allowed">Book Now</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Desktop Card style */
                        <div className="bg-navy/5 p-4 rounded-xl border border-border flex flex-col md:flex-row gap-5">
                          <div className="w-full md:w-2/5 h-44 rounded-lg overflow-hidden shrink-0">
                            <img
                              src={activeManagementPkg.image}
                              alt="Desktop Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex justify-between items-start">
                              <h4 className="text-navy font-extrabold text-lg leading-tight">{activeManagementPkg.title}</h4>
                              <span className="text-xs font-bold text-teal bg-teal/10 border border-teal/20 px-2 py-0.5 rounded capitalize">{activeManagementPkg.destination}</span>
                            </div>
                            <p className="text-muted text-xs leading-relaxed">{activeManagementPkg.description}</p>
                            
                            <div className="flex gap-4 items-center pt-2 text-xs text-muted border-t border-border/40">
                              <span>Duration: <strong>{activeManagementPkg.duration || `${activeManagementPkg.days} Days`}</strong></span>
                              <span>Inclusions: <strong>{activeManagementPkg.inclusions?.join(', ')}</strong></span>
                              <span>Current bookings: <strong>{activeManagementPkg.bookings} / {activeManagementPkg.capacity} spots</strong></span>
                            </div>

                            <div className="pt-2 flex items-baseline gap-2">
                              <span className="text-xl font-extrabold text-teal font-mono">{formatCurrency(activeManagementPkg.price * (1 - activeManagementPkg.discount / 100))}</span>
                              {activeManagementPkg.discount > 0 && (
                                <span className="text-xs text-muted line-through font-mono">{formatCurrency(activeManagementPkg.price)}</span>
                              )}
                              <span className="text-[11px] font-bold text-teal">({activeManagementPkg.discount}% discount applied)</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* PROMOTE PACKAGE TAB */}
                  {activeTab === 'promote' && (
                    <div className="space-y-5">
                      <div className="pb-2 border-b border-border">
                        <h3 className="font-bold text-navy text-base">Platform Promotion Center</h3>
                        <p className="text-xs text-muted">Generate instant booking captions, marketing graphics and QR cards</p>
                      </div>

                      {/* Social Selector Row */}
                      <div className="flex flex-wrap gap-2">
                        {['instagram', 'whatsapp', 'facebook', 'linkedin', 'telegram'].map((plat) => (
                          <button
                            key={plat}
                            type="button"
                            onClick={() => setPromoPlatform(plat)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer border ${
                              promoPlatform === plat
                                ? 'bg-teal border-teal text-white shadow-sm'
                                : 'bg-surface border-border text-navy hover:bg-teal/5 hover:text-teal'
                            }`}
                          >
                            {plat}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {/* Auto Generated Caption Copy Block */}
                        <div className="space-y-3 bg-surface p-4 rounded-xl border border-border">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-teal uppercase tracking-wider">Generated Booking Caption</span>
                            <button
                              type="button"
                              onClick={() => handleCopyToClipboard(getPromoContent(activeManagementPkg, promoPlatform), 'caption')}
                              className="text-xs font-semibold text-teal hover:underline flex items-center gap-1.5 cursor-pointer"
                            >
                              {copiedCaption ? <Check className="w-3.5 h-3.5 text-teal" /> : <Copy className="w-3.5 h-3.5 text-teal" />}
                              <span>{copiedCaption ? 'Copied!' : 'Copy Caption'}</span>
                            </button>
                          </div>
                          <textarea
                            readOnly
                            value={getPromoContent(activeManagementPkg, promoPlatform)}
                            rows={8}
                            className="w-full bg-navy/5 border border-border/80 rounded-lg p-3 text-xs text-navy font-medium font-sans focus:outline-none focus:border-teal select-all leading-relaxed"
                          />
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleCopyToClipboard(`https://beaconplanner.com/book/${activeManagementPkg.id}`, 'link')}
                              className="flex-1 bg-teal/10 hover:bg-teal/20 text-teal border border-teal/20 hover:border-teal/30 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                            >
                              {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
                              <span>{copiedLink ? 'Link Copied!' : 'Copy Public Booking Link'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Interactive Flyer preview / downloads center */}
                        <div className="space-y-4 bg-surface p-4 rounded-xl border border-border flex flex-col justify-between">
                          <div>
                            <span className="text-xs font-bold text-teal uppercase tracking-wider block mb-3">Available Marketing Downloads</span>
                            <div className="grid grid-cols-2 gap-2.5">
                              {[
                                { name: 'Instagram Carousel', ext: 'ZIP / PNG' },
                                { name: 'Instagram Story Layout', ext: 'PNG' },
                                { name: 'WhatsApp Status Card', ext: 'JPG' },
                                { name: 'Facebook Banner Layout', ext: 'JPG' },
                                { name: 'Printable Poster (A4)', ext: 'PDF' },
                                { name: 'PDF Flyer Brochure', ext: 'PDF' }
                              ].map((item, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    const toastId = toast.loading(`Generating asset: ${item.name}...`)
                                    setTimeout(() => {
                                      toast.dismiss(toastId)
                                      toast.success(`${item.name} file generated and downloaded successfully!`)
                                    }, 1200)
                                  }}
                                  className="p-2.5 rounded-lg border border-border hover:border-teal/30 hover:bg-teal/5 transition-all text-left group flex flex-col justify-between cursor-pointer"
                                >
                                  <span className="text-xs font-bold text-navy leading-tight group-hover:text-teal transition-colors">{item.name}</span>
                                  <span className="text-[9px] text-muted font-bold mt-1 font-mono">{item.ext}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* QR Code utility preview */}
                          <div className="flex items-center gap-4 bg-navy/5 p-3 rounded-lg border border-border/80 mt-2">
                            <div className="w-12 h-12 bg-white rounded border border-border flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group">
                              {/* Mock QR SVG representation */}
                              <svg className="w-10 h-10 text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-4-4h2v2h-2v-2zm2 2h2v2h-2v-2zm-4 2h2v2h-2v-2zm-2-6h2v2h-2V9zm4 0h2v2h-2V9zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2z" />
                              </svg>
                            </div>
                            <div className="space-y-1">
                              <h5 className="text-xs font-bold text-navy">Unique Package QR Code</h5>
                              <p className="text-[10px] text-muted">Scan leads directly to registration checkouts</p>
                              <button
                                type="button"
                                onClick={() => {
                                  toast.success('QR Code image asset downloaded!')
                                }}
                                className="text-[10px] font-bold text-teal hover:underline block cursor-pointer text-left"
                              >
                                Download QR PNG
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DEPARTURES BATCH MANAGEMENT TAB */}
                  {activeTab === 'departures' && (
                    <div className="space-y-5">
                      <div className="pb-2 border-b border-border flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div>
                          <h3 className="font-bold text-navy text-base">Departure Batches and Seats Control</h3>
                          <p className="text-xs text-muted">Manage scheduled calendar runs, bookings capacity, and closing deadlines</p>
                        </div>
                      </div>

                      {/* Add Departure batched form */}
                      <div className="bg-surface p-4 rounded-xl border border-border space-y-3">
                        <span className="text-xs font-bold text-teal uppercase tracking-wider block">Schedule New Departure Batch</span>
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                          <div className="space-y-1">
                            <label className="text-[10px] text-muted font-bold block" htmlFor="dep-date-input">Departure Date</label>
                            <input
                              id="dep-date-input"
                              type="date"
                              value={newDepDate}
                              onChange={(e) => setNewDepDate(e.target.value)}
                              className="w-full bg-page border border-border rounded-lg px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-muted font-bold block" htmlFor="dep-cap-input">Total Capacity</label>
                            <input
                              id="dep-cap-input"
                              type="number"
                              value={newDepCap}
                              onChange={(e) => setNewDepCap(parseInt(e.target.value) || 20)}
                              className="w-full bg-page border border-border rounded-lg px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium font-mono"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-muted font-bold block" htmlFor="dep-deadline-input">Booking Deadline</label>
                            <input
                              id="dep-deadline-input"
                              type="date"
                              value={newDepDeadline}
                              onChange={(e) => setNewDepDeadline(e.target.value)}
                              className="w-full bg-page border border-border rounded-lg px-3 py-1.5 text-xs text-navy focus:outline-none focus:border-teal font-medium"
                            />
                          </div>
                          <Button
                            type="button"
                            onClick={handleAddDeparture}
                            className="w-full font-bold text-xs py-1.5 shadow-sm"
                          >
                            Schedule Batch
                          </Button>
                        </div>
                      </div>

                      {/* Departures lists table */}
                      <div className="overflow-x-auto rounded-xl border border-border">
                        <table className="w-full border-collapse text-left text-xs bg-surface">
                          <thead>
                            <tr className="bg-navy/5 border-b border-border text-muted font-bold uppercase tracking-wider text-[9px]">
                              <th className="px-4 py-3">Departure Date</th>
                              <th className="px-4 py-3">Capacity</th>
                              <th className="px-4 py-3">Booked / Left</th>
                              <th className="px-4 py-3">Deadline</th>
                              <th className="px-4 py-3">Status</th>
                              <th className="px-4 py-3 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60">
                            {activeDepartures.map((dep) => (
                              <tr key={dep.id} className="hover:bg-teal/5 transition-colors">
                                <td className="px-4 py-3 font-semibold text-navy flex items-center gap-2">
                                  <Calendar className="w-3.5 h-3.5 text-teal shrink-0" />
                                  <span>{dep.date}</span>
                                </td>
                                <td className="px-4 py-3 font-mono font-medium text-navy">{dep.capacity} seats</td>
                                <td className="px-4 py-3 font-mono font-medium text-navy">
                                  <span className="text-teal font-bold">{dep.booked}</span> / <span className={dep.remaining <= 3 ? 'text-amber-500 font-extrabold' : ''}>{dep.remaining} remaining</span>
                                </td>
                                <td className="px-4 py-3 text-muted">{dep.deadline}</td>
                                <td className="px-4 py-3">
                                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                                    dep.status === 'Closed' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                    dep.status === 'Almost Full' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                    dep.status === 'Cancelled' ? 'bg-gray-500/10 text-gray-500 border border-gray-500/20' :
                                    'bg-green-500/10 text-green-500 border border-green-500/20'
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      dep.status === 'Closed' ? 'bg-red-500' :
                                      dep.status === 'Almost Full' ? 'bg-amber-500' :
                                      dep.status === 'Cancelled' ? 'bg-gray-500' :
                                      'bg-green-500'
                                    }`} />
                                    <span>{dep.status}</span>
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-right space-x-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateDepStatus(dep.id, 'Closed', 'Close Booking')}
                                    disabled={dep.status === 'Closed' || dep.status === 'Cancelled'}
                                    className="text-[10px] font-bold text-red-500 hover:underline disabled:opacity-30 cursor-pointer"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleExtendDepDeadline(dep.id)}
                                    disabled={dep.status === 'Cancelled'}
                                    className="text-[10px] font-bold text-teal hover:underline disabled:opacity-30 cursor-pointer"
                                  >
                                    Extend
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleUpdateDepStatus(dep.id, 'Cancelled', 'Cancel Departure')}
                                    disabled={dep.status === 'Cancelled'}
                                    className="text-[10px] font-bold text-muted hover:underline disabled:opacity-30 cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* VIEW PERFORMANCE STATS TAB */}
                  {activeTab === 'performance' && (
                    <div className="space-y-5">
                      <div className="pb-2 border-b border-border">
                        <h3 className="font-bold text-navy text-base">Package Performance Analytics</h3>
                        <p className="text-xs text-muted">Track view statistics, conversion flows and revenue outcomes</p>
                      </div>

                      {/* KPIs Matrix Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { label: 'Total Page Views', value: '1,842 views', trend: '+14% this month' },
                          { label: 'Shares Count', value: '312 shares', trend: '+8% this month' },
                          { label: 'Inquiries Received', value: '89 requests', trend: '20 pending replies' },
                          { label: 'Conversion Rate', value: '18.4%', trend: '1.2% higher avg' },
                          { label: 'Revenue Generated', value: formatCurrency(activeManagementPkg.price * (activeManagementPkg.bookings || 14) * 0.95), trend: 'Net payments confirmed' },
                          { label: 'Repeat Clients', value: '12%', trend: '3 recurring profiles' },
                          { label: 'Average Rating', value: `${activeManagementPkg.rating} / 5.0`, trend: 'Based on traveler reviews' },
                          { label: 'Cancellation Rate', value: '2.1%', trend: 'Industry standard' }
                        ].map((stat, idx) => (
                          <div key={idx} className="bg-surface p-4 rounded-xl border border-border space-y-1">
                            <span className="text-[10px] text-muted font-bold block uppercase tracking-wider">{stat.label}</span>
                            <span className="text-lg font-extrabold text-navy font-mono block">{stat.value}</span>
                            <span className="text-[9px] text-teal font-semibold block">{stat.trend}</span>
                          </div>
                        ))}
                      </div>

                      {/* Graphs and Charts */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {/* Weekly Traffic bar chart mockup */}
                        <div className="bg-surface p-4 rounded-xl border border-border space-y-4">
                          <span className="text-xs font-bold text-teal uppercase tracking-wider block">Weekly Conversion Traffic (Views / Bookings)</span>
                          
                          <div className="flex items-end justify-between h-40 pt-4 border-b border-border/80">
                            {[
                              { label: 'Week 1', views: 'h-16 bg-teal/40', bkg: 'h-6 bg-teal' },
                              { label: 'Week 2', views: 'h-24 bg-teal/40', bkg: 'h-10 bg-teal' },
                              { label: 'Week 3', views: 'h-32 bg-teal/40', bkg: 'h-14 bg-teal' },
                              { label: 'Week 4', views: 'h-20 bg-teal/40', bkg: 'h-8 bg-teal' }
                            ].map((w, idx) => (
                              <div key={idx} className="flex flex-col items-center gap-1.5 w-1/5">
                                <div className="flex items-end gap-1 w-full justify-center">
                                  {/* Views bar */}
                                  <div className={`w-3.5 ${w.views} rounded-t-sm`} title="Views" />
                                  {/* Bookings bar */}
                                  <div className={`w-3.5 ${w.bkg} rounded-t-sm`} title="Bookings" />
                                </div>
                                <span className="text-[9px] text-muted font-bold">{w.label}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-4 text-[9px] font-bold text-muted justify-center">
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-teal/40 rounded-sm" /> Page Views</span>
                            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-teal rounded-sm" /> Completed Bookings</span>
                          </div>
                        </div>

                        {/* Conversion Donut Representation */}
                        <div className="bg-surface p-4 rounded-xl border border-border space-y-3">
                          <span className="text-xs font-bold text-teal uppercase tracking-wider block">Marketing Conversion Funnel</span>
                          <div className="space-y-2.5 pt-2">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-bold text-navy">
                                <span>Impressions / Views</span>
                                <span className="font-mono">1,842 (100%)</span>
                              </div>
                              <div className="w-full h-2 bg-navy/5 rounded-full overflow-hidden">
                                <div className="h-full bg-teal w-full" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-bold text-navy">
                                <span>Enquiry Form Interactions</span>
                                <span className="font-mono">364 (19.7%)</span>
                              </div>
                              <div className="w-full h-2 bg-navy/5 rounded-full overflow-hidden">
                                <div className="h-full bg-teal/70 w-[20%]" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-bold text-navy">
                                <span>Initiated Booking Customizations</span>
                                <span className="font-mono">89 (4.8%)</span>
                              </div>
                              <div className="w-full h-2 bg-navy/5 rounded-full overflow-hidden">
                                <div className="h-full bg-teal/50 w-[5%]" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between text-[10px] font-bold text-navy">
                                <span>Confirmed Paid Spots</span>
                                <span className="font-mono">24 (1.3%)</span>
                              </div>
                              <div className="w-full h-2 bg-navy/5 rounded-full overflow-hidden">
                                <div className="h-full bg-teal/30 w-[1.5%]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TRIP OPERATIONS TAB */}
                  {activeTab === 'operations' && (
                    <div className="space-y-5">
                      <div className="pb-2 border-b border-border">
                        <h3 className="font-bold text-navy text-base">Trip Operations and Live Departures</h3>
                        <p className="text-xs text-muted">Manage logistic actions, room upgrades and cancellations post-booking</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            title: 'Low Occupancy Actions',
                            desc: 'Merge departures or broadcast alternate dates to customers when a batch fails to meet minimum sizes.',
                            btnText: 'Launch Merge Wizard',
                            onClick: () => {
                              toast.info('Alternate package offers broadcasted in draft status to 4 travellers.')
                            }
                          },
                          {
                            title: 'Traveller Request Manager',
                            desc: 'Review custom room upgrade requests, meal changes, or itinerary modification approvals.',
                            btnText: 'Open Upgrade Engine',
                            onClick: () => {
                              toast.success('Approved room upgrade from standard to deluxe overwater villa.')
                            }
                          },
                          {
                            title: 'Package Transfers',
                            desc: 'Transfer travellers from this cancelled or delayed departure to a new seasonal package.',
                            btnText: 'Perform Bulk Transfer',
                            onClick: () => {
                              toast.info('Initiated draft transfer. Please select target date.')
                            }
                          },
                          {
                            title: 'Operational Schedule Timelines',
                            desc: 'Assign tour guides, drivers, local contacts, and distribute itineraries.',
                            btnText: 'Allocate Dispatch Crew',
                            onClick: () => {
                              toast.success('Assigned Aarav Mehta (Guide) and Premium Sprinter (Transport).')
                            }
                          }
                        ].map((op, idx) => (
                          <div key={idx} className="bg-surface p-4 rounded-xl border border-border flex flex-col justify-between space-y-3">
                            <div className="space-y-1">
                              <h4 className="text-xs font-extrabold text-navy">{op.title}</h4>
                              <p className="text-[11px] text-muted leading-relaxed">{op.desc}</p>
                            </div>
                            <button
                              type="button"
                              onClick={op.onClick}
                              className="w-full bg-teal/10 hover:bg-teal text-teal hover:text-navy border border-teal/20 hover:border-teal py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center"
                            >
                              {op.btnText}
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Trip operations page route quick links */}
                      <div className="bg-teal/5 p-4 rounded-xl border border-teal/20 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                        <div className="space-y-1">
                          <h4 className="text-xs font-extrabold text-navy flex items-center gap-1.5">
                            <Bus className="w-4 h-4 text-teal" />
                            <span>Looking for full post-booking operational console?</span>
                          </h4>
                          <p className="text-[11px] text-muted">Access dispatch calendars, emergency contact numbers, and payment verifications.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveManagementPkg(null)
                            navigate('/dashboard/trip-operations')
                          }}
                          className="bg-teal text-navy font-bold rounded-lg px-4 py-2 text-xs shrink-0 cursor-pointer shadow-sm"
                        >
                          Go to Trip Operations Page
                        </button>
                      </div>
                    </div>
                  )}

                  {/* DOWNLOADS SUITE TAB */}
                  {activeTab === 'downloads' && (
                    <div className="space-y-5">
                      <div className="pb-2 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-navy text-base">Package Downloads and Printables</h3>
                          <p className="text-xs text-muted">Generate high-fidelity flyer brochures, detailed itinerary schedules, and quotation invoices</p>
                        </div>
                        <Button 
                          glow 
                          size="sm" 
                          onClick={() => handleDownloadAllSuiteDocs(activeManagementPkg)}
                          disabled={downloadingPdfId === activeManagementPkg?.id}
                        >
                          <FileDown className="w-4 h-4 mr-1.5" /> Download Full Suite
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {[
                          { name: 'Package PDF Brochure', desc: 'Standard visual traveller guide featuring images and highlights.', size: '1.8 MB', action: () => handleDownloadAllSuiteDocs(activeManagementPkg) },
                          { name: 'Detailed Day Itinerary', desc: 'Full text day-by-day plan with inclusions list in printing format.', size: '920 KB', action: () => handleDownloadAllSuiteDocs(activeManagementPkg) },
                          { name: 'Quotation Invoice Template', desc: 'Detailed cost breakdown list, GST inputs, and payment policies sheet.', size: '450 KB', action: () => handleDownloadAllSuiteDocs(activeManagementPkg) },
                          { name: 'Printable Flyer Poster', desc: 'A4 size commercial template highlighting contact details and bookings URL.', size: '2.4 MB', action: () => handleDownloadAllSuiteDocs(activeManagementPkg) },
                          { name: 'Public QR Code flyer', desc: 'High resolution code graphic for offline marketing stands.', size: '520 KB', action: () => handleDownloadAllSuiteDocs(activeManagementPkg) },
                          { name: 'Itinerary Image Gallery ZIP', desc: 'High-res folder containing all uploaded assets for this package.', size: '42.8 MB', action: () => handleDownloadAllSuiteDocs(activeManagementPkg) }
                        ].map((file, idx) => (
                          <div key={idx} className="bg-surface p-4 rounded-xl border border-border flex items-center justify-between gap-4">
                            <div className="space-y-1">
                              <span className="text-xs font-bold text-navy block leading-tight">{file.name}</span>
                              <span className="text-[10px] text-muted block">{file.desc}</span>
                              <span className="text-[9px] text-muted font-bold block font-mono">{file.size}</span>
                            </div>
                            <button
                              type="button"
                              onClick={file.action}
                              className="w-10 h-10 rounded-full bg-navy/5 hover:bg-teal/10 text-muted hover:text-teal flex items-center justify-center transition-colors shrink-0 cursor-pointer"
                            >
                              <FileDown className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PACKAGE VISIBILITY STATUS TAB */}
                  {activeTab === 'status' && (
                    <div className="space-y-5">
                      <div className="pb-2 border-b border-border">
                        <h3 className="font-bold text-navy text-base">Package Visibility Status</h3>
                        <p className="text-xs text-muted">Change package state. Updating this immediately syncs user discoverability lists</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: 'published', label: 'Published 🟢', color: 'border-green-500/30 hover:bg-green-500/5', desc: 'Visible to all customers. Booking options active.' },
                          { id: 'draft', label: 'Draft 🟡', color: 'border-amber-500/30 hover:bg-amber-500/5', desc: 'Only visible inside planner dashboard. Unlisted in active directories.' },
                          { id: 'scheduled', label: 'Scheduled 🔵', color: 'border-blue-500/30 hover:bg-blue-500/5', desc: 'Will publish automatically based on batch timers.' },
                          { id: 'fully booked', label: 'Fully Booked 🟠', color: 'border-orange-500/30 hover:bg-orange-500/5', desc: 'Keeps cards visible in lists, but locks registration flows.' },
                          { id: 'cancelled', label: 'Cancelled 🔴', color: 'border-red-500/30 hover:bg-red-500/5', desc: 'Marks package visually as cancelled. Stops payments.' },
                          { id: 'archived', label: 'Archived ⚫', color: 'border-gray-500/30 hover:bg-gray-500/5', desc: 'Completely hidden. Bookings records and statistics retained.' }
                        ].map((stat) => (
                          <button
                            key={stat.id}
                            type="button"
                            onClick={() => handleUpdateVisibilityStatus(activeManagementPkg.id, stat.id)}
                            className={`p-4 rounded-xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer ${stat.color} ${
                              activeManagementPkg.status === stat.id
                                ? 'bg-teal/5 border-teal border-2 ring-1 ring-teal/30 shadow'
                                : 'bg-surface border-border'
                            }`}
                          >
                            <span className="text-xs font-bold text-navy block capitalize">{stat.label}</span>
                            <span className="text-[10px] text-muted leading-relaxed block">{stat.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* VIEW BOOKINGS TAB */}
                  {activeTab === 'bookings' && (
                    <div className="space-y-5 flex-1 flex flex-col h-full overflow-hidden">
                      <div className="pb-2 border-b border-border flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-navy text-base">Traveler Bookings</h3>
                          <p className="text-xs text-muted">Manage active reservations, payments, and seats for this package</p>
                        </div>
                        <span className="text-xs font-bold text-teal bg-teal/10 px-2.5 py-1 rounded-full border border-teal/20">
                          {bookings.filter(b => b.packageId === activeManagementPkg.id && b.status !== 'cancelled').length} Active Bookings
                        </span>
                      </div>

                      <div className="flex-1 overflow-y-auto pr-1">
                        {bookings.filter(b => b.packageId === activeManagementPkg.id).length === 0 ? (
                          <EmptyState
                            icon={<Users className="w-8 h-8 text-muted/60" />}
                            title="No bookings yet"
                            description="Reservations will appear here once travelers book this package."
                          />
                        ) : (
                          <div className="border border-border rounded-xl overflow-hidden bg-surface">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-navy/5 text-navy font-bold border-b border-border/80 text-[10px] uppercase tracking-wider">
                                  <th className="p-3">Booking ID</th>
                                  <th className="p-3">Traveler</th>
                                  <th className="p-3">Travel Date</th>
                                  <th className="p-3">Seats</th>
                                  <th className="p-3">Paid / Amount</th>
                                  <th className="p-3">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border/60">
                                {bookings
                                  .filter(b => b.packageId === activeManagementPkg.id)
                                  .map((b) => (
                                    <tr key={b.id} className="hover:bg-navy/5 transition-colors font-medium">
                                      <td className="p-3 font-mono font-bold text-navy">{b.id}</td>
                                      <td className="p-3">
                                        <div className="text-navy font-semibold">{b.traveler}</div>
                                        <div className="text-[10px] text-muted">{b.email}</div>
                                      </td>
                                      <td className="p-3 text-muted">{b.travelDate}</td>
                                      <td className="p-3 text-navy font-bold">{b.travelersCount || 1}</td>
                                      <td className="p-3">
                                        <div className="text-teal font-bold">{formatCurrency(b.amountPaid || b.amount)}</div>
                                        <div className="text-[9px] text-muted leading-tight uppercase font-bold">{b.paymentStatus}</div>
                                      </td>
                                      <td className="p-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold capitalize border ${
                                          b.status === 'confirmed'
                                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'
                                            : b.status === 'pending'
                                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-600'
                                            : 'bg-rose-500/10 border-rose-500/20 text-rose-600'
                                        }`}>
                                          {b.status}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* DELETE PACKAGE TAB */}
                  {activeTab === 'delete' && (
                    <div className="space-y-4">
                      <div className="pb-2 border-b border-border">
                        <h3 className="font-bold text-red-600 text-base">Danger Zone</h3>
                        <p className="text-xs text-muted">Archive or permanently delete this travel package from storage</p>
                      </div>

                      {activeManagementPkg.bookings > 0 ? (
                        /* Deletion Blocked */
                        <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                          <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <h4 className="text-xs font-extrabold text-navy">Package Cannot Be Deleted</h4>
                              <p className="text-[11px] text-muted leading-relaxed">
                                You cannot delete <span className="font-semibold text-navy">"{activeManagementPkg.title}"</span> because it currently has <span className="font-extrabold text-navy">{activeManagementPkg.bookings} active bookings</span>.
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-[11px] text-muted leading-relaxed">
                            To protect traveler histories and financial invoices, active packages cannot be removed. We recommend **Archiving** this package instead. Archiving immediately hides the package from search directories while retaining logs.
                          </p>

                          <div className="flex gap-3 pt-2">
                            <Button
                              type="button"
                              onClick={() => handleToggleArchive(activeManagementPkg)}
                              className="font-bold text-xs"
                            >
                              {activeManagementPkg.status === 'archived' ? 'Restore Package' : 'Archive Package'}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        /* Deletion Allowed */
                        <div className="p-5 rounded-xl bg-red-500/10 border border-red-500/30 space-y-4">
                          <div className="flex gap-3">
                            <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                              <h4 className="text-xs font-extrabold text-navy">Permanent Deletion Warning</h4>
                              <p className="text-[11px] text-muted leading-relaxed">
                                You are about to permanently delete <span className="font-semibold text-navy">"{activeManagementPkg.title}"</span>. This action is absolute and cannot be undone.
                              </p>
                            </div>
                          </div>

                          <p className="text-[11px] text-muted leading-relaxed">
                            Deleting this package will permanently clear all daily itineraries, customized accommodations, pricing lists, and uploaded marketing assets.
                          </p>

                          <div className="flex gap-3 pt-2">
                            <Button
                              type="button"
                              variant="danger"
                              onClick={handleConfirmDelete}
                              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                            >
                              Yes, Delete Permanently
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setActiveManagementPkg(null)}
                              className="text-xs"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>

                {/* Bottom navigation quick metadata helper */}
                <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between text-[10px] text-muted font-semibold bg-navy/5 -mx-6 -mb-6 p-4">
                  <span>Authorized Planner Session</span>
                  <span>Beacon Planner Platform v1.2</span>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal (Outside Management Center for backward compat) */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isDeleting && setDeleteTarget(null)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-surface border border-border rounded-[24px] shadow-2xl p-6 overflow-hidden space-y-4 z-10"
            >
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-page text-muted hover:text-navy transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">Delete Travel Package</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Are you sure you want to permanently delete <span className="font-semibold text-navy">"{deleteTarget.title}"</span>? This action will remove all associated itinerary, pricing, maps, and uploaded images.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2 border-t border-border/50">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={isDeleting}
                  onClick={() => setDeleteTarget(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  disabled={isDeleting}
                  onClick={handleConfirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-1" /> Deleting...
                    </>
                  ) : (
                    'Delete Package'
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
