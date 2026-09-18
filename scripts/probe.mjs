import { chromium } from 'playwright'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
const p = await ctx.newPage()
await p.addInitScript(() => localStorage.setItem('pb-theme', 'dark'))
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await p.waitForTimeout(800)
const info = await p.evaluate(() => {
  const f = document.querySelector('.pb-footer')
  const r = f.getBoundingClientRect()
  const doc = document.documentElement
  return {
    footerBottomVsDoc: Math.round(r.bottom + window.scrollY) + ' / ' + doc.scrollHeight,
    footerStyles: (({ paddingBottom, background }) => ({ paddingBottom, background }))(getComputedStyle(f)),
    bodyBg: getComputedStyle(document.body).backgroundColor,
    lastChild: f.lastElementChild?.className,
    bottomBarPad: getComputedStyle(document.querySelector('.pb-footer__bottom')).padding,
  }
})
console.log(JSON.stringify(info, null, 2))
await b.close()
