'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC } from 'react'
import { twJoin } from 'tailwind-merge'

import { useDictionary } from '@/components/DictionaryProvider'
import LanguagePicker from '@/components/LanguagePicker'

const LINKS: { label: string; path: string }[] = [
  {
    label: 'Server',
    path: '',
  },
  {
    label: 'Client',
    path: '/client',
  },
]

const Header: FC = () => {
  const { locale } = useDictionary()
  const pathname = usePathname()

  return (
    <header className="mx-auto flex w-full max-w-2xl items-center justify-between p-4 sm:p-6">
      <LanguagePicker />
      <nav className="flex items-center gap-4 font-bold">
        {LINKS.map((link, index) => {
          const href = `/${locale}${link.path}`
          const isActive = pathname === href
          return (
            <Link
              key={`nav-link-${index}`}
              href={href}
              className={twJoin(isActive ? 'underline underline-offset-2' : 'opacity-50')}>
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}

export default Header
