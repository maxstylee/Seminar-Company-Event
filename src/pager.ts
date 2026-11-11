import { useEffect } from 'react'
import { glideTo } from './glide'

/*
 * Page by page: one turn of the mouse wheel (or one key press) moves the page to the next screen, never in between.
 *
 * - A section that fits one screen is one stop. A section taller than the screen is paged one screen at a time
 *   (starting on a block marked `data-page` where there is one), so nothing is skipped and the last page ends at the
 *   bottom of the section.
 * - The footer is the last stop (the bottom of the page).
 * - The wheel is handled for a mouse and a trackpad. Touch keeps its own scrolling, with the CSS snap of index.css.
 * - While a step runs, the wheel is ignored, and so is the inertia a trackpad keeps sending after a swipe, so one
 *   gesture is one page. Nothing is cached: stops are measured on every turn, so a language switch, a late image or a
 *   resize can not leave them stale.
 */

/** Longest and shortest time (ms) of one step; a shorter way takes less. */
const STEP_MS = 480
const MIN_STEP_MS = 260
/** Fastest pace (ms between steps) at which a spinning wheel keeps adding pages. */
const STEP_GAP = 130
/** Within this many px a stop counts as the current one. */
const TOLERANCE = 4
/** Wheel distance (px) that turns a trackpad swipe into a step; one notch of a mouse wheel is already 100. */
const SWIPE = 20
/** Space (px) kept between the header and a block that a page starts on, and between a section's content and its cut edge. */
const EDGE = 12
/** Pause (ms) with no wheel events that ends a gesture. */
const PAUSE = 80

/** Top of an element in px from the top of the page, without the transform of a running reveal animation (unlike getBoundingClientRect). */
function pageTop(el: HTMLElement): number {
  let top = 0
  for (let node: HTMLElement | null = el; node; node = node.offsetParent as HTMLElement | null) top += node.offsetTop
  return top
}

/** Every resting place of the page, in ascending order of px from the top. */
function pageStops(): number[] {
  const root = document.documentElement
  const hdr = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0
  const screen = window.innerHeight
  const max = Math.max(0, root.scrollHeight - screen)
  const stops: number[] = []

  for (const el of document.querySelectorAll<HTMLElement>('.slide, footer')) {
    const rect = el.getBoundingClientRect()
    const top = rect.top + window.scrollY
    if (el.tagName === 'FOOTER') {
      stops.push(max)
      continue
    }
    const view = screen - hdr // what one page shows
    const first = top - hdr // the section's top right under the header
    const last = top + rect.height - screen // its bottom at the bottom of the window
    // the bottom padding of the section may stay out of view: a page that ends there shows all the content
    const slack = Math.max(0, (parseFloat(getComputedStyle(el).paddingBottom) || 0) - EDGE)
    // fits one screen, give or take the padding and a few percent that are not worth a step of their own
    if (last - first <= slack + Math.max(TOLERANCE, view * 0.04)) {
      stops.push(first)
      continue
    }

    // A tall section is split into equal pages, none taller than a screen, the last one ending at the bottom of the
    // section. A page starts on a block marked data-page (a card, a list) instead of cutting it in the middle, when
    // such a block is close enough and moving the page there leaves no gap between it and its neighbours.
    const count = Math.ceil((last - first - slack - TOLERANCE) / view) + 1
    const pages = Array.from({ length: count }, (_, i) => first + ((last - first) * i) / (count - 1))
    const marks = Array.from(el.querySelectorAll<HTMLElement>('[data-page]'), (m) => pageTop(m) - hdr - EDGE)
    for (let i = 1; i < count; i++) {
      // a stop outside first..last would be pulled back by the CSS snap, and the page would never get past it
      const near = marks.filter((x) => x >= first && x <= last && Math.abs(x - pages[i]) <= view * 0.2)
      const m = near.sort((a, b) => Math.abs(a - pages[i]) - Math.abs(b - pages[i]))[0]
      if (m === undefined) continue
      const reachesNext = i === count - 1 ? last - m <= slack + TOLERANCE : pages[i + 1] - m <= view
      if (m - pages[i - 1] <= view && reachesNext) pages[i] = m
    }
    stops.push(...pages)
  }

  const sorted = stops.map((s) => Math.round(Math.min(max, Math.max(0, s)))).sort((a, b) => a - b)
  return sorted.filter((s, i) => i === 0 || s - sorted[i - 1] >= TOLERANCE)
}

/** A stop the page was sent to but did not stay at (the CSS snap pulled it back), and where it was sent from. */
let missed: { from: number; stop: number } | null = null

