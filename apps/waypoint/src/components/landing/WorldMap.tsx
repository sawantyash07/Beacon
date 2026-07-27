import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Plane, Package } from 'lucide-react'
import { mapLocations } from '@/data/mockData'

export function WorldMap() {
  const [hoveredLoc, setHoveredLoc] = useState<number | null>(null)
  return (
    <section className="py-24 px-4 bg-surface">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Global Reach
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Connect travelers to destinations across the world with animated routes and live pins
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto rounded-[16px] overflow-hidden border border-border bg-page p-8"
        >
          <svg viewBox="0 0 100 60" className="w-full h-auto">
            {/* Simplified world map outline */}
            <ellipse cx="50" cy="30" rx="48" ry="28" fill="#D6EEF1" opacity="0.3" />
            <path
              d="M15,25 Q20,15 30,20 T45,18 T60,22 T75,20 T85,28 T80,38 T65,42 T50,40 T35,38 T20,35 Z"
              fill="#0097A6"
              opacity="0.08"
            />

            {/* Animated routes */}
            {mapLocations.map((loc) =>
              loc.routes.map((targetId) => {
                const target = mapLocations.find((l) => l.id === targetId)
                if (!target) return null
                return (
                  <motion.line
                    key={`route-${loc.id}-${targetId}`}
                    x1={loc.x}
                    y1={loc.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="#00CBE0"
                    strokeWidth="0.3"
                    strokeDasharray="2 1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                )
              })
            )}

            {/* Location pins */}
            {mapLocations.map((loc, i) => (
              <g key={loc.id}>
                <motion.circle
                  cx={loc.x}
                  cy={loc.y}
                  r={1.5}
                  fill="#0097A6"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: 'spring' }}
                  onMouseEnter={() => setHoveredLoc(loc.id)}
                  onMouseLeave={() => setHoveredLoc(null)}
                  className="cursor-pointer"
                />
                <motion.circle
                  cx={loc.x}
                  cy={loc.y}
                  r={3}
                  fill="none"
                  stroke="#00CBE0"
                  strokeWidth="0.3"
                  animate={{ r: [2, 5], opacity: [0.8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
                <text
                  x={loc.x}
                  y={loc.y - 3}
                  textAnchor="middle"
                  className="text-[2.5px] fill-navy font-bold pointer-events-none"
                >
                  {loc.name}
                </text>
              </g>
            ))}
          </svg>
          
          {/* Tooltip Overlay */}
          <AnimatePresence>
            {hoveredLoc && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-teal/20 z-10 w-64 pointer-events-none"
              >
                {mapLocations.filter(l => l.id === hoveredLoc).map(loc => (
                  <div key={loc.id}>
                    <div className="flex items-center gap-2 mb-3 border-b border-border pb-2">
                      <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-teal" />
                      </div>
                      <h4 className="text-lg font-bold text-navy">{loc.name}</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted flex items-center gap-1"><Plane className="w-3.5 h-3.5" /> Popular Trips</span>
                        <span className="font-bold text-navy">{Math.floor(Math.random() * 50) + 10}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted flex items-center gap-1"><Package className="w-3.5 h-3.5" /> Packages</span>
                        <span className="font-bold text-teal">{loc.routes.length + 2} Active</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {mapLocations.map((loc) => (
              <motion.div
                key={loc.id}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-surface rounded-full border border-border text-sm"
              >
                <MapPin className="w-3 h-3 text-teal" />
                <span className="text-navy font-medium">{loc.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
