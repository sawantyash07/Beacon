import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, Compass, AlertCircle, CheckCircle, Camera, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/context/AuthContext'
import { getPasswordStrength } from '@/lib/utils'
import { toast } from 'sonner'

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignUpForm = z.infer<typeof signupSchema>

export default function SignUpPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange'
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const fileRef = useRef<HTMLInputElement>(null)
  const { register: apiRegister } = useAuth()
  const navigate = useNavigate()
  
  const password = watch('password', '')
  const strength = getPasswordStrength(password)

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data: SignUpForm) => {
    setLoading(true)
    setError('')
    try {
      await apiRegister({ email: data.email, password: data.password, name: data.name })
      setSuccess(true)
      toast.success('Account created successfully!')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    toast.error('Google sign-up is not supported yet.')
  }

  return (
    <div className="min-h-screen bg-ocean-gradient flex items-center justify-center p-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Compass className="w-10 h-10 text-cyan" />
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/60 text-sm">Start your travel planning journey</p>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass rounded-[16px] p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <CheckCircle className="w-16 h-16 text-teal mx-auto mb-4" />
              </motion.div>
              <h2 className="text-xl font-bold text-navy mb-2">Welcome aboard!</h2>
              <p className="text-muted text-sm">Redirecting to login...</p>
            </motion.div>
          ) : (
            <motion.div key="form" className="glass rounded-[16px] p-8">
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[12px] flex items-center gap-2 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />{error}
                </div>
              )}

              {/* Profile photo */}
              <div className="flex justify-center mb-6">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="relative w-20 h-20 rounded-full bg-teal/10 border-2 border-dashed border-teal/30 flex items-center justify-center overflow-hidden hover:border-teal transition-colors"
                >
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Camera className="w-6 h-6 text-teal" />
                  )}
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="John Doe"
                  icon={<User className="w-4 h-4" />}
                  error={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  icon={<Mail className="w-4 h-4" />}
                  error={errors.email?.message}
                  {...register('email')}
                />
                
                <div>
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    icon={<Lock className="w-4 h-4" />}
                    error={errors.password?.message}
                    endElement={
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-navy focus:outline-none">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                    {...register('password')}
                  />
                  
                  {password && (
                    <div className="mt-2">
                      <div className="flex gap-1 mb-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className="h-1 flex-1 rounded-full transition-colors"
                            style={{ backgroundColor: i < strength.score ? strength.color : '#D6EEF1' }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span style={{ color: strength.color }}>{strength.label}</span>
                        <div className="text-muted/60 space-x-2">
                          <span className={/[A-Z]/.test(password) ? "text-teal font-medium" : ""}>A-Z</span>
                          <span className={/[a-z]/.test(password) ? "text-teal font-medium" : ""}>a-z</span>
                          <span className={/[0-9]/.test(password) ? "text-teal font-medium" : ""}>0-9</span>
                          <span className={/[^A-Za-z0-9]/.test(password) ? "text-teal font-medium" : ""}>!@#</span>
                          <span className={password.length >= 8 ? "text-teal font-medium" : ""}>8+</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  icon={<Lock className="w-4 h-4" />}
                  error={errors.confirmPassword?.message}
                  endElement={
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="hover:text-navy focus:outline-none">
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                  {...register('confirmPassword')}
                />

                <Button type="submit" className="w-full" disabled={loading} glow>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative flex justify-center text-xs"><span className="bg-surface px-3 text-muted">or</span></div>
              </div>

              <Button variant="outline" className="w-full" onClick={handleGoogleSignUp} disabled={loading}>
                Sign up with Google
              </Button>

              <p className="text-center text-sm text-muted mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-teal font-medium hover:text-cyan">Sign in</Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
