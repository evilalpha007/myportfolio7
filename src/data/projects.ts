import { type ProjectCardProps } from "@/components/projects/project-card";
import { type ProjectShowcaseListItem } from "@/components/projects/project-showcase-list";
import { siteMetadata } from "@/data/siteMetaData.mjs";

export const PROJECT_SHOWCASE: ProjectShowcaseListItem[] = [
  {
    index: 0,
    title: "Json Tree",
    href: "/projects",
    tags: ["Next js", "Vite", "Tailwindcss", "Vercel", "Monaco Editor"],
    image: {
      LIGHT: "/images/projects/json-light.png",
      DARK: "/images/projects/json-dark.jpeg",
    },
  },
  {
    index: 1,
    title: "Nft Digital Web 3",
    href: "/projects",
    tags: ["HTML", "Tailwindcss", "CSS", "GSAP", "LOCOMOTIVE JS", "VERCEL"],
    image: {
      LIGHT: "/images/projects/nftmark.webp",
      DARK: "/images/projects/nftmark.webp",
    },
  },
  {
    index: 2,
    title: "Alify  WEBApp",
    href: "/projects",
    tags: [
      "Reactjs",
      "Vite",
      "Tailwindcss",
      "Vercel",
      "GRAPH LINE CHART JS",
      "React DND",
    ],
    image: {
      LIGHT: "/images/projects/crypto.webp",
      DARK: "/images/projects/crypto.webp",
    },
  },
];

export const PROJECTS_CARD: ProjectCardProps[] = [
  {
    name: "Json Tree",
    favicon: "/images/projects/logos/jsontree.ico",
    imageUrl: [
      "/images/projects/json-light.png",
      "/images/projects/json-dark.jpeg",
    ],
    description:
      "Visualize JSON data format in form of a tree or graph. Application is made using Nextjs, Tailwindcss and Monaco Editor. Design image can be downloaded from this app.",
    // sourceCodeHref: "https://github.com/BUMBAIYA/jsontree",
    liveWebsiteHref: "https://jsontree.vercel.app/",
  },
  {
    name: "Crypto Tracker",
    favicon: "/images/projects/logos/kanban.ico",
    imageUrl: ["/images/projects/crypto.webp"],
    description:
      "Keep track of projects and tasks in different categories. Drag and drop card from tables. Assign user and priority to task and many more features. This app is made using Reactjs, Typescript, Tailwindcss and React-beautiful-dnd library.",
    // sourceCodeHref: "https://github.com/BUMBAIYA/kanban",
    liveWebsiteHref: "https://crypto-pro-drab.vercel.app/",
  },
  {
    name: "Nft Digital Web 3",
    favicon: "/images/projects/logos/manygames.ico",
    imageUrl: [
      "/images/projects/nftmark.webp",
      "/images/projects/nftmark1.jpeg",
    ],
    description:
      "Nft Web 3 modern design in normal html css with quite animation GSAP locomotive js with pagination features",
    // sourceCodeHref: "https://github.com/BUMBAIYA/ManyGames",
    liveWebsiteHref: "https://nft-mark-2-0.vercel.app/",
  },
  {
    name: "My portfolio",
    favicon: "/images/projects/logos/favicon.ico",
    imageUrl: [
      "/images/projects/portfolio-dark.jpeg",
      "/images/projects/portfolio-light.jpeg",
    ],
    description:
      "My personal portfolio website made using Nextjs, tailwindcss and framer motion.",
    // sourceCodeHref: "https://github.com/BUMBAIYA/pradityamanjhi-v2",
    liveWebsiteHref: siteMetadata.siteUrl,
  },
  {
    name: "OBYS Agency",
    favicon: "/images/projects/logos/favicon.ico",
    imageUrl: [
      "/images/projects/obys (1).jpeg",
      "/images/projects/obys (2).jpeg",
      "/images/projects/obys (3).jpeg",
      // "/images/projects/obys (4).jpeg",
      "/images/projects/obys (5).jpeg",
    ],
    description:
      "Clone of obys agency top notch design with gsap animation locomotive js",
    // sourceCodeHref: "https://github.com/BUMBAIYA/pradityamanjhi-v2",
    liveWebsiteHref: "https://obys-agencys.netlify.app/",
  },
  {
    name: "OBYS Agency",
    favicon: "/images/projects/logos/favicon.ico",
    imageUrl: ["/images/alify.jpeg"],
    description: "movie webapp in react js with tailwindcss and framer motion",
    liveWebsiteHref: "https://obys-agencys.netlify.app/",
  },
];
