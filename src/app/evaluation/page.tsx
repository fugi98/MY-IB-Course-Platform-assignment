'use client'

import { useRouter } from 'next/navigation'
import EvaluationDisplay from '@/components/EvaluationDisplay'

export default function EvaluationPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/') // Adjust this path if needed
  }

  return (
    <div className="min-h-screen p-4">
      <EvaluationDisplay onBack={handleBack} />
    </div>
  )
}