import { ArrowUp } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { glideTo } from '../glide'
import { useLang } from '../i18n/LanguageContext'

/**
 * The "back to top" button (.totop in index.css). The ring around it fills with the scroll progress of the page.
 *
 * - Computer: it shows once the first screen is passed and rides down the right edge as the page goes down.
 * - Phone: the text runs edge to edge, so it waits in the bottom corner and shows only when the visitor heads back up
 *   (40px or more) or reaches the end of the page.
 *
 * Position, progress and visibility are written straight to the DOM on scroll (one write per frame, no re-render).
 */
export function ToTop() {
  const { t } = useLang()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const ringRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    const button = buttonRef.current
    const ring = ringRef.current
    const first = document.getElementById('top')
    const header = document.querySelector('header')
    if (!button || !ring || !first || !header) return

    const phone = window.matchMedia('(max-width: 820px)')
    let lastY = window.scrollY
    let upward = 0 // px scrolled up since the last move down (phone)
    let frame = 0

    const place = () => {
      frame = 0
      const y = window.scrollY
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      const progress = Math.min(1, Math.max(0, y / max))
      const past = y > first.offsetHeight * 0.6
      const dy = y - lastY
      lastY = y
      ring.style.strokeDashoffset = (1 - progress).toFixed(3)

      if (phone.matches) {
        upward = dy < 0 ? Math.max(-400, upward + dy) : dy > 0 ? 0 : upward
        button.style.transform = ''
        button.toggleAttribute('data-show', past && (upward <= -40 || max - y < 24))
        return
      }
      button.toggleAttribute('data-show', past)
      const low = header.offsetHeight + 18
      const high = window.innerHeight - button.offsetHeight - 22
      button.style.transform = `translate3d(0,${Math.round(low + Math.max(0, high - low) * progress)}px,0)`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(place)
    }

    place()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return (
    <button
      ref={buttonRef}
      type="button"
      className="totop"
      aria-label={t.a11y.toTop}
      onClick={() => {
        glideTo(0)
        // the button hides at the top: hand the focus to the logo link instead of losing it
        document.querySelector<HTMLElement>('header a')?.focus({ preventScroll: true })
      }}
    >
      <span className="totop-disc">
        <svg className="totop-ring" viewBox="0 0 68 68" aria-hidden="true">
          <circle cx="34" cy="34" r="32.5" />
          <circle ref={ringRef} cx="34" cy="34" r="32.5" pathLength={1} />
        </svg>
        <ArrowUp strokeWidth={2.1} aria-hidden="true" />
      </span>
    </button>
  )
}
