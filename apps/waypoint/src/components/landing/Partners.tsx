import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { partners } from '@/data/mockData'

export function Partners() {
  // Duplicate the array to create a seamless infinite loop
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners]

  return (
    <section className="py-16 bg-white overflow-hidden border-y border-border">
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <p className="text-sm font-bold text-muted uppercase tracking-widest">Trusted by industry leaders worldwide</p>
      </div>
      
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Left/Right Fade Masks */}
        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
          className="flex items-center gap-16 px-8 whitespace-nowrap"
        >
          {duplicatedPartners.map((partner, i) => {
            const IconComponent = Icons[partner.logo as keyof typeof Icons] as React.ComponentType<{ className?: string }>
            return (
              <div
                key={`${partner.name}-${i}`}
                className="flex items-center gap-3 text-muted/60 hover:text-navy hover:scale-105 transition-all duration-300 grayscale hover:grayscale-0"
              >
                {IconComponent && <IconComponent className="w-8 h-8" />}
                <span className="text-2xl font-bold font-[family-name:var(--font-heading)]">{partner.name}</span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
