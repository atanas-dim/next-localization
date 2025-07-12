import DictionaryHydrator from '@/components/DictionaryHydrator'
import Header from '@/components/Header'
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
        <Header />
        {children}
      </DictionaryHydrator>
    </>
  )
}
