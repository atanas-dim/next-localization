// hooks/useParseT.ts
import { ReactNode, useCallback } from 'react'

import { Dictionary } from '@/dictionaries'
import { CustomElements, parseT as parseTHelper, Variables } from '@/utils/dictionary'

import useDictionaryStore from './useDictionaryStore'

export type ParseTKey = keyof Dictionary
export type ParseTOptions = {
  variables?: Variables
  customElements?: CustomElements
}

export type ParseTFunc = (key: ParseTKey, options?: ParseTOptions) => ReactNode

export function useParseT(): ParseTFunc {
  const dict = useDictionaryStore((s) => s.dict)

  return useCallback(
    (key, options = {}) => {
      const { variables, customElements } = options
      return parseTHelper(!!dict ? dict[key] : key, variables, customElements)
    },
    [dict],
  )
}
