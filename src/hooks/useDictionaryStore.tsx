import { create } from 'zustand'

import { type Dictionary } from '@/dictionaries'
import { AvailableLocale, Locale } from '@/resources/locales'

interface DictionaryState {
  dict: Dictionary | null
  setDict: (dict: Dictionary) => void
  locale: AvailableLocale
  setLocale: (locale: AvailableLocale) => void
}

const useDictionaryStore = create<DictionaryState>((set, get) => ({
  dict: null,
  setDict: (dict) => set({ dict }),
  locale: Locale.English,
  setLocale: (locale) => set({ locale }),
}))

export default useDictionaryStore
