import { useState } from 'react';
import { useMasterAdmin, type FinancialTransaction } from '@/data/masterAdminData';
import { 
  Wallet, Landmark, AlertTriangle, ShieldCheck, ShieldAlert, DollarSign,
  Download, ArrowUpRight, ArrowDownRight, RefreshCw, Calculator, Percent
} from 'lucide-react';
import { toast } from 'sonner';

export default function PaymentCenterPage() {
  const { ledger, planners, verifyUtr, settlePayout } = useMasterAdmin();

  // Selected Tx state
  const [selectedTxId, setSelectedTxId] = useState<string | null>(
    ledger.find(tx => tx.duplicateUtrFound)?.id || ledger[0]?.id || null
  );

  const activeTx = ledger.find(tx => tx.id === selectedTxId);

  // Commission Calculator states
  const [calcBase, setCalcBase] = useState('50000');
  const [calcRate, setCalcRate] = useState('10');

  // Settlement payout states
  const [selectedPlannerId, setSelectedPlannerId] = useState('');
  const [settlementAmount, setSettlementAmount] = useState('');

  // Calculations for calculator
  const baseAmt = parseFloat(calcBase) || 0;
  const ratePct = parseFloat(calcRate) || 0;
  const commEarned = Math.round(baseAmt * (ratePct / 100));
  const netSettle = baseAmt - commEarned;

  const handleVerifyUtrAction = (verified: boolean) => {
    if (!activeTx) return;
    verifyUtr(activeTx.bookingId, verified);
    toast.success(`UTR validation status set to: ${verified ? 'PAID' : 'FAILED'}`);
  };

  const handleSettlePayout = () => {
    if (!selectedPlannerId) {
      toast.error('Please select planner to settle');
      return;
    }
    const amt = parseFloat(settlementAmount);
    if (isNaN(amt) || amt <= 0) {
      toast.error('Enter a valid payout amount');
      return;
    }
    settlePayout(selectedPlannerId, amt);
    toast.success(`Settlement payout transaction initiated.`);
    setSelectedPlannerId('');
    setSettlementAmount('');
  };

  const handleDownloadLedger = () => {
    toast.info('Assembling spreadsheet ledger data...');
    setTimeout(() => {
      toast.success('Spreadsheet ledger LEDGER-2026.csv downloaded.');
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 select-none">
      
      {/* ==========================================
          LEFT: FINANCIAL LEDGER & CALCS
          ========================================== */}
      <div className="xl:col-span-8 space-y-6">
        
        {/* Commission Calculator Panel */}
        <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-850 pb-3">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <Calculator size={18} className="text-cyan-400" /> Platform Commission Calculator
            </h3>
            <span className="text-[10px] font-medium text-gray-500">
              Active Tier: 8% - 15% range
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Inputs */}
            <div className="md:col-span-6 grid grid-cols-2 gap-2 text-xs font-medium">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase block">Booking Base (INR)</label>
                <input
                  type="number"
                  value={calcBase}
                  onChange={(e) => setCalcBase(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 outline-none text-cyan-300 font-bold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 uppercase block">Commission Rate (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    min={8}
                    max={15}
                    value={calcRate}
                    onChange={(e) => setCalcRate(e.target.value)}
                    className="w-full bg-gray-950 border border-gray-855 rounded-xl p-2.5 pr-8 outline-none text-yellow-500 font-bold"
                  />
                  <Percent size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            </div>

            {/* Diagnostic results */}
            <div className="md:col-span-6 bg-gray-955/50 border border-gray-855 p-4 rounded-2xl grid grid-cols-3 gap-2 text-center text-xs font-medium text-gray-400">
              <div>
                <span className="text-[9px] text-gray-500 block">GROSS AMOUNT</span>
                <span className="font-bold text-gray-200">₹{baseAmt.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-500 block">COMMISSION</span>
                <span className="font-bold text-yellow-500">₹{commEarned.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-500 block">NET SETTLE</span>
                <span className="font-bold text-cyan-300">₹{netSettle.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ledger Transactions list */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-wider font-medium text-gray-400">
              Financial ledger audit stream
            </h3>
            <button
              onClick={handleDownloadLedger}
              className="px-3.5 py-1.5 bg-gray-850 hover:bg-gray-800 border border-gray-800 text-gray-300 font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer font-medium"
            >
              <Download size={14} /> Export CSV Ledger
            </button>
          </div>

          <div className="border border-gray-855 bg-gray-900/40 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-medium">
                <thead>
                  <tr className="border-b border-gray-850 bg-gray-955/40 text-gray-400">
                    <th className="p-4">Tx ID</th>
                    <th className="p-4">Booking ID</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">UTR Number</th>
                    <th className="p-4">Operator Agency</th>
                    <th className="p-4">Commission</th>
                    <th className="p-4 text-center">Amount</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-855">
                  {ledger.map((tx) => {
                    const isSelected = tx.id === selectedTxId;
                    return (
                      <tr
                        key={tx.id}
                        onClick={() => setSelectedTxId(tx.id)}
                        className={`cursor-pointer hover:bg-gray-855/20 text-gray-305 transition-colors ${
                          isSelected ? 'bg-cyan-950/20 text-cyan-400 font-bold border-l-2 border-cyan-500' : ''
                        }`}
                      >
                        <td className="p-4 font-bold">{tx.id}</td>
                        <td className="p-4 text-gray-500">{tx.bookingId}</td>
                        <td className="p-4">
                          <span className={`flex items-center gap-1 text-[11px] ${
                            tx.type === 'INBOUND' ? 'text-green-400' : tx.type === 'REFUND' ? 'text-blue-400' : 'text-yellow-500'
                          }`}>
                            {tx.type === 'INBOUND' ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                            {tx.type.split('_')[0]}
                          </span>
                        </td>
                        <td className="p-4 select-all text-gray-400 text-[11px]">{tx.utrNumber}</td>
                        <td className="p-4">{tx.plannerName || 'N/A'}</td>
                        <td className="p-4 text-yellow-500">{tx.commissionPercent}%</td>
                        <td className="p-4 text-right font-bold text-cyan-300">₹{tx.amount.toLocaleString()}</td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                            tx.status === 'COMPLETED'
                              ? 'bg-green-950 text-green-400'
                              : tx.status === 'FROZEN'
                              ? 'bg-red-950 text-red-500 animate-pulse'
                              : 'bg-yellow-950 text-yellow-400'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* ==========================================
          RIGHT: UTR VERIFICATION & SETTLEMENT PANEL
          ========================================== */}
      <div className="xl:col-span-4 space-y-6">
        
        {/* Verification of active transaction */}
        {activeTx ? (
          <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-5">
            <div className="border-b border-gray-850 pb-4 space-y-1">
              <span className="text-[10px] text-cyan-400 font-medium font-bold">UTR VERIFICATION DESK</span>
              <h3 className="text-md font-black text-white">UTR: {activeTx.utrNumber}</h3>
              <p className="text-xs text-gray-500 font-medium">Tx ID: {activeTx.id}</p>
            </div>

            {/* Duplicate UTR security alert box */}
            {activeTx.duplicateUtrFound && (
              <div className="border border-red-900/30 bg-red-950/15 p-4 rounded-2xl flex items-start gap-2.5 text-xs text-red-400 animate-pulse">
                <AlertTriangle className="shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="font-bold block uppercase tracking-wider text-[10px]">Duplicate UTR Detected</span>
                  <p className="text-[11px] leading-relaxed text-red-300">
                    This UTR code has been submitted across multiple bookings. Payout settlements frozen pending manual verification.
                  </p>
                </div>
              </div>
            )}

            <div className="border border-gray-855 bg-gray-955/40 p-4 rounded-2xl space-y-2.5 text-xs font-medium text-gray-400">
              <div className="flex justify-between">
                <span>Associated Booking:</span>
                <span className="text-gray-200">{activeTx.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span>Gross Amount:</span>
                <span className="text-cyan-300">₹{activeTx.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Commission Earned:</span>
                <span className="text-yellow-500">₹{activeTx.commissionEarned.toLocaleString()} ({activeTx.commissionPercent}%)</span>
              </div>
              <div className="flex justify-between">
                <span>Operator:</span>
                <span className="text-gray-200">{activeTx.plannerName}</span>
              </div>
            </div>

            {/* Actions for UTR verify */}
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <button
                onClick={() => handleVerifyUtrAction(true)}
                className="py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ShieldCheck size={14} /> Verify UTR
              </button>
              <button
                onClick={() => handleVerifyUtrAction(false)}
                className="py-2.5 rounded-xl bg-red-950/20 text-red-500 border border-red-900/30 font-bold cursor-pointer flex items-center justify-center gap-1.5 hover:bg-red-950/40"
              >
                <ShieldAlert size={14} /> Flag Failed
              </button>
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-gray-855 rounded-3xl p-12 text-center text-gray-500 font-medium text-xs">
            Select a ledger transaction to audit.
          </div>
        )}

        {/* Schedule Settlements overrides */}
        <div className="border border-gray-855 bg-gray-900/40 rounded-3xl p-5 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider font-medium text-gray-400 flex items-center gap-1">
            <Landmark size={14} className="text-cyan-400" /> Dispatch Settlement Payouts
          </h4>
          <div className="space-y-3">
            <select
              value={selectedPlannerId}
              onChange={(e) => setSelectedPlannerId(e.target.value)}
              className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2.5 text-xs text-gray-200 outline-none font-medium"
            >
              <option value="">Select Planner Agency</option>
              {planners.map(p => (
                <option key={p.id} value={p.id}>{p.agencyName} (Rev: ₹{p.revenue.toLocaleString()})</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Settlement amount (INR)"
              value={settlementAmount}
              onChange={(e) => setSettlementAmount(e.target.value)}
              className="w-full bg-gray-950 border border-gray-850 rounded-xl p-2 text-xs outline-none text-gray-200 font-medium"
            />
            <button
              onClick={handleSettlePayout}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold rounded-xl text-xs font-medium uppercase cursor-pointer"
            >
              Dispatch Settlement Payout
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
