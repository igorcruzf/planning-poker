import { describe, expect, it } from 'vitest'
import { expectNoSeriousAxeViolations } from './axe'
import { renderWithUser } from './render'

describe('expectNoSeriousAxeViolations', () => {
  it('resolve para uma árvore acessível', async () => {
    const { container } = renderWithUser(
      <main>
        <h1>Mesa</h1>
        <button>Revelar</button>
      </main>,
    )

    await expect(expectNoSeriousAxeViolations(container)).resolves.toBeUndefined()
  })

  it('rejeita imagem sem alt citando a regra image-alt', async () => {
    const { container } = renderWithUser(<img src="x.png" />)

    await expect(expectNoSeriousAxeViolations(container)).rejects.toThrow('image-alt')
  })

  it('rejeita botão sem nome citando a regra button-name', async () => {
    const { container } = renderWithUser(<button></button>)

    await expect(expectNoSeriousAxeViolations(container)).rejects.toThrow('button-name')
  })

  it('resolve quando a regra violada é desligada', async () => {
    const { container } = renderWithUser(<img src="x.png" />)

    await expect(
      expectNoSeriousAxeViolations(container, { disableRules: ['image-alt'] }),
    ).resolves.toBeUndefined()
  })
})
