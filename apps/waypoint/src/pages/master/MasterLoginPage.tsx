import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Lock, Key, Cpu, Fingerprint, Activity, AlertTriangle, ArrowRight, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { useMasterAdmin, type MasterAdminRole } from '@/context/MasterAdminContext'

export default function MasterLoginPage() {
  const navigate = useNavigate()
  const { setRole } = useMasterAdmin()

  const [pin, setPin] = useState('')
  const [hardwareKey, setHardwareKey] = useState('')
  const [selectedRole, setSelectedRole] = useState<MasterAdminRole>('Super Admin')
  const [authenticating, setAuthenticating] = useState(false)
  const [biometricActive, setBiometricActive] = useState(false)

  const roles: MasterAdminRole[] = [
    'Super Admin',
    'CEO',
    'Operations Head',
    'Verification Manager',
    'Finance Manager',
    'Finance Executive',
    'Customer Care Manager',
    'Customer Care Executive',
    'Technical Support Engineer',
    'Marketing Manager',
    'Content Moderator',
    'Analytics Viewer',
    'Legal & Compliance Officer',
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setAuthenticating(true)

    setTimeout(() => {
      setAuthenticating(false)
      setRole(selectedRole)
      toast.success(`Beacon Master System Authenticated as ${selectedRole}`)
      navigate('/master-control')
    }, 1200)
  }

  const handleBiometricSim = () => {
    setBiometricActive(true)
    setTimeout(() => {
      setBiometricActive(false)
      setPin('998844')
      setHardwareKey('BEACON-HW-KEY-V9')
      toast.success('Biometric Hardware Token Verified (Passkey matched)')
    }, 1500)
  }

  const handleBypassQuickLogin = () => {
    setRole(selectedRole)
    toast.success(`Access Granted: ${selectedRole}`)
    navigate('/master-control')
  }

  return (
    <div className="min-h-screen bg-[#001731] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-body selection:bg-cyan selection:text-navy">
      {/* Background Cyber Grid & Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#002855_1px,transparent_1px),linear-gradient(to_bottom,#002855_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Top Beacon Header */}
      <div className="relative z-10 mb-8 text-center max-w-lg">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-cyan/10 border border-cyan/30 text-cyan text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(0,203,224,0.2)]"
        >
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          <span>Beacon Ecosystem Mission Control v4.2</span>
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading text-white">
          BEACON <span className="text-gradient">MASTER</span> LOGIN
        </h1>
        <p className="text-sm text-cyan-200/70 mt-2 font-mono">
          Enterprise Security Portal & Operation Command Hub
        </p>
      </div>

      {/* Main Authentication Box */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md glass-dark p-8 rounded-2xl border border-cyan/30 shadow-[0_0_50px_rgba(0,35,73,0.9)] backdrop-blur-xl"
      >
        {/* Security Badge */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-cyan/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan/20 border border-cyan/40 flex items-center justify-center text-cyan shadow-[0_0_15px_rgba(0,203,224,0.3)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono text-cyan">SECURITY LEVEL 0</div>
              <div className="text-sm font-semibold text-white">Zero Trust Gateway</div>
            </div>
          </div>
          <div className="text-right font-mono text-[10px] text-cyan-300/60">
            <div>IP: 103.21.124.88</div>
            <div className="text-emerald-400">TLS 1.3 ENCRYPTED</div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Select Admin Role */}
          <div>
            <label className="block text-xs font-mono text-cyan-200/80 mb-2 uppercase tracking-wider">
              Administrative Persona / Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as MasterAdminRole)}
              className="w-full bg-[#002147] border border-cyan/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan font-medium transition-all"
            >
              {roles.map((role) => (
                <option key={role} value={role} className="bg-navy text-white">
                  {role} {role === 'Super Admin' ? '(Full System Override)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Master PIN */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-mono text-cyan-200/80 uppercase tracking-wider">
                Master Security Keycode / PIN
              </label>
              <span className="text-[10px] font-mono text-cyan/70">6-Digit PIN</span>
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={6}
                className="w-full bg-[#002147] border border-cyan/30 rounded-xl pl-10 pr-4 py-3 text-sm text-white font-mono placeholder:text-cyan/30 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all tracking-widest text-lg"
              />
              <Key className="w-4 h-4 text-cyan/60 absolute left-3.5 top-4" />
            </div>
          </div>

          {/* Hardware Token / Passkey */}
          <div>
            <label className="block text-xs font-mono text-cyan-200/80 mb-2 uppercase tracking-wider">
              YubiKey / Hardware Token (Optional)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="BEACON-HW-KEY-V9"
                value={hardwareKey}
                onChange={(e) => setHardwareKey(e.target.value)}
                className="w-full bg-[#002147] border border-cyan/30 rounded-xl pl-10 pr-4 py-3 text-xs text-white font-mono placeholder:text-cyan/30 focus:outline-none focus:border-cyan focus:ring-1 focus:ring-cyan transition-all"
              />
              <Cpu className="w-4 h-4 text-cyan/60 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Biometric Simulation Button */}
          <button
            type="button"
            onClick={handleBiometricSim}
            className="w-full py-2.5 px-4 rounded-xl border border-cyan/30 bg-cyan/5 hover:bg-cyan/10 text-cyan text-xs font-mono flex items-center justify-center gap-2 transition-all group"
          >
            <Fingerprint className={`w-4 h-4 ${biometricActive ? 'animate-bounce text-emerald-400' : 'group-hover:scale-110'}`} />
            <span>{biometricActive ? 'Scanning Passkey & Biometrics...' : 'Use WebAuthn Biometric Scan'}</span>
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={authenticating}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-teal to-cyan text-navy font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(0,203,224,0.4)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            {authenticating ? (
              <>
                <Activity className="w-5 h-5 animate-spin" />
                <span>DECRYPTING MISSION CONTROL...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>ENTER MISSION CONTROL CENTER</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Access Bypass */}
        <div className="mt-6 pt-5 border-t border-cyan/15 text-center">
          <button
            onClick={handleBypassQuickLogin}
            className="text-xs text-cyan/80 hover:text-cyan underline font-mono flex items-center justify-center gap-1.5 mx-auto transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Quick Demo Access (Skip Authentication Step)</span>
          </button>
        </div>
      </motion.div>

      {/* Live Security Log Ticker at Footer */}
      <div className="relative z-10 mt-8 max-w-xl w-full bg-navy/80 border border-cyan/20 rounded-xl px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-cyan-300/80 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-cyan font-bold uppercase">System Status:</span>
          <span className="truncate">All 9 core node clusters OPERATIONAL • 99.99% Uptime</span>
        </div>
        <div className="flex items-center gap-1 text-amber-400/90 shrink-0">
          <AlertTriangle className="w-3 h-3" />
          <span>Zero Breach Incidents</span>
        </div>
      </div>
    </div>
  )
}
