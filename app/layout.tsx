import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/site.config";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonLd";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { StatusBar } from "@/components/layout/StatusBar";
import { IndexFAB } from "@/components/motion/IndexFAB";
import { HoverPlate } from "@/components/motion/HoverPlate";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { MobileBottomCTA } from "@/components/layout/MobileBottomCTA";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd()),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="grid-overlay" aria-hidden="true" />
        <SmoothScroll />
        {children}
        <StatusBar />
        <IndexFAB />
        <HoverPlate />
        <CustomCursor />
        <MobileBottomCTA />
        {/* Analytics placeholder: drop Plausible or PostHog script here */}
      </body>
    </html>
  );
}
