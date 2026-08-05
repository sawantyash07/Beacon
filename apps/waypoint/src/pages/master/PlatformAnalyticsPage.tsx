import { BarChart3, MapPin, Award } from 'lucide-react'
import { useMasterAdmin } from '@/context/MasterAdminContext'

export default function PlatformAnalyticsPage() {
  const { planners } = useMasterAdmin()

  const destinationHeatmap = [
    { name: 'Spiti Valley, Himachal', bookings: 1420, revenue: 31950000, growth: '+28%' },
    { name: 'Leh Ladakh, J&K', bookings: 1180, revenue: 41300000, growth: '+22%' },
    { name: 'Munnar & Wayanad, Kerala', bookings: 980, revenue: 14210000, growth: '+15%' },
    { name: 'Jaisalmer, Rajasthan', bookings: 750, revenue: 6750000, growth: '+34%' },
    { name: 'Manali, Himachal', bookings: 640, revenue: 9600000, growth: '+12%' },
  ]

  return (
    <div className="space-y-8 font-body font-mono text-xs">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan tracking-widest uppercase mb-1">
            <BarChart3 className="w-4 h-4 text-cyan" />
            <span>Executive Business Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            PLATFORM <span className="text-gradient">ANALYTICS</span> & FORECASTING
          </h1>
          <p className="text-xs text-cyan-200/70 mt-1">
            Nationwide travel operating system metrics, destination heatmaps & financial projection models
          </p>
        </div>
      </div>

      {/* BI KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-dark p-4 rounded-xl border border-cyan/30">
          <div className="text-xs text-cyan-300/70">Average Booking Value (ABV)</div>
          <div className="text-2xl font-extrabold text-white mt-1">₹24,850</div>
          <div className="text-[10px] text-emerald-400 mt-1">+8.2% YoY Growth</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-cyan/30">
          <div className="text-xs text-cyan-300/70">Repeat Customer Rate</div>
          <div className="text-2xl font-extrabold text-cyan mt-1">34.2%</div>
          <div className="text-[10px] text-cyan mt-1">Cohort retention strength</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-cyan/30">
          <div className="text-xs text-cyan-300/70">Platform Gross Booking Value</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">₹18.45 Cr</div>
          <div className="text-[10px] text-emerald-400 mt-1">FY 2026 Run Rate</div>
        </div>

        <div className="glass-dark p-4 rounded-xl border border-cyan/30">
          <div className="text-xs text-cyan-300/70">Platform Net Take-Rate</div>
          <div className="text-2xl font-extrabold text-amber-300 mt-1">10.4% Net</div>
          <div className="text-[10px] text-amber-400 mt-1">Post gateway expenses</div>
        </div>
      </div>

      {/* DESTINATION HEATMAP & LEADERBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* DESTINATION POPULARITY HEATMAP */}
        <section className="lg:col-span-7 glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cyan/20">
            <h3 className="text-xs font-bold text-white uppercase flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan" />
              <span>Top Destination Popularity & Revenue Heatmap</span>
            </h3>
            <span className="text-[10px] text-cyan">Q3 2026 Volume</span>
          </div>

          <div className="space-y-3">
            {destinationHeatmap.map((dest) => (
              <div key={dest.name} className="p-3 rounded-xl bg-navy/60 border border-cyan/15 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{dest.name}</span>
                  <span className="text-emerald-400 font-bold">{dest.growth}</span>
                </div>
                <div className="flex justify-between text-[11px] text-cyan-300/70">
                  <span>{dest.bookings} Bookings</span>
                  <span>Gross: ₹{(dest.revenue / 10000000).toFixed(2)} Cr</span>
                </div>
                {/* Visual Bar */}
                <div className="w-full h-2 rounded-full bg-navy border border-cyan/20 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal to-cyan rounded-full"
                    style={{ width: `${Math.min(100, (dest.bookings / 1500) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PLANNER LEADERBOARD RANKINGS */}
        <section className="lg:col-span-5 glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-cyan/20">
            <h3 className="text-xs font-bold text-white uppercase flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Top Verified Planner Leaderboard</span>
            </h3>
          </div>

          <div className="space-y-3">
            {planners.slice(0, 4).map((p, idx) => (
              <div key={p.id} className="p-3 rounded-xl bg-navy/60 border border-cyan/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-cyan/20 text-cyan font-bold flex items-center justify-center">
                    #{idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-white">{p.agencyName}</div>
                    <div className="text-[10px] text-cyan-300/60">{p.location}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-emerald-400">₹{(p.totalRevenue / 100000).toFixed(1)}L</div>
                  <div className="text-[10px] text-slate-400">{p.totalBookings} Trips</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
