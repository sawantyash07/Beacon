import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Compass, LayoutDashboard, Package, BarChart3, X, ArrowRight, ShieldCheck, 
  Star, Users, CheckCircle, ArrowLeft, ChevronDown, Check, Building2, 
  UserCheck, Tent, Mountain, Route, MapPin, Globe, CreditCard, Receipt, 
  FileText, ArrowUpRight, Play, MessageSquare, Sparkles, Building, Briefcase, 
  HelpCircle, ChevronRight, CheckCircle2, AlertCircle, TrendingUp, Calendar, 
  Clock, DollarSign, Award, Layers, BookOpen, Heart, MessageCircle, AlertTriangle, 
  ArrowRightLeft, Menu, Activity, ShieldAlert, BadgeInfo, Settings
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

// Helper Component for Count Up Stats
function CountUp({ end, duration = 1.5, suffix = "" }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let start = 0
    const endNum = parseInt(end.replace(/\D/g, ''))
    if (start === endNum) return
    
    let totalMiliseconds = duration * 1000
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / endNum))
    if (incrementTime < 10) incrementTime = 10
    
    const step = () => {
      start += Math.ceil(endNum / (totalMiliseconds / incrementTime))
      if (start >= endNum) {
        setCount(endNum)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }
    
    const timer = setInterval(step, incrementTime)
    return () => clearInterval(timer)
  }, [end, duration])

  if (end.includes(',')) {
    return <span>{count.toLocaleString()}{suffix}</span>
  }
  return <span>{count}{suffix}</span>
}

