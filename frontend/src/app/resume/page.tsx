"use client"

import React from 'react'
import { Layout } from '@/components/layout'
import { ResumeAnalyzer } from '@/components/pages/resume-analyzer'

export default function ResumePage() {
  return (
    <Layout pageTitle="Resume Analyzer">
      <ResumeAnalyzer />
    </Layout>
  )
}