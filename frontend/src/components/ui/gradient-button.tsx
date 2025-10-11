"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GradientButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'ghost' | 'disabled'
  loading?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  className,
  onClick,
  type = 'button',
  'aria-label': ariaLabel,
}) => {
  const isDisabled = disabled || loading

  const baseClasses = cn(
    "px-6 py-3 rounded-button font-medium text-body",
    "transition-all duration-fast ease-fast",
    "focus:outline-none focus:shadow-focus",
    "relative overflow-hidden",
    className
  )

  const variantClasses = {
    primary: cn(
      "bg-primary-gradient text-white",
      "shadow-sm",
      !isDisabled && "hover:shadow-glow"
    ),
    ghost: cn(
      "border-2 text-white",
      "bg-transparent hover:bg-glass-bg"
    ),
    disabled: "bg-gray-600 text-gray-400 cursor-not-allowed"
  }

  const currentVariant = isDisabled ? 'disabled' : variant

  return (
    <motion.button
      type={type}
      className={cn(baseClasses, variantClasses[currentVariant])}
      style={{
        background: currentVariant === 'primary' ? 'var(--gradient-primary)' : undefined,
        borderColor: currentVariant === 'ghost' ? 'var(--color-accent)' : undefined,
        color: currentVariant === 'ghost' ? 'var(--color-white)' : undefined,
      }}
      whileTap={!isDisabled ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.18, ease: [0.2, 0.9, 0.2, 1] }}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      )}
      
      <span className={cn(loading && "opacity-0")}>
        {children}
      </span>
    </motion.button>
  )
}