export default function LandingPage() {
  const navigate = useNavigate()
  const { user, login } = useAuth()
  
  // Navigation states
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Interactive UI states
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [wizardStep, setWizardStep] = useState(1)
  
  // Section refs for smooth scrolling
  const registrationRef = useRef<HTMLDivElement>(null)
  const overviewRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const howItWorksRef = useRef<HTMLDivElement>(null)
  const pricingRef = useRef<HTMLDivElement>(null)
  const faqRef = useRef<HTMLDivElement>(null)

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-advancing wizard steps
  useEffect(() => {
    const interval = setInterval(() => {
      setWizardStep((prev) => (prev === 5 ? 1 : prev + 1))
    }, 4500)
    return () => clearInterval(interval)
  }, [])

  // Smooth scroll handler
  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement>) => {
    setMobileMenuOpen(false)
    elementRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Auth helper
  const handleBecomePlanner = async () => {
    try {
      await login({ identifier: 'demo@beaconplanner.com', password: 'password' })
      toast.success('Welcome to your Beacon Planner workspace!')
      navigate('/dashboard')
    } catch (e) {
      console.error(e)
      navigate('/signup')
    }
  }

  const testimonials = [
    {
      name: "Rohan Mehta",
      company: "Rohan Travels & Expeditions",
      role: "Founder & DMC Organizer",
      quote: "Beacon reduced our booking management time by over 60%. Automating payments verification and receipts stopped the WhatsApp chaos completely.",
      metrics: "320+ Monthly Bookings",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
    },
    {
      name: "Neha Rawat",
      company: "Trek With Neha",
      role: "Freelance Trek Leader",
      quote: "As a freelance trek leader, building packages took hours. With Beacon's daily builder, I publish beautiful itineraries in minutes and receive direct UPI bookings instantly.",
      metrics: "15 Hours Saved Weekly",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80"
    },
    {
      name: "Arjun Singh",
      company: "Himalayan Trails Collective",
      role: "Adventure Tour Director",
      quote: "The visual workflow and digital e-receipt generation are game-changers. Our travelers trust us more because of the professional experience Beacon offers.",
      metrics: "94% Repeat Travelers",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80"
    }
  ]

  const faqs = [
    { q: "Who can become a planner?", a: "Any travel professional—including established tour operators, destination management companies (DMCs), travel agents, trekking guides, and independent planners—can register and publish on Beacon." },
    { q: "Can freelancers register?", a: "Yes! Freelancers and independent creators can easily register by choosing the Freelancer profile model. No corporate entity is required to get started." },
    { q: "Do I need a GST number?", a: "No. You can add a GST number under your Profile Settings to issue tax-compliant invoices, but it is not mandatory to run your planning workspace or verify standard payments." },
    { q: "How do I receive payments?", a: "You configure your payouts by mapping your direct bank account or UPI ID. Travelers make payments directly based on your instructions, bypassing intermediate escrow holds." },
    { q: "Can I manage trekking events?", a: "Yes! Beacon supports specialized templates for trekking, camping, adventure, and custom holiday experiences, complete with altimeter ratings, difficulty scales, and equipment sheets." },
    { q: "Can I edit my packages later?", a: "Absolutely. You can edit details, update day itineraries, customize base pricing, or archive templates at any time. Changes sync instantly to the consumer catalog." },
    { q: "How does payment verification work?", a: "Travelers enter their UPI transaction UTR or upload payment screenshots. Beacon flags these under 'Pending Verification' on your dashboard. You review, approve, and click to verify." },
    { q: "Is there a transaction commission?", a: "No. Beacon is a subscription-first SaaS platform. We do not charge transaction commissions on bookings, allowing you to retain 100% of your earnings." },
    { q: "Can I issue receipts?", a: "Yes! Once you verify a payment, Beacon dynamically compiles and emails a professional, branded PDF booking invoice and transaction e-receipt directly to the traveler." },
    { q: "Can multiple team members manage one account?", a: "Yes. Enterprise plans support agent profiles, allowing you to invite coordinators, admins, and support agents to collaborate under your company dashboard." }
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white font-[family-name:var(--font-body)] antialiased select-none overflow-x-hidden">
      
      {/* BACKGROUND DECORATIVE GLOWS */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[120vh] right-[10vw] w-[500px] h-[500px] bg-teal/5 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[200px] left-[5vw] w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* ====================================================
          SECTION 1: NAVIGATION BAR
          ==================================================== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#020617]/85 backdrop-blur-md border-b border-white/5 py-4 shadow-lg' 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/planner/beacon-logo.png"
              alt="Beacon Logo"
              className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="text-lg font-bold tracking-tight text-white font-[family-name:var(--font-heading)]">
              Beacon <span className="text-cyan font-medium">Planner</span>
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-medium text-white/70 hover:text-cyan transition-colors">Overview</button>
            <button onClick={() => scrollToSection(featuresRef)} className="text-sm font-medium text-white/70 hover:text-cyan transition-colors">Features</button>
            <button onClick={() => scrollToSection(howItWorksRef)} className="text-sm font-medium text-white/70 hover:text-cyan transition-colors">How It Works</button>
            <button onClick={() => scrollToSection(pricingRef)} className="text-sm font-medium text-white/70 hover:text-cyan transition-colors">Pricing</button>
            <button onClick={() => scrollToSection(faqRef)} className="text-sm font-medium text-white/70 hover:text-cyan transition-colors">FAQs</button>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-sm text-white/80 hover:text-white hover:bg-white/5 font-semibold py-2.5">
                Login
              </Button>
            </Link>
            <Button glow onClick={handleBecomePlanner} className="text-sm font-bold bg-cyan text-navy px-5 py-2.5 rounded-[12px]">
              Become a Planner
            </Button>
          </div>

          <button 
            className="lg:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#020617] border-b border-white/5 overflow-hidden"
            >
              <div className="px-6 py-6 space-y-4 flex flex-col">
                <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} className="text-left text-base font-medium text-white/70 py-1 hover:text-cyan">Overview</button>
                <button onClick={() => scrollToSection(featuresRef)} className="text-left text-base font-medium text-white/70 py-1 hover:text-cyan">Features</button>
                <button onClick={() => scrollToSection(howItWorksRef)} className="text-left text-base font-medium text-white/70 py-1 hover:text-cyan">How It Works</button>
                <button onClick={() => scrollToSection(pricingRef)} className="text-left text-base font-medium text-white/70 py-1 hover:text-cyan">Pricing</button>
                <button onClick={() => scrollToSection(faqRef)} className="text-left text-base font-medium text-white/70 py-1 hover:text-cyan">FAQs</button>
                <hr className="border-white/5 my-2" />
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center py-3 border-white/10 text-white hover:bg-white/5">
                    Login
                  </Button>
                </Link>
                <Button glow onClick={handleBecomePlanner} className="w-full justify-center py-3 bg-cyan text-navy font-bold rounded-[12px]">
                  Become a Planner
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ====================================================
          SECTION 2: HERO
          ==================================================== */}
      <section 
        className="relative pt-48 pb-40 px-6 lg:px-8 overflow-hidden z-10 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(10, 16, 32, 0.4), rgba(10, 16, 32, 0.95)), url('/planner/hero-bg.png')`
        }}
      >
        {/* Twinkling stars & Micro glowing details */}
        {[
          { top: '12%', left: '15%', delay: 0 },
          { top: '25%', left: '8%', delay: 1.5 },
          { top: '18%', left: '42%', delay: 0.8 },
          { top: '35%', left: '48%', delay: 2 },
          { top: '22%', left: '78%', delay: 1.2 },
          { top: '15%', left: '92%', delay: 2.5 },
          { top: '42%', left: '88%', delay: 0.5 },
        ].map((star, idx) => (
          <motion.div 
            key={idx}
            className="absolute w-1 h-1 bg-white rounded-full pointer-events-none z-0"
            style={{ top: star.top, left: star.left }}
            animate={{ opacity: [0.1, 0.8, 0.1] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: star.delay, ease: "easeInOut" }}
          />
        ))}

        {/* Floating location nodes */}
        {[
          { top: '30%', left: '29%', color: '#00D4FF' },
          { top: '51%', left: '41%', color: '#00B8FF' },
          { top: '31%', left: '54%', color: '#00D4FF' },
          { top: '37%', left: '65%', color: '#008CFF' },
          { top: '61%', left: '57%', color: '#00B8FF' },
          { top: '33%', left: '76%', color: '#008CFF' },
          { top: '62%', left: '79%', color: '#00D4FF' },
        ].map((node, idx) => (
          <div 
            key={idx} 
            className="absolute pointer-events-none z-0"
            style={{ top: node.top, left: node.left }}
          >
            <motion.div 
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: node.color }}
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 }}
            />
            <motion.div 
              className="absolute -inset-1.5 rounded-full border border-cyan/40"
              style={{ borderColor: node.color }}
              animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: idx * 0.3 }}
            />
          </div>
        ))}

        {/* Slow-moving clouds */}
        <motion.div 
          className="absolute bg-gradient-to-r from-transparent via-white/[0.02] to-transparent w-[500px] h-32 blur-3xl rounded-full pointer-events-none z-0"
          style={{ top: '8%', left: '-15%' }}
          animate={{ x: ['0vw', '110vw'] }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bg-gradient-to-r from-transparent via-white/[0.015] to-transparent w-[600px] h-40 blur-3xl rounded-full pointer-events-none z-0"
          style={{ top: '22%', right: '-15%' }}
          animate={{ x: ['0vw', '-110vw'] }}
          transition={{ duration: 110, repeat: Infinity, ease: "linear" }}
        />

        {/* Soft Lighthouse Beam Pulse */}
        <motion.div 
          className="absolute bottom-[20%] left-[8%] w-64 h-64 bg-cyan/5 rounded-full blur-3xl pointer-events-none z-0"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center w-full">
            
            {/* HERO LEFT CONTENT */}
            <div className="lg:col-span-5 space-y-8 text-left z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d1426]/80 border border-cyan/20 text-xs font-extrabold text-cyan tracking-wide uppercase backdrop-blur-sm shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-cyan animate-pulse-glow" />
                ALL-IN-ONE PLATFORM FOR TRAVEL PLANNERS
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-white leading-[1.08] tracking-tight font-[family-name:var(--font-heading)]">
                Turn Your Travel Expertise Into a <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#00D4FF] via-[#00B8FF] to-[#00D4FF] bg-clip-text text-transparent glow-cyan-sm font-black inline-block mt-1">
                  Growing Business.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal max-w-xl">
                Create travel packages, receive bookings, manage travellers, verify payments, issue receipts, and grow your travel business—all from one powerful platform.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button glow onClick={handleBecomePlanner} className="py-4 px-8 bg-cyan text-navy font-bold text-base rounded-[14px] flex items-center justify-center gap-2 group cursor-pointer shadow-[0_4px_20px_rgba(0,212,255,0.35)] hover:shadow-[0_4px_30px_rgba(0,212,255,0.5)] transition-all">
                  Become a Planner
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <button onClick={() => scrollToSection(howItWorksRef)} className="py-4 px-8 border border-white/10 hover:border-white/20 text-white font-semibold text-base rounded-[14px] flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm transition-all hover:bg-white/10 cursor-pointer hover:shadow-lg">
                  <Play className="w-4 h-4 fill-white text-white" />
                  Watch Product Demo
                </button>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <img className="w-8 h-8 rounded-full border-2 border-[#0a1020] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50" alt="Planner avatar" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#0a1020] object-cover" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=50" alt="Planner avatar" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#0a1020] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50" alt="Planner avatar" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#0a1020] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50" alt="Planner avatar" />
                  <img className="w-8 h-8 rounded-full border-2 border-[#0a1020] object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50" alt="Planner avatar" />
                </div>
                <p className="text-xs sm:text-sm text-white/50">
                  Join <span className="text-white font-bold">500+ verified planners</span> already growing with Beacon.
                </p>
              </div>
            </div>

            {/* HERO RIGHT CONTENT (Dell XPS / HP Spectre Slanted Mockup & Glass Notification Stack) */}
            <div className="lg:col-span-7 flex flex-row items-center justify-end gap-6 relative">
              
              {/* Laptop Perspective Wrapper */}
              <div 
                className="w-full max-w-[420px] sm:max-w-[440px] relative z-10 shrink-0"
                style={{
                  perspective: '1200px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Floating soft cyan glow and shadow beneath laptop */}
                <div className="absolute -bottom-8 left-10 right-10 h-6 bg-cyan/15 blur-2xl rounded-full animate-pulse-glow" />
                <div className="absolute -bottom-10 left-12 right-12 h-4 bg-black/60 blur-xl rounded-full" />

                {/* Dell XPS Style Matte Black Business Laptop Frame */}
                <motion.div 
                  className="bg-[#0b0f19] border-[6px] border-[#1e2538] rounded-[16px] shadow-2xl p-2 relative overflow-hidden aspect-[1.5] border-b-[8px]"
                  style={{
                    transform: 'rotateY(-18deg) rotateX(12deg) rotateZ(3deg) skewY(-2deg)',
                    boxShadow: '-20px 25px 50px rgba(0,0,0,0.7), 0 0 30px rgba(0,212,255,0.08)'
                  }}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  {/* Slim Bezels Screen Inner */}
                  <div className="w-full h-full bg-[#030712] rounded-[8px] overflow-hidden flex flex-col justify-between p-3 font-sans relative">
                    
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-[9px] sm:text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-cyan animate-pulse-glow" />
                        <span className="font-bold text-white tracking-wide">Beacon Planner</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-cyan/15 text-[7px] text-cyan font-bold border border-cyan/10">Enterprise</span>
                        <div className="w-4.5 h-4.5 rounded-full bg-white/10 flex items-center justify-center text-[7px] font-bold">A</div>
                      </div>
                    </div>

                    {/* Dashboard Content Grid */}
                    <div className="grid grid-cols-12 gap-2 h-full min-h-0">
                      
                      {/* Sidebar */}
                      <div className="col-span-3 space-y-0.5 border-r border-white/5 pr-1.5 text-[8px] sm:text-[9px] text-white/50">
                        <div className="bg-cyan/15 text-cyan rounded px-1.5 py-1 font-bold flex items-center gap-1"><LayoutDashboard className="w-2.5 h-2.5" /> Dashboard</div>
                        <div className="px-1.5 py-1 flex items-center gap-1 hover:text-white transition-colors"><Package className="w-2.5 h-2.5" /> Packages</div>
                        <div className="px-1.5 py-1 flex items-center gap-1 hover:text-white transition-colors"><Calendar className="w-2.5 h-2.5" /> Bookings</div>
                        <div className="px-1.5 py-1 flex items-center gap-1 hover:text-white transition-colors"><MessageCircle className="w-2.5 h-2.5" /> Enquiries</div>
                        <div className="px-1.5 py-1 flex items-center gap-1 hover:text-white transition-colors"><CreditCard className="w-2.5 h-2.5" /> Payments</div>
                        <div className="px-1.5 py-1 flex items-center gap-1 hover:text-white transition-colors"><Star className="w-2.5 h-2.5" /> Reviews</div>
                        <div className="px-1.5 py-1 flex items-center gap-1 hover:text-white transition-colors"><BarChart3 className="w-2.5 h-2.5" /> Analytics</div>
                        <div className="px-1.5 py-1 flex items-center gap-1 hover:text-white transition-colors"><Users className="w-2.5 h-2.5" /> Contacts</div>
                        <div className="px-1.5 py-1 flex items-center gap-1 hover:text-white transition-colors"><Settings className="w-2.5 h-2.5" /> Settings</div>
                      </div>

                      {/* Dashboard Center View */}
                      <div className="col-span-9 space-y-2 pl-1 overflow-hidden flex flex-col justify-between">
                        {/* Top Widgets Grid */}
                        <div className="grid grid-cols-4 gap-1">
                          <div className="bg-white/5 border border-white/5 rounded p-1 text-center">
                            <p className="text-[6px] text-white/40 uppercase font-semibold">Revenue</p>
                            <h4 className="text-[8.5px] font-bold text-white mt-0.5">₹2,48,000</h4>
                            <span className="text-[5px] text-cyan font-bold">+18.4%</span>
                          </div>
                          <div className="bg-white/5 border border-white/5 rounded p-1 text-center">
                            <p className="text-[6px] text-white/40 uppercase font-semibold">Bookings</p>
                            <h4 className="text-[8.5px] font-bold text-white mt-0.5">32</h4>
                            <span className="text-[5px] text-cyan font-bold">+12.5%</span>
                          </div>
                          <div className="bg-white/5 border border-white/5 rounded p-1 text-center">
                            <p className="text-[6px] text-white/40 uppercase font-semibold">Trips</p>
                            <h4 className="text-[8.5px] font-bold text-white mt-0.5">12</h4>
                            <span className="text-[5px] text-cyan font-bold">+8.3%</span>
                          </div>
                          <div className="bg-white/5 border border-white/5 rounded p-1 text-center">
                            <p className="text-[6px] text-white/40 uppercase font-semibold">Travellers</p>
                            <h4 className="text-[8.5px] font-bold text-white mt-0.5">256</h4>
                            <span className="text-[5px] text-cyan font-bold">+15.3%</span>
                          </div>
                        </div>

                        {/* Revenue Chart + Lists Split */}
                        <div className="grid grid-cols-12 gap-2 flex-1 min-h-0">
                          {/* Line Chart (col-span-7) */}
                          <div className="col-span-7 bg-white/[0.02] border border-white/5 rounded p-1.5 space-y-1 flex flex-col justify-between">
                            <div className="flex justify-between text-[6px] text-white/40">
                              <span>Revenue Overview</span>
                              <span>This Month</span>
                            </div>
                            <svg className="w-full h-8 text-cyan/30" viewBox="0 0 100 25" fill="none">
                              <path d="M0,22 Q15,12 30,17 T70,3 T110,8 T150,2" stroke="#00D4FF" strokeWidth="1" />
                              <path d="M0,22 Q15,12 30,17 T70,3 T110,8 T150,2 L150,25 L0,25 Z" fill="url(#mock-chart-grad-xs)" />
                              <defs>
                                <linearGradient id="mock-chart-grad-xs" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.2"/>
                                  <stop offset="100%" stopColor="#00D4FF" stopOpacity="0"/>
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>

                          {/* Recent Bookings (col-span-5) */}
                          <div className="col-span-5 bg-white/[0.02] border border-white/5 rounded p-1.5 space-y-1 text-[5px] sm:text-[6px]">
                            <p className="font-bold text-white/40 uppercase tracking-wider">Recent Bookings</p>
                            <div className="space-y-0.5">
                              <div className="flex justify-between border-b border-white/5 pb-0.5">
                                <span className="text-white font-medium truncate max-w-[32px]">Coorg</span>
                                <span className="text-white/40">2p</span>
                                <span className="text-teal font-bold">Confirmed</span>
                              </div>
                              <div className="flex justify-between border-b border-white/5 pb-0.5">
                                <span className="text-white font-medium truncate max-w-[32px]">Har Ki Dun</span>
                                <span className="text-white/40">4p</span>
                                <span className="text-teal font-bold">Confirmed</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-white font-medium truncate max-w-[32px]">Goa Beach</span>
                                <span className="text-white/40">2p</span>
                                <span className="text-yellow-500 font-bold">Pending</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Lower Info widgets (Upcoming Trips list) */}
                        <div className="grid grid-cols-2 gap-1.5 text-[5px] sm:text-[6px]">
                          <div className="bg-white/[0.02] border border-white/5 rounded p-1 space-y-0.5">
                            <p className="font-bold text-white/40 uppercase tracking-wider">Upcoming Trips</p>
                            <div className="flex justify-between text-white/70">
                              <span className="truncate">Kedarkantha Trek</span>
                              <span className="text-white/40 font-mono">12 Dec</span>
                            </div>
                          </div>
                          <div className="bg-white/[0.02] border border-white/5 rounded p-1 space-y-0.5">
                            <p className="font-bold text-white/40 uppercase tracking-wider">Booking Status</p>
                            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                              <div className="h-full bg-cyan" style={{ width: '75%' }} />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </motion.div>
              </div>

              {/* VERTICAL GLASS NOTIFICATION CARDS STACK */}
              <div className="hidden sm:flex flex-col gap-3 w-[180px] shrink-0 z-20">
                {/* Card 1: New Booking */}
                <motion.div 
                  className="bg-white/[0.04] backdrop-blur-md border border-cyan/20 rounded-[14px] p-3 shadow-lg hover:border-cyan/50 transition-colors duration-300 text-left"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center text-cyan"><Calendar className="w-3.5 h-3.5" /></div>
                    <span className="font-bold text-white text-[10px]">New Booking</span>
                  </div>
                  <div className="mt-1.5 space-y-0.5">
                    <p className="font-bold text-white/95 text-[9px] truncate">Goa Trek Adventure</p>
                    <p className="text-[8px] text-white/50">2 Travellers · 2m ago</p>
                  </div>
                </motion.div>

                {/* Card 2: Payment Verified */}
                <motion.div 
                  className="bg-white/[0.04] backdrop-blur-md border border-teal/20 rounded-[14px] p-3 shadow-lg hover:border-teal/50 transition-colors duration-300 text-left"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-teal/20 flex items-center justify-center text-teal"><ShieldCheck className="w-3.5 h-3.5" /></div>
                    <span className="font-bold text-white text-[10px]">Payment Verified</span>
                  </div>
                  <div className="mt-1.5">
                    <p className="font-bold text-white/95 text-[9px]">₹18,000</p>
                    <p className="text-[8px] text-white/50">UTR 3901... · 15m ago</p>
                  </div>
                </motion.div>

                {/* Card 3: New Review */}
                <motion.div 
                  className="bg-white/[0.04] backdrop-blur-md border border-yellow-500/20 rounded-[14px] p-3 shadow-lg hover:border-yellow-500/50 transition-colors duration-300 text-left"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500"><Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" /></div>
                    <span className="font-bold text-white text-[10px]">New Review</span>
                  </div>
                  <div className="mt-1.5 space-y-0.5">
                    <div className="flex gap-0.5"><Star className="w-2 h-2 fill-cyan text-cyan" /><Star className="w-2 h-2 fill-cyan text-cyan" /><Star className="w-2 h-2 fill-cyan text-cyan" /><Star className="w-2 h-2 fill-cyan text-cyan" /><Star className="w-2 h-2 fill-cyan text-cyan" /></div>
                    <p className="font-bold text-white/95 text-[9px] truncate">Excellent Experience</p>
                  </div>
                </motion.div>

                {/* Card 4: Package Published */}
                <motion.div 
                  className="bg-white/[0.04] backdrop-blur-md border border-cyan/20 rounded-[14px] p-3 shadow-lg hover:border-cyan/50 transition-colors duration-300 text-left"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-cyan/20 flex items-center justify-center text-cyan"><Package className="w-3.5 h-3.5" /></div>
                    <span className="font-bold text-white text-[10px]">Package Published</span>
                  </div>
                  <div className="mt-1.5 space-y-0.5">
                    <p className="font-bold text-white/95 text-[9px] truncate">Kedarkantha Trek</p>
                    <p className="text-[8px] text-white/50">Live · 2h ago</p>
                  </div>
                </motion.div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 3: TRUST INDICATORS
          ==================================================== */}
      <section className="py-20 bg-[#040817] border-y border-white/5 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2 text-center p-4">
              <div className="flex items-center justify-center gap-2 text-cyan">
                <Users className="w-5 h-5" />
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-heading)]">
                  <CountUp end="500" suffix="+" />
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60">Verified Planners Joined</p>
            </div>
            <div className="space-y-2 text-center p-4">
              <div className="flex items-center justify-center gap-2 text-cyan">
                <Calendar className="w-5 h-5" />
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-heading)]">
                  <CountUp end="25000" suffix="+" />
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60">Bookings Managed</p>
            </div>
            <div className="space-y-2 text-center p-4">
              <div className="flex items-center justify-center gap-2 text-cyan">
                <Route className="w-5 h-5" />
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-heading)]">
                  <CountUp end="1200" suffix="+" />
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60">Experiences Published</p>
            </div>
            <div className="space-y-2 text-center p-4">
              <div className="flex items-center justify-center gap-2 text-cyan">
                <Star className="w-5 h-5 fill-cyan text-cyan" />
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-[family-name:var(--font-heading)]">
                  <CountUp end="98" suffix="%" />
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-white/60">Planner Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 4: WHO CAN JOIN
          ==================================================== */}
      <section ref={overviewRef} className="py-28 px-6 lg:px-8 max-w-7xl mx-auto relative z-10 bg-[#070D1A]">
        {/* Soft radial glows coming from opposite corners */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#008CFF]/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Large Premium Section Container Card */}
        <div className="bg-[#0b1528]/80 backdrop-blur-xl border border-cyan/10 rounded-[32px] p-8 sm:p-12 shadow-2xl relative overflow-hidden w-full">
          
          {/* Subtle background effects: dotted world map, Topographic route vector curves */}
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay">
            <svg className="w-full h-full text-cyan" viewBox="0 0 1000 500" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="150" cy="180" r="1.5" fill="currentColor" />
              <circle cx="280" cy="130" r="1.5" fill="currentColor" />
              <circle cx="420" cy="220" r="1.5" fill="currentColor" />
              <circle cx="610" cy="140" r="1.5" fill="currentColor" />
              <circle cx="780" cy="240" r="1.5" fill="currentColor" />
              <circle cx="850" cy="150" r="1.5" fill="currentColor" />
              {/* Route curves */}
              <path d="M150,180 Q350,80 610,140" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M420,220 Q600,280 780,240" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
              <path d="M280,130 Q500,200 850,150" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
            </svg>
          </div>

          <div className="text-center space-y-4 mb-16 relative z-10">
            <div className="text-[11px] sm:text-xs font-bold text-cyan tracking-[0.25em] uppercase">
              WHO CAN JOIN
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-[family-name:var(--font-heading)] leading-tight">
              Built For{" "}
              <span className="bg-gradient-to-r from-[#00D4FF] to-[#008CFF] bg-clip-text text-transparent glow-cyan-sm">
                Every
              </span>{" "}
              Travel Professional
            </h2>
            <div className="w-12 h-[1px] bg-cyan/20 mx-auto" />
            <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto font-normal leading-relaxed">
              Whether you're an individual planner or an established travel company, Beacon gives you the tools to grow your business.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              { title: "Travel Agencies", desc: "Manage hundreds of departures & agents.", icon: Building2 },
              { title: "Freelance Planners", desc: "Build your personal travel brand.", icon: UserCheck },
              { title: "Trek Leaders", desc: "Organize trekking experiences effortlessly.", icon: Mountain },
              { title: "Camping Organizers", desc: "Manage camps and participants.", icon: Tent },
              { title: "Adventure Tours", desc: "Publish thrilling experiences & activities.", icon: Compass },
              { title: "Road Trip Experts", desc: "Create memorable road adventures.", icon: Route },
              { title: "Backpacking Communities", desc: "Build backpacking communities & trips.", icon: Users },
              { title: "Corporate Managers", desc: "Handle business travel client records.", icon: Briefcase }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="bg-[#0e1727] border border-cyan/[0.06] hover:border-cyan/50 rounded-[20px] p-6 text-left space-y-4 cursor-pointer transition-all flex flex-col justify-between group hover:shadow-[0_0_25px_rgba(0,212,255,0.08)]"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-11 h-11 rounded-[14px] bg-transparent border border-cyan/30 flex items-center justify-center text-cyan group-hover:scale-105 transition-transform duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-base tracking-wide">{item.title}</h4>
                  <p className="text-xs text-white/50 leading-relaxed font-normal">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 5: HOW BEACON WORKS
          ==================================================== */}
      <section ref={howItWorksRef} className="py-28 bg-[#040817] border-y border-white/5 px-6 lg:px-8 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto text-center space-y-4 mb-24">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)]">
            How Beacon Works
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            From itinerary creation to direct payments, we simplify every step of your travel operations.
          </p>
        </div>

        {/* Workflow timeline grid with connecting animated lines */}
        <div className="max-w-6xl mx-auto relative px-4">
          
          {/* Timeline connecting lines */}
          <div className="absolute top-7 left-4 right-4 h-[1px] bg-white/5 hidden lg:block z-0">
            <motion.div 
              className="h-full bg-cyan glow-cyan-sm"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 gap-8 relative z-10">
            {[
              { label: "Create Package", desc: "Design day schedules", icon: Package },
              { label: "Publish", desc: "Live on catalog", icon: Globe },
              { label: "Discovers", desc: "Travelers find trips", icon: Route },
              { label: "Booking Recd", desc: "Instant requests", icon: Calendar },
              { label: "Pay Deposit", desc: "UPI Checkout", icon: CreditCard },
              { label: "Verify Pay", desc: "1-Click approval", icon: ShieldCheck },
              { label: "Trip Begins", desc: "Track departures", icon: MapPin },
              { label: "Review Trip", desc: "Build reputations", icon: Star },
              { label: "Grow Biz", desc: "Scale business", icon: Sparkles }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
                <div className="w-14 h-14 rounded-full bg-[#080d21] border-2 border-white/10 group-hover:border-cyan flex items-center justify-center text-white/70 group-hover:text-cyan shadow-lg transition-colors duration-300 relative z-10 bg-gradient-to-b from-[#0e1732] to-[#040817] group-hover:shadow-[0_0_15px_rgba(0,203,224,0.3)]">
                  <item.icon className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan text-navy font-bold text-[10px] flex items-center justify-center border border-[#020617]">{idx + 1}</div>
                </div>
                <div className="space-y-0.5">
                  <h5 className="font-bold text-white text-xs whitespace-nowrap">{item.label}</h5>
                  <p className="text-[10px] text-white/50 leading-tight">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 6: EVERYTHING YOU NEED
          ==================================================== */}
      <section ref={featuresRef} className="py-28 px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Feature Checklist */}
          <div className="lg:col-span-5 text-left space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight font-[family-name:var(--font-heading)]">
              Everything You Need <br /> To Grow Your Business
            </h2>
            <p className="text-base text-white/60">
              Stop combining emails, WhatsApp threads, bank statements, and Excel sheets. Beacon centralizes your entire operational pipeline.
            </p>

            <ul className="space-y-4">
              {[
                "Unlimited Travel Itinerary Creation",
                "Advanced Bookings & Payments CRM",
                "Traveler Inquiry live chat simulator",
                "Instant UPI Payouts and verification logs",
                "Branded automatic e-receipt PDF generator",
                "Unified traveler details and travel history logs",
                "Interactive Revenue Graphs and sales charts",
                "Operational metrics and planner ratings",
                "Optimized responsive layouts for mobile planners"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-white/80">
                  <div className="w-5 h-5 rounded-full bg-cyan/20 border border-cyan/30 flex items-center justify-center text-cyan shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Dashboard Widget Preview (Detailed Stats Display) */}
          <div className="lg:col-span-7 bg-[#0c1329] border border-white/10 rounded-[24px] p-6 shadow-2xl relative glow-cyan-sm text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <h3 className="font-bold text-white text-sm">Analytics & Sales Dossier</h3>
              <span className="text-[10px] text-white/40">Real-Time Sync active</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box A: Packages Share */}
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3">
                <p className="text-xs font-bold text-white/80">Popular Packages</p>
                <div className="space-y-2">
                  {[
                    { name: "Goa Beach Escape", share: 45, color: "bg-cyan" },
                    { name: "Kashmir Paradise Trek", share: 30, color: "bg-[#008CFF]" },
                    { name: "Maldives Bliss Stay", share: 25, color: "bg-white/20" }
                  ].map((pkg, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-white/60">{pkg.name}</span>
                        <span className="text-white font-mono">{pkg.share}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${pkg.color}`} style={{ width: `${pkg.share}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box B: Payments Overview */}
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-4">
                <p className="text-xs font-bold text-white/80">Inquiry Distribution</p>
                <div className="flex items-center justify-center py-2">
                  {/* Mock Donut Chart */}
                  <div className="w-20 h-20 rounded-full border-[8px] border-cyan flex items-center justify-center relative border-t-[#008CFF] border-r-white/20">
                    <div className="text-center">
                      <span className="text-xs font-extrabold text-white">128</span>
                      <p className="text-[8px] text-white/40 uppercase">leads</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-white/60">
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-cyan" /> Confirmed (68)</span>
                  <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#008CFF]" /> Pending (32)</span>
                </div>
              </div>

              {/* Box C: Sales Analytics */}
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-3 md:col-span-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">Revenue This Month</span>
                  <span className="text-cyan font-semibold">₹2,48,000</span>
                </div>
                <div className="grid grid-cols-12 gap-1.5 h-16 items-end pt-2">
                  {[30, 45, 25, 60, 50, 75, 40, 65, 80, 55, 70, 95].map((val, idx) => (
                    <div key={idx} className="col-span-1 h-full flex flex-col justify-end">
                      <div className="w-full bg-cyan/20 hover:bg-cyan rounded-t-sm transition-colors cursor-pointer" style={{ height: `${val}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================
          SECTION 7: PACKAGE BUILDER
          ==================================================== */}
      <section className="py-28 bg-[#040817] border-y border-white/5 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)]">
              Create Professional Travel Packages In Minutes
            </h2>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
              Our dynamic editor takes the friction out of trip coordination. Watch how it builds:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Steps Description List */}
            <div className="lg:col-span-5 space-y-4 text-left">
              {[
                { step: 1, title: "Select Package Type", desc: "Choose Holiday, Trekking, Camping, Road Trip, or Custom Experience." },
                { step: 2, title: "Fill Details", desc: "Build day-by-day itineraries, add daily meal logs, and outline activity tags." },
                { step: 3, title: "Upload Media", desc: "Add premium cover photos and gallery shots of your destinations." },
                { step: 4, title: "Set Pricing", desc: "Establish base pricing, discount tiers, and custom deposit ratios." },
                { step: 5, title: "Publish", desc: "Publish instantly to make your package searchable in the traveler catalog." }
              ].map((item) => (
                <button
                  key={item.step}
                  onClick={() => setWizardStep(item.step)}
                  className={`w-full p-4 rounded-[16px] text-left transition-all border flex items-center gap-4 cursor-pointer ${
                    wizardStep === item.step
                      ? 'bg-cyan/10 border-cyan/40 shadow-lg'
                      : 'bg-transparent border-transparent hover:bg-white/[0.02]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                    wizardStep === item.step
                      ? 'bg-cyan text-navy'
                      : 'bg-white/10 text-white/60'
                  }`}>
                    {item.step}
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${wizardStep === item.step ? 'text-cyan' : 'text-white/80'}`}>{item.title}</h4>
                    <p className="text-[11px] text-white/50 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Form Wizard Preview Panel */}
            <div className="lg:col-span-7 bg-[#0c1329] border border-white/10 rounded-[24px] p-6 shadow-2xl relative overflow-hidden aspect-[1.5] text-left glow-cyan-sm flex flex-col justify-between">
              
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs font-bold text-white/60">New Package Editor</span>
                <span className="text-[10px] font-bold text-cyan bg-cyan/15 px-2.5 py-0.5 rounded-full">Step {wizardStep} of 5</span>
              </div>

              {/* Steps views */}
              <div className="flex-1 py-6 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {wizardStep === 1 && (
                    <motion.div 
                      key="w-step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="text-base font-bold text-white">1. Select Package Type</h4>
                      <p className="text-xs text-white/60">Choose a default layout theme tailored to your activity type:</p>
                      <div className="grid grid-cols-3 gap-3">
                        {["Holiday", "Trekking", "Camping", "Road Trip", "Adventure", "Custom"].map((cat) => (
                          <div key={cat} className={`p-3 rounded-xl border text-center font-bold text-xs cursor-pointer transition-colors ${cat === 'Trekking' ? 'border-cyan bg-cyan/10 text-cyan' : 'border-white/10 bg-white/5 text-white/70'}`}>
                            {cat}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 2 && (
                    <motion.div 
                      key="w-step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-3"
                    >
                      <h4 className="text-base font-bold text-white">2. Fill Trip Details</h4>
                      <div className="space-y-2.5">
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                          <span className="text-[10px] text-cyan font-bold block mb-1">Itinerary Day 1</span>
                          <span className="text-xs text-white font-semibold block">Arrival in Manali & Basecamp briefing</span>
                          <span className="text-[10px] text-white/50 block mt-1">Activities: Acclimatization walk, Gear inspection</span>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg opacity-60">
                          <span className="text-[10px] text-white/40 font-bold block mb-1">Itinerary Day 2</span>
                          <span className="text-xs text-white/60 font-semibold block">Trek to Solang Valley base camp</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 3 && (
                    <motion.div 
                      key="w-step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="text-base font-bold text-white">3. Upload Media & Covers</h4>
                      <div className="h-28 border-2 border-dashed border-white/20 hover:border-cyan/50 rounded-xl flex flex-col items-center justify-center gap-2 bg-white/5 cursor-pointer transition-colors">
                        <Globe className="w-6 h-6 text-white/40" />
                        <span className="text-xs text-white/60">Drag and drop package banner images here</span>
                        <span className="text-[10px] text-white/40">PNG, JPG format accepted (Max 5MB)</span>
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 4 && (
                    <motion.div 
                      key="w-step-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="text-base font-bold text-white">4. Customize Pricing & Deposit</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                          <span className="text-[9px] text-white/40 font-bold uppercase">Base Package Price</span>
                          <span className="text-sm font-bold text-white block mt-1">₹18,500</span>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                          <span className="text-[9px] text-white/40 font-bold uppercase">Required Advance Deposit</span>
                          <span className="text-sm font-bold text-cyan block mt-1">30% (₹5,550)</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {wizardStep === 5 && (
                    <motion.div 
                      key="w-step-5"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center space-y-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-cyan/20 text-cyan flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,203,224,0.3)] border border-cyan/30">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="text-base font-extrabold text-white">✨ Package Published Successfully!</h4>
                      <p className="text-xs text-white/60 max-w-xs mx-auto">
                        Your package is now live on the consumer portal and indexed for travelers search query routing.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Progress Indicator */}
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-cyan glow-cyan-sm"
                  key={wizardStep}
                  initial={{ width: 0 }}
                  animate={{ width: `${wizardStep * 20}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 8: HOW YOU EARN
          ==================================================== */}
      <section className="py-28 px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)]">
            You Focus On Travel. We Help You Grow.
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            You maintain complete autonomy over your trips. Beacon simplifies the operations and scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              title: "You Choose Pricing",
              desc: "You have 100% control over package margins, discounts, deposit ratios, and refund policies. We never dictate your pricing structure."
            },
            {
              title: "Direct Client Routing",
              desc: "Payments bypass intermediate escrow accounts. Travelers transfer funds directly to your bank account or UPI ID. You retain full liquidity."
            },
            {
              title: "Operation Simplification",
              desc: "Manage chat inquiries, generate professional receipts, verify mobile transactions, and handle traveler registries from a single login."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-[24px] p-8 text-left space-y-4">
              <h4 className="text-lg font-bold text-white tracking-wide border-b border-white/5 pb-2">{item.title}</h4>
              <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          SECTION 9: FEATURE COMPARISON
          ==================================================== */}
      <section className="py-28 bg-[#040817] border-y border-white/5 px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)]">
              Stop Managing Everything Manually
            </h2>
            <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
              Compare the manual coordination struggles against a professional planning workspace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Box Left: Traditional Chaos */}
            <div className="bg-[#0b1329]/20 border border-white/5 rounded-[24px] p-6 space-y-6">
              <h4 className="font-bold text-red-400 text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Traditional Chaos
              </h4>
              <ul className="space-y-4 text-left">
                {[
                  "Excel sheets that easily get corrupted or duplicated",
                  "Scattered WhatsApp chat threads that lose traveler data",
                  "Manual banking checks to verify UTR and screenshot receipts",
                  "Word documents for day itineraries that look unprofessional",
                  "Paper receipts or handwritten statements for travelers",
                  "No visual data tracking for monthly agency revenue"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-white/55">
                    <X className="w-4 h-4 text-red-500/80 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box Right: Beacon Planner */}
            <div className="bg-[#0b1329]/50 border border-cyan/20 rounded-[24px] p-6 space-y-6 shadow-[0_0_30px_rgba(0,203,224,0.05)]">
              <h4 className="font-bold text-cyan text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan" />
                Beacon Planner
              </h4>
              <ul className="space-y-4 text-left">
                {[
                  "Central Dashboard with package analytics and traveler records",
                  "Unified Inquiry CRM with chat threads and client details",
                  "Simple payment verification status with automated matching",
                  "Visual package builder with itinerary and meal logs",
                  "Branded transaction e-receipt PDFs emailed instantly",
                  "Detailed charts for sales, margins, and coordinator efficiency"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-cyan shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 10: SUCCESS STORIES
          ==================================================== */}
      <section className="py-28 px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)]">
            Trusted By Growing Travel Businesses
          </h2>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto">
            Read stories from verified tour agency operators and solo trek coordinators.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div key={idx} className="bg-white/[0.02] border border-white/5 rounded-[24px] p-8 text-left space-y-6 flex flex-col justify-between relative hover:border-cyan/30 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-cyan text-cyan" />
                  ))}
                </div>
                <p className="text-sm text-white/70 italic leading-relaxed">"{item.quote}"</p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full object-cover border border-white/10" src={item.avatar} alt={item.name} />
                  <div>
                    <h5 className="font-bold text-white text-xs">{item.name}</h5>
                    <p className="text-[10px] text-white/40">{item.company} · {item.role}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-cyan bg-cyan/10 border border-cyan/15 px-2 py-0.5 rounded-full">{item.metrics}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================
          SECTION 11: FAQ
          ==================================================== */}
      <section ref={faqRef} className="py-28 bg-[#040817] border-y border-white/5 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-[family-name:var(--font-heading)]">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-white/60">
              Clear answers to help you start hosting packages on Beacon.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-[#0b1329]/40 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.01]"
                >
                  <span className="font-bold text-white text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${activeFaq === idx ? 'rotate-180 text-cyan' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/5"
                    >
                      <div className="px-6 py-5 text-xs sm:text-sm text-white/60 leading-relaxed text-left">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 12: FINAL CTA
          ==================================================== */}
      <section ref={registrationRef} className="py-32 px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-[32px] bg-gradient-to-r from-cyan/15 via-teal/5 to-[#0b1329] border border-cyan/20 p-8 sm:p-16 overflow-hidden text-center space-y-8 shadow-[0_0_50px_rgba(0,203,224,0.08)]">
          
          {/* Mountains outline background silhouette */}
          <div className="absolute bottom-0 left-0 right-0 h-40 opacity-10 pointer-events-none z-0 select-none">
            <svg className="w-full h-full text-cyan" viewBox="0 0 1440 320" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0,280 L200,100 L400,240 L650,80 L900,220 L1150,120 L1440,290 L1440,320 L0,320 Z" fill="currentColor" opacity="0.3" />
              <path d="M150,280 L350,180 L600,290 L850,150 L1100,270 L1300,190 L1440,280" />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none font-[family-name:var(--font-heading)]">
              Ready To Grow Your <br /> Travel Business?
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto font-normal">
              Join Beacon Planner today and start reaching more travellers with powerful business tools.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button glow onClick={handleBecomePlanner} className="w-full sm:w-auto py-4 px-8 bg-cyan text-navy font-bold text-base rounded-[14px]">
                Become a Planner
              </Button>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto py-4 px-8 border-white/20 text-white hover:bg-white/5 text-base font-semibold rounded-[14px]">
                  Schedule Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          SECTION 13: FOOTER
          ==================================================== */}
      <footer className="bg-[#01030a] border-t border-white/5 pt-20 pb-12 px-6 lg:px-8 relative z-10 text-left">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            
            {/* Logo and Tagline */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-cyan/15 flex items-center justify-center border border-cyan/20">
                  <Compass className="w-4.5 h-4.5 text-cyan" />
                </div>
                <span className="text-base font-bold tracking-tight text-white font-[family-name:var(--font-heading)]">
                  Beacon <span className="text-cyan font-medium">Planner</span>
                </span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed max-w-sm">
                The all-in-one platform for travel planners to manage packages, verify payments, and scale operations.
              </p>
              <div className="text-xs font-bold text-cyan/70 tracking-widest uppercase">"Life Beyond Routine"</div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-2 space-y-4">
              <h5 className="text-[11px] font-bold text-cyan uppercase tracking-wider">Platform</h5>
              <ul className="space-y-2 text-xs text-white/50">
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-cyan transition-colors">Overview</button></li>
                <li><button onClick={() => scrollToSection(featuresRef)} className="hover:text-cyan transition-colors">Features</button></li>
                <li><button onClick={() => scrollToSection(pricingRef)} className="hover:text-cyan transition-colors">Pricing</button></li>
                <li><button onClick={handleBecomePlanner} className="hover:text-cyan transition-colors text-cyan">Become a Planner</button></li>
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h5 className="text-[11px] font-bold text-cyan uppercase tracking-wider">Resources</h5>
              <ul className="space-y-2 text-xs text-white/50">
                <li><Link to="/about" className="hover:text-cyan transition-colors">Blog & Guides</Link></li>
                <li><Link to="/about" className="hover:text-cyan transition-colors">Help Center</Link></li>
                <li><Link to="/about" className="hover:text-cyan transition-colors">Webinars</Link></li>
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-4">
              <h5 className="text-[11px] font-bold text-cyan uppercase tracking-wider">Stay Connected</h5>
              <p className="text-xs text-white/50 leading-relaxed">
                Subscribe to our operational alerts newsletter.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="planner@agency.com" 
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan" 
                />
                <Button size="sm" glow className="px-4 text-xs font-bold bg-cyan text-navy rounded-lg">Join</Button>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-white/30">
            <p>&copy; {new Date().getFullYear()} Beacon Planner. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/about" className="hover:text-cyan transition-colors">Privacy Policy</Link>
              <Link to="/about" className="hover:text-cyan transition-colors">Terms of Service</Link>
              <Link to="/contact" className="hover:text-cyan transition-colors">Contact Support</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
