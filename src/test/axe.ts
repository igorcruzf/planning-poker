import axe, { type Result } from 'axe-core'

const SERIOUS_IMPACTS = ['serious', 'critical']
const RULES_DISABLED_BY_DEFAULT = ['color-contrast', 'region']

interface AxeOptions {
  disableRules?: string[]
}

function describeViolation(violation: Result): string {
  const nodes = violation.nodes.map((node) => `    - ${node.target.join(' ')}`).join('\n')
  return `${violation.id} (${violation.impact}): ${violation.help}\n${nodes}`
}

export async function expectNoSeriousAxeViolations(
  container: Element,
  options: AxeOptions = {},
): Promise<void> {
  const rules = Object.fromEntries(
    [...RULES_DISABLED_BY_DEFAULT, ...(options.disableRules ?? [])].map((id) => [id, { enabled: false }]),
  )
  const { violations } = await axe.run(container, { rules })
  const serious = violations.filter((violation) => violation.impact && SERIOUS_IMPACTS.includes(violation.impact))
  if (serious.length > 0) {
    throw new Error(`Violações de acessibilidade:\n${serious.map(describeViolation).join('\n')}`)
  }
}
