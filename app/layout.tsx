import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "CryptoMine - Minage Bitcoin Cloud | Revenus Passifs & Affiliation",
  description: "Plateforme de minage Bitcoin professionnelle. Generez des revenus passifs sans materiel. Programme d'affiliation jusqu'a 25%. Conformite TVA integree. +127,000 utilisateurs.",
  keywords: ["bitcoin", "minage", "cloud mining", "crypto", "revenus passifs", "affiliation", "TVA"],
  authors: [{ name: "CryptoMine" }],
  openGraph: {
    title: "CryptoMine - Minage Bitcoin Cloud",
    description: "Generez des revenus passifs avec le minage Bitcoin. Programme d'affiliation jusqu'a 25% de commission a vie.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "CryptoMine - Minage Bitcoin Cloud",
    description: "Generez des revenus passifs avec le minage Bitcoin.",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
