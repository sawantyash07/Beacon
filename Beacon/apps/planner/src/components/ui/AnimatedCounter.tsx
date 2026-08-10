import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AnimatedCounterProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({ value, prefix = '', suffix = '', duration = 2, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [value, duration])

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={className}
    >
      {prefix}{count.toLocaleString()}{suffix}
    </motion.span>
  )
}
