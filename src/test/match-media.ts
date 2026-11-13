type ChangeListener = EventListenerOrEventListenerObject

interface MediaState {
  queries: Record<string, boolean>
  listeners: Map<string, Set<ChangeListener>>
}

let state: MediaState = { queries: {}, listeners: new Map() }

function listenersOf(query: string): Set<ChangeListener> {
  const existing = state.listeners.get(query)
  if (existing) return existing
  const created = new Set<ChangeListener>()
  state.listeners.set(query, created)
  return created
}

function notify(listener: ChangeListener, event: Event): void {
  if (typeof listener === 'function') listener(event)
  else listener.handleEvent(event)
}

function createMediaQueryList(query: string): MediaQueryList {
  const owner = state
  return {
    media: query,
    get matches() {
      return owner.queries[query] ?? false
    },
    onchange: null,
    addEventListener: (type: string, listener: ChangeListener) => {
      if (type === 'change') listenersOf(query).add(listener)
    },
    removeEventListener: (type: string, listener: ChangeListener) => {
      if (type === 'change') listenersOf(query).delete(listener)
    },
    addListener: (listener: ChangeListener) => listenersOf(query).add(listener),
    removeListener: (listener: ChangeListener) => listenersOf(query).delete(listener),
    dispatchEvent: () => false,
  } as MediaQueryList
}

export function mockMatchMedia(queries: Record<string, boolean>): void {
  state = { queries: { ...queries }, listeners: new Map() }
  window.matchMedia = createMediaQueryList
}

export function setMediaQuery(query: string, matches: boolean): void {
  state.queries[query] = matches
  const event = Object.assign(new Event('change'), { matches, media: query })
  for (const listener of [...listenersOf(query)]) notify(listener, event)
}
