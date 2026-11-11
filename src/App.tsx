import { Footer } from './components/Footer'
import { useFitSlides } from './fit'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { RegistrationSection } from './components/RegistrationSection'
import { Audience, Benefits, Brands, Program, Speaker } from './components/Sections'
import { ToTop } from './components/ToTop'
import { useGlideLinks } from './glide'
import { useLang } from './i18n/LanguageContext'
import { usePager } from './pager'
import { useScrollReveal } from './useScrollReveal'

export default function App() {
  const { t } = useLang()
  useScrollReveal()
  useGlideLinks()
  useFitSlides()
  usePager()
  return (
    <>
      <a href="#benefits" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        {t.a11y.skip}
      </a>
      <Header />
      <main data-lang-fade>
        <Hero />
        <Benefits />
        <Speaker />
        <Program />
        <Audience />
        <Brands />
        {/* always on the page, right above the footer: every register / reserve button scrolls here */}
        <RegistrationSection />
      </main>
      <Footer />
      <ToTop />
    </>
  )
}
