import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ShieldCheck, AlertTriangle, ArrowRight, X, Building2,
  UserCheck, Lock, Sparkles, CheckCircle2, FileText, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

interface VerificationPromptModalProps {
  isOpen: boolean
  onClose: () => void
  reason?: 'POST_LOGIN' | 'CREATE_PACKAGE_BLOCKED' | 'PAYMENT_BLOCKED'
}

export function VerificationPromptModal({
  isOpen,
  onClose,
  reason = 'POST_LOGIN'
}: VerificationPromptModalProps) {
  const navigate = useNavigate()
  const { user, triggerBusinessProfileHighlight } = useAuth()
  const [selectedPartnerType, setSelectedPartnerType] = useState<'FREELANCER' | 'COMPANY'>('FREELANCER')

  if (!isOpen) return null

  const handleGoToVerification = () => {
    onClose()
    navigate('/dashboard/business-profile?step=10')
  }

  const handleDismiss = () => {
    triggerBusinessProfileHighlight()
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-white border border-border/80 rounded-[24px] shadow-2xl overflow-hidden my-8"
        >
          {/* Header Banner */}
          <div className="relative p-6 bg-gradient-to-r bg-[var(--nav-bg)] text-white overflow-hidden">
            <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-cyan/15 blur-2xl pointer-events-none" />
            <div className="absolute right-12 bottom-0 w-24 h-24 rounded-full bg-teal/20 blur-xl pointer-events-none" />

            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 tracking-wide uppercase">
                <AlertTriangle className="w-3.5 h-3.5" />
                {reason === 'CREATE_PACKAGE_BLOCKED' ? 'Action Restricted' : 'Verification Required'}
              </span>
              <span className="text-xs text-white/60">Step 1 of 1</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-cyan shrink-0" />
              Complete Your eKYC Verification
            </h2>

            <p className="text-xs sm:text-sm text-white/80 mt-1.5 leading-relaxed">
              {reason === 'CREATE_PACKAGE_BLOCKED'
                ? 'To create and publish travel packages on Beacon, complete your identity & business eKYC verification first.'
                : `Welcome to Beacon Planner! To activate package creation, receive bookings, and enable online payouts, please complete your eKYC.`}
            </p>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5">
            {/* Why Verification Matters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-[14px] bg-[var(--color-bg-surface-raised)] border border-border/60 flex flex-col items-start">
                <div className="w-7 h-7 rounded-[8px] bg-cyan/15 text-cyan flex items-center justify-center mb-2">
                  <Sparkles className="w-4 h-4 text-[var(--color-link)]" />
                </div>
                <h4 className="text-xs font-bold text-navy">Verified Badge</h4>
                <p className="text-[11px] text-muted mt-0.5">Increases traveler trust and booking conversion.</p>
              </div>

              <div className="p-3 rounded-[14px] bg-[var(--color-bg-surface-raised)] border border-border/60 flex flex-col items-start">
                <div className="w-7 h-7 rounded-[8px] bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                </div>
                <h4 className="text-xs font-bold text-navy">Create Packages</h4>
                <p className="text-[11px] text-muted mt-0.5">Unlock publishing custom itineraries & trips.</p>
              </div>

              <div className="p-3 rounded-[14px] bg-[var(--color-bg-surface-raised)] border border-border/60 flex flex-col items-start">
                <div className="w-7 h-7 rounded-[8px] bg-purple-500/15 text-purple-600 flex items-center justify-center mb-2">
                  <Lock className="w-4 h-4 text-purple-600" />
                </div>
                <h4 className="text-xs font-bold text-navy">Direct Payouts</h4>
                <p className="text-[11px] text-muted mt-0.5">Fast UPI & NetBanking settlements via PhonePe.</p>
              </div>
            </div>

            {/* Account Type Selector & Document Preview */}
            <div className="p-4 rounded-[16px] bg-[var(--color-bg-surface)] border border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-navy uppercase tracking-wider">Required Document Checklist</span>
                <div className="flex items-center gap-1 bg-[#E8F1F8] p-0.5 rounded-[10px]">
                  <button
                    type="button"
                    onClick={() => setSelectedPartnerType('FREELANCER')}
                    className={cn(
                      'px-2.5 py-1 text-[11px] font-bold rounded-[8px] transition-all',
                      selectedPartnerType === 'FREELANCER'
                        ? 'bg-white text-navy shadow-sm'
                        : 'text-muted hover:text-navy'
                    )}
                  >
                    Freelancer
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPartnerType('COMPANY')}
                    className={cn(
                      'px-2.5 py-1 text-[11px] font-bold rounded-[8px] transition-all',
                      selectedPartnerType === 'COMPANY'
                        ? 'bg-white text-navy shadow-sm'
                        : 'text-muted hover:text-navy'
                    )}
                  >
                    Company / Firm
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] text-navy/90">
                {selectedPartnerType === 'FREELANCER' ? (
                  <>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-[10px] border border-border/60">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                      <span>Govt ID (Aadhaar / Passport)</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-[10px] border border-border/60">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                      <span>Personal PAN Card</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-[10px] border border-border/60">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                      <span>Live Selfie Photo Verification</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-[10px] border border-border/60">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                      <span>Bank Proof / Cancelled Cheque</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-[10px] border border-border/60">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                      <span>Company Incorporation / CIN</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-[10px] border border-border/60">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                      <span>Company PAN & GST Certificate</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-[10px] border border-border/60">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                      <span>Authorized Signatory ID & Selfie</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-[10px] border border-border/60">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0" />
                      <span>Company Bank Account Proof</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Note & Action Buttons */}
            <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDismiss}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-muted hover:text-navy transition-colors text-center"
              >
                I'll do it later
              </button>

              <Button
                type="button"
                onClick={handleGoToVerification}
                glow
                className="w-full sm:w-auto px-6 py-2.5 font-bold text-sm bg-gradient-to-r from-teal to-cyan text-white shadow-lg shadow-cyan/20 flex items-center justify-center gap-2"
              >
                <span>Complete Verification Now</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
