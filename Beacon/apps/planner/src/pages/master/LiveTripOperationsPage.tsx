import { useState } from 'react';
import { useMasterAdmin, type LiveTrip } from '@/data/masterAdminData';
import { 
  Radio, Compass, ShieldAlert, AlertCircle, Phone, User, 
  MapPin, ShieldCheck, Mail, Megaphone, CornerUpRight, RefreshCw, XSquare
} from 'lucide-react';
import { toast } from 'sonner';

export default function LiveTripOperationsPage() {
  const { liveTrips, planners, manageActiveTrip } = useMasterAdmin();

  // Selected Trip state
  const [selectedTripId, setSelectedTripId] = useState<string | null>(
    liveTrips.find(t => t.status === 'EMERGENCY')?.id || liveTrips[0]?.id || null
  );

  const activeTrip = liveTrips.find(t => t.id === selectedTripId);

  // local simulation states
  const [broadcastText, setBroadcastText] = useState('');
  const [selectedTransferGroup, setSelectedTransferGroup] = useState('');
  const [isContacting, setIsContacting] = useState(false);

  const handleBroadcast = () => {
    if (!broadcastText) {
      toast.error('Announcement text is required');
      return;
    }
    toast.success(`Announcement broadcasted to all travelers in Group ${selectedTripId}.`);
    setBroadcastText('');
  };

  const handleEmergencyAction = () => {
    if (!activeTrip) return;
    manageActiveTrip(activeTrip.id, 'CANCEL');
    toast.success(`SOS resolved. Group ${selectedTripId} emergency flag terminated.`);
  };

  const handleContactPlanner = () => {
    if (!activeTrip) return;
    setIsContacting(true);
    toast.info(`Connecting to operational manager for: ${activeTrip.plannerName}...`);
    setTimeout(() => {
      setIsContacting(false);
      toast.success(`Encrypted voice link established with ${activeTrip.plannerName} representative.`);
    }, 1200);
  };

  const handleTransferTravelers = () => {
    if (!selectedTransferGroup) {
      toast.error('Please select target trip group');
      return;
    }
    toast.success(`Transferred guests from ${selectedTripId} to ${selectedTransferGroup}`);
    setSelectedTransferGroup('');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 select-none">
      
      {/* ==========================================
          LEFT: MAP VISUALIZER & TRIPS LIST
          ========================================== */}
      <div className="xl:col-span-8 space-y-6">
        
        {/* Mock GPS Map Panel */}
        <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-850 pb-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Compass size={18} className="text-cyan-400" /> GPS Operational Satellite Tracking
            </h3>
            <span className="text-[10px] font-medium text-gray-500">
              Active Coordinates: 2 Nodes Online
            </span>
          </div>

          {/* Interactive Coordinate Map Plot */}
          <div className="relative border border-gray-850 bg-gray-950 rounded-2xl h-80 overflow-hidden flex items-center justify-center">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:16px_16px] opacity-30" />
            
            <div className="absolute text-[10px] font-medium text-gray-650 p-2 bottom-0 left-0">
              SATELLITE RECEPTOR FEED: GPS_MOCK_GRID
            </div>

            {/* Render Trip Markers */}
            {liveTrips.map((trip) => {
              // Map mock latitude/longitude to grid percentages
              const leftPct = trip.destination.includes('Ladakh') ? '45%' : '65%';
              const topPct = trip.destination.includes('Ladakh') ? '30%' : '70%';
              const isSelected = trip.id === selectedTripId;

              return (
                <button
                  key={trip.id}
                  onClick={() => setSelectedTripId(trip.id)}
                  style={{ left: leftPct, top: topPct }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10 transition-all ${
                    isSelected ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  <span className="relative flex h-5 w-5">
                    {trip.status === 'EMERGENCY' ? (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">SOS</span>
                      </>
                    ) : trip.status === 'DELAYED' ? (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500 border-2 border-white" />
                      </>
                    ) : (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-30" />
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-green-500 border-2 border-white" />
                      </>
                    )}
                  </span>
                  
                  {/* Tooltip labels */}
                  <span className={`mt-1.5 px-2 py-0.5 rounded text-[9px] font-medium font-bold border transition-colors ${
                    isSelected 
                      ? 'bg-cyan-500 text-black border-white' 
                      : 'bg-gray-900 text-gray-300 border-gray-800'
                  }`}>
                    {trip.id} - {trip.destination}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Trips Table List */}
        <div className="border border-gray-855 bg-gray-900/40 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-medium">
              <thead>
                <tr className="border-b border-gray-850 bg-gray-950/40 text-gray-400">
                  <th className="p-4">Trip Group</th>
                  <th className="p-4">Destination</th>
                  <th className="p-4">Planner Agency</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Travellers</th>
                  <th className="p-4 text-center">Active Flags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-855">
                {liveTrips.map((trip) => {
                  const isSelected = trip.id === selectedTripId;
                  return (
                    <tr 
                      key={trip.id} 
                      onClick={() => setSelectedTripId(trip.id)}
                      className={`cursor-pointer hover:bg-gray-850/20 text-gray-300 transition-colors ${
                        isSelected ? 'bg-cyan-950/20 text-cyan-400 font-bold border-l-2 border-cyan-500' : ''
                      }`}
                    >
                      <td className="p-4 font-bold">{trip.id}</td>
                      <td className="p-4 text-gray-400">{trip.destination}</td>
                      <td className="p-4">{trip.plannerName}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          trip.status === 'EMERGENCY'
                            ? 'bg-red-950 text-red-500 animate-pulse'
                            : trip.status === 'DELAYED'
                            ? 'bg-amber-950 text-amber-400'
                            : 'bg-green-950 text-green-400'
                        }`}>
                          {trip.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">{trip.travellersCount} Guests</td>
                      <td className="p-4 text-center">
                        {trip.emergencyFlags.length > 0 ? (
                          <span className="text-red-400 font-bold text-[10px]">{trip.emergencyFlags.join(', ')}</span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ==========================================
          RIGHT: OPERATIONS COMMAND CABINET
          ========================================== */}
      <div className="xl:col-span-4 space-y-6">
        {activeTrip ? (
          <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-6">
            
            {/* Header info */}
            <div className="border-b border-gray-850 pb-4 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-cyan-400 font-medium font-bold">DEPARTURE COMMAND</span>
                <span className="text-[10px] text-gray-500 font-medium">ID: {activeTrip.id}</span>
              </div>
              <h3 className="text-lg font-black text-white">{activeTrip.destination}</h3>
              <p className="text-xs text-gray-400 font-medium">Agency: {activeTrip.plannerName}</p>
            </div>

            {/* Guide Contact Details */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium">
                Assigned Departure Team
              </h4>
              <div className="border border-gray-855 bg-gray-950/40 p-4 rounded-2xl space-y-2.5 text-xs font-medium text-gray-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><User size={13} /> Guide:</span>
                  <span className="text-gray-200">{activeTrip.guideName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Phone size={13} /> Phone:</span>
                  <span className="text-gray-200">{activeTrip.guidePhone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Compass size={13} /> Vehicle:</span>
                  <span className="text-cyan-400">{activeTrip.vehicleNumber}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><MapPin size={13} /> Location:</span>
                  <span className="text-gray-300">{activeTrip.gpsCoordinates.lat}, {activeTrip.gpsCoordinates.lng}</span>
                </div>
              </div>
            </div>

            {/* Incident Alert box */}
            {activeTrip.status === 'EMERGENCY' && (
              <div className="border border-red-900/30 bg-red-950/15 p-4 rounded-2xl space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-red-400 leading-normal">
                  <ShieldAlert className="shrink-0 animate-bounce" size={18} />
                  <div className="space-y-0.5">
                    <span className="font-bold uppercase tracking-wider text-[10px]">SOS Alert Triggered</span>
                    <p className="text-[11px] leading-relaxed text-red-300">
                      SOS flag initiated for ALTITUDE SICKNESS and VEHICLE BREAKDOWN. Immediate administrative response required.
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleEmergencyAction}
                  className="w-full py-2 bg-red-650 hover:bg-red-550 text-gray-950 font-bold rounded-xl text-xs font-medium uppercase cursor-pointer"
                >
                  Terminate Emergency SOS
                </button>
              </div>
            )}

            {/* Direct Broadcast to Travelers */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium flex items-center gap-1">
                <Megaphone size={13} className="text-cyan-400" /> Broadcast to Group Travelers
              </h4>
              <div className="space-y-2">
                <textarea
                  placeholder="Type dispatch messages (delays, itinerary updates)..."
                  value={broadcastText}
                  onChange={(e) => setBroadcastText(e.target.value)}
                  rows={3}
                  className="w-full bg-gray-950 border border-gray-850 rounded-2xl p-3 text-xs outline-none text-gray-200 resize-none font-medium"
                />
                <button
                  onClick={handleBroadcast}
                  className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs cursor-pointer"
                >
                  Broadcast Push announcement
                </button>
              </div>
            </div>

            {/* Transfer travelers */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium flex items-center gap-1">
                <CornerUpRight size={13} className="text-cyan-400" /> Transfer Travelers between departures
              </h4>
              <div className="flex gap-2">
                <select
                  value={selectedTransferGroup}
                  onChange={(e) => setSelectedTransferGroup(e.target.value)}
                  className="flex-1 bg-gray-950 border border-gray-850 rounded-xl px-3 py-2 text-xs text-gray-200 outline-none font-medium"
                >
                  <option value="">Select Target Group</option>
                  {liveTrips.filter(t => t.id !== activeTrip.id).map(t => (
                    <option key={t.id} value={t.id}>{t.id} - {t.destination}</option>
                  ))}
                </select>
                <button
                  onClick={handleTransferTravelers}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl text-xs cursor-pointer font-medium"
                >
                  Transfer
                </button>
              </div>
            </div>

            {/* Contact Planner Agency representative */}
            <button
              onClick={handleContactPlanner}
              disabled={isContacting}
              className="w-full py-3 rounded-2xl bg-gray-950 hover:bg-gray-850 text-gray-300 border border-gray-800 font-bold text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw size={14} className={isContacting ? 'animate-spin' : ''} />
              {isContacting ? 'CONNECTING AGENT...' : 'ESTABLISH LINK WITH OPERATOR'}
            </button>

          </div>
        ) : (
          <div className="border border-dashed border-gray-855 rounded-3xl p-12 text-center text-gray-500 font-medium text-xs">
            Select a trip from the monitoring board.
          </div>
        )}
      </div>

    </div>
  );
}
