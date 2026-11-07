import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'
import { LanguageProvider } from './i18n/LanguageContext.tsx'

/** Used at build time only (scripts/prerender.mjs) to put the page's HTML into dist/index.html. */
export function render(): string {
  return renderToString(
    <StrictMode>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </StrictMode>,
  )
}
