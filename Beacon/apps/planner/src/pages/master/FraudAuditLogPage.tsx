import { useState } from 'react';
import { useMasterAdmin, type RiskAlert, type AuditLogEntry } from '@/data/masterAdminData';
import { 
  ShieldAlert, ShieldCheck, Search, AlertOctagon, Terminal, 
  Settings, Clock, Cpu, CornerUpRight, Lock, EyeOff, Ban
} from 'lucide-react';
import { toast } from 'sonner';

export default function FraudAuditLogPage() {
  const { auditLogs, riskAlerts, planners, suspendPlanner, freezePlannerPayouts, hidePlannerPackages } = useMasterAdmin();

  // Filters state
  const [logFilterModule, setLogFilterModule] = useState<string>('ALL');
  const [logSearchQuery, setLogSearchQuery] = useState('');

  // Selected Risk Alert state
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(
    riskAlerts[0]?.id || null
  );

  const activeAlert = riskAlerts.find(a => a.id === selectedAlertId);

  // Automated detection rules toggle simulation
  const [detectionRules, setDetectionRules] = useState({
    utrScan: true,
    plagiarismCheck: true,
    velocityCheck: true,
    gstVerify: true,
    sosTracking: true
  });

  const toggleRule = (rule: keyof typeof detectionRules, label: string) => {
    setDetectionRules(prev => ({ ...prev, [rule]: !prev[rule] }));
    toast.success(`Automated rule "${label}" updated.`);
  };

  // Filter logs helper
  const filteredLogs = auditLogs.filter(log => {
    if (logFilterModule !== 'ALL' && log.module !== logFilterModule) return false;
    if (!logSearchQuery) return true;
    const q = logSearchQuery.toLowerCase();
    return (
      log.action.toLowerCase().includes(q) ||
      log.actor.toLowerCase().includes(q) ||
      log.module.toLowerCase().includes(q)
    );
  });

  // Unique modules list helper
  const uniqueModules = ['ALL', ...Array.from(new Set(auditLogs.map(log => log.module)))];

  // Actions dispatcher from risk cards
  const handleFixAlert = (actionType: 'freeze' | 'suspend' | 'hide') => {
    if (!activeAlert) return;
    
    // Select corresponding planner ID if alert affects planner
    const plannerId = activeAlert.affectedEntityId;
    const isPlanner = planners.some(p => p.id === plannerId);

    if (!isPlanner) {
      toast.error('No associated Planner found for this alert action');
      return;
    }

    if (actionType === 'freeze') {
      freezePlannerPayouts(plannerId, true);
      toast.error(`Planner payouts frozen for ID: ${plannerId}`);
    } else if (actionType === 'suspend') {
      suspendPlanner(plannerId, true, `Suspended due to Fraud Engine flag: ${activeAlert.title}`);
      toast.error(`Planner suspended for ID: ${plannerId}`);
    } else if (actionType === 'hide') {
      hidePlannerPackages(plannerId, true);
      toast.error(`Planner packages hidden from index listings.`);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 select-none">
      
      {/* ==========================================
          LEFT: RISK SCORE & DETECTORS MATRIX
          ========================================== */}
      <div className="xl:col-span-8 space-y-6">
        
        {/* Real-time Risk Meters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Risk Level gauge */}
          <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400 border-b border-gray-850 pb-3">
              Platform Threat Rating
            </h4>
            <div className="flex items-center gap-6">
              {/* Score circle */}
              <div className="w-24 h-24 rounded-full border-[8px] border-red-500/20 border-t-red-500 flex flex-col justify-center items-center font-mono relative shrink-0">
                <span className="text-2xl font-black text-red-400">14%</span>
                <span className="text-[8px] text-gray-500 font-bold uppercase">Risk Score</span>
              </div>
              <div className="space-y-1.5 text-xs text-gray-400">
                <span className="text-[10px] text-green-400 font-bold font-mono flex items-center gap-1">
                  <ShieldCheck size={12} /> SECURE STATUS
                </span>
                <p className="text-[11px] leading-relaxed font-mono">
                  Real-time transactional audit score matches the standard safety parameters. Operational threat rating is LOW.
                </p>
              </div>
            </div>
          </div>

          {/* Automated Rule Engines */}
          <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400 border-b border-gray-850 pb-3">
              Automated Detection Rules
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-gray-300">
              {[
                { key: 'utrScan', label: 'UTR Duplicate scan' },
                { key: 'plagiarismCheck', label: 'Plagiarism Checker' },
                { key: 'velocityCheck', label: 'Booking Velocity spike' },
                { key: 'gstVerify', label: 'GST registry validation' }
              ].map((rule) => (
                <label
                  key={rule.key}
                  className="flex items-center gap-2 p-2 rounded-xl bg-gray-950/40 border border-gray-850 cursor-pointer hover:border-cyan-500/20 transition-all select-none"
                >
                  <input
                    type="checkbox"
                    checked={detectionRules[rule.key as keyof typeof detectionRules]}
                    onChange={() => toggleRule(rule.key as any, rule.label)}
                    className="w-4.5 h-4.5 accent-cyan-500 cursor-pointer rounded"
                  />
                  <span>{rule.label}</span>
                </label>
              ))}
            </div>
          </div>

        </div>

        {/* Immutable Audit Logs Table */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-gray-400">
              Immutable Platform Security Audit logs
            </h3>
            
            <div className="flex gap-2">
              <select
                value={logFilterModule}
                onChange={(e) => setLogFilterModule(e.target.value)}
                className="bg-gray-950 border border-gray-850 rounded-xl px-2.5 py-1.5 text-xs text-gray-200 outline-none font-mono"
              >
                {uniqueModules.map(mod => (
                  <option key={mod} value={mod}>{mod}</option>
                ))}
              </select>
              <input
                type="text"
                value={logSearchQuery}
                onChange={(e) => setLogSearchQuery(e.target.value)}
                placeholder="Find log actions..."
                className="bg-gray-900 border border-gray-850 pl-3 pr-4 py-1.5 rounded-xl text-xs outline-none text-gray-200 font-mono focus:border-cyan-500/30"
              />
            </div>
          </div>

          <div className="border border-gray-855 bg-gray-900/40 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[11px] font-mono">
                <thead>
                  <tr className="border-b border-gray-850 bg-gray-955/40 text-gray-400">
                    <th className="p-4">Timestamp</th>
                    <th className="p-4">Agent Identity</th>
                    <th className="p-4">Module</th>
                    <th className="p-4">Executed Action</th>
                    <th className="p-4">Client IP / Device</th>
                    <th className="p-4">Previous</th>
                    <th className="p-4">Updated</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-855 text-gray-305">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-855/10">
                      <td className="p-4 text-gray-550 leading-tight">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="p-4 font-bold text-gray-200">
                        {log.actor} <span className="text-[9px] text-cyan-400">({log.role})</span>
                      </td>
                      <td className="p-4 text-gray-400">{log.module}</td>
                      <td className="p-4 text-gray-300 max-w-[200px] truncate" title={log.action}>
                        {log.action}
                      </td>
                      <td className="p-4 text-gray-500 leading-tight">
                        <div>{log.ipAddress}</div>
                        <div className="text-[9px]">{log.device}</div>
                      </td>
                      <td className="p-4 text-red-400 truncate max-w-[100px]" title={log.beforeValue}>{log.beforeValue || '—'}</td>
                      <td className="p-4 text-green-400 truncate max-w-[100px]" title={log.afterValue}>{log.afterValue || '—'}</td>
                    </tr>
                  ))}

                  {filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-gray-600 font-mono text-xs border border-dashed border-gray-855 rounded-3xl">
                        No audit files logged matching search parameters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* ==========================================
          RIGHT: DISPATCH COUNTER-MEASURES CABINET
          ========================================== */}
      <div className="xl:col-span-4 space-y-6">
        
        {/* Risk Alerts diagnostics list */}
        <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-4 shadow-xl">
          <div className="flex justify-between items-center border-b border-gray-850 pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-gray-400 flex items-center gap-1">
              <ShieldAlert className="text-red-400 animate-pulse" size={16} /> Real-time Alert Desk
            </h4>
            <span className="text-[10px] font-mono text-gray-500">{riskAlerts.length} Flagged</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {riskAlerts.map((alert) => {
              const isSelected = alert.id === selectedAlertId;
              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlertId(alert.id)}
                  className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-950/20 to-red-900/5 border-red-500/30 text-red-400 font-bold'
                      : 'bg-gray-950/30 border-gray-855 text-gray-400 hover:border-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 font-mono">
                    <span className="font-bold text-[10px] uppercase">{alert.type.replace('_', ' ')}</span>
                    <span className="text-[9px] text-red-400">{alert.score}% threat</span>
                  </div>
                  <h5 className="text-gray-300 font-semibold truncate leading-snug">{alert.title}</h5>
                </div>
              );
            })}
          </div>
        </div>

        {/* Counter Measures active board */}
        {activeAlert ? (
          <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-5">
            <div className="border-b border-gray-850 pb-4 space-y-1">
              <span className="text-[10px] text-cyan-400 font-mono font-bold">DISPATCH OVERRIDES</span>
              <h3 className="text-sm font-black text-white">{activeAlert.title}</h3>
              <p className="text-xs text-gray-500 font-mono">Target: {activeAlert.affectedEntity}</p>
            </div>

            <div className="border border-gray-855 bg-gray-955/40 p-4 rounded-2xl text-xs font-mono text-gray-400 leading-normal">
              <span className="text-cyan-300 font-bold block mb-1">Threat description:</span>
              {activeAlert.description}
            </div>

            {/* Quick action triggers */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Terminal size={14} className="text-cyan-400 animate-pulse" /> Counter-Measure Recommendations
              </h4>

              <div className="space-y-2 text-xs font-mono">
                <button
                  onClick={() => handleFixAlert('freeze')}
                  className="w-full py-2.5 rounded-xl bg-gray-950 hover:bg-gray-850 text-yellow-500 border border-yellow-905/30 font-bold cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Lock size={13} /> Freeze Operator Settlements
                </button>
                <button
                  onClick={() => handleFixAlert('suspend')}
                  className="w-full py-2.5 rounded-xl bg-red-950/20 text-red-500 border border-red-900/30 hover:bg-red-955/45 font-bold cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Ban size={13} /> Suspend Operator Profile
                </button>
                <button
                  onClick={() => handleFixAlert('hide')}
                  className="w-full py-2.5 rounded-xl bg-gray-950 hover:bg-gray-850 text-gray-300 border border-gray-800 font-bold cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <EyeOff size={13} /> Hide Active Packages
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="border border-dashed border-gray-855 rounded-3xl p-12 text-center text-gray-500 font-mono text-xs">
            Select a threat alert from the list.
          </div>
        )}

      </div>

    </div>
  );
}
