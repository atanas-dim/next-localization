import { resolveDictionary } from '@/utils/dictionary'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { parseT } = await resolveDictionary(await params)
  return (
    <main className="flex justify-center">
      <article className="flex max-w-2xl flex-col gap-3 p-4 pb-8 underline-offset-4 sm:p-6 sm:pb-10 [&_a]:whitespace-nowrap [&_a]:underline [&_h2]:mt-3 [&_h2]:text-3xl [&_h2]:font-extrabold">
        <h1 className="text-4xl sm:text-5xl">{parseT('article-title')}</h1>
        <h2>{parseT('origins-heading')}</h2>
        <p>{parseT('origins-p-1')}</p>
        <p>
          {parseT('origins-p-2', {
            variables: { yearsAgo: 30000 },
            customElements: {
              a: ({ children, ...props }) => (
                <a {...props} className="bg-pink-200">
                  {children} ↗️
                </a>
              ),
            },
          })}
        </p>
        <h2>{parseT('writing-section-heading')}</h2>
        <p>{parseT('writing-p-1')}</p>

        <p>
          {parseT('writing-p-2', {
            customElements: {
              a: ({ children, ...props }) => (
                <a {...props} className="bg-yellow-200">
                  {children} ↗️
                </a>
              ),
            },
          })}
        </p>
        <p>{parseT('writing-p-3', { variables: { languageCount: 7000 } })}</p>
        <h2>{parseT('identity-section-heading')}</h2>
        <p>{parseT('identity-p-1')}</p>
        <p>
          {parseT('identity-p-2', {
            customElements: {
              a: ({ children, ...props }) => (
                <a {...props} className="bg-green-200">
                  {children} ↗️
                </a>
              ),
            },
          })}
        </p>
        <h2>{parseT('digital-section-heading')}</h2>
        <p>{parseT('digital-p-1')}</p>
        <p>
          {parseT('digital-p-2', {
            variables: { platformName: 'Google Translate', platformUrl: 'https://translate.google.com/' },
            customElements: {
              a: ({ children, ...props }) => (
                <a {...props} className="bg-orange-200">
                  {children} ↗️
                </a>
              ),
            },
          })}
        </p>
        <h2>{parseT('summary-section-heading')}</h2>
        <p>{parseT('summary-p-1')}</p>
        <p>{parseT('summary-p-2')}</p>
      </article>
    </main>
  )
}
