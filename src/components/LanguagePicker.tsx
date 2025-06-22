'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type FC } from 'react'
import { twJoin } from 'tailwind-merge'

import { Dictionary } from '@/dictionaries'
import useDictionaryStore from '@/hooks/useDictionaryStore'
import { AvailableLocale, Locale } from '@/resources/locales'

const LANGUAGES: Record<AvailableLocale, { icon: string; labelKey: keyof Dictionary; locale: AvailableLocale }> = {
  [Locale.English]: { icon: '🇬🇧', labelKey: 'english', locale: Locale.English },
  [Locale.French]: { icon: '🇫🇷', labelKey: 'french', locale: Locale.French },
}

const LanguagePicker: FC = () => {
  const pathname = usePathname()

  const locale = useDictionaryStore((s) => s.locale)
  const dict = useDictionaryStore((s) => s.dict)

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center rounded-2xl bg-lime-50 p-4">
      <span className="text-sm font-extrabold uppercase">{dict?.['select-your-language']}</span>
      <div className="flex gap-4 p-4">
        {Object.values(LANGUAGES).map((lang, index) => {
          const isActive = locale === lang.locale
          return (
            <Link
              key={'lang-btn-' + index}
              scroll={false}
              href={pathname.replace('/' + locale, '/' + lang.locale)}
              className="flex flex-col items-center">
              <span
                className={twJoin(
                  'text-7xl leading-[0.8] transition-all duration-300',
                  !isActive && 'scale-90 grayscale-100',
                )}>
                {lang.icon}
              </span>
              <span className="text-sm font-extrabold uppercase">{dict?.[lang.labelKey]}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default LanguagePicker
