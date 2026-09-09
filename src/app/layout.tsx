import type { Metadata } from "next";
import localFont from "next/font/local";
import { profile } from "@/components/content";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.devraval.dev"),
  title: `Dev Raval – ${profile.headline}`,
  description: profile.summary,
  keywords: ["Dev Raval", "Business Development", "Software Development", "Business Research", "Communication", "Microsoft Excel", "SQL", "Flutter", "Firebase"],
  authors: [{ name: "Dev Raval", url: "https://github.com/DevRaval2604" }],
  openGraph: {
    title: `Dev Raval – ${profile.headline}`,
    description: profile.summary,
    siteName: "Dev Raval Portfolio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Dev Raval – ${profile.headline}`,
    description: profile.summary,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        {children}
      </body>
    </html>
  );
}
