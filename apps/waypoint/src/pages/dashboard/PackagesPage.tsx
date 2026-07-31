import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Star, Users, Plane, Pencil, Copy, MoreVertical, Trash2,
  FileDown, FileText, Loader2, AlertTriangle, X
} from 'lucide-react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { packages, deleteMockPackage, duplicateMockPackage } from '@/data/mockData'
import { deletePackage } from '@/services/api'
import { formatCurrency } from '@/lib/utils'
import { generatePackagePdf } from '@/utils/generatePackagePdf'
import { generateBlankPackageTemplatePdf } from '@/utils/generateBlankPackageTemplatePdf'
import { PackageImageGallery } from '@/components/dashboard/PackageImageGallery'

export default function PackagesPage() {
  const navigate = useNavigate()
  const [packageList, setPackageList] = useState(packages)

  // Dropdown menu state
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)

  // Delete modal states
  const [deleteTarget, setDeleteTarget] = useState<typeof packages[0] | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // PDF loading states
  const [downloadingPdfId, setDownloadingPdfId] = useState<string | null>(null)
  const [isGeneratingBlankTemplate, setIsGeneratingBlankTemplate] = useState(false)

  // Close dropdown menu when clicking anywhere outside
  useEffect(() => {
    const handleOutsideClick = () => setActiveMenuId(null)
    window.addEventListener('click', handleOutsideClick)
    return () => window.removeEventListener('click', handleOutsideClick)
  }, [])

  // Duplicate Handler
  const handleDuplicatePackage = (pkg: typeof packages[0], e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveMenuId(null)

    const duplicated = duplicateMockPackage(pkg.id)
    if (duplicated) {
      setPackageList([...packages])
      toast.success(`Package "${duplicated.title}" duplicated successfully.`)
    } else {
      const newId = `PKG-00${packageList.length + 1}`
      const copyPkg = {
        ...JSON.parse(JSON.stringify(pkg)),
        id: newId,
        title: `${pkg.title} (Copy)`,
      }
      setPackageList([copyPkg, ...packageList])
      toast.success(`Package "${copyPkg.title}" duplicated successfully.`)
    }
  }

  // PDF Download Handler from Card Menu
  const handleCardDownloadPdf = async (pkg: typeof packages[0], e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveMenuId(null)
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

  // Confirm Delete Handler
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    setIsDeleting(true)
    try {
      deleteMockPackage(deleteTarget.id)
      await deletePackage(deleteTarget.id).catch(() => {})
      setPackageList((prev) => prev.filter((p) => p.id !== deleteTarget.id))
      toast.success(`Package "${deleteTarget.title}" deleted successfully!`)
      setDeleteTarget(null)
    } catch {
      deleteMockPackage(deleteTarget.id)
      setPackageList((prev) => prev.filter((p) => p.id !== deleteTarget.id))
      toast.success(`Package "${deleteTarget.title}" deleted!`)
      setDeleteTarget(null)
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

          <Link to="/dashboard/packages/create">
            <Button glow className="gap-2 font-semibold">
              <Plus className="w-4 h-4" /> Create Package
            </Button>
          </Link>
        </div>
      </div>

      {packageList.length === 0 ? (
        <EmptyState
          icon={<Plane className="w-8 h-8" />}
          title="No packages found"
          description="Create your first travel package and start accepting bookings."
          actionLabel="Create Package"
          onAction={() => navigate('/dashboard/packages/create')}
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
              <Card hover className="p-0 overflow-hidden relative group rounded-[18px] border border-border shadow-sm hover:shadow-xl transition-all duration-300">
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

                  {/* Three-Dot (⋮) Overflow Menu Button */}
                  <div className="absolute top-3 right-3 z-30">
                    <button
                      type="button"
                      aria-label="Package Actions"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveMenuId(activeMenuId === pkg.id ? null : pkg.id)
                      }}
                      className="w-8 h-8 rounded-full bg-navy/60 hover:bg-navy text-white backdrop-blur-md flex items-center justify-center transition-all shadow-md cursor-pointer hover:scale-110 active:scale-95"
                    >
                      <MoreVertical className="w-4 h-4 stroke-[2.5]" />
                    </button>

                    {/* Smooth Animated Dropdown Menu */}
                    <AnimatePresence>
                      {activeMenuId === pkg.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 5 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 5 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 top-10 z-40 w-48 bg-surface border border-border rounded-[16px] shadow-2xl py-1.5 overflow-hidden backdrop-blur-xl"
                        >
                          {/* ✏️ Edit Package */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveMenuId(null)
                              navigate(`/dashboard/packages/edit/${pkg.id}`)
                            }}
                            className="w-full px-4 py-2.5 text-left text-xs font-semibold text-navy hover:bg-teal/10 hover:text-teal flex items-center gap-2.5 transition-colors cursor-pointer"
                          >
                            <Pencil className="w-4 h-4 text-teal" />
                            <span>Edit Package</span>
                          </button>

                          {/* 📄 Download PDF */}
                          <button
                            type="button"
                            disabled={downloadingPdfId === pkg.id}
                            onClick={(e) => handleCardDownloadPdf(pkg, e)}
                            className="w-full px-4 py-2.5 text-left text-xs font-semibold text-navy hover:bg-teal/10 hover:text-teal flex items-center gap-2.5 transition-colors cursor-pointer border-t border-border/40 disabled:opacity-50"
                          >
                            {downloadingPdfId === pkg.id ? (
                              <Loader2 className="w-4 h-4 animate-spin text-teal" />
                            ) : (
                              <FileDown className="w-4 h-4 text-teal" />
                            )}
                            <span>Download PDF</span>
                          </button>

                          {/* 📋 Duplicate Package */}
                          <button
                            type="button"
                            onClick={(e) => handleDuplicatePackage(pkg, e)}
                            className="w-full px-4 py-2.5 text-left text-xs font-semibold text-navy hover:bg-teal/10 hover:text-teal flex items-center gap-2.5 transition-colors cursor-pointer border-t border-border/40"
                          >
                            <Copy className="w-4 h-4 text-teal" />
                            <span>Duplicate Package</span>
                          </button>

                          {/* 🗑️ Delete Package */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              setActiveMenuId(null)
                              setDeleteTarget(pkg)
                            }}
                            className="w-full px-4 py-2.5 text-left text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition-colors cursor-pointer border-t border-border/40"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                            <span>Delete Package</span>
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

      {/* Delete Confirmation Modal */}
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
