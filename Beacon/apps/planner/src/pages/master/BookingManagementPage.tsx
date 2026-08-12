import { useState } from 'react';
import { useMasterAdmin, type Booking } from '@/data/masterAdminData';
import { 
  Calendar, Search, FileText, Download, ShieldAlert, ShieldCheck, 
  ArrowRight, XCircle, AlertTriangle, Coffee, Compass, Users, Clock, CreditCard
} from 'lucide-react';
import { toast } from 'sonner';

export default function BookingManagementPage() {
  const { bookings, packages, updateBookingStatus, processRefund, addCustomAuditLog } = useMasterAdmin();

  // Search filter query state
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Booking Drawer
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    bookings[0]?.id || null
  );

  const activeBooking = bookings.find(b => b.id === selectedBookingId);

  // local simulation states
  const [transferTargetPkgId, setTransferTargetPkgId] = useState('');
  const [customRefundAmount, setCustomRefundAmount] = useState('');

  // Filter bookings helper
  const filteredBookings = bookings.filter(b => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.id.toLowerCase().includes(q) ||
      b.customerName.toLowerCase().includes(q) ||
      b.plannerName.toLowerCase().includes(q) ||
      b.packageTitle.toLowerCase().includes(q) ||
      (b.utrNumber && b.utrNumber.toLowerCase().includes(q))
    );
  });

  const handleCancelBooking = () => {
    if (!activeBooking) return;
    const confirm = window.confirm(`Are you sure you want to cancel booking: ${activeBooking.id}?`);
    if (confirm) {
      updateBookingStatus(activeBooking.id, 'CANCELLED', 'REFUNDED');
      toast.success(`Booking ${activeBooking.id} cancelled. Payout marked for refund.`);
    }
  };

  const handleFreezeBooking = () => {
    if (!activeBooking) return;
    updateBookingStatus(activeBooking.id, 'PENDING', 'FROZEN');
    toast.error(`Security Incident Flagged. Booking ${activeBooking.id} settlement funds FROZEN.`);
  };

  const handleRefund = () => {
    if (!activeBooking) return;
    const amt = parseFloat(customRefundAmount);
    if (isNaN(amt) || amt <= 0 || amt > activeBooking.amount) {
      toast.error('Please enter a valid refund amount up to full booking cost');
      return;
    }
    processRefund(activeBooking.id, amt);
    toast.success(`Manual refund of ₹${amt} dispatched for Booking ${activeBooking.id}.`);
    setCustomRefundAmount('');
  };

  const handleTransfer = () => {
    if (!transferTargetPkgId) {
      toast.error('Select target package to transfer guest');
      return;
    }
    const targetPkgName = packages.find(p => p.id === transferTargetPkgId)?.title;
    addCustomAuditLog(`Transferred Booking ${activeBooking?.id} to Package ${targetPkgName}`, 'Bookings');
    toast.success(`Booking transferred successfully to: ${targetPkgName}`);
    setTransferTargetPkgId('');
  };

  const handleDownloadInvoice = () => {
    toast.info('Generating PDF Invoice from microservice...');
    setTimeout(() => {
      toast.success('Invoice INV-9284.pdf downloaded to disk.');
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 select-none">
      
      {/* ==========================================
          LEFT: DIRECTORY INDEX & SEARCH
          ========================================== */}
      <div className="xl:col-span-8 space-y-4">
        
        {/* Search Input bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <Search size={14} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Booking ID, Traveler, Operator, Destination, or UTR..."
            className="w-full bg-gray-900 border border-gray-850 pl-9 pr-4 py-2.5 rounded-xl text-xs outline-none text-gray-200 font-medium focus:border-cyan-500/30"
          />
        </div>

        {/* Bookings Table Index */}
        <div className="border border-gray-855 bg-gray-900/40 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-medium">
              <thead>
                <tr className="border-b border-gray-850 bg-gray-950/40 text-gray-400">
                  <th className="p-4">Booking ID</th>
                  <th className="p-4">Traveler Name</th>
                  <th className="p-4">Package Title</th>
                  <th className="p-4">Travel Date</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Trip Status</th>
                  <th className="p-4">Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-855">
                {filteredBookings.map((b) => {
                  const isSelected = b.id === selectedBookingId;
                  return (
                    <tr
                      key={b.id}
                      onClick={() => setSelectedBookingId(b.id)}
                      className={`cursor-pointer hover:bg-gray-850/20 text-gray-300 transition-all ${
                        isSelected ? 'bg-cyan-950/20 text-cyan-400 font-bold border-l-2 border-cyan-500' : ''
                      }`}
                    >
                      <td className="p-4 font-bold text-cyan-300">{b.id}</td>
                      <td className="p-4">{b.customerName}</td>
                      <td className="p-4 truncate max-w-[150px]">{b.packageTitle}</td>
                      <td className="p-4">{b.travelDate}</td>
                      <td className="p-4 text-cyan-300">₹{b.amount.toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          b.status === 'CONFIRMED'
                            ? 'bg-green-950 text-green-400 border border-green-500/10'
                            : b.status === 'CANCELLED'
                            ? 'bg-red-950 text-red-500 border border-red-500/10'
                            : 'bg-yellow-950 text-yellow-400'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          b.paymentStatus === 'PAID'
                            ? 'bg-green-950 text-green-400'
                            : b.paymentStatus === 'REFUNDED'
                            ? 'bg-blue-950 text-blue-400'
                            : 'bg-red-950 text-red-500 animate-pulse'
                        }`}>
                          {b.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}

                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-20 text-gray-600 font-medium text-xs border border-dashed border-gray-855 rounded-3xl">
                      No records match the requested search query index.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ==========================================
          RIGHT: DETAIL LIFECYCLE MONITOR DRAWER
          ========================================== */}
      <div className="xl:col-span-4 space-y-6">
        {activeBooking ? (
          <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-6">
            
            {/* Header summary */}
            <div className="border-b border-gray-850 pb-4 space-y-1">
              <div className="flex justify-between items-center text-[10px] font-medium">
                <span className="text-cyan-400 font-bold">LIFECYCLE DOSSIER</span>
                <span className="text-gray-500">ID: {activeBooking.id}</span>
              </div>
              <h3 className="text-md font-black text-white leading-snug">{activeBooking.packageTitle}</h3>
              <p className="text-xs text-gray-500 font-medium">Operator Agency: {activeBooking.plannerName}</p>
            </div>

            {/* Travelers preferences */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium">
                Guest Boarding Pass Preferences
              </h4>
              <div className="border border-gray-855 bg-gray-955/40 p-4 rounded-2xl space-y-2.5 text-xs font-medium text-gray-400">
                <div className="flex justify-between">
                  <span>Traveler Name:</span>
                  <span className="text-gray-200">{activeBooking.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Traveler Count:</span>
                  <span className="text-gray-200">{activeBooking.paxCount} Guest(s)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1"><Coffee size={12} /> Meal Pref:</span>
                  <span className="text-cyan-300">{activeBooking.mealPreference}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1"><Compass size={12} /> Pickup Point:</span>
                  <span className="text-gray-200 text-[11px] truncate max-w-[160px]" title={activeBooking.pickupPoint}>
                    {activeBooking.pickupPoint}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-1"><CreditCard size={12} /> Transaction UTR:</span>
                  <span className="text-cyan-400 text-[11px] select-all">{activeBooking.utrNumber}</span>
                </div>
              </div>
            </div>

            {/* Lifecycle Timeline */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium flex items-center gap-1">
                <Clock size={13} className="text-cyan-400" /> Booking Chronological Steps
              </h4>
              <div className="space-y-3 pl-2.5 border-l-2 border-gray-800 text-[11px] font-medium text-gray-400 leading-normal">
                {activeBooking.timeline.map((item, idx) => (
                  <div key={idx} className="relative space-y-0.5">
                    <span className="absolute -left-[15px] top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border border-black shadow" />
                    <span className="text-[9px] text-gray-500 block">{new Date(item.timestamp).toLocaleString()}</span>
                    <span className="font-bold text-gray-300">{item.status}</span>
                    <p className="text-gray-500 text-[10px] leading-tight">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer Booking group section */}
            <div className="space-y-3 border-t border-gray-850 pt-4">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium flex items-center gap-1">
                <ArrowRight size={13} className="text-cyan-400" /> Re-route / Transfer Destination
              </h4>
              <div className="flex gap-2">
                <select
                  value={transferTargetPkgId}
                  onChange={(e) => setTransferTargetPkgId(e.target.value)}
                  className="flex-1 bg-gray-950 border border-gray-850 rounded-xl p-2.5 text-xs text-gray-200 outline-none font-medium"
                >
                  <option value="">Select Target Package</option>
                  {packages.filter(p => p.id !== activeBooking.packageId).map(p => (
                    <option key={p.id} value={p.id}>{p.id} - {p.title}</option>
                  ))}
                </select>
                <button
                  onClick={handleTransfer}
                  className="px-3.5 py-2.5 bg-gray-850 hover:bg-gray-800 border border-gray-800 text-gray-300 font-bold rounded-xl text-xs cursor-pointer font-medium"
                >
                  Transfer
                </button>
              </div>
            </div>

            {/* Refund process */}
            <div className="space-y-3 border-t border-gray-850 pt-4">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium flex items-center gap-1">
                <AlertTriangle size={13} className="text-yellow-400" /> Initiate Dispute Refund
              </h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Refund amount (INR)"
                  value={customRefundAmount}
                  onChange={(e) => setCustomRefundAmount(e.target.value)}
                  className="flex-1 bg-gray-950 border border-gray-850 rounded-xl p-2 text-xs outline-none text-gray-200 font-medium"
                />
                <button
                  onClick={handleRefund}
                  className="px-3 py-2 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl text-xs cursor-pointer font-medium"
                >
                  Refund
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="border-t border-gray-850 pt-4 grid grid-cols-2 gap-2 text-xs font-medium">
              <button
                onClick={handleCancelBooking}
                className="py-2.5 rounded-xl bg-red-950/20 text-red-500 border border-red-900/30 font-bold cursor-pointer text-center flex items-center justify-center gap-1.5 hover:bg-red-950/40"
              >
                <XCircle size={14} /> Cancel Booking
              </button>

              <button
                onClick={handleFreezeBooking}
                className="py-2.5 rounded-xl bg-gray-950 hover:bg-gray-850 text-gray-300 border border-gray-800 font-bold cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <AlertTriangle size={14} /> Freeze Funds
              </button>

              <button
                onClick={handleDownloadInvoice}
                className="w-full col-span-2 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download size={14} /> Download Receipt & Invoice
              </button>
            </div>

          </div>
        ) : (
          <div className="border border-dashed border-gray-855 rounded-3xl p-12 text-center text-gray-500 font-medium text-xs">
            Select a booking from the active index directory.
          </div>
        )}
      </div>

    </div>
  );
}
