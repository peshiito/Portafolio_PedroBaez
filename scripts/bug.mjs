import { chromium } from 'playwright'
const out = process.argv[2] || '.'
const b = await chromium.launch()
const errs = []
for (const theme of ['light', 'dark']) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage()
  p.on('pageerror', (e) => errs.push(`[${theme}] ${e.message}`))
  await p.addInitScript((t) => localStorage.setItem('pb-theme', t), theme)
  await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await p.waitForTimeout(700)
  await p.locator('#servicios').scrollIntoViewIfNeeded()
  await p.waitForTimeout(600)

  // abre tres servicios seguidos, como haría cualquiera
  for (const n of [2, 4, 0]) {
    await p.locator('.pb-svc__trigger').nth(n).click()
    await p.waitForTimeout(650)
  }

  const r = await p.evaluate(() => {
    const rows = [...document.querySelectorAll('.pb-svc__row')]
    return rows.map((row, i) => {
      const cs = getComputedStyle(row)
      const panel = row.querySelector('.pb-svc__panel')
      const blurb = row.querySelector('.pb-svc__blurb')
      const br = blurb.getBoundingClientRect()
      return {
        i,
        abierta: row.classList.contains('is-open'),
        opacidadFila: cs.opacity,
        altoPanel: Math.round(panel.getBoundingClientRect().height),
        textoVisible: br.height > 0 && getComputedStyle(blurb.parentElement).opacity !== '0',
      }
    })
  })
  console.log(`\n== ${theme} (abierto: SRV-01) ==`)
  r.forEach((x) =>
    console.log(
      `  SRV-0${x.i + 1} abierta=${x.abierta} opacidad=${x.opacidadFila} panel=${x.altoPanel}px textoVisible=${x.textoVisible}`,
    ),
  )
  await p.locator('#servicios').screenshot({ path: `${out}/fix-${theme}.png` })
  await ctx.close()
}
await b.close()
console.log(errs.length ? '\nERRORES:\n' + errs.join('\n') : '\nsin errores JS')
