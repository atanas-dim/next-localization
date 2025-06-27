import DictionaryHydrator from '@/components/DictionaryHydrator'
import LanguagePicker from '@/components/LanguagePicker'
import { resolveDictionary } from '@/utils/dictionary'

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { dict, locale } = await resolveDictionary(await params)

  return (
    <>
      <DictionaryHydrator dict={dict} locale={locale}>
        <LanguagePicker />
        {children}
      </DictionaryHydrator>
    </>
  )
}
