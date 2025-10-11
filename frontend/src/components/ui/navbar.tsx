"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavbarProps {
  pageTitle?: string
}

export const Navbar: React.FC<NavbarProps> = ({ pageTitle }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-40",
        "bg-glass-bg backdrop-blur-glass",
        "border-b border-white/5",
        "px-6 py-4"
      )}
      style={{ backgroundColor: 'var(--color-glass-bg)' }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.2, 0.9, 0.2, 1] }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Logo + Title */}
        <div className="flex items-center space-x-4">
          <div 
            className="w-8 h-8 rounded-lg bg-primary-gradient flex items-center justify-center"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <span className="text-white font-bold text-sm">CC</span>
          </div>
          <h1 
            className="text-h3 font-semibold"
            style={{ color: 'var(--color-white)' }}
          >
            Career Copilot
          </h1>
        </div>

        {/* Center: Page Title */}
        {pageTitle && (
          <div className="hidden md:block">
            <h2 
              className="text-body font-medium"
              style={{ color: 'var(--color-text)' }}
            >
              {pageTitle}
            </h2>
          </div>
        )}

        {/* Right: Avatar + Settings */}
        <div className="flex items-center space-x-3">
          <button
            className={cn(
              "p-2 rounded-full transition-colors duration-fast",
              "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            )}
            aria-label="Settings"
          >
            <Settings 
              className="w-5 h-5"
              style={{ color: 'var(--color-muted-text)' }}
            />
          </button>

          <div className="relative">
            <button
              className={cn(
                "w-10 h-10 rounded-full bg-primary-gradient",
                "border-2 border-white/20",
                "flex items-center justify-center",
                "transition-all duration-fast",
                "hover:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50"
              )}
              style={{ 
                background: 'var(--gradient-primary)',
                borderColor: showDropdown ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.2)'
              }}
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="User menu"
              aria-expanded={showDropdown}
            >
              <span className="text-white font-medium text-sm">TX</span>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <motion.div
                className={cn(
                  "absolute right-0 top-12 w-48",
                  "bg-glass-bg backdrop-blur-glass rounded-button",
                  "border border-white/10 shadow-card",
                  "py-2"
                )}
                style={{ backgroundColor: 'var(--color-glass-bg)' }}
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.18, ease: [0.2, 0.9, 0.2, 1] }}
              >
                <button
                  className={cn(
                    "w-full px-4 py-2 text-left text-body",
                    "hover:bg-white/10 transition-colors duration-fast",
                    "flex items-center space-x-2"
                  )}
                  style={{ color: 'var(--color-text)' }}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>
                <button
                  className={cn(
                    "w-full px-4 py-2 text-left text-body",
                    "hover:bg-white/10 transition-colors duration-fast"
                  )}
                  style={{ color: 'var(--color-text)' }}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}