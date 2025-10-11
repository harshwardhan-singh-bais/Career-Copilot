"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Search, Mail, TrendingUp, Users, Clock } from 'lucide-react'
import { GlassCard, GradientButton } from '@/components/ui'
import { cn } from '@/lib/utils'

interface UtilityCardProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  href: string
  color: string
  stats?: {
    label: string
    value: string
  }
}

const UtilityCard: React.FC<UtilityCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  color,
  stats 
}) => {
  return (
    <Link href={href}>
      <motion.div
        className={cn(
          "group cursor-pointer h-full"
        )}
        whileHover={{ y: -6, scale: 1.02 }}
        transition={{ duration: 0.18, ease: [0.2, 0.9, 0.2, 1] }}
      >
        <GlassCard
          className="h-full border-white/10 group-hover:border-white/20 transition-all duration-300"
          hoverable={false}
        >
          <div className="flex items-start space-x-4 mb-6">
            <div 
              className="w-12 h-12 rounded-button flex items-center justify-center"
              style={{ backgroundColor: `${color}20` }}
            >
              <Icon 
                className="w-6 h-6"
                style={{ color }}
              />
            </div>
            <div className="flex-1">
              <h3 
                className="text-h3 font-semibold mb-2 group-hover:text-white transition-colors"
                style={{ color: 'var(--color-text)' }}
              >
                {title}
              </h3>
              <p 
                className="text-body"
                style={{ color: 'var(--color-muted-text)' }}
              >
                {description}
              </p>
            </div>
          </div>

          {stats && (
            <div className="flex justify-between items-center">
              <div>
                <div 
                  className="text-small"
                  style={{ color: 'var(--color-muted-text)' }}
                >
                  {stats.label}
                </div>
                <div 
                  className="text-h3 font-semibold"
                  style={{ color }}
                >
                  {stats.value}
                </div>
              </div>
              <GradientButton variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                Try Now
              </GradientButton>
            </div>
          )}
        </GlassCard>
      </motion.div>
    </Link>
  )
}

const utilities = [
  {
    title: 'Resume Analyzer',
    description: 'Get instant feedback on your resume with AI-powered analysis and suggestions.',
    icon: FileText,
    href: '/resume',
    color: '#22C55E',
    stats: { label: 'Avg. Improvement', value: '+32%' }
  },
  {
    title: 'Job Match Scorer',
    description: 'See how well your resume matches job descriptions and get optimization tips.',
    icon: Search,
    href: '/job-match',
    color: '#3B82F6',
    stats: { label: 'Match Accuracy', value: '94%' }
  },
  {
    title: 'Cover Letter Generator',
    description: 'Create personalized cover letters tailored to specific job postings.',
    icon: Mail,
    href: '/cover-letter',
    color: '#8B5CF6',
    stats: { label: 'Success Rate', value: '87%' }
  }
]

const statsCards = [
  { label: 'Resumes Analyzed', value: '12,547', icon: FileText, color: '#22C55E' },
  { label: 'Job Matches Found', value: '8,392', icon: TrendingUp, color: '#3B82F6' },
  { label: 'Active Users', value: '2,847', icon: Users, color: '#F59E0B' },
  { label: 'Avg. Response Time', value: '< 2s', icon: Clock, color: '#EF4444' }
]

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 
          className="text-h1 font-bold mb-4"
          style={{ color: 'var(--color-white)' }}
        >
          Your AI Career Companion
        </h1>
        <p 
          className="text-h3 max-w-2xl mx-auto"
          style={{ color: 'var(--color-muted-text)' }}
        >
          Analyze resumes, match jobs, and craft perfect cover letters — all in one place.
        </p>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GradientButton className="px-8 py-4 text-h3">
            Go to Dashboard
          </GradientButton>
        </motion.div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index + 0.3 }}
            >
              <GlassCard className="text-center p-4" hoverable={false}>
                <div 
                  className="w-8 h-8 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <Icon 
                    className="w-4 h-4"
                    style={{ color: stat.color }}
                  />
                </div>
                <div 
                  className="text-h3 font-bold mb-1"
                  style={{ color: 'var(--color-white)' }}
                >
                  {stat.value}
                </div>
                <div 
                  className="text-small"
                  style={{ color: 'var(--color-muted-text)' }}
                >
                  {stat.label}
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Main Utilities */}
      <div>
        <motion.h2
          className="text-h2 font-semibold mb-6"
          style={{ color: 'var(--color-white)' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          Choose Your Tool
        </motion.h2>
        
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {utilities.map((utility, index) => (
            <motion.div
              key={utility.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.6 }}
            >
              <UtilityCard {...utility} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Demo Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <GlassCard 
          title="How to Demo" 
          className="mt-8"
          hoverable={false}
        >
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div 
                className="w-6 h-6 rounded-full bg-primary-gradient flex items-center justify-center text-white text-small font-bold flex-shrink-0 mt-0.5"
                style={{ background: 'var(--gradient-primary)' }}
              >
                1
              </div>
              <div>
                <div 
                  className="font-medium"
                  style={{ color: 'var(--color-white)' }}
                >
                  Upload a sample resume
                </div>
                <div 
                  className="text-small"
                  style={{ color: 'var(--color-muted-text)' }}
                >
                  Go to Resume Analyzer and drag & drop any PDF or DOCX file (mock upload)
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div 
                className="w-6 h-6 rounded-full bg-primary-gradient flex items-center justify-center text-white text-small font-bold flex-shrink-0 mt-0.5"
                style={{ background: 'var(--gradient-primary)' }}
              >
                2
              </div>
              <div>
                <div 
                  className="font-medium"
                  style={{ color: 'var(--color-white)' }}
                >
                  Test job matching
                </div>
                <div 
                  className="text-small"
                  style={{ color: 'var(--color-muted-text)' }}
                >
                  Paste any job description into Job Match Scorer & click Calculate Match
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div 
                className="w-6 h-6 rounded-full bg-primary-gradient flex items-center justify-center text-white text-small font-bold flex-shrink-0 mt-0.5"
                style={{ background: 'var(--gradient-primary)' }}
              >
                3
              </div>
              <div>
                <div 
                  className="font-medium"
                  style={{ color: 'var(--color-white)' }}
                >
                  Generate cover letter
                </div>
                <div 
                  className="text-small"
                  style={{ color: 'var(--color-muted-text)' }}
                >
                  Click Generate Cover Letter and copy the result with live typing animation
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}