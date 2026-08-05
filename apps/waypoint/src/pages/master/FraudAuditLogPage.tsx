import { useState } from 'react'
import { ShieldAlert, Search } from 'lucide-react'
import { useMasterAdmin } from '@/context/MasterAdminContext'

export default function FraudAuditLogPage() {
  const { auditLogs, planners, customers } = useMasterAdmin()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLogs = auditLogs.filter((log) => {
    return (
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.targetEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.includes(searchQuery)
    )
  })

  // Fraud Engine Risk Rule Monitors
  const highRiskPlanners = planners.filter((p) => p.riskScore > 50)
  const highRiskCustomers = customers.filter((c) => c.fraudRiskScore > 50)

  return (
    <div className="space-y-8 font-body font-mono text-xs">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan tracking-widest uppercase mb-1">
            <ShieldAlert className="w-4 h-4 text-cyan" />
            <span>Immutable Compliance & Security Audit</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            FRAUD ENGINE & <span className="text-gradient">AUDIT</span> LOGS
          </h1>
          <p className="text-xs text-cyan-200/70 mt-1">
            Immutable system trails, IP logging, before/after diffs & automated AI risk rule evaluations
          </p>
        </div>
      </div>

      {/* FRAUD RULES ENGINE SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-dark p-4 rounded-xl border border-red-500/30 bg-red-500/5">
          <div className="text-xs text-red-300 font-bold">Duplicate PAN / GST / Bank Rules</div>
          <div className="text-xl font-extrabold text-red-400 mt-1">STRICT ENFORCEMENT</div>
          <div className="text-[10px] text-red-300 mt-1">Auto-flags matching credentials across accounts</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
          <div className="text-xs text-amber-300 font-bold">High Risk Score Accounts</div>
          <div className="text-xl font-extrabold text-amber-400 mt-1">
            {highRiskPlanners.length + highRiskCustomers.length} Flagged
          </div>
          <div className="text-[10px] text-amber-300 mt-1">Payouts & instant booking auto-restricted</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-cyan/30">
          <div className="text-xs text-cyan-300/70 font-bold">Audit Log Traceability</div>
          <div className="text-xl font-extrabold text-emerald-400 mt-1">100% Immutable</div>
          <div className="text-[10px] text-emerald-400 mt-1">Zero deletion capability enabled</div>
        </div>
      </div>

      {/* AUDIT LOG TABLE */}
      <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search action, actor, target entity, IP address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#001736] border border-cyan/30 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-cyan/40 focus:outline-none focus:border-cyan"
            />
            <Search className="w-4 h-4 text-cyan/60 absolute left-3.5 top-2.5" />
          </div>

          <div className="text-[11px] text-cyan-300/70">
            Total Audit Entries: <strong className="text-white">{auditLogs.length}</strong>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cyan/20 text-cyan/70 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Timestamp / IP</th>
                <th className="py-3 px-4">Admin Identity & Role</th>
                <th className="py-3 px-4">Action & Module</th>
                <th className="py-3 px-4">Target Entity</th>
                <th className="py-3 px-4">State Change Diff</th>
                <th className="py-3 px-4">Reason / Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan/15 text-slate-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-cyan/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div>{log.timestamp}</div>
                    <div className="text-[10px] text-cyan-300/60 font-normal">IP: {log.ipAddress}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{log.actorName}</div>
                    <div className="text-[10px] text-cyan font-normal">{log.actorRole}</div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-cyan">
                    <span className="px-2 py-0.5 rounded bg-cyan/10 border border-cyan/30">
                      {log.action}
                    </span>
                    <div className="text-[10px] text-slate-400 font-normal mt-1">{log.affectedModule}</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-200 font-bold max-w-xs truncate">{log.targetEntity}</td>

                  <td className="py-3.5 px-4">
                    <div className="text-red-400 text-[10px]">Prev: {log.previousValue}</div>
                    <div className="text-emerald-400 text-[10px] font-bold">New: {log.newValue}</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300 max-w-xs truncate">{log.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
