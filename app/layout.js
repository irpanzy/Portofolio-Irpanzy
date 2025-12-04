import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
  preload: true,
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: "Portofolio | Irfan Muria",
  description:
    "The professional portfolio of Irfan Muria – Fullstack Developer and tech enthusiast.",
  icons: {
    icon: "/Logo.png",
  },
  other: {
    'fetchpriority': 'high',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="google-site-verification"
          content="0eVzHjpQInU86Gt_8fC7ycnnjGhw4ntEyeia_QEvPSA"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Preconnect untuk CDN eksternal jika ada */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link rel="icon" href="/Logo.png" type="image/png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Irfan Muria",
              url: "https://irpanzy.vercel.app/",
              image: "https://irpanzy.vercel.app/Logo.png",
              jobTitle: "Fullstack Developer",
              description:
                "The professional portfolio of Irfan Muria – Fullstack Developer and tech enthusiast.",
              sameAs: [
                "https://github.com/irpanzy",
                "https://www.linkedin.com/in/irfanmuria",
              ],
            }),
          }}
        />
      </head>

      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden dark:bg-darkTheme dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
