import Image from "next/image";
import Link from "next/link";
import { appConfig } from "@/config/app-config";
import { Button } from "@/components/ui/button";

export default async function Home() {
  // const session = (await auth()) as Session;
  // console.log(session.user);

  return (
    <div 
    // className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Welcome to <span className="text-blue-600">{appConfig.name}</span>
          </h1>
          <p className="mt-3 text-2xl">
            Get started by creating your account or logging in
          </p>
          <div className="flex mt-6">
            <Link href="/auth/signup" passHref>
              <Button className="mr-4">Sign Up</Button>
            </Link>
            <Link href="/auth/login" passHref>
              <Button className="mr-4" variant="outline">Sign In</Button>
            </Link>
            <Link href="/book" passHref>
              <Button className="mr-4" variant="outline">Books</Button>
            </Link>
          </div>
        </main>
      </div>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Copyright {appConfig.name}
        </a>
      </footer>
    </div>
  );
}
