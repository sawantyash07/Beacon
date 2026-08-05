import { Megaphone } from 'lucide-react'
import { useMasterAdmin } from '@/context/MasterAdminContext'

export default function MarketingAnnouncementsPage() {
  const { campaigns } = useMasterAdmin()

  return (
    <div className="space-y-8 font-body font-mono text-xs">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan tracking-widest uppercase mb-1">
            <Megaphone className="w-4 h-4 text-cyan" />
            <span>Growth & Broadcast Marketing</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            MARKETING & <span className="text-gradient">ANNOUNCEMENTS</span>
          </h1>
          <p className="text-xs text-cyan-200/70 mt-1">
            Manage homepage banners, push broadcasts, festival promo campaigns & track click-through conversions
          </p>
        </div>
      </div>

      {/* CAMPAIGNS TABLE */}
      <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-cyan/20 text-cyan/70 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Campaign Title</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Target Audience</th>
                <th className="py-3 px-4">Reach Count</th>
                <th className="py-3 px-4">Open Rate</th>
                <th className="py-3 px-4">Conversions</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan/15 text-slate-200">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-cyan/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{c.title}</td>
                  <td className="py-3.5 px-4 text-cyan">{c.type}</td>
                  <td className="py-3.5 px-4 text-slate-300">{c.targetAudience}</td>
                  <td className="py-3.5 px-4 font-bold text-white">{c.sentCount.toLocaleString('en-IN')} Users</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">{c.openRatePercent}%</td>
                  <td className="py-3.5 px-4 text-cyan font-bold">{c.conversionsCount} Bookings</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {c.status}
                    </span>
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
