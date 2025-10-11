"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, TrendingUp, AlertTriangle } from 'lucide-react'
import { 
  GlassCard, 
  Textarea, 
  GradientButton, 
  MatchScoreRing, 
  LoadingSkeleton,
  useToast 
} from '@/components/ui'

const mockMatchData = {
  score: 72,
  stats: {
    topSkills: ['Python', 'Pandas', 'ML'],
    missing: ['Docker', 'AWS', 'Production deployment'],
    confidence: 'High'
  },
  insights: [
    'Top Skills Matched: Python, Pandas, ML',
    'Missing: Docker, AWS, Production deployment',
    'Recommendation: Add a short "Deployment" bullet to Project X'
  ]
}

interface InsightCardProps {
  title: string
  items: string[]
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
}

const InsightCard: React.FC<InsightCardProps> = ({ title, items, icon: Icon, color }) => {
  return (
    <GlassCard className="h-full" hoverable={false}>
      <div className="flex items-center space-x-3 mb-4">
        <div 
          className="w-10 h-10 rounded-button flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon 
            className="w-5 h-5"
            style={{ color }}
          />
        </div>
        <h3 
          className="text-h3 font-semibold"
          style={{ color: 'var(--color-white)' }}
        >
          {title}
        </h3>
      </div>
      
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start space-x-2"
          >
            <div 
              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: color }}
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
  )
}

export const JobMatchScorer: React.FC = () => {
  const [jobDescription, setJobDescription] = useState('')
  const [isCalculating, setIsCalculating] = useState(false)
  const [matchResult, setMatchResult] = useState<typeof mockMatchData | null>(null)
  const { success } = useToast()

  const handleCalculateMatch = () => {
    if (!jobDescription.trim()) return
    
    setIsCalculating(true)
    setMatchResult(null)
    
    // Mock calculation delay
    setTimeout(() => {
      setMatchResult(mockMatchData)
      setIsCalculating(false)
      success('Match calculated')
    }, 2500)
  }

  const handleClearForm = () => {
    setJobDescription('')
    setMatchResult(null)
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
          Job Match Scorer
        </h1>
        <p 
          className="text-body max-w-2xl"
          style={{ color: 'var(--color-muted-text)' }}
        >
          Paste a job description and see how well your resume matches. Get insights on what to improve and which skills to highlight.
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
            title="Job Description"
            subtitle="Paste a job description and see how well your resume matches."
          >
            <div className="space-y-6">
              <Textarea
                placeholder="Paste job description here…"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={12}
                className="resize-none"
              />
              
              <div className="flex space-x-3">
                <GradientButton
                  onClick={handleCalculateMatch}
                  loading={isCalculating}
                  disabled={!jobDescription.trim() || isCalculating}
                  className="flex-1"
                >
                  {isCalculating ? 'Calculating...' : 'Calculate Match'}
                </GradientButton>
                
                <GradientButton
                  variant="ghost"
                  onClick={handleClearForm}
                  disabled={isCalculating}
                >
                  Clear
                </GradientButton>
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
            title="Match Analysis"
            subtitle="Your compatibility score and detailed insights"
          >
            {isCalculating ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-40 h-40 rounded-full bg-white/5 animate-pulse" />
                </div>
                <LoadingSkeleton lines={3} showChips={false} />
              </div>
            ) : matchResult ? (
              <div className="space-y-6">
                <div className="flex justify-center">
                  <MatchScoreRing
                    score={matchResult.score}
                    size={180}
                    animated
                    showStats={false}
                  />
                </div>
                
                <div className="text-center">
                  <h3 
                    className="text-h2 font-bold mb-2"
                    style={{ color: 'var(--color-white)' }}
                  >
                    {matchResult.score}% Match
                  </h3>
                  <p 
                    className="text-body"
                    style={{ color: 'var(--color-muted-text)' }}
                  >
                    Good compatibility with room for improvement
                  </p>
                </div>
              </div>
            ) : (
              <div 
                className="text-center py-16"
                style={{ color: 'var(--color-muted-text)' }}
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8" />
                </div>
                <p className="text-body">
                  Enter a job description to see your match score and detailed analysis
                </p>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* Detailed Insights */}
      {matchResult && !isCalculating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 
            className="text-h2 font-semibold mb-6"
            style={{ color: 'var(--color-white)' }}
          >
            Detailed Insights
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <InsightCard
                title="Skills Matched"
                items={matchResult.stats.topSkills?.map(skill => `✓ ${skill}`) || []}
                icon={TrendingUp}
                color="#22C55E"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <InsightCard
                title="Missing Keywords"
                items={matchResult.stats.missing?.map(skill => `+ ${skill}`) || []}
                icon={AlertTriangle}
                color="#F59E0B"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <InsightCard
                title="Recommendations"
                items={['Add deployment experience', 'Highlight cloud skills', 'Include specific tools']}
                icon={Target}
                color="#3B82F6"
              />
            </motion.div>
          </div>
          
          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <GlassCard 
              title="Summary & Next Steps"
              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20"
              hoverable={false}
            >
              <div className="space-y-4">
                <p 
                  className="text-body"
                  style={{ color: 'var(--color-text)' }}
                >
                  <strong>Top Skills Matched:</strong> {matchResult.stats.topSkills?.join(', ')}
                </p>
                <p 
                  className="text-body"
                  style={{ color: 'var(--color-text)' }}
                >
                  <strong>Missing:</strong> {matchResult.stats.missing?.join(', ')}
                </p>
                <p 
                  className="text-body"
                  style={{ color: 'var(--color-text)' }}
                >
                  <strong>Recommendation:</strong> Add a short &quot;Deployment&quot; bullet to Project X
                </p>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-body font-medium"
                      style={{ color: 'var(--color-white)' }}
                    >
                      Overall Confidence: {matchResult.stats.confidence}
                    </span>
                    <GradientButton variant="ghost" className="text-small px-4 py-2">
                      Export Report
                    </GradientButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <GlassCard 
          title="Optimization Tips" 
          className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20"
          hoverable={false}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 
                className="font-semibold mb-3"
                style={{ color: 'var(--color-white)' }}
              >
                Improving Your Score
              </h4>
              <ul className="space-y-2 text-small" style={{ color: 'var(--color-muted-text)' }}>
                <li>• Include exact keywords from the job description</li>
                <li>• Quantify your achievements with numbers</li>
                <li>• Match the required experience level</li>
                <li>• Use industry-standard terminology</li>
              </ul>
            </div>
            <div>
              <h4 
                className="font-semibold mb-3"
                style={{ color: 'var(--color-white)' }}
              >
                Best Practices
              </h4>
              <ul className="space-y-2 text-small" style={{ color: 'var(--color-muted-text)' }}>
                <li>• Test multiple job descriptions in your field</li>
                <li>• Focus on skills mentioned multiple times</li>
                <li>• Prioritize hard skills over soft skills</li>
                <li>• Keep testing as you update your resume</li>
              </ul>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}