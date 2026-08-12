import { useState } from 'react';
import { useMasterAdmin, type MarketingCampaign } from '@/data/masterAdminData';
import { 
  Megaphone, Search, Plus, Mail, Bell, MessageSquare, Globe,
  TrendingUp, BarChart3, Users, Percent, CheckCircle2, ChevronRight, XSquare
} from 'lucide-react';
import { toast } from 'sonner';

export default function MarketingAnnouncementsPage() {
  const { campaigns, createCampaign } = useMasterAdmin();

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Campaign Details
  const [selectedCampId, setSelectedCampId] = useState<string | null>(
    campaigns[0]?.id || null
  );

  const activeCamp = campaigns.find(c => c.id === selectedCampId);

  // New Campaign Form local state
  const [newTitle, setNewTitle] = useState('');
  const [newSegment, setNewSegment] = useState('All Customers');
  const [newChannels, setNewChannels] = useState<string[]>(['PUSH']);
  const [newMessageText, setNewMessageText] = useState('');
  const [showCreatorModal, setShowCreatorModal] = useState(false);

  // Instant Alert local state
  const [instantAlertText, setInstantAlertText] = useState('');
  const [instantTarget, setInstantTarget] = useState('ALL');

  const handleToggleChannel = (ch: string) => {
    setNewChannels(prev => 
      prev.includes(ch) ? prev.filter(c => c !== ch) : [...prev, ch]
    );
  };

  const handleCreateCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) {
      toast.error('Campaign Title is required');
      return;
    }
    if (!newMessageText) {
      toast.error('Message content is required');
      return;
    }

    createCampaign({
      title: newTitle,
      targetSegment: newSegment,
      channels: newChannels as any,
      status: 'ACTIVE'
    });

    toast.success(`Marketing campaign "${newTitle}" scheduled and activated.`);
    setNewTitle('');
    setNewMessageText('');
    setShowCreatorModal(false);
  };

  const handleSendInstantAlert = () => {
    if (!instantAlertText) {
      toast.error('Alert content is required');
      return;
    }
    toast.success(`Broadcast message sent to segment: ${instantTarget}`);
    setInstantAlertText('');
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 select-none">
      
      {/* ==========================================
          LEFT: CAMPAIGN INDEX & SEARCH
          ========================================== */}
      <div className="xl:col-span-8 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <Search size={14} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search campaigns..."
              className="w-full bg-gray-900 border border-gray-850 pl-9 pr-4 py-2 rounded-xl text-xs outline-none text-gray-200 font-medium focus:border-cyan-500/30"
            />
          </div>
          
          <button
            onClick={() => setShowCreatorModal(true)}
            className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-xs cursor-pointer flex items-center gap-1.5 font-medium shrink-0"
          >
            <Plus size={14} /> Create Campaign
          </button>
        </div>

        {/* Campaigns Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns
            .filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((camp) => {
              const isSelected = camp.id === selectedCampId;
              return (
                <div
                  key={camp.id}
                  onClick={() => setSelectedCampId(camp.id)}
                  className={`p-5 rounded-3xl border text-xs transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/40 to-cyan-900/10 border-cyan-500/30 glow-cyan-sm text-cyan-400 font-bold'
                      : 'bg-gray-900/40 border-gray-855 text-gray-400 hover:border-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 font-medium text-[9px] text-gray-500">
                    <span>ID: {camp.id}</span>
                    <span>•</span>
                    <span className="text-cyan-400">{camp.status}</span>
                  </div>

                  <h4 className="text-sm font-bold text-gray-200 truncate mb-1">{camp.title}</h4>
                  <p className="text-[10px] text-gray-500 font-medium mb-4">Segment: {camp.targetSegment}</p>

                  {/* Icon channels */}
                  <div className="flex gap-2 text-gray-600">
                    {camp.channels.includes('EMAIL') && <Mail size={13} />}
                    {camp.channels.includes('PUSH') && <Bell size={13} />}
                    {camp.channels.includes('WHATSAPP') && <MessageSquare size={13} />}
                    {camp.channels.includes('BANNER') && <Globe size={13} />}
                  </div>
                </div>
              );
            })}
        </div>

      </div>

      {/* ==========================================
          RIGHT: PERFORMANCE ANALYTICS & INSTANT ALERT
          ========================================== */}
      <div className="xl:col-span-4 space-y-6">
        
        {/* Campaign Analytics */}
        {activeCamp ? (
          <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-5">
            <div className="border-b border-gray-850 pb-4 space-y-1">
              <span className="text-[10px] text-cyan-400 font-medium font-bold">PERFORMANCE STATS</span>
              <h3 className="text-md font-black text-white leading-snug">{activeCamp.title}</h3>
              <p className="text-xs text-gray-500 font-medium">Target: {activeCamp.targetSegment}</p>
            </div>

            {/* Metrics layout grid */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-gray-950/40 p-3 rounded-2xl border border-gray-850 text-xs font-medium">
                <span className="text-[9px] text-gray-500 block mb-0.5 uppercase">Delivery Rate</span>
                <span className="font-bold text-cyan-300 flex items-center justify-center gap-0.5">
                  <CheckCircle2 size={12} /> {activeCamp.metrics.deliveryRate}%
                </span>
              </div>
              <div className="bg-gray-950/40 p-3 rounded-2xl border border-gray-850 text-xs font-medium">
                <span className="text-[9px] text-gray-500 block mb-0.5 uppercase">Open Rate</span>
                <span className="font-bold text-yellow-500 flex items-center justify-center gap-0.5">
                  <TrendingUp size={12} /> {activeCamp.metrics.openRate}%
                </span>
              </div>
              <div className="bg-gray-950/40 p-3 rounded-2xl border border-gray-850 text-xs font-medium">
                <span className="text-[9px] text-gray-500 block mb-0.5 uppercase">Click Rate</span>
                <span className="font-bold text-green-400 flex items-center justify-center gap-0.5">
                  <Percent size={12} /> {activeCamp.metrics.clickRate}%
                </span>
              </div>
              <div className="bg-gray-950/40 p-3 rounded-2xl border border-gray-850 text-xs font-medium">
                <span className="text-[9px] text-gray-500 block mb-0.5 uppercase">Conversions</span>
                <span className="font-bold text-purple-400 flex items-center justify-center gap-0.5">
                  <Users size={12} /> {activeCamp.metrics.conversions}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
              <BarChart3 size={12} className="text-cyan-400 animate-pulse" />
              <span>Diagnostic tracking online for this campaign node.</span>
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-gray-855 rounded-3xl p-12 text-center text-gray-500 font-medium text-xs">
            Select a campaign to check performance statistics.
          </div>
        )}

        {/* Instant Notification Dispatcher */}
        <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-4 shadow-xl">
          <h4 className="text-xs font-bold uppercase tracking-wider font-medium text-gray-400 flex items-center gap-1.5">
            <Megaphone size={14} className="text-cyan-400 animate-pulse" /> Instant Broadcast Banner
          </h4>

          <div className="space-y-3">
            <select
              value={instantTarget}
              onChange={(e) => setInstantTarget(e.target.value)}
              className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 text-xs text-gray-200 outline-none font-medium"
            >
              <option value="ALL">All Platform Users</option>
              <option value="TRAVELERS">All Travelers (Customers)</option>
              <option value="PLANNERS">All Operators (Planners)</option>
            </select>
            <textarea
              placeholder="Type instant broadcast message (e.g. system upgrades, emergency alerts)..."
              value={instantAlertText}
              onChange={(e) => setInstantAlertText(e.target.value)}
              rows={3}
              className="w-full bg-gray-950 border border-gray-850 rounded-2xl p-3 text-xs outline-none text-gray-200 resize-none font-medium"
            />
            <button
              onClick={handleSendInstantAlert}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold rounded-xl text-xs font-medium uppercase cursor-pointer"
            >
              Broadcast Alert
            </button>
          </div>
        </div>

      </div>

      {/* ==========================================
          MODAL: CAMPAIGN CREATION FORM
          ========================================== */}
      {showCreatorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="fixed inset-0" onClick={() => setShowCreatorModal(false)} />
          <form onSubmit={handleCreateCampaignSubmit} className="relative w-full max-w-lg bg-gray-900 border border-gray-800 rounded-3xl p-6 space-y-5 animate-[scaleUp_0.15s_ease-out]">
            
            <div className="flex items-center justify-between border-b border-gray-850 pb-3">
              <h3 className="text-sm font-bold font-heading text-white flex items-center gap-1.5">
                <Plus size={16} className="text-cyan-400" /> Construct Marketing Campaign
              </h3>
              <button
                type="button"
                onClick={() => setShowCreatorModal(false)}
                className="p-1 rounded-lg bg-gray-800 text-gray-400 hover:text-gray-200 cursor-pointer"
              >
                <XSquare size={16} />
              </button>
            </div>

            {/* Campaign inputs */}
            <div className="space-y-4 text-xs font-medium">
              <div className="space-y-1">
                <label className="text-gray-400">Campaign Title</label>
                <input
                  type="text"
                  placeholder="e.g. Monsoon Trekking Offer 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 outline-none text-gray-200"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-400">Target Segment</label>
                <select
                  value={newSegment}
                  onChange={(e) => setNewSegment(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-855 rounded-xl p-2.5 outline-none text-gray-200"
                >
                  <option value="All Customers">All Customers</option>
                  <option value="Verified Planners">Verified Planners Only</option>
                  <option value="High Earning Planners">High-Earning Operators</option>
                  <option value="High Value Travelers">High-Value Travelers</option>
                </select>
              </div>

              {/* Channel check items */}
              <div className="space-y-1.5">
                <label className="text-gray-400">Delivery Channels</label>
                <div className="flex gap-2">
                  {['PUSH', 'EMAIL', 'BANNER', 'WHATSAPP'].map((ch) => {
                    const selected = newChannels.includes(ch);
                    return (
                      <button
                        type="button"
                        key={ch}
                        onClick={() => handleToggleChannel(ch)}
                        className={`flex-1 py-2 rounded-xl font-bold border transition-colors cursor-pointer text-center text-[10px] ${
                          selected
                            ? 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400'
                            : 'bg-gray-950 border-gray-850 text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-gray-400">Message Content</label>
                <textarea
                  placeholder="Type promotional text or alert details..."
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  rows={4}
                  className="w-full bg-gray-950 border border-gray-850 rounded-2xl p-3 outline-none text-gray-200 resize-none font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold rounded-2xl text-xs uppercase font-medium cursor-pointer"
            >
              Construct & Dispatch Campaign
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
