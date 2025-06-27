import { AVAILABLE_LOCALES, AvailableLocale, Locale } from '@/resources/locales'

const isValidLocale = (locale: string): locale is AvailableLocale => {
  return AVAILABLE_LOCALES.includes(locale as AvailableLocale)
}

export const getAvailableLocale = ({ locale }: { locale: string }): AvailableLocale =>
  isValidLocale(locale) ? locale : Locale.English
