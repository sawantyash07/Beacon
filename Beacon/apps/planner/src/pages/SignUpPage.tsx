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
  const { register: registerUser, loginWithGoogle, login } = useAuth()
  const navigate = useNavigate()
  // Auto-login bypass for demo purposes
  useEffect(() => {
    const bypass = async () => {
      try {
        await login({ identifier: 'demo@beaconplanner.com', password: 'password' })
        navigate('/dashboard', { replace: true })
      } catch (e) {}
    }
    bypass()
  }, [login, navigate])

  // FORCE DEMO BYPASS: Do not render the form.
  return (
    <div className="min-h-screen bg-[var(--color-bg-canvas)] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="flex flex-col items-center gap-4 z-10">
        <Loader2 className="w-12 h-12 text-cyan animate-spin" />
        <p className="text-white/70 font-medium">Authenticating Demo Session...</p>
      </div>
    </div>
  )
}
