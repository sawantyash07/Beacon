import { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { TopNav } from './TopNav'
import { X, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

interface PaymentAlarm {
  id: string
  title: string
  category: string
  bookingId: string
  amount: string
  customerName: string
  time: string
  type: 'started' | 'verification'
  attemptId: string
}

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [alarms, setAlarms] = useState<PaymentAlarm[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    // Expose window.triggerTestAlarm globally for easy demo verification in Planner console
    (window as any).triggerTestAlarm = (type: 'started' | 'verification' = 'started', amount = '₹12,500') => {
      const bookingId = `BKG-${Math.floor(1000 + Math.random() * 9000)}`
      const customerName = "Rahul Sharma"
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      const attemptId = `PAY-${Math.floor(10000 + Math.random() * 90000)}`

      // Synthesize tone locally in client to ensure audio warnings fire perfectly
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
        const playTone = (freq: number, oscType: OscillatorType, duration: number, delay: number) => {
          setTimeout(() => {
            const osc = audioCtx.createOscillator()
            const gain = audioCtx.createGain()
            osc.connect(gain)
            gain.connect(audioCtx.destination)
            osc.type = oscType
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime)
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration - 0.05)
            osc.start()
            osc.stop(audioCtx.currentTime + duration)
          }, delay * 1000)
        }

        if (type === 'started') {
          // Double beeps (notification sound)
          playTone(523.25, 'sine', 0.15, 0) // C5
          playTone(659.25, 'sine', 0.25, 0.12) // E5
        } else {
          // Double warning alerts (alarm sound)
          playTone(493.88, 'triangle', 0.2, 0) // B4
          playTone(493.88, 'triangle', 0.2, 0.25) // B4
        }
      } catch (err) {
        console.error('AudioContext synth alert failed:', err)
      }

      // Voice Text-to-Speech (TTS) Announcement
      if ('speechSynthesis' in window) {
        const voiceMsg = new SpeechSynthesisUtterance()
        const amountText = amount.replace('₹', '').replace(',', ' ')
        if (type === 'started') {
          voiceMsg.text = `Beacon payment alert. A payment of ${amountText} rupees has been initiated by ${customerName}.`
        } else {
          voiceMsg.text = `Beacon warning. Customer ${customerName} has completed payment of ${amountText} rupees for booking ${bookingId}. Approval required.`
        }
        voiceMsg.rate = 0.95
        voiceMsg.volume = 1
        
        // Match standard English dialects if available
        const voices = window.speechSynthesis.getVoices()
        const matchVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('en-GB') || v.lang.includes('en-US'))
        if (matchVoice) {
          voiceMsg.voice = matchVoice
        }
        window.speechSynthesis.speak(voiceMsg)
      }

      const newAlarm: PaymentAlarm = {
        id: `alarm-${Date.now()}-${Math.random()}`,
        title: type === 'started' ? "🔔 PAYMENT IN PROGRESS" : "⚠️ VERIFICATION REQUIRED",
        category: type === 'started' ? "Payment Started" : "Verification Needed",
        bookingId,
        amount,
        customerName,
        time: timeStr,
        type,
        attemptId
      }

      setAlarms(prev => [...prev, newAlarm])

      // Auto-expire popup in 12 seconds
      setTimeout(() => {
        setAlarms(prev => prev.filter(a => a.id !== newAlarm.id))
      }, 12000)
    }

    // Check for parameter flags in url e.g. ?test_alarm=started
    const params = new URLSearchParams(window.location.search)
    const testFlag = params.get('test_alarm')
    if (testFlag === 'started' || testFlag === 'verification') {
      const amountParam = params.get('amount') || '₹12,500'
      const timer = setTimeout(() => {
        (window as any).triggerTestAlarm(testFlag as 'started' | 'verification', amountParam)
        
        // Remove parameter from URL to keep address bar tidy
        const newUrl = window.location.pathname + window.location.hash
        window.history.replaceState({}, '', newUrl)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-page">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav onMenuClick={() => setMobileOpen(true)} />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto"
        >
          <Outlet />
        </motion.main>
      </div>

      {/* Real-time B2B Payment Alarm Overlay Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {alarms.map(alarm => (
            <motion.div
              key={alarm.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className={`p-5 rounded-[24px] backdrop-blur-xl border relative overflow-hidden pointer-events-auto w-full transition-all duration-300 ${
                alarm.type === 'started'
                  ? 'bg-white/90 border-cyan/30 shadow-[0_8px_30px_rgba(0,212,255,0.08)]'
                  : 'bg-white/90 border-amber-500/30 shadow-[0_8px_30px_rgba(245,158,11,0.08)]'
              }`}
            >
              {/* Radial glow background shapes */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-xl pointer-events-none" />

              <div className="flex justify-between items-start mb-3">
                <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${
                  alarm.type === 'started'
                    ? 'text-cyan bg-cyan/10 border-cyan/20'
                    : 'text-amber-500 bg-amber-500/10 border-amber-500/20'
                }`}>
                  {alarm.title}
                </span>

                <button
                  type="button"
                  onClick={() => setAlarms(prev => prev.filter(a => a.id !== alarm.id))}
                  className="text-muted hover:text-navy hover:bg-page p-1 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Amount Display */}
              <div className="text-3xl font-extrabold text-teal font-mono mb-2">
                {alarm.amount}
              </div>

              {/* Description body */}
              <div className="text-xs text-muted leading-relaxed mb-4">
                Customer <span className="text-navy font-bold">{alarm.customerName}</span> has {alarm.type === 'started' ? 'started payment check' : 'submitted payment confirmation'} for booking <span className="font-mono font-bold text-navy">{alarm.bookingId}</span>.
                <span className="block mt-1 font-mono text-[10px]">Time: {alarm.time}</span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2.5">
                {alarm.type === 'verification' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        toast.success(`Payment verified successfully for ${alarm.bookingId}`)
                        setAlarms(prev => prev.filter(a => a.id !== alarm.id))
                        navigate('/dashboard/bookings')
                      }}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold text-[11px] py-2 px-3 rounded-lg transition-colors cursor-pointer text-center"
                    >
                      ✓ Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        toast.error(`Payment marked unverified for ${alarm.bookingId}`)
                        setAlarms(prev => prev.filter(a => a.id !== alarm.id))
                      }}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold text-[11px] py-2 px-3 rounded-lg transition-colors cursor-pointer text-center"
                    >
                      ✕ Reject
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setAlarms(prev => prev.filter(a => a.id !== alarm.id))
                      navigate('/dashboard/bookings')
                    }}
                    className="flex-1 bg-cyan hover:bg-cyan/90 text-navy font-extrabold text-[11px] py-2 px-3 rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
                  >
                    <span>View Booking Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Visual Timeout Progress Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/25">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 12, ease: 'linear' }}
                  className={`h-full ${alarm.type === 'started' ? 'bg-cyan' : 'bg-amber-500'}`}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
