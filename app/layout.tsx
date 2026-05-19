import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

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
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-zinc-950 text-zinc-50 relative bg-grid`}>
        <div className="absolute inset-0 bg-radial pointer-events-none -z-10" />
        {children}
      </body>
    </html>
  )
}
