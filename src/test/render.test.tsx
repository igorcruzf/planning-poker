import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithUser } from './render'

describe('renderWithUser', () => {
  it('devolve um user que dispara os eventos do componente', async () => {
    const onClick = vi.fn()
    const { user } = renderWithUser(<button onClick={onClick}>Votar</button>)

    await user.click(screen.getByRole('button', { name: 'Votar' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('registra os matchers do jest-dom', () => {
    renderWithUser(<button>Votar</button>)

    expect(screen.getByRole('button', { name: 'Votar' })).toBeInTheDocument()
  })
})
