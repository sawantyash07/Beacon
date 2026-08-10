import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMasterAdmin, type AdminRole } from '@/data/masterAdminData';
import { ShieldAlert, ShieldCheck, KeyRound, Fingerprint, Cpu, Globe, Activity, Eye, EyeOff, Terminal } from 'lucide-react';
import { toast } from 'sonner';

export default function MasterLoginPage() {
  const navigate = useNavigate();
  const { loginSession, setCurrentRole } = useMasterAdmin();

  // Form States
  const [pin, setPin] = useState('');
  const [mfaToken, setMfaToken] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simulation States
  const [fingerprintScanning, setFingerprintScanning] = useState(false);
  const [fingerprintDone, setFingerprintDone] = useState(false);
  const [activeMfaCode, setActiveMfaCode] = useState('482 109');
  
  // Generating a changing MFA token
  useEffect(() => {
    const interval = setInterval(() => {
      const part1 = Math.floor(100 + Math.random() * 900);
      const part2 = Math.floor(100 + Math.random() * 900);
      setActiveMfaCode(`${part1} ${part2}`);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin) {
      toast.error('Master PIN is required');
      return;
    }
    if (!mfaToken) {
      toast.error('Security Token is required');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const success = loginSession(pin, mfaToken);
      setIsSubmitting(false);
      if (success) {
        toast.success('Access Granted. Welcome to Beacon Command Center.');
        navigate('/master-control');
      } else {
        toast.error('Invalid Credentials. Security Incident Logged.');
      }
    }, 1200);
  };

  const handleQuickLogin = (role: AdminRole) => {
    setCurrentRole(role);
    loginSession('1234', '999');
    toast.success(`Authenticated as ${role} via Quick Access`);
    navigate('/master-control');
  };

  const handleFingerprintScan = () => {
    if (fingerprintScanning || fingerprintDone) return;
    setFingerprintScanning(true);
    toast.info('Scanning Biometrics... Hold position');

    setTimeout(() => {
      setFingerprintScanning(false);
      setFingerprintDone(true);
      toast.success('Biometric Fingerprint Match Verified.');
      // Auto-fill pin for demo
      setPin('••••••••');
      setMfaToken(activeMfaCode.replace(' ', ''));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex items-center justify-center p-4 relative overflow-hidden font-body selection:bg-cyan-500 selection:text-black">
      {/* Background glowing blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none animate-pulse" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 z-10">
        
        {/* Left Side: Security Audit Badge & Diagnostics */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 text-xs font-mono glow-cyan-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              SECURE DEPLOYMENT : V1.0.8
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              BEACON <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">MASTER</span>
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enterprise central security hub & network diagnostics console. Authorized personnel access only. Actions are monitored under international security compliance standards.
            </p>
          </div>

          {/* Audit diagnostics badge */}
          <div className="border border-gray-800 bg-gray-900/40 backdrop-blur-xl p-5 rounded-2xl space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal size={14} className="text-cyan-400" /> SYSTEM AUDIT LOGS
              </span>
              <span className="text-xs text-green-400 font-mono flex items-center gap-1">
                <ShieldCheck size={12} /> SECURE
              </span>
            </div>

            <div className="space-y-2 text-xs font-mono text-gray-400">
              <div className="flex justify-between">
                <span>CLIENT IP:</span>
                <span className="text-gray-200">192.168.42.105</span>
              </div>
              <div className="flex justify-between">
                <span>LOCATION:</span>
                <span className="text-gray-200">MUMBAI, INDIA (IST)</span>
              </div>
              <div className="flex justify-between">
                <span>SSL CERTIFICATE:</span>
                <span className="text-cyan-400">VALID (SHA-256)</span>
              </div>
              <div className="flex justify-between">
                <span>BROWSER AGENT:</span>
                <span className="text-gray-200 truncate max-w-[180px]">Vite Agent/3.5</span>
              </div>
              <div className="flex justify-between">
                <span>HOST ENCRYPT:</span>
                <span className="text-gray-200">AES_256_GCM</span>
              </div>
              <div className="flex justify-between">
                <span>ACTIVE SESSION ID:</span>
                <span className="text-gray-200">SEC-9984-X9</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 border-t border-gray-850">
              <Globe size={14} className="text-cyan-400 animate-spin" />
              <span className="text-[10px] text-gray-500 font-mono">NODE CENTRAL ROUTER STATUS: ONLINE</span>
            </div>
          </div>

          {/* Quick Demo Access Badges */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              DEMO ACCESS PROFILE SELECTOR
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Super Admin',
                'CEO',
                'Operations Head',
                'Verification Manager',
                'Finance Manager',
                'Customer Care Manager',
                'Legal Officer',
                'Marketing Executive'
              ].map((role) => (
                <button
                  key={role}
                  onClick={() => handleQuickLogin(role as AdminRole)}
                  className="px-3 py-2 text-left rounded-xl border border-gray-800 bg-gray-900/20 hover:bg-cyan-950/20 hover:border-cyan-500/30 transition-all duration-200 text-xs font-medium hover:text-cyan-400"
                >
                  ⚡ {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: MFA Login Form Panel */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="border border-gray-800 bg-gray-900/60 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl relative">
            <div className="absolute top-0 right-0 p-4">
              <ShieldAlert className="text-cyan-500/20 w-16 h-16 pointer-events-none" />
            </div>

            <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
              <KeyRound size={20} className="text-cyan-400" /> SECURE MFA ACCESS
            </h2>
            <p className="text-gray-400 text-xs mb-6 font-mono">
              Provide hardware code and master passcode to unlock operations ledger.
            </p>

            <form onSubmit={handleManualLogin} className="space-y-5">
              {/* Master PIN Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                  MASTER KEY PIN
                </label>
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-12 py-3.5 bg-gray-950/80 border border-gray-850 rounded-2xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 placeholder-gray-700 outline-none transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Security Token MFA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                    HARDWARE TOKEN (MFA)
                  </label>
                  <input
                    type="text"
                    value={mfaToken}
                    onChange={(e) => setMfaToken(e.target.value)}
                    placeholder="Enter 6-digit Code"
                    className="w-full px-4 py-3.5 bg-gray-950/80 border border-gray-850 rounded-2xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-gray-100 placeholder-gray-700 outline-none transition-all font-mono text-center tracking-[0.25em]"
                  />
                </div>

                {/* Authenticator Code display for demo convenience */}
                <div className="border border-dashed border-gray-800 bg-gray-950/40 p-3 rounded-2xl flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Cpu size={12} /> Live Device Token
                  </span>
                  <span className="text-lg font-bold font-mono text-cyan-400 tracking-wider">
                    {activeMfaCode}
                  </span>
                  <span className="text-[9px] text-gray-600 font-mono mt-0.5">
                    Resets in 15 seconds
                  </span>
                </div>
              </div>

              {/* Biometric fingerprint scanning simulation panel */}
              <div className="border border-gray-800/80 bg-gray-950/40 p-4 rounded-2xl flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <Fingerprint size={14} className="text-cyan-400" />
                    Biometrics Scanning
                  </div>
                  <p className="text-[10px] text-gray-500 max-w-[280px]">
                    Use verified fingerprint scanning module to bypass PIN code requirements.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleFingerprintScan}
                  disabled={fingerprintScanning || fingerprintDone}
                  className={`p-3 rounded-xl border transition-all duration-300 relative overflow-hidden ${
                    fingerprintDone
                      ? 'bg-green-950/20 border-green-500 text-green-400'
                      : fingerprintScanning
                      ? 'bg-cyan-950/20 border-cyan-500 text-cyan-400 animate-pulse'
                      : 'bg-gray-900 border-gray-800 text-gray-400 hover:border-cyan-500 hover:text-cyan-400'
                  }`}
                >
                  <Fingerprint size={28} className={fingerprintScanning ? 'scale-110' : ''} />
                  {fingerprintScanning && (
                    <div className="absolute inset-0 bg-cyan-500/10 top-0 left-0 right-0 animate-[bounce_1.5s_infinite]" />
                  )}
                </button>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-gray-950 font-bold transition-all duration-200 text-sm shadow-lg shadow-cyan-900/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                {isSubmitting ? (
                  <>
                    <Activity size={18} className="animate-spin" />
                    DECIPHERING DIGITAL KEY...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    INITIALIZE PLATFORM SESSION
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
