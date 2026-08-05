import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Eye,
  ShieldCheck,
  Building,
  BadgeCheck,
} from 'lucide-react'
import { useMasterAdmin } from '@/context/MasterAdminContext'
import { type MandatoryDocument, type PlannerProfile } from '@/data/masterAdminData'

export default function VerificationCenterPage() {
  const {
    planners,
    documents,
    verifyPlanner,
    rejectPlanner,
    verifyDocument,
    rejectDocument,
  } = useMasterAdmin()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPlanner, setSelectedPlanner] = useState<PlannerProfile | null>(null)
  const [selectedDoc, setSelectedDoc] = useState<MandatoryDocument | null>(null)
  const [internalNote, setInternalNote] = useState('')

  const pendingPlanners = planners.filter(
    (p) => p.verificationStatus === 'pending' || p.verificationStatus === 'under_review'
  )

  const filteredPlanners = planners.filter((p) => {
    const q = searchQuery.toLowerCase()
    return (
      p.agencyName.toLowerCase().includes(q) ||
      p.ownerName.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-8 font-body">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan tracking-widest uppercase mb-1">
            <ShieldCheck className="w-4 h-4 text-cyan" />
            <span>Beacon Trust Engine & KYC Operations</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            PLANNER <span className="text-gradient">VERIFICATION</span> CENTER
          </h1>
          <p className="text-xs text-cyan-200/70 font-mono mt-1">
            Strict 9-point document audit, duplicate PAN/GST detection & automated risk evaluation
          </p>
        </div>

        {/* TRUST RULE BADGE */}
        <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>No planner can publish packages or accept payouts until verified.</span>
        </div>
      </div>

      {/* VERIFICATION QUEUE SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-dark p-4 rounded-xl border border-cyan/30">
          <div className="text-xs font-mono text-cyan-300/70">Pending Verification Queue</div>
          <div className="text-2xl font-extrabold text-white font-mono mt-1">{pendingPlanners.length} Planners</div>
          <div className="text-[10px] font-mono text-amber-400 mt-1">SLA Target &lt; 24 Hours</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-cyan/30">
          <div className="text-xs font-mono text-cyan-300/70">Verified Badge Holders</div>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">
            {planners.filter((p) => p.verifiedBadge).length} Verified
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1">100% Document Compliance</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-red-500/30 bg-red-500/5">
          <div className="text-xs font-mono text-red-300">Duplicate PAN / GST Alerts</div>
          <div className="text-2xl font-extrabold text-red-400 font-mono mt-1">
            {planners.filter((p) => p.duplicateDocFlag).length} Flags
          </div>
          <div className="text-[10px] font-mono text-red-400 mt-1">Requires immediate manual review</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-cyan/30">
          <div className="text-xs font-mono text-cyan-300/70">High Risk Scores (&gt;50)</div>
          <div className="text-2xl font-extrabold text-amber-300 font-mono mt-1">
            {planners.filter((p) => p.riskScore > 50).length} Planners
          </div>
          <div className="text-[10px] font-mono text-amber-400 mt-1">Payouts auto-frozen</div>
        </div>
      </div>

      {/* MAIN SEARCH & VERIFICATION TABLE */}
      <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search planner agency, owner, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#001736] border border-cyan/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-cyan/40 focus:outline-none focus:border-cyan font-mono"
            />
            <Search className="w-4 h-4 text-cyan/60 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-cyan/20 text-cyan/70 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Agency / Owner</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">KYC Docs</th>
                <th className="py-3 px-4">Risk Score</th>
                <th className="py-3 px-4">Duplicate Flag</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan/15 text-slate-200">
              {filteredPlanners.map((p) => {
                const docCount = Object.values(p.documentsUploaded).filter(Boolean).length
                return (
                  <tr key={p.id} className="hover:bg-cyan/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center gap-2">
                        <span>{p.agencyName}</span>
                        {p.verifiedBadge && (
                          <span title="Verified Badge">
                            <BadgeCheck className="w-4 h-4 text-cyan fill-cyan/20" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-normal text-cyan-300/70">{p.ownerName} • {p.email}</div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">{p.location}</td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${docCount === 9 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'}`}>
                        {docCount} / 9 Uploaded
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${p.riskScore > 50 ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        Risk: {p.riskScore}%
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      {p.duplicateDocFlag ? (
                        <span className="px-2 py-0.5 rounded bg-red-600/30 text-red-300 text-[10px] font-bold flex items-center gap-1 w-max" title={p.duplicateDetails}>
                          <AlertTriangle className="w-3 h-3" />
                          <span>DUPLICATE MATCH</span>
                        </span>
                      ) : (
                        <span className="text-emerald-400 text-[11px]">Clean</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold ${
                        p.verificationStatus === 'verified'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : p.verificationStatus === 'under_review' || p.verificationStatus === 'pending'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}>
                        {p.verificationStatus}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedPlanner(p)}
                          className="px-3 py-1.5 rounded-lg bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 text-cyan text-xs font-mono flex items-center gap-1 transition-all"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect KYC</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* PLANNER KYC INSPECTION MODAL */}
      <AnimatePresence>
        {selectedPlanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl glass-dark rounded-2xl border border-cyan/40 p-6 shadow-2xl my-8 space-y-6 max-h-[90vh] overflow-y-auto scrollbar-thin"
            >
              {/* MODAL HEADER */}
              <div className="flex items-center justify-between pb-4 border-b border-cyan/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan/20 border border-cyan/40 text-cyan flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white font-heading">{selectedPlanner.agencyName}</h3>
                    <p className="text-xs font-mono text-cyan-300/70">
                      Owner: {selectedPlanner.ownerName} • {selectedPlanner.phone} • {selectedPlanner.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPlanner(null)}
                  className="px-3 py-1.5 rounded-xl bg-navy border border-cyan/30 text-xs font-mono text-slate-300 hover:text-white"
                >
                  Close
                </button>
              </div>

              {/* DUPLICATE WARNING ALERT IF PRESENT */}
              {selectedPlanner.duplicateDocFlag && (
                <div className="p-3.5 rounded-xl bg-red-600/20 border border-red-500/50 text-red-200 text-xs font-mono flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-red-300 font-bold uppercase">DUPLICATE DOCUMENT DETECTED BY AI RISK ENGINE</strong>
                    <span>{selectedPlanner.duplicateDetails}</span>
                  </div>
                </div>
              )}

              {/* MANDATORY 9-DOCUMENTS GRID */}
              <div>
                <h4 className="text-xs font-mono text-cyan uppercase tracking-wider mb-3 font-bold">
                  Mandatory 9-Point Document Checklist
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(selectedPlanner.documentsUploaded).map(([docKey, isUploaded]) => {
                    const docName = docKey
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())

                    const foundDoc = documents.find((d) => d.plannerId === selectedPlanner.id && d.docType.toLowerCase().includes(docKey.toLowerCase()))

                    return (
                      <div
                        key={docKey}
                        className={`p-3.5 rounded-xl border text-xs font-mono space-y-2 ${
                          isUploaded ? 'bg-navy/70 border-cyan/30' : 'bg-red-500/5 border-red-500/20 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white">{docName}</span>
                          {isUploaded ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400" />
                          )}
                        </div>

                        <div className="text-[10px] text-cyan-300/60">
                          {isUploaded ? 'Uploaded & Ready for Audit' : 'Missing / Required'}
                        </div>

                        {isUploaded && (
                          <button
                            onClick={() => {
                              setSelectedDoc(
                                foundDoc || {
                                  id: `doc-${docKey}`,
                                  plannerId: selectedPlanner.id,
                                  plannerName: selectedPlanner.agencyName,
                                  docType: docName as any,
                                  docNumber: 'Verified Document Scan',
                                  fileUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
                                  uploadDate: '2026-08-01',
                                  status: 'pending',
                                }
                              )
                            }}
                            className="w-full py-1 px-2 rounded bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 text-cyan text-[10px] font-bold flex items-center justify-center gap-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View Document Image</span>
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* INTERNAL NOTES & VERIFICATION DECISION BAR */}
              <div className="pt-4 border-t border-cyan/20 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-cyan-200/80 mb-1">
                    Internal Verification Notes & Risk Assessment Comments
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter compliance notes, phone verification details..."
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    className="w-full bg-[#001736] border border-cyan/30 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300/80">
                    <span>Calculated Risk Score:</span>
                    <strong className="text-amber-300 font-bold">{selectedPlanner.riskScore}%</strong>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        rejectPlanner(selectedPlanner.id, 'Documents failed verification compliance check')
                        setSelectedPlanner(null)
                      }}
                      className="px-4 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300 text-xs font-mono font-bold"
                    >
                      Reject Application
                    </button>

                    <button
                      onClick={() => {
                        verifyPlanner(selectedPlanner.id)
                        setSelectedPlanner(null)
                      }}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal to-cyan text-navy font-bold text-xs font-mono shadow-[0_0_20px_rgba(0,203,224,0.3)] hover:brightness-110"
                    >
                      Grant Verified Badge & Approve
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SINGLE DOCUMENT INSPECTION VIEWER MODAL */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl glass-dark rounded-2xl border border-cyan/40 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-cyan/20">
                <div>
                  <h4 className="text-sm font-bold text-white font-mono">{selectedDoc.docType}</h4>
                  <p className="text-xs font-mono text-cyan">{selectedDoc.plannerName} • ID: {selectedDoc.docNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedDoc(null)}
                  className="px-3 py-1 rounded bg-navy border border-cyan/30 text-xs font-mono text-slate-300"
                >
                  Close Viewer
                </button>
              </div>

              {/* HIGH RES IMAGE DISPLAY */}
              <div className="relative rounded-xl overflow-hidden border border-cyan/30 bg-black max-h-[350px] flex items-center justify-center">
                <img src={selectedDoc.fileUrl} alt={selectedDoc.docType} className="max-h-[350px] object-contain" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-mono text-slate-300">
                  Upload Date: <strong className="text-cyan">{selectedDoc.uploadDate}</strong>
                </div>

                <div className="flex gap-2 font-mono text-xs">
                  <button
                    onClick={() => {
                      rejectDocument(selectedDoc.id, 'Illegible image / document expired')
                      setSelectedDoc(null)
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-600/20 text-red-300 border border-red-500/40"
                  >
                    Reject Document
                  </button>
                  <button
                    onClick={() => {
                      verifyDocument(selectedDoc.id)
                      setSelectedDoc(null)
                    }}
                    className="px-4 py-1.5 rounded-lg bg-cyan text-navy font-bold shadow-md"
                  >
                    Approve Document
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
