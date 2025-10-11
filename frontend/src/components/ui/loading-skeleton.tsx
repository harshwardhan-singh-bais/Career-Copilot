"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  className?: string
  lines?: number
  showChips?: boolean
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  lines = 3,
  showChips = true
}) => {
  return (
    <motion.div
      className={cn("space-y-4", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32 }}
    >
      {/* Title bar skeleton */}
      <div className="space-y-2">
        <div 
          className="h-6 rounded bg-white/10 animate-pulse"
          style={{ width: '60%' }}
        />
        <div 
          className="h-4 rounded bg-white/5 animate-pulse"
          style={{ width: '40%' }}
        />
      </div>

      {/* Content lines skeleton */}
      <div className="space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-4 rounded bg-white/10 animate-pulse",
              index === lines - 1 && "w-3/4" // Last line shorter
            )}
            style={{
              animationDelay: `${index * 0.1}s`,
              animationDuration: '1.5s'
            }}
          />
        ))}
      </div>

      {/* Chips skeleton */}
      {showChips && (
        <div className="flex space-x-2 mt-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-6 w-16 rounded-full bg-white/10 animate-pulse"
              style={{
                animationDelay: `${index * 0.15}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export const SkeletonLine: React.FC<{ width?: string; height?: string; className?: string }> = ({
  width = '100%',
  height = '1rem',
  className
}) => (
  <div
    className={cn("rounded bg-white/10 animate-pulse", className)}
    style={{ width, height }}
  />
)

export const SkeletonCircle: React.FC<{ size?: string; className?: string }> = ({
  size = '3rem',
  className
}) => (
  <div
    className={cn("rounded-full bg-white/10 animate-pulse", className)}
    style={{ width: size, height: size }}
  />
)