import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Mail, Lock, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/context/AuthContext'
import { toast } from 'sonner'

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type SignUpForm = z.infer<typeof signupSchema>

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: zodResolver(signupSchema)
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data: SignUpForm) => {
    setLoading(true)
    setError('')
    try {
      await registerUser({ 
        email: data.email, 
        password: data.password, 
        name: data.email.split('@')[0], 
        role: 'PLANNER',
        age: '25',
        gender: 'Not specified',
        mobileNumber: '0000000000'
      })
      toast.success('Account created successfully. Welcome!')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please try again.'
      setError(msg)
      toast.error(msg)
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
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
            Create an Account
          </h1>
          <p className="text-white/70 text-sm">Join Beacon Planner to get started</p>
        </div>

        <div className="bg-[#0B1528]/90 border border-white/10 rounded-[20px] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Tabs */}
          <div className="flex bg-[#020617] rounded-lg p-1 mb-8">
            <Link to="/login" className="flex-1 text-center py-2 text-sm font-semibold rounded-md text-white/50 hover:text-white transition-colors">
              Log in
            </Link>
            <Link to="/signup" className="flex-1 text-center py-2 text-sm font-semibold rounded-md bg-white/10 text-white shadow">
              Sign up
            </Link>
          </div>
          
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
              label="Email Address"
              type="email"
              placeholder="alex@example.com"
              icon={<Mail className="w-4 h-4 text-cyan" />}
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password (min. 8 chars)"
              icon={<Lock className="w-4 h-4 text-cyan" />}
              error={errors.password?.message}
              endElement={
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/60 hover:text-white focus:outline-none">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              {...register('password')}
            />

            <Button type="submit" className="w-full bg-gradient-to-r from-teal to-cyan text-navy font-bold py-3 rounded-[12px] shadow-lg shadow-cyan/20 mt-4" disabled={loading} glow>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Sign Up'
              )}
            </Button>
          </form>

          <p className="text-center text-xs text-white/60 mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan font-bold hover:underline transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
