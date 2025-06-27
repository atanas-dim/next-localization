import '@/app/globals.css'

import type { Metadata } from 'next'
import { Limelight, Monoton, Noto_Serif } from 'next/font/google'

const notoSerif = Noto_Serif({
  variable: '--font-noto-serif',
  subsets: ['latin'],
})

const monoton = Monoton({
  variable: '--font-monoton',
  subsets: ['latin'],
  weight: ['400'],
})

const limelight = Limelight({
  variable: '--font-limelight',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'NextJS Localization',
  description: '',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSerif.variable} ${monoton.variable} ${limelight.variable} flex flex-col items-center bg-stone-100 p-4 text-black antialiased`}>
        {children}
      </body>
    </html>
  )
}
