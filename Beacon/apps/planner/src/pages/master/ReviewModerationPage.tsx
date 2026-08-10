import { useState } from 'react';
import { useMasterAdmin, type ModeratedReview } from '@/data/masterAdminData';
import { 
  MessageSquare, Star, Search, ShieldCheck, ShieldAlert, EyeOff, 
  Trash2, AlertCircle, RefreshCw, UserCheck, AlertOctagon
} from 'lucide-react';
import { toast } from 'sonner';

export default function ReviewModerationPage() {
  const { reviews, moderateReview, suspendCustomer, addCustomAuditLog } = useMasterAdmin();

  // Filter tabs
  const [activeFilter, setActiveFilter] = useState<ModeratedReview['status'] | 'ALL'>('FLAGGED');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Review state
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(
    reviews.find(r => r.status === 'FLAGGED')?.id || reviews[0]?.id || null
  );

  const activeReview = reviews.find(r => r.id === selectedReviewId);

  // Filter reviews helper
  const filteredReviews = reviews.filter(r => {
    if (searchQuery && !r.packageTitle.toLowerCase().includes(searchQuery.toLowerCase()) && !r.customerName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (activeFilter === 'ALL') return true;
    return r.status === activeFilter;
  });

  const handleModerateAction = (status: ModeratedReview['status']) => {
    if (!activeReview) return;
    moderateReview(activeReview.id, status);
    toast.success(`Review moderated to: ${status}`);
  };

  const handleIssueWarning = () => {
    if (!activeReview) return;
    addCustomAuditLog(`Issued warning notice to traveler: ${activeReview.customerName} for review policy violation`, 'Content Moderation');
    toast.success(`Official warning notification dispatched to traveler: ${activeReview.customerName}`);
  };

  const handleSuspendReviewer = () => {
    if (!activeReview) return;
    // Finding corresponding customer is simulated via matching customer name
    suspendCustomer('cust-3', 'SUSPENDED', 'Spam/Fake review abuse override');
    toast.error(`Traveler account suspended due to review abuse.`);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 select-none">
      
      {/* ==========================================
          LEFT: REVIEWS DIRECTORY INDEX
          ========================================== */}
      <div className="xl:col-span-8 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap bg-gray-950/60 p-1 rounded-xl text-[10px] font-mono border border-gray-855">
            {['FLAGGED', 'APPROVED', 'FAKE', 'HIDDEN', 'ALL'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f as any)}
                className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer uppercase ${
                  activeFilter === f 
                    ? 'bg-cyan-500 text-black' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <Search size={14} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Traveler or Package..."
              className="bg-gray-900 border border-gray-850 pl-9 pr-4 py-1.5 rounded-xl text-xs outline-none text-gray-200 font-mono focus:border-cyan-500/30"
            />
          </div>
        </div>

        {/* List Grid */}
        <div className="space-y-3">
          {filteredReviews.map((rev) => {
            const isSelected = rev.id === selectedReviewId;
            return (
              <div
                key={rev.id}
                onClick={() => setSelectedReviewId(rev.id)}
                className={`p-4 rounded-2xl border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/40 to-cyan-900/10 border-cyan-500/30 glow-cyan-sm text-cyan-400 font-bold'
                    : 'bg-gray-900/40 border-gray-855 text-gray-400 hover:border-gray-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-200">{rev.customerName}</span>
                    <span className="text-gray-500">— {rev.packageTitle}</span>
                  </div>
                  <div className="flex gap-0.5 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={11} fill={i < rev.rating ? 'currentColor' : 'none'} className={i < rev.rating ? 'text-yellow-500' : 'text-gray-650'} />
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 font-mono text-[11px] mb-2 leading-relaxed italic">
                  "{rev.text}"
                </p>

                {rev.flagReason && (
                  <div className="text-[10px] text-red-400 font-mono flex items-center gap-1">
                    <AlertCircle size={12} /> Auto Flagged: {rev.flagReason}
                  </div>
                )}
              </div>
            );
          })}

          {filteredReviews.length === 0 && (
            <div className="text-center py-20 text-gray-600 font-mono text-xs border border-dashed border-gray-855 rounded-3xl">
              No feedback reviews listed under this catalog.
            </div>
          )}
        </div>

      </div>

      {/* ==========================================
          RIGHT: AUDITOR DISPATCH CABINET
          ========================================== */}
      <div className="xl:col-span-4">
        {activeReview ? (
          <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-6">
            
            <div className="border-b border-gray-850 pb-4 space-y-1">
              <span className="text-[10px] text-cyan-400 font-mono font-bold">FEEDBACK AUDITING CARD</span>
              <h3 className="text-md font-black text-white">Guest: {activeReview.customerName}</h3>
              <p className="text-xs text-gray-500 font-mono">Date: {new Date(activeReview.timestamp).toLocaleDateString()}</p>
            </div>

            {/* Review content box */}
            <div className="p-4 rounded-2xl bg-gray-955/40 border border-gray-850 text-xs font-mono text-gray-300 leading-normal italic">
              "{activeReview.text}"
            </div>

            {/* Diagnostic stats */}
            <div className="border border-gray-855 bg-gray-955/20 p-4 rounded-2xl space-y-2 text-xs font-mono text-gray-400">
              <div className="flex justify-between">
                <span>Associated Package:</span>
                <span className="text-gray-200 truncate max-w-[150px]">{activeReview.packageTitle}</span>
              </div>
              <div className="flex justify-between">
                <span>Stars Counted:</span>
                <span className="text-yellow-500 font-bold">{activeReview.rating} / 5</span>
              </div>
              <div className="flex justify-between">
                <span>Policy status:</span>
                <span className="text-cyan-400 font-bold">{activeReview.status}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-4 pt-2">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono flex items-center gap-1">
                <AlertOctagon size={13} className="text-cyan-400" /> Moderation overrides
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  onClick={() => handleModerateAction('APPROVED')}
                  className="py-2 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold cursor-pointer flex items-center justify-center gap-1"
                >
                  <ShieldCheck size={13} /> Approve
                </button>
                <button
                  onClick={() => handleModerateAction('HIDDEN')}
                  className="py-2 rounded-xl bg-gray-950 hover:bg-gray-850 text-gray-400 border border-gray-800 font-bold cursor-pointer flex items-center justify-center gap-1"
                >
                  <EyeOff size={13} /> Hide
                </button>
                <button
                  onClick={() => handleModerateAction('FAKE')}
                  className="py-2 rounded-xl bg-red-950/20 text-red-500 border border-red-900/30 font-bold cursor-pointer flex items-center justify-center gap-1 hover:bg-red-950/40"
                >
                  <ShieldAlert size={13} /> Flag Fake
                </button>
                <button
                  onClick={() => handleModerateAction('HIDDEN')}
                  className="py-2 rounded-xl bg-gray-950 hover:bg-gray-850 text-gray-400 border border-gray-850 font-bold cursor-pointer flex items-center justify-center gap-1"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>

            {/* Warn / Suspend Reviewer panel */}
            <div className="space-y-3 pt-2 border-t border-gray-850">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">
                Operator Policy Actions
              </h4>
              <div className="space-y-2">
                <button
                  onClick={handleIssueWarning}
                  className="w-full py-2.5 rounded-xl bg-gray-950 hover:bg-gray-850 text-gray-300 border border-gray-800 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <AlertCircle size={14} /> Dispatch Policy Warning
                </button>
                <button
                  onClick={handleSuspendReviewer}
                  className="w-full py-2.5 rounded-xl bg-red-950/20 text-red-550 border border-red-900/30 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-red-950/40"
                >
                  <UserCheck size={14} /> Suspend Reviewer Profile
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="border border-dashed border-gray-855 rounded-3xl p-12 text-center text-gray-500 font-mono text-xs">
            Select a feedback review card from the directory index.
          </div>
        )}
      </div>

    </div>
  );
}
