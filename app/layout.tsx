import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Starkdesign - Premium Shadcn UI Registry",
  description: "A custom Shadcn registry for modern, high-fidelity components built with Tailwind CSS, React, and glassmorphism design patterns.",
  metadataBase: new URL("https://starkdesign.site"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground relative bg-grid transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="absolute inset-0 bg-radial pointer-events-none -z-10 animate-fade-in" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
