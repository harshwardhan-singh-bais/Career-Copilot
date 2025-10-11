"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Toast {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

interface ToastProps extends Toast {
  onClose: (id: string) => void
}

interface ToastContainerProps {
  toasts: Toast[]
  onClose: (id: string) => void
}

const ToastComponent: React.FC<ToastProps> = ({ 
  id, 
  message, 
  type = 'info', 
  duration = 5000, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onClose(id), 300) // Wait for exit animation
    }, duration)

    return () => clearTimeout(timer)
  }, [id, duration, onClose])

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  }

  const colors = {
    success: 'text-green-400',
    error: 'text-red-400',
    info: 'text-blue-400'
  }

  const Icon = icons[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "flex items-center space-x-3 p-4 rounded-button",
            "bg-glass-bg backdrop-blur-glass border border-white/10",
            "shadow-card max-w-sm w-full"
          )}
          style={{ backgroundColor: 'var(--color-glass-bg)' }}
          initial={{ opacity: 0, x: 300, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.9 }}
          transition={{ duration: 0.32, ease: [0.2, 0.9, 0.2, 1] }}
          layout
        >
          <Icon className={cn("w-5 h-5 flex-shrink-0", colors[type])} />
          
          <p 
            className="text-body flex-1"
            style={{ color: 'var(--color-text)' }}
          >
            {message}
          </p>
          
          <button
            onClick={() => {
              setIsVisible(false)
              setTimeout(() => onClose(id), 300)
            }}
            className={cn(
              "p-1 rounded-full transition-colors duration-fast",
              "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            )}
            aria-label="Close notification"
          >
            <X className="w-4 h-4" style={{ color: 'var(--color-muted-text)' }} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            {...toast}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: Toast['type'] = 'info', duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = { id, message, type, duration }
    setToasts(prev => [...prev, newToast])
    return id
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const success = (message: string, duration?: number) => addToast(message, 'success', duration)
  const error = (message: string, duration?: number) => addToast(message, 'error', duration)
  const info = (message: string, duration?: number) => addToast(message, 'info', duration)

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info
  }
}