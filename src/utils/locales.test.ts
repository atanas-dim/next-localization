import { getAvailableLocale } from './locales'
import { Locale } from '@/resources/locales'

describe('getAvailableLocale', () => {
  it('returns the same locale if available', () => {
    expect(getAvailableLocale({ locale: 'en' })).toBe(Locale.English)
    expect(getAvailableLocale({ locale: 'fr' })).toBe(Locale.French)
  })

  it('falls back to English for unsupported locales', () => {
    expect(getAvailableLocale({ locale: 'de' })).toBe(Locale.English)
  })
})
