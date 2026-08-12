import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bus, Calendar, Users, AlertTriangle, CheckCircle2, XCircle, 
  Search, Sliders, Sparkles, Clock, ArrowRight, ShieldCheck, 
  MessageSquare, Plane, Building2, HelpCircle, ArrowUpRight, ArrowDownRight,
  ClipboardList, ChevronRight, User, RefreshCw, Send, Trash2
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { toast } from 'sonner'

interface Trip {
  id: string
  packageName: string
  destination: string
  departureDate: string
  capacityFilled: number
  capacityMax: number
  confirmedTravellers: number
  pendingPaymentsCount: number
  plannerAssigned: string
  status: 'Confirmed' | 'Low Occupancy' | 'Full' | 'Cancelled'
  operationsRequired: string
  minCapacity: number
  originalPrice: number
  timeline: { time: string; event: string; done: boolean }[]
}

const initialTrips: Trip[] = [
  {
    id: 'trip-1',
    packageName: 'Goa Beach Escape',
    destination: 'Goa, India',
    departureDate: '15 Oct, 2026',
    capacityFilled: 18,
    capacityMax: 25,
    confirmedTravellers: 18,
    pendingPaymentsCount: 2,
    plannerAssigned: 'Alex Wright',
    status: 'Confirmed',
    operationsRequired: 'None',
    minCapacity: 15,
    originalPrice: 18000,
    timeline: [
      { time: 'Aug 01', event: 'Package Created', done: true },
      { time: 'Aug 05', event: 'Bookings Opened', done: true },
      { time: 'Sep 10', event: 'Minimum Capacity Reached', done: true },
      { time: 'Oct 01', event: 'Yacht Charter Verified', done: true },
      { time: 'Oct 15', event: 'Departure scheduled', done: false }
    ]
  },
  {
    id: 'trip-2',
    packageName: 'Kashmir Expedition',
    destination: 'Srinagar, Kashmir',
    departureDate: '18 Oct, 2026',
    capacityFilled: 8,
    capacityMax: 20,
    confirmedTravellers: 8,
    pendingPaymentsCount: 1,
    plannerAssigned: 'Alex Wright',
    status: 'Low Occupancy',
    operationsRequired: 'Low Occupancy Check',
    minCapacity: 20,
    originalPrice: 28000,
    timeline: [
      { time: 'Aug 10', event: 'Package Created', done: true },
      { time: 'Aug 15', event: 'Bookings Opened', done: true },
      { time: 'Sep 25', event: 'Review Alert: Low Occupancy flagged', done: true }
    ]
  },
  {
    id: 'trip-3',
    packageName: 'Leh Bike Expedition',
    destination: 'Leh Ladakh',
    departureDate: '25 Oct, 2026',
    capacityFilled: 22,
    capacityMax: 22,
    confirmedTravellers: 22,
    pendingPaymentsCount: 0,
    plannerAssigned: 'Pooja Hegde',
    status: 'Full',
    operationsRequired: 'None',
    minCapacity: 15,
    originalPrice: 35000,
    timeline: [
      { time: 'Aug 02', event: 'Package Created', done: true },
      { time: 'Aug 08', event: 'Bookings Opened', done: true },
      { time: 'Sep 05', event: 'Minimum Capacity Reached', done: true },
      { time: 'Sep 20', event: 'All Seats Sold out (22/22)', done: true }
    ]
  }
]

interface TravellerRequest {
  id: string
  clientName: string
  currentPackage: string
  requestType: 'Package Change' | 'Departure Change' | 'Room Upgrade' | 'Hotel Upgrade' | 'Vehicle Upgrade' | 'Cancellation'
  details: string
  priceDetails?: {
    originalPrice: number
    newPrice: number
    difference: number
    gst: number
    total: number
  }
  status: 'Pending' | 'Approved' | 'Rejected'
}

