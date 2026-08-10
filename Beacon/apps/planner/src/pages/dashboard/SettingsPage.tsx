import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Bell, Lock, Shield, Eye, Users, Languages, Key, RefreshCw, Save } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ToggleCard } from '@/components/ui/ToggleCard'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'security' | 'team'>('notifications')
  
  // Notification configurations
  const [notifConfig, setNotifConfig] = useState({
    emailInquiries: true,
    emailBookings: true,
    whatsappBookings: true,
    smsReminders: false,
    dailyDigest: true
  })

  // Team list
  const [team, setTeam] = useState([
    { id: 'tm-1', name: 'Aarav Sharma', email: 'aarav@beaconplanner.com', role: 'Owner', active: true },
    { id: 'tm-2', name: 'Pooja Hegde', email: 'pooja.h@beaconplanner.com', role: 'Assistant Planner', active: true },
    { id: 'tm-3', name: 'Kabir Kapoor', email: 'kabir@beaconplanner.com', role: 'Operations Lead', active: false }
  ])

  const handleSave = () => {
    toast.success('Settings configuration updated successfully!')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy">Settings</h1>
        <p className="text-muted text-sm mt-1">Configure notification channels, workspace credentials, team roles, and system preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Settings Navigation Menu */}
        <div className="md:col-span-1 space-y-1">
          {[
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security & Login', icon: Lock },
            { id: 'team', label: 'Team Members', icon: Users }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[12px] text-xs font-semibold uppercase tracking-wider text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-teal/10 text-teal border-l-2 border-teal'
                    : 'text-muted hover:bg-border/30 hover:text-navy'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Contents */}
        <div className="md:col-span-3 space-y-6">
          
          {/* TAB 1: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <Card className="p-6 border border-border space-y-6">
                <div>
                  <h3 className="font-bold text-navy text-base">Communication Channels</h3>
                  <p className="text-xs text-muted mt-0.5">Define which channels Beacon should notify you on for customer action events.</p>
                </div>
                
                <div className="space-y-3">
                  <ToggleCard
                    title="Email Alerts on Enquiries"
                    description="Receive copy of inquiries instantly in inbox"
                    checked={notifConfig.emailInquiries}
                    onChange={() => setNotifConfig(p => ({ ...p, emailInquiries: !p.emailInquiries }))}
                  />
                  <ToggleCard
                    title="Email Alerts on Bookings"
                    description="Receive copy of voucher confirmations in inbox"
                    checked={notifConfig.emailBookings}
                    onChange={() => setNotifConfig(p => ({ ...p, emailBookings: !p.emailBookings }))}
                  />
                  <ToggleCard
                    title="WhatsApp Integration Alerts"
                    description="Auto-send itinerary receipts & traveler group updates"
                    checked={notifConfig.whatsappBookings}
                    onChange={() => setNotifConfig(p => ({ ...p, whatsappBookings: !p.whatsappBookings }))}
                  />
                  <ToggleCard
                    title="SMS Notifications"
                    description="Standard carrier texts for payment delays"
                    checked={notifConfig.smsReminders}
                    onChange={() => setNotifConfig(p => ({ ...p, smsReminders: !p.smsReminders }))}
                  />
                  <ToggleCard
                    title="Daily Summary Digest"
                    description="Consolidated report of daily activity sent at 9 PM"
                    checked={notifConfig.dailyDigest}
                    onChange={() => setNotifConfig(p => ({ ...p, dailyDigest: !p.dailyDigest }))}
                  />
                </div>

                <div className="flex justify-end pt-4 border-t border-border/5">
                  <Button glow onClick={handleSave} className="px-6 py-2.5">
                    <Save className="w-4 h-4 mr-2" /> Save Configurations
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* TAB 2: SECURITY */}
          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <Card className="p-6 border border-border space-y-6">
                <div>
                  <h3 className="font-bold text-navy text-base">Reset Password</h3>
                  <p className="text-xs text-muted mt-0.5">Protect credentials with a secure combination password.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-navy">Current Password</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-navy">New Password</label>
                    <Input type="password" placeholder="Min. 8 characters" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button size="sm" variant="outline" onClick={() => toast.success('Password update token generated!')}>
                    Update Password
                  </Button>
                </div>
              </Card>

              <Card className="p-6 border border-border space-y-6">
                <div>
                  <h3 className="font-bold text-navy text-base flex items-center gap-2"><Shield className="w-5 h-5 text-teal" /> Two-Factor Authentication (2FA)</h3>
                  <p className="text-xs text-muted mt-0.5">Require multi-token mobile app login codes for withdrawals and credential modifications.</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-semibold text-xs text-navy block">Google Authenticator Setup</span>
                    <span className="text-[11px] text-muted block">Protect deposits with dynamic authentication</span>
                  </div>
                  <Button size="sm" onClick={() => toast.info('Loading 2FA setup wizard...')}>Enable 2FA</Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* TAB 3: TEAM MEMBERS */}
          {activeTab === 'team' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <Card className="p-6 border border-border space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-bold text-navy text-base">Workspace Seats</h3>
                    <p className="text-xs text-muted mt-0.5">Assign assistant permissions and crew logins for guide tasks.</p>
                  </div>
                  <Button size="sm" onClick={() => toast.success('Workspace seat invitation email sent!')}>Add Member</Button>
                </div>

                <div className="space-y-3">
                  {team.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 rounded-[12px] border border-border hover:border-teal/20 transition-all text-xs">
                      <div>
                        <span className="font-semibold text-navy block">{member.name}</span>
                        <span className="text-[10px] text-muted block font-mono">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={member.role === 'Owner' ? 'default' : 'muted'} className="text-[9px] py-0.5 px-2">
                          {member.role}
                        </Badge>
                        <span className={member.active ? 'text-teal font-semibold' : 'text-muted'}>
                          {member.active ? 'Active' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

        </div>

      </div>

    </div>
  )
}
