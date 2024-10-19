'use client'

import { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { AIAssistant } from '@/components/ai-assistant'
import { useToast } from '@/components/ui/use-toast'

export function BookEditor({ bookId }: { bookId: string }) {
  const [content, setContent] = useState('')
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const handleEditorChange = (content: string) => {
    setContent(content)
    // Calculate progress based on word count or some other metric
    const wordCount = content.split(/\s+/).length
    setProgress(Math.min(100, (wordCount / 1000) * 100))
  }

  const handleSave = async () => {
    // Implement save logic here
    toast({
      title: "Book saved",
      description: "Your progress has been saved successfully.",
    })
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Book Title</h2>
        <Button onClick={handleSave}>Save</Button>
      </div>
      <Progress value={progress} className="mb-4" />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Editor
            apiKey="your-tinymce-api-key"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <div>
          <AIAssistant content={content} />
        </div>
      </div>
    </div>
  )
}