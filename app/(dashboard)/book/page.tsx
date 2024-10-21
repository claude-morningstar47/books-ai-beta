import { Metadata } from "next";
import Image from "next/image";
import { BookDisplay } from "@/components/book-display";
import { madeForYouBook } from "@/data-test/albums";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { NewBookButton } from "@/components/new-book-button";
import { auth } from "@/auth";
import { Book, Session } from "@/lib/types";
import { getBooks } from "@/app/actions/actions";
import { getUser } from "@/app/actions/user-actions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Books",
};

export default async function BooksPage() {
  const session = (await auth()) as Session;

  if (session?.user?.email) {
    const userOnBoarded = await getUser(session.user.email);
    if (!userOnBoarded.onboarded) {
      redirect("/onboard/user");
    }
  }

  const fetchBooks = async () => {
    try {
      const fetchedBooks = await getBooks();
      return fetchedBooks;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const books = await fetchBooks();

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/music-light.png"
          width={1280}
          height={1114}
          alt="Music"
          className="block dark:hidden"
        />
        <Image
          src="/examples/music-dark.png"
          width={1280}
          height={1114}
          alt="Music"
          className="hidden dark:block"
        />
      </div>

      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <div className="col-span-3 lg:col-span-12 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="music" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="music" className="relative">
                          My Books
                        </TabsTrigger>
                        <TabsTrigger value="podcasts">Books</TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <NewBookButton session={session} />
                      </div>
                    </div>
                    <TabsContent
                      value="music"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            My Books
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {Array.isArray(books)
                              ? books?.map((book: Book) => (
                                  <BookDisplay
                                    key={book.title}
                                    book={book}
                                    className="w-[200px]"
                                    aspectRatio="portrait"
                                    width={250}
                                    height={330}
                                  />
                                ))
                              : null}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>

                    <TabsContent
                      value="podcasts"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            Books
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your favorite books. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {madeForYouBook.map((book) => (
                              <BookDisplay
                                key={book.title}
                                book={book}
                                className="w-[200px]"
                                aspectRatio="square"
                                width={150}
                                height={150}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
