import type { Metadata } from 'next'
import { Outfit, Playfair_Display, Caveat, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SmoothScroll } from '@/components/smooth-scroll'
import './globals.css'

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })
const caveat = Caveat({ subsets: ["latin"], variable: "--font-signature" })

export const metadata: Metadata = {
  title: 'Ares Production',
  description: 'A premium production house capturing the essence of movement and storytelling.',
  generator: 'Next.js',
  icons: {
    icon: '/ares2.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} ${geistMono.variable} ${playfair.variable} ${caveat.variable} font-sans antialiased selection:bg-[#8b0100]/30 selection:text-white`}>
        <SmoothScroll />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
