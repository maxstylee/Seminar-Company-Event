// Builds the site's self-hosted fonts: ONE woff2 per face holding only the characters the site can show
// (Latin + Cyrillic text, digits, punctuation). Step 1: the Google Fonts `text=` API returns one merged
// Latin+Cyrillic file per face. Step 2: harfbuzz (subset-font) trims it further and limits the weight axis.
// Run once and commit the files; the live site never contacts Google.   npm run fonts
// Re-run after adding text with characters outside CHARS.
import fs from 'node:fs'
import path from 'node:path'
import subsetFont from 'subset-font'

const root = path.resolve(import.meta.dirname, '..')
const out = path.join(root, 'src', 'assets', 'fonts')
fs.mkdirSync(out, { recursive: true })

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => String.fromCodePoint(a + i)).join('')
const CHARS =
  range(0x20, 0x7e) + ' ©«®·»' + range(0x2013, 0x2014) + range(0x2018, 0x201e) + '…' +
  'Ё' + range(0x0410, 0x044f) + 'ё№'

const faces = [
  ['inter.woff2', 'Inter:wght@400..700', { wght: { min: 400, max: 700 } }],
  ['playfair-display.woff2', 'Playfair+Display:wght@400..600', { wght: { min: 400, max: 600 } }],
  ['pt-serif-400.woff2', 'PT+Serif:wght@400'],
  ['pt-serif-700.woff2', 'PT+Serif:wght@700'],
]
// a current browser UA so the API answers with woff2
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

let total = 0
for (const [file, family, variationAxes] of faces) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family}&text=${encodeURIComponent(CHARS)}&display=swap`
  const css = await (await fetch(cssUrl, { headers: { 'User-Agent': UA } })).text()
  const urls = [...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1])
  if (urls.length !== 1) throw new Error(`${family}: expected 1 font file, got ${urls.length}\n${css}`)
  const raw = Buffer.from(await (await fetch(urls[0], { headers: { 'User-Agent': UA } })).arrayBuffer())
  if (raw.subarray(0, 4).toString() !== 'wOF2') throw new Error(`${family}: not a woff2 file`)
  const buf = await subsetFont(raw, CHARS, { targetFormat: 'woff2', ...(variationAxes ? { variationAxes } : {}) })
  fs.writeFileSync(path.join(out, file), buf)
  total += buf.length
  console.log(file.padEnd(24), `${(buf.length / 1024).toFixed(1)} KiB`)
}
console.log(`total ${(total / 1024).toFixed(1)} KiB in ${faces.length} files`)
