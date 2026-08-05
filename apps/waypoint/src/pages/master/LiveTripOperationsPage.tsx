import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Bus,
  PhoneCall,
  Radio,
  Search,
  MessageSquare,
  Send,
} from 'lucide-react'
import { useMasterAdmin } from '@/context/MasterAdminContext'
import { type LiveTripDeparture } from '@/data/masterAdminData'
import { toast } from 'sonner'

export default function LiveTripOperationsPage() {
  const { liveTrips, broadcastAnnouncement } = useMasterAdmin()
  const [selectedTrip, setSelectedTrip] = useState<LiveTripDeparture | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [broadcastingToTrip, setBroadcastingToTrip] = useState(false)
  const [tripMsg, setTripMsg] = useState('')

  const filteredTrips = liveTrips.filter((t) => {
    const q = searchQuery.toLowerCase()
    return (
      t.tripCode.toLowerCase().includes(q) ||
      t.packageName.toLowerCase().includes(q) ||
      t.destination.toLowerCase().includes(q) ||
      t.plannerName.toLowerCase().includes(q)
    )
  })

  const handleSendTripBroadcast = () => {
    if (!selectedTrip || !tripMsg) return
    broadcastAnnouncement(
      `Trip Update: ${selectedTrip.packageName} (${selectedTrip.tripCode})`,
      tripMsg
    )
    toast.success(`Message dispatched to all ${selectedTrip.travellerCount} travellers on ${selectedTrip.tripCode}`)
    setTripMsg('')
    setBroadcastingToTrip(false)
  }

  return (
    <div className="space-y-8 font-body">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan tracking-widest uppercase mb-1">
            <Radio className="w-4 h-4 text-cyan animate-pulse" />
            <span>Real-time Departure Operations</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            LIVE TRIP <span className="text-gradient">OPERATIONS</span> CENTER
          </h1>
          <p className="text-xs text-cyan-200/70 font-mono mt-1">
            Monitor active departures across India, vehicle tracking, guide contacts & emergency resolution
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>186 Active Departures Today</span>
          </span>
        </div>
      </div>

      {/* SEARCH BAR & STATUS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <input
            type="text"
            placeholder="Search trip code (DEP-904), destination, planner, vehicle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#001736] border border-cyan/30 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder:text-cyan/40 focus:outline-none focus:border-cyan font-mono"
          />
          <Search className="w-4 h-4 text-cyan/60 absolute left-3.5 top-3.5" />
        </div>

        <div className="glass-dark px-4 py-2.5 rounded-xl border border-cyan/30 flex items-center justify-between font-mono text-xs">
          <span className="text-cyan-300/70">GPS Telemetry Signals:</span>
          <span className="text-emerald-400 font-bold">100% Signal Lock</span>
        </div>
      </div>

      {/* TRIP CARDS & MAP TELEMETRY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 7 COLS: TRIP LIST */}
        <div className="lg:col-span-7 space-y-4">
          {filteredTrips.map((trip) => {
            const isEmergency = trip.status === 'emergency_alert'
            const isDelayed = trip.status === 'delayed'
            return (
              <motion.div
                key={trip.id}
                whileHover={{ scale: 1.01 }}
                className={`glass-dark p-5 rounded-2xl border transition-all ${
                  isEmergency
                    ? 'border-red-500/60 bg-red-500/10 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                    : isDelayed
                    ? 'border-amber-500/40 bg-amber-500/5'
                    : 'border-cyan/30 hover:border-cyan/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-cyan/15 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan text-xs font-bold">
                      {trip.tripCode}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        isEmergency
                          ? 'bg-red-600 text-white animate-bounce'
                          : isDelayed
                          ? 'bg-amber-500 text-navy'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {trip.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-xs text-cyan-300/70">
                    Occupancy: <strong className="text-white">{trip.occupancyPercent}%</strong> ({trip.travellerCount}/{trip.maxCapacity})
                  </div>
                </div>

                <div className="py-3 space-y-2">
                  <h3 className="text-base font-bold text-white font-heading">{trip.packageName}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-1.5 text-cyan">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-cyan-300/70">
                      <Bus className="w-3.5 h-3.5 text-cyan" />
                      <span>{trip.vehicleInfo}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-navy/60 border border-cyan/15 font-mono text-xs flex items-center justify-between">
                    <span className="text-cyan-200/80">GPS Location:</span>
                    <span className="text-emerald-400 font-bold">{trip.currentLocationName}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-cyan/15 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                  <div className="text-cyan-300/70">
                    Planner: <strong className="text-white">{trip.plannerName}</strong> ({trip.plannerPhone})
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedTrip(trip)
                        setBroadcastingToTrip(true)
                      }}
                      className="px-3 py-1.5 rounded-lg bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 text-cyan text-xs font-bold flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Message Group</span>
                    </button>

                    <button
                      onClick={() => setSelectedTrip(trip)}
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-teal to-cyan text-navy font-bold text-xs shadow-md"
                    >
                      Trip Ops Panel
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* RIGHT 5 COLS: GPS RADAR MAP VISUALIZER */}
        <div className="lg:col-span-5 glass-dark p-6 rounded-2xl border border-cyan/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-cyan/20 mb-4">
              <h3 className="text-xs font-mono text-cyan uppercase font-bold flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyan animate-pulse" />
                <span>GPS Radar & Satellite Live Map</span>
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">Live Satellite Lock</span>
            </div>

            {/* MOCK GPS INTERACTIVE RADAR DISPLAY */}
            <div className="relative w-full h-80 rounded-2xl bg-[#001224] border border-cyan/40 overflow-hidden flex items-center justify-center p-4">
              {/* Radar Rings */}
              <div className="absolute w-64 h-64 rounded-full border border-cyan/20 animate-ping opacity-30" />
              <div className="absolute w-48 h-48 rounded-full border border-cyan/30" />
              <div className="absolute w-32 h-32 rounded-full border border-cyan/40" />

              {/* Map Nodes */}
              <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
                <span className="w-4 h-4 rounded-full bg-emerald-400 animate-ping border-2 border-white shadow-[0_0_15px_rgba(52,211,153,0.9)]" />
                <span className="text-[9px] font-mono text-emerald-300 bg-navy/80 px-1.5 py-0.5 rounded mt-1">DEP-904 (Leh)</span>
              </div>

              <div className="absolute top-1/2 right-1/4 flex flex-col items-center">
                <span className="w-4 h-4 rounded-full bg-amber-400 animate-bounce border-2 border-white shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
                <span className="text-[9px] font-mono text-amber-300 bg-navy/80 px-1.5 py-0.5 rounded mt-1">DEP-882 (Munnar)</span>
              </div>

              <div className="absolute bottom-1/4 left-1/2 flex flex-col items-center">
                <span className="w-4.5 h-4.5 rounded-full bg-red-600 animate-pulse border-2 border-white shadow-[0_0_20px_rgba(239,68,68,1)]" />
                <span className="text-[9px] font-mono text-red-300 bg-navy/80 px-1.5 py-0.5 rounded mt-1 font-bold">DEP-774 (EMERGENCY)</span>
              </div>

              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-cyan-300/60 bg-navy/80 px-2 py-1 rounded">
                Simulated GIS Map Feed • 3 Departures Locked
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-navy/60 border border-cyan/15 text-xs font-mono space-y-1">
            <div className="text-cyan font-bold">Emergency Operations Protocol</div>
            <p className="text-[11px] text-slate-300">
              In case of unresponsiveness &gt; 120 minutes, auto-dispatch SOS message to regional emergency response team & re-route travellers.
            </p>
          </div>
        </div>
      </div>

      {/* TRIP OPERATIONS DOSSIER MODAL */}
      <AnimatePresence>
        {selectedTrip && !broadcastingToTrip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl glass-dark rounded-2xl border border-cyan/40 p-6 shadow-2xl space-y-4 font-mono text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-cyan/20">
                <div>
                  <h3 className="text-base font-bold text-white font-heading">{selectedTrip.packageName}</h3>
                  <p className="text-xs text-cyan">{selectedTrip.tripCode} • {selectedTrip.destination}</p>
                </div>
                <button onClick={() => setSelectedTrip(null)} className="px-3 py-1 bg-navy text-slate-300 rounded">
                  Close Panel
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-navy/60 rounded-xl border border-cyan/15">
                <div>Tour Guide: <strong className="text-white">{selectedTrip.tourGuideName} ({selectedTrip.tourGuidePhone})</strong></div>
                <div>Planner Phone: <strong className="text-white">{selectedTrip.plannerPhone}</strong></div>
                <div>Vehicle Info: <strong className="text-white">{selectedTrip.vehicleInfo}</strong></div>
                <div>Open Complaints: <strong className="text-red-400">{selectedTrip.openComplaintsCount} Complaints</strong></div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  onClick={() => {
                    toast.success(`Direct Call Initiated to Planner (${selectedTrip.plannerPhone})`)
                  }}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-xl font-bold flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Planner</span>
                </button>

                <button
                  onClick={() => {
                    toast.warning(`Emergency Lockdown triggered for Departure ${selectedTrip.tripCode}`)
                    setSelectedTrip(null)
                  }}
                  className="px-4 py-2 bg-red-600/30 text-red-200 border border-red-500/50 rounded-xl font-bold"
                >
                  Cancel Departure
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TRIP GROUP BROADCAST MODAL */}
      <AnimatePresence>
        {selectedTrip && broadcastingToTrip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg glass-dark rounded-2xl border border-cyan/40 p-6 shadow-2xl space-y-4 font-mono text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-cyan/20">
                <h3 className="text-base font-bold text-white font-heading">
                  Broadcast to {selectedTrip.travellerCount} Travellers on {selectedTrip.tripCode}
                </h3>
                <button onClick={() => setBroadcastingToTrip(false)} className="px-3 py-1 bg-navy text-slate-300 rounded">
                  Cancel
                </button>
              </div>

              <div>
                <label className="block text-cyan-200/80 mb-1">Message Content</label>
                <textarea
                  rows={4}
                  placeholder="e.g. Weather update / Driver replacement notice..."
                  value={tripMsg}
                  onChange={(e) => setTripMsg(e.target.value)}
                  className="w-full bg-[#001736] border border-cyan/30 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSendTripBroadcast}
                  className="px-5 py-2 rounded-xl bg-cyan text-navy font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Broadcast SMS/Push</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
