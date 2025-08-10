import '@testing-library/jest-dom'
import React from 'react'

// Basic mocks for Next.js client modules used in your components
jest.mock('next/navigation', () => ({
  usePathname: () => '/en',
}))

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => {
    // Simplify <Link> to a plain anchor for tests (avoid JSX in setup file)
    return React.createElement('a', { href, ...props }, children)
  },
}))
