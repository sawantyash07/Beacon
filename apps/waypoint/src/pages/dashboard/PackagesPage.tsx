import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Star, Users, Plane } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { packages } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'

export default function PackagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">Packages</h1>
          <p className="text-muted text-sm mt-1">Create and manage your travel packages</p>
        </div>
        <Link to="/dashboard/packages/create">
          <Button glow><Plus className="w-4 h-4" /> Create Package</Button>
        </Link>
      </div>

      {packages.length === 0 ? (
        <EmptyState
          icon={<Plane className="w-8 h-8" />}
          title="No packages yet"
          description="Create your first travel package and start accepting bookings."
          actionLabel="Create Package"
          onAction={() => {}}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              {/* Boarding pass style card */}
              <Card hover className="p-0 overflow-hidden relative">
                <div className="relative">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-44 object-cover" loading="lazy" />
                  <div className="absolute top-3 right-3"><StatusBadge status={pkg.status} /></div>
                  {pkg.discount > 0 && (
                    <div className="absolute top-3 left-3 bg-cyan text-navy text-xs font-bold px-2 py-1 rounded-full">
                      -{pkg.discount}%
                    </div>
                  )}
                </div>

                {/* Perforated divider */}
                <div className="relative flex items-center">
                  <div className="absolute -left-3 w-6 h-6 rounded-full bg-page" />
                  <div className="flex-1 border-t-2 border-dashed border-border mx-3" />
                  <div className="absolute -right-3 w-6 h-6 rounded-full bg-page" />
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Plane className="w-4 h-4 text-teal" />
                    <span className="text-xs text-muted font-mono">{pkg.id}</span>
                  </div>
                  <h3 className="font-semibold text-navy mb-1">{pkg.title}</h3>
                  <p className="text-sm text-muted mb-3">{pkg.destination} · {pkg.duration}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-xl font-bold text-teal">
                        {formatCurrency(pkg.price * (1 - pkg.discount / 100))}
                      </p>
                      {pkg.discount > 0 && (
                        <p className="font-mono text-xs text-muted line-through">{formatCurrency(pkg.price)}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted">
                      {pkg.rating > 0 && (
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" />{pkg.rating}</span>
                      )}
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{pkg.travelers}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
