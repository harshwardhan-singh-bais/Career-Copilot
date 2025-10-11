"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Sparkles } from 'lucide-react'
import { 
  GlassCard, 
  Textarea, 
  GradientButton, 
  ResultBox,
  LoadingSkeleton,
  useToast 
} from '@/components/ui'

const mockCoverLetter = `Dear Hiring Manager,

I'm excited to apply for the Machine Learning Engineer role at [Company]. With 3+ years building data-driven systems in Python and deploying models to production, I delivered a recommendation engine that improved conversion by 12%. I'm passionate about building scalable ML systems and would love to bring that experience to your team.

Sincerely,
Titan X`

const coverLetterTips = [
  {
    title: 'Personalization',
    items: [
      'Address the hiring manager by name when possible',
      'Mention the specific company and role',
      'Reference something unique about the company'
    ]
  },
  {
    title: 'Content Structure',
    items: [
      'Open with enthusiasm and the specific role',
      'Highlight 2-3 relevant achievements with metrics',
      'Connect your experience to their needs'
    ]
  },
  {
    title: 'Final Polish',
    items: [
      'Keep it concise (3-4 paragraphs maximum)',
      'Use active voice and strong action verbs',
      'Proofread for grammar and spelling errors'
    ]
  }
]

export const CoverLetterGenerator: React.FC = () => {
  const [jobInput, setJobInput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedLetter, setGeneratedLetter] = useState('')
  const { success } = useToast()

  const handleGenerate = () => {
    if (!jobInput.trim()) return
    
    setIsGenerating(true)
    setGeneratedLetter('')
    
    // Mock generation delay
    setTimeout(() => {
      setGeneratedLetter(mockCoverLetter)
      setIsGenerating(false)
      success('Cover letter generated')
    }, 3000)
  }

  const handleCopy = () => {
    success('Copied to clipboard')
  }

  const handleDownload = () => {
    // Create a blob with the cover letter content
    const blob = new Blob([generatedLetter], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cover-letter.txt'
    a.click()
    URL.revokeObjectURL(url)
    success('Cover letter downloaded')
  }

  const handleClear = () => {
    setJobInput('')
    setGeneratedLetter('')
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
          Cover Letter Generator
        </h1>
        <p 
          className="text-body max-w-2xl"
          style={{ color: 'var(--color-muted-text)' }}
        >
          Enter target role or job description and generate a tailored cover letter that highlights your relevant experience and enthusiasm.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard
            title="Job Information"
            subtitle="Enter target role or job description and generate a tailored cover letter."
          >
            <div className="space-y-6">
              <Textarea
                placeholder="Paste job description or role summary here…"
                value={jobInput}
                onChange={(e) => setJobInput(e.target.value)}
                rows={10}
                className="resize-none"
              />
              
              <div className="flex space-x-3">
                <GradientButton
                  onClick={handleGenerate}
                  loading={isGenerating}
                  disabled={!jobInput.trim() || isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
                </GradientButton>
                
                <GradientButton
                  variant="ghost"
                  onClick={handleClear}
                  disabled={isGenerating}
                >
                  Clear
                </GradientButton>
              </div>
              
              {/* Quick Templates */}
              <div className="pt-4 border-t border-white/10">
                <h4 
                  className="text-body font-medium mb-3"
                  style={{ color: 'var(--color-white)' }}
                >
                  Quick Templates
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    'Software Engineer at Tech Startup',
                    'Data Scientist at Fortune 500',
                    'Product Manager at SaaS Company'
                  ].map((template) => (
                    <button
                      key={template}
                      onClick={() => setJobInput(`Role: ${template}\n\nPlease generate a cover letter for this position.`)}
                      className="text-left p-3 rounded-button bg-white/5 hover:bg-white/10 transition-colors text-small"
                      style={{ color: 'var(--color-muted-text)' }}
                      disabled={isGenerating}
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard
            title="Generated Cover Letter"
            subtitle="Your personalized cover letter ready to customize"
          >
            {isGenerating ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                  <span 
                    className="text-body"
                    style={{ color: 'var(--color-muted-text)' }}
                  >
                    Crafting your perfect cover letter...
                  </span>
                </div>
                <LoadingSkeleton lines={8} showChips={false} />
              </div>
            ) : generatedLetter ? (
              <ResultBox
                content={generatedLetter}
                isGenerating={isGenerating}
                showCopyButton
                showDownloadButton
                onCopy={handleCopy}
                onDownload={handleDownload}
                className="border-none shadow-none bg-transparent p-0"
              />
            ) : (
              <div 
                className="text-center py-16"
                style={{ color: 'var(--color-muted-text)' }}
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8" />
                </div>
                <p className="text-body mb-4">
                  Enter job details to generate a personalized cover letter
                </p>
                <p className="text-small">
                  Our AI will create a tailored letter highlighting your relevant experience
                </p>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* Cover Letter Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 
          className="text-h2 font-semibold mb-6"
          style={{ color: 'var(--color-white)' }}
        >
          Cover Letter Best Practices
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {coverLetterTips.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.7 }}
            >
              <GlassCard className="h-full" hoverable={false}>
                <h3 
                  className="text-h3 font-semibold mb-4"
                  style={{ color: 'var(--color-white)' }}
                >
                  {tip.title}
                </h3>
                
                <ul className="space-y-3">
                  {tip.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start space-x-2"
                    >
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                        style={{ backgroundColor: 'var(--color-accent)' }}
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
          ))}
        </div>
      </motion.div>

      {/* Sample Cover Letter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <GlassCard 
          title="Sample Cover Letter Structure"
          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20"
          hoverable={false}
        >
          <div className="space-y-4 text-body" style={{ color: 'var(--color-text)' }}>
            <div>
              <span className="font-semibold" style={{ color: 'var(--color-white)' }}>
                Opening (30-40 words):
              </span>
              <span style={{ color: 'var(--color-muted-text)' }}>
                {' '}&quot;I&apos;m excited to apply for [Role] at [Company]. With [X years] of experience in [relevant field], I&apos;m confident I can contribute to [specific company goal/project].&quot;
              </span>
            </div>
            
            <div>
              <span className="font-semibold" style={{ color: 'var(--color-white)' }}>
                Body (60-80 words):
              </span>
              <span style={{ color: 'var(--color-muted-text)' }}>
                {' '}&quot;In my previous role at [Company], I [specific achievement with metrics]. This experience in [relevant skill] aligns perfectly with your need for [job requirement].&quot;
              </span>
            </div>
            
            <div>
              <span className="font-semibold" style={{ color: 'var(--color-white)' }}>
                Closing (20-30 words):
              </span>
              <span style={{ color: 'var(--color-muted-text)' }}>
                {' '}&quot;I&apos;m excited about the opportunity to [specific contribution] and would welcome the chance to discuss how my background in [skill] can benefit your team.&quot;
              </span>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}