"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MatchScoreRingProps {
  score: number // 0-100
  size?: number
  strokeWidth?: number
  animated?: boolean
  className?: string
  showStats?: boolean
  stats?: {
    topSkills?: string[]
    missing?: string[]
    confidence?: string
  }
}

export const MatchScoreRing: React.FC<MatchScoreRingProps> = ({
  score,
  size = 160,
  strokeWidth = 8,
  animated = true,
  className,
  showStats = true,
  stats
}) => {
  const [animatedScore, setAnimatedScore] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedScore(score)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setAnimatedScore(score)
    }
  }, [score, animated])

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22C55E' // green-500
    if (score >= 60) return '#EAB308' // yellow-500
    if (score >= 40) return '#F97316' // orange-500
    return '#EF4444' // red-500
  }

  return (
    <div className={cn("flex flex-col items-center space-y-6", className)}>
      {/* Score Ring */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#gradient-${score})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ 
              duration: animated ? 1.2 : 0, 
              ease: [0.2, 0.9, 0.2, 1],
              delay: animated ? 0.2 : 0
            }}
            style={{
              filter: 'drop-shadow(0 0 8px rgba(124, 58, 237, 0.3))'
            }}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id={`gradient-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={getScoreColor(animatedScore)} />
              <stop offset="100%" stopColor="var(--color-accent)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Score text in center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="text-h1 font-bold"
            style={{ color: 'var(--color-white)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: animated ? 0.5 : 0, 
              delay: animated ? 0.8 : 0,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            {Math.round(animatedScore)}
          </motion.div>
          <div 
            className="text-small font-medium"
            style={{ color: 'var(--color-muted-text)' }}
          >
            Match Score
          </div>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${getScoreColor(animatedScore)}20 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: animated ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>

      {/* Stats */}
      {showStats && stats && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: animated ? 1.0 : 0 }}
        >
          {/* Top Skills */}
          {stats.topSkills && (
            <div className={cn(
              "bg-glass-bg backdrop-blur-glass rounded-button p-3",
              "border border-white/10 text-center"
            )}
            style={{ backgroundColor: 'var(--color-glass-bg)' }}
            >
              <div 
                className="text-small font-medium mb-1"
                style={{ color: 'var(--color-text)' }}
              >
                Top Skills Matched
              </div>
              <div 
                className="text-small"
                style={{ color: 'var(--color-muted-text)' }}
              >
                {stats.topSkills.join(', ')}
              </div>
            </div>
          )}

          {/* Missing Keywords */}
          {stats.missing && (
            <div className={cn(
              "bg-glass-bg backdrop-blur-glass rounded-button p-3",
              "border border-white/10 text-center"
            )}
            style={{ backgroundColor: 'var(--color-glass-bg)' }}
            >
              <div 
                className="text-small font-medium mb-1"
                style={{ color: 'var(--color-text)' }}
              >
                Missing
              </div>
              <div 
                className="text-small"
                style={{ color: 'var(--color-muted-text)' }}
              >
                {stats.missing.join(', ')}
              </div>
            </div>
          )}

          {/* Confidence */}
          {stats.confidence && (
            <div className={cn(
              "bg-glass-bg backdrop-blur-glass rounded-button p-3",
              "border border-white/10 text-center"
            )}
            style={{ backgroundColor: 'var(--color-glass-bg)' }}
            >
              <div 
                className="text-small font-medium mb-1"
                style={{ color: 'var(--color-text)' }}
              >
                Overall Confidence
              </div>
              <div 
                className="text-small"
                style={{ color: 'var(--color-muted-text)' }}
              >
                {stats.confidence}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}