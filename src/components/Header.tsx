import { ArrowRight, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { content, LANGS, type Content, type Lang } from '../i18n/content'
import { useLang } from '../i18n/LanguageContext'

const LANG_NAMES: Record<Lang, string> = { ru: 'Русский', ka: 'ქართული', en: 'English' }

/**
 * The current translation, stacked in one grid cell with the other (invisible) translations, so the element is always
 * as wide as its longest translation and switching language never moves the header.
 */
function StableLabel({ pick, className = '' }: { pick: (c: Content) => string; className?: string }) {
  const { lang } = useLang()
  return (
    <span className="inline-grid">
      {LANGS.map((l) => (
        <span key={l} aria-hidden={l !== lang || undefined} className={`col-start-1 row-start-1 whitespace-nowrap ${l === lang ? className : 'invisible'}`}>
          {pick(content[l])}
        </span>
      ))}
    </span>
  )
}

/** Short opacity fade on the translated text after a language switch (opacity only, no layout properties). */
function fadeTranslatedText() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  document.querySelectorAll<HTMLElement>('[data-lang-fade]').forEach((el) => {
    el.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 200, easing: 'ease-out' })
  })
}

/** Page sections in the order they appear, top to bottom. `register` has no nav link: while it is in view, no link is active. */
const SECTION_IDS = ['benefits', 'speaker', 'program', 'audience', 'brand', 'register', 'contacts'] as const
type SectionId = (typeof SECTION_IDS)[number]

/** The section being read: the last one whose top has passed 40% of the viewport height. */
function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let current: SectionId | null = null
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      // the footer is shorter than the viewport: at the very bottom of the page it is the active one
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) current = 'contacts'
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return active
}

function LangSwitch() {
  const { lang, setLang, t } = useLang()
  return (
    <div role="group" aria-label={t.a11y.language} className="flex items-center gap-0.5 rounded-[12px] border border-line bg-white p-[3px]">
      {LANGS.map((l) => {
        const selected = l === lang
        return (
          <button
            key={l}
            type="button"
            lang={l}
            aria-pressed={selected}
            aria-label={LANG_NAMES[l]}
            onClick={() => {
              if (selected) return
              fadeTranslatedText()
              setLang(l)
            }}
            className={`grid h-10 min-w-11 place-items-center rounded-[9px] px-2 text-[14px] font-semibold uppercase transition-colors duration-200 ${
              selected
                ? 'bg-[linear-gradient(180deg,#ab2a40_0%,#8a0e26_100%)] text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_4px_10px_-4px_rgb(138_14_38/0.6)]'
                : 'text-ink hover:bg-wine-soft hover:text-wine'
            }`}
          >
            {l}
          </button>
        )
      })}
    </div>
  )
}

export function Header() {
  const { t } = useLang()
  const active = useActiveSection()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  // close on outside click, Escape, or when the desktop nav takes over
  useEffect(() => {
    if (!open) return
    const outside = (e: MouseEvent) => {
      const target = e.target as Node
      if (!menuRef.current?.contains(target) && !toggleRef.current?.contains(target)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    const wide = window.matchMedia('(min-width: 1280px)')
    const onWide = () => wide.matches && setOpen(false)
    document.addEventListener('mousedown', outside)
    document.addEventListener('keydown', esc)
    wide.addEventListener('change', onWide)
    return () => {
      document.removeEventListener('mousedown', outside)
      document.removeEventListener('keydown', esc)
      wide.removeEventListener('change', onWide)
    }
  }, [open])

  // same order as the sections on the page, so every link scrolls further down than the one before it
  const links: [SectionId, (c: Content) => string][] = [
    ['benefits', (c) => c.nav.about],
    ['speaker', (c) => c.nav.speaker],
    ['program', (c) => c.nav.program],
    ['audience', (c) => c.nav.audience],
    ['brand', (c) => c.nav.brand],
    ['contacts', (c) => c.nav.contacts],
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-[#e6e6e6] bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center px-4 sm:px-6 lg:h-[88px] lg:pl-[60px] lg:pr-[48px]">
        <a href="#top" aria-label="Professional derma series" className="shrink-0">
          <img src="/images/logo-ds.png" alt="Professional derma series" width={184} height={220} className="h-[54px] w-auto lg:h-[68px]" />
        </a>

        {/* each link is as wide as its longest translation, so the links keep their positions on a language switch */}
        <nav data-lang-fade className="ml-10 hidden items-center gap-6 text-[15px] text-ink xl:flex 2xl:ml-[72px] 2xl:gap-[34px] 2xl:text-[15.5px]" aria-label={t.a11y.mainNav}>
          {links.map(([id, pick]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'location' : undefined}
              className={`nav-link py-2 transition-colors duration-200 hover:text-wine ${active === id ? 'text-wine' : ''}`}
            >
              <StableLabel pick={pick} className="nav-text" />
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 sm:gap-4 lg:gap-6">
          <LangSwitch />
          <a href="#register" data-lang-fade className="btn-3d hidden h-[50px] px-6 text-[15px] sm:inline-flex">
            <StableLabel pick={(c) => c.register} className="justify-self-center" />
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={`burger grid size-11 place-items-center rounded-full transition-colors duration-200 xl:hidden ${
              open ? 'bg-wine-soft text-wine' : 'text-ink hover:bg-wine-soft hover:text-wine'
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t.a11y.menu}
            data-open={open || undefined}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true" className="burger-lines">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* dropdown: only as tall as its content, anchored under the header */}
      <div
        ref={menuRef}
        id="mobile-menu"
        data-open={open || undefined}
        inert={!open}
        className="menu-panel absolute top-full right-3 left-3 z-40 sm:right-6 sm:left-auto sm:w-[340px] xl:hidden"
      >
        <nav aria-label={t.a11y.mobileNav} data-lang-fade className="card-shadow mt-2 overflow-hidden rounded-2xl border border-line bg-white p-2">
          <ul className="flex flex-col">
            {links.map(([id, pick], i) => (
              <li key={id} className="menu-item" style={{ '--i': i } as React.CSSProperties}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'location' : undefined}
                  onClick={() => setOpen(false)}
                  className={`group flex min-h-12 items-center justify-between rounded-xl px-4 font-serif text-[18px] transition-colors duration-200 hover:bg-wine-soft hover:text-wine focus-visible:bg-wine-soft focus-visible:text-wine focus-visible:outline-none ${
                    active === id ? 'bg-wine-soft text-wine' : 'text-ink'
                  }`}
                >
                  <span className="min-w-0 truncate">{pick(t)}</span>
                  <ChevronRight
                    size={18}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="-translate-x-1 text-wine opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="menu-item mt-1 border-t border-line px-2 pt-3 pb-1 sm:hidden" style={{ '--i': links.length } as React.CSSProperties}>
            <a href="#register" onClick={() => setOpen(false)} className="btn-3d min-h-12 w-full px-6 text-[15px]">
              {t.register}
              <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
