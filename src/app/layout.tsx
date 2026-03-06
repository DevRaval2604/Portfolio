import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev Raval – Software Developer & Flutter Engineer",
  description:
    "Professional portfolio of Dev Raval – Software Developer & Flutter Engineer building scalable, AI-powered mobile applications.",
  keywords: ["Dev Raval", "Flutter", "Software Developer", "Mobile App", "Firebase", "Gemini API"],
  authors: [{ name: "Dev Raval", url: "https://github.com/DevRaval2604" }],
  openGraph: {
    title: "Dev Raval – Software Developer & Flutter Engineer",
    description:
      "Building scalable, AI-powered mobile applications. Explore my work in Flutter, Firebase, and AI integration.",
    siteName: "Dev Raval Portfolio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Raval – Software Developer & Flutter Engineer",
    description:
      "Building scalable, AI-powered mobile applications. Explore my work in Flutter, Firebase, and AI integration.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${inter.className}`}>
      <body className="min-h-screen bg-background text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}