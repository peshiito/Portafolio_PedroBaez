/**
 * Capturas de la página en ambos temas y en mobile.
 * Uso: node scripts/screenshot.mjs <carpeta-de-salida>
 */
import { chromium } from 'playwright'

const out = process.argv[2] || '.'
const URL = 'http://localhost:5173/'
const errs = []
const b = await chromium.launch()

for (const theme of ['light', 'dark']) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage()
  p.on('console', (m) => m.type() === 'error' && errs.push(`[${theme}] ${m.text()}`))
  p.on('pageerror', (e) => errs.push(`[${theme}] PAGEERROR ${e.message}`))
  await p.addInitScript((t) => localStorage.setItem('pb-theme', t), theme)
  await p.goto(URL, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1200)
  await p.screenshot({ path: `${out}/hero-${theme}.png` })
  await p.evaluate(() =>
    document.querySelectorAll('.pb-reveal').forEach((e) => e.setAttribute('data-in', '')),
  )
  await p.waitForTimeout(500)
  await p.screenshot({ path: `${out}/full-${theme}.png`, fullPage: true })
  await ctx.close()
}

const m = await b.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
})
const mp = await m.newPage()
mp.on('pageerror', (e) => errs.push(`[mobile] PAGEERROR ${e.message}`))
await mp.goto(URL, { waitUntil: 'networkidle' })
await mp.waitForTimeout(1000)
await mp.evaluate(() =>
  document.querySelectorAll('.pb-reveal').forEach((e) => e.setAttribute('data-in', '')),
)
await mp.screenshot({ path: `${out}/mobile.png`, fullPage: true })

// ¿se va algo del ancho?
const overflow = await mp.evaluate(() => {
  const bad = []
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect()
    if (r.width > 0 && (r.right > window.innerWidth + 2 || r.left < -2)) {
      const cs = getComputedStyle(el)
      if (cs.position !== 'fixed' && cs.overflow !== 'hidden')
        bad.push(`${el.className || el.tagName} → ${Math.round(r.left)}..${Math.round(r.right)}`)
    }
  })
  return [...new Set(bad)].slice(0, 12)
})

await b.close()
console.log(errs.length ? 'ERRORES:\n' + errs.join('\n') : 'sin errores de consola')
if (overflow.length) console.log('\nDESBORDE HORIZONTAL EN MOBILE:\n' + overflow.join('\n'))
