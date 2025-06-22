import '@/app/globals.css'

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import Dictionary from '@/components/Dictionary'
import LanguagePicker from '@/components/LanguagePicker'
import { getDictionary } from '@/dictionaries'
import { getLocale } from '@/utils/locales'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'NextJS Localization',
  description: '',
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const parameters = await params
  const locale = await getLocale(parameters)
  const dict = await getDictionary(locale)

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-geist-sans flex flex-col items-center bg-white p-4 text-black antialiased`}>
        <Dictionary dict={dict} locale={locale} />
        <LanguagePicker />
        {children}
      </body>
    </html>
  )
}
