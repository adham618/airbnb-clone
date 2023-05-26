export const siteConfig = {
  /** Without additional '/' on the end, e.g. https://google.com */
  name: "Airbnb - Clone",
  short_name: "Airbnb",
  description: "Airbnb clone built with Next.js, Tailwind CSS and TypeScript.",
  url: "https://airbnbclone-vert-eight.vercel.app",
  ogImage: "https://airbnbclone-vert-eight.vercel.app/images/og.jpg",
  links: {
    twitter: "https://twitter.com/test",
    github: "https://github.com/adham618",
  },
  creator: {
    name: "Arshad Yaseen",
    twitter: "https://twitter.com",
    github: "https://github.com",
    website: "https://test.com",
    mail: "arshadpyaseen@gmail.com",
    twitterUserName: "@test",
  },
};
export type SiteConfig = typeof siteConfig;
