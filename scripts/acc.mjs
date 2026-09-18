import { chromium } from 'playwright'
const out = process.argv[2] || '.'
const b = await chromium.launch()
for (const [theme, motion] of [['light', 'no-preference'], ['dark', 'no-preference'], ['light', 'reduce']]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: motion })
  const p = await ctx.newPage()
  await p.addInitScript((t) => localStorage.setItem('pb-theme', t), theme)
  await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await p.waitForTimeout(700)
  await p.locator('#servicios').scrollIntoViewIfNeeded()
  await p.waitForTimeout(500)
  await p.locator('.pb-svc__trigger').nth(2).click()
  await p.waitForTimeout(800)
  await p.locator('#servicios').screenshot({ path: `${out}/acc-${theme}-${motion}.png` })
  await ctx.close()
}
await b.close()
console.log('ok')
