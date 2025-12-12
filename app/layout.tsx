import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import PageLoader from '@/components/PageLoader'
import PreloadAssets from '@/components/PreloadAssets'

export const metadata: Metadata = {
  title: 'Pham Duc Kien',
  description: 'Personal portfolio for Finance and Data Professional',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        <PreloadAssets />
        <ThemeProvider>
          <LanguageProvider>
            <PageLoader>
              {children}
            </PageLoader>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

