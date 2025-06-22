import { redirect } from 'next/navigation'
import { type FC } from 'react'

import { Locale } from '@/resources/locales'

const IndexPage: FC = () => {
  redirect('/' + Locale.English)
}

export default IndexPage
