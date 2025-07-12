'use client'

import React, { createContext, type PropsWithChildren, useContext } from 'react'

import { Dictionary } from '@/dictionaries'
import { AvailableLocale } from '@/resources/locales'

type DictionaryContextType = {
  dict: Dictionary
  locale: AvailableLocale
}

const DictionaryContext = createContext<DictionaryContextType | undefined>(undefined)

type DictionaryProviderProps = {
  dict: Dictionary
  locale: AvailableLocale
}

export const DictionaryProvider = ({ dict, locale, children }: PropsWithChildren<DictionaryProviderProps>) => {
  return <DictionaryContext.Provider value={{ dict, locale }}>{children}</DictionaryContext.Provider>
}

export const useDictionary = () => {
  const context = useContext(DictionaryContext)
  if (!context) {
    throw new Error('useDictionary must be used within a DictionaryProvider')
  }
  return context
}
