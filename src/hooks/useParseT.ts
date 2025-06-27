import { useCallback } from 'react'

import { Dictionary } from '@/dictionaries'
import useDictionaryStore from '@/hooks/useDictionaryStore'
import { createParseT, CustomElements, Variables } from '@/utils/dictionary'

export function useParseT() {
  const dictFromStore = useDictionaryStore((s) => s.dict)

  return useCallback(
    (key: keyof Dictionary, options?: { variables?: Variables; customElements?: CustomElements }) => {
      const dict = dictFromStore ?? ({} as Dictionary)
      return createParseT(dict)(key, options)
    },
    [dictFromStore],
  )
}
