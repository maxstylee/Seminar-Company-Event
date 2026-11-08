import { useEffect, useRef } from 'react'

const DURATION = 1500 // ms, all numbers start and finish together
const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

/** "3000" -> "3 000" (no-break space, so the number never wraps). */
const formatNumber = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

/**
 * Three stat cards whose numbers count up 0+ → value+ in 1.5 s, once, when the block is 30% in view.
 *
 * The digits are written straight into the DOM (textContent) on every frame instead of through React state:
 * - a browser's auto-translate swaps React's text nodes for its own, so React state updates would land on detached
 *   nodes and the number would stay at 0; textContent replaces whatever is inside the span;
 * - it runs under prefers-reduced-motion too: only the digits change, nothing moves.
 */
export function CountUpStats({ items }: { items: { value: number; label: string }[] }) {
  const ref = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = ref.current
    if (!list) return
    const counters = [...list.querySelectorAll<HTMLElement>('[data-count]')]
    const paint = (progress: number) => {
      for (const el of counters) el.textContent = `${formatNumber(Math.round(Number(el.dataset.count) * progress))}+`
    }

    let frame = 0
    const run = () => {
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min((now - start) / DURATION, 1)
        paint(easeOutCubic(t))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        observer.disconnect()
        run()
      },
      { threshold: 0.3 },
    )
    observer.observe(list)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <ul ref={ref} className="grid grid-cols-3 gap-2.5 sm:gap-4">
      {items.map(({ value, label }) => {
        const final = `${formatNumber(value)}+`
        return (
          <li key={value} className="card-shadow flex min-w-0 flex-col items-center rounded-[14px] border border-[#f0e9ea] bg-white px-2 py-4 text-center sm:px-4 sm:py-5">
            <span className="font-display text-[28px] leading-none font-semibold text-wine-text tabular-nums sm:text-[40px] xl:text-[46px]">
              {/* visible digits: written by the effect above, never re-rendered by React; screen readers get the final value */}
              <span data-count={value} aria-hidden="true" translate="no" className="notranslate inline-block text-center" style={{ minWidth: `${final.length}ch` }}>
                0+
              </span>
              <span className="sr-only">{final}</span>
            </span>
            <span className="mt-2 text-[12px] leading-[1.3] text-muted sm:text-[14px]">{label}</span>
          </li>
        )
      })}
    </ul>
  )
}
