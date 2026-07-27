import { motion } from 'framer-motion'
import { Wallet, ArrowUpRight, ArrowDownLeft, Bell } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { transactions } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'

const balance = 42847

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Payments</h1>
        <p className="text-muted text-sm mt-1">Manage your earnings and transactions</p>
      </div>

      {/* Balance Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="bg-teal-gradient rounded-[16px] p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5" />
              <span className="text-white/70 text-sm">Available Balance</span>
            </div>
            <p className="text-4xl font-bold font-mono mb-6">{formatCurrency(balance)}</p>
            <div className="flex gap-3">
              <Button className="bg-white text-teal hover:bg-white/90">
                <ArrowUpRight className="w-4 h-4" /> Withdraw
              </Button>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                View Reports
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payment Reminders */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-navy flex items-center gap-2">
            <Bell className="w-5 h-5 text-teal" /> Payment Reminders
          </h2>
          <Badge variant="warning">2 pending</Badge>
        </div>
        <div className="space-y-3">
          {[
            { traveler: 'Jane Smith', amount: 949, due: '2026-07-28', package: 'Alpine Adventure' },
            { traveler: 'Mike Wilson', amount: 899, due: '2026-07-30', package: 'Sahara Expedition' },
          ].map((reminder, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between p-3 rounded-[12px] border border-border hover:border-teal/30 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-navy">{reminder.traveler}</p>
                <p className="text-xs text-muted">{reminder.package} · Due {formatDate(reminder.due)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-semibold">{formatCurrency(reminder.amount)}</span>
                <Button size="sm" variant="outline">Send Reminder</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Transaction History */}
      <Card>
        <h2 className="text-lg font-semibold text-navy mb-4">Transaction History</h2>
        <div className="space-y-2">
          {transactions.map((txn, i) => (
            <motion.div
              key={txn.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-3 rounded-[12px] hover:bg-page/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  txn.type === 'credit' ? 'bg-emerald-50' : 'bg-red-50'
                }`}>
                  {txn.type === 'credit' ? (
                    <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-navy">{txn.description}</p>
                  <p className="text-xs text-muted font-mono">{txn.id} · {formatDate(txn.date)}</p>
                </div>
              </div>
              <span className={`font-mono font-semibold text-sm ${
                txn.amount >= 0 ? 'text-emerald-600' : 'text-red-500'
              }`}>
                {txn.amount >= 0 ? '+' : ''}{formatCurrency(txn.amount)}
              </span>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}
