import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, Eye } from 'lucide-react'
import { destinations } from '@/data/mockData'
import { Link } from 'react-router-dom'
import { formatCurrency } from '@/lib/utils'

const categories = ['All', 'Beaches', 'Mountains', 'Adventure', 'Cultural Tours', 'Wildlife', 'Luxury Escapes', 'Honeymoon Destinations']

export function DestinationGallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  const filtered = activeCategory === 'All'
    ? destinations
    : destinations.filter((d) => d.category === activeCategory)

  return (
    <section id="destinations" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Explore the World
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Discover breathtaking destinations curated for every type of traveler
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-teal text-white glow-cyan-sm'
                  : 'bg-surface border border-border text-muted hover:border-teal/30'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filtered.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="break-inside-avoid"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative rounded-[14px] overflow-hidden cursor-pointer"
                style={{ perspective: '1000px' }}
              >
                {!loadedImages.has(dest.id) && (
                  <div className="skeleton absolute inset-0 z-10" />
                )}
                <motion.img
                  src={dest.image}
                  alt={dest.name}
                  loading="lazy"
                  onLoad={() => setLoadedImages((prev) => new Set(prev).add(dest.id))}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    i % 3 === 0 ? 'h-72' : i % 3 === 1 ? 'h-56' : 'h-64'
                  }`}
                  style={{
                    transform: 'rotateX(0deg) rotateY(0deg)',
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    const x = (e.clientX - rect.left) / rect.width - 0.5
                    const y = (e.clientY - rect.top) / rect.height - 0.5
                    e.currentTarget.style.transform = `perspective(1000px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.05)`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Quick Preview Button */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 z-20">
                  <Link to={`/destinations/${dest.id}`} className="inline-block bg-white/20 hover:bg-teal backdrop-blur-md text-white rounded-full p-3 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(0,203,224,0.5)]">
                    <Eye className="w-6 h-6" />
                  </Link>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-cyan text-xs font-medium uppercase tracking-wider bg-navy/50 px-2 py-1 rounded-md backdrop-blur-sm border border-cyan/20">
                      <MapPin className="w-3 h-3" /> {dest.category}
                    </div>
                    {dest.rating && (
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-navy/50 px-2 py-1 rounded-md backdrop-blur-sm">
                        <Star className="w-3 h-3 fill-amber-400" /> {dest.rating}
                      </div>
                    )}
                  </div>
                  <h3 className="text-white font-bold text-xl mb-1">{dest.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-white/60 text-sm">Starting from</span>
                    <span className="text-teal font-bold text-lg">{formatCurrency(dest.price)}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