const initialRequests: TravellerRequest[] = [
  {
    id: 'req-1',
    clientName: 'Sarah Jenkins',
    currentPackage: 'Kashmir Trek (Standard)',
    requestType: 'Package Change',
    details: 'Wants to change to Kashmir Trek (Luxury Stay)',
    priceDetails: {
      originalPrice: 28000,
      newPrice: 32000,
      difference: 4000,
      gst: 720,
      total: 4720
    },
    status: 'Pending'
  },
  {
    id: 'req-2',
    clientName: 'Rohan Deshmukh',
    currentPackage: 'Goa Tour Batch A',
    requestType: 'Departure Change',
    details: 'Wants to move to Goa Tour Batch B (Departure 18 Oct)',
    priceDetails: {
      originalPrice: 18000,
      newPrice: 18000,
      difference: 0,
      gst: 0,
      total: 0
    },
    status: 'Pending'
  },
  {
    id: 'req-3',
    clientName: 'Meera Nair',
    currentPackage: 'Kashmir Trek (Standard)',
    requestType: 'Room Upgrade',
    details: 'Upgrade from Deluxe Room to Premium Suite',
    priceDetails: {
      originalPrice: 5000,
      newPrice: 8500,
      difference: 3500,
      gst: 630,
      total: 4130
    },
    status: 'Pending'
  }
]

