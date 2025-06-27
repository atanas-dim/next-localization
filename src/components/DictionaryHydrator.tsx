'use client'

import { type FC, type PropsWithChildren, useEffect } from 'react'

import { type Dictionary } from '@/dictionaries'
import useDictionaryStore from '@/hooks/useDictionaryStore'
import { AvailableLocale } from '@/resources/locales'

type DictionaryHydratorProps = {
  dict: Dictionary
  locale: AvailableLocale
}

const DictionaryHydrator: FC<PropsWithChildren<DictionaryHydratorProps>> = ({ children, dict, locale }) => {
  const setDict = useDictionaryStore((state) => state.setDict)
  const setLocale = useDictionaryStore((state) => state.setLocale)
  const storedDict = useDictionaryStore((s) => s.dict)

  useEffect(() => {
    setDict(dict)
    setLocale(locale)
  }, [dict, locale, setDict, setLocale])

  if (!!storedDict) return children
  return null
}

export default DictionaryHydrator
