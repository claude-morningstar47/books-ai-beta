// 'use client'

// import { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Separator } from "@/components/ui/separator"
// import { ChevronLeft, ChevronRight, Plus, Save } from "lucide-react"
// // import TextEditor from './text-editor'
// // import Preview from './preview'

// type Chapter = {
//   id: number
//   title: string
//   content: string
// }

// export default function EbookEditor() {
//   const [chapters, setChapters] = useState<Chapter[]>([{ id: 1, title: 'Chapter 1', content: '' }])
//   const [currentChapter, setCurrentChapter] = useState<number>(1)
//   const [ebookTitle, setEbookTitle] = useState<string>('Untitled Ebook')

//   useEffect(() => {
//     // Load ebook data from the backend
//     // This is a placeholder and should be replaced with actual API call
//     const loadEbookData = async () => {
//       // const response = await fetch('/api/load-ebook')
//       // const data = await response.json()
//       // setChapters(data.chapters)
//       // setEbookTitle(data.title)
//     }
//     loadEbookData()
//   }, [])

//   const handleContentChange = (content: string) => {
//     setChapters(chapters.map(chapter => 
//       chapter.id === currentChapter ? { ...chapter, content } : chapter
//     ))
//   }

//   const handleSave = async () => {
//     // Save ebook data to the backend
//     // This is a placeholder and should be replaced with actual API call
//     // await fetch('/api/save-ebook', {
//     //   method: 'POST',
//     //   headers: { 'Content-Type': 'application/json' },
//     //   body: JSON.stringify({ title: ebookTitle, chapters })
//     // })
//     console.log('Ebook saved:', { title: ebookTitle, chapters })
//   }

//   const addChapter = () => {
//     const newChapter = { id: chapters.length + 1, title: `Chapter ${chapters.length + 1}`, content: '' }
//     setChapters([...chapters, newChapter])
//     setCurrentChapter(newChapter.id)
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }} 
//       animate={{ opacity: 1 }} 
//       transition={{ duration: 0.5 }}
//       className="container mx-auto p-4 space-y-4"
//     >
//       <div className="flex items-center justify-between">
//         <Input
//           value={ebookTitle}
//           onChange={(e) => setEbookTitle(e.target.value)}
//           className="text-2xl font-bold w-1/2"
//         />
//         <Button onClick={handleSave}>
//           <Save className="mr-2 h-4 w-4" /> Save Ebook
//         </Button>
//       </div>
//       <Separator />
//       <div className="flex space-x-4">
//         <ScrollArea className="h-[calc(100vh-12rem)] w-48 rounded-md border p-4">
//           {chapters.map((chapter) => (
//             <Button
//               key={chapter.id}
//               variant={chapter.id === currentChapter ? "default" : "ghost"}
//               className="w-full justify-start mb-2"
//               onClick={() => setCurrentChapter(chapter.id)}
//             >
//               {chapter.title}
//             </Button>
//           ))}
//           <Button onClick={addChapter} className="w-full mt-4">
//             <Plus className="mr-2 h-4 w-4" /> Add Chapter
//           </Button>
//         </ScrollArea>
//         <div className="flex-1">
//           <Tabs defaultValue="edit" className="w-full">
//             <TabsList>
//               <TabsTrigger value="edit">Edit</TabsTrigger>
//               <TabsTrigger value="preview">Preview</TabsTrigger>
//             </TabsList>
//             <TabsContent value="edit">
//               {/* <TextEditor
//                 content={chapters.find(c => c.id === currentChapter)?.content || ''}
//                 onChange={handleContentChange}
//               /> */}
//             </TabsContent>
//             <TabsContent value="preview">
//               {/* <Preview content={chapters.find(c => c.id === currentChapter)?.content || ''} /> */}
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//       <div className="flex justify-between">
//         <Button
//           onClick={() => setCurrentChapter(prev => Math.max(prev - 1, 1))}
//           disabled={currentChapter === 1}
//         >
//           <ChevronLeft className="mr-2 h-4 w-4" /> Previous Chapter
//         </Button>
//         <Button
//           onClick={() => setCurrentChapter(prev => Math.min(prev + 1, chapters.length))}
//           disabled={currentChapter === chapters.length}
//         >
//           Next Chapter <ChevronRight className="ml-2 h-4 w-4" />
//         </Button>
//       </div>
//     </motion.div>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ChevronLeft, ChevronRight, Plus, Save } from "lucide-react"
import TextEditor from '@/components/text-editor'
import Preview from '@/components/preview'
import { Chapter } from '@/lib/types'

// type Chapter = {
//   id: number
//   title: string
//   content: string
// }

export default function EbookEditor() {
  const [chapters, setChapters] = useState<Chapter[]>([{ id: 1, title: 'Chapter 1', content: '', bookId:2, orderIndex: 2 }])
  const [currentChapter, setCurrentChapter] = useState<number>(1)
  const [ebookTitle, setEbookTitle] = useState<string>('Untitled Ebook')

  useEffect(() => {
    // Load ebook data from the backend
    // This is a placeholder and should be replaced with actual API call
    const loadEbookData = async () => {
      // const response = await fetch('/api/load-ebook')
      // const data = await response.json()
      // setChapters(data.chapters)
      // setEbookTitle(data.title)
    }
    loadEbookData()
  }, [])

  const handleContentChange = (content: string) => {
    setChapters(chapters.map(chapter => 
      chapter.id === currentChapter ? { ...chapter, content } : chapter
    ))
  }

  const handleSave = async () => {
    // Save ebook data to the backend
    // This is a placeholder and should be replaced with actual API call
    // await fetch('/api/save-ebook', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ title: ebookTitle, chapters })
    // })
    console.log('Ebook saved:', { title: ebookTitle, chapters })
  }

  const addChapter = () => {
    const newChapter = { id: chapters.length + 1, title: `Chapter ${chapters.length + 1}`, content: '' }
    setChapters([...chapters, newChapter])
    setCurrentChapter(newChapter.id)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 space-y-4"
    >
      <div className="flex items-center justify-between">
        <Input
          value={ebookTitle}
          onChange={(e) => setEbookTitle(e.target.value)}
          className="text-2xl font-bold w-1/2"
        />
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save Ebook
        </Button>
      </div>
      <Separator />
      <div className="flex space-x-4">
        <ScrollArea className="h-[calc(100vh-12rem)] w-48 rounded-md border p-4">
          {chapters.map((chapter) => (
            <Button
              key={chapter.id}
              variant={chapter.id === currentChapter ? "default" : "ghost"}
              className="w-full justify-start mb-2"
              onClick={() => setCurrentChapter(chapter.id)}
            >
              {chapter.title}
            </Button>
          ))}
          <Button onClick={addChapter} className="w-full mt-4">
            <Plus className="mr-2 h-4 w-4" /> Add Chapter
          </Button>
        </ScrollArea>
        <div className="flex-1">
          <Tabs defaultValue="edit" className="w-full">
            <TabsList>
              <TabsTrigger value="edit">Edit</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="edit">
              <TextEditor
                content={chapters.find(c => c.id === currentChapter)?.content || ''}
                onChange={handleContentChange}
              />
            </TabsContent>
            <TabsContent value="preview">
              <Preview content={chapters.find(c => c.id === currentChapter)?.content || ''} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={() => setCurrentChapter(prev => Math.max(prev - 1, 1))}
          disabled={currentChapter === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous Chapter
        </Button>
        <Button
          onClick={() => setCurrentChapter(prev => Math.min(prev + 1, chapters.length))}
          disabled={currentChapter === chapters.length}
        >
          Next Chapter <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}