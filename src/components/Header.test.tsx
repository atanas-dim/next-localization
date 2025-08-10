import React from 'react'
import Header from './Header'
import { renderWithDictionary } from '../../tests/test-utils'
import { screen } from '@testing-library/react'

describe('Header', () => {
  it('renders navigation links from dictionary', () => {
    renderWithDictionary(<Header />)
    expect(screen.getByRole('link', { name: /Server side/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Client side/i })).toBeInTheDocument()
  })
})
