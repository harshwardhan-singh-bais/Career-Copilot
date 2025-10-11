"use client"

import React from 'react'
import { Layout } from '@/components/layout'
import { CoverLetterGenerator } from '@/components/pages/cover-letter-generator'

export default function CoverLetterPage() {
  return (
    <Layout pageTitle="Cover Letter Generator">
      <CoverLetterGenerator />
    </Layout>
  )
}