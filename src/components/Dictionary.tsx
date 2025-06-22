'use client'

import { type FC, useLayoutEffect } from 'react'

import { type Dictionary } from '@/dictionaries'
import useDictionaryStore from '@/hooks/useDictionaryStore'
import { AvailableLocale } from '@/resources/locales'

type DictionaryProps = {
  dict: Dictionary
  locale: AvailableLocale
}

const Dictionary: FC<DictionaryProps> = ({ dict, locale }) => {
  const setDict = useDictionaryStore((state) => state.setDict)
  const setLocale = useDictionaryStore((state) => state.setLocale)

  useLayoutEffect(() => {
    setDict(dict)
    setLocale(locale)
  }, [dict, locale, setDict, setLocale])

  return null
}

export default Dictionary
