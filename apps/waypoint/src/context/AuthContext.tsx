import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import { authService, type User } from '@/services/auth'
import { toast } from 'sonner'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: Record<string, string>) => Promise<void>
  register: (data: Record<string, string>) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await authService.getProfile()
        setUser(data.user)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const login = async (data: Record<string, string>) => {
    const res = await authService.login(data)
    setUser(res.user || null)
  }

  const register = async (data: Record<string, string>) => {
    const res = await authService.register(data)
    setUser(res.user || null)
  }

  const logout = async () => {
    try {
      await authService.logout()
      toast.success('Logged out successfully')
    } catch (e) {
      console.error('Logout API failed', e)
    }
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-ocean-gradient flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[200vw] h-[200vw] sm:w-[100vw] sm:h-[100vw] rounded-[40%] bg-white/5 border border-white/10"
              style={{ left: '-50%', top: '50%' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 15 + i * 5, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>
            <Compass className="w-16 h-16 text-cyan glow-cyan-sm mb-6" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-white tracking-wider"
          >
            Preparing your journey...
          </motion.h2>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
