import { chromium } from 'playwright'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const axePath = require.resolve('axe-core')
const fs = await import('fs')
const axeSource = fs.readFileSync(axePath, 'utf8')

const b = await chromium.launch()
for (const theme of ['light', 'dark']) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage()
  await p.addInitScript((t) => localStorage.setItem('pb-theme', t), theme)
  await p.goto(process.env.PB_URL || 'http://localhost:5173/', { waitUntil: 'networkidle' })
  await p.waitForTimeout(900)
  await p.evaluate(() => document.querySelectorAll('.pb-reveal').forEach((e) => e.setAttribute('data-in', '')))
  await p.waitForTimeout(1400)
  await p.addScriptTag({ content: axeSource })
  const res = await p.evaluate(async () => {
    const r = await window.axe.run(document, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
    })
    return r.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      help: v.help,
      n: v.nodes.length,
      ejemplos: v.nodes.slice(0, 3).map((n) => n.html.slice(0, 120) + ' || ' + (n.any[0]?.message || '').slice(0, 160)),
    }))
  })
  console.log(`\n===== ${theme.toUpperCase()} =====`)
  if (!res.length) console.log('sin violaciones WCAG A/AA')
  res.forEach((v) => {
    console.log(`\n[${v.impact}] ${v.id} — ${v.help} (${v.n})`)
    v.ejemplos.forEach((e) => console.log('   ' + e))
  })
  await ctx.close()
}
await b.close()
