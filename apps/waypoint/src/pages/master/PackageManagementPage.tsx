import { useState } from 'react'
import {
  Package,
  Search,
  Trash2,
  EyeOff,
  Sparkles,
} from 'lucide-react'
import { useMasterAdmin } from '@/context/MasterAdminContext'

export default function PackageManagementPage() {
  const { packages, featurePackage, hidePackage, deletePackage } = useMasterAdmin()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  const filteredPackages = packages.filter((pkg) => {
    const matchesQuery =
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.plannerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = selectedStatus === 'all' || pkg.status === selectedStatus
    return matchesQuery && matchesStatus
  })

  return (
    <div className="space-y-8 font-body">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan tracking-widest uppercase mb-1">
            <Package className="w-4 h-4 text-cyan" />
            <span>Travel Inventory Moderation</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            PACKAGE <span className="text-gradient">MANAGEMENT</span> & QUALITY AUDIT
          </h1>
          <p className="text-xs text-cyan-200/70 font-mono mt-1">
            Inspect listing quality, duplicate text/image flags, feature top itineraries & remove policy-violating packages
          </p>
        </div>
      </div>

      {/* FILTER TABS & SEARCH */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search package title, planner agency, destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#001736] border border-cyan/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-cyan/40 focus:outline-none focus:border-cyan font-mono"
          />
          <Search className="w-4 h-4 text-cyan/60 absolute left-3.5 top-3" />
        </div>

        <div className="flex flex-wrap gap-1 p-1 bg-navy/80 border border-cyan/30 rounded-xl">
          {['all', 'published', 'featured', 'draft', 'reported', 'duplicate', 'hidden'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-lg capitalize font-bold transition-all ${
                selectedStatus === status ? 'bg-cyan text-navy shadow-md' : 'text-cyan-200/70 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* PACKAGES TABLE */}
      <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4 font-mono">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-cyan/20 text-cyan/70 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Package Listing</th>
                <th className="py-3 px-4">Planner Agency</th>
                <th className="py-3 px-4">Price / Duration</th>
                <th className="py-3 px-4">Quality Score</th>
                <th className="py-3 px-4">Duplicate Content</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyan/15 text-slate-200">
              {filteredPackages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-cyan/5 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white max-w-xs">
                    <div className="truncate">{pkg.title}</div>
                    <div className="text-[11px] text-cyan-300/70 font-normal">{pkg.destination} • {pkg.category}</div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">{pkg.plannerName}</td>

                  <td className="py-3.5 px-4 font-bold text-white">
                    ₹{pkg.price.toLocaleString('en-IN')}
                    <div className="text-[11px] text-cyan-300/70 font-normal">{pkg.duration}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${pkg.qualityScore > 85 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'}`}>
                      {pkg.qualityScore} / 100
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {pkg.duplicateContentScore ? (
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${pkg.duplicateContentScore > 30 ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'}`}>
                        {pkg.duplicateContentScore}% Match
                      </span>
                    ) : (
                      <span className="text-emerald-400 text-[11px]">Original</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold ${
                      pkg.status === 'featured'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-navy shadow-md'
                        : pkg.status === 'published'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : pkg.status === 'reported'
                        ? 'bg-red-600/30 text-red-300 border border-red-500/40'
                        : 'bg-navy border border-cyan/30 text-cyan-200'
                    }`}>
                      {pkg.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {pkg.status !== 'featured' && (
                        <button
                          onClick={() => featurePackage(pkg.id)}
                          className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400"
                          title="Spotlight Feature Package"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {pkg.status !== 'hidden' && (
                        <button
                          onClick={() => hidePackage(pkg.id)}
                          className="p-1.5 rounded-lg bg-cyan/10 hover:bg-cyan/20 border border-cyan/30 text-cyan"
                          title="Hide Package"
                        >
                          <EyeOff className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <button
                        onClick={() => deletePackage(pkg.id)}
                        className="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/40 text-red-300"
                        title="Delete Violating Package"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
