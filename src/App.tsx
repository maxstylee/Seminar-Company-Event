import { lazy, Suspense, useCallback, useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Audience, Benefits, Brands, CtaBand, Program, Speaker } from './components/Sections'

// The form is not needed for the first paint: load its code on first open.
const RegistrationModal = lazy(() => import('./components/RegistrationModal').then((m) => ({ default: m.RegistrationModal })))

export default function App() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const openModal = useCallback(() => {
    setMounted(true)
    setOpen(true)
  }, [])
  const closeModal = useCallback(() => setOpen(false), [])

  return (
    <>
      <a href="#benefits" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
        Skip
      </a>
      <Header onReserve={openModal} />
      <main>
        <Hero onReserve={openModal} />
        <Benefits />
        <Speaker />
        <Program onReserve={openModal} />
        <Audience />
        <Brands />
        <CtaBand onReserve={openModal} />
      </main>
      <Footer />
      {mounted && (
        <Suspense fallback={null}>
          <RegistrationModal open={open} onClose={closeModal} />
        </Suspense>
      )}
    </>
  )
}
