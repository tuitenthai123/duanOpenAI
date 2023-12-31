import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
const inter = Inter({ subsets: ['latin'] })
import { Head } from 'next/document'

export const metadata: Metadata = {
  title: 'tuitenthai SAAS',
  description: 'conmeo123 =))))',
  manifest: '/manifest.json',
  icons:{apple: '/icon.png'},
  themeColor: '#fff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <ClerkProvider>
      <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ClerkProvider>
  )
}
