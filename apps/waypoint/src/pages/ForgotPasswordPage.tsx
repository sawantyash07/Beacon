import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, Compass, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface ForgotForm {
  email: string
}

export default function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotForm>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const onSubmit = async (data: ForgotForm) => {
    setLoading(true)
    setError('')
    try {
      await fetch('http://localhost:3001/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      })
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-ocean-gradient flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Compass className="w-10 h-10 text-cyan mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-white/60 text-sm">We'll send you a reset link</p>
        </div>

        <div className="glass rounded-[16px] p-8">
          {sent ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <CheckCircle className="w-12 h-12 text-teal mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-navy mb-2">Check your email</h2>
              <p className="text-muted text-sm mb-6">If an account exists, we've sent a password reset link.</p>
              <Link to="/login"><Button variant="outline" className="w-full">Back to Login</Button></Link>
            </motion.div>
          ) : (
            <>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[12px] flex items-center gap-2 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4" />{error}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  icon={<Mail className="w-4 h-4" />}
                  error={errors.email?.message}
                  {...register('email', { required: 'Email is required' })}
                />
                <Button type="submit" className="w-full" loading={loading} glow>Send Reset Link</Button>
              </form>
              <Link to="/login" className="flex items-center justify-center gap-1 text-sm text-teal mt-6 hover:text-cyan">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
