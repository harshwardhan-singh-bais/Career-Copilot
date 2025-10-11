"use client"

import React from 'react'
import { Layout } from '@/components/layout'
import { Dashboard } from '@/components/pages/dashboard'

export default function Home() {
  return (
    <Layout pageTitle="Dashboard">
      <Dashboard />
    </Layout>
  )
}
