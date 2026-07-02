import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Providers } from "./providers"
import './globals.css';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "SpeakAI - AI Pronunciation Training Platform",
  description: "Master perfect pronunciation with AI-powered training and real-time feedback",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Providers>
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
      </Providers>
    </html>
  )
}
