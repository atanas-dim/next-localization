'use client'

import { type FC, type PropsWithChildren, useLayoutEffect } from 'react'

import { type Dictionary } from '@/dictionaries'
import useDictionaryStore from '@/hooks/useDictionaryStore'
import { AvailableLocale } from '@/resources/locales'

type DictionaryProps = {
  dict: Dictionary
  locale: AvailableLocale
}

const Dictionary: FC<PropsWithChildren<DictionaryProps>> = ({ children, dict, locale }) => {
  const setDict = useDictionaryStore((state) => state.setDict)
  const setLocale = useDictionaryStore((state) => state.setLocale)
  const storedDict = useDictionaryStore((s) => s.dict)

  useLayoutEffect(() => {
    setDict(dict)
    setLocale(locale)
  }, [dict, locale, setDict, setLocale])

  if (!!storedDict) return children
  return null
}

export default Dictionary
