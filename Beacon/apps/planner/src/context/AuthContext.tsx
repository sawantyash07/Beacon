import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import { authService, type User } from '@/services/auth'
import { toast } from 'sonner'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth as firebaseAuth } from '@/lib/firebase'

interface AuthContextType {
  user: User | null
  loading: boolean
  kycStatus: 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED'
  isKycVerified: boolean
  highlightBusinessProfile: boolean
  login: (data: Record<string, string>) => Promise<void>
  loginWithGoogle: () => Promise<void>
  register: (data: Record<string, string>) => Promise<void>
  logout: () => Promise<void>
  updateKycStatus: (status: 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED') => void
  triggerBusinessProfileHighlight: () => void
  clearBusinessProfileHighlight: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [kycStatus, setKycStatus] = useState<'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED'>('PENDING')
  const [highlightBusinessProfile, setHighlightBusinessProfile] = useState(false)

  // Helper to determine initial KYC status based on email
  const getInitialKycStatus = (email?: string): 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED' => {
    if (!email) return 'PENDING'
    const stored = localStorage.getItem(`beacon_kyc_status_${email.toLowerCase()}`)
    if (stored && ['PENDING', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED'].includes(stored)) {
      return stored as any
    }
    // Only default legacy demo concierge to VERIFIED, new users default to PENDING
    if (email.toLowerCase() === 'concierge@beaconplanner.com') {
      return 'VERIFIED'
    }
    return 'PENDING'
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await authService.getProfile()
        setUser(data.user)
        const initialStatus = getInitialKycStatus(data.user?.email)
        setKycStatus(initialStatus)
      } catch (err) {
        // Check if there was a mock session saved
        const savedUser = localStorage.getItem('beacon_planner_user')
        if (savedUser) {
          try {
            const parsed = JSON.parse(savedUser)
            setUser(parsed)
            setKycStatus(getInitialKycStatus(parsed.email))
          } catch (e) {
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  useEffect(() => {
    if (user) {
      localStorage.setItem('beacon_planner_user', JSON.stringify(user))
      const currentKyc = getInitialKycStatus(user.email)
      setKycStatus(currentKyc)
    } else {
      localStorage.removeItem('beacon_planner_user')
    }
  }, [user])

  const updateKycStatus = (status: 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'REJECTED') => {
    setKycStatus(status)
    if (user?.email) {
      localStorage.setItem(`beacon_kyc_status_${user.email.toLowerCase()}`, status)
    }
  }

  const triggerBusinessProfileHighlight = () => {
    setHighlightBusinessProfile(true)
  }

  const clearBusinessProfileHighlight = () => {
    setHighlightBusinessProfile(false)
  }

  const login = async (data: Record<string, string>) => {
    try {
      const res = await authService.login(data)
      const loggedUser = res.user || null
      setUser(loggedUser)
      if (loggedUser?.email) {
        setKycStatus(getInitialKycStatus(loggedUser.email))
      }
    } catch (err) {
      console.warn('API login failed. Falling back to mock session.', err)
      const mockUser: User = {
        id: 'mock-planner-id-123',
        email: data.email || data.identifier || 'concierge@beaconplanner.com',
        name: (data.email || data.identifier || 'Travel Partner').split('@')[0],
        role: 'PLANNER'
      }
      setUser(mockUser)
      setKycStatus(getInitialKycStatus(mockUser.email))
    }
  }

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({ prompt: 'select_account' })
      const result = await signInWithPopup(firebaseAuth, provider)
      const gUser = result.user
      
      const loggedUser: User = {
        id: gUser.uid,
        email: gUser.email || '',
        name: gUser.displayName || gUser.email?.split('@')[0] || 'Travel Partner',
        role: 'PLANNER'
      }
      
      setUser(loggedUser)
      setKycStatus(getInitialKycStatus(loggedUser.email))
    } catch (err: any) {
      console.error('Google Sign In failed:', err)
      toast.error(err.message || 'Google Sign In failed')
      throw err
    }
  }

  const register = async (data: Record<string, string>) => {
    try {
      const res = await authService.register(data)
      const regUser = res.user || null
      setUser(regUser)
      if (regUser?.email) {
        setKycStatus(getInitialKycStatus(regUser.email))
      }
    } catch (err) {
      console.warn('API registration failed. Falling back to mock session.', err)
      const mockUser: User = {
        id: 'mock-planner-id-' + Date.now(),
        email: data.email || 'partner@beaconplanner.com',
        name: data.name || (data.email || 'Travel Partner').split('@')[0],
        role: 'PLANNER'
      }
      setUser(mockUser)
      setKycStatus(getInitialKycStatus(mockUser.email))
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (e) {
      console.error('Logout API failed', e)
    }
    try {
      await signOut(firebaseAuth)
    } catch (e) {
      console.error('Firebase sign out failed', e)
    }
    toast.success('Logged out successfully')
    setUser(null)
  }

  const isKycVerified = kycStatus === 'VERIFIED'

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-canvas)] flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <img src="/planner/beacon-logo.png" alt="Beacon" className="h-10 w-auto object-contain animate-pulse" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <div className="w-6 h-6 border-2 border-cyan/20 border-t-cyan rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        kycStatus,
        isKycVerified,
        highlightBusinessProfile,
        login,
        register,
        logout,
        updateKycStatus,
        triggerBusinessProfileHighlight,
        clearBusinessProfileHighlight,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
