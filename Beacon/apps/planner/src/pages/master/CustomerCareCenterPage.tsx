import { useState, useEffect } from 'react';
import { useMasterAdmin, type SupportTicket } from '@/data/masterAdminData';
import { 
  Headphones, Search, Star, Clock, AlertTriangle, ShieldCheck, 
  User, Send, CornerUpRight, Lock, Scale, MessageSquare, ChevronRight, XSquare
} from 'lucide-react';
import { toast } from 'sonner';

export default function CustomerCareCenterPage() {
  const { tickets, replyToTicket, updateTicketStatus, suspendPlanner, addCustomAuditLog } = useMasterAdmin();

  // Search & Filter states
  const [activeFilter, setActiveFilter] = useState<SupportTicket['status'] | 'ALL'>('OPEN');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected ticket state
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(
    tickets.find(t => t.status === 'ESCALATED')?.id || tickets[0]?.id || null
  );

  const activeTicket = tickets.find(t => t.id === selectedTicketId);

  // local simulation states
  const [chatInput, setChatInput] = useState('');
  const [assignedAgent, setAssignedAgent] = useState('');
  const [slaTimers, setSlaTimers] = useState<Record<string, number>>({});

  // Initialize SLA timers
  useEffect(() => {
    const timers: Record<string, number> = {};
    tickets.forEach(t => {
      timers[t.id] = t.slaSecondsLeft;
    });
    setSlaTimers(timers);

    // Countdown interval
    const interval = setInterval(() => {
      setSlaTimers(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(id => {
          next[id] = Math.max(0, next[id] - 1);
        });
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tickets]);

  // Filter tickets helper
  const filteredTickets = tickets.filter(t => {
    if (searchQuery && !t.id.toLowerCase().includes(searchQuery.toLowerCase()) && !t.subject.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (activeFilter === 'ALL') return true;
    return t.status === activeFilter;
  });

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !chatInput.trim()) return;

    replyToTicket(activeTicket.id, chatInput.trim());
    toast.success('Reply logged inside ticket dialogue.');
    setChatInput('');
  };

  const handleEscalate = (priority: SupportTicket['priority']) => {
    if (!activeTicket) return;
    updateTicketStatus(activeTicket.id, 'ESCALATED', priority);
    toast.warning(`Ticket priority escalated to: ${priority}`);
  };

  const handleResolveTicket = () => {
    if (!activeTicket) return;
    updateTicketStatus(activeTicket.id, 'RESOLVED');
    toast.success('Ticket marked as resolved.');
  };

  const handleAssignAgent = () => {
    if (!assignedAgent) {
      toast.error('Select support agent');
      return;
    }
    addCustomAuditLog(`Reassigned ticket ${activeTicket?.id} ownership to ${assignedAgent}`, 'Customer Care');
    toast.success(`Ticket ownership re-assigned to agent: ${assignedAgent}`);
    setAssignedAgent('');
  };

  const handleFreezePlanner = () => {
    if (!activeTicket || !activeTicket.plannerId) {
      toast.error('No associated planner is mapped to this ticket');
      return;
    }
    suspendPlanner(activeTicket.plannerId, true, `Suspended during support ticket investigation: ${activeTicket.id}`);
    toast.error('Operator suspended pending compliance checks.');
  };

  // Helper to format countdown timer seconds
  const formatSla = (seconds: number) => {
    if (seconds <= 0) return 'EXPIRED';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? hrs + 'h ' : ''}${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-6 select-none">
      
      {/* Upper Analytics cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Customer Satisfaction', value: '4.85 / 5', sub: 'Based on 420 reviews', color: 'text-yellow-400' },
          { label: 'Avg Initial Response', value: '4m 12s', sub: '92% within SLA SLA threshold', color: 'text-cyan-400' },
          { label: 'Median Resolution', value: '1.5 Hours', sub: 'Operational SLA target: 4h', color: 'text-green-400' },
          { label: 'SLA Compliance Rate', value: '97.4%', sub: 'Target target parameter: 95%', color: 'text-blue-400' }
        ].map((stat, idx) => (
          <div key={idx} className="border border-gray-855 bg-gray-900/40 p-4 rounded-2xl shadow-lg">
            <span className="text-[10px] text-gray-500 font-medium font-bold uppercase tracking-wider block mb-1">
              {stat.label}
            </span>
            <span className={`text-xl font-bold font-medium ${stat.color}`}>{stat.value}</span>
            <span className="text-[9px] text-gray-600 block mt-0.5 font-medium">{stat.sub}</span>
          </div>
        ))}
      </div>

      {/* Main Workspace split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Column: Tickets Queue */}
        <div className="xl:col-span-4 space-y-4">
          
          <div className="flex bg-gray-950/60 p-1 rounded-xl text-[10px] font-medium border border-gray-855 select-none">
            {['OPEN', 'IN_PROGRESS', 'ESCALATED', 'RESOLVED', 'ALL'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f as any)}
                className={`flex-1 py-1.5 rounded-lg font-bold cursor-pointer uppercase ${
                  activeFilter === f 
                    ? 'bg-cyan-500 text-black' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {f.split('_')[0]}
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
              placeholder="Search Subject or Ticket ID..."
              className="w-full bg-gray-900 border border-gray-850 pl-9 pr-4 py-2 rounded-xl text-xs outline-none text-gray-200 font-medium focus:border-cyan-500/30"
            />
          </div>

          {/* List */}
          <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
            {filteredTickets.map((t) => {
              const isSelected = t.id === selectedTicketId;
              const slaLeft = slaTimers[t.id] ?? t.slaSecondsLeft;
              const isExpired = slaLeft <= 0;

              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/40 to-cyan-900/10 border-cyan-500/30 glow-cyan-sm text-cyan-400 font-bold'
                      : 'bg-gray-900/40 border-gray-855 text-gray-400 hover:border-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium font-bold text-gray-450">{t.id}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-medium ${
                      t.priority === 'CRITICAL' 
                        ? 'bg-red-950 text-red-500 animate-pulse'
                        : t.priority === 'HIGH'
                        ? 'bg-amber-955/40 text-amber-500'
                        : 'bg-gray-850 text-gray-400'
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                  <h4 className="text-gray-250 truncate pr-6 font-semibold mb-2">{t.subject}</h4>
                  
                  <div className="flex justify-between items-center text-[10px] font-medium text-gray-500 border-t border-gray-850/40 pt-2">
                    <span>By: {t.customerName || t.plannerName}</span>
                    <span className={isExpired ? 'text-red-400 font-bold' : 'text-gray-400'}>
                      SLA: {formatSla(slaLeft)}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredTickets.length === 0 && (
              <div className="text-center py-16 text-gray-600 font-medium text-xs border border-dashed border-gray-855 rounded-3xl">
                No active tickets under this index.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Unified detail chat workspace */}
        <div className="xl:col-span-8">
          {activeTicket ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Message transcript */}
              <div className="lg:col-span-8 border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-850 pb-3">
                  <h3 className="text-sm font-bold truncate max-w-[280px]">{activeTicket.subject}</h3>
                  <span className="text-xs text-cyan-400 font-medium">{activeTicket.status}</span>
                </div>

                {/* Dialog thread */}
                <div className="space-y-3.5 h-[280px] overflow-y-auto pr-1">
                  {activeTicket.messages.map((msg, idx) => {
                    const isSelf = msg.sender === 'ADMIN';
                    const isPlanner = msg.sender === 'PLANNER';

                    return (
                      <div
                        key={idx}
                        className={`flex flex-col max-w-[80%] ${
                          isSelf ? 'ml-auto items-end' : 'mr-auto items-start'
                        }`}
                      >
                        <span className="text-[9px] font-medium text-gray-550 mb-0.5">
                          {msg.senderName} ({new Date(msg.timestamp).toLocaleTimeString()})
                        </span>
                        <div
                          className={`p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                            isSelf
                              ? 'bg-cyan-500 text-black font-bold rounded-tr-none'
                              : isPlanner
                              ? 'bg-yellow-950/40 text-yellow-500 border border-yellow-900/30 rounded-tl-none'
                              : 'bg-gray-950/80 text-gray-300 border border-gray-855 rounded-tl-none'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Chat input form */}
                <form onSubmit={handleSendChat} className="flex gap-2 border-t border-gray-850 pt-4">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type official support response to dispatch..."
                    className="flex-1 bg-gray-950 border border-gray-850 rounded-xl px-4 py-2.5 text-xs outline-none text-gray-200 font-medium"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl text-xs flex items-center justify-center cursor-pointer"
                  >
                    <Send size={14} />
                  </button>
                </form>
              </div>

              {/* Action Cabinet */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Details list */}
                <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-3">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium">
                    Audit dossier links
                  </h4>
                  <div className="space-y-2 text-xs font-medium text-gray-400">
                    <div className="flex justify-between">
                      <span>Traveler:</span>
                      <span className="text-gray-200 font-bold">{activeTicket.customerName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Operator:</span>
                      <span className="text-gray-200">{activeTicket.plannerName || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assigned Agent:</span>
                      <span className="text-cyan-400">{activeTicket.assignedExecutive || 'Unassigned'}</span>
                    </div>
                  </div>
                </div>

                {/* Escalate block */}
                <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-3">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium flex items-center gap-1">
                    <AlertTriangle size={13} className="text-red-400" /> Escalate Ticket Level
                  </h4>
                  <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
                    <button
                      onClick={() => handleEscalate('CRITICAL')}
                      className="py-2 bg-red-950/20 text-red-500 border border-red-900/30 hover:bg-red-950/40 font-bold rounded-xl cursor-pointer"
                    >
                      CRITICAL
                    </button>
                    <button
                      onClick={() => handleEscalate('HIGH')}
                      className="py-2 bg-amber-955/20 text-amber-500 border border-amber-900/30 hover:bg-amber-955/40 font-bold rounded-xl cursor-pointer"
                    >
                      HIGH
                    </button>
                    <button
                      onClick={handleResolveTicket}
                      className="w-full col-span-2 py-2.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl cursor-pointer text-center"
                    >
                      Resolve & Close Ticket
                    </button>
                  </div>
                </div>

                {/* Transfer Agent */}
                <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-3">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-medium flex items-center gap-1">
                    <CornerUpRight size={13} className="text-cyan-400" /> Transfer Executive Ownership
                  </h4>
                  <div className="flex gap-2">
                    <select
                      value={assignedAgent}
                      onChange={(e) => setAssignedAgent(e.target.value)}
                      className="flex-1 bg-gray-950 border border-gray-850 rounded-xl px-2 py-1.5 text-xs text-gray-200 outline-none font-medium"
                    >
                      <option value="">Select Agent</option>
                      <option value="Neha Mehta">Neha Mehta</option>
                      <option value="Vikram Malhotra">Vikram Malhotra</option>
                      <option value="Aditya Sen">Aditya Sen</option>
                    </select>
                    <button
                      onClick={handleAssignAgent}
                      className="px-3 py-1.5 bg-gray-850 hover:bg-gray-800 border border-gray-800 text-gray-300 font-bold rounded-xl text-xs cursor-pointer font-medium"
                    >
                      Assign
                    </button>
                  </div>
                </div>

                {/* Freeze Operator */}
                {activeTicket.plannerId && (
                  <button
                    onClick={handleFreezePlanner}
                    className="w-full py-3 rounded-2xl bg-red-950/20 text-red-500 border border-red-900/30 font-bold text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer hover:bg-red-950/40"
                  >
                    <Lock size={14} />
                    Freeze Associated Planner
                  </button>
                )}

              </div>

            </div>
          ) : (
            <div className="border border-dashed border-gray-855 rounded-3xl p-24 text-center text-gray-500 font-medium text-xs">
              Select a ticket from the queue on the left.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
