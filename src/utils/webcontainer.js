import { WebContainer } from '@webcontainer/api'

let instancePromise = null

/**
 * Returns a single shared WebContainer instance for the whole tab.
 * Boots it once; subsequent calls reuse the same instance.
 */
export async function getWebContainer() {
  if (!window.crossOriginIsolated) {
    throw new Error('Not cross-origin isolated — COOP/COEP headers missing on this origin.')
  }

  if (!instancePromise) {
    instancePromise = WebContainer.boot()
  }

  return instancePromise
}

/**
 * Tears down the current instance (call this if you need a hard reset,
 * e.g. switching between apps that need totally different node_modules).
 * WebContainers does NOT support multiple concurrent instances, so if you
 * want isolation between apps, you must teardown before booting again.
 */
export async function teardownWebContainer() {
  if (instancePromise) {
    const instance = await instancePromise
    instance.teardown()
    instancePromise = null
  }
}