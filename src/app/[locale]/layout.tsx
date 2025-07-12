import { DictionaryProvider } from '@/components/DictionaryProvider'
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
      <DictionaryProvider dict={dict} locale={locale}>
        <Header />
        {children}
      </DictionaryProvider>
    </>
  )
}
