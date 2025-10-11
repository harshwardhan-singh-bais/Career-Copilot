"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  title?: string
  subtitle?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

export const GlassCard: React.FC<GlassCardProps> = ({
  title,
  subtitle,
  children,
  footer,
  className,
  onClick,
  hoverable = true
}) => {
  return (
    <motion.div
      className={cn(
        "bg-glass-bg backdrop-blur-glass rounded-card shadow-card p-6",
        "border border-white/5",
        hoverable && "cursor-pointer",
        className
      )}
      style={{
        backgroundColor: 'var(--color-glass-bg)',
      }}
      whileHover={hoverable ? { y: -6, scale: 1.01 } : undefined}
      transition={{ duration: 0.18, ease: [0.2, 0.9, 0.2, 1] }}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h2 
              className="text-h2 text-white font-semibold mb-2"
              style={{ color: 'var(--color-white)' }}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p 
              className="text-small"
              style={{ color: 'var(--color-muted-text)' }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      <div className="flex-1">
        {children}
      </div>
      
      {footer && (
        <div className="mt-6 pt-4 border-t border-white/10">
          {footer}
        </div>
      )}
    </motion.div>
  )
}