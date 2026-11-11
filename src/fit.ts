import { useLayoutEffect } from 'react'
import { useLang } from './i18n/LanguageContext'
import { EDGE, pageTop } from './pager'

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

const MIN_SCALE = 0.5
/** Windows where a page is one screen at a time. Below it the page scrolls normally, with the CSS snap. */
const SLIDE_MODE = '(min-width: 900px) and (min-height: 520px)'

function clear(el: HTMLElement) {
  el.style.removeProperty('--k')
}

function fit(el: HTMLElement, screen: number) {
  // measure without the min-height, which would hide how tall the content really is
  el.style.minHeight = '0'
  const fits = (k: number) => {
    el.style.setProperty('--k', String(k))
    return el.getBoundingClientRect().height <= screen + 0.5
  }
  let k = 1
  if (!fits(1)) {
    // Text wraps differently at every scale, so the height does not shrink in proportion (a heading drops to one line
    // and the whole block jumps). Search for the largest scale that was measured to fit instead of computing one.
    let lo = 0.3
    let hi = 1
    for (let i = 0; i < 9; i++) {
      const mid = (lo + hi) / 2
      if (fits(mid)) lo = mid
      else hi = mid
    }
    k = Math.floor(lo * 10000) / 10000
  }
  el.style.removeProperty('min-height')
  // fits as it is, or would have to shrink until the text is hard to read: full size, and pager.ts steps through it
  if (k >= 0.999 || k < MIN_SCALE) clear(el)
  else el.style.setProperty('--k', k.toFixed(4))
}

/**
 * A long section with a sticky photo and a long text column (the speaker) is paged in steps, and a step must not cut a
 * line in two at its top or bottom edge. The text column is made of blocks that stay whole (`[data-block]`: a bullet,
 * the closing line). Going down the column, a block that would straddle the bottom edge of the page is pushed down by a
 * margin until it starts the next page (marked `[data-break]`, which is where pager.ts rests). Then `[data-fill]` at the
 * end of the column gets the space (or takes it away from the bottom padding) that lets the last page end exactly at the
 * bottom of the section, so the page does not slip below its first block.
 */
function fitSplit(active: boolean) {
  const hdr = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
  const view = window.innerHeight - hdr
  for (const sec of document.querySelectorAll<HTMLElement>('[data-split]')) {
    const fill = sec.querySelector<HTMLElement>('[data-fill]')
    const blocks = sec.querySelectorAll<HTMLElement>('[data-block]')
    blocks.forEach((b) => {
      b.style.removeProperty('margin-top')
      b.removeAttribute('data-break')
    })
    if (fill) {
      fill.style.height = '0px'
      fill.style.marginBottom = '0px'
    }
    if (!active || !fill) continue

    const top = pageTop(sec)
    let bottom = top + view // what the current page shows ends here
    let start = top - hdr // where the current page rests
    for (const b of blocks) {
      const h = b.offsetHeight
      const t = pageTop(b)
      if (t + h <= bottom || h > view) continue
      if (t < bottom) b.style.marginTop = `${(parseFloat(getComputedStyle(b).marginTop) || 0) + bottom - t}px` // straddles: push to the next page
      b.setAttribute('data-break', '')
      start = pageTop(b) - hdr - EDGE
      bottom = start + hdr + view
    }

    // the last page rests at `start`; the section must end exactly one screen below it
    const gap = start - (top + sec.offsetHeight - window.innerHeight)
    const padding = parseFloat(getComputedStyle(fill.parentElement ?? fill).paddingBottom) || 0
    if (gap >= 0) fill.style.height = `${Math.round(gap)}px`
    else fill.style.marginBottom = `-${Math.round(Math.min(-gap, Math.max(0, padding - 8)))}px`
  }
}

function fitAll() {
  const slides = document.querySelectorAll<HTMLElement>('.slide:not([data-tall])')
  const header = document.querySelector('header')
  const active = !!header && window.matchMedia(SLIDE_MODE).matches
  if (!header || !active) {
    slides.forEach(clear)
  } else {
    const screen = window.innerHeight - header.getBoundingClientRect().height
    slides.forEach((el) => fit(el, screen))
  }
  fitSplit(active)
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
