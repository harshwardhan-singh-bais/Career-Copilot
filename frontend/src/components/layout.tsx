"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar, Sidebar, Footer, ToastContainer, useToast } from '@/components/ui'
import { AnimatedBackground } from '@/components/animated-background'

interface LayoutProps {
  children: React.ReactNode
  pageTitle?: string
}

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
}

const pageTransition = {
  duration: 0.32,
  ease: "easeOut" as const
}

export const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  const { toasts, removeToast } = useToast()

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <Navbar pageTitle={pageTitle} />
      <Sidebar />
      
      {/* Main content area */}
      <main className="pt-20 pb-20 pl-6 pr-6 md:pl-80">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={pageTitle || 'page'}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={pageTransition}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      
      <Footer />
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  )
}