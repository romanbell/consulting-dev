import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  // Weight 900 is only used by the disabled grid page (app/_projects);
  // re-add it here if that route comes back.
  weight: ["400", "500", "700"],
  display: "swap",
});

const DESCRIPTION =
  "Veridium is a small digital studio practice working across design and engineering. Based in New York, NY and Cambridge, MA.";

export const metadata: Metadata = {
  title: "Veridium",
  description: DESCRIPTION,
  metadataBase: new URL("https://veridium.studio"),
  openGraph: {
    title: "Veridium",
    description: DESCRIPTION,
    url: "https://veridium.studio",
    siteName: "Veridium",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veridium",
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Google tag (gtag.js) — React hoists the async loader into <head>. */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3FJXBRFZ4N"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-3FJXBRFZ4N');`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
