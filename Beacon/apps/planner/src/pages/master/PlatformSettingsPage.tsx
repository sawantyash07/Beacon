import { useState } from 'react';
import { useMasterAdmin } from '@/data/masterAdminData';
import { 
  Settings, Sliders, DollarSign, Flag, Compass, FileText, 
  ShieldAlert, ShieldCheck, Plus, CheckSquare, XSquare, Percent
} from 'lucide-react';
import { toast } from 'sonner';

export default function PlatformSettingsPage() {
  const { settings, systemMode, updateSystemSettings } = useMasterAdmin();

  // local configuration variables
  const [commRate, setCommRate] = useState(settings.commissionRate.toString());
  const [gstPercent, setGstPercent] = useState(settings.gstPercent.toString());
  const [payoutCycle, setPayoutCycle] = useState(settings.payoutCycleDays.toString());
  
  // Feature Flags local sync
  const [features, setFeatures] = useState(settings.featureFlags);

  // Destinations local listing
  const [destList, setDestList] = useState(settings.destinations);
  const [newDestName, setNewDestName] = useState('');
  const [newDestState, setNewDestState] = useState('');

  // Legal editor
  const [legalDoc, setLegalDoc] = useState('PRIVACY');
  const [legalText, setLegalText] = useState(
    'BEACON COMPLIANCE AND SAFETY REGULATIONS POLICY.\n\nAll registered travel planners agree to maintain validated bank settlement ledgers, verified Aadhaar identification cards, and comply with state tourism licensing rules...'
  );

  const handleSaveVariables = () => {
    const rate = parseFloat(commRate);
    const gst = parseFloat(gstPercent);
    const cycle = parseInt(payoutCycle);

    if (isNaN(rate) || rate < 8 || rate > 15) {
      toast.error('Commission rate must be between 8% and 15%');
      return;
    }
    if (isNaN(gst) || gst < 0 || gst > 28) {
      toast.error('GST rate must be between 0% and 28%');
      return;
    }

    updateSystemSettings({
      commissionRate: rate,
      gstPercent: gst,
      payoutCycleDays: cycle
    });

    toast.success('Core financial variables updated and logged.');
  };

  const handleToggleFeature = (key: keyof typeof features) => {
    const nextFeatures = {
      ...features,
      [key]: !features[key]
    };
    setFeatures(nextFeatures);
    updateSystemSettings({ featureFlags: nextFeatures });
    toast.success(`Feature Flag "${key}" updated.`);
  };

  const handleAddDestination = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDestName || !newDestState) {
      toast.error('Name and State are required');
      return;
    }

    const newDest = {
      id: `dest-${Date.now()}`,
      name: newDestName,
      state: newDestState,
      isPopular: false,
      packageCount: 0,
      imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=400&q=80'
    };

    const nextList = [...destList, newDest];
    setDestList(nextList);
    updateSystemSettings({ destinations: nextList });

    toast.success(`Destination "${newDestName}" added to catalog.`);
    setNewDestName('');
    setNewDestState('');
  };

  const handleTogglePopularDestination = (id: string) => {
    const nextList = destList.map(d => d.id === id ? { ...d, isPopular: !d.isPopular } : d);
    setDestList(nextList);
    updateSystemSettings({ destinations: nextList });
    toast.success('Destination catalog updated.');
  };

  const handleSaveLegal = () => {
    toast.success(`Legal Template "${legalDoc}" saved and published.`);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 select-none font-mono text-xs">
      
      {/* ==========================================
          LEFT: FINANCIALS, GENERAL CONFIGS & FLAGS
          ========================================== */}
      <div className="xl:col-span-8 space-y-6">
        
        {/* Core Financial parameters */}
        <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold flex items-center gap-2 text-white font-heading">
            <DollarSign size={18} className="text-cyan-400" /> Core Platform Billing
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase block">Platform Commission (%)</label>
              <input
                type="number"
                min={8}
                max={15}
                value={commRate}
                onChange={(e) => setCommRate(e.target.value)}
                className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 outline-none text-cyan-300 font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase block">GST Surcharge (%)</label>
              <input
                type="number"
                value={gstPercent}
                onChange={(e) => setGstPercent(e.target.value)}
                className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 outline-none text-yellow-500 font-bold"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 uppercase block">Payout Cycle Days</label>
              <select
                value={payoutCycle}
                onChange={(e) => setPayoutCycle(e.target.value)}
                className="w-full bg-gray-950 border border-gray-855 rounded-xl p-2.5 outline-none text-gray-200"
              >
                <option value="1">Instant (1 Day)</option>
                <option value="7">Weekly (7 Days)</option>
                <option value="15">Bi-Weekly (15 Days)</option>
                <option value="30">Monthly (30 Days)</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleSaveVariables}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl cursor-pointer"
          >
            Update Core billing Parameters
          </button>
        </div>

        {/* Feature flags toggles */}
        <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold flex items-center gap-2 text-white font-heading">
            <Flag size={18} className="text-cyan-400" /> Platform Feature Flags
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
            {[
              { key: 'aiItineraryGenerator', label: 'AI Itinerary planner generator' },
              { key: 'autoUtrVerification', label: 'Automated bank UTR scanner verification' },
              { key: 'directChatPlannerTraveler', label: 'Direct chat operator-traveler link' },
              { key: 'instantRefunds', label: 'Instant gateway automated refunds' }
            ].map((f) => (
              <label
                key={f.key}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-955/40 border border-gray-850 cursor-pointer hover:border-cyan-500/20 transition-all select-none"
              >
                <input
                  type="checkbox"
                  checked={features[f.key as keyof typeof features]}
                  onChange={() => handleToggleFeature(f.key as any)}
                  className="w-4.5 h-4.5 accent-cyan-500 cursor-pointer rounded"
                />
                <span>{f.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Destinations Catalog */}
        <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold flex items-center gap-2 text-white font-heading">
            <Compass size={18} className="text-cyan-400" /> Destinations Catalog
          </h3>

          {/* Add Form */}
          <form onSubmit={handleAddDestination} className="flex gap-2 items-end bg-gray-955/20 p-3 rounded-xl border border-gray-855/50">
            <div className="flex-1 space-y-1">
              <input
                type="text"
                placeholder="Destination Name..."
                value={newDestName}
                onChange={(e) => setNewDestName(e.target.value)}
                className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2 outline-none text-gray-200"
              />
            </div>
            <div className="flex-1 space-y-1">
              <input
                type="text"
                placeholder="State / Region..."
                value={newDestState}
                onChange={(e) => setNewDestState(e.target.value)}
                className="w-full bg-gray-950 border border-gray-855 rounded-xl p-2 outline-none text-gray-200"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl cursor-pointer"
            >
              Add Node
            </button>
          </form>

          {/* List catalog */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300 pt-2">
            {destList.map((dest) => (
              <div key={dest.id} className="flex items-center justify-between p-3.5 rounded-xl bg-gray-955/30 border border-gray-850">
                <div className="space-y-0.5">
                  <span className="font-bold text-gray-200">{dest.name}</span>
                  <span className="text-gray-500 block text-[10px]">{dest.state} ({dest.packageCount} active)</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleTogglePopularDestination(dest.id)}
                  className={`px-2.5 py-1 rounded font-bold text-[9px] cursor-pointer uppercase ${
                    dest.isPopular 
                      ? 'bg-yellow-950/40 text-yellow-400 border border-yellow-900/30' 
                      : 'bg-gray-950 border-gray-850 text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {dest.isPopular ? '★ Popular' : 'Make Popular'}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ==========================================
          RIGHT: LEGAL TEMPLATE EDITOR
          ========================================== */}
      <div className="xl:col-span-4 space-y-6">
        
        {/* System Diagnostics status override */}
        <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400 border-b border-gray-850 pb-3">
            Platform Mode status
          </h4>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-gray-955/30 border border-gray-850">
              <span className="text-gray-400">Maintenance Mode:</span>
              <button
                onClick={() => updateSystemSettings({ maintenanceMode: !settings.maintenanceMode })}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                  settings.maintenanceMode ? 'bg-cyan-500' : 'bg-gray-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-black transition-transform ${
                  settings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
            
            <div className="flex justify-between items-center p-2.5 rounded-xl bg-gray-955/30 border border-gray-850">
              <span className="text-gray-400">Lockdown Mode:</span>
              <button
                onClick={() => updateSystemSettings({ emergencyLockdown: !settings.emergencyLockdown })}
                className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer ${
                  settings.emergencyLockdown ? 'bg-red-500' : 'bg-gray-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-full bg-black transition-transform ${
                  settings.emergencyLockdown ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Legal templates editor */}
        <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-4 shadow-xl">
          <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400 flex items-center gap-1">
            <FileText size={14} className="text-cyan-400" /> Policy Document Editor
          </h4>

          <div className="space-y-3">
            <div className="flex bg-gray-955/80 p-1 rounded-xl border border-gray-855 select-none">
              {['PRIVACY', 'TERMS', 'FAQ'].map((doc) => (
                <button
                  type="button"
                  key={doc}
                  onClick={() => {
                    setLegalDoc(doc);
                    setLegalText(
                      doc === 'PRIVACY' 
                        ? 'BEACON COMPLIANCE AND SAFETY REGULATIONS POLICY.\n\nAll registered travel planners agree to maintain validated bank settlement ledgers, verified Aadhaar identification cards, and comply with state tourism licensing rules...'
                        : doc === 'TERMS'
                        ? 'PLATFORM OPERATOR TERMS OF USE CONTRACT.\n\nCommission splits are processed at 10% base value tier. All chargeback dispute arbitration logs are legally binding...'
                        : 'FREQUENTLY ASKED SYSTEM QUESTIONS MATRIX.\n\nQ: How is UTR duplicate fraud avoided?\nA: The fraud detection engine automatically hashes and validates razorpay payment transaction logs...'
                    );
                  }}
                  className={`flex-1 py-1 rounded-lg font-bold cursor-pointer text-[10px] ${
                    legalDoc === doc ? 'bg-cyan-500 text-black' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {doc}
                </button>
              ))}
            </div>

            <textarea
              value={legalText}
              onChange={(e) => setLegalText(e.target.value)}
              rows={6}
              className="w-full bg-gray-950 border border-gray-850 rounded-2xl p-3 text-xs outline-none text-gray-200 resize-none font-mono leading-relaxed"
            />

            <button
              onClick={handleSaveLegal}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold rounded-xl text-xs font-mono uppercase cursor-pointer"
            >
              Save & Publish Template
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
