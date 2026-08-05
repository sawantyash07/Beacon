import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Search,
  Gavel,
} from 'lucide-react'
import { useMasterAdmin } from '@/context/MasterAdminContext'
import { type DisputeCase } from '@/data/masterAdminData'
import { toast } from 'sonner'

export default function DisputesReportsPage() {
  const { disputes, resolveDispute } = useMasterAdmin()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCase, setSelectedCase] = useState<DisputeCase | null>(null)
  const [verdictText, setVerdictText] = useState('')

  const filteredDisputes = disputes.filter((d) => {
    const q = searchQuery.toLowerCase()
    return (
      d.caseNumber.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.complainantName.toLowerCase().includes(q) ||
      d.respondentName.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-8 font-body font-mono">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan tracking-widest uppercase mb-1">
            <FileText className="w-4 h-4 text-cyan" />
            <span>Legal & Operational Conflicts</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            REPORTS & <span className="text-gradient">DISPUTES</span> TRIBUNAL
          </h1>
          <p className="text-xs text-cyan-200/70 mt-1">
            Investigate fraud incidents, safety complaints, package misrepresentation & issue binding legal verdicts
          </p>
        </div>
      </div>

      {/* DISPUTES TABLE */}
      <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search Case Number (DSP-2026-004), complainant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#001736] border border-cyan/30 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-cyan/40 focus:outline-none focus:border-cyan"
          />
          <Search className="w-4 h-4 text-cyan/60 absolute left-3.5 top-2.5" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cyan/20 text-cyan/70 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Case Number / Category</th>
                <th className="py-3 px-4">Complainant vs Respondent</th>
                <th className="py-3 px-4">Disputed Amount</th>
                <th className="py-3 px-4">Assigned Legal Officer</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan/15 text-slate-200">
              {filteredDisputes.map((d) => (
                <tr key={d.id} className="hover:bg-cyan/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div className="text-cyan">{d.caseNumber}</div>
                    <div className="text-[11px] text-slate-300 font-normal">{d.category}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{d.complainantName}</div>
                    <div className="text-[11px] text-cyan-300/70">vs {d.respondentName}</div>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-emerald-400">₹{d.disputedAmount.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 text-slate-300">{d.assignedOfficer}</td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {d.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedCase(d)}
                      className="px-3 py-1.5 rounded-lg bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 text-cyan text-xs font-bold flex items-center gap-1 ml-auto"
                    >
                      <Gavel className="w-3.5 h-3.5" />
                      <span>Case Dossier</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DISPUTE CASE DOSSIER & VERDICT MODAL */}
      <AnimatePresence>
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md text-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl glass-dark rounded-2xl border border-cyan/40 p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto scrollbar-thin"
            >
              <div className="flex items-center justify-between pb-3 border-b border-cyan/20">
                <div>
                  <h3 className="text-base font-bold text-white font-heading">
                    Case File #{selectedCase.caseNumber} - {selectedCase.category}
                  </h3>
                  <p className="text-xs text-cyan">{selectedCase.complainantName} vs {selectedCase.respondentName}</p>
                </div>
                <button onClick={() => setSelectedCase(null)} className="px-3 py-1 bg-navy text-slate-300 rounded">
                  Close Case
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-navy/60 border border-cyan/15 space-y-2">
                <div>Investigation Notes:</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{selectedCase.investigationNotes}</p>
              </div>

              <div>
                <label className="block text-cyan-200/80 mb-1">Issue Binding Legal Verdict</label>
                <textarea
                  rows={3}
                  placeholder="Enter final ruling, refund allocation or account suspension verdict..."
                  value={verdictText}
                  onChange={(e) => setVerdictText(e.target.value)}
                  className="w-full bg-[#001736] border border-cyan/30 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => {
                    if (!verdictText) {
                      toast.error('Please enter verdict ruling text')
                      return
                    }
                    resolveDispute(selectedCase.id, verdictText)
                    setSelectedCase(null)
                  }}
                  className="px-5 py-2 rounded-xl bg-cyan text-navy font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Gavel className="w-3.5 h-3.5" />
                  <span>Finalize Verdict & Close Case</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
