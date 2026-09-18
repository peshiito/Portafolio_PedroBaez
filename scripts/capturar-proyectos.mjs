import { chromium } from 'playwright'
const out = process.argv[2]
const only = process.argv[3]
const SITES = [
  { slug: 'gimnasio', url: 'http://localhost:5301/' },
  { slug: 'iphone', url: 'http://localhost:5302/' },
  { slug: 'veterinaria', url: 'http://localhost:5303/' },
  { slug: 'barberia', url: 'http://localhost:5304/' },
].filter((s) => !only || s.slug === only)

const b = await chromium.launch()
for (const s of SITES) {
  console.log(`\n=== ${s.slug} ===`)
  const errs = []
  try {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
    const p = await ctx.newPage()
    p.on('pageerror', (e) => errs.push(e.message.slice(0, 120)))
    await p.goto(s.url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await p.waitForTimeout(4000)

    const info = await p.evaluate(() => ({
      titulo: document.title,
      h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim()).slice(0, 3),
      h2: [...document.querySelectorAll('h2')].map((h) => h.textContent.trim()).slice(0, 12),
      nav: [...new Set([...document.querySelectorAll('nav a, header a')].map((a) => a.textContent.trim()).filter(Boolean))].slice(0, 12),
      alto: document.documentElement.scrollHeight,
    }))
    console.log(JSON.stringify(info, null, 1))

    const shot = (opts) => p.screenshot({ timeout: 60000, animations: 'disabled', ...opts }).catch((e) => console.log('  (falló captura)', e.message.slice(0, 60)))
    await shot({ path: `${out}/${s.slug}-hero.png` })
    await shot({ path: `${out}/${s.slug}-full.png`, fullPage: true })
    await ctx.close()

    const m = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
    const mp = await m.newPage()
    await mp.goto(s.url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await mp.waitForTimeout(3000)
    await mp.screenshot({ path: `${out}/${s.slug}-mobile.png`, timeout: 60000, animations: 'disabled' }).catch(() => console.log('  (falló mobile)'))
    await m.close()
    if (errs.length) console.log('errores JS:', [...new Set(errs)].slice(0, 3))
  } catch (e) {
    console.log('  ERROR:', e.message.slice(0, 140))
  }
}
await b.close()
