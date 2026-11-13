import { render, type RenderResult } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import type { ReactElement } from 'react'

export function renderWithUser(ui: ReactElement): RenderResult & { user: UserEvent } {
  const user = userEvent.setup()
  return { user, ...render(ui) }
}
