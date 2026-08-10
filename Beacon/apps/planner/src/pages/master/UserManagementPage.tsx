import { useState } from 'react';
import { useMasterAdmin, type Planner, type Customer, type AdminRole } from '@/data/masterAdminData';
import { 
  Users, UserCheck, ShieldAlert, ShieldCheck, Mail, Phone, 
  MapPin, DollarSign, Calendar, Star, FileText, Ban, Lock, EyeOff,
  UserX, Download, RefreshCw, Layers, CheckSquare, XSquare, Plus
} from 'lucide-react';
import { toast } from 'sonner';

export default function UserManagementPage() {
  const { 
    planners, customers, auditLogs, 
    suspendPlanner, freezePlannerPayouts, hidePlannerPackages, suspendCustomer 
  } = useMasterAdmin();

  // Tab State
  const [activeTab, setActiveTab] = useState<'planners' | 'customers' | 'staff'>('planners');

  // Search filter states
  const [plannerSearch, setPlannerSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');

  // Selected Detail drawers
  const [selectedPlannerId, setSelectedPlannerId] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  // Selected Planner & Customer objects
  const activePlanner = planners.find(p => p.id === selectedPlannerId);
  const activeCustomer = customers.find(c => c.id === selectedCustomerId);

  // Staff Permissions local state simulation
  const [rolePermissions, setRolePermissions] = useState<Record<AdminRole, Record<string, boolean>>>({
    'Super Admin': { verifyDocs: true, refunds: true, reviewMod: true, settings: true, emergency: true },
    'CEO': { verifyDocs: true, refunds: true, reviewMod: true, settings: true, emergency: true },
    'Operations Head': { verifyDocs: true, refunds: false, reviewMod: false, settings: true, emergency: true },
    'Verification Manager': { verifyDocs: true, refunds: false, reviewMod: false, settings: false, emergency: false },
    'Finance Manager': { verifyDocs: false, refunds: true, reviewMod: false, settings: false, emergency: false },
    'Customer Care Manager': { verifyDocs: false, refunds: false, reviewMod: true, settings: false, emergency: false },
    'Legal Officer': { verifyDocs: false, refunds: false, reviewMod: false, settings: false, emergency: false },
    'Marketing Executive': { verifyDocs: false, refunds: false, reviewMod: false, settings: false, emergency: false }
  });

  const togglePermission = (role: AdminRole, key: string) => {
    setRolePermissions(prev => ({
      ...prev,
      [role]: {
        ...prev[role],
        [key]: !prev[role][key]
      }
    }));
    toast.success(`Updated permission "${key}" for role: ${role}`);
  };

  // Export Data helper
  const handleExportCustomerData = (cust: Customer) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(cust, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `customer-export-${cust.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success(`Dossier JSON exported for ${cust.name}`);
  };

  // Merge duplicates simulation
  const handleMergeDuplicates = (customerId: string) => {
    toast.info(`Scanning duplicates for ID: ${customerId}`);
    setTimeout(() => {
      toast.success('No identical customer profiles found with matching email or PAN.');
    }, 1000);
  };

  const handleResetPassword = () => {
    toast.success('Password reset link emailed to user.');
  };

  return (
    <div className="space-y-6 select-none relative">
      
      {/* Page header & Tabs navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-850 pb-4">
        <div>
          <h1 className="text-xl font-bold font-heading text-white flex items-center gap-2">
            <Users className="text-cyan-400" /> Platform Directory & RBAC
          </h1>
          <p className="text-xs text-gray-500">
            Audit travelers, travel operators, and edit internal staff permissions scope.
          </p>
        </div>

        <div className="flex bg-gray-950/60 p-1 rounded-xl text-xs font-mono border border-gray-855">
          <button
            onClick={() => setActiveTab('planners')}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              activeTab === 'planners' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Planners ({planners.length})
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              activeTab === 'customers' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Customers ({customers.length})
          </button>
          <button
            onClick={() => setActiveTab('staff')}
            className={`px-4 py-2 rounded-lg cursor-pointer ${
              activeTab === 'staff' ? 'bg-cyan-500 text-black font-bold' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            Staff & RBAC
          </button>
        </div>
      </div>

      {/* ==========================================
          TAB 1: PLANNERS
          ========================================== */}
      {activeTab === 'planners' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <Users size={14} />
              </span>
              <input
                type="text"
                value={plannerSearch}
                onChange={(e) => setPlannerSearch(e.target.value)}
                placeholder="Filter operators by agency name..."
                className="w-full bg-gray-900 border border-gray-850 pl-9 pr-4 py-2 rounded-xl text-xs outline-none text-gray-200 font-mono focus:border-cyan-500/30"
              />
            </div>
            <button className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5 font-mono">
              <Plus size={14} /> Add Planner
            </button>
          </div>

          {/* Table */}
          <div className="border border-gray-855 bg-gray-900/40 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-850 bg-gray-950/40 text-gray-400 font-mono">
                    <th className="p-4">Agency Name</th>
                    <th className="p-4">Owner</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Tier</th>
                    <th className="p-4">Revenue</th>
                    <th className="p-4">Bookings</th>
                    <th className="p-4 text-center">Score</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-855 font-mono">
                  {planners
                    .filter(p => p.agencyName.toLowerCase().includes(plannerSearch.toLowerCase()))
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-gray-850/20 text-gray-300">
                        <td className="p-4 font-bold">{p.agencyName}</td>
                        <td className="p-4 text-gray-400">{p.ownerName}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            p.status === 'VERIFIED'
                              ? 'bg-green-950/50 text-green-400'
                              : p.status === 'SUSPENDED'
                              ? 'bg-red-950/50 text-red-500'
                              : 'bg-yellow-950/50 text-yellow-400'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 text-yellow-500 font-bold">{p.tier}</td>
                        <td className="p-4 text-cyan-300">₹{p.revenue.toLocaleString()}</td>
                        <td className="p-4">{p.bookings}</td>
                        <td className="p-4 text-center">
                          <span className={`font-bold ${p.riskScore > 50 ? 'text-red-400' : 'text-green-400'}`}>
                            {p.riskScore}%
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => setSelectedPlannerId(p.id)}
                            className="px-2.5 py-1 rounded bg-gray-850 hover:bg-cyan-500 hover:text-black transition-colors text-[10px] cursor-pointer"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 2: CUSTOMERS
          ========================================== */}
      {activeTab === 'customers' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4">
            <div className="relative w-full max-w-sm">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                <Users size={14} />
              </span>
              <input
                type="text"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                placeholder="Filter travelers by name or email..."
                className="w-full bg-gray-900 border border-gray-855 pl-9 pr-4 py-2 rounded-xl text-xs outline-none text-gray-200 font-mono focus:border-cyan-500/30"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-855 bg-gray-900/40 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-gray-850 bg-gray-950/40 text-gray-400 font-mono">
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Total Spent</th>
                    <th className="p-4">Trips Count</th>
                    <th className="p-4 text-center">Fraud Risk</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-855 font-mono">
                  {customers
                    .filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.email.toLowerCase().includes(customerSearch.toLowerCase()))
                    .map((c) => (
                      <tr key={c.id} className="hover:bg-gray-850/20 text-gray-300">
                        <td className="p-4 font-bold">{c.name}</td>
                        <td className="p-4 text-gray-400 text-[11px] leading-tight">
                          <div>{c.email}</div>
                          <div>{c.phone}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            c.status === 'ACTIVE'
                              ? 'bg-green-950/50 text-green-400'
                              : c.status === 'SUSPENDED'
                              ? 'bg-amber-950/50 text-amber-400'
                              : 'bg-red-950/50 text-red-500 animate-pulse'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="p-4 text-cyan-300">₹{c.totalSpent.toLocaleString()}</td>
                        <td className="p-4">{c.bookingsCount}</td>
                        <td className="p-4 text-center">
                          <span className={`font-bold ${c.fraudScore > 40 ? 'text-red-400' : 'text-green-400'}`}>
                            {c.fraudScore}/100
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => setSelectedCustomerId(c.id)}
                            className="px-2.5 py-1 rounded bg-gray-850 hover:bg-cyan-500 hover:text-black transition-colors text-[10px] cursor-pointer"
                          >
                            Inspect
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 3: STAFF & RBAC PERMISSIONS MATRIX
          ========================================== */}
      {activeTab === 'staff' && (
        <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="border-b border-gray-850 pb-4">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Lock size={18} className="text-cyan-400" /> Platform Role Access Control (RBAC)
            </h3>
            <p className="text-[11px] text-gray-500 font-mono mt-1">
              Select permissions that correspond to the scope authorization of administrative staff members.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-gray-855 bg-gray-950/40 text-gray-400">
                  <th className="p-4">Administrative Role</th>
                  <th className="p-4 text-center">Verify Docs</th>
                  <th className="p-4 text-center">Approve Refunds</th>
                  <th className="p-4 text-center">Moderate Reviews</th>
                  <th className="p-4 text-center">Platform Settings</th>
                  <th className="p-4 text-center">Emergency Override</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-855">
                {(Object.keys(rolePermissions) as AdminRole[]).map((role) => (
                  <tr key={role} className="hover:bg-gray-850/20 text-gray-300">
                    <td className="p-4 font-bold text-gray-200">{role}</td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={rolePermissions[role].verifyDocs}
                        onChange={() => togglePermission(role, 'verifyDocs')}
                        className="w-4 h-4 accent-cyan-500 cursor-pointer"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={rolePermissions[role].refunds}
                        onChange={() => togglePermission(role, 'refunds')}
                        className="w-4 h-4 accent-cyan-500 cursor-pointer"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={rolePermissions[role].reviewMod}
                        onChange={() => togglePermission(role, 'reviewMod')}
                        className="w-4 h-4 accent-cyan-500 cursor-pointer"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={rolePermissions[role].settings}
                        onChange={() => togglePermission(role, 'settings')}
                        className="w-4 h-4 accent-cyan-500 cursor-pointer"
                      />
                    </td>
                    <td className="p-4 text-center">
                      <input
                        type="checkbox"
                        checked={rolePermissions[role].emergency}
                        onChange={() => togglePermission(role, 'emergency')}
                        className="w-4 h-4 accent-cyan-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==========================================
          PLANNER DRAWER
          ========================================== */}
      {selectedPlannerId && activePlanner && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-0" onClick={() => setSelectedPlannerId(null)} />
          <div className="relative w-full max-w-xl bg-gray-900 border-l border-gray-800 h-full flex flex-col justify-between p-6 overflow-y-auto animate-[slideIn_0.2s_ease-out]">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-850 pb-4">
                <div>
                  <span className="text-[10px] text-yellow-500 font-mono font-bold">★ {activePlanner.tier} PLANNER OPERATOR</span>
                  <h2 className="text-lg font-black text-white">{activePlanner.agencyName}</h2>
                </div>
                <button
                  onClick={() => setSelectedPlannerId(null)}
                  className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-gray-200 cursor-pointer"
                >
                  <XSquare size={18} />
                </button>
              </div>

              {/* Business Stats Grid */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-gray-950/40 p-3 rounded-2xl border border-gray-850">
                  <span className="text-[9px] text-gray-500 font-mono block">REVENUE</span>
                  <span className="text-xs font-bold text-cyan-300 font-mono">₹{activePlanner.revenue.toLocaleString()}</span>
                </div>
                <div className="bg-gray-950/40 p-3 rounded-2xl border border-gray-850">
                  <span className="text-[9px] text-gray-500 font-mono block">BOOKINGS</span>
                  <span className="text-xs font-bold text-gray-200 font-mono">{activePlanner.bookings} trips</span>
                </div>
                <div className="bg-gray-950/40 p-3 rounded-2xl border border-gray-850">
                  <span className="text-[9px] text-gray-500 font-mono block">RISK SCORE</span>
                  <span className={`text-xs font-bold font-mono ${activePlanner.riskScore > 50 ? 'text-red-400' : 'text-green-400'}`}>
                    {activePlanner.riskScore}%
                  </span>
                </div>
              </div>

              {/* Owner Info & bank details */}
              <div className="border border-gray-855 bg-gray-950/20 p-4 rounded-2xl space-y-2.5 text-xs font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>Owner Legal Name:</span>
                  <span className="text-gray-200">{activePlanner.ownerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email Address:</span>
                  <span className="text-gray-200">{activePlanner.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone Number:</span>
                  <span className="text-gray-200">{activePlanner.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Settlement Bank:</span>
                  <span className="text-gray-200">{activePlanner.bankAccount.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Account Number:</span>
                  <span className="text-gray-200">{activePlanner.bankAccount.number}</span>
                </div>
              </div>

              {/* Operational Ratios */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                  Operational Health metrics
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <div className="flex justify-between text-gray-400 mb-1 text-[11px]">
                      <span>Trip Cancellation Ratio</span>
                      <span className="text-red-400">{activePlanner.cancellationRate}%</span>
                    </div>
                    <div className="w-full bg-gray-850 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full" style={{ width: `${activePlanner.cancellationRate}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-gray-400 mb-1 text-[11px]">
                      <span>Disputes & Refund Ratio</span>
                      <span className="text-yellow-400">{activePlanner.refundRate}%</span>
                    </div>
                    <div className="w-full bg-gray-850 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-yellow-500 h-full" style={{ width: `${activePlanner.refundRate}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Notes log */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                  Security Log Annotations
                </h4>
                <div className="p-3.5 rounded-2xl bg-gray-950/40 border border-gray-850 text-xs font-mono text-gray-300 leading-normal">
                  {activePlanner.notes || 'No security log annotations recorded.'}
                </div>
              </div>
            </div>

            {/* Actions panel */}
            <div className="border-t border-gray-850 pt-4 mt-6 grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => {
                  suspendPlanner(activePlanner.id, activePlanner.status !== 'SUSPENDED', 'Administrative override suspension');
                  toast.success(`Planner suspension updated.`);
                }}
                className={`py-3 rounded-xl font-bold cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                  activePlanner.status === 'SUSPENDED'
                    ? 'bg-green-500 text-black hover:bg-green-400'
                    : 'bg-red-950/20 text-red-500 border border-red-900/30 hover:bg-red-950/40'
                }`}
              >
                <Ban size={14} />
                {activePlanner.status === 'SUSPENDED' ? 'Release Suspend' : 'Suspend Account'}
              </button>

              <button
                onClick={() => {
                  freezePlannerPayouts(activePlanner.id, !activePlanner.payoutsFrozen);
                  toast.success(`Planner payouts toggled.`);
                }}
                className={`py-3 rounded-xl font-bold cursor-pointer text-center flex items-center justify-center gap-1.5 border ${
                  activePlanner.payoutsFrozen
                    ? 'bg-green-950/40 border-green-500/30 text-green-400'
                    : 'bg-yellow-950/20 border-yellow-900/30 text-yellow-500 hover:bg-yellow-950/40'
                }`}
              >
                <Lock size={14} />
                {activePlanner.payoutsFrozen ? 'Resume Payouts' : 'Freeze Payouts'}
              </button>

              <button
                onClick={() => {
                  hidePlannerPackages(activePlanner.id, !activePlanner.packagesHidden);
                  toast.success(`Planner package visibility toggled.`);
                }}
                className="w-full col-span-2 py-3 rounded-xl bg-gray-950 hover:bg-gray-850 text-gray-300 border border-gray-800 text-center font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <EyeOff size={14} />
                {activePlanner.packagesHidden ? 'Reveal Packages' : 'Hide All Packages'}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ==========================================
          CUSTOMER DRAWER
          ========================================== */}
      {selectedCustomerId && activeCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-0" onClick={() => setSelectedCustomerId(null)} />
          <div className="relative w-full max-w-xl bg-gray-900 border-l border-gray-800 h-full flex flex-col justify-between p-6 overflow-y-auto animate-[slideIn_0.2s_ease-out]">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-850 pb-4">
                <div>
                  <span className="text-[10px] text-cyan-400 font-mono font-bold">TRAVELER CUSTOMER PROFILE</span>
                  <h2 className="text-lg font-black text-white">{activeCustomer.name}</h2>
                </div>
                <button
                  onClick={() => setSelectedCustomerId(null)}
                  className="p-1.5 rounded-lg bg-gray-800 text-gray-400 hover:text-gray-200 cursor-pointer"
                >
                  <XSquare size={18} />
                </button>
              </div>

              {/* Fraud and general metric badges */}
              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-gray-950/40 p-3 rounded-2xl border border-gray-850">
                  <span className="text-[9px] text-gray-500 block">TOTAL SPENT</span>
                  <span className="text-xs font-bold text-cyan-300">₹{activeCustomer.totalSpent.toLocaleString()}</span>
                </div>
                <div className="bg-gray-950/40 p-3 rounded-2xl border border-gray-850">
                  <span className="text-[9px] text-gray-500 block">TRIPS</span>
                  <span className="text-xs font-bold text-gray-200">{activeCustomer.bookingsCount} Completed</span>
                </div>
                <div className="bg-gray-950/40 p-3 rounded-2xl border border-gray-850">
                  <span className="text-[9px] text-gray-500 block">FRAUD RATING</span>
                  <span className={`text-xs font-bold ${activeCustomer.fraudScore > 50 ? 'text-red-400' : 'text-green-400'}`}>
                    {activeCustomer.fraudScore}/100
                  </span>
                </div>
              </div>

              {/* Personal contact */}
              <div className="border border-gray-855 bg-gray-950/20 p-4 rounded-2xl space-y-2.5 text-xs font-mono text-gray-400">
                <div className="flex justify-between">
                  <span>Registered Email:</span>
                  <span className="text-gray-200">{activeCustomer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Registered Phone:</span>
                  <span className="text-gray-200">{activeCustomer.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status Mode:</span>
                  <span className="text-cyan-400">{activeCustomer.status}</span>
                </div>
                <div className="border-t border-gray-850 pt-2 flex justify-between">
                  <span>Emergency contact:</span>
                  <span className="text-gray-200">{activeCustomer.emergencyContact.name} ({activeCustomer.emergencyContact.relation})</span>
                </div>
                <div className="flex justify-between">
                  <span>Emergency Phone:</span>
                  <span className="text-gray-200">{activeCustomer.emergencyContact.phone}</span>
                </div>
              </div>

              {/* Travel History list */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                  Travel Ledger History
                </h4>
                <div className="space-y-1.5 font-mono text-[11px]">
                  {activeCustomer.travelHistory.map((tr, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-gray-950/40 border border-gray-850 flex justify-between items-center text-gray-300">
                      <div>
                        <span className="font-bold">{tr.destination}</span>
                        <span className="text-gray-500 ml-2">({tr.date})</span>
                      </div>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        tr.status === 'COMPLETED' ? 'bg-green-950/50 text-green-400' : 'bg-red-950/50 text-red-400'
                      }`}>{tr.status}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Action buttons */}
            <div className="border-t border-gray-855 pt-4 mt-6 grid grid-cols-2 gap-2 text-xs font-mono">
              <button
                onClick={() => {
                  const newStatus = activeCustomer.status === 'BLACKLISTED' ? 'ACTIVE' : 'BLACKLISTED';
                  suspendCustomer(activeCustomer.id, newStatus, 'Administrative audit control blacklist');
                  toast.success(`Customer status updated to: ${newStatus}`);
                }}
                className={`py-3 rounded-xl font-bold cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                  activeCustomer.status === 'BLACKLISTED'
                    ? 'bg-green-500 text-black hover:bg-green-400'
                    : 'bg-red-950/20 text-red-500 border border-red-900/30 hover:bg-red-950/40'
                }`}
              >
                <UserX size={14} />
                {activeCustomer.status === 'BLACKLISTED' ? 'Release Blacklist' : 'Blacklist Profile'}
              </button>

              <button
                onClick={handleResetPassword}
                className="py-3 rounded-xl bg-gray-950 hover:bg-gray-850 text-gray-300 border border-gray-800 text-center font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Lock size={14} />
                Reset Password
              </button>

              <button
                onClick={() => handleExportCustomerData(activeCustomer)}
                className="py-3 rounded-xl bg-gray-950 hover:bg-gray-850 text-gray-300 border border-gray-800 text-center font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download size={14} />
                Export Profile
              </button>

              <button
                onClick={() => handleMergeDuplicates(activeCustomer.id)}
                className="py-3 rounded-xl bg-gray-950 hover:bg-gray-850 text-gray-300 border border-gray-800 text-center font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Layers size={14} />
                Merge Profiles
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
