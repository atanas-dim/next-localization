import { resolveDictionary } from '@/utils/dictionary'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { parseT } = await resolveDictionary(await params)
  return (
    <main className="flex justify-center">
      <article className="flex max-w-2xl flex-col gap-3 p-4 underline-offset-4 sm:p-6 [&_a]:whitespace-nowrap [&_a]:underline [&_h2]:mt-3 [&_h2]:text-3xl [&_h2]:font-extrabold">
        <span className="italic">This is server-side content</span>
        <h1 className="text-4xl sm:text-5xl">{parseT('a-brief-history-of-languages')}</h1>
        <h2>{parseT('the-origins-of-language')}</h2>
        <p>
          {parseT(
            'language-has-been-a-defining-feature-of-human-civilization-for-tens-of-thousands-of-years-from-early-cave-symbols-to-the-complex-writing-systems-of-ancient-mesopotamia-language-has-evolved-as-both-a-tool-and-an-art-form',
          )}
        </p>
        <p>
          {parseT(
            'some-of-the-earliest-evidence-of-symbolic-communication-dates-back-over-yearsago-ancient-humans-used-petroglyphs-handprints-and-rudimentary-carvings-to-tell-stories-convey-warnings-and-mark-territory-learn-more-at-cave-art-wikipedia',
            {
              variables: { yearsAgo: 30000 },
              customElements: {
                a: ({ children, ...props }) => (
                  <a {...props} className="bg-pink-200">
                    {children} ↗️
                  </a>
                ),
              },
            },
          )}
        </p>
        <h2>{parseT('from-sound-to-script')}</h2>
        <p>
          {parseT(
            'spoken-languages-likely-began-as-simple-survival-sounds-warnings-calls-or-expressions-of-need-over-time-these-primitive-utterances-became-more-structured-forming-the-basis-of-what-we-now-call-speech',
          )}
        </p>

        <p>
          {parseT(
            'the-invention-of-writing-systems-revolutionized-human-communication-from-the-cuneiform-tablets-of-sumer-to-egyptian-hieroglyphs-early-scripts-allowed-knowledge-to-be-stored-shared-and-preserved-across-generations-see-more-at-britannica-s-cuneiform-overview',
            {
              customElements: {
                a: ({ children, ...props }) => (
                  <a {...props} className="bg-yellow-200">
                    {children} ↗️
                  </a>
                ),
              },
            },
          )}
        </p>
        <p>
          {parseT(
            'today-there-are-over-languagecount-spoken-languages-in-the-world-each-one-telling-its-own-story-of-origin-migration-and-change',
            { variables: { languageCount: 7000 } },
          )}
        </p>
        <h2>{parseT('language-and-identity')}</h2>
        <p>
          {parseT(
            'language-is-more-than-a-tool-it-s-a-reflection-of-identity-the-words-we-use-often-carry-cultural-significance-and-historical-depth-dialects-and-accents-tell-stories-of-regional-roots-migration-and-influence',
          )}
        </p>
        <p>
          {parseT(
            'in-many-indigenous-communities-efforts-to-preserve-endangered-languages-are-tied-directly-to-cultural-survival-when-a-language-dies-a-way-of-understanding-the-world-disappears-say-many-linguists-visit-endangeredlanguages-com-to-learn-more',
            {
              customElements: {
                a: ({ children, ...props }) => (
                  <a {...props} className="bg-green-200">
                    {children} ↗️
                  </a>
                ),
              },
            },
          )}
        </p>
        <h2>{parseT('the-digital-age-of-language')}</h2>
        <p>
          {parseT(
            'with-the-rise-of-the-internet-and-global-communication-language-is-changing-faster-than-ever-emojis-memes-and-abbreviations-are-shaping-how-we-express-ourselves-online',
          )}
        </p>
        <p>
          {parseT(
            'tech-giants-now-invest-in-real-time-translation-voice-recognition-and-ai-generated-subtitles-proof-that-language-remains-a-cutting-edge-technology-try-tools-like-platformname',
            {
              variables: { platformName: 'Google Translate', platformUrl: 'https://translate.google.com/' },
              customElements: {
                a: ({ children, ...props }) => (
                  <a {...props} className="bg-orange-200">
                    {children} ↗️
                  </a>
                ),
              },
            },
          )}
        </p>
        <h2>{parseT('final-thoughts')}</h2>
        <p>
          {parseT(
            'language-is-how-we-preserve-culture-share-knowledge-and-connect-across-time-whether-written-spoken-or-signed-language-remains-at-the-heart-of-what-makes-us-human',
          )}
        </p>
        <p>
          {parseT(
            'in-a-world-of-increasing-connection-understanding-each-other-s-words-literally-and-figuratively-has-never-been-more-important',
          )}
        </p>
      </article>
    </main>
  )
}
