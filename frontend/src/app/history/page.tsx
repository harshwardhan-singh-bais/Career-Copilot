"use client"

import React from 'react'
import { Layout } from '@/components/layout'
import { GlassCard } from '@/components/ui'

export default function HistoryPage() {
  return (
    <Layout pageTitle="History">
      <div className="space-y-8">
        <div>
          <h1 
            className="text-h1 font-bold mb-4"
            style={{ color: 'var(--color-white)' }}
          >
            History
          </h1>
          <p 
            className="text-body max-w-2xl"
            style={{ color: 'var(--color-muted-text)' }}
          >
            View your previous analyses, job matches, and generated cover letters.
          </p>
        </div>
        
        <GlassCard 
          title="Coming Soon"
          className="text-center py-16"
          hoverable={false}
        >
          <div 
            className="text-body"
            style={{ color: 'var(--color-muted-text)' }}
          >
            History functionality will be available in the next update.
          </div>
        </GlassCard>
      </div>
    </Layout>
  )
}