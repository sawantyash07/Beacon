import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Compass } from 'lucide-react'

export function CTASection() {
  return (
    <section className="relative py-32 bg-ocean-gradient overflow-hidden flex items-center justify-center text-center px-4">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-cyan/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-teal/20 rounded-full blur-[120px]" />
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
            }}
            animate={{ y: [0, -40, 0], opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,203,224,0.3)]"
        >
          <Compass className="w-10 h-10 text-cyan" />
        </motion.div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md">
          Ready for Your Next <span className="text-gradient">Adventure?</span>
        </h2>
        
        <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">
          Join thousands of travelers and planners experiencing the future of travel. Start planning your dream trip today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/#destinations">
            <Button size="lg" glow className="min-w-[220px] text-lg py-7 shadow-[0_0_40px_rgba(0,203,224,0.4)] hover:shadow-[0_0_60px_rgba(0,203,224,0.6)] group">
              Browse Packages
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" variant="outline" className="min-w-[220px] text-lg py-7 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
              Become a Travel Planner
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
