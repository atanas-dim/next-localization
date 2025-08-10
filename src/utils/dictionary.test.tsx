import React from 'react'
import { render, screen } from '@testing-library/react'
import { createParseT } from './dictionary'
import en from '@/dictionaries/en.json'
import { type Dictionary } from '@/dictionaries'

/**
 * Use a real key from the Dictionary type to satisfy `keyof Dictionary`.
 * We pick `digital-p-2` because it includes variables and an <a> element,
 * so we can verify both variable interpolation and custom element replacement.
 */

describe('createParseT', () => {
  test('replaces variables and custom elements', () => {
    const dict = en as unknown as Dictionary
    const parseT = createParseT(dict)

    render(
      <div>
        {parseT('digital-p-2', {
          variables: {
            platformName: 'Google Translate',
            platformUrl: 'https://translate.google.com/',
          },
          customElements: {
            a: ({ children, ...props }) => (
              <a {...props} className="bg-orange-200">
                {children}
              </a>
            ),
          },
        })}
      </div>,
    )

    const link = screen.getByRole('link', { name: 'Google Translate' }) as HTMLAnchorElement
    expect(link).toBeInTheDocument()
    expect(link.href).toContain('https://translate.google.com/')
    expect(link.tagName).toBe('A')
  })
})
