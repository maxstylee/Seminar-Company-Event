import { ChevronDown, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { LANGS } from '../i18n/content'
import { useLang } from '../i18n/LanguageContext'

function LangSwitch() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${lang.toUpperCase()}, language`}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 items-center gap-[7px] px-1 text-[16px] font-medium uppercase text-ink"
      >
        {lang}
        <ChevronDown size={16} strokeWidth={2.2} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul role="listbox" aria-label="Language" className="card-shadow absolute right-0 top-full z-10 min-w-20 overflow-hidden rounded-lg bg-white py-1">
          {LANGS.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === lang}
                onClick={() => {
                  setLang(l)
                  setOpen(false)
                }}
                className={`block min-h-10 w-full px-4 text-left text-sm font-medium uppercase hover:bg-wine-soft ${l === lang ? 'text-wine' : 'text-ink'}`}
              >
                {l}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function Header({ onReserve }: { onReserve: () => void }) {
  const { t } = useLang()
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

  const links = [
    ['#benefits', t.nav.about],
    ['#program', t.nav.program],
    ['#speaker', t.nav.speaker],
    ['#audience', t.nav.audience],
    ['#contacts', t.nav.contacts],
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-[#e6e6e6] bg-white">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center px-4 sm:px-6 lg:h-[88px] lg:pl-[60px] lg:pr-[48px]">
        <a href="#top" aria-label="Professional derma series" className="shrink-0">
          <img src="/images/logo.webp" alt="Professional derma series" width={249} height={60} className="h-[46px] w-auto lg:h-[60px]" />
        </a>

        <nav className="ml-[91px] hidden items-center gap-[37px] text-[15.5px] text-ink xl:flex" aria-label="Main">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="underline-offset-8 hover:text-wine hover:underline">
              {label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:gap-[31px]">
          <LangSwitch />
          <button
            type="button"
            onClick={onReserve}
            className="btn hidden h-[47px] w-[227px] rounded-full bg-wine text-[15px] font-medium text-white shadow-[0_6px_14px_-6px_rgba(138,14,38,0.55)] sm:block"
          >
            {t.register}
          </button>
          <button
            ref={toggleRef}
            type="button"
            className={`burger grid size-11 place-items-center rounded-full transition-colors duration-200 xl:hidden ${
              open ? 'bg-wine-soft text-wine' : 'text-ink hover:bg-wine-soft hover:text-wine'
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menu"
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
        <nav aria-label="Mobile" className="card-shadow mt-2 overflow-hidden rounded-2xl border border-line bg-white p-2">
          <ul className="flex flex-col">
            {links.map(([href, label], i) => (
              <li key={href} className="menu-item" style={{ '--i': i } as React.CSSProperties}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="group flex min-h-12 items-center justify-between rounded-xl px-4 font-serif text-[18px] text-ink transition-colors duration-200 hover:bg-wine-soft hover:text-wine focus-visible:bg-wine-soft focus-visible:text-wine focus-visible:outline-none"
                >
                  {label}
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
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                onReserve()
              }}
              className="btn block min-h-12 w-full rounded-full bg-wine px-6 text-[15px] font-medium text-white shadow-[0_6px_14px_-6px_rgba(138,14,38,0.55)]"
            >
              {t.register}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
