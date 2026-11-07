// Set these in a .env file (see .env.example). Defaults are the values shown in the design.
export const CONTACT_EMAIL: string = import.meta.env.VITE_CONTACT_EMAIL || 'info@professional-derma.ru'
export const CONTACT_PHONE: string = import.meta.env.VITE_CONTACT_PHONE || '+7 (495) 123-45-67'

/** Optional JSON endpoint (Formspree, own API...). When empty, the form opens a prefilled email instead. */
export const FORM_ENDPOINT: string = import.meta.env.VITE_FORM_ENDPOINT ?? ''
