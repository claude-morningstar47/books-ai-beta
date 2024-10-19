'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
// import { useToast } from '@/components/ui/use-toast'

export function AIAssistant({ content }: { content: string }) {
  const [suggestion, setSuggestion] = useState('')
  const { toast } = useToast()

  const generateSuggestion = async () => {
    // Implement AI suggestion generation here
    // This is a placeholder
    setSuggestion("Here's an AI-generated suggestion for your content...")
  }

  const applySuggestion = () => {
    // Implement logic to apply the suggestion to the main editor
    toast({
      title: "Suggestion applied",
      description: "The AI suggestion has been applied to your content.",
    })
  }

  return (
    <div className="bg-secondary p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">AI Assistant</h3>
      <Button onClick={generateSuggestion} className="mb-2">Generate Suggestion</Button>
      <Textarea value={suggestion} readOnly className="mb-2" />
      <Button onClick={applySuggestion}>Apply Suggestion</Button>
    </div>
  )
}