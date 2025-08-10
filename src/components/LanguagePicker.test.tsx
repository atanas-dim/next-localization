import React from 'react'
import LanguagePicker from './LanguagePicker'
import { renderWithDictionary } from '../../tests/test-utils'
import { screen } from '@testing-library/react'

// The setup mocks usePathname to return '/en'

describe('LanguagePicker', () => {
  it('renders both language options', () => {
    renderWithDictionary(<LanguagePicker />)
    expect(screen.getByText('English')).toBeInTheDocument()
    expect(screen.getByText('Français')).toBeInTheDocument()
  })

  it('links switch locales in pathname', () => {
    renderWithDictionary(<LanguagePicker />)
    const links = screen.getAllByRole('link')
    const hrefs = links.map((a) => (a as HTMLAnchorElement).getAttribute('href'))
    // Expect one link to point to /en and another to /fr
    expect(hrefs.some((h) => h?.includes('/en'))).toBe(true)
    expect(hrefs.some((h) => h?.includes('/fr'))).toBe(true)
  })
})
