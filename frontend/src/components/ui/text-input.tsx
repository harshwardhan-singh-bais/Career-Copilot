"use client"

import React, { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  autosize?: boolean
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            className="block text-small font-medium mb-2"
            style={{ color: 'var(--color-text)' }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-button",
            "bg-glass-bg backdrop-blur-glass",
            "border border-white/10",
            "text-body placeholder:text-muted-text",
            "focus:outline-none focus:shadow-focus focus:border-accent/50",
            "transition-all duration-fast ease-fast",
            error && "border-red-500",
            className
          )}
          style={{
            backgroundColor: 'var(--color-glass-bg)',
            color: 'var(--color-text)',
          }}
          {...props}
        />
        {error && (
          <p className="mt-2 text-small text-red-400">
            {error}
          </p>
        )}
      </div>
    )
  }
)

TextInput.displayName = 'TextInput'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, autosize = true, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            className="block text-small font-medium mb-2"
            style={{ color: 'var(--color-text)' }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-button resize-none",
            "bg-glass-bg backdrop-blur-glass",
            "border border-white/10",
            "text-body placeholder:text-muted-text",
            "focus:outline-none focus:shadow-focus focus:border-accent/50",
            "transition-all duration-fast ease-fast",
            autosize ? "min-h-[120px] max-h-[400px]" : "h-32",
            error && "border-red-500",
            className
          )}
          style={{
            backgroundColor: 'var(--color-glass-bg)',
            color: 'var(--color-text)',
          }}
          {...props}
        />
        {error && (
          <p className="mt-2 text-small text-red-400">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'