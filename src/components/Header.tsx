'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC } from 'react'
import { twJoin } from 'tailwind-merge'

import { useDictionary } from '@/components/DictionaryProvider'
import LanguagePicker from '@/components/LanguagePicker'
import { Dictionary } from '@/dictionaries'
import { useParseT } from '@/hooks/useParseT'

const LINKS: { labelKey: keyof Dictionary; path: string }[] = [
  { labelKey: 'server-side', path: '' },
  { labelKey: 'client-side', path: '/client-side' },
]

const Header: FC = () => {
  const { locale } = useDictionary()
  const pathname = usePathname()
  const parseT = useParseT()

  return (
    <header className="mx-auto flex w-full max-w-2xl items-center justify-between gap-2 p-4 sm:p-6">
      <LanguagePicker />
      <nav className="flex items-center gap-3 text-right font-bold">
        {LINKS.map((link, index) => {
          const href = `/${locale}${link.path}`
          const isActive = pathname === href
          return (
            <Link
              key={`nav-link-${index}`}
              href={href}
              className={twJoin('text-sm sm:text-base', isActive ? 'underline underline-offset-2' : 'opacity-50')}>
              {parseT(link.labelKey)}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}

export default Header
