/** Capturas por sección. Uso: node scripts/sections.mjs <salida> <ancho> [tema] */
import { chromium } from 'playwright'
const [out = '.', width = '1440', theme = 'light'] = process.argv.slice(2)
const w = Number(width)
const b = await chromium.launch()
const ctx = await b.newContext({
  viewport: { width: w, height: 900 },
  isMobile: w < 700,
  hasTouch: w < 700,
  deviceScaleFactor: w < 700 ? 2 : 1,
})
const p = await ctx.newPage()
await p.addInitScript((t) => localStorage.setItem('pb-theme', t), theme)
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await p.waitForTimeout(900)
await p.evaluate(() => document.querySelectorAll('.pb-reveal').forEach((e) => e.setAttribute('data-in', '')))
await p.waitForTimeout(400)
const tag = w < 700 ? 'm' : 'd'
for (const id of ['servicios', 'sobre-mi', 'proceso', 'trabajos', 'preguntas', 'contacto']) {
  const el = await p.$(`#${id}`)
  if (el) await el.screenshot({ path: `${out}/${tag}-${id}-${theme}.png` })
}
const hero = await p.$('#inicio')
if (hero) await hero.screenshot({ path: `${out}/${tag}-hero-${theme}.png` })
const foot = await p.$('.pb-footer')
if (foot) await foot.screenshot({ path: `${out}/${tag}-footer-${theme}.png` })
const tst = await p.$('.pb-tstm')
if (tst) await tst.screenshot({ path: `${out}/${tag}-testimonios-${theme}.png` })
await b.close()
console.log('listo', tag, theme)
