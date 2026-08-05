import { useState } from 'react'
import {
  CreditCard,
  Search,
  Download,
  Calculator,
} from 'lucide-react'
import { useMasterAdmin } from '@/context/MasterAdminContext'
import { toast } from 'sonner'

export default function PaymentCenterPage() {
  const { payments, approvePayment, freezePayment } = useMasterAdmin()
  const [searchQuery, setSearchQuery] = useState('')
  const [calcAmount, setCalcAmount] = useState<number>(50000)
  const [calcCommPercent, setCalcCommPercent] = useState<number>(10)

  const filteredPayments = payments.filter((p) => {
    const q = searchQuery.toLowerCase()
    return (
      p.transactionId.toLowerCase().includes(q) ||
      p.utrNumber.toLowerCase().includes(q) ||
      p.customerName.toLowerCase().includes(q) ||
      p.plannerName.toLowerCase().includes(q) ||
      p.bookingCode.toLowerCase().includes(q)
    )
  })

  const calculatedComm = (calcAmount * calcCommPercent) / 100
  const calculatedSettlement = calcAmount - calculatedComm

  return (
    <div className="space-y-8 font-body">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan tracking-widest uppercase mb-1">
            <CreditCard className="w-4 h-4 text-cyan" />
            <span>Beacon Financial Operations</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            PAYMENT <span className="text-gradient">CENTER</span> & SETTLEMENTS
          </h1>
          <p className="text-xs text-cyan-200/70 font-mono mt-1">
            UTR verification engine, gateway transaction ledger, commission split calculator & fraud freezing
          </p>
        </div>
      </div>

      {/* FINANCIAL SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-dark p-4 rounded-xl border border-cyan/30 font-mono">
          <div className="text-xs text-cyan-300/70">Pending UTR Verification</div>
          <div className="text-2xl font-extrabold text-white mt-1">
            {payments.filter((p) => p.paymentStatus === 'pending_verification').length} Queue
          </div>
          <div className="text-[10px] text-amber-400 mt-1">Bank reconciliation active</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-cyan/30 font-mono">
          <div className="text-xs text-cyan-300/70">Platform Commission Split</div>
          <div className="text-2xl font-extrabold text-cyan mt-1">10.0% Avg Tier</div>
          <div className="text-[10px] text-emerald-400 mt-1">Auto-deducted at booking</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-red-500/30 bg-red-500/5 font-mono">
          <div className="text-xs text-red-300">Duplicate UTR Alerts</div>
          <div className="text-2xl font-extrabold text-red-400 mt-1">
            {payments.filter((p) => p.paymentStatus === 'duplicate_utr').length} Flags
          </div>
          <div className="text-[10px] text-red-400 mt-1">Auto-frozen payouts</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-cyan/30 font-mono">
          <div className="text-xs text-cyan-300/70">Planner Settlement Queue</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">₹7.92 Lakhs</div>
          <div className="text-[10px] text-emerald-400 mt-1">Scheduled for Friday payout</div>
        </div>
      </div>

      {/* INTERACTIVE COMMISSION CALCULATOR TOOL */}
      <section className="glass-dark p-5 rounded-2xl border border-cyan/30 font-mono space-y-3">
        <div className="flex items-center gap-2 text-xs text-cyan font-bold uppercase">
          <Calculator className="w-4 h-4 text-cyan" />
          <span>Live Commission & Settlement Calculator</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
          <div>
            <label className="block text-[11px] text-cyan-200/70 mb-1">Booking Amount (₹)</label>
            <input
              type="number"
              value={calcAmount}
              onChange={(e) => setCalcAmount(Number(e.target.value))}
              className="w-full bg-[#001736] border border-cyan/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan"
            />
          </div>

          <div>
            <label className="block text-[11px] text-cyan-200/70 mb-1">Commission Rate (%)</label>
            <select
              value={calcCommPercent}
              onChange={(e) => setCalcCommPercent(Number(e.target.value))}
              className="w-full bg-[#001736] border border-cyan/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan"
            >
              <option value={8}>8% (High Volume Tier)</option>
              <option value={10}>10% (Standard Tier)</option>
              <option value={12}>12% (Growth Tier)</option>
              <option value={15}>15% (Starter Tier)</option>
            </select>
          </div>

          <div className="p-2.5 rounded-xl bg-navy/60 border border-cyan/15">
            <span className="text-[10px] text-cyan-300/70">Beacon Platform Fee:</span>
            <div className="text-sm font-bold text-cyan">₹{calculatedComm.toLocaleString('en-IN')}</div>
          </div>

          <div className="p-2.5 rounded-xl bg-navy/60 border border-cyan/15">
            <span className="text-[10px] text-cyan-300/70">Net Planner Settlement:</span>
            <div className="text-sm font-bold text-emerald-400">₹{calculatedSettlement.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </section>

      {/* SEARCH BAR & TRANSACTIONS TABLE */}
      <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4 font-mono">
        <div className="flex justify-between items-center">
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search UTR #, Txn ID, customer, planner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#001736] border border-cyan/30 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-cyan/40 focus:outline-none focus:border-cyan"
            />
            <Search className="w-4 h-4 text-cyan/60 absolute left-3.5 top-2.5" />
          </div>

          <button
            onClick={() => toast.success('Exported Financial Ledger CSV')}
            className="px-3.5 py-2 rounded-xl bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 text-cyan text-xs font-bold flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Ledger</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cyan/20 text-cyan/70 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Transaction / UTR</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Planner Agency</th>
                <th className="py-3 px-4">Gross Amount</th>
                <th className="py-3 px-4">Commission</th>
                <th className="py-3 px-4">Net Settlement</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan/15 text-slate-200">
              {filteredPayments.map((p) => (
                <tr key={p.id} className="hover:bg-cyan/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div>{p.transactionId}</div>
                    <div className="text-[11px] text-cyan-300/70 font-normal">UTR: {p.utrNumber}</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">{p.customerName}</td>
                  <td className="py-3.5 px-4 text-slate-300">{p.plannerName}</td>

                  <td className="py-3.5 px-4 font-bold text-white">₹{p.amount.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 text-cyan font-bold">₹{p.commissionAmount.toLocaleString('en-IN')} ({p.commissionPercent}%)</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">₹{p.settlementAmount.toLocaleString('en-IN')}</td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold ${
                      p.paymentStatus === 'verified'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : p.paymentStatus === 'duplicate_utr' || p.paymentStatus === 'frozen'
                        ? 'bg-red-600/30 text-red-300 border border-red-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {p.paymentStatus.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {p.paymentStatus !== 'verified' && (
                        <button
                          onClick={() => approvePayment(p.id)}
                          className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold"
                        >
                          Verify UTR
                        </button>
                      )}

                      {p.paymentStatus !== 'frozen' && (
                        <button
                          onClick={() => freezePayment(p.id)}
                          className="px-2.5 py-1 rounded bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-[11px] font-bold"
                        >
                          Freeze Txn
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
