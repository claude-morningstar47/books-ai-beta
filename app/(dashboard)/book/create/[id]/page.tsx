"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Plus, Save, Trash } from "lucide-react";
import TextEditor from "@/components/text-editor";
import Preview from "@/components/preview";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Book, Chapter } from "@/lib/types";
import { useParams } from "next/navigation";
import { getBookById, updateBookById } from "@/app/actions/actions";
import { toast } from "sonner";

// Simulating an API call to the AI assistant
const fetchAIResponse = async (query: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`AI response for: "${query}"`);
    }, 1000);
  });
};

export default function EbookEditor() {
  const params = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [currentChapterOrder, setCurrentChapterOrder] = useState<number>(1);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newChapterTitle, setNewChapterTitle] = useState<string>("");

  const [aiQuery, setAiQuery] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string>("");

  const [showAIButton, setShowAIButton] = useState<boolean>(true);

  useEffect(() => {
    const loadEbookData = async () => {
      const bookId = parseInt(params.id as string);
      const dataBook = await getBookById(bookId);

      if (dataBook) {
        setBook(dataBook);
        setCurrentChapterOrder(dataBook.content[0]?.order || 1);
      }
    };
    loadEbookData();
  }, [params.id]);

  const handleContentChange = (content: string) => {
    if (!book) return;

    const updatedChapters = book.content.map((chapter) =>
      chapter.order === currentChapterOrder ? { ...chapter, content } : chapter
    );

    setBook({ ...book, content: updatedChapters });

    // Logic to display AI button when a keyword is typed
    if (content.toLowerCase().includes("help")) {
      setShowAIButton(true);
    } else {
      setShowAIButton(false);
    }
  };

  const handleSave = async () => {
    const bookId = parseInt(params.id as string);
    if (book) {
      console.log("Ebook saved:", book);
      await updateBookById(bookId, book);
      toast.success('Saved Book')
    }
  };

  const addChapter = () => {
    if (!book) return;

    const newChapter: Chapter = {
      id: book.content.length + 1,
      title: newChapterTitle || `Chapter ${book.content.length + 1}`,
      content: `${newChapterTitle || `Chapter ${book.content.length + 1}`}\n`,
      order: book.content.length + 1,
    };

    setBook({ ...book, content: [...book.content, newChapter] });
    setCurrentChapterOrder(newChapter.order);
    setNewChapterTitle("");
    setIsDialogOpen(false);
  };

  const deleteChapter = (chapterOrder: number) => {
    if (!book) return;

    const filteredChapters = book.content
      .filter((chapter) => chapter.order !== chapterOrder)
      .map((chapter, index) => ({ ...chapter, order: index + 1 }));

    setBook({ ...book, content: filteredChapters });

    if (currentChapterOrder === chapterOrder && filteredChapters.length > 0) {
      setCurrentChapterOrder(filteredChapters[0].order);
    }
  };

  const handleAIQuery = async () => {
    const response = await fetchAIResponse(aiQuery);
    setAiResponse(response as string);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-2 space-y-4"
    >
      <div className="flex items-center justify-between">
        <Input
          value={book?.title || "Untitled Ebook"}
          onChange={(e) =>
            setBook((prev) =>
              prev ? { ...prev, title: e.target.value } : null
            )
          }
          className="text-2xl font-bold w-1/2"
        />
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" /> Save Ebook
        </Button>
      </div>
      <Separator />
      <div className="flex space-x-2">
        <ScrollArea className="h-[calc(100vh-12rem)] w-48 rounded-md border p-2">
          {book?.content.map((chapter) => (
            <div key={chapter.id} className="flex items-center space-x-2 mb-2">
              <Button
                variant={
                  chapter.order === currentChapterOrder ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => setCurrentChapterOrder(chapter.order)}
              >
                {chapter.title}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteChapter(chapter.order)}
                className="text-red-600"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full mt-4">
                <Plus className="mr-2 h-4 w-4" /> Add Chapter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Chapter</DialogTitle>
                <DialogDescription>
                Create your new chapter.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  value={newChapterTitle}
                  onChange={(e) => setNewChapterTitle(e.target.value)}
                  placeholder="Chapter Title"
                />
              </div>
              <DialogFooter>
                <Button onClick={addChapter}>Add Chapter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ScrollArea>
        <div className="flex-1">
          <div className="space-y-4">
            <Tabs defaultValue="edit" className="w-full">
              <TabsList>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              <TabsContent value="edit">
                <TextEditor
                  content={
                    book?.content.find((c) => c.id === currentChapterOrder)
                      ?.content || ""
                  }
                  onChange={handleContentChange}
                />
              </TabsContent>
              <TabsContent value="preview">
                <Preview
                  content={
                    book?.content.find((c) => c.id === currentChapterOrder)
                      ?.content || ""
                  }
                />
              </TabsContent>
            </Tabs>
          </div>

          {showAIButton && (
            <div className="mt-8 p-4 border rounded-md space-y-4">
              <h3 className="text-lg font-semibold">AI Assistant</h3>
              <Input
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Ask the AI for help with your writing..."
              />
              <Button onClick={handleAIQuery}>Ask AI</Button>
              {aiResponse && (
                <div className="p-4 mt-4 border rounded-md">
                  <strong>AI Response:</strong> {aiResponse}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between">
        <Button
          onClick={() =>
            setCurrentChapterOrder((prev) => Math.max(prev - 1, 1))
          }
          disabled={currentChapterOrder === 1}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous Chapter
        </Button>
        <Button
          onClick={() =>
            setCurrentChapterOrder((prev) =>
              Math.min(prev + 1, book?.content.length || 1)
            )
          }
          disabled={currentChapterOrder === book?.content.length}
        >
          Next Chapter <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
