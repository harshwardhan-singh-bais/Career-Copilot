"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FooterProps {
  className?: string
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <motion.footer
      className={cn(
        "fixed bottom-0 left-0 right-0 z-20",
        "bg-glass-bg backdrop-blur-glass",
        "border-t border-white/5",
        "px-6 py-4",
        className
      )}
      style={{ backgroundColor: 'var(--color-glass-bg)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.2, 0.9, 0.2, 1] }}
    >
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <div className="flex items-center space-x-6 text-small">
          <p style={{ color: 'var(--color-muted-text)' }}>
            Crafted with ❤️ by{' '}
            <span 
              className="font-medium"
              style={{ color: 'var(--color-white)' }}
            >
              Career Copilot
            </span>
          </p>
          
          <div className="hidden sm:flex items-center space-x-4">
            <button
              className={cn(
                "transition-colors duration-fast hover:text-white",
                "focus:outline-none focus:ring-2 focus:ring-white/20 rounded"
              )}
              style={{ color: 'var(--color-muted-text)' }}
            >
              Privacy
            </button>
            <span style={{ color: 'var(--color-muted-text)' }}>•</span>
            <button
              className={cn(
                "transition-colors duration-fast hover:text-white",
                "focus:outline-none focus:ring-2 focus:ring-white/20 rounded"
              )}
              style={{ color: 'var(--color-muted-text)' }}
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}