import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Users, Clock, Star, ArrowRight } from 'lucide-react'
import { packages } from '@/data/mockData'
import { Link } from 'react-router-dom'
import { formatCurrency } from '@/lib/utils'

export function PopularPackages() {
  const [hoveredPkg, setHoveredPkg] = useState<string | null>(null)

  return (
    <section className="py-24 px-4 bg-surface border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Popular <span className="text-gradient">Travel Packages</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Discover our most booked trips. Curated by verified planners, ready for your next adventure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredPkg(pkg.id)}
              onMouseLeave={() => setHoveredPkg(null)}
              className="group relative"
            >
              <Link
                to={`/packages/${pkg.id}`}
                className="block glass rounded-[20px] overflow-hidden border border-border/50 hover:border-teal/30 transition-all duration-300 hover:shadow-xl relative h-full"
              >
                <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={pkg.image}
                  alt={pkg.title}
                  animate={{ scale: hoveredPkg === pkg.id ? 1.1 : 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-navy/80 backdrop-blur-sm text-cyan text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-cyan/20">
                    <MapPin className="w-3 h-3" /> {pkg.destination}
                  </span>
                  {pkg.discount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                      {pkg.discount}% OFF
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-muted text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" /> {pkg.duration}
                  </div>
                  {pkg.rating > 0 && (
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" /> {pkg.rating}
                    </div>
                  )}
                </div>

                <h3 className="text-navy font-bold text-lg mb-2 line-clamp-1">{pkg.title}</h3>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <Users className="w-3.5 h-3.5 text-teal" /> {pkg.bookings} booked
                  </div>
                  <div className="w-1 h-1 rounded-full bg-border" />
                  <div className="text-xs text-muted">
                    <span className="font-semibold text-navy">{pkg.travelers}</span> travelers
                  </div>
                </div>

                <div className="flex items-end justify-between mt-6 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted mb-1">Starting from</p>
                    <div className="flex items-end gap-2">
                      <p className="text-xl font-bold text-teal">{formatCurrency(pkg.price)}</p>
                      {pkg.discount > 0 && (
                        <p className="text-sm text-muted line-through mb-0.5">
                          {formatCurrency(pkg.price * (1 + pkg.discount / 100))}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <button className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </button>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
