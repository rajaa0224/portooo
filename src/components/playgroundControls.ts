import { useEffect, useRef } from 'react'

export interface DriveControls {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  /** bumped to request a reset of the player position */
  resetRequest: number
}

export function createControls(): DriveControls {
  return { forward: false, backward: false, left: false, right: false, resetRequest: 0 }
}

const KEY_MAP: Record<string, keyof DriveControls> = {
  arrowup: 'forward',
  w: 'forward',
  arrowdown: 'backward',
  s: 'backward',
  arrowleft: 'left',
  a: 'left',
  arrowright: 'right',
  d: 'right',
}

/**
 * Shared, mutable control state read by the physics loop. Keyboard events
 * write to it here; on-screen touch buttons write to the same ref.
 */
export function useDriveControls() {
  const controls = useRef<DriveControls>(createControls())

  useEffect(() => {
    function onKey(down: boolean) {
      return (e: KeyboardEvent) => {
        const key = e.key.toLowerCase()
        const mapped = KEY_MAP[key]
        if (!mapped) return
        // Don't hijack typing in form fields.
        const t = e.target as HTMLElement | null
        if (t && /input|textarea|select/i.test(t.tagName)) return
        e.preventDefault()
        if (mapped !== 'resetRequest') controls.current[mapped] = down
        if (down && key === 'r') controls.current.resetRequest++
      }
    }
    const onDown = onKey(true)
    const onUp = onKey(false)
    const onReset = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'r') controls.current.resetRequest++
    }
    window.addEventListener('keydown', onDown)
    window.addEventListener('keyup', onUp)
    window.addEventListener('keydown', onReset)
    return () => {
      window.removeEventListener('keydown', onDown)
      window.removeEventListener('keyup', onUp)
      window.removeEventListener('keydown', onReset)
    }
  }, [])

  return controls
}
