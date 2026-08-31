import { Outfit, Ovo, Geist } from "next/font/google";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import ReactQueryProvider from "./providers/ReactQueryProvider";
import "./globals.css";
import { cn } from "@/lib/utils";
import { HydrationWarningSupressor } from "./components/HydrationWarningSupressor";
import { Toaster } from "@/components/ui/toaster";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
  fallback: ["Georgia", "serif"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#11001f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : null,
  title: {
    default: "Irfan Muria | Fullstack Developer & Software Engineer",
    template: "%s | Irfan Muria",
  },
  description:
    "Portofolio profesional Irfan Muria (Irpanzy) – Fullstack Developer berpengalaman membangun aplikasi web & mobile modern, RESTful API, dan arsitektur cloud skalabel.",
  applicationName: "Irfan Muria Portfolio",
  authors: [{ name: "Irfan Muria", url: siteUrl || "/" }],
  generator: "Next.js",
  keywords: [
    "Irfan Muria",
    "Irpanzy",
    "Fullstack Developer",
    "Web Developer Indonesia",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Laravel",
    "Software Engineer",
    "Portfolio Developer",
    "Backend Developer",
    "Frontend Developer",
  ],
  creator: "Irfan Muria",
  publisher: "Irfan Muria",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl || "/",
    title: "Irfan Muria | Fullstack Developer & Software Engineer",
    description:
      "Portofolio profesional Irfan Muria – Fullstack Developer berpengalaman dalam React, Next.js, Node.js, Express, TypeScript, dan arsitektur cloud.",
    siteName: "Irfan Muria Portfolio",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Irfan Muria - Fullstack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Irfan Muria | Fullstack Developer & Software Engineer",
    description:
      "Portofolio profesional Irfan Muria – Fullstack Developer & Software Engineer.",
    images: ["/Logo.png"],
    creator: "@irpanzy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/Logo.png" }],
    apple: [{ url: "/Logo.png" }],
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": siteUrl ? `${siteUrl}/#person` : "#person",
      name: "Irfan Muria",
      alternateName: "Irpanzy",
      jobTitle: "Fullstack Developer",
      description:
        "Fullstack Developer specializing in building modern web and mobile applications.",
      url: siteUrl || "/",
      image: siteUrl ? `${siteUrl}/Logo.png` : "/Logo.png",
      sameAs: ["https://github.com/irpanzy"],
      knowsAbout: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "Laravel",
        "MongoDB",
        "PostgreSQL",
        "Docker",
        "Cloud Computing",
      ],
    },
    {
      "@type": "WebSite",
      "@id": siteUrl ? `${siteUrl}/#website` : "#website",
      url: siteUrl || "/",
      name: "Irfan Muria Portfolio",
      description:
        "The professional portfolio of Irfan Muria – Fullstack Developer and tech enthusiast.",
      publisher: {
        "@id": siteUrl ? `${siteUrl}/#person` : "#person",
      },
      inLanguage: ["id", "en"],
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      className={cn("scroll-smooth", "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.className} ${ovo.className} overflow-x-hidden leading-8 antialiased dark:bg-darkTheme dark:text-white`}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <HydrationWarningSupressor />
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
