import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Users,
  Building,
  Search,
  Eye,
  Lock,
  Unlock,
  Star,
  Download,
  BadgeCheck,
} from 'lucide-react'
import { useMasterAdmin, type MasterAdminRole } from '@/context/MasterAdminContext'
import { type CustomerProfile, type PlannerProfile } from '@/data/masterAdminData'
import { toast } from 'sonner'

export default function UserManagementPage() {
  const {
    customers,
    planners,
    currentRole,
    suspendPlanner,
    togglePayoutFreeze,
    suspendCustomer,
    blacklistCustomer,
    verifyPlanner,
  } = useMasterAdmin()

  const [activeTab, setActiveTab] = useState<'customers' | 'planners' | 'staff_rbac'>('planners')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlanner, setSelectedPlanner] = useState<PlannerProfile | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(null)

  // Staff list for RBAC
  const staffList = [
    { id: 'adm-001', name: 'Antigravity SuperAdmin', role: 'Super Admin' as MasterAdminRole, email: 'superadmin@beacon.travel', lastActive: 'Active Now' },
    { id: 'adm-002', name: 'Vikramaditya CEO', role: 'CEO' as MasterAdminRole, email: 'ceo@beacon.travel', lastActive: '10 mins ago' },
    { id: 'adm-003', name: 'Ritu Kapoor', role: 'Verification Manager' as MasterAdminRole, email: 'ritu.v@beacon.travel', lastActive: '1 hour ago' },
    { id: 'adm-004', name: 'Siddharth Roy', role: 'Finance Manager' as MasterAdminRole, email: 'siddharth.f@beacon.travel', lastActive: '25 mins ago' },
    { id: 'adm-005', name: 'Neha Varma', role: 'Customer Care Manager' as MasterAdminRole, email: 'neha.care@beacon.travel', lastActive: '5 mins ago' },
    { id: 'adm-006', name: 'Adv. Sameer Joshi', role: 'Legal & Compliance Officer' as MasterAdminRole, email: 'legal@beacon.travel', lastActive: '3 hours ago' },
  ]

  const filteredPlanners = planners.filter((p) => {
    const q = searchQuery.toLowerCase()
    return p.agencyName.toLowerCase().includes(q) || p.ownerName.toLowerCase().includes(q) || p.email.toLowerCase().includes(q)
  })

  const filteredCustomers = customers.filter((c) => {
    const q = searchQuery.toLowerCase()
    return c.fullName.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q)
  })

  const exportCustomerData = (c: CustomerProfile) => {
    const blob = new Blob([JSON.stringify(c, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `beacon_customer_${c.id}.json`
    a.click()
    toast.success(`Exported records for ${c.fullName}`)
  }

  return (
    <div className="space-y-8 font-body">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan tracking-widest uppercase mb-1">
            <Users className="w-4 h-4 text-cyan" />
            <span>Identity & Operational Security</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            USER & <span className="text-gradient">PLANNER</span> MANAGEMENT
          </h1>
          <p className="text-xs text-cyan-200/70 font-mono mt-1">
            Manage 1,240+ travel planners, 48,900+ customers, fraud risk scores & internal RBAC permissions
          </p>
        </div>

        {/* TAB BUTTONS */}
        <div className="flex p-1 bg-navy/80 border border-cyan/30 rounded-xl font-mono text-xs">
          <button
            onClick={() => setActiveTab('planners')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'planners' ? 'bg-cyan text-navy shadow-md' : 'text-cyan-200/80 hover:text-white'
            }`}
          >
            Planners ({planners.length})
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'customers' ? 'bg-cyan text-navy shadow-md' : 'text-cyan-200/80 hover:text-white'
            }`}
          >
            Customers ({customers.length})
          </button>

          <button
            onClick={() => setActiveTab('staff_rbac')}
            className={`px-4 py-2 rounded-lg font-bold transition-all ${
              activeTab === 'staff_rbac' ? 'bg-cyan text-navy shadow-md' : 'text-cyan-200/80 hover:text-white'
            }`}
          >
            Staff & RBAC Matrix
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Search by name, agency, email, phone number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#001736] border border-cyan/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-cyan/40 focus:outline-none focus:border-cyan font-mono"
        />
        <Search className="w-4 h-4 text-cyan/60 absolute left-3.5 top-3" />
      </div>

      {/* TAB 1: PLANNERS MANAGEMENT */}
      {activeTab === 'planners' && (
        <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-cyan/20 text-cyan/70 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Agency / Owner</th>
                  <th className="py-3 px-4">Subscription</th>
                  <th className="py-3 px-4">Revenue / Bookings</th>
                  <th className="py-3 px-4">Rating / Cancel %</th>
                  <th className="py-3 px-4">Payout Status</th>
                  <th className="py-3 px-4">Risk Score</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan/15 text-slate-200">
                {filteredPlanners.map((p) => (
                  <tr key={p.id} className="hover:bg-cyan/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span>{p.agencyName}</span>
                        {p.verifiedBadge && <BadgeCheck className="w-4 h-4 text-cyan fill-cyan/20" />}
                      </div>
                      <div className="text-[11px] text-cyan-300/70 font-normal">{p.ownerName} • {p.email}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan font-bold">
                        {p.subscriptionPlan}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">₹{(p.totalRevenue / 100000).toFixed(2)} Lakhs</div>
                      <div className="text-[11px] text-cyan-300/70">{p.totalBookings} Bookings</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{p.rating || 'N/A'}</span>
                      </div>
                      <div className="text-[11px] text-red-400">{p.cancellationRate}% Cancel Rate</div>
                    </td>

                    <td className="py-3.5 px-4">
                      {p.payoutFrozen ? (
                        <span className="px-2.5 py-1 rounded-full bg-red-600/30 border border-red-500/50 text-red-300 text-[10px] font-bold">
                          FROZEN
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          ACTIVE
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${p.riskScore > 50 ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {p.riskScore}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => togglePayoutFreeze(p.id)}
                          className={`p-1.5 rounded-lg border text-xs font-mono transition-all ${
                            p.payoutFrozen
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                              : 'bg-red-500/20 text-red-300 border-red-500/40'
                          }`}
                          title={p.payoutFrozen ? 'Unfreeze Payout' : 'Freeze Payout'}
                        >
                          {p.payoutFrozen ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          onClick={() => setSelectedPlanner(p)}
                          className="px-3 py-1.5 rounded-lg bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 text-cyan text-xs font-mono flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Full Dossier</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 2: CUSTOMERS MANAGEMENT */}
      {activeTab === 'customers' && (
        <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-cyan/20 text-cyan/70 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Contact & Location</th>
                  <th className="py-3 px-4">Spent / Bookings</th>
                  <th className="py-3 px-4">Fraud Risk Score</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan/15 text-slate-200">
                {filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-cyan/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div>{c.fullName}</div>
                      <div className="text-[11px] text-cyan-300/70 font-normal">Member since {c.joinedDate}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>{c.email}</div>
                      <div className="text-[11px] text-slate-400">{c.phone} • {c.location}</div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-white">
                      ₹{c.totalSpent.toLocaleString('en-IN')}
                      <div className="text-[11px] text-cyan-300/70 font-normal">{c.totalBookings} Trips</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${c.fraudRiskScore > 50 ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        Score: {c.fraudRiskScore}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold ${
                        c.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : c.status === 'suspended'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-red-600/30 text-red-300 border border-red-500/40'
                      }`}>
                        {c.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => exportCustomerData(c)}
                          className="p-1.5 rounded-lg bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 text-cyan text-xs"
                          title="Export Customer JSON"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setSelectedCustomer(c)}
                          className="px-3 py-1.5 rounded-lg bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 text-cyan text-xs flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Profile</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* TAB 3: STAFF & RBAC PERMISSIONS MATRIX */}
      {activeTab === 'staff_rbac' && (
        <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-6 font-mono">
          <div className="flex items-center justify-between pb-4 border-b border-cyan/20">
            <div>
              <h3 className="text-sm font-bold text-white uppercase">Internal Administrative RBAC Matrix</h3>
              <p className="text-xs text-cyan-300/70">
                Active role: <strong className="text-cyan">{currentRole}</strong> • Configurable privileges per administrative role
              </p>
            </div>
            <button
              onClick={() => toast.success('RBAC Matrix Policies Saved & Deployed')}
              className="px-4 py-2 rounded-xl bg-cyan text-navy font-bold text-xs shadow-md hover:brightness-110"
            >
              Save RBAC Permissions
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-cyan/20 text-cyan/70 uppercase text-[10px]">
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Verify Docs</th>
                  <th className="py-3 px-4">Issue Refunds</th>
                  <th className="py-3 px-4">Freeze Payouts</th>
                  <th className="py-3 px-4">Broadcasts</th>
                  <th className="py-3 px-4">System Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan/15 text-slate-200">
                {staffList.map((st) => (
                  <tr key={st.id} className="hover:bg-cyan/5">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div>{st.name}</div>
                      <div className="text-[10px] text-cyan-300/60 font-normal">{st.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-cyan">{st.role}</td>
                    <td className="py-3.5 px-4"><input type="checkbox" defaultChecked className="accent-cyan" /></td>
                    <td className="py-3.5 px-4"><input type="checkbox" defaultChecked={st.role.includes('Finance') || st.role.includes('Super')} className="accent-cyan" /></td>
                    <td className="py-3.5 px-4"><input type="checkbox" defaultChecked={st.role.includes('Operations') || st.role.includes('Super')} className="accent-cyan" /></td>
                    <td className="py-3.5 px-4"><input type="checkbox" defaultChecked={st.role.includes('Marketing') || st.role.includes('Super')} className="accent-cyan" /></td>
                    <td className="py-3.5 px-4"><input type="checkbox" defaultChecked={st.role === 'Super Admin'} className="accent-cyan" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* PLANNER DOSSIER MODAL */}
      <AnimatePresence>
        {selectedPlanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl glass-dark rounded-2xl border border-cyan/40 p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto scrollbar-thin font-mono text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-cyan/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan/20 text-cyan flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-heading">{selectedPlanner.agencyName}</h3>
                    <p className="text-[11px] text-cyan">{selectedPlanner.ownerName} • {selectedPlanner.location}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedPlanner(null)} className="px-3 py-1 bg-navy text-slate-300 rounded">
                  Close
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-navy/60 rounded-xl border border-cyan/15">
                <div>Total Revenue: <strong className="text-white">₹{(selectedPlanner.totalRevenue / 100000).toFixed(2)} Lakhs</strong></div>
                <div>Total Bookings: <strong className="text-white">{selectedPlanner.totalBookings}</strong></div>
                <div>Cancellation Rate: <strong className="text-red-400">{selectedPlanner.cancellationRate}%</strong></div>
                <div>Risk Score: <strong className="text-amber-300">{selectedPlanner.riskScore}%</strong></div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => {
                    suspendPlanner(selectedPlanner.id, 'High cancellation rate / fraud warning')
                    setSelectedPlanner(null)
                  }}
                  className="px-4 py-2 bg-red-600/30 text-red-200 border border-red-500/50 rounded-xl font-bold"
                >
                  Suspend Planner
                </button>
                <button
                  onClick={() => {
                    verifyPlanner(selectedPlanner.id)
                    setSelectedPlanner(null)
                  }}
                  className="px-4 py-2 bg-cyan text-navy font-bold rounded-xl"
                >
                  Approve & Issue Badge
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CUSTOMER PROFILE MODAL */}
      <AnimatePresence>
        {selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-xl glass-dark rounded-2xl border border-cyan/40 p-6 shadow-2xl space-y-4 font-mono text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-cyan/20">
                <h3 className="text-base font-bold text-white font-heading">{selectedCustomer.fullName}</h3>
                <button onClick={() => setSelectedCustomer(null)} className="px-3 py-1 bg-navy text-slate-300 rounded">
                  Close
                </button>
              </div>

              <div className="space-y-2">
                <div>Email: <strong className="text-cyan">{selectedCustomer.email}</strong></div>
                <div>Phone: <strong className="text-cyan">{selectedCustomer.phone}</strong></div>
                <div>Emergency Contact: <strong className="text-white">{selectedCustomer.emergencyContact.name} ({selectedCustomer.emergencyContact.relation} - {selectedCustomer.emergencyContact.phone})</strong></div>
                <div>Fraud Score: <strong className="text-amber-300">{selectedCustomer.fraudRiskScore}%</strong></div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  onClick={() => {
                    blacklistCustomer(selectedCustomer.id)
                    setSelectedCustomer(null)
                  }}
                  className="px-4 py-2 bg-red-600/30 text-red-200 border border-red-500/50 rounded-xl font-bold"
                >
                  Blacklist Customer
                </button>
                <button
                  onClick={() => {
                    suspendCustomer(selectedCustomer.id, 'Fraud risk alert')
                    setSelectedCustomer(null)
                  }}
                  className="px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xl font-bold"
                >
                  Suspend Customer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
