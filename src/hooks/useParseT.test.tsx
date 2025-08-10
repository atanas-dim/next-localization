import React from 'react'
import { renderHook, render, screen } from '@testing-library/react'
import { DictionaryProvider } from '@/components/DictionaryProvider'
import en from '@/dictionaries/en.json'
import { Locale } from '@/resources/locales'
import { useParseT } from './useParseT'

const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <DictionaryProvider dict={en as any} locale={Locale.English}>
    {children}
  </DictionaryProvider>
)

describe('useParseT', () => {
  it('returns a function that renders dictionary content', () => {
    const { result } = renderHook(() => useParseT(), { wrapper })
    const node = result.current('select-your-language')
    render(<div>{node}</div>)
    expect(screen.getByText('Select your language')).toBeInTheDocument()
  })
})
