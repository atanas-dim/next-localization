'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC } from 'react'
import { twJoin } from 'tailwind-merge'

import useDictionaryStore from '@/hooks/useDictionaryStore'
import { AvailableLocale, Locale } from '@/resources/locales'

const LANGUAGES: Record<AvailableLocale, { icon: string; label: string; locale: AvailableLocale }> = {
  [Locale.English]: { icon: '🇬🇧', label: 'English', locale: Locale.English },
  [Locale.French]: { icon: '🇫🇷', label: 'Français', locale: Locale.French },
}

const LanguagePicker: FC = () => {
  const pathname = usePathname()
  const locale = useDictionaryStore((s) => s.locale)

  return (
    <div className="mx-auto flex w-full max-w-2xl justify-center gap-2 rounded-2xl px-4 sm:px-6">
      <div className="flex gap-4 rounded-2xl bg-white p-2">
        {Object.values(LANGUAGES).map((lang, index) => {
          const isActive = locale === lang.locale
          return (
            <Link
              key={'lang-btn-' + index}
              scroll={false}
              href={pathname.replace('/' + locale, '/' + lang.locale)}
              className="flex w-17 flex-col items-center">
              <span
                className={twJoin(
                  'text-5xl leading-[0.8] transition-all duration-300',
                  !isActive && 'scale-90 grayscale-100',
                )}>
                {lang.icon}
              </span>
              <span className="text-xs font-extrabold">{lang.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default LanguagePicker
