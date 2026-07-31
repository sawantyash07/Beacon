import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Filter, Calendar, Users, DollarSign, Package, CheckCircle2,
  Clock, XCircle, MoreVertical, ArrowLeft, Download, Eye, Edit3,
  X, Phone, Mail, ChevronRight
} from 'lucide-react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { packages, bookings as initialBookings, updateMockBookingStatus, confirmMockBooking } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { PackageImageGallery } from '@/components/dashboard/PackageImageGallery'

type ViewMode = 'packages' | 'entries'

export default function BookingsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('packages')
  const [bookingList, setBookingList] = useState(initialBookings)

  // Selected package for drilldown in "View by Packages"
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null)

  // Filtering & Search states
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentFilter, setPaymentFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'amount_desc' | 'amount_asc' | 'traveler_asc'>('newest')

  // Action Menu & Modal States
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)
  const [detailsBooking, setDetailsBooking] = useState<typeof initialBookings[0] | null>(null)
  const [editStatusBooking, setEditStatusBooking] = useState<typeof initialBookings[0] | null>(null)
  const [cancelTargetBooking, setCancelTargetBooking] = useState<typeof initialBookings[0] | null>(null)
  const [confirmTargetBooking, setConfirmTargetBooking] = useState<typeof initialBookings[0] | null>(null)

  const [newStatus, setNewStatus] = useState<string>('confirmed')
  const [newPaymentStatus, setNewPaymentStatus] = useState<string>('paid')

  // Overall Statistics (Shown only on main overview page)
  const overallStats = useMemo(() => {
    const totalBookings = bookingList.length
    const activePkgsCount = packages.length
    const totalTravelers = bookingList.reduce((acc, b) => acc + (b.travelersCount || 1), 0)
    const confirmedCount = bookingList.filter((b) => b.status === 'confirmed').length
    const pendingCount = bookingList.filter((b) => b.status === 'pending').length
    const cancelledCount = bookingList.filter((b) => b.status === 'cancelled').length
    const totalRevenue = bookingList.reduce((acc, b) => acc + (b.amountPaid || b.amount || 0), 0)

    return {
      totalBookings,
      activePkgsCount,
      totalTravelers,
      confirmedCount,
      pendingCount,
      cancelledCount,
      totalRevenue,
    }
  }, [bookingList])

  // Compute Package-Centric Seat & Booking Metrics
  const packageBookingGroups = useMemo(() => {
    return packages.map((pkg) => {
      const pkgBookings = bookingList.filter(
        (b) => b.packageId === pkg.id || b.package.toLowerCase() === pkg.title.toLowerCase()
      )
      const activeBookings = pkgBookings.filter((b) => b.status !== 'cancelled')

      // Maximum seat capacity
      const capacity = (pkg as any).capacity || 40
      // Booked seats (sum of travelers across active bookings)
      const bookedSeats = activeBookings.reduce((acc, b) => acc + (b.travelersCount || 1), 0)
      // Available seats dynamically calculated
      const availableSeats = Math.max(0, capacity - bookedSeats)
      // Occupancy percentage
      const occupancyPercentage = Math.min(100, Math.round((bookedSeats / capacity) * 100))

      // Booking Status & Indicator Color
      let bookingStatus: 'Open' | 'Almost Full' | 'Fully Booked' = 'Open'
      let indicatorColor = 'emerald'
      if (occupancyPercentage >= 100 || availableSeats === 0) {
        bookingStatus = 'Fully Booked'
        indicatorColor = 'rose'
      } else if (occupancyPercentage >= 70) {
        bookingStatus = 'Almost Full'
        indicatorColor = 'amber'
      }

      // Next Departure Date
      const upcomingTravelDates = activeBookings
        .map((b) => b.travelDate)
        .filter(Boolean)
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      const nextDepartureDate = upcomingTravelDates[0] || 'TBD'

      const totalBookings = pkgBookings.length
      const totalTravelers = pkgBookings.reduce((acc, b) => acc + (b.travelersCount || 1), 0)
      const totalRevenue = pkgBookings.reduce((acc, b) => acc + (b.amountPaid || b.amount || 0), 0)
      const confirmed = pkgBookings.filter((b) => b.status === 'confirmed').length
      const pending = pkgBookings.filter((b) => b.status === 'pending').length
      const cancelled = pkgBookings.filter((b) => b.status === 'cancelled').length

      return {
        package: pkg,
        bookings: pkgBookings,
        capacity,
        bookedSeats,
        availableSeats,
        occupancyPercentage,
        bookingStatus,
        indicatorColor,
        nextDepartureDate,
        totalBookings,
        totalTravelers,
        totalRevenue,
        summary: { confirmed, pending, cancelled },
      }
    })
  }, [bookingList])

  // Currently Selected Package Data (for drilldown)
  const selectedGroup = useMemo(() => {
    if (!selectedPackageId) return null
    return packageBookingGroups.find((g) => g.package.id === selectedPackageId) || null
  }, [packageBookingGroups, selectedPackageId])

  // Filtered Bookings for Unified List or Selected Package
  const filteredBookings = useMemo(() => {
    let list = [...bookingList]

    // If viewing a specific selected package
    if (viewMode === 'packages' && selectedPackageId && selectedGroup) {
      list = list.filter(
        (b) => b.packageId === selectedPackageId || b.package.toLowerCase() === selectedGroup.package.title.toLowerCase()
      )
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (b) =>
          b.id.toLowerCase().includes(q) ||
          b.traveler.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q) ||
          (b.phone && b.phone.toLowerCase().includes(q)) ||
          b.package.toLowerCase().includes(q) ||
          (b.destination && b.destination.toLowerCase().includes(q))
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      list = list.filter((b) => b.status === statusFilter)
    }

    // Payment filter
    if (paymentFilter !== 'all') {
      list = list.filter((b) => b.paymentStatus === paymentFilter)
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.bookingDate).getTime() - new Date(a.bookingDate).getTime()
      if (sortBy === 'oldest') return new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime()
      if (sortBy === 'amount_desc') return b.amount - a.amount
      if (sortBy === 'amount_asc') return a.amount - b.amount
      if (sortBy === 'traveler_asc') return a.traveler.localeCompare(b.traveler)
      return 0
    })

    return list
  }, [bookingList, viewMode, selectedPackageId, selectedGroup, searchQuery, statusFilter, paymentFilter, sortBy])

  // Action Handlers
  const handleConfirmBookingExecution = () => {
    if (!confirmTargetBooking) return
    confirmMockBooking(confirmTargetBooking.id)

    setBookingList((prev) =>
      prev.map((b) =>
        b.id === confirmTargetBooking.id
          ? { ...b, status: 'confirmed', paymentStatus: b.paymentStatus === 'pending' ? 'paid' : b.paymentStatus }
          : b
      )
    )

    toast.success('Booking confirmed and added to Trip Group successfully.')
    setConfirmTargetBooking(null)
  }

  const handleUpdateStatus = () => {
    if (!editStatusBooking) return
    updateMockBookingStatus(editStatusBooking.id, newStatus, newPaymentStatus)

    setBookingList((prev) =>
      prev.map((b) =>
        b.id === editStatusBooking.id
          ? { ...b, status: newStatus, paymentStatus: newPaymentStatus }
          : b
      )
    )

    toast.success(`Updated booking ${editStatusBooking.id} status to ${newStatus.toUpperCase()}!`)
    setEditStatusBooking(null)
  }

  const handleCancelBooking = () => {
    if (!cancelTargetBooking) return
    updateMockBookingStatus(cancelTargetBooking.id, 'cancelled', 'refunded')

    setBookingList((prev) =>
      prev.map((b) =>
        b.id === cancelTargetBooking.id
          ? { ...b, status: 'cancelled', paymentStatus: 'refunded', remainingBalance: 0 }
          : b
      )
    )

    toast.success(`Booking ${cancelTargetBooking.id} cancelled successfully!`)
    setCancelTargetBooking(null)
  }

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = ['Booking ID,Traveler,Email,Phone,Package,Destination,Travelers,Travel Date,Booking Date,Amount,Paid,Status,Payment Status\n']
    const rows = filteredBookings.map((b) =>
      `"${b.id}","${b.traveler}","${b.email}","${b.phone || ''}","${b.package}","${b.destination || ''}",${b.travelersCount || 1},"${b.travelDate}","${b.bookingDate}",${b.amount},${b.amountPaid || b.amount},"${b.status}","${b.paymentStatus}"`
    )
    const blob = new Blob([headers.join('') + rows.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Bookings_Export_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Bookings exported to CSV!')
  }

  return (
    <div className="space-y-6 pb-12">
      {/* ---------------- MAIN PAGE OVERVIEW (Shown when no specific package is opened) ---------------- */}
      {!selectedPackageId && (
        <>
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-navy">Booking Management</h1>
              <p className="text-muted text-sm mt-1">
                Monitor live package seat capacities, occupancy rates, and reservation entries
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="border-border text-navy hover:bg-page font-semibold gap-2 shadow-sm"
              >
                <Download className="w-4 h-4 text-teal" />
                <span>Export CSV</span>
              </Button>
            </div>
          </div>

          {/* Live Overall Statistics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            <div className="bg-surface border border-border rounded-[16px] p-3.5 shadow-sm">
              <div className="flex items-center gap-2 text-muted text-xs font-semibold mb-1">
                <Calendar className="w-3.5 h-3.5 text-teal" /> Total Bookings
              </div>
              <div className="text-xl font-bold text-navy font-mono">{overallStats.totalBookings}</div>
            </div>

            <div className="bg-surface border border-border rounded-[16px] p-3.5 shadow-sm">
              <div className="flex items-center gap-2 text-muted text-xs font-semibold mb-1">
                <Package className="w-3.5 h-3.5 text-teal" /> Active Packages
              </div>
              <div className="text-xl font-bold text-navy font-mono">{overallStats.activePkgsCount}</div>
            </div>

            <div className="bg-surface border border-border rounded-[16px] p-3.5 shadow-sm">
              <div className="flex items-center gap-2 text-muted text-xs font-semibold mb-1">
                <Users className="w-3.5 h-3.5 text-teal" /> Total Travelers
              </div>
              <div className="text-xl font-bold text-navy font-mono">{overallStats.totalTravelers}</div>
            </div>

            <div className="bg-surface border border-border rounded-[16px] p-3.5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Confirmed
              </div>
              <div className="text-xl font-bold text-emerald-600 font-mono">{overallStats.confirmedCount}</div>
            </div>

            <div className="bg-surface border border-border rounded-[16px] p-3.5 shadow-sm">
              <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> Pending
              </div>
              <div className="text-xl font-bold text-amber-600 font-mono">{overallStats.pendingCount}</div>
            </div>

            <div className="bg-surface border border-border rounded-[16px] p-3.5 shadow-sm">
              <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold mb-1">
                <XCircle className="w-3.5 h-3.5 text-rose-500" /> Cancelled
              </div>
              <div className="text-xl font-bold text-rose-600 font-mono">{overallStats.cancelledCount}</div>
            </div>

            <div className="bg-surface border border-border rounded-[16px] p-3.5 shadow-sm col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2 text-teal text-xs font-semibold mb-1">
                <DollarSign className="w-3.5 h-3.5 text-teal" /> Total Revenue
              </div>
              <div className="text-xl font-bold text-teal font-mono">{formatCurrency(overallStats.totalRevenue)}</div>
            </div>
          </div>

          {/* Segmented View Mode Toggle Tabs */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="bg-page border border-border p-1 rounded-[16px] inline-flex gap-1 shadow-inner">
              <button
                type="button"
                onClick={() => setViewMode('packages')}
                className={`relative px-5 py-2.5 rounded-[12px] text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === 'packages'
                    ? 'bg-navy text-white shadow-md'
                    : 'text-muted hover:text-navy hover:bg-surface/50'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>📦 View by Packages</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('entries')}
                className={`relative px-5 py-2.5 rounded-[12px] text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  viewMode === 'entries'
                    ? 'bg-navy text-white shadow-md'
                    : 'text-muted hover:text-navy hover:bg-surface/50'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>🧾 View by Entries</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* ---------------- MODE 1: VIEW BY PACKAGES (Grid of Package Cards) ---------------- */}
      {viewMode === 'packages' && !selectedPackageId && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            {packageBookingGroups.map((group, i) => {
              const {
                package: pkg,
                capacity,
                bookedSeats,
                availableSeats,
                occupancyPercentage,
                bookingStatus,
                indicatorColor,
                nextDepartureDate,
                totalBookings,
                totalTravelers,
                totalRevenue,
              } = group

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card
                    hover
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className="p-0 overflow-hidden cursor-pointer group border border-border hover:border-teal hover:shadow-xl transition-all rounded-[20px]"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Left Package Image Gallery */}
                      <div className="w-full sm:w-56 shrink-0 relative">
                        <PackageImageGallery
                          images={pkg.images}
                          fallbackImage={pkg.image}
                          alt={pkg.title}
                          className="h-48 sm:h-full"
                        />
                        <div className="absolute top-2 left-2 bg-navy/80 backdrop-blur-sm text-cyan text-[10px] font-mono font-bold px-2 py-0.5 rounded-full z-20">
                          {pkg.id}
                        </div>
                      </div>

                      {/* Right Details & Live Capacity Metrics */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <span className="text-xs font-bold text-teal bg-teal/10 px-2.5 py-0.5 rounded-full">
                              {pkg.destination}
                            </span>

                            {/* Booking Status Indicator Badge */}
                            <span
                              className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
                                indicatorColor === 'emerald'
                                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                                  : indicatorColor === 'amber'
                                  ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                                  : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  indicatorColor === 'emerald'
                                    ? 'bg-emerald-500 animate-pulse'
                                    : indicatorColor === 'amber'
                                    ? 'bg-amber-500 animate-pulse'
                                    : 'bg-rose-500'
                                }`}
                              />
                              {bookingStatus}
                            </span>
                          </div>

                          <h3 className="font-bold text-navy text-lg group-hover:text-teal transition-colors line-clamp-1">
                            {pkg.title}
                          </h3>
                          <p className="text-xs text-muted">
                            {pkg.duration || `${pkg.days} days / ${pkg.nights} nights`} · Next departure: <strong className="text-navy">{formatDate(nextDepartureDate)}</strong>
                          </p>
                        </div>

                        {/* Booking Progress Bar & Live Capacity Box */}
                        <div className="bg-page border border-border rounded-[14px] p-3 space-y-2">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-navy flex items-center gap-1">
                              <Users className="w-3.5 h-3.5 text-teal" />
                              <span>{bookedSeats} / {capacity} Seats Booked</span>
                            </span>
                            <span className={`font-mono font-bold ${
                              availableSeats === 0 ? 'text-rose-600' : availableSeats <= 10 ? 'text-amber-600' : 'text-emerald-600'
                            }`}>
                              {availableSeats} Available
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full bg-border/60 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${occupancyPercentage}%` }}
                              transition={{ duration: 0.6, ease: 'easeOut' }}
                              className={`h-full rounded-full ${
                                indicatorColor === 'emerald'
                                  ? 'bg-emerald-500'
                                  : indicatorColor === 'amber'
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                            />
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-muted">
                            <span>Occupancy: <strong className="text-navy">{occupancyPercentage}% Full</strong></span>
                            <span>Revenue: <strong className="text-teal font-mono">{formatCurrency(totalRevenue)}</strong></span>
                          </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="flex items-center justify-between pt-1 border-t border-border/40 text-xs">
                          <div className="flex items-center gap-3 text-muted">
                            <span>Bookings: <strong className="text-navy">{totalBookings}</strong></span>
                            <span>Travelers: <strong className="text-navy">{totalTravelers}</strong></span>
                          </div>

                          <span className="font-bold text-teal flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Open Package Details <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      )}

      {/* ---------------- MODE 1: PACKAGE DETAILS VIEW (Only Selected Package & Its Bookings) ---------------- */}
      {viewMode === 'packages' && selectedPackageId && selectedGroup && (
        <div className="space-y-6">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedPackageId(null)
                setSearchQuery('')
                setStatusFilter('all')
                setPaymentFilter('all')
              }}
              className="text-teal hover:bg-teal/10 font-semibold gap-2 border border-teal/20"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Packages</span>
            </Button>

            <span className="text-xs font-mono text-muted bg-page px-3 py-1 rounded-full border border-border">
              Viewing Package ID: {selectedGroup.package.id}
            </span>
          </div>

          {/* Package Details Hero Banner Card */}
          <Card className="p-6 bg-surface border border-border shadow-md rounded-[24px] space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Gallery */}
              <div className="w-full lg:w-72 shrink-0">
                <PackageImageGallery
                  images={selectedGroup.package.images}
                  fallbackImage={selectedGroup.package.image}
                  alt={selectedGroup.package.title}
                  className="h-52 rounded-[16px] overflow-hidden"
                />
              </div>

              {/* Center Info */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-teal/10 text-teal text-xs font-bold px-3 py-1 rounded-full border border-teal/20">
                    📍 {selectedGroup.package.destination}
                  </span>
                  <span className="bg-page text-navy text-xs font-semibold px-3 py-1 rounded-full border border-border">
                    ⏱ {selectedGroup.package.duration || `${selectedGroup.package.days} days / ${selectedGroup.package.nights} nights`}
                  </span>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                    selectedGroup.indicatorColor === 'emerald'
                      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                      : selectedGroup.indicatorColor === 'amber'
                      ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      selectedGroup.indicatorColor === 'emerald' ? 'bg-emerald-500' : selectedGroup.indicatorColor === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                    }`} />
                    {selectedGroup.bookingStatus}
                  </span>
                </div>

                <h2 className="text-2xl font-extrabold text-navy">{selectedGroup.package.title}</h2>
                <p className="text-xs text-muted leading-relaxed">
                  {selectedGroup.package.description || 'Premium curated travel package with luxury stays, guided sightseeing, and seamless transfers.'}
                </p>

                <div className="pt-2 flex items-center gap-4 text-xs text-muted">
                  <span>Next Departure: <strong className="text-navy">{formatDate(selectedGroup.nextDepartureDate)}</strong></span>
                  <span>Base Rate: <strong className="text-teal font-mono">{formatCurrency(selectedGroup.package.price)}</strong></span>
                </div>
              </div>

              {/* Right Live Occupancy & Capacity Box */}
              <div className="w-full lg:w-72 bg-page border border-border rounded-[18px] p-5 shrink-0 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider block mb-1">Live Capacity & Occupancy</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold font-mono text-navy">{selectedGroup.bookedSeats} / {selectedGroup.capacity}</span>
                    <span className={`text-sm font-bold font-mono ${
                      selectedGroup.availableSeats === 0 ? 'text-rose-600' : selectedGroup.availableSeats <= 10 ? 'text-amber-600' : 'text-emerald-600'
                    }`}>
                      {selectedGroup.availableSeats} Available
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="w-full bg-border/80 rounded-full h-2.5 overflow-hidden">
                    <div
                      style={{ width: `${selectedGroup.occupancyPercentage}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        selectedGroup.indicatorColor === 'emerald' ? 'bg-emerald-500' : selectedGroup.indicatorColor === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-muted font-medium">
                    <span>Occupancy Rate</span>
                    <strong className="text-navy font-mono">{selectedGroup.occupancyPercentage}% Full</strong>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-2 text-xs flex justify-between items-center text-muted">
                  <span>Generated Revenue:</span>
                  <strong className="text-teal font-mono text-sm">{formatCurrency(selectedGroup.totalRevenue)}</strong>
                </div>
              </div>
            </div>
          </Card>

          {/* Compact Statistic Cards (This Package Only!) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-surface border border-border rounded-[16px] p-3.5 shadow-sm">
              <div className="flex items-center gap-1.5 text-muted text-xs font-semibold mb-1">
                <Calendar className="w-3.5 h-3.5 text-teal" /> Total Bookings
              </div>
              <div className="text-xl font-bold text-navy font-mono">{selectedGroup.totalBookings}</div>
            </div>

            <div className="bg-surface border border-border rounded-[16px] p-3.5 shadow-sm">
              <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-semibold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Confirmed
              </div>
              <div className="text-xl font-bold text-emerald-600 font-mono">{selectedGroup.summary.confirmed}</div>
            </div>

            <div className="bg-surface border border-border rounded-[16px] p-3.5 shadow-sm">
              <div className="flex items-center gap-1.5 text-amber-600 text-xs font-semibold mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> Pending
              </div>
              <div className="text-xl font-bold text-amber-600 font-mono">{selectedGroup.summary.pending}</div>
            </div>

            <div className="bg-surface border border-border rounded-[16px] p-3.5 shadow-sm">
              <div className="flex items-center gap-1.5 text-rose-600 text-xs font-semibold mb-1">
                <XCircle className="w-3.5 h-3.5 text-rose-500" /> Cancelled
              </div>
              <div className="text-xl font-bold text-rose-600 font-mono">{selectedGroup.summary.cancelled}</div>
            </div>

            <div className="bg-surface border border-border rounded-[16px] p-3.5 shadow-sm">
              <div className="flex items-center gap-1.5 text-muted text-xs font-semibold mb-1">
                <Users className="w-3.5 h-3.5 text-teal" /> Total Travelers
              </div>
              <div className="text-xl font-bold text-navy font-mono">{selectedGroup.totalTravelers}</div>
            </div>

            <div className="bg-surface border border-border rounded-[16px] p-3.5 shadow-sm">
              <div className="flex items-center gap-1.5 text-teal text-xs font-semibold mb-1">
                <DollarSign className="w-3.5 h-3.5 text-teal" /> Total Revenue
              </div>
              <div className="text-xl font-bold text-teal font-mono">{formatCurrency(selectedGroup.totalRevenue)}</div>
            </div>
          </div>

          {/* Controls Bar for This Package's Bookings */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-4 border border-border rounded-[18px] shadow-sm">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search bookings for ${selectedGroup.package.title}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-border bg-page text-xs focus:outline-none focus:ring-2 focus:ring-teal/30"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-muted font-medium">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-[10px] border border-border bg-page text-xs font-medium text-navy focus:outline-none"
              >
                <option value="all">Status: All</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-3 py-2 rounded-[10px] border border-border bg-page text-xs font-medium text-navy focus:outline-none"
              >
                <option value="all">Payment: All</option>
                <option value="paid">Paid</option>
                <option value="partial">Partial</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-[10px] border border-border bg-page text-xs font-medium text-navy focus:outline-none"
              >
                <option value="newest">Sort: Booking Date (Newest)</option>
                <option value="oldest">Sort: Booking Date (Oldest)</option>
                <option value="traveler_asc">Sort: Customer Name (A-Z)</option>
                <option value="amount_desc">Sort: Amount (High-Low)</option>
              </select>
            </div>
          </div>

          {/* Bookings Table for THIS Package Only */}
          <BookingsTable
            bookings={filteredBookings}
            onViewDetails={(b) => setDetailsBooking(b)}
            onConfirmBooking={(b) => setConfirmTargetBooking(b)}
            onEditStatus={(b) => {
              setEditStatusBooking(b)
              setNewStatus(b.status)
              setNewPaymentStatus(b.paymentStatus)
            }}
            onCancelBooking={(b) => setCancelTargetBooking(b)}
            activeMenuId={activeMenuId}
            setActiveMenuId={setActiveMenuId}
          />
        </div>
      )}

      {/* ---------------- MODE 2: VIEW BY ENTRIES (UNIFIED LIST) ---------------- */}
      {viewMode === 'entries' && (
        <div className="space-y-6">
          {/* Controls Bar for Unified List */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface p-4 border border-border rounded-[18px] shadow-sm">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search across all bookings (Traveler, Package, ID, Destination, Email)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-[12px] border border-border bg-page text-xs focus:outline-none focus:ring-2 focus:ring-teal/30"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-[10px] border border-border bg-page text-xs font-medium text-navy focus:outline-none"
              >
                <option value="all">Filter Status: All</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="px-3 py-2 rounded-[10px] border border-border bg-page text-xs font-medium text-navy focus:outline-none"
              >
                <option value="all">Filter Payment: All</option>
                <option value="paid">Paid</option>
                <option value="partial">Partial</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-[10px] border border-border bg-page text-xs font-medium text-navy focus:outline-none"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="traveler_asc">Sort: Customer Name (A-Z)</option>
                <option value="amount_desc">Amount: High to Low</option>
                <option value="amount_asc">Amount: Low to High</option>
              </select>
            </div>
          </div>

          {/* Unified Bookings Table */}
          <BookingsTable
            bookings={filteredBookings}
            showPackageColumn
            onViewDetails={(b) => setDetailsBooking(b)}
            onConfirmBooking={(b) => setConfirmTargetBooking(b)}
            onEditStatus={(b) => {
              setEditStatusBooking(b)
              setNewStatus(b.status)
              setNewPaymentStatus(b.paymentStatus)
            }}
            onCancelBooking={(b) => setCancelTargetBooking(b)}
            activeMenuId={activeMenuId}
            setActiveMenuId={setActiveMenuId}
          />
        </div>
      )}

      {/* ---------------- MODALS ---------------- */}

      {/* Modal 0: Confirm Booking Modal */}
      <AnimatePresence>
        {confirmTargetBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmTargetBooking(null)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-surface border border-border rounded-[24px] shadow-2xl p-6 overflow-hidden z-10 space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">Confirm Booking</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Are you sure you want to confirm this booking? This customer will be added to the corresponding Trip Group.
                  </p>
                </div>
              </div>

              {/* Booking Summary Box inside modal */}
              <div className="bg-page border border-border rounded-[16px] p-3.5 text-xs space-y-2">
                <div className="flex justify-between items-center font-bold text-navy">
                  <span>{confirmTargetBooking.traveler}</span>
                  <span className="font-mono text-teal">{confirmTargetBooking.id}</span>
                </div>
                <div className="text-muted flex justify-between">
                  <span>Package:</span>
                  <strong className="text-navy">{confirmTargetBooking.package}</strong>
                </div>
                <div className="text-muted flex justify-between">
                  <span>Travel Date:</span>
                  <strong className="text-navy">{formatDate(confirmTargetBooking.travelDate)}</strong>
                </div>
                <div className="text-muted flex justify-between">
                  <span>Travelers:</span>
                  <strong className="text-navy">{confirmTargetBooking.travelersCount || 1} Travelers</strong>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setConfirmTargetBooking(null)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleConfirmBookingExecution}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 shadow-md"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Booking</span>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 1: Booking Details */}
      <AnimatePresence>
        {detailsBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailsBooking(null)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-surface border border-border rounded-[24px] shadow-2xl p-6 overflow-hidden z-10 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={detailsBooking.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80'}
                    alt={detailsBooking.traveler}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                  <div>
                    <h3 className="font-bold text-navy text-lg">{detailsBooking.traveler}</h3>
                    <p className="text-xs text-muted font-mono">{detailsBooking.id}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setDetailsBooking(null)}
                  className="p-2 rounded-full hover:bg-page text-muted hover:text-navy transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Package & Destination Info */}
              <div className="bg-page border border-border rounded-[16px] p-4 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold text-teal">
                  <span>{detailsBooking.destination || 'Destination Tour'}</span>
                  <StatusBadge status={detailsBooking.status} />
                </div>
                <h4 className="font-bold text-navy text-base">{detailsBooking.package}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-muted pt-2 border-t border-border/50">
                  <div>
                    <span className="block font-medium">Travel Date:</span>
                    <strong className="text-navy">{formatDate(detailsBooking.travelDate)}</strong>
                  </div>
                  <div>
                    <span className="block font-medium">Travelers:</span>
                    <strong className="text-navy">{detailsBooking.travelersCount || 1} Travelers</strong>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-2 text-xs text-navy">
                <h5 className="font-bold text-muted uppercase text-[10px] tracking-wider">Contact Information</h5>
                <div className="flex items-center gap-2 text-muted">
                  <Mail className="w-3.5 h-3.5 text-teal" />
                  <span>{detailsBooking.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <Phone className="w-3.5 h-3.5 text-teal" />
                  <span>{detailsBooking.phone || '+1 (555) 000-0000'}</span>
                </div>
              </div>

              {/* Financials Breakdown */}
              <div className="border-t border-border pt-4 space-y-2 text-xs">
                <h5 className="font-bold text-muted uppercase text-[10px] tracking-wider">Financial Breakdown</h5>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted">Total Package Rate:</span>
                  <strong className="font-mono text-navy">{formatCurrency(detailsBooking.amount)}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted">Amount Paid:</span>
                  <strong className="font-mono text-emerald-600">{formatCurrency(detailsBooking.amountPaid || detailsBooking.amount)}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted">Remaining Balance:</span>
                  <strong className="font-mono text-rose-600">{formatCurrency(detailsBooking.remainingBalance || 0)}</strong>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button size="sm" variant="primary" onClick={() => setDetailsBooking(null)}>
                  Close Details
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 2: Edit Booking Status */}
      <AnimatePresence>
        {editStatusBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditStatusBooking(null)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-surface border border-border rounded-[24px] shadow-2xl p-6 overflow-hidden z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-border pb-3">
                <h3 className="font-bold text-navy text-lg">Update Booking Status</h3>
                <button type="button" onClick={() => setEditStatusBooking(null)}>
                  <X className="w-5 h-5 text-muted hover:text-navy" />
                </button>
              </div>

              <p className="text-xs text-muted">
                Updating status for <strong className="text-navy">{editStatusBooking.traveler}</strong> ({editStatusBooking.id})
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">Booking Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-[12px] border border-border bg-page text-xs font-medium text-navy focus:outline-none"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5">Payment Status</label>
                  <select
                    value={newPaymentStatus}
                    onChange={(e) => setNewPaymentStatus(e.target.value)}
                    className="w-full px-3 py-2 rounded-[12px] border border-border bg-page text-xs font-medium text-navy focus:outline-none"
                  >
                    <option value="paid">Paid (Fully Paid)</option>
                    <option value="partial">Partial Payment</option>
                    <option value="pending">Pending Payment</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-border">
                <Button size="sm" variant="ghost" onClick={() => setEditStatusBooking(null)}>
                  Cancel
                </Button>
                <Button size="sm" variant="primary" onClick={handleUpdateStatus}>
                  Save Status
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 3: Cancel Booking Confirmation */}
      <AnimatePresence>
        {cancelTargetBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCancelTargetBooking(null)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-surface border border-border rounded-[24px] shadow-2xl p-6 overflow-hidden z-10 space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy">Cancel Booking</h3>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
                    Are you sure you want to cancel booking <strong className="text-navy">{cancelTargetBooking.id}</strong> for <strong className="text-navy">{cancelTargetBooking.traveler}</strong>? Available seats for this package will be automatically restored.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setCancelTargetBooking(null)}>
                  Keep Active
                </Button>
                <Button variant="danger" size="sm" onClick={handleCancelBooking}>
                  Confirm Cancel
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------- REUSABLE BOOKINGS TABLE COMPONENT ----------------
interface BookingsTableProps {
  bookings: typeof initialBookings
  showPackageColumn?: boolean
  onViewDetails: (b: typeof initialBookings[0]) => void
  onConfirmBooking: (b: typeof initialBookings[0]) => void
  onEditStatus: (b: typeof initialBookings[0]) => void
  onCancelBooking: (b: typeof initialBookings[0]) => void
  activeMenuId: string | null
  setActiveMenuId: (id: string | null) => void
}

function BookingsTable({
  bookings,
  showPackageColumn = false,
  onViewDetails,
  onConfirmBooking,
  onEditStatus,
  onCancelBooking,
  activeMenuId,
  setActiveMenuId,
}: BookingsTableProps) {
  if (bookings.length === 0) {
    return (
      <EmptyState
        icon={<Calendar className="w-8 h-8" />}
        title="No bookings found for this package"
        description="Bookings for this package will appear here when travelers make reservations."
      />
    )
  }

  return (
    <Card className="p-0 overflow-hidden border border-border shadow-sm rounded-[18px]">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-page/60 text-muted uppercase font-bold tracking-wider text-[10px]">
              <th className="text-left p-4">Booking ID</th>
              <th className="text-left p-4">Customer Name</th>
              <th className="text-left p-4">Phone & Email</th>
              {showPackageColumn && <th className="text-left p-4">Package</th>}
              <th className="text-left p-4">Travel Date</th>
              <th className="text-left p-4">Booking Date</th>
              <th className="text-left p-4">Travelers</th>
              <th className="text-left p-4">Amount Paid</th>
              <th className="text-left p-4">Payment Status</th>
              <th className="text-left p-4">Booking Status</th>
              <th className="p-4 text-right">Quick Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) => (
              <motion.tr
                key={booking.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-border last:border-0 hover:bg-page/40 transition-colors"
              >
                <td className="p-4 font-mono font-bold text-teal">{booking.id}</td>

                <td className="p-4">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={booking.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80'}
                      alt={booking.traveler}
                      className="w-8 h-8 rounded-full object-cover border border-border shrink-0"
                    />
                    <div>
                      <p className="font-bold text-navy text-xs">{booking.traveler}</p>
                    </div>
                  </div>
                </td>

                <td className="p-4">
                  <div className="text-[11px] text-navy font-medium">
                    <div>{booking.phone || '+1 (555) 000-0000'}</div>
                    <div className="text-muted text-[10px]">{booking.email}</div>
                  </div>
                </td>

                {showPackageColumn && (
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {booking.packageImage && (
                        <img src={booking.packageImage} alt={booking.package} className="w-7 h-7 rounded-[6px] object-cover shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold text-navy text-xs line-clamp-1">{booking.package}</p>
                        <p className="text-[10px] text-muted">{booking.destination}</p>
                      </div>
                    </div>
                  </td>
                )}

                <td className="p-4 text-navy font-medium">{formatDate(booking.travelDate)}</td>
                <td className="p-4 text-muted">{formatDate(booking.bookingDate)}</td>

                <td className="p-4 text-navy font-semibold">{booking.travelersCount || 1} Travelers</td>

                <td className="p-4 font-mono font-bold text-navy">
                  {formatCurrency(booking.amountPaid || booking.amount)}
                  {booking.remainingBalance > 0 && (
                    <span className="block text-[9px] text-rose-500 font-normal">
                      Bal: {formatCurrency(booking.remainingBalance)}
                    </span>
                  )}
                </td>

                <td className="p-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      booking.paymentStatus === 'paid'
                        ? 'bg-emerald-100 text-emerald-700'
                        : booking.paymentStatus === 'partial'
                        ? 'bg-amber-100 text-amber-700'
                        : booking.paymentStatus === 'refunded'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>

                <td className="p-4">
                  <StatusBadge status={booking.status} />
                </td>

                {/* Quick Actions Column */}
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {/* Confirm Booking Action Button */}
                    {booking.status === 'confirmed' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        Confirmed
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          onConfirmBooking(booking)
                        }}
                        className="border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-500 text-xs font-semibold gap-1 py-1 px-2.5 shadow-sm cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Confirm Booking</span>
                      </Button>
                    )}

                    {/* Overflow Actions Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveMenuId(activeMenuId === booking.id ? null : booking.id)
                        }}
                        className="p-1.5 rounded-[8px] border border-border hover:bg-page text-muted hover:text-navy transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      <AnimatePresence>
                        {activeMenuId === booking.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            transition={{ duration: 0.12 }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-10 z-30 w-44 bg-surface border border-border rounded-[14px] shadow-xl py-1 text-left"
                          >
                            {booking.status !== 'confirmed' && (
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveMenuId(null)
                                  onConfirmBooking(booking)
                                }}
                                className="w-full px-3.5 py-2 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 flex items-center gap-2"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                                <span>Confirm Booking</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null)
                                onViewDetails(booking)
                              }}
                              className="w-full px-3.5 py-2 text-xs font-semibold text-navy hover:bg-teal/10 hover:text-teal flex items-center gap-2 border-t border-border/40"
                            >
                              <Eye className="w-3.5 h-3.5 text-teal" />
                              <span>View Details</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null)
                                onEditStatus(booking)
                              }}
                              className="w-full px-3.5 py-2 text-xs font-semibold text-navy hover:bg-teal/10 hover:text-teal flex items-center gap-2 border-t border-border/40"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-teal" />
                              <span>Update Status</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setActiveMenuId(null)
                                onCancelBooking(booking)
                              }}
                              className="w-full px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-border/40"
                            >
                              <XCircle className="w-3.5 h-3.5 text-rose-500" />
                              <span>Cancel Booking</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
