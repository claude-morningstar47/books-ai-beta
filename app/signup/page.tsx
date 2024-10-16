// import { auth } from "@/auth";
// import { SignupForm } from "@/components/signup-form";
// import { Session } from "@/lib/types";
// import { redirect } from "next/navigation";

// export default async function Page() {
//   const session = (await auth()) as Session;

//   if (session) {
//     redirect("/");
//   }
//   return (
//     <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
//       <SignupForm />
//     </main>
//   );
// }

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/auth";
import { Session } from "@/lib/types";
import { redirect } from "next/navigation";
import { UserAuthSignupForm } from "@/components/user-auth-signup-form";

export default async function Page() {
  const session = (await auth()) as Session;
  if (session) {
    redirect("/");
  }
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Login
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 98 150"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-8 w-6"
            >
              <path
                d="M80.836 65.688L92.722 53.802L76.048 37.128L90.076 23.1L67.816 0.840027L0.532013 68.124L17.206 84.798L3.17801 98.826L19.852 115.5L7.96601 127.386L30.226 149.646L97.51 82.362L80.836 65.688ZM86.338 82.362L45.934 122.766L67.942 78.582L75.25 71.274L86.338 82.362ZM37.03 47.04L54.544 48.3L47.614 74.13H63.07L50.68 99.036L53.032 81.144H37.03V47.04ZM81.508 53.844L75.208 60.144L67.522 67.83H55.846L59.71 53.466L70.42 42.756L81.508 53.844ZM78.862 23.1L70.378 31.584L59.584 42.378L38.878 40.866L67.732 12.012L78.862 23.1ZM11.704 68.124L30.688 49.14V71.316L22.792 79.212L11.704 68.124ZM14.308 98.826L22.792 90.342L30.688 82.446V87.444H45.808L45.514 89.796L25.438 109.914L14.308 98.826ZM19.138 127.386L25.438 121.086L43.876 102.648L40.558 128.142L30.268 138.432L19.138 127.386Z"
                fill="white"
              />
            </svg>
            Book AI
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Ipsum omnis eaque, est magnam unde exercitationem id facere odit
                et officiis repudiandae suscipit eveniet vitae, blanditiis
                tenetur recusandae libero voluptas. Quisquam?&rdquo;
              </p>
              <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <UserAuthSignupForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
