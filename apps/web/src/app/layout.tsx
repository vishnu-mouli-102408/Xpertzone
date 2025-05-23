import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { dark } from "@clerk/themes";
import { cn } from "@repo/ui/lib/utils";
import { Analytics } from "@vercel/analytics/next";

import "@repo/ui/globals.css";

import { Suspense } from "react";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { LoadingSpinner } from "@repo/ui/components/loading-spinner";
import { Toaster } from "@repo/ui/components/sonner";

import { Providers } from "../components";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Xpert Zone",
  description:
    "A platform where users can seek guidance and personalized advice from industry experts through interactive video and audio calls.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

export const viewport: Viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari, credit to https://github.com/ai-ng
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        poppins.variable,
        "dark min-h-screen overflow-x-hidden antialiased"
      )}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="MyWebSite" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="48x48" />
        <link
          rel="icon"
          href="/favicon/favicon.svg"
          sizes="any"
          type="image/svg+xml"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={cn(poppins.className, "dark antialiased")}>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
            elements: {
              footer: {
                display: "none",
              },
            },
            layout: {
              unsafe_disableDevelopmentModeWarnings: true,
            },
          }}
        >
          <ClerkLoading>
            <LoadingSpinner mainClassName="h-screen" />
          </ClerkLoading>
          <ClerkLoaded>
            <Suspense fallback={<LoadingSpinner mainClassName="h-screen" />}>
              <main className="relative flex flex-col">
                <Providers>
                  {children}
                  <Analytics />
                </Providers>
                <Toaster
                  closeButton
                  position="bottom-center"
                  theme="dark"
                  richColors
                />
              </main>
            </Suspense>
          </ClerkLoaded>
        </ClerkProvider>
      </body>
    </html>
  );
}
