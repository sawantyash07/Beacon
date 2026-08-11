import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Compass, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or Mobile Number is required'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showGoogleModal, setShowGoogleModal] = useState(false)
  const [customGoogleEmail, setCustomGoogleEmail] = useState('adityakasod2005@gmail.com')
  const { login, user, isKycVerified } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const defaultTarget = isKycVerified ? '/dashboard' : '/onboarding'
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || defaultTarget

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true })
    }
  }, [user, navigate, from])

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    setError('')
    try {
      const res = await login({ email: data.identifier, password: data.password })
      const target = (res as any)?.user?.kycStatus === 'VERIFIED' ? '/dashboard' : '/onboarding'
      toast.success('Welcome back!')
      navigate(target, { replace: true })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed. Please try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSelect = async (email: string, name: string) => {
    setLoading(true)
    setShowGoogleModal(false)
    try {
      await login({ email, identifier: email, name, role: 'PLANNER' })
      const target = email === 'concierge@beaconplanner.com' ? '/dashboard' : '/onboarding'
      toast.success(`Signed in as ${name} (${email})`)
      navigate(target, { replace: true })
    } catch (err) {
      toast.error('Google sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden text-white">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <img
              src="/planner/beacon-logo.png"
              alt="Beacon Planner Logo"
              className="h-10 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform"
              onError={(e) => {
                // Fallback to compass icon if image fails
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
            Welcome Back
          </h1>
          <p className="text-white/70 text-sm">Sign in to your Beacon Planner account</p>
        </div>

        <div className="bg-[#0B1528]/90 border border-white/10 rounded-[20px] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-[12px] flex items-center gap-2 text-red-400 text-xs"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email or Mobile Number"
              type="text"
              placeholder="alex@example.com or +1234567890"
              icon={<Mail className="w-4 h-4 text-cyan" />}
              error={errors.identifier?.message}
              {...register('identifier')}
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              icon={<Lock className="w-4 h-4 text-cyan" />}
              error={errors.password?.message}
              endElement={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/60 hover:text-white focus:outline-none">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              {...register('password')}
            />

            <div className="flex items-center justify-between">
              <label htmlFor="remember-me" className="flex items-center gap-2 text-xs text-white/70 cursor-pointer">
                <input id="remember-me" type="checkbox" {...register('remember')} className="rounded border-border accent-teal" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-xs text-cyan hover:underline transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full bg-gradient-to-r from-teal to-cyan text-navy font-bold py-3 rounded-[12px] shadow-lg shadow-cyan/20" disabled={loading} glow>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-[#0B1528] px-3 text-white/50">or continue with</span></div>
          </div>

          {/* Google Sign In Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full bg-white/5 hover:bg-white/10 border-white/15 text-white font-medium flex items-center justify-center gap-2.5 py-2.5 rounded-[12px] transition-all"
            onClick={() => setShowGoogleModal(true)}
            disabled={loading}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.17 3.32v2.77h3.51c2.05-1.89 3.24-4.67 3.24-7.95z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.51-2.77c-.98.66-2.23 1.06-3.77 1.06-2.9 0-5.35-1.98-6.22-4.66H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.78 14.06c-.22-.66-.35-1.36-.35-2.06s.13-1.4.35-2.06V7.1H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.9l2.85-2.22.75-.62z"/><path fill="#EA4335" d="M12 5.06c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.1l3.6 2.84c.87-2.68 3.32-4.66 6.22-4.66z"/></svg>
            <span>Continue with Google</span>
          </Button>

          <p className="text-center text-xs text-white/60 mt-5">
            Don't have an account?{' '}
            <Link to="/signup" className="text-cyan font-bold hover:underline transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Google Account Selector Modal */}
      <AnimatePresence>
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-white text-navy rounded-[24px] shadow-2xl p-6 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.17 3.32v2.77h3.51c2.05-1.89 3.24-4.67 3.24-7.95z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.51-2.77c-.98.66-2.23 1.06-3.77 1.06-2.9 0-5.35-1.98-6.22-4.66H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.78 14.06c-.22-.66-.35-1.36-.35-2.06s.13-1.4.35-2.06V7.1H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.9l2.85-2.22.75-.62z"/><path fill="#EA4335" d="M12 5.06c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.1l3.6 2.84c.87-2.68 3.32-4.66 6.22-4.66z"/></svg>
                  <span className="font-bold text-sm text-navy">Sign in with Google</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowGoogleModal(false)}
                  className="p-1 rounded-full text-muted hover:text-navy hover:bg-page"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-muted mb-4">
                Choose an account to continue to <strong>Beacon Planner</strong>
              </p>

              <div className="space-y-2">
                {/* Account 1: User's Account */}
                <button
                  type="button"
                  onClick={() => handleGoogleSelect('adityakasod2005@gmail.com', 'Aditya Kasod')}
                  className="w-full p-3 rounded-[12px] border border-border hover:border-cyan hover:bg-[#F3F9FD] flex items-center gap-3 text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-full bg-cyan text-navy font-bold flex items-center justify-center text-sm shrink-0">
                    A
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-navy truncate">Aditya Kasod</p>
                    <p className="text-[11px] text-muted truncate">adityakasod2005@gmail.com</p>
                  </div>
                </button>

                {/* Account 2: Demo Concierge Account */}
                <button
                  type="button"
                  onClick={() => handleGoogleSelect('concierge@beaconplanner.com', 'Beacon Concierge Partner')}
                  className="w-full p-3 rounded-[12px] border border-border hover:border-cyan hover:bg-[#F3F9FD] flex items-center gap-3 text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-full bg-teal text-white font-bold flex items-center justify-center text-sm shrink-0">
                    B
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-navy truncate">Beacon Concierge Partner</p>
                    <p className="text-[11px] text-muted truncate">concierge@beaconplanner.com</p>
                  </div>
                </button>
              </div>

              {/* Custom Google Account Entry */}
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-[11px] font-semibold text-muted block mb-1.5">Or enter another Google Email</span>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="name@gmail.com"
                    className="flex-1 px-3 py-1.5 text-xs rounded-[8px] border border-border focus:outline-none focus:ring-1 focus:ring-cyan"
                  />
                  <Button
                    size="xs"
                    type="button"
                    onClick={() => {
                      if (customGoogleEmail.trim()) {
                        handleGoogleSelect(customGoogleEmail.trim(), customGoogleEmail.split('@')[0])
                      }
                    }}
                    className="bg-navy text-white text-xs px-3"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
