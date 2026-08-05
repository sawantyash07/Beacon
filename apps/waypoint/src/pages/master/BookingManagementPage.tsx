import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CalendarCheck,
  Search,
  Eye,
  RotateCcw,
  Download,
} from 'lucide-react'
import { useMasterAdmin } from '@/context/MasterAdminContext'
import { type BookingRecord } from '@/data/masterAdminData'
import { toast } from 'sonner'

export default function BookingManagementPage() {
  const { bookings, refundBooking } = useMasterAdmin()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null)

  const filteredBookings = bookings.filter((b) => {
    const q = searchQuery.toLowerCase()
    return (
      b.bookingCode.toLowerCase().includes(q) ||
      b.customerName.toLowerCase().includes(q) ||
      b.plannerName.toLowerCase().includes(q) ||
      b.packageName.toLowerCase().includes(q) ||
      (b.utrNumber && b.utrNumber.toLowerCase().includes(q))
    )
  })

  return (
    <div className="space-y-8 font-body">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan tracking-widest uppercase mb-1">
            <CalendarCheck className="w-4 h-4 text-cyan" />
            <span>Platform Booking Control</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            BOOKING <span className="text-gradient">OPERATIONS</span> MANAGEMENT
          </h1>
          <p className="text-xs text-cyan-200/70 font-mono mt-1">
            Search bookings by ID, UTR, traveller name or planner, inspect lifecycles, issue refunds & transfer departures
          </p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search by Booking ID (BCN-84920), UTR, traveller, phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#001736] border border-cyan/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-cyan/40 focus:outline-none focus:border-cyan font-mono"
        />
        <Search className="w-4 h-4 text-cyan/60 absolute left-3.5 top-3" />
      </div>

      {/* BOOKINGS TABLE */}
      <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4 font-mono">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cyan/20 text-cyan/70 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Booking ID / Package</th>
                <th className="py-3 px-4">Traveller Details</th>
                <th className="py-3 px-4">Planner Agency</th>
                <th className="py-3 px-4">Amount / Payment</th>
                <th className="py-3 px-4">Departure Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan/15 text-slate-200">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-cyan/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white max-w-xs">
                    <span className="text-cyan font-bold">{b.bookingCode}</span>
                    <div className="truncate text-slate-300 font-normal">{b.packageName}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{b.customerName}</div>
                    <div className="text-[11px] text-cyan-300/70">{b.customerPhone} • {b.travellersCount} Travellers</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">{b.plannerName}</td>

                  <td className="py-3.5 px-4 font-bold text-white">
                    ₹{b.amount.toLocaleString('en-IN')}
                    <div className="text-[11px] text-cyan-300/70 font-normal">{b.paymentMethod}</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">{b.departureDate}</td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold ${
                      b.status === 'confirmed' || b.status === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : b.status === 'pending_verification'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-red-600/30 text-red-300 border border-red-500/40'
                    }`}>
                      {b.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedBooking(b)}
                        className="px-3 py-1.5 rounded-lg bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 text-cyan text-xs flex items-center gap-1 font-bold"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Lifecycle</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* BOOKING LIFECYCLE DRAWER MODAL */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-3xl glass-dark rounded-2xl border border-cyan/40 p-6 shadow-2xl space-y-5 max-h-[85vh] overflow-y-auto scrollbar-thin text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-cyan/20">
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    Booking Dossier #{selectedBooking.bookingCode}
                  </h3>
                  <p className="text-xs text-cyan">{selectedBooking.packageName} ({selectedBooking.destination})</p>
                </div>
                <button onClick={() => setSelectedBooking(null)} className="px-3 py-1 bg-navy text-slate-300 rounded">
                  Close
                </button>
              </div>

              {/* DETAILS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-navy/60 rounded-xl border border-cyan/15 space-y-1">
                <div>Customer: <strong className="text-white">{selectedBooking.customerName} ({selectedBooking.customerPhone})</strong></div>
                <div>Planner: <strong className="text-white">{selectedBooking.plannerName}</strong></div>
                <div>Amount Paid: <strong className="text-emerald-400">₹{selectedBooking.amount.toLocaleString('en-IN')}</strong></div>
                <div>Payment Method: <strong className="text-white">{selectedBooking.paymentMethod}</strong></div>
                <div>UTR Number: <strong className="text-cyan">{selectedBooking.utrNumber || 'N/A'}</strong></div>
                <div>Invoice Number: <strong className="text-cyan">{selectedBooking.invoiceNumber}</strong></div>
                <div>Pickup Point: <strong className="text-white">{selectedBooking.pickupPoint}</strong></div>
                <div>Meal Preference: <strong className="text-white">{selectedBooking.mealPreference}</strong></div>
              </div>

              {/* ACTIONS BAR */}
              <div className="pt-3 border-t border-cyan/20 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => {
                    toast.info(`Invoice ${selectedBooking.invoiceNumber} generated & downloaded`)
                  }}
                  className="px-3.5 py-2 rounded-xl bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 text-cyan font-bold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Tax Invoice</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      refundBooking(selectedBooking.id)
                      setSelectedBooking(null)
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Process Full Refund</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
