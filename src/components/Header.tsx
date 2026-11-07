import { ChevronDown, Menu, X } from 'lucide-react'
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
            type="button"
            className="grid size-11 place-items-center rounded-full text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="fixed inset-x-0 top-[73px] bottom-0 overflow-auto bg-white px-4 py-6 lg:top-[89px] xl:hidden" aria-label="Mobile">
          <ul className="mx-auto flex max-w-3xl flex-col">
            {links.map(([href, label]) => (
              <li key={href} className="border-b border-line">
                <a href={href} onClick={() => setOpen(false)} className="flex min-h-14 items-center font-serif text-2xl">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              onReserve()
            }}
            className="btn mx-auto mt-6 block min-h-12 w-full max-w-3xl rounded-full bg-wine px-6 font-semibold text-white"
          >
            {t.register}
          </button>
        </nav>
      )}
    </header>
  )
}
