import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { Book } from "@/lib/types";
import Link from "next/link";

interface BookProps extends React.HTMLAttributes<HTMLDivElement> {
  book: Book;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
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
            <Link href={`/book/create/${book.id}`} key={book.id}>
              <Image
                src={book.coverImage || ""}
                alt={book.title}
                width={width}
                height={height}
                className={cn(
                  "h-auto w-auto object-cover transition-all hover:scale-105",
                  aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
              />
            </Link>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-40">
          <ContextMenuItem>Read</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Edit</ContextMenuItem>
          <ContextMenuSeparator />
          {/* <ContextMenuItem onClick={() => deleteBook(book?.id)}>
            Delete
          </ContextMenuItem> */}
          <ContextMenuSeparator />
          <ContextMenuItem>Like</ContextMenuItem>
          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{book.title}</h3>
        <p className="text-xs text-muted-foreground">{book.description}</p>
      </div>
    </div>
  );
}
