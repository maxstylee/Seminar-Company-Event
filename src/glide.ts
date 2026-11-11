import { useEffect } from 'react'

/** Bumped by every glide: a glide that is no longer the latest one stops on its next frame. */
let run = 0

interface GlideOptions {
  /** A wheel turn or a touch stops the glide and hands the scroll back (default). The page-by-page scroll turns this off. */
  interruptible?: boolean
  /** Fixed duration in ms; by default it grows with the distance. */
  duration?: number
  /** 'out' starts fast and slows down at the end: it reacts at once and can be restarted from the middle without a jolt. */
  ease?: 'inOut' | 'out'
}

/**
 * Eased scroll to `top` (px from the top of the page), clamped to the page. The promise resolves when the glide ends
 * (arrived, interrupted by the visitor or replaced by a newer glide).
 *
 * The page snaps to its sections (`scroll-snap-type` on <html>, index.css). Snapping is paused while the glide runs,
 * otherwise the browser pulls every frame back to the nearest section; it comes back right after, and the targets used
 * here are snap positions, so nothing moves when it does.
 */
export function glideTo(top: number, { interruptible = true, duration, ease = 'inOut' }: GlideOptions = {}): Promise<void> {
  const root = document.documentElement
  const start = window.scrollY
  const target = Math.round(Math.max(0, Math.min(top, root.scrollHeight - window.innerHeight)))
  const dist = target - start
  const id = ++run
  const jump = (y: number) => window.scrollTo({ top: y, behavior: 'instant' }) // 'instant' overrides the CSS smooth scroll

  if (Math.abs(dist) < 2) {
    root.style.scrollSnapType = ''
    return Promise.resolve()
  }
  root.style.scrollSnapType = 'none'

  return new Promise((resolve) => {
    let stopped = false
    const stop = () => {
      stopped = true
    }
    const finish = () => {
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchstart', stop)
      // a newer glide keeps snapping off and turns it back on itself
      window.setTimeout(() => {
        if (run === id) root.style.scrollSnapType = ''
      }, 60)
      resolve()
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      jump(target)
      finish()
      return
    }

    if (interruptible) {
      window.addEventListener('wheel', stop, { passive: true })
      window.addEventListener('touchstart', stop, { passive: true })
    }
    const ms = duration ?? Math.min(1100, Math.max(450, Math.abs(dist) * 0.35))
    let t0: number | null = null
    const step = (now: number) => {
      if (stopped || run !== id) return finish()
      t0 ??= now
      const p = Math.min(1, (now - t0) / ms)
      const eased = ease === 'out' ? 1 - Math.pow(1 - p, 3) : p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2
      jump(start + dist * eased)
      if (p < 1) requestAnimationFrame(step)
      else finish()
    }
    requestAnimationFrame(step)
  })
}

/** Where the page rests for an in-page link: the section's top right under the sticky header (its snap position). */
function restingTop(id: string, target: HTMLElement): number {
  if (id === 'top') return 0
  // the footer is shorter than a screen: it rests at the very bottom of the page
  if (id === 'contacts') return document.documentElement.scrollHeight
  const headerHeight = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
  return target.getBoundingClientRect().top + window.scrollY - headerHeight
}

/**
 * Every in-page link (`<a href="#id">`) glides to its section instead of jumping. The address bar and the keyboard
 * focus still move to the section, as they do with a plain link.
 */
export function useGlideLinks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = e.target instanceof Element ? e.target.closest('a[href^="#"]') : null
      const id = link?.getAttribute('href')?.slice(1)
      const target = id ? document.getElementById(id) : null
      if (!id || !target) return
      e.preventDefault()
      glideTo(restingTop(id, target))
      if (window.location.hash !== `#${id}`) window.history.pushState(null, '', `#${id}`)
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
}
