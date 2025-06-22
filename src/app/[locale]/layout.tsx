import Dictionary from '@/components/Dictionary'
import LanguagePicker from '@/components/LanguagePicker'
import { getDictionary } from '@/dictionaries'
import { getLocale } from '@/utils/locales'

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const parameters = await params
  const locale = await getLocale(parameters)
  const dict = await getDictionary(locale)

  return (
    <>
      <Dictionary dict={dict} locale={locale}>
        <LanguagePicker />
        {children}
      </Dictionary>
    </>
  )
}
