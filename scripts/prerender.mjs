// Build step: render the app to HTML and inline it into dist/index.html, so the page paints before the JS arrives.
// Runs after `vite build` (client) and `vite build --ssr src/entry-server.tsx --outDir dist-server`.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = path.resolve(import.meta.dirname, '..')
const base = process.env.BASE_PATH ?? '/'
const serverDir = path.join(root, 'dist-server')
const indexPath = path.join(root, 'dist', 'index.html')

const { render } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href)
const html = render()
const template = fs.readFileSync(indexPath, 'utf8')
const marker = '<div id="root"></div>'
if (!template.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`)

let out = template.replace(marker, `<div id="root">${html}</div>`)

// Inline the (small) stylesheet: one less render-blocking request before first paint.
out = out.replace(/<link rel="stylesheet"[^>]*href="(\/[^"]*assets\/[^"]+\.css)"[^>]*>/, (tag, href) => {
  const css = fs.readFileSync(path.join(root, 'dist', href.slice(base.length)), 'utf8')
  return `<style>${css}</style>`
})

fs.writeFileSync(indexPath, out)
fs.rmSync(serverDir, { recursive: true, force: true })
console.log(`prerender: inlined ${(html.length / 1024).toFixed(1)} KiB of HTML into dist/index.html`)
