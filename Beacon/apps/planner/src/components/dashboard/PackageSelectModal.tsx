import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileDown, Check, Search, Sparkles, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'
import { generatePackagePdf, type PackageItem } from '@/utils/generatePackagePdf'

interface PackageSelectModalProps {
  isOpen: boolean
  onClose: () => void
  packages: PackageItem[]
  defaultPackageId?: string
}

export function PackageSelectModal({
  isOpen,
  onClose,
  packages,
  defaultPackageId,
}: PackageSelectModalProps) {
  const [selectedId, setSelectedId] = useState<string>(
    defaultPackageId || (packages.length > 0 ? packages[0].id : '')
  )
  const [search, setSearch] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  if (!isOpen) return null

  const filteredPackages = packages.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.destination.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
  )

  const selectedPackage = packages.find((p) => p.id === selectedId) || packages[0]

  const handleDownload = async () => {
    if (!selectedPackage) {
      toast.error('Please select a package to download.')
      return
    }

    setIsGenerating(true)
    const toastId = toast.loading(`Generating PDF for "${selectedPackage.title}"...`)

    try {
      await generatePackagePdf(selectedPackage)
      toast.dismiss(toastId)
      toast.success(`Downloaded "${selectedPackage.title}" PDF successfully!`)
      onClose()
    } catch (err) {
      console.error('PDF Generation Error:', err)
      toast.dismiss(toastId)
      toast.error('Failed to generate PDF. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isGenerating && onClose()}
          className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-surface border border-border rounded-[24px] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="p-6 border-b border-border bg-page/50 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[14px] bg-teal/10 border border-teal/20 text-teal flex items-center justify-center shrink-0">
                <FileDown className="w-6 h-6 text-teal" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                  Download Package Details PDF
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan/20 text-navy">
                    Brochure Exporter
                  </span>
                </h3>
                <p className="text-xs text-muted mt-0.5">
                  Select a travel package to generate and download its complete brochure PDF.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isGenerating}
              className="p-2 rounded-full hover:bg-border/50 text-muted hover:text-navy transition-colors cursor-pointer disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b border-border bg-surface">
            <div className="relative">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search packages by name, destination, or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-border bg-page text-sm focus:outline-none focus:ring-2 focus:ring-teal/30 transition-all"
              />
            </div>
          </div>

          {/* Package Selection List */}
          <div className="p-4 overflow-y-auto flex-1 space-y-2 max-h-[340px]">
            {filteredPackages.length === 0 ? (
              <div className="py-8 text-center text-muted text-sm">
                No packages match your search criteria.
              </div>
            ) : (
              filteredPackages.map((pkg) => {
                const isSelected = selectedId === pkg.id
                const finalPrice = pkg.price * (1 - pkg.discount / 100)
                return (
                  <div
                    key={pkg.id}
                    onClick={() => setSelectedId(pkg.id)}
                    className={`p-3.5 rounded-[16px] border transition-all cursor-pointer flex items-center gap-4 ${
                      isSelected
                        ? 'border-teal bg-teal/5 shadow-sm ring-2 ring-teal/20'
                        : 'border-border bg-surface hover:bg-page/60'
                    }`}
                  >
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-16 h-14 rounded-[10px] object-cover shrink-0 border border-border"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-teal bg-teal/10 px-2 py-0.5 rounded-md">
                          {pkg.id}
                        </span>
                        <h4 className="font-semibold text-sm text-navy truncate">{pkg.title}</h4>
                      </div>
                      <p className="text-xs text-muted mt-1 truncate">
                        {pkg.destination} · {pkg.duration || `${pkg.days}d / ${pkg.nights}n`}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono text-sm font-bold text-teal">
                        {formatCurrency(finalPrice)}
                      </div>
                      {pkg.discount > 0 && (
                        <div className="font-mono text-[10px] text-muted line-through">
                          {formatCurrency(pkg.price)}
                        </div>
                      )}
                    </div>

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                        isSelected
                          ? 'bg-teal border-teal text-white'
                          : 'border-border bg-surface text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 border-t border-border bg-page/40 flex items-center justify-between">
            <div className="text-xs text-muted flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal" />
              <span>Includes itinerary, meals, maps & policies</span>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onClose} disabled={isGenerating}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleDownload}
                loading={isGenerating}
                disabled={!selectedPackage || isGenerating}
                className="gap-2 px-5 font-semibold"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <FileDown className="w-4 h-4" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
