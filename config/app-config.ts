export type AppConfig = typeof appConfig;

export const appConfig = {
  name: "Bookai 02",
  description:
    "02bookai is a software that helps writers also beginer be more productive and efficient in their journey",
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Onboad",
      href: "/intro",
    },
    {
      title: "Books",
      href: "/books",
    },
    {
      title: "Create",
      href: "/new",
    },
    {
      title: "Read",
      href: "/read",
    },
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
  },
};
