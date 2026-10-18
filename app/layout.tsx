import type { Metadata, Viewport } from 'next'
import { Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SITE_URL } from '@/lib/content'
import './globals.css'

const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

const title = 'Sahil Shah — Software Engineer'
const description =
  'SDE 1 at Amazon. Full-stack, AI and UI. I build things. They work. Usually.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    url: '/',
    siteName: 'Sahil Shah',
    title,
    description,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title, description },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sahil Shah',
  url: SITE_URL,
  jobTitle: 'Software Development Engineer',
  worksFor: { '@type': 'Organization', name: 'Amazon' },
  sameAs: [
    'https://github.com/sahil1229',
    'https://www.linkedin.com/in/sahilshah1229/',
    'https://leetcode.com/u/sahilshah1229/',
    'https://www.instagram.com/sahil1229.__/',
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body className="font-mono antialiased">
        <script
          type="application/ld+json"
          // Static object defined above; no user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
