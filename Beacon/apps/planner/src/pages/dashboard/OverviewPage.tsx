import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { 
  Home, Mail, Package, Calendar, CreditCard, Users, Plane, 
  BarChart3, Star, Share2, Building2, Settings, Sparkles, CheckSquare, 
  ArrowRight, ShieldCheck, MessageSquare, AlertCircle, PlusCircle, Check,
  Bus, ShieldAlert
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { activityFeed } from '@/data/mockData'
import { formatRelativeTime, formatCurrency } from '@/lib/utils'
import { toast } from 'sonner'
import { fetchStats, fetchOrganizerProfile } from '@/services/api'
import { useAuth } from '@/context/AuthContext'
import { VerificationPromptModal } from '@/components/dashboard/VerificationPromptModal'

export default function OverviewPage() {
  const navigate = useNavigate()
  const { user, kycStatus, isKycVerified } = useAuth()
  const [verifiedPayments, setVerifiedPayments] = useState<string[]>([])
  const [paymentActive, setPaymentActive] = useState<boolean>(true)
  const [showVerificationModal, setShowVerificationModal] = useState<boolean>(false)
  const [modalReason, setModalReason] = useState<'POST_LOGIN' | 'CREATE_PACKAGE_BLOCKED'>('POST_LOGIN')
  const [stats, setStats] = useState<any>({
    packages: 0,
    bookings: 0,
    pendingPayments: 0,
    newInquiries: 0,
    supportTickets: 0,
    monthlyEarnings: 0
  })
  const [loading, setLoading] = useState(true)

  // Trigger post-login popup if eKYC is incomplete and not yet shown this session
  useEffect(() => {
    if (user && !isKycVerified) {
      const storageKey = `beacon_modal_shown_${user.email || user.id}`
      const hasBeenShown = sessionStorage.getItem(storageKey)
      if (!hasBeenShown) {
        setModalReason('POST_LOGIN')
        setShowVerificationModal(true)
        sessionStorage.setItem(storageKey, 'true')
      }
    }
  }, [user, isKycVerified])

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchStats(user?.id);
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    }
    const checkPaymentSetup = async () => {
      try {
        const res = await fetchOrganizerProfile();
        if (res && res.phonepeDetails) {
          setPaymentActive(res.phonepeDetails.activationStatus === 'ACTIVE');
        } else {
          setPaymentActive(false);
        }
      } catch (err) {
        console.error('Failed to check payment credentials', err);
        setPaymentActive(true); // Don't show warning on local network fallback
      }
    };

    if (user?.id) {
      loadStats();
      checkPaymentSetup();
    }
  }, [user?.id]);

  const handleVerifyPayment = (id: string, amount: string) => {
    setVerifiedPayments(prev => [...prev, id])
    toast.success(`Payment of ${amount} verified and approved successfully!`)
  }

  const handleCreatePackageAction = (e: React.MouseEvent) => {
    if (!isKycVerified) {
      e.preventDefault()
      setModalReason('CREATE_PACKAGE_BLOCKED')
      setShowVerificationModal(true)
    } else {
      navigate('/dashboard/packages/create')
    }
  }

  return (
    <div className="space-y-6">
      {/* Verification Prompt Modal */}
      <VerificationPromptModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        reason={modalReason}
      />
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
            Home <span className="text-xs font-normal text-muted bg-teal/10 text-teal px-2.5 py-0.5 rounded-full border border-teal/20">Command Center</span>
          </h1>
          <p className="text-muted text-sm mt-1">Welcome back! Here is your daily operational priority list.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreatePackageAction} glow size="sm">
            <PlusCircle className="w-4 h-4 mr-1.5" /> Create Package
          </Button>
        </div>
      </div>

      {/* KYC Incomplete Banner */}
      {!isKycVerified && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-cyan/10 border border-amber-500/30 rounded-[16px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-[10px] bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-navy">eKYC & Document Verification Pending</h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 uppercase tracking-wider">
                  {kycStatus === 'UNDER_REVIEW' ? 'Under Review' : 'Action Required'}
                </span>
              </div>
              <p className="text-[11px] text-muted mt-0.5">
                Complete your identity and business document verification to unlock package publishing, verified badge, and direct traveler payouts.
              </p>
            </div>
          </div>
          <Link to="/dashboard/business-profile?step=10">
            <Button size="xs" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-[11px] tracking-wide py-2 px-4 shadow-sm">
              Complete eKYC Now →
            </Button>
          </Link>
        </motion.div>
      )}

      {/* Warning Alert Banner */}
      {isKycVerified && !paymentActive && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-[16px] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-navy">Online Payments Disabled</h4>
              <p className="text-[11px] text-muted mt-0.5">You have not completed your PhonePe KYC or credential settings yet. Travelers will not be able to checkout or pay for your packages.</p>
            </div>
          </div>
          <Link to="/dashboard/business-profile">
            <Button size="xs" className="bg-yellow-500 hover:bg-yellow-600 text-navy font-bold text-[10px] uppercase tracking-wider py-1.5 px-3">
              Configure PhonePe Details
            </Button>
          </Link>
        </motion.div>
      )}

      {/* Today's Priorities summary widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/dashboard/inquiries" className="block transition-transform hover:scale-[1.01]">
          <Card hover className="p-4 border border-border h-full">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-muted block font-semibold uppercase tracking-wide">New Enquiries</span>
                <p className="text-2xl font-bold text-navy mt-1">{stats.newInquiries} Unread</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-teal/10 flex items-center justify-center text-teal">
                <Mail className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[10px] text-teal block mt-2 font-medium">Avg. response rate: 98%</span>
          </Card>
        </Link>

        <Link to="/dashboard/payments" className="block transition-transform hover:scale-[1.01]">
          <Card hover className="p-4 border border-border h-full">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-muted block font-semibold uppercase tracking-wide">Pending Payments</span>
                <p className="text-2xl font-bold text-navy mt-1">{stats.pendingPayments} Verifications</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-teal/10 flex items-center justify-center text-teal">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[10px] text-yellow-500 block mt-2 font-medium">Action required today</span>
          </Card>
        </Link>

        <Link to="/dashboard/bookings" className="block transition-transform hover:scale-[1.01]">
          <Card hover className="p-4 border border-border h-full">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-muted block font-semibold uppercase tracking-wide">Total Bookings</span>
                <p className="text-2xl font-bold text-navy mt-1">{stats.bookings} Bookings</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-teal/10 flex items-center justify-center text-teal">
                <Plane className="w-4 h-4" />
              </div>
            </div>
            <span className="text-[10px] text-teal block mt-2 font-medium">Monthly Active Travelers</span>
          </Card>
        </Link>

        <Card hover className="p-4 border border-border">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-navy">Monthly Earnings</span>
              <span className="font-extrabold text-navy">{formatCurrency(stats.monthlyEarnings)}</span>
            </div>
            <div className="w-full h-2 bg-page border border-border rounded-full overflow-hidden mt-1.5">
              <div className="h-full bg-teal" style={{ width: '100%' }} />
            </div>
            <span className="text-[10px] text-muted block mt-2">Dynamically loaded from DB</span>
          </div>
        </Card>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Command Priorities (col-span-2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Actions Panel */}
          <Card className="p-5 border border-border">
            <h3 className="font-bold text-navy text-sm mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                type="button"
                onClick={handleCreatePackageAction}
                className="flex flex-col items-center justify-center p-3.5 rounded-[12px] border border-border hover:border-teal/30 hover:bg-teal/5 transition-all text-center group cursor-pointer"
              >
                <Package className="w-5 h-5 text-teal mb-2 group-hover:scale-105 transition-transform" />
                <span className="text-xs font-semibold text-navy">New Package</span>
              </button>
              <Link to="/dashboard/inquiries" className="flex flex-col items-center justify-center p-3.5 rounded-[12px] border border-border hover:border-teal/30 hover:bg-teal/5 transition-all text-center group">
                <Mail className="w-5 h-5 text-teal mb-2 group-hover:scale-105 transition-transform" />
                <span className="text-xs font-semibold text-navy">View Enquiries</span>
              </Link>
              <Link to="/dashboard/payments" className="flex flex-col items-center justify-center p-3.5 rounded-[12px] border border-border hover:border-teal/30 hover:bg-teal/5 transition-all text-center group">
                <CreditCard className="w-5 h-5 text-teal mb-2 group-hover:scale-105 transition-transform" />
                <span className="text-xs font-semibold text-navy">Verify Payments</span>
              </Link>
              <Link to="/dashboard/trip-operations" className="flex flex-col items-center justify-center p-3.5 rounded-[12px] border border-border hover:border-teal/30 hover:bg-teal/5 transition-all text-center group">
                <Bus className="w-5 h-5 text-teal mb-2 group-hover:scale-105 transition-transform" />
                <span className="text-xs font-semibold text-navy">Trip Operations</span>
              </Link>
            </div>
          </Card>

          {/* Pending Payments Verification List */}
          <Card className="p-5 border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-navy text-sm">Pending Payments</h3>
              <Link to="/dashboard/payments" className="text-xs text-teal hover:underline flex items-center gap-1">
                View all payments <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {[
                { id: 'pay-1', client: 'Rohit Kulkarni', trip: 'Kashmir Honeymoon Package', amount: '₹24,500', utr: 'UTR78129038', time: '10m ago' },
                { id: 'pay-2', client: 'Aishwarya Sen', trip: 'Goa Luxury Cruise Tour', amount: '₹18,000', utr: 'UTR99021832', time: '1h ago' }
              ].map((pay) => {
                const isVerified = verifiedPayments.includes(pay.id)
                return (
                  <div key={pay.id} className="flex items-center justify-between p-3 rounded-[12px] border border-border hover:border-teal/20 transition-all text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-navy">{pay.client}</span>
                        <span className="text-[10px] text-muted font-mono">{pay.utr}</span>
                      </div>
                      <p className="text-[11px] text-muted mt-0.5">{pay.trip} · {pay.time}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-navy">{pay.amount}</span>
                      <Button
                        size="sm"
                        variant={isVerified ? 'ghost' : 'outline'}
                        onClick={() => !isVerified && handleVerifyPayment(pay.id, pay.amount)}
                        className={isVerified ? 'text-teal' : 'border-teal/30 hover:bg-teal/5 text-teal'}
                      >
                        {isVerified ? (
                          <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Approved</span>
                        ) : 'Verify'}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* New Enquiries Quick Actions */}
          <Card className="p-5 border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-navy text-sm">New Enquiries</h3>
              <Link to="/dashboard/inquiries" className="text-xs text-teal hover:underline flex items-center gap-1">
                View all enquiries <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {[
                { id: 'enq-1', client: 'Devendra Joshi', details: 'Maldives Overwater Pool Villa · 4 Pax · 5 Nights', date: 'Just now' },
                { id: 'enq-2', client: 'Meghna Roy', details: 'Manali Snow Trek & Camp · 6 Pax · 4 Nights', date: '30m ago' }
              ].map((enq) => (
                <div key={enq.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-[12px] border border-border hover:border-teal/20 transition-all text-xs gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy">{enq.client}</span>
                      <span className="text-[10px] text-muted font-medium">{enq.date}</span>
                    </div>
                    <p className="text-[11px] text-muted mt-0.5">{enq.details}</p>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Button size="sm" variant="ghost" onClick={() => toast.info(`Calling ${enq.client}...`)}>Call</Button>
                    <Button size="sm" variant="outline" onClick={() => toast.success(`Opened WhatsApp dialogue for ${enq.client}!`)}>WhatsApp</Button>
                    <Button size="sm" onClick={() => toast.success(`Converting inquiry to a booking...`)}>Convert</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right Side: Activity & Stats Summary (col-span-1) */}
        <div className="space-y-6">
          
          {/* Small Booking Summary */}
          <Card className="p-5 border border-border text-center">
            <h3 className="font-bold text-navy text-sm mb-4 text-left">Booking Summary</h3>
            <div className="flex items-center justify-center py-2">
              <div className="w-24 h-24 rounded-full border-[10px] border-teal flex items-center justify-center relative border-t-teal/30">
                <div className="text-center">
                  <span className="text-xl font-extrabold text-navy">28</span>
                  <p className="label-caps">Confirmed</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted mt-4 border-t border-border/5 pt-3">
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Confirmed (28)</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pending (8)</span>
            </div>
          </Card>

          {/* Upcoming Departures list */}
          <Card className="p-5 border border-border">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-navy text-sm">Upcoming departures</h3>
              <Link to="/dashboard/trip-operations" className="text-xs text-teal hover:underline">
                View all
              </Link>
            </div>
            
            <div className="space-y-3 text-xs">
              {[
                { title: 'Goa Couple Tour', pax: '18 Travellers', date: 'Tomorrow', crew: 'Guide: Rahul · Driver: Karan' },
                { title: 'Kashmir Paradise Honeymoon', pax: '12 Travellers', date: 'In 3 days', crew: 'Guide: Showkat · Driver: Bilal' }
              ].map((dep, i) => (
                <div key={i} className="p-3 rounded-[12px] border border-border bg-page/50 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-navy">{dep.title}</span>
                    <Badge variant={dep.date === 'Tomorrow' ? 'success' : 'muted'} className="text-[10px] py-0.5 px-2 font-semibold">{dep.date}</Badge>
                  </div>
                  <div className="flex justify-between text-[11px] text-muted">
                    <span>{dep.pax}</span>
                    <span>{dep.crew}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Activity Feed */}
          <Card className="p-5 border border-border">
            <h3 className="font-bold text-navy text-sm mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {activityFeed.slice(0, 4).map((activity) => (
                <div key={activity.id} className="flex gap-2.5 items-start text-xs">
                  <div className="w-2 h-2 rounded-full bg-teal mt-1.5 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-navy leading-tight">{activity.text}</p>
                    <span className="text-[10px] text-muted block font-medium">{formatRelativeTime(activity.time)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>

    </div>
  )
}
