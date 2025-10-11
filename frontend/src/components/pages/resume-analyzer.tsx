"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'
import { GlassCard, UploadBox, ResultBox, GradientButton, LoadingSkeleton, useToast } from '@/components/ui'

const mockAnalysisResult = `Strengths

• Strong Python & data analysis experience
• Several hands-on project implementations with measurable impact

Improvements

• Add quantitative metrics (e.g., "reduced latency by 30%")
• Include deployment / CI details under projects

Keywords to add

MLOps • Docker • Kubernetes • AWS • SQL`

const mockKeywords = ['Python', 'Pandas', 'ML', 'MLOps', 'Docker', 'Kubernetes', 'AWS', 'SQL']

interface AnalysisSection {
  title: string
  items: string[]
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
}

const analysisSections: AnalysisSection[] = [
  {
    title: 'Strengths Found',
    items: [
      'Strong Python & data analysis experience',
      'Several hands-on project implementations with measurable impact'
    ],
    icon: CheckCircle,
    color: '#22C55E'
  },
  {
    title: 'Areas for Improvement',
    items: [
      'Add quantitative metrics (e.g., "reduced latency by 30%")',
      'Include deployment / CI details under projects'
    ],
    icon: AlertCircle,
    color: '#F59E0B'
  },
  {
    title: 'Suggested Keywords',
    items: ['MLOps', 'Docker', 'Kubernetes', 'AWS', 'SQL'],
    icon: TrendingUp,
    color: '#3B82F6'
  }
]

export const ResumeAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<string>('')
  const [hasFile, setHasFile] = useState(false)
  const { success } = useToast()

  const handleFileSelect = () => {
    setHasFile(true)
    setIsAnalyzing(true)
    
    // Mock analysis delay
    setTimeout(() => {
      setAnalysisResult(mockAnalysisResult)
      setIsAnalyzing(false)
      success('Resume uploaded')
    }, 2000)
  }

  const handleAnalyze = () => {
    if (!hasFile) return
    
    setIsAnalyzing(true)
    setAnalysisResult('')
    
    setTimeout(() => {
      setAnalysisResult(mockAnalysisResult)
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleCopy = () => {
    success('Copied to clipboard')
  }

  const handleDownload = () => {
    success('Mock generation complete')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 
          className="text-h1 font-bold mb-4"
          style={{ color: 'var(--color-white)' }}
        >
          Resume Analyzer
        </h1>
        <p 
          className="text-body max-w-2xl"
          style={{ color: 'var(--color-muted-text)' }}
        >
          Upload your resume and get instant, actionable feedback to improve your chances of landing your dream job.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard
            title="Upload Resume"
            subtitle="Upload your resume and get instant, actionable feedback."
            className="h-fit"
          >
            <UploadBox
              onFileSelect={handleFileSelect}
              accept=".pdf,.docx"
              className="mb-6"
            />
            
            {hasFile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center"
              >
                <GradientButton
                  onClick={handleAnalyze}
                  loading={isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                </GradientButton>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard
            title="Analysis Results"
            subtitle="Comprehensive feedback and suggestions"
            className="h-fit"
          >
            {isAnalyzing ? (
              <LoadingSkeleton lines={6} />
            ) : analysisResult ? (
              <ResultBox
                content={analysisResult}
                isGenerating={false}
                showCopyButton
                showDownloadButton
                highlightedTerms={mockKeywords}
                onCopy={handleCopy}
                onDownload={handleDownload}
                className="border-none shadow-none bg-transparent p-0"
              />
            ) : (
              <div 
                className="text-center py-12"
                style={{ color: 'var(--color-muted-text)' }}
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <p className="text-body">
                  Upload a resume to see detailed analysis and recommendations
                </p>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* Detailed Breakdown */}
      {analysisResult && !isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 
            className="text-h2 font-semibold mb-6"
            style={{ color: 'var(--color-white)' }}
          >
            Detailed Breakdown
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {analysisSections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.7 }}
                >
                  <GlassCard className="h-full" hoverable={false}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-button flex items-center justify-center"
                        style={{ backgroundColor: `${section.color}20` }}
                      >
                        <Icon 
                          className="w-5 h-5"
                          style={{ color: section.color }}
                        />
                      </div>
                      <h3 
                        className="text-h3 font-semibold"
                        style={{ color: 'var(--color-white)' }}
                      >
                        {section.title}
                      </h3>
                    </div>
                    
                    <ul className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start space-x-2"
                        >
                          <div 
                            className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: section.color }}
                          />
                          <span 
                            className="text-body"
                            style={{ color: 'var(--color-text)' }}
                          >
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      )}

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <GlassCard 
          title="Pro Tips" 
          className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20"
          hoverable={false}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 
                className="font-semibold mb-3"
                style={{ color: 'var(--color-white)' }}
              >
                Before Uploading
              </h4>
              <ul className="space-y-2 text-small" style={{ color: 'var(--color-muted-text)' }}>
                <li>• Ensure your resume is in PDF or DOCX format</li>
                <li>• Use a clean, professional layout</li>
                <li>• Include relevant keywords for your target role</li>
              </ul>
            </div>
            <div>
              <h4 
                className="font-semibold mb-3"
                style={{ color: 'var(--color-white)' }}
              >
                After Analysis
              </h4>
              <ul className="space-y-2 text-small" style={{ color: 'var(--color-muted-text)' }}>
                <li>• Focus on high-impact improvements first</li>
                <li>• Test your resume with different job descriptions</li>
                <li>• Re-analyze after making changes</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}