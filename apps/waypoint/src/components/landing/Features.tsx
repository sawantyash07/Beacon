import { useState } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { features } from '@/data/mockData'

export function Features() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <section id="features" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Why <span className="text-gradient">Waypoint</span>?
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Everything you need to run a world-class travel business, beautifully designed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const IconComponent = Icons[feature.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>
            const isExpanded = expanded === i

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setExpanded(isExpanded ? null : i)}
                className="cursor-pointer"
              >
                <motion.div
                  layout
                  whileHover={{ y: -4 }}
                  className={`glass rounded-[14px] p-6 transition-all duration-300 ${
                    isExpanded ? 'glow-cyan-sm ring-2 ring-cyan/20' : 'hover:shadow-lg'
                  }`}
                >
                  <motion.div
                    animate={isExpanded ? { scale: [1, 1.1, 1] } : {}}
                    className="w-12 h-12 rounded-[12px] bg-teal/10 flex items-center justify-center mb-4"
                  >
                    {IconComponent && (
                      <IconComponent className="w-6 h-6 text-teal" />
                    )}
                  </motion.div>
                  <h3 className="text-lg font-semibold text-navy mb-2">{feature.title}</h3>
                  <motion.p
                    animate={{ height: isExpanded ? 'auto' : '3rem' }}
                    className="text-muted text-sm overflow-hidden"
                  >
                    {feature.description}
                  </motion.p>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <span className="text-teal text-sm font-medium">Learn more →</span>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
