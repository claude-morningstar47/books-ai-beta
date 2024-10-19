import { ScrollArea } from "@/components/ui/scroll-area"

type PreviewProps = {
  content: string
}

export default function Preview({ content }: PreviewProps) {
  return (
    <ScrollArea className="h-[calc(100vh-16rem)] border rounded-md p-4">
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </ScrollArea>
  )
}