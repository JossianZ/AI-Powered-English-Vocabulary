'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export default function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={`glass-effect rounded-xl p-6 ${hover ? 'cursor-pointer hover:shadow-2xl' : ''} transition-all ${className}`}
    >
      {children}
    </motion.div>
  )
}
