import { useEffect } from 'react'

const STAGGER = 50 // ms between blocks that enter the viewport together
const MAX_STAGGER_STEPS = 4

/**
 * Soft scroll reveal for every `[data-reveal]` element: it fades in and rises a little the first time it enters the viewport.
 *
 * Progressive enhancement, so nothing is ever stuck invisible:
 * - only elements still below the fold when this runs are hidden (`data-revealed="wait"`); what is already on screen
 *   (or above it, after a scroll restore) is left alone, so the prerendered page never flickers;
 * - no JS, no IntersectionObserver or prefers-reduced-motion → the attribute is never set and everything stays visible;
 * - elements React remounts later (a language switch re-keys list items) have no attribute, so they are simply visible;
 * - once the animation ends the attribute is removed, so hover transforms (.lift) work as before.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const clear = (el: HTMLElement) => {
      el.removeAttribute('data-revealed')
      el.style.removeProperty('--reveal-delay')
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // blocks that enter in the same frame (cards of one row, a heading and its lead) appear one after another, top to bottom
        const entering = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .map((e) => e.target as HTMLElement)
        entering.forEach((el, i) => {
          observer.unobserve(el)
          el.style.setProperty('--reveal-delay', `${Math.min(i, MAX_STAGGER_STEPS) * STAGGER}ms`)
          el.setAttribute('data-revealed', 'in')
          el.addEventListener('animationend', () => clear(el), { once: true })
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )

    const fold = window.innerHeight
    const waiting: HTMLElement[] = []
    for (const el of document.querySelectorAll<HTMLElement>('[data-reveal]')) {
      if (el.getBoundingClientRect().top < fold) continue
      el.setAttribute('data-revealed', 'wait')
      observer.observe(el)
      waiting.push(el)
    }

    return () => {
      observer.disconnect()
      waiting.forEach(clear)
    }
  }, [])
}
