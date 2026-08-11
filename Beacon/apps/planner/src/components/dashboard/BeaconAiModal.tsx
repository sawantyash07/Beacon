import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot, Sparkles, Send, X, Clock, Calendar, MoveRight, CheckCircle2,
  Lightbulb, ArrowRight, Loader2
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { toast } from 'sonner'

interface BeaconAiModalProps {
  isOpen: boolean
  onClose: () => void
}

const EXAMPLE_PROMPTS = [
  'Move lunch to 1 PM.',
  'Add a hotel for the next 3 nights.',
  'Make Day 4 less busy.',
  'Duplicate this day.',
  'Shift everything after 3 PM by 30 minutes.'
]

export function BeaconAiModal({ isOpen, onClose }: BeaconAiModalProps) {
  const [prompt, setPrompt] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [aiResponse, setAiResponse] = useState<string | null>(null)

  if (!isOpen) return null

  const handleExecutePrompt = (textToRun?: string) => {
    const query = textToRun || prompt
    if (!query.trim()) return

    setIsProcessing(true)
    setAiResponse(null)

    // Simulate AI Copilot analysis and smart execution
    setTimeout(() => {
      setIsProcessing(false)
      if (query.toLowerCase().includes('lunch') || query.toLowerCase().includes('1 pm')) {
        setAiResponse('✅ Updated lunch dining schedule to 1:00 PM - 2:30 PM across Day 2 and Day 3 itineraries.')
        toast.success('Beacon AI updated lunch timing!')
      } else if (query.toLowerCase().includes('hotel') || query.toLowerCase().includes('nights')) {
        setAiResponse('✅ Added 4-Star Resort stay check-in for 3 consecutive nights with complimentary breakfast.')
        toast.success('Beacon AI added accommodation blocks!')
      } else if (query.toLowerCase().includes('less busy') || query.toLowerCase().includes('day 4')) {
        setAiResponse('✅ Optimized Day 4: Streamlined buffer time to 45 mins between spots and relaxed evening schedule.')
        toast.success('Beacon AI adjusted Day 4 pacing!')
      } else if (query.toLowerCase().includes('duplicate')) {
        setAiResponse('✅ Cloned current itinerary day into Day +1 with matching activity slots.')
        toast.success('Beacon AI duplicated the day!')
      } else if (query.toLowerCase().includes('shift') || query.toLowerCase().includes('30')) {
        setAiResponse('✅ Shifted 4 afternoon activities by +30 minutes forward to prevent scheduling conflicts.')
        toast.success('Beacon AI shifted timeline slots!')
      } else {
        setAiResponse(`✅ Successfully analyzed and applied: "${query}" to your active trip workspace.`)
        toast.success('Beacon AI processed your request!')
      }
    }, 900)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-surface border border-border rounded-[24px] shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-[#031525] via-[#092B48] to-[#0A3D62] text-white flex items-center justify-between border-b border-border/40 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-cyan/20 text-cyan flex items-center justify-center border border-cyan/30">
                <Bot className="w-6 h-6 text-cyan" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  Ask Beacon AI
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan/20 text-cyan border border-cyan/30 uppercase">
                    Ctrl + J
                  </span>
                </h2>
                <p className="text-xs text-white/70">Type in plain English to edit, shift, or optimize your trip itinerary.</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Prompt Area */}
          <div className="p-6 space-y-4">
            <div className="relative">
              <textarea
                rows={3}
                placeholder="Ask anything (e.g. Move lunch to 1 PM, add a hotel for next 3 nights, make Day 4 less busy...)"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleExecutePrompt()
                  }
                }}
                className="w-full p-3.5 bg-white border border-border rounded-[14px] text-sm text-navy placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-cyan/40 resize-none shadow-xs"
                autoFocus
              />
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <Button
                  onClick={() => handleExecutePrompt()}
                  disabled={!prompt.trim() || isProcessing}
                  size="xs"
                  glow
                  className="bg-gradient-to-r from-teal to-cyan text-white font-bold px-3 py-1.5 gap-1.5"
                >
                  {isProcessing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  <span>Run AI</span>
                </Button>
              </div>
            </div>

            {/* AI Result Card */}
            {aiResponse && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-[14px] text-xs text-emerald-800 font-medium flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex-1">{aiResponse}</div>
              </motion.div>
            )}

            {/* Quick Example Suggestions */}
            <div>
              <span className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Try these quick prompts
              </span>
              <div className="space-y-1.5">
                {EXAMPLE_PROMPTS.map((ex, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setPrompt(ex)
                      handleExecutePrompt(ex)
                    }}
                    className="w-full p-2.5 bg-page hover:bg-cyan/10 hover:border-cyan/30 border border-border/80 rounded-[12px] text-xs font-medium text-navy text-left flex items-center justify-between transition-all group"
                  >
                    <span>"{ex}"</span>
                    <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-cyan transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-page border-t border-border flex items-center justify-between text-xs text-muted">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white border rounded font-mono text-[10px]">Enter</kbd> to run</span>
            <button
              onClick={onClose}
              className="text-xs font-semibold text-muted hover:text-navy"
            >
              Close (Esc)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
