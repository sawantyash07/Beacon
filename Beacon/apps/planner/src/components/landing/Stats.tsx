import { motion } from 'framer-motion'
import { Users, Briefcase, Map, Globe2 } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'

const stats = [
  { icon: Users, label: 'Happy Travelers', value: 10000, suffix: '+' },
  { icon: Briefcase, label: 'Verified Planners', value: 500, suffix: '+' },
  { icon: Map, label: 'Destinations', value: 1200, suffix: '+' },
  { icon: Globe2, label: 'Successful Bookings', value: 25000, suffix: '+' },
]

export function Stats() {
  return (
    <section className="py-12 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-4 rounded-[16px] hover:bg-surface transition-colors cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mb-4 text-teal">
                <stat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-navy mb-2 flex items-center justify-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-sm font-medium text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
