// Prefixes public-folder URLs with the deploy base path (e.g. /Seminar-Company-Event/ on GitHub Pages).
const base = import.meta.env.BASE_URL

export const asset = (path: string) => base + path.replace(/^\//, '')

// For srcSet strings: "/a.webp 480w, /b.webp 846w"
export const assetSet = (set: string) => set.replace(/(^|,\s*)\//g, `$1${base}`)
