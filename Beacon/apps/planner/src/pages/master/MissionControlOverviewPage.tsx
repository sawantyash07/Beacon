import { useState, useEffect } from 'react';
import { useMasterAdmin, type AdminRole, type SystemMode, type RiskAlert } from '@/data/masterAdminData';
import { 
  Server, Database, AlertCircle, RefreshCw, Play, Pause, 
  ShieldAlert, ShieldCheck, CheckCircle2, UserX, Wallet, 
  Megaphone, Ban, Sliders, ArrowUpRight, ArrowDownRight,
  TrendingUp, Activity, Terminal
} from 'lucide-react';
import { toast } from 'sonner';

export default function MissionControlOverviewPage() {
  const { 
    currentRole, systemMode, updateSystemSettings,
    infraHealth, kpiMetrics, activityStream, riskAlerts, 
    planners, bookings, resolveAlert, verifyPlanner, 
    suspendPlanner, processRefund, addCustomAuditLog
  } = useMasterAdmin();

  // Stream state
  const [streamPaused, setStreamPaused] = useState(false);
  const [displayedEvents, setDisplayedEvents] = useState(activityStream);
  const [eventFilter, setEventFilter] = useState<string>('all');

  // Quick Action form states
  const [selectedPlannerId, setSelectedPlannerId] = useState('');
  const [verifyNotes, setVerifyNotes] = useState('');
  
  const [selectedSuspendUserId, setSelectedSuspendUserId] = useState('');
  const [suspendType, setSuspendType] = useState<'planner' | 'customer'>('planner');
  const [suspendReason, setSuspendReason] = useState('');
  
  const [selectedRefundBookingId, setSelectedRefundBookingId] = useState('');
  const [refundAmount, setRefundAmount] = useState('');

  const [announcementText, setAnnouncementText] = useState('');

  // Sync displayed events with global stream (if not paused)
  useEffect(() => {
    if (!streamPaused) {
      setDisplayedEvents(activityStream);
    }
  }, [activityStream, streamPaused]);

  // Filter events helper
  const filteredEvents = displayedEvents.filter(event => {
    if (eventFilter === 'all') return true;
    return event.type === eventFilter;
  });

  // Action handlers
  const handleVerifyPlannerAction = (status: 'VERIFIED' | 'UNVERIFIED') => {
    if (!selectedPlannerId) {
      toast.error('Please select a planner to verify');
      return;
    }
    verifyPlanner(selectedPlannerId, status, verifyNotes);
    const agencyName = planners.find(p => p.id === selectedPlannerId)?.agencyName;
    toast.success(`Planner "${agencyName}" verification status updated to: ${status}`);
    setSelectedPlannerId('');
    setVerifyNotes('');
  };

  const handleSuspendAction = (suspend: boolean) => {
    if (!selectedSuspendUserId) {
      toast.error('Please select a user');
      return;
    }
    if (!suspendReason) {
      toast.error('Please provide a reason');
      return;
    }
    suspendPlanner(selectedSuspendUserId, suspend, suspendReason);
    toast.success(`User suspension status updated.`);
    setSelectedSuspendUserId('');
    setSuspendReason('');
  };

  const handleRefundAction = () => {
    if (!selectedRefundBookingId) {
      toast.error('Please select a booking');
      return;
    }
    const amt = parseFloat(refundAmount);
    if (isNaN(amt) || amt <= 0) {
      toast.error('Provide a valid refund amount');
      return;
    }
    processRefund(selectedRefundBookingId, amt);
    toast.success(`Refund of ₹${amt} processed successfully.`);
    setSelectedRefundBookingId('');
    setRefundAmount('');
  };

  const handleBroadcastAnnouncement = () => {
    if (!announcementText) {
      toast.error('Announcement text is required');
      return;
    }
    addCustomAuditLog(`Broadcast System Announcement: "${announcementText}"`, 'Marketing');
    toast.success('Announcement broadcasted to all channels.');
    setAnnouncementText('');
  };

  const handleToggleMaintenance = () => {
    const isMaintenance = systemMode === 'MAINTENANCE';
    updateSystemSettings({ maintenanceMode: !isMaintenance });
    toast.info(`Platform status updated: ${!isMaintenance ? 'MAINTENANCE MODE ACTIVE' : 'LIVE'}`);
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase font-heading flex items-center gap-2">
            <Terminal className="text-cyan-400 animate-pulse" size={24} /> Mission Control Overview
          </h1>
          <p className="text-xs text-gray-400">
            Real-time visual operations dashboard, security alerts monitor, and infrastructure console.
          </p>
        </div>
        <div className="flex items-center gap-2 border border-gray-800 bg-gray-900/40 p-2 rounded-xl text-xs font-mono text-gray-400">
          <span>Active Operations Scope:</span>
          <span className="text-cyan-400 font-bold">{currentRole}</span>
        </div>
      </div>

      {/* ==========================================
          KPI CARDS GRID
          ========================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { key: 'totalCustomers', label: 'Customers Database', color: 'text-cyan-400' },
          { key: 'totalPlanners', label: 'Active Planners', color: 'text-blue-400' },
          { key: 'bookingsCount', label: 'Total Bookings', color: 'text-purple-400' },
          { key: 'totalRevenue', label: 'Platform Revenue', color: 'text-green-400' },
          { key: 'activeTrips', label: 'Trips in Transit', color: 'text-indigo-400' },
          { key: 'pendingVerifications', label: 'Verifications Pending', color: 'text-yellow-400' },
          { key: 'activeDisputes', label: 'Legal Disputes', color: 'text-red-400' },
          { key: 'fraudAlertsCount', label: 'Unresolved Alerts', color: 'text-red-500' }
        ].map((item) => {
          const metric = kpiMetrics[item.key as keyof typeof kpiMetrics];
          return (
            <div key={item.key} className="border border-gray-850 bg-gray-900/40 backdrop-blur p-4 rounded-2xl hover:border-cyan-500/20 transition-all hover:scale-[1.01] shadow-lg">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block mb-1">
                {item.label}
              </span>
              <div className="flex items-baseline justify-between">
                <span className={`text-xl font-bold font-mono tracking-tight ${item.color}`}>
                  {metric.value}
                </span>
                <span className={`inline-flex items-center text-[10px] font-bold rounded px-1.5 py-0.5 font-mono ${
                  metric.isPositive 
                    ? 'bg-green-950/40 text-green-400 border border-green-500/10' 
                    : 'bg-red-950/40 text-red-400 border border-red-500/10'
                }`}>
                  {metric.isPositive ? <TrendingUp size={10} className="mr-0.5" /> : null}
                  {metric.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==========================================
          INFRASTRUCTURE & SYSTEM SECURITY LEVEL
          ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Services Health Status Dashboard */}
        <div className="lg:col-span-7 border border-gray-850 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-850 pb-4">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Server size={18} className="text-cyan-400" /> Infrastructure Diagnostics
            </h3>
            <span className="text-[10px] font-mono text-gray-500">
              Uptime: 99.98%
            </span>
          </div>

          {/* CPU & Memory meters */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-gray-850 bg-gray-950/40 p-4 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-gray-500 block uppercase">SYSTEM CPU COMPUTE</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono text-cyan-400">{infraHealth.cpuUsage}%</span>
                <span className="text-[9px] text-gray-500">64-core vCPU Cluster</span>
              </div>
              <div className="w-full bg-gray-850 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${infraHealth.cpuUsage}%` }} />
              </div>
            </div>
            <div className="border border-gray-850 bg-gray-950/40 p-4 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono text-gray-500 block uppercase">DB BUFFER MEMORY</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black font-mono text-cyan-400">{infraHealth.memoryUsage}%</span>
                <span className="text-[9px] text-gray-500">RAM Allocation: 512GB</span>
              </div>
              <div className="w-full bg-gray-850 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${infraHealth.memoryUsage}%` }} />
              </div>
            </div>
          </div>

          {/* Downstream Microservices Latency metrics */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
              Downstream Node Connections
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
              {infraHealth.services.map((srv, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-950/20 border border-gray-850">
                  <div className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      srv.status === 'operational' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                    }`} />
                    <span className="text-gray-300">{srv.name}</span>
                  </div>
                  <span className="text-gray-500">{srv.latency}ms</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Risk Alerts Panel */}
        <div className="lg:col-span-5 border border-gray-850 bg-gray-900/40 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-850 pb-4">
              <h3 className="text-sm font-bold flex items-center gap-2 text-red-400">
                <AlertCircle size={18} /> High-Risk Incidents
              </h3>
              <span className="px-2 py-0.5 rounded bg-red-950/40 border border-red-500/20 text-red-500 text-[10px] font-mono font-bold animate-pulse">
                {riskAlerts.filter(a => a.status === 'PENDING').length} CRITICAL
              </span>
            </div>

            {/* Alert List */}
            <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
              {riskAlerts.filter(a => a.status === 'PENDING').map((alert) => (
                <div key={alert.id} className="border border-red-900/20 bg-red-950/5 p-3.5 rounded-2xl flex items-start justify-between gap-3 text-xs leading-normal">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-red-950 text-red-400 text-[9px] font-mono font-bold border border-red-900/30">
                        {alert.score}% RISK
                      </span>
                      <span className="font-bold text-gray-200">{alert.title}</span>
                    </div>
                    <p className="text-gray-400 text-[11px] leading-tight">{alert.description}</p>
                    <span className="text-[9px] text-gray-500 block font-mono">Scope: {alert.affectedEntity}</span>
                  </div>
                  <button 
                    onClick={() => resolveAlert(alert.id)}
                    className="px-2 py-1 rounded bg-green-500/20 hover:bg-green-500 hover:text-black transition-colors text-[10px] font-bold text-green-400 uppercase font-mono cursor-pointer shrink-0"
                  >
                    Resolve
                  </button>
                </div>
              ))}

              {riskAlerts.filter(a => a.status === 'PENDING').length === 0 && (
                <div className="text-center py-12 text-gray-600 text-xs font-mono border border-dashed border-gray-850 rounded-2xl">
                  ✓ Core systems report no critical alerts.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* ==========================================
          LIVE ACTIVITY STREAM (PAUSEABLE)
          ========================================== */}
      <div className="border border-gray-850 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-4">
        
        {/* Stream header / filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-850 pb-4">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Activity size={18} className="text-cyan-400" /> Operational Activity Stream
            </h3>
            <button
              onClick={() => setStreamPaused(!streamPaused)}
              className={`p-1.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 text-[10px] font-mono ${
                streamPaused 
                  ? 'bg-amber-950/20 border-amber-500/30 text-amber-400' 
                  : 'bg-cyan-950/20 border-cyan-500/20 text-cyan-400'
              }`}
            >
              {streamPaused ? <Play size={10} /> : <Pause size={10} />}
              {streamPaused ? 'PAUSED' : 'STREAMING'}
            </button>
          </div>

          {/* Activity Category Filters */}
          <div className="flex items-center gap-1 bg-gray-950/60 p-1 rounded-xl text-[10px] font-mono border border-gray-855 select-none">
            {['all', 'booking', 'payment', 'user', 'fraud', 'system'].map((f) => (
              <button
                key={f}
                onClick={() => setEventFilter(f)}
                className={`px-2.5 py-1 rounded-lg uppercase transition-colors cursor-pointer ${
                  eventFilter === f 
                    ? 'bg-cyan-500 text-black font-bold' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Live event logs */}
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-950/20 border border-gray-855 text-xs">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                  evt.type === 'fraud' 
                    ? 'bg-red-950 text-red-400 border border-red-500/10'
                    : evt.type === 'system'
                    ? 'bg-blue-950 text-blue-400 border border-blue-500/10'
                    : evt.type === 'payment'
                    ? 'bg-green-950 text-green-400 border border-green-500/10'
                    : 'bg-gray-850 text-gray-300'
                }`}>
                  {evt.type}
                </span>
                <div>
                  <span className="font-semibold text-gray-200">{evt.title}</span>
                  <span className="text-gray-500 ml-2">— {evt.description}</span>
                </div>
              </div>
              <span className="text-[10px] text-gray-600 font-mono">
                {new Date(evt.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 text-gray-600 font-mono text-xs">
              No recent events logged matching filter requirements.
            </div>
          )}
        </div>
      </div>

      {/* ==========================================
          EMERGENCY QUICK ACTION OVERRIDES PANEL
          ========================================== */}
      <div className="border border-gray-850 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-6">
        <div className="border-b border-gray-850 pb-4">
          <h3 className="text-sm font-bold flex items-center gap-2">
            <Sliders size={18} className="text-cyan-400" /> Platform Command & Quick Action Desk
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Quick Verify Planner */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
              <ShieldCheck size={14} className="text-green-400" /> Quick Verify Planner
            </h4>
            <div className="space-y-2">
              <select
                value={selectedPlannerId}
                onChange={(e) => setSelectedPlannerId(e.target.value)}
                className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 text-xs text-gray-200 outline-none"
              >
                <option value="">Select Planner Agency</option>
                {planners.map(p => (
                  <option key={p.id} value={p.id}>{p.agencyName} ({p.status})</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Audit Validation notes..."
                value={verifyNotes}
                onChange={(e) => setVerifyNotes(e.target.value)}
                className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2 text-xs outline-none text-gray-200"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleVerifyPlannerAction('VERIFIED')}
                  className="flex-1 py-2 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-xs cursor-pointer text-center"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleVerifyPlannerAction('UNVERIFIED')}
                  className="flex-1 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs cursor-pointer text-center"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>

          {/* Quick Payout / Account Suspension */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
              <UserX size={14} className="text-red-400" /> Suspend Accounts
            </h4>
            <div className="space-y-2">
              <select
                value={selectedSuspendUserId}
                onChange={(e) => setSelectedSuspendUserId(e.target.value)}
                className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 text-xs text-gray-200 outline-none"
              >
                <option value="">Select Account</option>
                {planners.map(p => (
                  <option key={p.id} value={p.id}>{p.agencyName} (Planner)</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Suspension reason..."
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2 text-xs outline-none text-gray-200"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleSuspendAction(true)}
                  className="flex-1 py-2 rounded-xl bg-red-650 hover:bg-red-550 text-gray-950 font-bold text-xs cursor-pointer"
                >
                  Suspend
                </button>
                <button
                  onClick={() => handleSuspendAction(false)}
                  className="flex-1 py-2 rounded-xl bg-gray-850 hover:bg-gray-800 text-gray-300 text-xs font-bold cursor-pointer"
                >
                  Release
                </button>
              </div>
            </div>
          </div>

          {/* Quick Issue Refund */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
              <Wallet size={14} className="text-yellow-400" /> Dispatch Refund
            </h4>
            <div className="space-y-2">
              <select
                value={selectedRefundBookingId}
                onChange={(e) => setSelectedRefundBookingId(e.target.value)}
                className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 text-xs text-gray-200 outline-none"
              >
                <option value="">Select Booking ID</option>
                {bookings.filter(b => b.paymentStatus === 'PAID').map(b => (
                  <option key={b.id} value={b.id}>{b.id} - {b.customerName}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Refund amount (INR)"
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2 text-xs outline-none text-gray-200 font-mono"
              />
              <button
                onClick={handleRefundAction}
                className="w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs cursor-pointer"
              >
                Issue Refund Payout
              </button>
            </div>
          </div>

          {/* Broadcast Announcement */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gray-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
              <Megaphone size={14} className="text-indigo-400" /> Broadcast Banner
            </h4>
            <div className="space-y-2">
              <textarea
                placeholder="System warning text to broadcast..."
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                rows={2}
                className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2 text-xs outline-none text-gray-200 resize-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleBroadcastAnnouncement}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold text-xs cursor-pointer"
                >
                  Broadcast Alert
                </button>
                <button
                  onClick={handleToggleMaintenance}
                  className={`px-3 py-2 rounded-xl font-bold text-xs cursor-pointer border ${
                    systemMode === 'MAINTENANCE' 
                      ? 'bg-amber-950 border-amber-500 text-amber-400' 
                      : 'bg-gray-850 border-gray-800 text-gray-300 hover:bg-gray-800'
                  }`}
                  title="Toggle Maintenance Mode"
                >
                  <Ban size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
