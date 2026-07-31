import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail, Lock, User, Compass, AlertCircle, CheckCircle, Eye, EyeOff, Loader2,
  Building2, UserCheck, ArrowRight, ArrowLeft, Phone, Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { getPasswordStrength } from '@/lib/utils'
import { toast } from 'sonner'
import { authService } from '@/services/auth'

const signupSchema = z.object({
  name: z.string().min(2, 'Full Name must be at least 2 characters'),
  age: z.preprocess(
    (val) => (val === '' || val === undefined ? undefined : Number(val)),
    z.number()
      .min(18, 'You must be at least 18 years old to register')
      .max(120, 'Please enter a valid age')
  ),
  gender: z.enum(['Male', 'Female', 'Other', 'Prefer not to say']),
  email: z.string().email('Please enter a valid email address'),
  mobileNumber: z.string().min(7, 'Please enter a valid mobile number'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'You must accept the Terms & Privacy Policy'
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignUpForm = z.infer<typeof signupSchema>

export default function SignUpPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [partnerType, setPartnerType] = useState<'COMPANY' | 'FREELANCER'>('COMPANY')
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 25,
      gender: 'Male',
      email: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    }
  })
  
  const navigate = useNavigate()
  
  const password = watch('password', '')
  const strength = getPasswordStrength(password)

  const onSubmit = async (data: SignUpForm) => {
    setLoading(true)
    setError('')
    try {
      await authService.register({
        name: data.name,
        age: String(data.age),
        gender: data.gender,
        email: data.email,
        mobileNumber: data.mobileNumber,
        password: data.password,
        partnerType: partnerType,
        role: 'PLANNER'
      })
      setSuccess(true)
      toast.success('Account created successfully. Please log in to continue.')
      setTimeout(() => navigate('/login'), 1800)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed.'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ocean-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10 my-8"
      >
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Compass className="w-10 h-10 text-cyan glow-cyan-sm" />
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Become a Beacon Partner</h1>
          <p className="text-white/70 text-sm mt-1">Quick 2-step account setup for travel organizers</p>
        </div>

        {/* Progress Stepper Bar */}
        <div className="flex items-center justify-center gap-3 mb-6 px-4">
          <div className={`flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
            step === 1 ? 'bg-cyan text-navy shadow-md' : 'bg-white/10 text-white/90 border border-white/20'
          }`}>
            <span className="w-5 h-5 rounded-full bg-navy/20 flex items-center justify-center text-[11px]">1</span>
            Partner Type
          </div>
          <div className="w-8 h-0.5 bg-white/20" />
          <div className={`flex items-center gap-2 text-xs font-bold px-3.5 py-1.5 rounded-full transition-all ${
            step === 2 ? 'bg-cyan text-navy shadow-md' : 'bg-white/10 text-white/50 border border-white/10'
          }`}>
            <span className="w-5 h-5 rounded-full bg-navy/20 flex items-center justify-center text-[11px]">2</span>
            Account Info
          </div>
        </div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass rounded-[24px] p-10 text-center border border-white/20 shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Account Created Successfully!</h2>
              <p className="text-white/80 text-sm mb-4">
                Please log in to continue to your Beacon console.
              </p>
              <div className="inline-flex items-center gap-2 text-cyan font-semibold text-xs animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Login Page...
              </div>
            </motion.div>
          ) : (
            <motion.div key={step === 1 ? "step1" : "step2"} className="glass rounded-[24px] p-6 sm:p-8 border border-white/15 shadow-2xl">
              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-[12px] flex items-center gap-2 text-red-200 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />{error}
                </div>
              )}

              {/* STEP 1: PARTNER TYPE SELECTION */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-bold text-white">Select Your Organization Model</h3>
                    <p className="text-xs text-white/60">Choose how you operate on Beacon. You can complete full credentials later.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Option A: Travel Company / Agency */}
                    <button
                      type="button"
                      onClick={() => setPartnerType('COMPANY')}
                      className={`p-5 rounded-[20px] text-left transition-all border relative flex flex-col justify-between cursor-pointer ${
                        partnerType === 'COMPANY'
                          ? 'bg-cyan/15 border-cyan shadow-lg glow-cyan-sm'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="w-12 h-12 rounded-[14px] bg-cyan/20 text-cyan flex items-center justify-center mb-3">
                          <Building2 className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-white text-base">Travel Company / Agency</h4>
                        <p className="text-xs text-white/60 mt-1 leading-relaxed">
                          Registered tour operator, travel agency, DMC, or corporate travel provider.
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-cyan">
                        <span>GST & Reg Certificate</span>
                        {partnerType === 'COMPANY' && <CheckCircle className="w-4 h-4 text-cyan" />}
                      </div>
                    </button>

                    {/* Option B: Freelance Trip Planner */}
                    <button
                      type="button"
                      onClick={() => setPartnerType('FREELANCER')}
                      className={`p-5 rounded-[20px] text-left transition-all border relative flex flex-col justify-between cursor-pointer ${
                        partnerType === 'FREELANCER'
                          ? 'bg-cyan/15 border-cyan shadow-lg glow-cyan-sm'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="w-12 h-12 rounded-[14px] bg-teal/20 text-teal flex items-center justify-center mb-3">
                          <UserCheck className="w-6 h-6" />
                        </div>
                        <h4 className="font-bold text-white text-base">Freelance Trip Planner</h4>
                        <p className="text-xs text-white/60 mt-1 leading-relaxed">
                          Independent travel leader, local tour guide, creator, or solo trip architect.
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-teal">
                        <span>Government ID & Portfolio</span>
                        {partnerType === 'FREELANCER' && <CheckCircle className="w-4 h-4 text-teal" />}
                      </div>
                    </button>
                  </div>

                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-cyan hover:bg-cyan/90 text-navy font-bold py-3.5 rounded-[14px] gap-2 shadow-lg cursor-pointer"
                  >
                    Continue to Account Info <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* STEP 2: ESSENTIAL ACCOUNT INFO */}
              {step === 2 && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-white/70 hover:text-cyan flex items-center gap-1 font-medium"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back to Partner Selection
                    </button>
                    <span className="text-[11px] font-bold text-cyan bg-cyan/15 px-2.5 py-0.5 rounded-full">
                      {partnerType === 'COMPANY' ? '🏢 Travel Company' : '👤 Freelancer'}
                    </span>
                  </div>

                  <Input
                    label="Full Name"
                    placeholder="e.g. Alexander Wright"
                    icon={<User className="w-4 h-4 text-cyan" />}
                    error={errors.name?.message}
                    {...register('name')}
                  />

                  {/* Age & Gender Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Age (Must be 18+)"
                      type="number"
                      placeholder="e.g. 25"
                      min={18}
                      icon={<Calendar className="w-4 h-4 text-cyan" />}
                      error={errors.age?.message}
                      {...register('age')}
                    />

                    <div>
                      <label className="text-xs font-semibold text-white/90 mb-1.5 block">Gender</label>
                      <select
                        className="w-full px-4 py-3 rounded-[12px] bg-white/5 border border-white/15 text-white focus:outline-none focus:border-cyan text-sm cursor-pointer"
                        {...register('gender')}
                      >
                        <option value="Male" className="bg-navy text-white">Male</option>
                        <option value="Female" className="bg-navy text-white">Female</option>
                        <option value="Other" className="bg-navy text-white">Other</option>
                        <option value="Prefer not to say" className="bg-navy text-white">Prefer not to say</option>
                      </select>
                      {errors.gender && <p className="text-[11px] text-red-300 mt-1">{errors.gender.message}</p>}
                    </div>
                  </div>

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="partner@beacon.com"
                    icon={<Mail className="w-4 h-4 text-cyan" />}
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <Input
                    label="Mobile Number"
                    type="tel"
                    placeholder="e.g. +1 555-123-4567 or 9876543210"
                    icon={<Phone className="w-4 h-4 text-cyan" />}
                    error={errors.mobileNumber?.message}
                    {...register('mobileNumber')}
                  />

                  {/* Password Fields */}
                  <div>
                    <Input
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a secure password"
                      icon={<Lock className="w-4 h-4 text-cyan" />}
                      error={errors.password?.message}
                      endElement={
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/60 hover:text-white focus:outline-none">
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
                              style={{ backgroundColor: i < strength.score ? strength.color : 'rgba(255,255,255,0.1)' }}
                            />
                          ))}
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span style={{ color: strength.color }}>{strength.label}</span>
                          <div className="text-white/40 space-x-1.5 font-mono text-[10px]">
                            <span className={/[A-Z]/.test(password) ? "text-cyan font-bold" : ""}>A-Z</span>
                            <span className={/[a-z]/.test(password) ? "text-cyan font-bold" : ""}>a-z</span>
                            <span className={/[0-9]/.test(password) ? "text-cyan font-bold" : ""}>0-9</span>
                            <span className={/[^A-Za-z0-9]/.test(password) ? "text-cyan font-bold" : ""}>!@#</span>
                            <span className={password.length >= 8 ? "text-cyan font-bold" : ""}>8+</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Input
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    icon={<Lock className="w-4 h-4 text-cyan" />}
                    error={errors.confirmPassword?.message}
                    endElement={
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-white/60 hover:text-white focus:outline-none">
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                    {...register('confirmPassword')}
                  />

                  {/* Terms & Privacy Policy Acceptance Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 text-xs text-white/80 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 rounded border-white/30 text-teal focus:ring-cyan"
                        {...register('acceptTerms')}
                      />
                      <span>
                        I agree to the <a href="/terms" target="_blank" className="text-cyan font-bold hover:underline">Terms of Service</a> and{' '}
                        <a href="/privacy" target="_blank" className="text-cyan font-bold hover:underline">Privacy Policy</a>.
                      </span>
                    </label>
                    {errors.acceptTerms && (
                      <p className="text-[11px] text-red-300 mt-1">{errors.acceptTerms.message}</p>
                    )}
                  </div>

                  <Button type="submit" className="w-full bg-cyan hover:bg-cyan/90 text-navy font-bold py-3.5 rounded-[14px] mt-2 shadow-lg cursor-pointer" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              )}

              <p className="text-center text-xs text-white/60 mt-6 pt-4 border-t border-white/10">
                Already registered?{' '}
                <Link to="/login" className="text-cyan font-bold hover:underline">Sign in to your account</Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