export default function TripOperationsPage() {
  const [trips, setTrips] = useState<Trip[]>(initialTrips)
  const [requests, setRequests] = useState<TravellerRequest[]>(initialRequests)
  const [activeTab, setActiveTab] = useState<'departures' | 'requests' | 'offers'>('departures')
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  
  // Modal / Action flows
  const [actionFlow, setActionFlow] = useState<'none' | 'alternative_package' | 'merge_groups' | 'cancel_trip'>('none')
  const [suggestedPackage, setSuggestedPackage] = useState('Himachal Expedition')
  const [priceDiff, setPriceDiff] = useState(3000)
  const [expiryHours, setExpiryHours] = useState(48)
  const [mergeTarget, setMergeTarget] = useState('Goa Batch B (8 Travellers)')
  const [cancelReason, setCancelReason] = useState('Low Occupancy')

  // Price Difference Modal for approvals
  const [showPriceDifferenceModal, setShowPriceDifferenceModal] = useState<string | null>(null)

  const handleSendAlternativeOffer = () => {
    if (!selectedTrip) return
    toast.success(`Alternative Package offer ("${suggestedPackage}") broadcasted to all ${selectedTrip.confirmedTravellers} travellers in ${selectedTrip.packageName}!`)
    setTrips(prev => prev.map(t => 
      t.id === selectedTrip.id 
        ? { ...t, operationsRequired: 'Alternative Offered', status: 'Confirmed' } 
        : t
    ))
    setActionFlow('none')
  }

  const handleConfirmMerge = () => {
    if (!selectedTrip) return
    toast.success(`Groups merged successfully! ${selectedTrip.packageName} merged into ${mergeTarget}. Combined size: 26 travellers.`)
    setTrips(prev => prev.map(t => 
      t.id === selectedTrip.id 
        ? { ...t, capacityFilled: 26, status: 'Full', operationsRequired: 'Group Merged' } 
        : t
    ))
    setActionFlow('none')
  }

  const handleConfirmCancel = () => {
    if (!selectedTrip) return
    toast.success(`Departure cancelled due to "${cancelReason}". Auto-refund calculations generated for all travellers.`)
    setTrips(prev => prev.map(t => 
      t.id === selectedTrip.id 
        ? { ...t, status: 'Cancelled', operationsRequired: `Cancelled: ${cancelReason}` } 
        : t
    ))
    setActionFlow('none')
  }

  const handleApproveRequest = (reqId: string) => {
    const req = requests.find(r => r.id === reqId)
    if (!req) return
    
    // If there's a price difference, show the engine modal
    if (req.priceDetails && req.priceDetails.total > 0) {
      setShowPriceDifferenceModal(reqId)
    } else {
      // Free change (like date move) approved directly
      setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Approved' } : r))
      toast.success(`Request approved! Booking records auto-updated.`)
    }
  }

  const handleRejectRequest = (reqId: string) => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Rejected' } : r))
    toast.error(`Request rejected. Client notified.`)
  }

  const handleConfirmPriceDifference = (reqId: string) => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Approved' } : r))
    setShowPriceDifferenceModal(null)
    toast.success(`Payment request and updated invoice generated. Traveller notified.`)
  }

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
          <Bus className="w-6 h-6 text-teal" /> Trip Operations
        </h1>
        <p className="text-muted text-sm mt-1">Operational command center: manage occupancy audits, traveller change requests, upgrades, and group merges</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-2">
        <button
          onClick={() => { setActiveTab('departures'); setSelectedTrip(null); }}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'departures' ? 'border-teal text-teal' : 'border-transparent text-muted hover:text-navy'
          }`}
        >
          Upcoming Departures ({trips.length})
        </button>
        <button
          onClick={() => { setActiveTab('requests'); setSelectedTrip(null); }}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'requests' ? 'border-teal text-teal' : 'border-transparent text-muted hover:text-navy'
          }`}
        >
          Traveller Request Center ({requests.filter(r => r.status === 'Pending').length})
        </button>
        <button
          onClick={() => { setActiveTab('offers'); setSelectedTrip(null); }}
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 ${
            activeTab === 'offers' ? 'border-teal text-teal' : 'border-transparent text-muted hover:text-navy'
          }`}
        >
          Planner Offer Center
        </button>
      </div>

      {/* TAB 1: DEPARTURES */}
      {activeTab === 'departures' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          
          {/* Departures List */}
          <div className="xl:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-navy uppercase tracking-wider">Active Departures</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trips.map((trip) => {
                const isSelected = selectedTrip?.id === trip.id
                let statusColor = 'bg-teal/10 text-teal border-teal/20'
                if (trip.status === 'Low Occupancy') statusColor = 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                if (trip.status === 'Full') statusColor = 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                if (trip.status === 'Cancelled') statusColor = 'bg-red-500/10 text-red-600 border-red-500/20'

                return (
                  <Card 
                    key={trip.id} 
                    hover
                    onClick={() => { setSelectedTrip(trip); setActionFlow('none'); }}
                    className={`p-5 border cursor-pointer transition-all ${
                      isSelected ? 'border-teal ring-1 ring-teal' : 'border-border'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Title & Status */}
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-bold text-navy text-base">{trip.packageName}</h4>
                          <span className="text-[10px] text-muted font-medium block mt-0.5">{trip.destination}</span>
                        </div>
                        <Badge className={statusColor}>
                          {trip.status}
                        </Badge>
                      </div>

                      {/* Info grid */}
                      <div className="grid grid-cols-2 gap-4 text-xs py-3 border-y border-border/40">
                        <div>
                          <span className="text-[10px] text-muted uppercase block">Departure</span>
                          <span className="font-semibold text-navy mt-0.5 block">{trip.departureDate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted uppercase block">Capacity</span>
                          <span className="font-semibold text-navy mt-0.5 block">{trip.capacityFilled} / {trip.capacityMax} Pax</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted uppercase block">Pending Payments</span>
                          <span className={`font-semibold mt-0.5 block ${trip.pendingPaymentsCount > 0 ? 'text-yellow-500 font-bold' : 'text-muted'}`}>
                            {trip.pendingPaymentsCount} Pendings
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-muted uppercase block">Operations Req.</span>
                          <span className="font-semibold text-navy mt-0.5 block truncate">{trip.operationsRequired}</span>
                        </div>
                      </div>

                      {/* Footer Info */}
                      <div className="flex justify-between items-center text-[10px] text-muted">
                        <span>Min Required: {trip.minCapacity} Pax</span>
                        <span>Guide: {trip.plannerAssigned}</span>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Departure Workspace (Right Panel) */}
          <div className="xl:col-span-1">
            <AnimatePresence mode="wait">
              {selectedTrip ? (
                <motion.div
                  key={selectedTrip.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Card className="p-6 border border-border space-y-6">
                    <div>
                      <h3 className="font-bold text-navy text-base">{selectedTrip.packageName}</h3>
                      <p className="text-xs text-muted mt-0.5">Workspace & Change Manager</p>
                    </div>

                    {/* Low Occupancy Recommendations */}
                    {selectedTrip.status === 'Low Occupancy' && actionFlow === 'none' && (
                      <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-[14px] space-y-3">
                        <div className="flex gap-2 items-start text-xs text-yellow-600 font-bold">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>⚠ Low Occupancy Audit (Current: {selectedTrip.capacityFilled} / Min: {selectedTrip.minCapacity})</span>
                        </div>
                        <p className="text-[11px] text-muted leading-relaxed font-normal">
                          This departure is currently under minimum capacity. Beacon recommends executing one of the following changes:
                        </p>
                        <div className="grid grid-cols-1 gap-2 pt-1 text-xs">
                          <Button size="sm" variant="outline" className="w-full justify-start text-[11px] border-yellow-500/30" onClick={() => setActionFlow('alternative_package')}>
                            Offer Alternative Package
                          </Button>
                          <Button size="sm" variant="outline" className="w-full justify-start text-[11px] border-yellow-500/30" onClick={() => setActionFlow('merge_groups')}>
                            Merge With Another Group
                          </Button>
                          <Button size="sm" variant="outline" className="w-full justify-start text-[11px] border-yellow-500/30" onClick={() => setActionFlow('cancel_trip')}>
                            Cancel Departure
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Action Flow Panel: Alternative Package Offer */}
                    {actionFlow === 'alternative_package' && (
                      <div className="p-4 bg-teal/5 border border-teal/20 rounded-[14px] space-y-4 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-teal">Offer Alternative Package</span>
                          <Button size="xs" variant="ghost" onClick={() => setActionFlow('none')}>Cancel</Button>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-[10px] text-muted font-bold">Suggested Package</label>
                            <Input value={suggestedPackage} onChange={(e) => setSuggestedPackage(e.target.value)} />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] text-muted font-bold">Price Difference (₹)</label>
                              <Input type="number" value={priceDiff} onChange={(e) => setPriceDiff(Number(e.target.value))} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-muted font-bold">Offer Expiry (Hours)</label>
                              <Input type="number" value={expiryHours} onChange={(e) => setExpiryHours(Number(e.target.value))} />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-muted font-bold">Message</label>
                            <textarea
                              rows={2}
                              className="w-full p-2.5 bg-surface border border-border rounded-[10px] text-xs focus:outline-none placeholder:text-muted/60"
                              placeholder="Minimum group size not reached, offering alternative adventure package..."
                            />
                          </div>
                        </div>

                        {/* Price Difference Summary Indicator */}
                        <div className="bg-white/[0.02] p-3 rounded-[10px] border border-border/20 text-[10px] space-y-1 font-medium">
                          <div className="flex justify-between"><span>Original Package:</span><span>₹{selectedTrip.originalPrice}</span></div>
                          <div className="flex justify-between"><span>New Package:</span><span>₹{selectedTrip.originalPrice + priceDiff}</span></div>
                          <div className="flex justify-between font-bold text-teal border-t border-border/10 pt-1">
                            <span>Adjust Payable:</span><span>+₹{priceDiff}</span>
                          </div>
                        </div>

                        <Button glow size="sm" className="w-full" onClick={handleSendAlternativeOffer}>
                          Send Offer to {selectedTrip.confirmedTravellers} Travellers
                        </Button>
                      </div>
                    )}

                    {/* Action Flow Panel: Merge Groups */}
                    {actionFlow === 'merge_groups' && (
                      <div className="p-4 bg-teal/5 border border-teal/20 rounded-[14px] space-y-4 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-teal">Merge Groups</span>
                          <Button size="xs" variant="ghost" onClick={() => setActionFlow('none')}>Cancel</Button>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-[10px] text-muted font-bold">Select Target Group to Merge into</label>
                          <select 
                            value={mergeTarget} 
                            onChange={(e) => setMergeTarget(e.target.value)}
                            className="w-full p-2.5 bg-surface border border-border rounded-[10px] text-xs text-navy focus:outline-none focus:border-teal/30"
                          >
                            <option>Goa Batch B (8 Travellers)</option>
                            <option>Goa Batch C (10 Travellers)</option>
                            <option>Kashmir Adventure Batch D (12 Travellers)</option>
                          </select>
                        </div>

                        <p className="text-[11px] text-muted leading-relaxed font-normal">
                          Merging will automatically transition both groups into a single combined operational departure record and notify all participants.
                        </p>

                        <Button glow size="sm" className="w-full" onClick={handleConfirmMerge}>
                          Confirm Group Merge
                        </Button>
                      </div>
                    )}

                    {/* Action Flow Panel: Cancel Trip */}
                    {actionFlow === 'cancel_trip' && (
                      <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-[14px] space-y-4 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-red-600">Cancel Departure</span>
                          <Button size="xs" variant="ghost" onClick={() => setActionFlow('none')}>Cancel</Button>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-[10px] text-muted font-bold">Cancellation Reason</label>
                          <select 
                            value={cancelReason} 
                            onChange={(e) => setCancelReason(e.target.value)}
                            className="w-full p-2.5 bg-surface border border-border rounded-[10px] text-xs text-navy focus:outline-none focus:border-red-500/30"
                          >
                            <option>Low Occupancy</option>
                            <option>Extreme Weather Alert</option>
                            <option>Government Restrictions</option>
                            <option>Operational Issue</option>
                          </select>
                        </div>

                        <div className="bg-white/[0.02] p-3 rounded-[10px] border border-border/20 text-[10px] space-y-1 font-medium text-muted">
                          <div className="flex justify-between"><span>Base Refund:</span><span>₹{selectedTrip.originalPrice}</span></div>
                          <div className="flex justify-between"><span>GST Refund (18%):</span><span>₹{selectedTrip.originalPrice * 0.18}</span></div>
                          <div className="flex justify-between font-bold text-red-500 border-t border-border/10 pt-1">
                            <span>Total Refund per traveler:</span><span>₹{selectedTrip.originalPrice * 1.18}</span>
                          </div>
                        </div>

                        <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold" onClick={handleConfirmCancel}>
                          Confirm Cancellation & Auto-Refund
                        </Button>
                      </div>
                    )}

                    {/* Trip Timeline tracker */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-navy flex items-center gap-1.5"><ClipboardList className="w-4 h-4 text-teal" /> Operations Timeline</span>
                      <div className="relative pl-4 space-y-3.5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-border/60">
                        {selectedTrip.timeline.map((step, idx) => (
                          <div key={idx} className="relative flex gap-3 text-xs">
                            <div className={`absolute -left-[14px] top-1.5 w-2 h-2 rounded-full border ${
                              step.done ? 'bg-teal border-teal' : 'bg-surface border-border'
                            }`} />
                            <div>
                              <span className="font-bold text-navy block">{step.event}</span>
                              <span className="text-[10px] text-muted block font-medium">{step.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Info list */}
                    <div className="space-y-3 border-t border-border/40 pt-4 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted">Assigned Planner:</span>
                        <span className="font-semibold text-navy">{selectedTrip.plannerAssigned}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Status Code:</span>
                        <span className="font-medium text-navy font-bold">{selectedTrip.id.toUpperCase()}</span>
                      </div>
                    </div>

                  </Card>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 bg-surface border border-dashed border-border rounded-[24px] text-center text-muted">
                  <Bus className="w-8 h-8 text-muted/60 mb-2" />
                  <p className="text-xs font-semibold">Select a departure card to open the operational manager workspace</p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      )}

      {/* TAB 2: REQUEST CENTER */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-navy uppercase tracking-wider">Pending Traveller Requests</h3>
          
          {requests.filter(r => r.status === 'Pending').length === 0 ? (
            <Card className="p-8 text-center text-muted border border-dashed border-border flex flex-col items-center justify-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-teal/80" />
              <h4 className="font-bold text-navy text-sm">🎉 Great! No operational issues.</h4>
              <p className="text-xs text-muted max-w-sm">All departures are running smoothly and there are no pending traveller change requests.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {requests.filter(r => r.status === 'Pending').map((req) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="p-5 border border-border space-y-4">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-bold text-navy text-base">{req.clientName}</h4>
                        <span className="text-[10px] text-muted block mt-0.5">Current: {req.currentPackage}</span>
                      </div>
                      <Badge className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20">
                        {req.requestType}
                      </Badge>
                    </div>

                    {/* Details description */}
                    <p className="text-xs text-navy/80 bg-page/50 p-3 rounded-[10px] border border-border/20">
                      "{req.details}"
                    </p>

                    {/* Actions panel */}
                    <div className="flex justify-between items-center gap-3 pt-3 border-t border-border/5">
                      <span className="text-[10px] text-muted font-medium">{req.id.toUpperCase()}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={() => handleRejectRequest(req.id)}>
                          Reject
                        </Button>
                        <Button size="sm" glow onClick={() => handleApproveRequest(req.id)}>
                          Approve
                        </Button>
                      </div>
                    </div>

                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: OFFER CENTER */}
      {activeTab === 'offers' && (
        <div className="max-w-xl mx-auto">
          <Card className="p-6 border border-border space-y-6">
            <div>
              <h3 className="font-bold text-navy text-base flex items-center gap-2"><Sparkles className="w-5 h-5 text-teal" /> Create Proactive Offer</h3>
              <p className="text-xs text-muted mt-0.5">Blast custom upgrade packages, room options, or alternative dates to specific client bases.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-muted font-bold">Offer Type</label>
                  <select className="w-full p-2.5 bg-surface border border-border rounded-[10px] text-xs text-navy focus:outline-none focus:border-teal/30">
                    <option>Package Upgrade (SUV, Activities)</option>
                    <option>Hotel & Room Upgrade (Premium suite)</option>
                    <option>Alternative Departure Date Offer</option>
                    <option>Custom Discount coupon</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-muted font-bold">Offer Expiry Date</label>
                  <Input type="date" defaultValue="2026-10-18" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-muted font-bold">Additional Cost (₹)</label>
                  <Input type="number" defaultValue="1500" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] text-muted font-bold">Target Travellers group</label>
                  <select className="w-full p-2.5 bg-surface border border-border rounded-[10px] text-xs text-navy focus:outline-none focus:border-teal/30">
                    <option>All Kashmir Planners (8 Pax)</option>
                    <option>All Goa Planners (18 Pax)</option>
                    <option>Repeat clients list only</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-muted font-bold">Custom Notification Message</label>
                <textarea
                  rows={3}
                  className="w-full p-3 bg-surface border border-border rounded-[12px] text-xs focus:outline-none"
                  placeholder="Offer: Upgrade your Goa package to include premium private SUV transit. Highly recommended for couples!"
                />
              </div>

              <Button glow className="w-full py-3" onClick={() => toast.success('Proactive marketing offer broadcasted!')}>
                Broadcast Offer Card
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* PRICE DIFFERENCE ENGINE MODAL */}
      <AnimatePresence>
        {showPriceDifferenceModal && (() => {
          const req = requests.find(r => r.id === showPriceDifferenceModal)
          if (!req || !req.priceDetails) return null
          
          return (
            <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-surface border border-border rounded-[24px] shadow-2xl overflow-hidden p-6 space-y-6"
              >
                <div>
                  <h3 className="text-lg font-bold text-navy flex items-center gap-1.5"><RefreshCw className="w-5 h-5 text-teal animate-spin" /> Price Difference Engine</h3>
                  <p className="text-xs text-muted mt-0.5">Automated billing calculations & invoice adjustments</p>
                </div>

                <div className="space-y-3.5 text-xs border-y border-border/40 py-4 font-medium">
                  <div className="flex justify-between"><span>Original Package base:</span><span className="text-navy font-semibold">₹{req.priceDetails.originalPrice}</span></div>
                  <div className="flex justify-between"><span>New Package base:</span><span className="text-navy font-semibold">₹{req.priceDetails.newPrice}</span></div>
                  <div className="flex justify-between text-teal font-bold border-t border-border/10 pt-2 text-sm">
                    <span>Base Difference:</span><span>+₹{req.priceDetails.difference}</span>
                  </div>
                  <div className="flex justify-between text-muted text-[11px]">
                    <span>GST (18% code: Tax):</span><span>+₹{req.priceDetails.gst}</span>
                  </div>
                  <div className="flex justify-between text-navy font-extrabold border-t-2 border-border/20 pt-2 text-base">
                    <span>Total Adjust Payable:</span><span>₹{req.priceDetails.total}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setShowPriceDifferenceModal(null)}>
                    Cancel
                  </Button>
                  <Button glow onClick={() => handleConfirmPriceDifference(req.id)}>
                    Confirm & Send Invoice
                  </Button>
                </div>
              </motion.div>
            </div>
          )
        })()}
      </AnimatePresence>

    </div>
  )
}
