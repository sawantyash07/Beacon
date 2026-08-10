import { useState } from 'react';
import { useMasterAdmin, type Planner } from '@/data/masterAdminData';
import { 
  ShieldCheck, AlertTriangle, Eye, CheckCircle2, XCircle, 
  ChevronRight, FileText, Landmark, User, Mail, Phone, ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

export default function VerificationCenterPage() {
  const { planners, verifyPlanner, verifyPlannerDocument } = useMasterAdmin();

  // Selected Planner & doc states
  const [selectedPlannerId, setSelectedPlannerId] = useState<string>(
    planners.find(p => p.status === 'UNVERIFIED')?.id || planners[0]?.id || ''
  );
  const [activeDocIndex, setActiveDocIndex] = useState<number>(0);
  const [rejectionNotes, setRejectionNotes] = useState<string>('');
  const [showVerifiedPlanners, setShowVerifiedPlanners] = useState(false);

  // Verification Checklist local state (resets per planner)
  const [checklist, setChecklist] = useState({
    nameMatch: false,
    gstActive: false,
    tourismLicenseValid: false,
    bankVerified: false,
    bgClean: false
  });

  const activePlanner = planners.find(p => p.id === selectedPlannerId);
  const unverifiedPlanners = planners.filter(p => p.status === 'UNVERIFIED');
  const otherPlanners = planners.filter(p => p.status !== 'UNVERIFIED');

  const visiblePlanners = showVerifiedPlanners ? otherPlanners : unverifiedPlanners;

  // Select new planner helper
  const handleSelectPlanner = (id: string) => {
    setSelectedPlannerId(id);
    setActiveDocIndex(0);
    setRejectionNotes('');
    setChecklist({
      nameMatch: false,
      gstActive: false,
      tourismLicenseValid: false,
      bankVerified: false,
      bgClean: false
    });
  };

  // Fraud duplicate scans mock
  const runDuplicateScan = (planner: Planner) => {
    const alerts = [];
    
    // Check if PAN/GST is matching other planners
    const activeGstDoc = planner.documents.find(d => d.type === 'GST');
    if (activeGstDoc) {
      const match = planners.some(p => p.id !== planner.id && p.status === 'SUSPENDED');
      if (match) {
        alerts.push({
          type: 'DUPLICATE_GST',
          msg: 'WARNING: GSTIN registration matches records previously suspended for commercial fraud.',
          score: 85
        });
      }
    }

    // Check bank account matching
    const bankAccountMatch = planners.some(p => p.id !== planner.id && p.bankAccount.number === planner.bankAccount.number);
    if (bankAccountMatch) {
      alerts.push({
        type: 'DUPLICATE_BANK',
        msg: 'CRITICAL: Bank account matches an active settlement ledger associated with another agency.',
        score: 95
      });
    }

    return alerts;
  };

  const handleDocVerify = (verified: boolean, docName: string) => {
    if (!activePlanner) return;
    const reason = !verified ? rejectionNotes : undefined;
    if (!verified && !rejectionNotes) {
      toast.error('Please specify a rejection reason in notes');
      return;
    }
    verifyPlannerDocument(activePlanner.id, docName, verified, reason);
    toast.success(`Document status updated successfully.`);
    setRejectionNotes('');
  };

  const handleFinalVerification = (status: 'VERIFIED' | 'UNVERIFIED') => {
    if (!activePlanner) return;
    
    if (status === 'VERIFIED') {
      const allDocsVerified = activePlanner.documents.every(d => d.status === 'VERIFIED');
      const checklistDone = Object.values(checklist).every(v => v === true);
      
      if (!allDocsVerified) {
        toast.error('All uploaded documents must be marked as verified first');
        return;
      }
      if (!checklistDone) {
        toast.error('All checklist steps must be inspected & checked');
        return;
      }
    }

    verifyPlanner(activePlanner.id, status, status === 'VERIFIED' ? 'Passed all checks' : rejectionNotes);
    toast.success(`Planner verification marked as ${status}`);
    
    // Select another unverified planner if available
    const nextUnverified = planners.find(p => p.id !== activePlanner.id && p.status === 'UNVERIFIED');
    if (nextUnverified) {
      handleSelectPlanner(nextUnverified.id);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 select-none">
      
      {/* ==========================================
          LEFT: LIST OF PLANNERS IN QUEUE
          ========================================== */}
      <div className="xl:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-gray-400">
            {showVerifiedPlanners ? 'Moderated Agencies' : 'Verification Queue'}
          </h2>
          <button
            onClick={() => setShowVerifiedPlanners(!showVerifiedPlanners)}
            className="text-[10px] text-cyan-400 font-mono underline hover:text-white cursor-pointer"
          >
            {showVerifiedPlanners ? 'Show Pending Queue' : 'Show Moderated'}
          </button>
        </div>

        <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
          {visiblePlanners.map((p) => {
            const isSelected = p.id === selectedPlannerId;
            return (
              <div
                key={p.id}
                onClick={() => handleSelectPlanner(p.id)}
                className={`p-4 rounded-2xl border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/40 to-cyan-900/10 border-cyan-500/30 glow-cyan-sm text-cyan-400 font-bold'
                    : 'bg-gray-900/40 border-gray-850 text-gray-400 hover:border-gray-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="truncate max-w-[140px] block">{p.agencyName}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                    p.status === 'VERIFIED'
                      ? 'bg-green-950 text-green-400'
                      : p.status === 'SUSPENDED'
                      ? 'bg-red-950 text-red-500'
                      : 'bg-yellow-950 text-yellow-400'
                  }`}>
                    {p.status}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 font-mono">
                  <span>Owner: {p.ownerName}</span>
                  <span>Score: {p.riskScore}%</span>
                </div>
              </div>
            );
          })}

          {visiblePlanners.length === 0 && (
            <div className="text-center py-12 text-gray-600 font-mono text-xs border border-dashed border-gray-850 rounded-2xl">
              Queue is currently empty.
            </div>
          )}
        </div>
      </div>

      {/* ==========================================
          RIGHT: DUAL WORKSPACE
          ========================================== */}
      {activePlanner ? (
        <div className="xl:col-span-9 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Inspection Area: Info Summary & Doc Viewer */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Info Summary Panel */}
            <div className="border border-gray-855 bg-gray-900/40 p-5 rounded-3xl space-y-4">
              <div className="flex justify-between items-start border-b border-gray-850 pb-3">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-white">{activePlanner.agencyName}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 font-mono">
                    <span className="flex items-center gap-1"><User size={13} /> {activePlanner.ownerName}</span>
                    <span className="flex items-center gap-1"><Mail size={13} /> {activePlanner.email}</span>
                    <span className="flex items-center gap-1"><Phone size={13} /> {activePlanner.phone}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 uppercase font-mono block">Tier level</span>
                  <span className="font-mono text-xs font-bold text-yellow-500">★ {activePlanner.tier}</span>
                </div>
              </div>

              {/* Duplicate PAN/GST detector alert box */}
              {runDuplicateScan(activePlanner).map((alert, idx) => (
                <div key={idx} className="border border-red-900/30 bg-red-950/10 p-3.5 rounded-2xl flex items-start gap-2.5 text-xs text-red-400 animate-pulse">
                  <AlertTriangle className="shrink-0 mt-0.5" size={16} />
                  <div>
                    <span className="font-bold block uppercase tracking-wider text-[10px]">Fraud Duplicate Alert</span>
                    <p className="text-[11px] leading-relaxed text-red-300">{alert.msg}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Document Viewer Frame */}
            <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-850 pb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400">
                  Uploaded Dossier Documents
                </h4>
                <span className="text-xs text-cyan-400 font-mono">
                  {activePlanner.documents.length} Files Uploaded
                </span>
              </div>

              {/* Tabs for files */}
              <div className="flex flex-wrap gap-2">
                {activePlanner.documents.map((doc, idx) => (
                  <button
                    key={doc.name}
                    onClick={() => setActiveDocIndex(idx)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 border cursor-pointer ${
                      activeDocIndex === idx
                        ? 'bg-cyan-950/40 text-cyan-400 border-cyan-500/30'
                        : 'bg-gray-950/40 text-gray-500 border-transparent hover:text-gray-300'
                    }`}
                  >
                    <FileText size={14} />
                    <span>{doc.type}</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      doc.status === 'VERIFIED' ? 'bg-green-500' : doc.status === 'REJECTED' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Document Image & Inspector */}
              {activePlanner.documents[activeDocIndex] && (
                <div className="space-y-4 pt-2">
                  <div className="relative border border-gray-850 bg-gray-950 rounded-2xl overflow-hidden aspect-[16/9] flex items-center justify-center">
                    <img
                      src={activePlanner.documents[activeDocIndex].url}
                      alt={activePlanner.documents[activeDocIndex].name}
                      className="max-h-full object-contain w-full hover:scale-110 transition-transform duration-300 cursor-zoom-in"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg text-[10px] font-mono text-gray-400 flex items-center gap-1 border border-gray-800">
                      <Eye size={12} className="text-cyan-400" /> Interactive Inspector Mode
                    </div>
                  </div>

                  {/* Document validation controls */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-950/30 p-4 border border-gray-855 rounded-2xl">
                    <div className="text-xs font-mono">
                      <span className="text-gray-500 block">FILE: {activePlanner.documents[activeDocIndex].name}</span>
                      <span className="text-gray-300">STATUS: {activePlanner.documents[activeDocIndex].status}</span>
                      {activePlanner.documents[activeDocIndex].rejectionReason && (
                        <span className="text-red-400 block mt-1">REASON: {activePlanner.documents[activeDocIndex].rejectionReason}</span>
                      )}
                    </div>
                    <div className="flex gap-2 w-full md:w-auto shrink-0">
                      <button
                        onClick={() => handleDocVerify(true, activePlanner.documents[activeDocIndex].name)}
                        className="flex-1 md:flex-none px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CheckCircle2 size={14} /> Approve File
                      </button>
                      <button
                        onClick={() => handleDocVerify(false, activePlanner.documents[activeDocIndex].name)}
                        className="flex-1 md:flex-none px-4 py-2 bg-red-650 hover:bg-red-550 text-gray-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <XCircle size={14} /> Reject File
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Panel: Checklist & Final Decisions */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Bank details preview */}
            <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400 flex items-center gap-1">
                <Landmark size={14} className="text-cyan-400" /> Bank Settlement Account
              </h4>
              <div className="space-y-2 text-xs font-mono text-gray-400 pt-1.5">
                <div className="flex justify-between">
                  <span>HOLDER:</span>
                  <span className="text-gray-200">{activePlanner.bankAccount.holder}</span>
                </div>
                <div className="flex justify-between">
                  <span>ACCOUNT:</span>
                  <span className="text-gray-200">{activePlanner.bankAccount.number}</span>
                </div>
                <div className="flex justify-between">
                  <span>BANK:</span>
                  <span className="text-gray-200">{activePlanner.bankAccount.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span>IFSC CODE:</span>
                  <span className="text-cyan-400">{activePlanner.bankAccount.ifsc}</span>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400">
                Verification Checklist
              </h4>

              <div className="space-y-3">
                {[
                  { key: 'nameMatch', label: 'Name matches Aadhaar/PAN' },
                  { key: 'gstActive', label: 'GST registry validation checks' },
                  { key: 'tourismLicenseValid', label: 'Tourism License validated' },
                  { key: 'bankVerified', label: 'Settlement Bank account check' },
                  { key: 'bgClean', label: 'CRIMINALS record check passed' }
                ].map((item) => (
                  <label
                    key={item.key}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-950/40 border border-gray-850 text-xs cursor-pointer hover:border-cyan-500/20 transition-all select-none"
                  >
                    <input
                      type="checkbox"
                      checked={checklist[item.key as keyof typeof checklist]}
                      onChange={(e) => setChecklist(prev => ({ ...prev, [item.key]: e.target.checked }))}
                      className="w-4 h-4 accent-cyan-500 cursor-pointer rounded bg-gray-900 border-gray-800 focus:ring-0"
                    />
                    <span className="text-gray-300 font-mono">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rejection input and Actions */}
            <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400">
                Final Assessment Verdict
              </h4>

              <div className="space-y-3">
                <textarea
                  placeholder="Provide audit notes or reasons for rejection..."
                  value={rejectionNotes}
                  onChange={(e) => setRejectionNotes(e.target.value)}
                  rows={3}
                  className="w-full bg-gray-950 border border-gray-850 rounded-2xl p-3 text-xs outline-none text-gray-200 resize-none font-mono"
                />

                <div className="space-y-2">
                  <button
                    onClick={() => handleFinalVerification('VERIFIED')}
                    disabled={activePlanner.status === 'VERIFIED'}
                    className="w-full py-3 rounded-2xl bg-green-500 hover:bg-green-400 text-black font-bold text-xs cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-green-950/20 disabled:opacity-40 disabled:pointer-events-none"
                  >
                    <ShieldCheck size={16} /> Issue Verified Badge
                  </button>
                  
                  {activePlanner.status === 'VERIFIED' ? (
                    <button
                      onClick={() => handleFinalVerification('UNVERIFIED')}
                      className="w-full py-3 rounded-2xl bg-gray-850 hover:bg-gray-800 text-red-400 font-bold text-xs cursor-pointer"
                    >
                      Revoke Verification Badge
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFinalVerification('UNVERIFIED')}
                      className="w-full py-3 rounded-2xl bg-red-950/20 hover:bg-red-950/40 text-red-400 font-bold text-xs border border-red-900/30 cursor-pointer"
                    >
                      Request Re-upload / Reject
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div className="xl:col-span-9 border border-dashed border-gray-850 rounded-3xl p-24 text-center text-gray-500 text-xs font-mono flex flex-col items-center justify-center">
          Select a planner from the validation queue on the left.
        </div>
      )}

    </div>
  );
}
