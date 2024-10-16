import Image from "next/image"
// import { PlusCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

// import { playlists } from "@/data-test/playlists"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger  } from "./ui/context-menu"
import { Book } from "@/lib/types"

interface BookProps extends React.HTMLAttributes<HTMLDivElement> {
  book: Book
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function BookDisplay({
  book,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: BookProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
            <Image
              src={book.coverImageUrl}
              alt={book.title}
              width={width}
              height={height}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Read</ContextMenuItem>
          {/* <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Reading List</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                  </svg>
                  {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub> */}
          <ContextMenuSeparator />
          {/* <ContextMenuItem>Play Next</ContextMenuItem> */}
          {/* <ContextMenuItem>Play Later</ContextMenuItem> */}
          <ContextMenuItem>Edit</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{book.title}</h3>
        <p className="text-xs text-muted-foreground">{book.author}</p>
        <p className="text-xs text-muted-foreground">{book.description}</p>
      </div>
    </div>
  )
}