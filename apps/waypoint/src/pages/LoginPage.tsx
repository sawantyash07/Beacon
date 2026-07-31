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
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/'

  // Redirect if already logged in
  useEffect(() => {
    if (user && !showSuccessOverlay) {
      navigate(from, { replace: true })
    }
  }, [user, navigate, from, showSuccessOverlay])

  const onSubmit = async (data: LoginForm) => {
    setLoading(true)
    setError('')
    try {
      await login({ email: data.identifier, password: data.password })
      setShowSuccessOverlay(true)
      toast.success('Welcome back!')
      setTimeout(() => {
        navigate(from, { replace: true })
      }, 2000)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Login failed. Please try again.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    toast.error('Google login is not supported yet.')
  }

  return (
    <div className="min-h-screen bg-ocean-gradient flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan/30 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
              <Compass className="w-10 h-10 text-cyan glow-cyan-sm" />
            </motion.div>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/60 text-sm">Sign in to your Waypoint account</p>
        </div>

        <div className="glass rounded-[16px] p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[12px] flex items-center gap-2 text-red-700 text-sm"
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
              <label className="flex items-center gap-2 text-sm text-muted cursor-pointer">
                <input type="checkbox" {...register('remember')} className="rounded border-border accent-teal" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm text-teal hover:text-cyan transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={loading} glow>
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

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs"><span className="bg-surface px-3 text-muted">or continue with</span></div>
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.17 3.32v2.77h3.51c2.05-1.89 3.24-4.67 3.24-7.95z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.51-2.77c-.98.66-2.23 1.06-3.77 1.06-2.9 0-5.35-1.98-6.22-4.66H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.78 14.06c-.22-.66-.35-1.36-.35-2.06s.13-1.4.35-2.06V7.1H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.9l2.85-2.22.75-.62z"/><path fill="#EA4335" d="M12 5.06c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.1l3.6 2.84c.87-2.68 3.32-4.66 6.22-4.66z"/></svg>
            Google
          </Button>

          <p className="text-center text-sm text-muted mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-teal font-medium hover:text-cyan transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {showSuccessOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] bg-ocean-gradient flex flex-col items-center justify-center p-4 select-none pointer-events-auto cursor-wait"
          >
            {/* Ambient background waves */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-[150vw] h-[150vw] sm:w-[80vw] sm:h-[80vw] rounded-[42%] bg-cyan/5 border border-cyan/10"
                  style={{ left: '-25%', top: '35%' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'linear' }}
                />
              ))}
            </div>

            {/* Branded loading graphic & messages */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
                className="mb-8 relative"
              >
                <motion.div
                  className="relative p-6 rounded-full bg-surface-dark/40 border border-cyan/20 glow-cyan-sm"
                  animate={{
                    boxShadow: [
                      '0 0 15px rgba(6, 182, 212, 0.2)',
                      '0 0 30px rgba(6, 182, 212, 0.5)',
                      '0 0 15px rgba(6, 182, 212, 0.2)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    <Compass className="w-16 h-16 text-cyan" />
                  </motion.div>
                </motion.div>
                
                <motion.div
                  className="absolute -inset-1 rounded-full border border-cyan/30"
                  animate={{ scale: [1, 1.25, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-2xl font-bold text-white tracking-wide mb-2"
              >
                Signing you in
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="text-cyan/70 text-sm font-medium tracking-wider"
              >
                Preparing your experience...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
