"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  FileText, 
  Search, 
  Mail, 
  History, 
  Menu, 
  X 
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Resume', href: '/resume', icon: FileText },
  { name: 'Job Match', href: '/job-match', icon: Search },
  { name: 'Cover Letter', href: '/cover-letter', icon: Mail },
  { name: 'History', href: '/history', icon: History },
]

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  const NavItem: React.FC<{ item: typeof navigation[0]; isMobile?: boolean }> = ({ 
    item, 
    isMobile = false 
  }) => {
    const isActive = pathname === item.href
    const Icon = item.icon

    return (
      <Link href={item.href} onClick={() => isMobile && setIsMobileOpen(false)}>
        <motion.div
          className={cn(
            "flex items-center space-x-3 px-4 py-3 rounded-button",
            "transition-all duration-fast ease-fast",
            "group relative",
            isActive 
              ? "bg-white/10 text-white" 
              : "text-muted-text hover:text-white hover:bg-white/5"
          )}
          style={{
            color: isActive ? 'var(--color-white)' : 'var(--color-muted-text)'
          }}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Active indicator */}
          {isActive && (
            <motion.div
              className="absolute left-0 top-1/2 w-1 h-6 bg-primary-gradient rounded-r-full"
              style={{ background: 'var(--gradient-primary)' }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.18 }}
            />
          )}

          <Icon 
            className={cn(
              "w-5 h-5 transition-colors duration-fast",
              isActive && "text-accent"
            )}
            style={{
              color: isActive ? 'var(--color-accent)' : undefined
            }}
          />
          <span className="font-medium">{item.name}</span>

          {/* Glow effect for active item */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-button shadow-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.32 }}
            />
          )}
        </motion.div>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className={cn(
          "fixed top-4 left-4 z-50 md:hidden",
          "p-2 rounded-button bg-glass-bg backdrop-blur-glass",
          "border border-white/10",
          "transition-all duration-fast"
        )}
        style={{ backgroundColor: 'var(--color-glass-bg)' }}
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6" style={{ color: 'var(--color-white)' }} />
        ) : (
          <Menu className="w-6 h-6" style={{ color: 'var(--color-white)' }} />
        )}
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        className={cn(
          "fixed left-6 top-24 bottom-6 w-64 z-30",
          "bg-glass-bg backdrop-blur-glass rounded-card",
          "border border-white/5 shadow-card",
          "p-6 hidden md:block",
          className
        )}
        style={{ backgroundColor: 'var(--color-glass-bg)' }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.32, ease: [0.2, 0.9, 0.2, 1] }}
      >
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </nav>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Mobile Sidebar */}
            <motion.aside
              className={cn(
                "fixed top-0 left-0 bottom-0 w-80 z-50 md:hidden",
                "bg-glass-bg backdrop-blur-glass",
                "border-r border-white/5",
                "p-6 pt-20"
              )}
              style={{ backgroundColor: 'var(--color-glass-bg)' }}
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.32, ease: [0.2, 0.9, 0.2, 1] }}
            >
              <nav className="space-y-2">
                {navigation.map((item) => (
                  <NavItem key={item.name} item={item} isMobile />
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}