/** The stop after (dir 1) or before (dir -1) the current position, if any. */
function nextStop(dir: 1 | -1, base: number = window.scrollY): number | null {
  const y = window.scrollY
  // never send the page again to a stop it just failed to reach from here: it would be stuck on that spot for good
  const stops = pageStops().filter((s) => !(missed && s === missed.stop && Math.abs(y - missed.from) < TOLERANCE))
  if (dir > 0) return stops.find((s) => s > base + TOLERANCE) ?? null
  return stops.findLast((s) => s < base - TOLERANCE) ?? null
}

/** An element under the pointer that scrolls on its own (a list, a text area) keeps the wheel while it can still move. */
function scrollsInside(target: EventTarget | null, dy: number): boolean {
  for (let el = target instanceof Element ? target : null; el && el !== document.documentElement; el = el.parentElement) {
    if (el === document.body) break
    const overflowY = getComputedStyle(el).overflowY
    if ((overflowY === 'auto' || overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 1) {
      const atTop = el.scrollTop <= 0
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1
      if (dy < 0 ? !atTop : !atBottom) return true
    }
  }
  return false
}

/** Keys that page the way the wheel does. Space and the arrows keep their own job on a control that uses them. */
function keyDirection(e: KeyboardEvent): 1 | -1 | 'top' | 'bottom' | null {
  if (e.ctrlKey || e.altKey || e.metaKey) return null
  const t = e.target instanceof Element ? e.target : null
  if (t?.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"], [role="listbox"], [role="menu"]')) return null
  switch (e.key) {
    case 'PageDown':
      return 1
    case 'PageUp':
      return -1
    case 'ArrowDown':
      return 1
    case 'ArrowUp':
      return -1
    case ' ':
      if (t?.closest('button, a, summary, [role="button"]')) return null
      return e.shiftKey ? -1 : 1
    case 'Home':
      return 'top'
    case 'End':
      return 'bottom'
    default:
      return null
  }
}

export function usePager() {
  useEffect(() => {
    let busy = false // a step is gliding
    let goal = 0 // where the running step is heading
    let started = 0 // where the first step of the run began
    let generation = 0 // only the newest step may end the run
    let stepAt = 0 // when the newest step was started
    let armed = true // the next event may start a step (false while the tail of the last gesture is still coming in)
    let acc = 0 // wheel distance of the current gesture
    let lastAt = 0
    let lastAbs = 0

    /** Where the next step starts from: the stop the page is already heading to, so turns pile up instead of waiting. */
    const base = () => (busy ? goal : window.scrollY)

    // A step never waits for the one before it: it redirects the running glide to the next stop, so a fast spin of the
    // wheel keeps up with the hand, and a single turn still lands on exactly one page.
    const go = (target: number | null) => {
      if (target === null) return
      if (!busy) started = window.scrollY
      busy = true
      goal = target
      armed = false
      acc = 0
      stepAt = performance.now()
      const id = ++generation
      const duration = Math.min(STEP_MS, Math.max(MIN_STEP_MS, Math.abs(target - window.scrollY) * 0.6))
      glideTo(target, { interruptible: false, duration, ease: 'out' }).then(() => {
        if (id !== generation) return // redirected by a newer step
        busy = false
        // let the CSS snap settle, then see whether the page stayed where it was sent
        window.setTimeout(() => {
          const y = window.scrollY
          missed = Math.abs(y - target) > 2 * TOLERANCE && Math.abs(y - started) < TOLERANCE ? { from: started, stop: target } : null
        }, 120)
      })
    }

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented) return // pinch zoom
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return // a sideways swipe
      if (e.deltaY === 0 || scrollsInside(e.target, e.deltaY)) return
      e.preventDefault()

      // lines / pages (Firefox, some mice) to px
      const dy = e.deltaY * (e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? window.innerHeight : 1)
      const now = performance.now()
      const gap = now - lastAt
      const abs = Math.abs(dy)
      const prevAbs = lastAbs
      lastAt = now
      lastAbs = abs

      if (!armed) {
        // after a step: a pause, or a push as strong as the one before (a mouse wheel turned on), starts the next one;
        // the weakening inertia of a trackpad swipe does not
        if (gap > PAUSE || (abs >= 40 && abs >= prevAbs)) {
          armed = true
          acc = 0
        } else return
      }
      if (gap > 150 || Math.sign(dy) !== Math.sign(acc)) acc = 0
      acc += dy
      // turns that come faster than STEP_GAP are counted but wait for the next step, which keeps a trackpad flick to a page or two
      if (Math.abs(acc) >= SWIPE && now - stepAt >= STEP_GAP) go(nextStop(acc > 0 ? 1 : -1, base()))
    }

    const onKey = (e: KeyboardEvent) => {
      const dir = keyDirection(e)
      if (!dir) return
      e.preventDefault()
      if (e.repeat) return
      if (dir === 'top') go(0)
      else if (dir === 'bottom') go(document.documentElement.scrollHeight)
      else go(nextStop(dir, base()))
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [])
}
