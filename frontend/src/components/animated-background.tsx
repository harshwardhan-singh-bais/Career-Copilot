"use client"

import React from 'react'
import { motion } from 'framer-motion'

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(124, 58, 237, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 40% 80%, rgba(167, 139, 250, 0.06) 0%, transparent 60%),
            var(--color-bg-1)
          `
        }}
      />

      {/* Animated swirl */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            conic-gradient(from 0deg at 50% 50%, 
              transparent 0deg, 
              rgba(124, 58, 237, 0.03) 90deg, 
              transparent 180deg, 
              rgba(79, 70, 229, 0.03) 270deg, 
              transparent 360deg
            )
          `
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Subtle noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px'
        }}
      />
    </div>
  )
}