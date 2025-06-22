'use client'

import { useParseT } from '@/hooks/useParseT'

export default function Home() {
  const parseT = useParseT()

  return (
    <main className="flex flex-col p-6">
      <h1 className="text-4xl font-extrabold">{parseT('a-brief-history-of-languages')}</h1>
    </main>
  )
}
