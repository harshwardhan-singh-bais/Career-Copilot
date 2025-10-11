"use client"

import React from 'react'
import { Layout } from '@/components/layout'
import { JobMatchScorer } from '@/components/pages/job-match-scorer'

export default function JobMatchPage() {
  return (
    <Layout pageTitle="Job Match Scorer">
      <JobMatchScorer />
    </Layout>
  )
}