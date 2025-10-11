"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Copy, Download, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ResultBoxProps {
  content: string
  title?: string
  isGenerating?: boolean
  className?: string
  showCopyButton?: boolean
  showDownloadButton?: boolean
  highlightedTerms?: string[]
  onCopy?: () => void
  onDownload?: () => void
}

export const ResultBox: React.FC<ResultBoxProps> = ({
  content,
  title,
  isGenerating = false,
  className,
  showCopyButton = true,
  showDownloadButton = false,
  highlightedTerms = [],
  onCopy,
  onDownload
}) => {
  const [displayedContent, setDisplayedContent] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  // Typing animation effect
  useEffect(() => {
    if (isGenerating) {
      setIsTyping(true)
      setDisplayedContent('')
      return
    }

    if (content && isTyping) {
      let index = 0
      const typingSpeed = Math.max(12, Math.min(18, 300 / content.length)) // Adaptive speed
      
      const timer = setInterval(() => {
        if (index < content.length) {
          setDisplayedContent(content.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(timer)
        }
      }, typingSpeed)

      return () => clearInterval(timer)
    } else if (content && !isTyping) {
      setDisplayedContent(content)
    }
  }, [content, isGenerating, isTyping])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setIsCopied(true)
      onCopy?.()
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const highlightContent = (text: string) => {
    if (highlightedTerms.length === 0) return text

    let highlightedText = text
    highlightedTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi')
      highlightedText = highlightedText.replace(
        regex,
        `<mark class="bg-accent/20 text-accent rounded px-1">$1</mark>`
      )
    })
    return highlightedText
  }

  return (
    <motion.div
      className={cn(
        "bg-glass-bg backdrop-blur-glass rounded-card",
        "border border-white/10 shadow-card",
        "relative overflow-hidden",
        className
      )}
      style={{ backgroundColor: 'var(--color-glass-bg)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.2, 0.9, 0.2, 1] }}
    >
      {/* Header */}
      {(title || showCopyButton || showDownloadButton) && (
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          {title && (
            <h3 
              className="text-h3 font-medium"
              style={{ color: 'var(--color-white)' }}
            >
              {title}
            </h3>
          )}
          
          <div className="flex items-center space-x-2">
            {showCopyButton && (
              <motion.button
                className={cn(
                  "p-2 rounded-button transition-all duration-fast",
                  "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20",
                  isCopied && "bg-green-500/20"
                )}
                onClick={handleCopy}
                disabled={!content || isGenerating}
                aria-label={isCopied ? "Copied to clipboard" : "Copy to clipboard"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCopied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy 
                    className="w-4 h-4"
                    style={{ color: 'var(--color-muted-text)' }}
                  />
                )}
              </motion.button>
            )}
            
            {showDownloadButton && (
              <motion.button
                className={cn(
                  "p-2 rounded-button transition-all duration-fast",
                  "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
                )}
                onClick={onDownload}
                disabled={!content || isGenerating}
                aria-label="Download content"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download 
                  className="w-4 h-4"
                  style={{ color: 'var(--color-muted-text)' }}
                />
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {isGenerating ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span 
                className="text-small"
                style={{ color: 'var(--color-muted-text)' }}
              >
                Generating...
              </span>
            </div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-white/10 rounded animate-pulse"
                  style={{
                    width: `${Math.random() * 40 + 60}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          </div>
        ) : displayedContent ? (
          <div className="relative">
            <div
              className="text-body leading-relaxed whitespace-pre-wrap"
              style={{ color: 'var(--color-text)' }}
              dangerouslySetInnerHTML={{
                __html: highlightContent(displayedContent)
              }}
            />
            
            {/* Typing shimmer effect */}
            {isTyping && (
              <motion.div
                className="absolute -right-1 top-0 w-1 h-6 bg-accent"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
          </div>
        ) : (
          <div 
            className="text-body text-center py-8"
            style={{ color: 'var(--color-muted-text)' }}
          >
            No content to display
          </div>
        )}
      </div>

      {/* Streaming gradient overlay while typing */}
      {isTyping && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)' }}
        />
      )}
    </motion.div>
  )
}