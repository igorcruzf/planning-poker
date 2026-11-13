import { describe, expect, it, vi } from 'vitest'
import { mockMatchMedia, setMediaQuery } from './match-media'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const TABLET = '(min-width: 768px)'

describe('matchMedia', () => {
  it('responde false por padrão', () => {
    expect(window.matchMedia(REDUCED_MOTION).matches).toBe(false)
  })

  it('responde conforme as queries configuradas', () => {
    mockMatchMedia({ [REDUCED_MOTION]: true })

    expect(window.matchMedia(REDUCED_MOTION).matches).toBe(true)
    expect(window.matchMedia(TABLET).matches).toBe(false)
  })

  it('avisa só o ouvinte da query alterada', () => {
    const reducedMotionListener = vi.fn()
    const tabletListener = vi.fn()
    window.matchMedia(REDUCED_MOTION).addEventListener('change', reducedMotionListener)
    window.matchMedia(TABLET).addEventListener('change', tabletListener)

    setMediaQuery(REDUCED_MOTION, true)

    expect(reducedMotionListener).toHaveBeenCalledTimes(1)
    expect(reducedMotionListener.mock.calls[0][0].matches).toBe(true)
    expect(tabletListener).not.toHaveBeenCalled()
    expect(window.matchMedia(REDUCED_MOTION).matches).toBe(true)
  })

  it('não avisa o ouvinte removido', () => {
    const listener = vi.fn()
    const query = window.matchMedia(REDUCED_MOTION)
    query.addEventListener('change', listener)
    query.removeEventListener('change', listener)

    setMediaQuery(REDUCED_MOTION, true)

    expect(listener).not.toHaveBeenCalled()
  })
})
