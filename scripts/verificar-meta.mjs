/** Lee los meta como los leen WhatsApp, las redes y Google. */
import { chromium } from 'playwright'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1200, height: 800 } })
const p = await ctx.newPage()

const leer = async (ruta, etiqueta) => {
  await p.goto('http://localhost:5173' + ruta, { waitUntil: 'networkidle' })
  await p.waitForTimeout(1200)
  const r = await p.evaluate(() => {
    const m = (s) => document.head.querySelector(s)?.getAttribute('content') || '—'
    const ld = document.querySelector('script[type="application/ld+json"]')
    let tipoLd = '—'
    try { tipoLd = JSON.parse(ld?.textContent || '{}')['@type'] || '—' } catch { tipoLd = 'JSON INVÁLIDO' }
    return {
      titulo: document.title,
      descripcion: m('meta[name="description"]'),
      ogTitulo: m('meta[property="og:title"]'),
      ogImagen: m('meta[property="og:image"]'),
      ogUrl: m('meta[property="og:url"]'),
      ogTipo: m('meta[property="og:type"]'),
      twCard: m('meta[name="twitter:card"]'),
      canonical: document.head.querySelector('link[rel=canonical]')?.href || '—',
      datosEstructurados: tipoLd,
    }
  })
  console.log(`\n===== ${etiqueta} =====`)
  Object.entries(r).forEach(([k, v]) => console.log('  ' + k.padEnd(19) + String(v).slice(0, 78)))
}

await leer('/', 'HOME')
await leer('/proyectos/oficio-barberia', 'PROYECTO: Oficio Barbería')
await leer('/proyectos/hardstore-asesor', 'PROYECTO: HardStore')
await b.close()
