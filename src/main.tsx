import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './fonts.css'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n/LanguageContext.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
)

// The production build ships prerendered HTML (scripts/prerender.mjs): hydrate it. The dev server has an empty root.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
