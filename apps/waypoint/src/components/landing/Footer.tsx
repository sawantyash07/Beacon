import { useState } from 'react'
import { motion } from 'framer-motion'
import { Compass, Mail } from 'lucide-react'
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

function FooterWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-20">
      <svg viewBox="0 0 1440 120" className="w-full h-auto animate-wave-slow" preserveAspectRatio="none">
        <path fill="#00CBE0" d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,80 1440,60 L1440,120 L0,120 Z" />
      </svg>
      <svg viewBox="0 0 1440 120" className="w-full h-auto animate-wave absolute bottom-0 opacity-50" preserveAspectRatio="none">
        <path fill="#0097A6" d="M0,80 C480,40 960,100 1440,70 L1440,120 L0,120 Z" />
      </svg>
    </div>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="relative bg-navy text-white pt-20 pb-8 px-4">
      <FooterWaves />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Compass className="w-6 h-6 text-cyan" />
              <span className="text-xl font-bold">Waypoint</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              AI-powered travel management for modern planners. Plan, manage, and explore with elegance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-cyan tracking-wider text-sm uppercase">Product</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link to="/#features" className="hover:text-cyan hover:translate-x-1 inline-block transition-transform">Features</Link></li>
              <li><Link to="/#pricing" className="hover:text-cyan hover:translate-x-1 inline-block transition-transform">Pricing</Link></li>
              <li><Link to="/destinations" className="hover:text-cyan hover:translate-x-1 inline-block transition-transform">Destinations</Link></li>
              <li><Link to="/#faq" className="hover:text-cyan hover:translate-x-1 inline-block transition-transform">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-cyan tracking-wider text-sm uppercase">Support & Company</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-cyan hover:translate-x-1 inline-block transition-transform">About Us</Link></li>
              <li><Link to="/blogs" className="hover:text-cyan hover:translate-x-1 inline-block transition-transform">Travel Blog</Link></li>
              <li><Link to="/contact" className="hover:text-cyan hover:translate-x-1 inline-block transition-transform">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-cyan hover:translate-x-1 inline-block transition-transform">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-cyan tracking-wider text-sm uppercase">Newsletter</h4>
            <p className="text-white/60 text-sm mb-4">Get travel industry insights delivered to your inbox.</p>
            {subscribed ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-cyan text-sm font-medium"
              >
                Thank you for subscribing!
              </motion.p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
                <Button type="submit" size="sm" glow>Join</Button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Waypoint. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[FaTwitter, FaInstagram, FaLinkedin, FaGithub].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -2, color: '#00CBE0' }}
                className="text-white/40 hover:text-cyan transition-colors"
                aria-label="Social link"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
