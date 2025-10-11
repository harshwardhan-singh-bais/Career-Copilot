"use client"

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, X, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilePreview {
  name: string
  size: string
  id: string
}

interface UploadBoxProps {
  onFileSelect?: (files: File[]) => void
  accept?: string
  maxFiles?: number
  className?: string
  disabled?: boolean
}

export const UploadBox: React.FC<UploadBoxProps> = ({
  onFileSelect,
  accept = '.pdf,.docx',
  maxFiles = 1,
  className,
  disabled = false
}) => {
  const [dragOver, setDragOver] = useState(false)
  const [files, setFiles] = useState<FilePreview[]>([])
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const validateFile = (file: File): boolean => {
    const validTypes = accept.split(',').map(type => type.trim())
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    return validTypes.includes(fileExtension)
  }

  const handleFiles = (fileList: FileList) => {
    setError('')
    const newFiles: FilePreview[] = []
    const validFiles: File[] = []

    Array.from(fileList).forEach(file => {
      if (!validateFile(file)) {
        setError('Invalid file type. Please upload PDF or DOCX files.')
        return
      }

      if (files.length + newFiles.length >= maxFiles) {
        setError(`Maximum ${maxFiles} file(s) allowed.`)
        return
      }

      const preview: FilePreview = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: formatFileSize(file.size)
      }

      newFiles.push(preview)
      validFiles.push(file)
    })

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles])
      onFileSelect?.(validFiles)
      
      // Announce to screen readers
      const announcement = `${newFiles.length} file(s) uploaded: ${newFiles.map(f => f.name).join(', ')}`
      const ariaLive = document.createElement('div')
      ariaLive.setAttribute('aria-live', 'polite')
      ariaLive.setAttribute('aria-atomic', 'true')
      ariaLive.className = 'sr-only'
      ariaLive.textContent = announcement
      document.body.appendChild(ariaLive)
      setTimeout(() => document.body.removeChild(ariaLive), 1000)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (!disabled && e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
    setError('')
  }

  return (
    <div className={cn("w-full", className)}>
      <motion.div
        className={cn(
          "relative border-2 border-dashed rounded-card p-8",
          "bg-glass-bg backdrop-blur-glass",
          "transition-all duration-fast ease-fast",
          "cursor-pointer",
          dragOver ? "border-accent bg-accent/5" : "border-white/20",
          disabled && "opacity-50 cursor-not-allowed",
          "focus:outline-none focus:shadow-focus"
        )}
        style={{
          backgroundColor: dragOver ? 'rgba(167, 139, 250, 0.05)' : 'var(--color-glass-bg)',
          borderColor: dragOver ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.2)'
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Upload resume files"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        whileHover={!disabled ? { scale: 1.02 } : undefined}
        whileTap={!disabled ? { scale: 0.98 } : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="flex flex-col items-center text-center">
          <motion.div
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mb-4",
              dragOver ? "bg-accent/20" : "bg-white/10"
            )}
            animate={{ scale: dragOver ? 1.1 : 1 }}
            transition={{ duration: 0.18 }}
          >
            <Upload 
              className="w-6 h-6"
              style={{ color: dragOver ? 'var(--color-accent)' : 'var(--color-white)' }}
            />
          </motion.div>
          
          <h3 
            className="text-h3 font-medium mb-2"
            style={{ color: 'var(--color-white)' }}
          >
            {dragOver ? 'Drop files here' : 'Upload your resume'}
          </h3>
          
          <p 
            className="text-small mb-4"
            style={{ color: 'var(--color-muted-text)' }}
          >
            Drag & drop your resume here or click to browse (PDF, DOCX)
          </p>
          
          <div 
            className="text-small"
            style={{ color: 'var(--color-muted-text)' }}
          >
            Maximum {maxFiles} file{maxFiles > 1 ? 's' : ''} • PDF, DOCX up to 10MB
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div
          className="mt-3 text-small text-red-400"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
        >
          {error}
        </motion.div>
      )}

      {files.length > 0 && (
        <motion.div
          className="mt-4 space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
        >
          {files.map((file) => (
            <div
              key={file.id}
              className={cn(
                "flex items-center justify-between p-3 rounded-button",
                "bg-glass-bg backdrop-blur-glass border border-white/10"
              )}
              style={{ backgroundColor: 'var(--color-glass-bg)' }}
            >
              <div className="flex items-center space-x-3">
                <FileText 
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: 'var(--color-accent)' }}
                />
                <div>
                  <p 
                    className="text-body font-medium"
                    style={{ color: 'var(--color-white)' }}
                  >
                    {file.name}
                  </p>
                  <p 
                    className="text-small"
                    style={{ color: 'var(--color-muted-text)' }}
                  >
                    {file.size}
                  </p>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(file.id)
                }}
                className={cn(
                  "p-1 rounded-full transition-colors duration-fast",
                  "hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                )}
                aria-label={`Remove ${file.name}`}
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}