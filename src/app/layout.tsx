import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Raval – Software Developer & Flutter Engineer",
  description:
    "Professional portfolio of Dev Raval – Software Developer & Flutter Engineer building scalable, AI-powered mobile applications."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-screen bg-background text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}

