// "use client"

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { useCompletion } from 'ai/react'

// export default function NewBook() {
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const router = useRouter()

//   const { complete, completion, isLoading } = useCompletion({
//     api: '/api/generate-outline',
//   })

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const outline = await complete(`Generate an outline for a book titled "${title}" with the following description: "${description}"`)
    
//     const response = await fetch('/api/books', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title, description, outline }),
//     })

//     if (response.ok) {
//       const { id } = await response.json()
//       router.push(`/dashboard/books/${id}`)
//     } else {
//       // Handle error
//     }
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create a New Book</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <Label htmlFor="title">Book Title</Label>
//           <Input
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <Label htmlFor="description">Book Description</Label>
//           <Textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>
//         <Button type="submit" disabled={isLoading}>
//           {isLoading ? 'Generating Outline...' : 'Create Book'}
//         </Button>
//       </form>
//       {completion && (
//         <div className="mt-4">
//           <h2 className="text-xl font-semibold mb-2">Generated Outline</h2>
//           <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{completion}</pre>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function NewBook() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [genre, setGenre] = useState('')
  const [writingStyle, setWritingStyle] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Fetch suggestions from the AI API
    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: description, writingStyle, genre }),
      })

      const data = await response.json()
      setSuggestion(data.suggestion)

    //   // Save the book details with the generated suggestion
    //   const bookResponse = await fetch('/api/books', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ title, description, genre, writingStyle, suggestion }),
    //   })

    //   if (bookResponse.ok) {
    //     const { id } = await bookResponse.json()
    //     router.push(`/dashboard/books/${id}`)
    //   } else {
    //     // Handle error
    //     console.error("Failed to create the book")
    //   }
    } catch (error) {
      console.error("Error fetching suggestion:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Book Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Book Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="writingStyle">Writing Style</Label>
          <Input
            id="writingStyle"
            value={writingStyle}
            onChange={(e) => setWritingStyle(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Generating Suggestions...' : 'Create Book'}
        </Button>
      </form>

      {suggestion && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">AI Suggestion</h2>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{suggestion}</pre>
        </div>
      )}
    </div>
  )
}
