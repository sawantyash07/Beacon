import { useState } from 'react';
import { useMasterAdmin, type Package } from '@/data/masterAdminData';
import { 
  Package as PkgIcon, Search, ShieldCheck, ShieldAlert, Star, 
  Trash2, EyeOff, Archive, AlertCircle, History, Edit, Info
} from 'lucide-react';
import { toast } from 'sonner';

export default function PackageManagementPage() {
  const { packages, moderatePackage } = useMasterAdmin();

  // Filter tabs
  const [activeFilter, setActiveFilter] = useState<Package['status'] | 'FEATURED'>('PUBLISHED');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected package for audit details
  const [selectedPkgId, setSelectedPkgId] = useState<string | null>(
    packages[0]?.id || null
  );

  const activePkg = packages.find(p => p.id === selectedPkgId);

  // local simulation state
  const [revisionNotes, setRevisionNotes] = useState('');

  // Filter packages helper
  const filteredPackages = packages.filter(pkg => {
    if (searchQuery && !pkg.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (activeFilter === 'FEATURED') return pkg.isFeatured;
    return pkg.status === activeFilter;
  });

  const handleAction = (status: Package['status']) => {
    if (!activePkg) return;
    moderatePackage(activePkg.id, status, activePkg.isFeatured);
    toast.success(`Package "${activePkg.title}" status updated to: ${status}`);
  };

  const handleToggleFeatured = () => {
    if (!activePkg) return;
    moderatePackage(activePkg.id, activePkg.status, !activePkg.isFeatured);
    toast.success(`Package feature status updated to: ${!activePkg.isFeatured}`);
  };

  const handleRequestModifications = () => {
    if (!revisionNotes) {
      toast.error('Please describe requested modifications in notes');
      return;
    }
    handleAction('REPORTED');
    toast.success(`Modification request dispatched to operator: ${activePkg?.plannerName}`);
    setRevisionNotes('');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 select-none">
      
      {/* ==========================================
          LEFT: DIRECTORY INDEX & FILTER TABS
          ========================================== */}
      <div className="xl:col-span-8 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Filters tabs bar */}
          <div className="flex flex-wrap bg-gray-950/60 p-1 rounded-xl text-[10px] font-medium border border-gray-855">
            {['PUBLISHED', 'DRAFT', 'HIDDEN', 'REPORTED', 'FEATURED'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as any)}
                className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer uppercase ${
                  activeFilter === filter 
                    ? 'bg-cyan-500 text-black' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {filter}
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
              placeholder="Search listings..."
              className="bg-gray-900 border border-gray-850 pl-9 pr-4 py-1.5 rounded-xl text-xs outline-none text-gray-200 font-medium focus:border-cyan-500/30"
            />
          </div>
        </div>

        {/* Packages Grid directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPackages.map((pkg) => {
            const isSelected = pkg.id === selectedPkgId;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPkgId(pkg.id)}
                className={`p-5 rounded-3xl border text-xs transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950/40 to-cyan-900/10 border-cyan-500/30 glow-cyan-sm text-cyan-400 font-bold'
                    : 'bg-gray-900/40 border-gray-855 text-gray-400 hover:border-gray-800'
                }`}
              >
                {/* Featured Badge */}
                {pkg.isFeatured && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-black px-2 py-0.5 rounded-bl-xl text-[9px] font-bold font-medium">
                    ★ FEATURED
                  </div>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <PkgIcon size={16} className={isSelected ? 'text-cyan-400' : 'text-gray-500'} />
                  <span className="font-medium text-[10px] text-gray-500">{pkg.id}</span>
                </div>

                <h4 className="text-sm font-bold text-gray-200 truncate pr-16">{pkg.title}</h4>
                <p className="text-[10px] text-gray-500 font-medium mb-3">Operator: {pkg.plannerName}</p>

                <div className="flex justify-between items-baseline pt-2 border-t border-gray-855/40 text-[10px] font-medium">
                  <span className="text-gray-400">₹{pkg.basePrice.toLocaleString()} / guest</span>
                  <span className="text-cyan-400 font-bold">{pkg.duration} Days</span>
                </div>
              </div>
            );
          })}

          {filteredPackages.length === 0 && (
            <div className="col-span-2 text-center py-20 text-gray-600 font-medium text-xs border border-dashed border-gray-855 rounded-3xl">
              No packages matching selected filter index.
            </div>
          )}
        </div>

      </div>

      {/* ==========================================
          RIGHT: QUALITY AUDITOR COMMAND CABINET
          ========================================== */}
      <div className="xl:col-span-4 space-y-6">
        {activePkg ? (
          <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-6">
            
            {/* Header Title */}
            <div className="border-b border-gray-850 pb-4 space-y-1">
              <span className="text-[9px] text-cyan-400 font-medium font-bold">PACKAGE AUDITING MODULE</span>
              <h3 className="text-md font-black text-white leading-snug">{activePkg.title}</h3>
              <p className="text-xs text-gray-400 font-medium">Operator ID: {activePkg.plannerId}</p>
            </div>

            {/* Quality Scanner diagnostic score */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium">
                System Content Scanner
              </h4>
              <div className="border border-gray-855 bg-gray-950/40 p-4 rounded-2xl space-y-3.5 text-xs font-medium text-gray-400">
                
                {/* Plagiarism indicator */}
                <div className="flex items-center justify-between">
                  <span>Text Plagiarism:</span>
                  <span className={`font-bold ${
                    activePkg.copyscapePercentage > 40 ? 'text-red-400' : 'text-green-400'
                  }`}>{activePkg.copyscapePercentage}% Copy</span>
                </div>

                {/* Stolen Images Indicator */}
                <div className="flex items-center justify-between">
                  <span>Copied Images Flag:</span>
                  {activePkg.copiedImagesFlag ? (
                    <span className="text-red-400 font-bold flex items-center gap-1"><ShieldAlert size={12} /> Stolen</span>
                  ) : (
                    <span className="text-green-400 font-bold flex items-center gap-1"><ShieldCheck size={12} /> Safe</span>
                  )}
                </div>

                {/* Quality Score Bar */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Quality rating score</span>
                    <span className="text-cyan-400 font-bold">{activePkg.qualityScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-850 h-2 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-full rounded-full transition-all" style={{ width: `${activePkg.qualityScore}%` }} />
                  </div>
                </div>

              </div>
            </div>

            {/* Revision logs */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium flex items-center gap-1">
                <History size={13} className="text-cyan-400" /> Package Revision logs
              </h4>
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1 text-[11px] font-medium text-gray-400 leading-normal">
                <div className="p-2.5 rounded-xl bg-gray-950/40 border border-gray-855/40">
                  <span className="text-[9px] text-gray-500 block">V3 (Latest) — 2026-08-04</span>
                  Base price adjusted to ₹{activePkg.basePrice.toLocaleString()} by operator.
                </div>
                <div className="p-2.5 rounded-xl bg-gray-950/20 border border-transparent">
                  <span className="text-[9px] text-gray-650 block">V2 — 2026-08-01</span>
                  Cover photo changed and detailed itinerary maps updated.
                </div>
              </div>
            </div>

            {/* Actions Matrix */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium flex items-center gap-1">
                <Edit size={13} className="text-cyan-400" /> Moderation Controls
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                
                {/* Feature override */}
                <button
                  onClick={handleToggleFeatured}
                  className={`py-2.5 rounded-xl font-bold cursor-pointer flex items-center justify-center gap-1 border ${
                    activePkg.isFeatured
                      ? 'bg-yellow-950/40 border-yellow-500/30 text-yellow-400'
                      : 'bg-gray-950 hover:bg-gray-850 text-gray-300 border-gray-800'
                  }`}
                >
                  <Star size={13} />
                  {activePkg.isFeatured ? 'Un-Feature' : 'Feature'}
                </button>

                {/* Hide / Publish toggle */}
                {activePkg.status === 'HIDDEN' ? (
                  <button
                    onClick={() => handleAction('PUBLISHED')}
                    className="py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold cursor-pointer flex items-center justify-center gap-1"
                  >
                    <ShieldCheck size={13} /> Publish
                  </button>
                ) : (
                  <button
                    onClick={() => handleAction('HIDDEN')}
                    className="py-2.5 rounded-xl bg-gray-950 hover:bg-gray-850 text-gray-400 border border-gray-800 font-bold cursor-pointer flex items-center justify-center gap-1"
                  >
                    <EyeOff size={13} /> Hide
                  </button>
                )}

                {/* Archive listing */}
                <button
                  onClick={() => handleAction('ARCHIVED')}
                  disabled={activePkg.status === 'ARCHIVED'}
                  className="py-2.5 rounded-xl bg-gray-950 hover:bg-gray-850 text-gray-400 border border-gray-850 font-bold cursor-pointer flex items-center justify-center gap-1 disabled:opacity-40"
                >
                  <Archive size={13} /> Archive
                </button>

                {/* Policy violation delete */}
                <button
                  onClick={() => handleAction('ARCHIVED')}
                  className="py-2.5 rounded-xl bg-red-950/20 text-red-500 border border-red-900/30 font-bold cursor-pointer flex items-center justify-center gap-1 hover:bg-red-950/40"
                >
                  <Trash2 size={13} /> Remove
                </button>

              </div>
            </div>

            {/* Request revisions Form */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium flex items-center gap-1">
                <AlertCircle size={13} className="text-red-400" /> Request Operator Revisions
              </h4>
              <div className="space-y-2">
                <textarea
                  placeholder="Describe required edits (e.g. rewrite description, provide registration proof)..."
                  value={revisionNotes}
                  onChange={(e) => setRevisionNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-gray-950 border border-gray-855 rounded-2xl p-2.5 text-xs outline-none text-gray-200 resize-none font-medium"
                />
                <button
                  onClick={handleRequestModifications}
                  className="w-full py-2 bg-gradient-to-r from-red-650 to-red-550 text-gray-950 font-black text-xs font-medium uppercase cursor-pointer rounded-xl"
                >
                  Send revision request
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="border border-dashed border-gray-855 rounded-3xl p-12 text-center text-gray-500 font-medium text-xs">
            Select a package listing from the index.
          </div>
        )}
      </div>

    </div>
  );
}
