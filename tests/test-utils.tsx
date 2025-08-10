import React from 'react'
import { render } from '@testing-library/react'
import { DictionaryProvider } from '@/components/DictionaryProvider'
import en from '@/dictionaries/en.json'
import { Locale } from '@/resources/locales'
import type { AvailableLocale } from '@/resources/locales'
import type { Dictionary } from '@/dictionaries'

export function renderWithDictionary(
  ui: React.ReactElement,
  {
    dict = en as unknown as Dictionary,
    locale = Locale.English as AvailableLocale,
  }: { dict?: Dictionary; locale?: AvailableLocale } = {},
) {
  return render(
    <DictionaryProvider dict={dict} locale={locale}>
      {ui}
    </DictionaryProvider>,
  )
}
