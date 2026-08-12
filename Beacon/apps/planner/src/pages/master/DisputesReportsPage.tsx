import { useState } from 'react';
import { useMasterAdmin, type DisputeCase } from '@/data/masterAdminData';
import { 
  Scale, Search, Image as ImageIcon, FileText, AlertTriangle, 
  CheckCircle2, XCircle, ArrowRight, Clock, MessageSquare, ShieldAlert
} from 'lucide-react';
import { toast } from 'sonner';

export default function DisputesReportsPage() {
  const { disputes, resolveDispute } = useMasterAdmin();

  // Search query states
  const [searchQuery, setSearchQuery] = useState('');

  // Selected case state
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(
    disputes.find(d => d.status === 'UNDER_INVESTIGATION')?.id || disputes[0]?.id || null
  );

  const activeCase = disputes.find(d => d.id === selectedCaseId);

  // local simulation states
  const [internalNotesInput, setInternalNotesInput] = useState('');

  // Filter disputes helper
  const filteredDisputes = disputes.filter(d => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      d.id.toLowerCase().includes(q) ||
      d.customerName.toLowerCase().includes(q) ||
      d.plannerName.toLowerCase().includes(q) ||
      d.type.toLowerCase().includes(q)
    );
  });

  const handleResolveCase = (verdict: DisputeCase['verdict']) => {
    if (!activeCase) return;
    resolveDispute(activeCase.id, verdict, internalNotesInput || activeCase.internalNotes);
    toast.success(`Dispute ${activeCase.id} resolved with verdict: ${verdict}`);
    setInternalNotesInput('');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 select-none">
      
      {/* ==========================================
          LEFT: CASES LIST & SEARCH INDEX
          ========================================== */}
      <div className="xl:col-span-4 space-y-4">
        
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
            <Search size={14} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Dispute Case ID, Traveler, Operator..."
            className="w-full bg-gray-900 border border-gray-850 pl-9 pr-4 py-2.5 rounded-xl text-xs outline-none text-gray-200 font-medium focus:border-cyan-500/30"
          />
        </div>

        {/* List */}
        <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
          {filteredDisputes.map((caseItem) => {
            const isSelected = caseItem.id === selectedCaseId;
            return (
              <div
                key={caseItem.id}
                onClick={() => setSelectedCaseId(caseItem.id)}
                className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/40 to-cyan-900/10 border-cyan-500/30 glow-cyan-sm text-cyan-400 font-bold'
                    : 'bg-gray-900/40 border-gray-855 text-gray-400 hover:border-gray-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium font-bold text-gray-400">{caseItem.id}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-medium ${
                    caseItem.status === 'RESOLVED' 
                      ? 'bg-green-950 text-green-400' 
                      : 'bg-red-955/40 text-red-400 animate-pulse'
                  }`}>
                    {caseItem.status}
                  </span>
                </div>
                <h4 className="text-gray-300 font-semibold mb-2">{caseItem.type.replace('_', ' ')}</h4>
                
                <div className="flex justify-between items-center text-[10px] font-medium text-gray-500 border-t border-gray-850/45 pt-2">
                  <span>Guest: {caseItem.customerName}</span>
                  <span className="text-gray-400">Agent: {caseItem.plannerName}</span>
                </div>
              </div>
            );
          })}

          {filteredDisputes.length === 0 && (
            <div className="text-center py-16 text-gray-600 font-medium text-xs border border-dashed border-gray-855 rounded-3xl">
              No arbitration cases recorded.
            </div>
          )}
        </div>
      </div>

      {/* ==========================================
          RIGHT: ARBITRATION FILE VIEWER
          ========================================== */}
      <div className="xl:col-span-8">
        {activeCase ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Case details and evidence files */}
            <div className="lg:col-span-8 border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-gray-850 pb-3">
                <h3 className="text-sm font-bold font-medium text-cyan-400">{activeCase.id} — Dossier</h3>
                <span className="text-xs text-red-400 font-medium font-bold uppercase">{activeCase.status}</span>
              </div>

              {/* Dispute details box */}
              <div className="border border-gray-855 bg-gray-955/40 p-4 rounded-2xl space-y-2.5 text-xs font-medium text-gray-400">
                <div className="flex justify-between">
                  <span>Dispute Type:</span>
                  <span className="text-gray-200">{activeCase.type.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Associated Booking:</span>
                  <span className="text-cyan-400">{activeCase.bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Traveler Party:</span>
                  <span className="text-gray-200">{activeCase.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Travel Operator:</span>
                  <span className="text-gray-200">{activeCase.plannerName}</span>
                </div>
              </div>

              {/* Evidence Locker files */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium flex items-center gap-1">
                  <ImageIcon size={13} className="text-cyan-400" /> Evidence Locker Attachment Files
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {activeCase.evidenceUrls.map((url, index) => (
                    <div key={index} className="border border-gray-850 bg-gray-950 rounded-xl overflow-hidden aspect-video relative group cursor-zoom-in">
                      <img src={url} alt={`Evidence #${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <FileText size={16} className="text-cyan-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case timeline logs */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium flex items-center gap-1">
                  <Clock size={13} className="text-cyan-400" /> Investigation Diary Timeline
                </h4>
                <div className="space-y-3 pl-3 border-l-2 border-gray-800 text-[11px] font-medium text-gray-400">
                  {activeCase.timeline.map((log, index) => (
                    <div key={index} className="relative space-y-0.5">
                      <span className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-cyan-400" />
                      <span className="text-[9px] text-gray-500 block">{new Date(log.timestamp).toLocaleString()}</span>
                      <span className="font-bold text-gray-300">{log.action}</span>
                      <p className="text-[10px] text-gray-500">By: {log.actor}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Arbitration Controls column */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Internal notes input */}
              <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-3">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium">
                  Internal Investigation notes
                </h4>
                <textarea
                  placeholder="Record call summaries, contract checking details..."
                  value={internalNotesInput}
                  onChange={(e) => setInternalNotesInput(e.target.value)}
                  rows={3}
                  className="w-full bg-gray-950 border border-gray-855 rounded-2xl p-2.5 text-xs outline-none text-gray-200 resize-none font-medium"
                />
                <div className="text-[10px] leading-relaxed text-gray-500 font-medium bg-gray-950/40 p-2.5 rounded-xl border border-gray-850">
                  <span className="text-cyan-400 font-bold block mb-1">Dossier Notes:</span>
                  {activeCase.internalNotes}
                </div>
              </div>

              {/* Verdict actions */}
              <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-4">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium flex items-center gap-1">
                  <Scale size={13} className="text-cyan-400" /> Dispatch Arbitration Verdict
                </h4>
                <div className="space-y-2 text-xs font-medium">
                  <button
                    onClick={() => handleResolveCase('REFUNDED_TO_CUSTOMER')}
                    disabled={activeCase.status === 'RESOLVED'}
                    className="w-full py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 size={14} /> Full Guest Refund
                  </button>
                  <button
                    onClick={() => handleResolveCase('SETTLED_TO_PLANNER')}
                    disabled={activeCase.status === 'RESOLVED'}
                    className="w-full py-2.5 rounded-xl bg-gray-950 hover:bg-gray-850 text-gray-300 border border-gray-800 font-bold cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ArrowRight size={14} /> Settle Payout to Agent
                  </button>
                  <button
                    onClick={() => handleResolveCase('REJECTED')}
                    disabled={activeCase.status === 'RESOLVED'}
                    className="w-full py-2.5 rounded-xl bg-red-950/20 text-red-500 border border-red-900/30 hover:bg-red-950/40 font-bold cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <XCircle size={14} /> Dismiss & Reject Claim
                  </button>
                </div>
              </div>

            </div>

          </div>
        ) : (
          <div className="border border-dashed border-gray-855 rounded-3xl p-24 text-center text-gray-500 font-medium text-xs">
            Select a dispute case from the index.
          </div>
        )}
      </div>

    </div>
  );
}
