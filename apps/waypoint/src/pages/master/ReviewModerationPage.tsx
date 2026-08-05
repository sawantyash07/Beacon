import { useState } from 'react'
import { Star, Search } from 'lucide-react'
import { useMasterAdmin } from '@/context/MasterAdminContext'

export default function ReviewModerationPage() {
  const { reviews, moderateReview } = useMasterAdmin()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredReviews = reviews.filter((r) => {
    const q = searchQuery.toLowerCase()
    return (
      r.comment.toLowerCase().includes(q) ||
      r.packageName.toLowerCase().includes(q) ||
      r.plannerName.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-8 font-body font-mono text-xs">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan tracking-widest uppercase mb-1">
            <Star className="w-4 h-4 text-cyan" />
            <span>Customer Rating Audit</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            REVIEW <span className="text-gradient">MODERATION</span> CENTER
          </h1>
          <p className="text-xs text-cyan-200/70 mt-1">
            Detect fake reviews, defamation spam, sentiment anomalies & moderate platform feedback
          </p>
        </div>
      </div>

      {/* REVIEWS TABLE */}
      <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search review text, customer, planner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#001736] border border-cyan/30 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-cyan/40 focus:outline-none focus:border-cyan"
          />
          <Search className="w-4 h-4 text-cyan/60 absolute left-3.5 top-2.5" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-cyan/20 text-cyan/70 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Reviewer / Package</th>
                <th className="py-3 px-4">Planner</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Comment Text</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan/15 text-slate-200">
              {filteredReviews.map((r) => (
                <tr key={r.id} className="hover:bg-cyan/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">
                    <div>{r.customerName}</div>
                    <div className="text-[10px] text-cyan-300/60 font-normal">{r.packageName}</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">{r.plannerName}</td>

                  <td className="py-3.5 px-4 font-bold text-amber-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{r.rating} / 5</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-300">{r.comment}</td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold ${
                      r.status === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-red-600/30 text-red-300 border border-red-500/40'
                    }`}>
                      {r.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {r.status !== 'approved' && (
                        <button
                          onClick={() => moderateReview(r.id, 'approved')}
                          className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold"
                        >
                          Approve
                        </button>
                      )}
                      {r.status !== 'hidden' && (
                        <button
                          onClick={() => moderateReview(r.id, 'hidden')}
                          className="px-2.5 py-1 rounded bg-red-600/20 text-red-300 text-[10px] font-bold"
                        >
                          Hide Review
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
