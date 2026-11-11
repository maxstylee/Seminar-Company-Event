import { useLayoutEffect } from 'react'
import { useLang } from './i18n/LanguageContext'

/*
 * One section, one screen.
 *
 * The sections were drawn for a 1440 x 871 screen. On a shorter window (a laptop, a browser with toolbars) a section is
 * taller than the window, and a page turn would show half a section. So on a computer every section except the ones
 * marked `data-tall` (the speaker and the program, which are longer than a screen by design and are paged in steps by
 * pager.ts) is scaled down, as a whole, just enough to fit the window: text, photos and spacing together, the way a
 * slide is scaled. A section that already fits is left alone (scale 1). One that would have to shrink below MIN_SCALE
 * (a very short window) stays at full size instead, so text stays readable, and is paged in steps like the tall sections.
 *
 * The scale is written to the section as `--k`; index.css applies it as `zoom` and keeps the section exactly one
 * screen tall (min-height / --k). Phones and small windows are not touched.
 */

const MIN_SCALE = 0.66
/** Windows where a page is one screen at a time. Below it the page scrolls normally, with the CSS snap. */
const SLIDE_MODE = '(min-width: 900px) and (min-height: 520px)'

function clear(el: HTMLElement) {
  el.style.removeProperty('--k')
}

function fit(el: HTMLElement, screen: number) {
  // measure without the min-height, which would hide how tall the content really is
  el.style.minHeight = '0'
  let k = 1
  for (let i = 0; i < 8; i++) {
    el.style.setProperty('--k', String(k))
    const h = el.getBoundingClientRect().height
    if (h <= screen + 0.5 && (k >= 1 || h >= screen - 3)) break
    // text wraps differently at a new scale, so the height is not exactly proportional: repeat until it settles
    const next = Math.min(1, Math.max(0.3, k * (screen / h)))
    if (Math.abs(next - k) < 0.002) break
    k = next
  }
  el.style.removeProperty('min-height')
  // fits as it is, or would have to shrink until the text is hard to read: full size, and pager.ts steps through it
  if (k >= 0.999 || k < MIN_SCALE) clear(el)
  else el.style.setProperty('--k', k.toFixed(4))
}

function fitAll() {
  const slides = document.querySelectorAll<HTMLElement>('.slide:not([data-tall])')
  const header = document.querySelector('header')
  if (!header || !window.matchMedia(SLIDE_MODE).matches) {
    slides.forEach(clear)
    return
  }
  const screen = window.innerHeight - header.getBoundingClientRect().height
  slides.forEach((el) => fit(el, screen))
}

/** Keeps every short section one screen tall: on load, on resize, once the fonts are in, and after a language switch. */
export function useFitSlides() {
  const { lang } = useLang()

  useLayoutEffect(() => {
    let frame = 0
    const later = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fitAll)
    }
    fitAll() // before the first paint after a language switch
    window.addEventListener('resize', later)
    window.addEventListener('load', later)
    void document.fonts?.ready.then(later)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', later)
      window.removeEventListener('load', later)
    }
  }, [lang])
}
