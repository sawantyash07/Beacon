import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  Server,
  CreditCard,
  Users,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  Compass,
  FileCheck,
  RotateCcw,
  Headphones,
  FileText,
  XCircle,
  Play,
  Pause,
  ShieldAlert,
  ArrowUpRight,
} from 'lucide-react'
import { useMasterAdmin } from '@/context/MasterAdminContext'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

export default function MissionControlOverviewPage() {
  const navigate = useNavigate()
  const {
    systemHealth,
    kpis,
    activityFeed,
    alerts,
    toggleEmergencyLockdown,
  } = useMasterAdmin()

  const [streamPaused, setStreamPaused] = useState(false)
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'high'>('all')

  const filteredAlerts = alerts.filter((a) => {
    if (filterSeverity === 'critical') return a.severity === 'critical'
    if (filterSeverity === 'high') return a.severity === 'critical' || a.severity === 'high'
    return true
  })

  return (
    <div className="space-y-8 font-body">
      {/* PAGE TITLE BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan tracking-widest uppercase mb-1">
            <Activity className="w-4 h-4 text-cyan animate-pulse" />
            <span>Mission Control Command Overview</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            PLATFORM <span className="text-gradient">OPERATIONS</span> CENTER
          </h1>
          <p className="text-xs text-cyan-200/70 font-mono mt-1">
            Real-time infrastructure health, platform telemetry, active departures & intelligent threat mitigation
          </p>
        </div>

        {/* QUICK EMERGENCY CONTROL BAR */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/master-control/verification')}
            className="px-3.5 py-2 rounded-xl bg-cyan/10 hover:bg-cyan/20 border border-cyan/40 text-cyan text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,203,224,0.2)]"
          >
            <FileCheck className="w-4 h-4" />
            <span>Verify Planners ({kpis.pendingPlannerVerifications})</span>
          </button>

          <button
            onClick={() => navigate('/master-control/payments')}
            className="px-3.5 py-2 rounded-xl bg-teal/10 hover:bg-teal/20 border border-teal/40 text-cyan text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
          >
            <CreditCard className="w-4 h-4 text-teal" />
            <span>Freeze Payments</span>
          </button>

          <button
            onClick={toggleEmergencyLockdown}
            className="px-3.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Emergency Lockdown</span>
          </button>
        </div>
      </div>

      {/* 1. PLATFORM INFRASTRUCTURE & SERVICES HEALTH (LIVE INDICATORS) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-mono text-cyan uppercase tracking-wider font-bold flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan" />
            <span>Infrastructure & Microservice Telemetry</span>
          </h2>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
            System Overall Uptime: 99.99%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {systemHealth.map((item) => {
            const isOk = item.status === 'operational'
            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -2 }}
                className="glass-dark p-4 rounded-xl border border-cyan/20 hover:border-cyan/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-cyan-200/80 font-bold truncate">{item.name}</span>
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isOk ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse' : 'bg-amber-400'
                      }`}
                    />
                  </div>
                  <div className="text-[11px] text-slate-300 font-mono mb-3">{item.details}</div>
                </div>

                <div className="pt-2 border-t border-cyan/15 flex items-center justify-between text-[10px] font-mono text-cyan-300/70">
                  <span>Latency: <strong className="text-white">{item.latency}</strong></span>
                  <span>Uptime: <strong className="text-emerald-400">{item.uptime}</strong></span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* 2. LARGE KPI METRIC CARDS */}
      <section className="space-y-4">
        <h2 className="text-sm font-mono text-cyan uppercase tracking-wider font-bold flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyan" />
          <span>Core Platform KPIs & Financial Telemetry</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {/* Total Revenue */}
          <div className="glass-dark p-4 rounded-xl border border-cyan/30 hover:border-cyan/60 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-cyan/80">
              <span>Today's Revenue</span>
              <DollarSign className="w-4 h-4 text-cyan" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-2">
              ₹<AnimatedCounter value={kpis.todaysRevenue} />
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-1">+18.4% vs yesterday</div>
          </div>

          {/* Today's Bookings */}
          <div className="glass-dark p-4 rounded-xl border border-cyan/30 hover:border-cyan/60 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-cyan/80">
              <span>Today's Bookings</span>
              <TrendingUp className="w-4 h-4 text-cyan" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-2">
              <AnimatedCounter value={kpis.todaysBookings} />
            </div>
            <div className="text-[10px] font-mono text-cyan mt-1">342 confirmed trips</div>
          </div>

          {/* Active Trips */}
          <div className="glass-dark p-4 rounded-xl border border-cyan/30 hover:border-cyan/60 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-cyan/80">
              <span>Active Trips</span>
              <Compass className="w-4 h-4 text-cyan" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-2">
              <AnimatedCounter value={kpis.activeTrips} />
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-1">Live departures</div>
          </div>

          {/* Total Customers */}
          <div className="glass-dark p-4 rounded-xl border border-cyan/30 hover:border-cyan/60 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-cyan/80">
              <span>Total Customers</span>
              <Users className="w-4 h-4 text-cyan" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-2">
              <AnimatedCounter value={kpis.totalCustomers} />
            </div>
            <div className="text-[10px] font-mono text-cyan mt-1">Registered travellers</div>
          </div>

          {/* Total Planners */}
          <div className="glass-dark p-4 rounded-xl border border-cyan/30 hover:border-cyan/60 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-cyan/80">
              <span>Verified Planners</span>
              <CheckCircle2 className="w-4 h-4 text-cyan" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-2">
              <AnimatedCounter value={kpis.totalPlanners} />
            </div>
            <div className="text-[10px] font-mono text-emerald-400 mt-1">Active agencies</div>
          </div>

          {/* Pending Verifications */}
          <div className="glass-dark p-4 rounded-xl border border-amber-500/40 hover:border-amber-500 transition-all bg-amber-500/5">
            <div className="flex items-center justify-between text-xs font-mono text-amber-300">
              <span>Pending Verif.</span>
              <FileCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-amber-300 font-mono mt-2">
              <AnimatedCounter value={kpis.pendingPlannerVerifications} />
            </div>
            <div className="text-[10px] font-mono text-amber-400 mt-1">KYC review queue</div>
          </div>

          {/* Pending Payments */}
          <div className="glass-dark p-4 rounded-xl border border-cyan/30 hover:border-cyan/60 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-cyan/80">
              <span>Payment Verif.</span>
              <CreditCard className="w-4 h-4 text-cyan" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-2">
              <AnimatedCounter value={kpis.pendingPaymentVerifications} />
            </div>
            <div className="text-[10px] font-mono text-cyan mt-1">UTR verification</div>
          </div>

          {/* Refund Requests */}
          <div className="glass-dark p-4 rounded-xl border border-cyan/30 hover:border-cyan/60 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-cyan/80">
              <span>Refund Requests</span>
              <RotateCcw className="w-4 h-4 text-cyan" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-2">
              <AnimatedCounter value={kpis.refundRequests} />
            </div>
            <div className="text-[10px] font-mono text-amber-400 mt-1">Requires approval</div>
          </div>

          {/* Support Tickets */}
          <div className="glass-dark p-4 rounded-xl border border-cyan/30 hover:border-cyan/60 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-cyan/80">
              <span>Support Tickets</span>
              <Headphones className="w-4 h-4 text-cyan" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-2">
              <AnimatedCounter value={kpis.customerSupportTickets} />
            </div>
            <div className="text-[10px] font-mono text-cyan mt-1">Open tickets</div>
          </div>

          {/* Disputes */}
          <div className="glass-dark p-4 rounded-xl border border-red-500/40 hover:border-red-500 transition-all bg-red-500/5">
            <div className="flex items-center justify-between text-xs font-mono text-red-300">
              <span>Disputes</span>
              <FileText className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-red-300 font-mono mt-2">
              <AnimatedCounter value={kpis.disputesCount} />
            </div>
            <div className="text-[10px] font-mono text-red-400 mt-1">Under investigation</div>
          </div>

          {/* Cancelled Trips */}
          <div className="glass-dark p-4 rounded-xl border border-cyan/30 hover:border-cyan/60 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-cyan/80">
              <span>Cancelled Trips</span>
              <XCircle className="w-4 h-4 text-cyan" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono mt-2">
              <AnimatedCounter value={kpis.cancelledTripsCount} />
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">Past 30 days</div>
          </div>
        </div>
      </section>

      {/* 3. TWO COLUMN LAYOUT: LIVE ACTIVITY STREAM + INTELLIGENT THREAT & ALERT PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 7 COLS: LIVE ACTIVITY STREAM */}
        <section className="lg:col-span-7 glass-dark p-6 rounded-2xl border border-cyan/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-cyan/20 mb-4">
              <div className="flex items-center gap-2 text-sm font-mono text-cyan font-bold uppercase">
                <Activity className="w-4 h-4 animate-spin text-cyan" />
                <span>Live Platform Activity Stream</span>
              </div>
              <button
                onClick={() => setStreamPaused((prev) => !prev)}
                className="px-2.5 py-1 rounded-lg bg-navy border border-cyan/30 text-xs font-mono text-cyan hover:bg-cyan/15 flex items-center gap-1.5"
              >
                {streamPaused ? <Play className="w-3 h-3 fill-cyan" /> : <Pause className="w-3 h-3 fill-cyan" />}
                <span>{streamPaused ? 'Resume Stream' : 'Pause Stream'}</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-2 scrollbar-thin">
              {activityFeed.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border text-xs font-mono flex items-start gap-3 transition-all ${
                    item.severity === 'critical'
                      ? 'bg-red-500/10 border-red-500/40 text-red-200'
                      : item.severity === 'important'
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                      : 'bg-navy/60 border-cyan/15 text-slate-200 hover:border-cyan/40'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-cyan mt-1 shrink-0 animate-ping" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-white truncate">{item.title}</span>
                      <span className="text-[10px] text-cyan-300/60 shrink-0">{item.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5 truncate">{item.description}</p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-cyan-400/80">
                      <span>Actor: <strong>{item.actorName}</strong></span>
                      <span>•</span>
                      <span className="capitalize">Role: {item.actorRole}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-cyan/15 mt-4 text-center">
            <span className="text-[11px] font-mono text-cyan-300/60">
              Showing real-time WebSocket events • 24 items processed this minute
            </span>
          </div>
        </section>

        {/* RIGHT 5 COLS: INTELLIGENT ALERT & THREAT PANEL */}
        <section className="lg:col-span-5 glass-dark p-6 rounded-2xl border border-amber-500/30 flex flex-col justify-between bg-amber-500/5">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-4">
              <div className="flex items-center gap-2 text-sm font-mono text-amber-400 font-bold uppercase">
                <AlertTriangle className="w-4 h-4 animate-bounce" />
                <span>Intelligent Fraud & Ops Alerts ({filteredAlerts.length})</span>
              </div>

              <div className="flex gap-1">
                {(['all', 'high', 'critical'] as const).map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setFilterSeverity(sev)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                      filterSeverity === sev ? 'bg-amber-400 text-navy font-bold' : 'text-amber-300 hover:bg-amber-400/10'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3.5 rounded-xl bg-[#001f3d] border border-amber-500/30 text-xs font-mono space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-amber-300 truncate">{alert.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                        alert.severity === 'critical'
                          ? 'bg-red-600 text-white'
                          : alert.severity === 'high'
                          ? 'bg-amber-500 text-navy'
                          : 'bg-cyan/20 text-cyan'
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">{alert.summary}</p>

                  <div className="pt-2 border-t border-amber-500/15 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-cyan-300/70 truncate">Target: {alert.targetId}</span>
                    <button
                      onClick={() => {
                        toast.info(`Action Executed: ${alert.recommendedAction}`)
                        if (alert.targetType === 'planner') navigate('/master-control/users')
                        if (alert.targetType === 'payment') navigate('/master-control/payments')
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-[10px] font-bold flex items-center gap-1 transition-all"
                    >
                      <span>Take Action</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-amber-500/20 mt-4 flex items-center justify-between text-[11px] font-mono text-amber-300/80">
            <span>Fraud Engine Risk Engine ACTIVE</span>
            <span className="text-emerald-400">0 critical bypasses</span>
          </div>
        </section>
      </div>
    </div>
  )
}
