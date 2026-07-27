import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Compass, LayoutDashboard, Package, BarChart3, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'

const shortcuts = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'Packages', path: '/dashboard/packages' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
]

function OceanWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none">
      <svg viewBox="0 0 1440 120" className="w-full h-auto animate-wave opacity-50" preserveAspectRatio="none">
        <path fill="url(#wave-grad-1)" d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" />
      </svg>
      <svg viewBox="0 0 1440 120" className="w-full h-auto animate-wave-slow absolute bottom-0 opacity-40" preserveAspectRatio="none">
        <path fill="url(#wave-grad-2)" d="M0,80 C480,40 960,100 1440,70 L1440,120 L0,120 Z" />
      </svg>
      <svg viewBox="0 0 1440 80" className="w-full h-auto relative z-10" preserveAspectRatio="none">
        <path fill="#ffffff" d="M0,40 C360,80 720,20 1080,50 C1260,65 1380,55 1440,45 L1440,80 L0,80 Z" />
      </svg>
      <defs>
        <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00CBE0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0097A6" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="wave-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00CBE0" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </div>
  )
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            backgroundColor: Math.random() > 0.5 ? '#00CBE0' : '#ffffff',
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

function Clouds() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <motion.div
        className="absolute top-[10%] left-[-10%] w-64 h-16 bg-white/20 rounded-full blur-2xl"
        animate={{ x: ['0vw', '110vw'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-[30%] left-[-20%] w-96 h-24 bg-white/10 rounded-full blur-3xl"
        animate={{ x: ['0vw', '120vw'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear', delay: 20 }}
      />
      <motion.div
        className="absolute top-[15%] right-[10%] w-32 h-8 bg-white/30 rounded-full blur-lg"
        animate={{ x: [0, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

export function Hero() {
  const [expanded, setExpanded] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const { user } = useAuth()

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return
    const rect = heroRef.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / 20,
      y: (e.clientY - rect.top - rect.height / 2) / 20,
    })
  }

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100vh] bg-ocean-gradient overflow-hidden flex items-center justify-center"
    >
      <FloatingParticles />
      <Clouds />

      {/* Sunlight reflection */}
      <div className="absolute top-[5%] right-[15%] w-80 h-80 bg-cyan/20 rounded-full blur-[100px] animate-pulse-glow" />
      <div className="absolute top-[15%] left-[20%] w-[500px] h-[500px] bg-teal/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-32 pb-40">
        
        {/* Navigation Beacon */}
        <div className="relative inline-block mb-12">
          <motion.div
            animate={{ x: mousePos.x, y: mousePos.y }}
            transition={{ type: 'spring', stiffness: 40, damping: 20 }}
            className="relative cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="w-28 h-28 rounded-full bg-teal/20 backdrop-blur-sm border border-teal/30 flex items-center justify-center glow-cyan hover:scale-105 transition-transform animate-pulse-glow"
            >
              <Compass className="w-14 h-14 text-cyan" />
            </motion.div>

            {/* Ripple effects */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-cyan/40"
                animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
              />
            ))}
          </motion.div>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-6 flex gap-4"
              >
                {shortcuts.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className="flex flex-col items-center justify-center gap-2 w-24 h-24 glass rounded-2xl hover:glow-cyan hover:-translate-y-1 transition-all border border-white/20"
                      onClick={() => setExpanded(false)}
                    >
                      <item.icon className="w-6 h-6 text-teal" />
                      <span className="text-xs text-white font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                ))}
                <button
                  onClick={() => setExpanded(false)}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-navy/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 hover:bg-navy transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {user ? (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Welcome back,{' '}
                <span className="text-gradient font-extrabold block mt-2 sm:inline sm:mt-0">
                  {(user?.name || "Guest").split(' ')[0]}!
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto font-medium">
                Ready for your next adventure?
              </p>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              >
                <Link to="/dashboard">
                  <Button size="lg" glow className="min-w-[200px] text-lg py-6 group bg-gradient-to-r from-cyan to-teal border-none shadow-[0_0_30px_rgba(0,203,224,0.4)] hover:shadow-[0_0_50px_rgba(0,203,224,0.6)]">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/packages">
                  <Button size="lg" variant="outline" className="min-w-[200px] text-lg py-6 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                    Browse Trips
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="unauth"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Your Journey Begins with <span className="text-gradient">Waypoint</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-medium">
                Plan, book, and manage unforgettable travel experiences with one intelligent platform.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/destinations">
                  <Button size="lg" glow className="min-w-[200px] text-lg py-6 shadow-[0_0_30px_rgba(0,203,224,0.3)] group">
                    Explore Destinations
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="min-w-[200px] text-lg py-6 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm group">
                    Start Planning
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform inline" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <OceanWaves />
    </section>
  )
}
