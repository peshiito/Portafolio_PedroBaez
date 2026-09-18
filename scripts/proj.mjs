import { chromium } from 'playwright'
const out = process.argv[2] || '.'
const b = await chromium.launch()
const errs = []
for (const [w, tag] of [[1440, 'd'], [390, 'm']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, isMobile: w < 700, hasTouch: w < 700 })
  const p = await ctx.newPage()
  p.on('pageerror', (e) => errs.push(`[${tag}] ${e.message}`))
  p.on('console', (m) => m.type() === 'error' && errs.push(`[${tag}] ${m.text()}`))
  await p.goto('http://localhost:5173/proyectos/oficio-barberia', { waitUntil: 'networkidle' })
  await p.waitForTimeout(900)
  await p.evaluate(() => document.querySelectorAll('.pb-reveal').forEach((e) => e.setAttribute('data-in', '')))
  // recorre la página para que las imágenes en diferido se carguen
  await p.evaluate(async () => {
    const alto = document.documentElement.scrollHeight
    for (let y = 0; y < alto; y += window.innerHeight * 0.8) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 220))
    }
    window.scrollTo(0, 0)
  })
  await p.waitForTimeout(1500)
  await p.screenshot({ path: `${out}/proj-${tag}.png`, fullPage: true })
  if (tag === 'd') await p.screenshot({ path: `${out}/proj-top.png` })
  await ctx.close()
}
await b.close()
console.log(errs.length ? errs.join('\n') : 'sin errores')
