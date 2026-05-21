import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'Workspace Designer | monis.rent',
  description: 'Design your perfect Bali workspace and rent it through monis.rent',
  openGraph: {
    title: 'Workspace Designer | monis.rent',
    description: 'Design your perfect Bali workspace and rent it through monis.rent',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#064e3b',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
