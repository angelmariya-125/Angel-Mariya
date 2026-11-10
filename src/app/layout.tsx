import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Angel Mariya | CS & AI Engineering Portfolio",
  description:
    "Personal portfolio of Angel Mariya, Computer Science & Artificial Intelligence Engineering student at Thejus Engineering College, Kerala, India.",
  keywords: [
    "Angel Mariya",
    "Computer Science",
    "Artificial Intelligence",
    "Portfolio",
    "Thejus Engineering College",
    "Kerala",
    "Web Development",
    "Machine Learning",
  ],
  authors: [{ name: "Angel Mariya" }],
  openGraph: {
    title: "Angel Mariya | CS & AI Engineering Portfolio",
    description:
      "Turning ideas in AI and web development into projects that solve real problems.",
    url: "https://angelmariya.dev",
    siteName: "Angel Mariya Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angel Mariya | CS & AI Engineering Portfolio",
    description:
      "Turning ideas in AI and web development into projects that solve real problems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@300;400;500;600;700;800;900&family=Pixelify+Sans:wght@500;600;700&family=Silkscreen:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#ffffff] text-[#0a0a0a] antialiased selection:bg-[#0a0a0a] selection:text-[#ffffff] dark:bg-[#0a0a0a] dark:text-[#f5f5f5] dark:selection:bg-[#f5f5f5] dark:selection:text-[#0a0a0a]">
        {children}
      </body>
    </html>
  );
}
