import { chromium } from 'playwright'
const out = process.argv[2]
const SITES = [
  { slug: 'barberia', url: 'http://localhost:5304/' },
  { slug: 'gimnasio', url: 'http://localhost:5301/' },
  { slug: 'iphone', url: 'http://localhost:5302/' },
  { slug: 'veterinaria', url: 'http://localhost:5303/' },
  { slug: 'dashboard', url: 'http://localhost:5305/' },
  { slug: 'chatbot', url: 'http://localhost:5306/' },
]
const b = await chromium.launch()
for (const s of SITES) {
  try {
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
    const p = await ctx.newPage()
    await p.goto(s.url, { waitUntil: 'domcontentloaded', timeout: 30000 })
    await p.waitForTimeout(3500)
    // cierra banners de cookies si los hay
    for (const t of ['Aceptar', 'Acepto', 'Entendido', 'OK']) {
      const btn = p.getByRole('button', { name: t, exact: false })
      if (await btn.count()) { await btn.first().click().catch(() => {}); await p.waitForTimeout(400); break }
    }
    const alto = await p.evaluate(() => document.documentElement.scrollHeight)
    const paradas = [0, 0.22, 0.45, 0.68]
    for (let i = 0; i < paradas.length; i++) {
      await p.evaluate((y) => window.scrollTo(0, y), Math.round(alto * paradas[i]))
      await p.waitForTimeout(1400)
      await p.screenshot({ path: `${out}/${s.slug}-${i}.png`, timeout: 60000, animations: 'disabled' }).catch(() => {})
    }
    console.log(`${s.slug}: ${paradas.length} vistas (alto ${alto}px)`)
    await ctx.close()
  } catch (e) {
    console.log(`${s.slug}: ERROR ${e.message.slice(0, 80)}`)
  }
}
await b.close()
