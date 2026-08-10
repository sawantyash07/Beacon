import { motion } from 'framer-motion'
import { Button } from './Button'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center text-teal mb-6"
      >
        {icon}
      </motion.div>
      <h3 className="text-lg font-semibold text-navy mb-2">{title}</h3>
      <p className="text-muted text-sm max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} glow>{actionLabel}</Button>
      )}
    </motion.div>
  )
}
