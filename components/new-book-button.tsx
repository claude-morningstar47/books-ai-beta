'use client'

import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function NewBookButton() {
  const router = useRouter()

  const handleNewBook = () => {
    // In a real application, you would create a new book in the database
    // and then redirect to the new book's page
    router.push('/dashboard/book/new-ebook')
  }

  return (
    <Button onClick={handleNewBook} className="mb-4">
      <PlusCircle className="mr-2 h-4 w-4" /> New Book
    </Button>
  )
}