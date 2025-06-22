'use client'

import { useParseT } from '@/hooks/useParseT'

export default function Home() {
  const parseT = useParseT()

  return (
    <main className="flex justify-center">
      <div className="flex max-w-2xl flex-col gap-3 p-8">
        <span className="font-bold italic">Nested page</span>
        <h1 className="mb-4 text-center text-4xl font-extrabold">{parseT('a-brief-history-of-languages')}</h1>
        <h2 className="text-center text-3xl font-extrabold">{parseT('the-origins-of-language')}</h2>
        <p>
          {parseT(
            'language-has-been-a-defining-feature-of-human-civilization-for-tens-of-thousands-of-years-from-early-cave-symbols-to-the-complex-writing-systems-of-ancient-mesopotamia-language-has-evolved-as-both-a-tool-and-an-art-form',
          )}
        </p>
        <h2 className="text-center text-3xl font-extrabold">{parseT('from-sound-to-script')}</h2>
        <p>
          {parseT(
            'spoken-languages-likely-began-as-simple-sounds-tied-to-survival-over-time-these-sounds-grew-into-structured-speech-and-later-written-scripts-today-there-are-over-number-spoken-languages-across-the-world-each-with-its-own-story',
            {
              variables: { number: 7000 },
            },
          )}
        </p>

        <p>
          {parseT('language-is-how-we-preserve-culture-share-knowledge-and-connect-across-generations', {
            customElements: {
              span: (props) => <span className="rounded-md bg-lime-200 px-1" {...props} />,
            },
          })}
        </p>
      </div>
    </main>
  )
}
