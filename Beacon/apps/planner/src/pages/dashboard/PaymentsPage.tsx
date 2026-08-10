import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, ArrowDownLeft, Bell, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { transactions } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import { fetchBookings, updateBookingStatus } from '@/services/api'
import { useAuth } from '@/context/AuthContext'

const balance = 42847

export default function PaymentsPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Filter out debit transactions since settlements are sent directly to planners
  const [historyList, setHistoryList] = useState(
    transactions.filter((t) => t.type !== 'debit')
  )

  // Transaction Verification List state
  const [pendingVerifications, setPendingVerifications] = useState<any[]>([])

  useEffect(() => {
    const loadPendingVerifications = async () => {
      try {
        const bookings = await fetchBookings({ plannerId: user?.id });
        // filter: pending bookings that have a UTR (razorpayPaymentId)
        const filtered = bookings
          .filter((b: any) => b.status === 'PENDING' && b.payment?.razorpayPaymentId)
          .map((b: any) => ({
            id: b.id,
            traveler: b.travelerId === user?.id ? (user?.name || 'Primary Traveler') : 'Arjun Mehta',
            packageName: b.package?.title || 'Unknown Package',
            amount: b.totalAmount,
            utr: b.payment?.razorpayPaymentId || '',
            status: b.status === 'CONFIRMED' ? 'Verified' : 'Pending'
          }));
        setPendingVerifications(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.id) {
      loadPendingVerifications();
    }
  }, [user?.id]);

  const [verifyingTxn, setVerifyingTxn] = useState<any | null>(null)

  const [confirmTime, setConfirmTime] = useState(false)
  const [confirmAmount, setConfirmAmount] = useState(false)
  const [confirmUtr, setConfirmUtr] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Payments Workspace</h1>
        <p className="text-muted text-sm mt-1">Verify submitted traveler payments and track your earnings</p>
      </div>

      {/* Balance Card & Direct Payout Alert */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-teal-gradient rounded-[20px] p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Wallet className="w-5 h-5 text-cyan" />
                <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Total Direct Settled Earnings</span>
              </div>
              <p className="text-4xl font-extrabold font-mono">{formatCurrency(balance)}</p>
              <div className="flex items-center gap-2 mt-4 text-[11px] bg-white/10 px-3.5 py-1.5 rounded-full border border-white/10 max-w-max">
                <ShieldCheck className="w-4 h-4 text-cyan" />
                <span>Direct Settlements Active: Funds are wired instantly to your planner bank account.</span>
              </div>
            </div>
            <div>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 cursor-pointer shadow-md font-bold text-xs px-5 py-3"
                onClick={() => navigate('/dashboard/analytics')}
              >
                View Analytics Reports
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Transaction & UTR Verification Queue */}
      <Card className="p-6 border border-border shadow-sm rounded-[24px]">
        <div className="flex items-center justify-between mb-4 border-b border-border/40 pb-3">
          <div>
            <h2 className="text-base font-bold text-navy flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-teal" /> Transaction & UTR Verification Queue
            </h2>
            <p className="text-xs text-muted mt-0.5">Cross-reference traveler payment submissions with your bank statements</p>
          </div>
          <Badge className="bg-teal/10 text-teal border border-teal/20 font-bold font-mono">
            {pendingVerifications.filter((v) => v.status === 'Pending').length} Pending Checks
          </Badge>
        </div>

        <div className="space-y-3">
          {pendingVerifications.map((txn) => (
            <div
              key={txn.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-[16px] border border-border bg-page/50 hover:bg-page transition-colors gap-4"
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  txn.status === 'Verified' ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'
                }`}>
                  {txn.status === 'Verified' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-navy">{txn.traveler}</strong>
                    <span className="text-[10px] text-muted font-mono font-bold bg-navy/5 px-2 py-0.5 rounded-full">{txn.id}</span>
                  </div>
                  <p className="text-xs text-muted mt-0.5">{txn.packageName} · UTR: <span className="font-mono font-bold text-navy">{txn.utr}</span></p>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end gap-4">
                <span className="text-sm font-extrabold font-mono text-navy">{formatCurrency(txn.amount)}</span>
                {txn.status === 'Verified' ? (
                  <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-3 py-1.5 rounded-xl">
                    ✓ Verified
                  </span>
                ) : (
                  <Button
                    size="sm"
                    className="bg-teal hover:bg-teal/90 text-white font-bold text-xs cursor-pointer px-4 shadow-sm"
                    onClick={() => {
                      setVerifyingTxn(txn)
                      setConfirmTime(false)
                      setConfirmAmount(false)
                      setConfirmUtr(false)
                    }}
                  >
                    Verify Payment
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Payment Reminders */}
      <Card className="p-6 border border-border shadow-sm rounded-[24px]">
        <div className="flex items-center justify-between mb-4 border-b border-border/40 pb-3">
          <div>
            <h2 className="text-base font-bold text-navy flex items-center gap-2">
              <Bell className="w-5 h-5 text-teal" /> Pending Traveler Reminders
            </h2>
            <p className="text-xs text-muted mt-0.5">Send custom alerts for departures close to payment deadlines</p>
          </div>
          <Badge variant="warning">2 pending</Badge>
        </div>
        <div className="space-y-3">
          {[
            { traveler: 'Jane Smith', amount: 18000, due: '2026-07-28', package: 'Goa Beach Escape' },
            { traveler: 'Mike Wilson', amount: 35000, due: '2026-07-30', package: 'Leh Bike Expedition' },
          ].map((reminder, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 3 }}
              className="flex items-center justify-between p-3.5 rounded-[16px] border border-border hover:border-teal/30 bg-surface transition-colors"
            >
              <div>
                <p className="text-sm font-bold text-navy">{reminder.traveler}</p>
                <p className="text-xs text-muted mt-0.5">{reminder.package} · Due {formatDate(reminder.due)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-extrabold text-navy">{formatCurrency(reminder.amount)}</span>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="cursor-pointer font-bold text-xs border-border"
                  onClick={() => toast.success(`Payment reminder notification sent successfully to ${reminder.traveler}!`)}
                >
                  Send Reminder
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Transaction History (Credits only) */}
      <Card className="p-6 border border-border shadow-sm rounded-[24px]">
        <div className="mb-4 border-b border-border/40 pb-3">
          <h2 className="text-base font-bold text-navy">Direct Settlement History</h2>
          <p className="text-xs text-muted mt-0.5">Chronological record of verified credit payments processed to your account</p>
        </div>
        <div className="space-y-2">
          {historyList.map((txn, i) => (
            <motion.div
              key={txn.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-between p-3.5 rounded-[16px] bg-page/40 hover:bg-page transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-600 shrink-0">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-navy">{txn.description}</p>
                  <p className="text-xs text-muted font-mono font-bold">{txn.id} · {formatDate(txn.date)}</p>
                </div>
              </div>
              <span className="font-mono font-extrabold text-sm text-green-600">
                +{formatCurrency(txn.amount)}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Verification Confirmation Modal */}
      <AnimatePresence>
        {verifyingTxn && (
          <div className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="w-full max-w-md bg-surface border border-border rounded-[24px] shadow-2xl p-6 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h3 className="text-base font-bold text-navy flex items-center gap-1.5">
                  <ShieldCheck className="w-5 h-5 text-teal" /> Verify Transaction Details
                </h3>
                <p className="text-xs text-muted mt-0.5">Please confirm that UTR submission details match your bank account ledger.</p>
              </div>

              <div className="bg-page border border-border rounded-[16px] p-4 text-xs space-y-3 font-semibold text-navy">
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted font-normal">Traveler:</span>
                  <span>{verifyingTxn.traveler}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted font-normal">Package:</span>
                  <span>{verifyingTxn.packageName}</span>
                </div>
                
                {/* Time verification */}
                <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted font-normal">Transaction Time:</span>
                  <div className="flex items-center gap-2.5">
                    <span>{formatDate(new Date())}</span>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[10px] bg-surface border border-border px-2 py-0.5 rounded-md text-navy select-none">
                      <input
                        type="checkbox"
                        checked={confirmTime}
                        onChange={(e) => setConfirmTime(e.target.checked)}
                        className="w-3.5 h-3.5 accent-teal rounded cursor-pointer"
                      />
                      <span>Confirm</span>
                    </label>
                  </div>
                </div>

                {/* Amount verification */}
                <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                  <span className="text-muted font-normal">Submitted Amount:</span>
                  <div className="flex items-center gap-2.5">
                    <span className="text-teal font-extrabold">{formatCurrency(verifyingTxn.amount)}</span>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[10px] bg-surface border border-border px-2 py-0.5 rounded-md text-navy select-none">
                      <input
                        type="checkbox"
                        checked={confirmAmount}
                        onChange={(e) => setConfirmAmount(e.target.checked)}
                        className="w-3.5 h-3.5 accent-teal rounded cursor-pointer"
                      />
                      <span>Confirm</span>
                    </label>
                  </div>
                </div>

                {/* UTR verification */}
                <div className="flex items-center justify-between pb-1">
                  <span className="text-muted font-normal">UTR Number:</span>
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono font-bold text-teal">{verifyingTxn.utr}</span>
                    <label className="flex items-center gap-1.5 cursor-pointer text-[10px] bg-surface border border-border px-2 py-0.5 rounded-md text-navy select-none">
                      <input
                        type="checkbox"
                        checked={confirmUtr}
                        onChange={(e) => setConfirmUtr(e.target.checked)}
                        className="w-3.5 h-3.5 accent-teal rounded cursor-pointer"
                      />
                      <span>Confirm</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <Button variant="ghost" size="sm" onClick={() => setVerifyingTxn(null)} className="font-bold text-xs">
                  Cancel
                </Button>
                <Button
                  glow
                  size="sm"
                  className="font-bold text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!confirmTime || !confirmAmount || !confirmUtr}
                  onClick={async () => {
                    try {
                      await updateBookingStatus(verifyingTxn.id, 'CONFIRMED');
                      setPendingVerifications(prev =>
                        prev.map((p) => (p.id === verifyingTxn.id ? { ...p, status: 'Verified' } : p))
                      )
                      setHistoryList(prev => [
                        {
                          id: `TXN-${Date.now().toString().slice(-4)}`,
                          description: `Booking payment for ${verifyingTxn.traveler}`,
                          amount: verifyingTxn.amount,
                          type: 'credit',
                          date: new Date().toISOString().slice(0, 10),
                        },
                        ...prev,
                      ])
                      toast.success(`Transaction of ${formatCurrency(verifyingTxn.amount)} (UTR: ${verifyingTxn.utr}) verified and confirmed successfully!`)
                    } catch (err) {
                      console.error(err);
                      toast.error('Failed to save payment status update to database.');
                    }
                    setVerifyingTxn(null)
                  }}
                >
                  Save & Confirm Payment
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
