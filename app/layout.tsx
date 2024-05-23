'use client'
import '../css/tailwind.css'
import { Space_Grotesk } from 'next/font/google'
import Header from '@/components/Header'
import { ThemeProviders } from './theme-providers'
import Toaster from '@/components/Toaster'
import {  usePathname } from 'next/navigation'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <html className={`${space_grotesk.variable} scroll-smooth`} suppressHydrationWarning>
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <body className="bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        {(pathname == '/signin' || pathname == '/signup') ? (
          <><Toaster />{children}</>
        ):( 
          <ThemeProviders>
          <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
              <div className="flex h-screen flex-col justify-between font-sans">
                <Header />
                <Toaster />
                <main className="mb-auto">{children}</main>
              </div>
          </section>
          </ThemeProviders>
        ) }
      </body>
    </html>
  )
}
