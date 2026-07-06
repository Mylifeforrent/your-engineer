import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { AppShell } from "@/components/app-shell"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Copilot Engineering Efficiency Platform",
  description: "AI engineering copilot for enterprise R&D teams: requirement analysis, test execution, daily health check, alert analysis, etc.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-US" className={`bg-background ${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
