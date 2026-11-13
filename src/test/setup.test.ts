import { describe, expect, it } from 'vitest'
import { mockMatchMedia } from './match-media'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

describe('setup global dos testes', () => {
  it('1: grava nos storages', () => {
    localStorage.setItem('yak', '1')
    sessionStorage.setItem('yak', '1')

    expect(localStorage.getItem('yak')).toBe('1')
    expect(sessionStorage.getItem('yak')).toBe('1')
  })

  it('2: encontra os storages limpos', () => {
    expect(localStorage.getItem('yak')).toBeNull()
    expect(sessionStorage.getItem('yak')).toBeNull()
  })

  it('3: altera o matchMedia', () => {
    mockMatchMedia({ [REDUCED_MOTION]: true })

    expect(window.matchMedia(REDUCED_MOTION).matches).toBe(true)
  })

  it('4: encontra o matchMedia padrão', () => {
    expect(window.matchMedia(REDUCED_MOTION).matches).toBe(false)
  })
})
