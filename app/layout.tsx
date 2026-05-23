import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist"
})
const _geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: 'Kiran Bondre | Director of Marketing | B2B SaaS & Cloud GTM Leader',
  description: 'P&L-aligned marketing leader with 8+ years of experience driving revenue growth, partner-led GTM, and enterprise demand generation across B2B SaaS, Cloud, and IT Services organizations.',
  keywords: ['B2B SaaS', 'Cloud Marketing', 'GTM Strategy', 'Revenue Marketing', 'Enterprise ABM', 'Google Cloud', 'AWS', 'Azure'],
  authors: [{ name: 'Kiran Bondre' }],
  openGraph: {
    title: 'Kiran Bondre | Director of Marketing',
    description: 'P&L-aligned marketing leader driving $10M+ in annual pipeline across hyperscaler ecosystems',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a14',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_geist.variable} ${_geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
