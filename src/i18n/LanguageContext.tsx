import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { content, LANGS, type Content, type Lang } from './content'

interface Ctx {
  lang: Lang
  t: Content
  setLang: (l: Lang) => void
}

const LanguageContext = createContext<Ctx | null>(null)

function savedLang(): Lang | null {
  try {
    const saved = localStorage.getItem('lang') as Lang | null
    if (saved && LANGS.includes(saved)) return saved
  } catch {
    /* storage unavailable */
  }
  return null
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always start in Russian so the first render matches the prerendered HTML; a saved choice is applied right after.
  const [lang, setLang] = useState<Lang>('ru')

  useEffect(() => {
    const saved = savedLang()
    // intentional: localStorage is only readable after hydration, so the saved language is applied here
    // oxlint-disable-next-line react/set-state-in-effect
    if (saved && saved !== 'ru') setLang(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = content[lang].pageTitle
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* storage unavailable */
    }
  }, [lang])

  const value = useMemo(() => ({ lang, t: content[lang], setLang }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): Ctx {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
