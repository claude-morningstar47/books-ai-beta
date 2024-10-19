import { Book } from "@/lib/types";

export const listBook: Book[] = [
  {
    id: "1",
    title: "The React Journey",
    author: "Ethan Byte",
    coverImageUrl:
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
    description:
      "An insightful journey into mastering React and building dynamic web applications.",
    authorId: "author-1",
    isPublished: true,
    progress: 34,
    createdAt: new Date("2022-01-18"),
    updatedAt: new Date("2023-11-17"),
  },
  {
    id: "2",
    title: "TypeScript Mastery",
    author: "Anna Static",
    coverImageUrl:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=300&dpr=2&q=80",
    description:
      "Master the complexities of TypeScript and write scalable, maintainable code.",
    authorId: "author-2",
    isPublished: false,
    progress: 54,

    createdAt: new Date("2022-08-06"),
    updatedAt: new Date("2024-06-20"),
  },
  {
    id: "3",
    title: "CSS Secrets",
    author: "Lea Verou",
    coverImageUrl:
      "https://images.unsplash.com/photo-1581091870621-1b61ae19f2f9?w=300&dpr=2&q=80",
    description:
      "Unveil the hidden techniques in CSS to create beautiful, responsive designs.",
    authorId: "author-3",
    isPublished: false,
    progress: 74,

    createdAt: new Date("2023-11-05"),
    updatedAt: new Date("2023-05-17"),
  },
  {
    id: "4",
    title: "JavaScript for Beginners",
    author: "John Doe",
    coverImageUrl:
      "https://images.unsplash.com/photo-1564869730534-bdf47a57c465?w=300&dpr=2&q=80",
    description:
      "A step-by-step guide to learning JavaScript from the ground up.",
    authorId: "author-4",
    isPublished: true,
    progress: 34,

    createdAt: new Date("2023-05-27"),
    updatedAt: new Date("2024-02-07"),
  },
  {
    id: "5",
    title: "Advanced Node.js",
    author: "Michael Smith",
    coverImageUrl:
      "https://images.unsplash.com/photo-1527254213770-49503f4db39d?w=300&dpr=2&q=80",
    description:
      "Learn advanced techniques in Node.js for building powerful backends.",
    authorId: "author-5",
    isPublished: true,
    progress: 34,

    createdAt: new Date("2022-10-28"),
    updatedAt: new Date("2024-05-30"),
  },
  {
    id: "6",
    title: "Python Deep Dive",
    author: "Sarah Connor",
    coverImageUrl:
      "https://images.unsplash.com/photo-1504470695779-758d3bd34610?w=300&dpr=2&q=80",
    description:
      "Explore advanced Python concepts and libraries to enhance your coding skills.",
    authorId: "author-6",
    isPublished: false,
    progress: 34,

    createdAt: new Date("2023-09-19"),
    updatedAt: new Date("2023-03-18"),
  },
  {
    id: "7",
    title: "HTML & CSS for Beginners",
    author: "Emily Johnson",
    coverImageUrl:
      "https://images.unsplash.com/photo-1581092120474-c6c0e97e0b07?w=300&dpr=2&q=80",
    description:
      "Learn the basics of HTML and CSS to create modern, responsive websites.",
    authorId: "author-7",
    isPublished: true,
    progress: 34,

    createdAt: new Date("2022-01-05"),
    updatedAt: new Date("2023-09-21"),
  },
  {
    id: "8",
    title: "Vue.js Essentials",
    author: "David Vue",
    coverImageUrl:
      "https://images.unsplash.com/photo-1593642533144-3d62f86c1e97?w=300&dpr=2&q=80",
    description:
      "Master the Vue.js framework and build interactive user interfaces.",
    authorId: "author-8",
    isPublished: false,
    progress: 34,

    createdAt: new Date("2022-11-12"),
    updatedAt: new Date("2024-08-26"),
  },
  {
    id: "9",
    title: "Fullstack Development",
    author: "Laura Miller",
    coverImageUrl:
      "https://images.unsplash.com/photo-1506111583091-b6a4d8a7f0a5?w=300&dpr=2&q=80",
    description:
      "A comprehensive guide to fullstack web development using modern technologies.",
    authorId: "author-9",
    isPublished: false,
    progress: 34,

    createdAt: new Date("2022-05-12"),
    updatedAt: new Date("2023-12-02"),
  },
  {
    id: "10",
    title: "Data Science with Python",
    author: "Daniel Green",
    coverImageUrl:
      "https://images.unsplash.com/photo-1581091870525-2b5d0aa2a244?w=300&dpr=2&q=80",
    description:
      "Learn how to use Python for data analysis, visualization, and machine learning.",
    authorId: "author-10",
    isPublished: false,
    progress: 34,

    createdAt: new Date("2022-09-10"),
    updatedAt: new Date("2023-03-07"),
  },
];

export const madeForYouBook: Book[] = [
  {
    id: "2",
    title: "TypeScript Tales",
    author: "Anna Static",
    coverImageUrl:
      "https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80",
    description: "Master TypeScript with fun stories.",
    authorId: "author-2",
    isPublished: true,
    progress: 34,

    createdAt: new Date("2023-08-15T00:00:00Z"),
    updatedAt: new Date("2023-08-20T00:00:00Z"),
  },
  {
    id: "23",
    title: "TypeScript Tales",
    author: "Anna Static",
    coverImageUrl:
      "https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=300&dpr=2&q=80",
    description: "Master TypeScript with fun stories.",
    authorId: "author-2",
    progress: 34,

    isPublished: true,
    createdAt: new Date("2023-08-15T00:00:00Z"),
    updatedAt: new Date("2023-08-20T00:00:00Z"),
  },
];
