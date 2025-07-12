import { useCallback } from 'react'

import { useDictionary } from '@/components/DictionaryProvider'
import { Dictionary } from '@/dictionaries'
import { createParseT, CustomElements, Variables } from '@/utils/dictionary'

export function useParseT() {
  const { dict: dictFromStore } = useDictionary()

  return useCallback(
    (key: keyof Dictionary, options?: { variables?: Variables; customElements?: CustomElements }) => {
      const dict = dictFromStore ?? ({} as Dictionary)
      return createParseT(dict)(key, options)
    },
    [dictFromStore],
  )
}
