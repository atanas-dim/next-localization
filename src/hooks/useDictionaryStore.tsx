import { ReactNode } from 'react'
import { create } from 'zustand'

import { type Dictionary } from '@/dictionaries'
import { AvailableLocale, Locale } from '@/resources/locales'
import { CustomElements, parseT as parseTHelper, Variables } from '@/utils/dictionary'

export type ParseTKey = keyof Dictionary
export type ParseTOptions = {
  variables?: Variables
  customElements?: CustomElements
}

export type ParseTFunc = (key: ParseTKey, options?: ParseTOptions) => ReactNode

interface DictionaryState {
  dict: Dictionary | null
  setDict: (dict: Dictionary) => void
  parseT: ParseTFunc

  locale: AvailableLocale
  setLocale: (locale: AvailableLocale) => void
}

const useDictionaryStore = create<DictionaryState>((set, get) => ({
  dict: null,
  setDict: (dict) => set({ dict }),
  parseT: (key, options = {}) => {
    const { variables, customElements } = options
    const dict = get().dict
    return parseTHelper(!!dict ? dict[key] : key, variables, customElements)
  },

  locale: Locale.English,
  setLocale: (locale) => set({ locale }),
}))

export default useDictionaryStore
