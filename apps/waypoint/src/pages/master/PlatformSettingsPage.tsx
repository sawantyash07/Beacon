import { useState } from 'react'
import { Settings, Sliders, Globe, Key, Save } from 'lucide-react'
import { useMasterAdmin } from '@/context/MasterAdminContext'
import { toast } from 'sonner'

export default function PlatformSettingsPage() {
  const { settings, toggleMaintenanceMode, toggleEmergencyLockdown } = useMasterAdmin()

  const [commissionRate, setCommissionRate] = useState<number>(settings.globalCommissionPercent)
  const [gstPercent, setGstPercent] = useState<number>(settings.gstPercent)
  const [minPayout, setMinPayout] = useState<number>(settings.minPayoutThreshold)

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Global Platform Configurations Updated & Applied Ecosystem-Wide')
  }

  return (
    <div className="space-y-8 font-body font-mono text-xs">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan/20 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-cyan tracking-widest uppercase mb-1">
            <Settings className="w-4 h-4 text-cyan" />
            <span>Beacon Core Configuration</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-heading">
            PLATFORM <span className="text-gradient">SETTINGS</span> & ENGINE
          </h1>
          <p className="text-xs text-cyan-200/70 mt-1">
            Configure financial rules, GST settings, gateway API keys, feature flags & maintenance modes
          </p>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* 1. GLOBAL SYSTEM EMERGENCY SWITCHES */}
        <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan" />
            <span>Emergency System Controls</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-navy/60 border border-cyan/15 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Maintenance Mode</div>
                <div className="text-[11px] text-cyan-300/70">Restrict customer app access for scheduled maintenance</div>
              </div>
              <button
                type="button"
                onClick={toggleMaintenanceMode}
                className={`px-4 py-2 rounded-xl font-bold text-xs ${
                  settings.maintenanceMode ? 'bg-amber-400 text-navy' : 'bg-cyan/10 text-cyan border border-cyan/30'
                }`}
              >
                {settings.maintenanceMode ? 'ENABLED' : 'DISABLED'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-navy/60 border border-red-500/20 flex items-center justify-between">
              <div>
                <div className="font-bold text-red-300">Emergency Lockdown</div>
                <div className="text-[11px] text-red-200/70">Freeze all platform payouts, bookings & transactions</div>
              </div>
              <button
                type="button"
                onClick={toggleEmergencyLockdown}
                className={`px-4 py-2 rounded-xl font-bold text-xs ${
                  settings.emergencyLockdown ? 'bg-red-600 text-white animate-pulse' : 'bg-red-500/10 text-red-300 border border-red-500/30'
                }`}
              >
                {settings.emergencyLockdown ? 'LOCKDOWN ACTIVE' : 'SYSTEM NORMAL'}
              </button>
            </div>
          </div>
        </section>

        {/* 2. FINANCIAL & TAXATION CONFIGURATIONS */}
        <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan" />
            <span>Financial & Tax Rules</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] text-cyan-200/80 mb-1">Global Commission Rate (%)</label>
              <input
                type="number"
                value={commissionRate}
                onChange={(e) => setCommissionRate(Number(e.target.value))}
                className="w-full bg-[#001736] border border-cyan/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] text-cyan-200/80 mb-1">GST Tax Percentage (%)</label>
              <input
                type="number"
                value={gstPercent}
                onChange={(e) => setGstPercent(Number(e.target.value))}
                className="w-full bg-[#001736] border border-cyan/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] text-cyan-200/80 mb-1">Min Planner Payout Threshold (₹)</label>
              <input
                type="number"
                value={minPayout}
                onChange={(e) => setMinPayout(Number(e.target.value))}
                className="w-full bg-[#001736] border border-cyan/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan font-bold"
              />
            </div>
          </div>
        </section>

        {/* 3. API INTEGRATION KEYS & GATEWAYS */}
        <section className="glass-dark p-6 rounded-2xl border border-cyan/30 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan" />
            <span>API Integrations & Third-Party Keys</span>
          </h3>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-navy/60 border border-cyan/15 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Razorpay Payment Gateway API</div>
                <div className="text-[11px] text-emerald-400">Mode: LIVE • Webhook Endpoint Active</div>
              </div>
              <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold">CONNECTED</span>
            </div>

            <div className="p-3.5 rounded-xl bg-navy/60 border border-cyan/15 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Google Maps Distance & Places API Key</div>
                <div className="text-[11px] text-emerald-400">Quota: 42% consumed today</div>
              </div>
              <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold">ACTIVE</span>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal to-cyan text-navy font-bold text-xs shadow-[0_0_20px_rgba(0,203,224,0.3)] hover:brightness-110 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save System Configurations</span>
          </button>
        </div>
      </form>
    </div>
  )
}
