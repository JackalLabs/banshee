import type { TPossibleTxEvents } from '@/types'
import type { IIbcBundle, IListener } from '@/interfaces'

const oneSecondMs = 1000

/**
 * Notify that function is deprecated and should no longer be used.
 * @param {string} thing - Name of deprecated item. Example: "[ParentContext] functionName()".
 * @param {string} version - First version with deprecated item. Example: "v1.1.1".
 * @param {{aggressive?: boolean, replacement?: string}} opts
 * - Aggressive: TRUE to trigger alert.
 * - Replacement: the function name that should be used instead. Example: "replacementFunction()".
 */
export function deprecated(
  thing: string,
  version: string,
  opts?: { aggressive?: boolean; replacement?: string },
) {
  let notice = `SAMPLE | ${thing} is deprecated as of: ${version}`
  if (opts?.replacement) {
    notice += ` - Please use ${opts.replacement} instead`
  }
  console.error(notice)
  if (opts?.aggressive) {
    alert(notice)
  }
}

/**
 * Set a timer.
 * @param {number} seconds - Duration of timer in ms.
 * @returns {Promise<void>}
 */
export async function setDelay(seconds: number): Promise<void> {
  const delay = secondToMS(Number(seconds))
  await new Promise((resolve) => setTimeout(resolve, delay))
}

/**
 * Convert number of seconds to number of milliseconds.
 * @param {number} seconds - Number of seconds to convert.
 * @returns {number}
 */
export function secondToMS(seconds: number): number {
  return seconds * oneSecondMs
}

/**
 * Build Listener instance for attaching to websocket.
 * @param {IIbcBundle<T>} bundle
 * @returns {IListener<TPossibleTxEvents>}
 */
export function makeListener<T extends TPossibleTxEvents>(
  bundle: IIbcBundle<T>,
): IListener<TPossibleTxEvents> {
  return {
    next(value: T): void {
      bundle.feed.push(value)
    },
    error(err: any): void {
      console.error(`Stream ${bundle.chainId} gave me an error:`, err)
    },
    complete(): void {
      console.log(`Stream ${bundle.chainId} told me it is done.`)
    },
  }
}
