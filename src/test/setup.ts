import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'
import { mockMatchMedia } from './match-media'

beforeEach(() => {
  mockMatchMedia({})
})

afterEach(() => {
  cleanup()
  localStorage.clear()
  sessionStorage.clear()
})
