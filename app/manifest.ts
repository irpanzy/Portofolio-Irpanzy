import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Irfan Muria | Fullstack Developer Portfolio",
    short_name: "Irfan Muria",
    description:
      "The professional portfolio of Irfan Muria – Fullstack Developer and tech enthusiast.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#77BEF0",
    icons: [
      {
        src: "/Logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
