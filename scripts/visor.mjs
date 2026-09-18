import { chromium } from 'playwright'
const out = process.argv[2]
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
const p = await ctx.newPage()
const errs = []
p.on('pageerror', (e) => errs.push(e.message.slice(0, 120)))
await p.goto('http://localhost:5173/proyectos/oficio-barberia', { waitUntil: 'networkidle' })
await p.waitForTimeout(1200)
await p.evaluate(() => document.querySelectorAll('.pb-reveal').forEach((e) => e.setAttribute('data-in', '')))
await p.evaluate(async () => {
  const alto = document.documentElement.scrollHeight
  for (let y = 0; y < alto; y += window.innerHeight * 0.8) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 200)) }
})
await p.waitForTimeout(1200)

const botones = await p.locator('.pb-galeria__btn').count()
await p.locator('.pb-galeria__btn').nth(4).click()
await p.waitForTimeout(900)
const abierto = await p.evaluate(() => {
  // hay un visor por galería: hay que mirar el que está abierto
  const d = [...document.querySelectorAll('.pb-visor')].find((x) => x.open)
  const img = d?.querySelector('.pb-visor__img')
  const oculto = [...document.querySelectorAll('.visually-hidden')].some(
    (e) => e.getBoundingClientRect().width > 2,
  )
  return { open: !!d?.open, textoOcultoVisible: oculto, src: img?.getAttribute('src'), alt: img?.getAttribute('alt')?.slice(0, 55), foco: document.activeElement?.className?.slice(0, 40) }
})
await p.screenshot({ path: `${out}/visor.png` })

await p.keyboard.press('ArrowRight')
await p.waitForTimeout(600)
const tras = await p.evaluate(() =>
  [...document.querySelectorAll('.pb-visor')].find((x) => x.open)?.querySelector('.pb-visor__img')?.getAttribute('src'),
)

await p.keyboard.press('Escape')
await p.waitForTimeout(600)
const cerrado = await p.evaluate(() => ![...document.querySelectorAll('.pb-visor')].some((x) => x.open))

console.log(JSON.stringify({ botonesAmpliables: botones, ...abierto, trasFlechaDerecha: tras, cerroConEscape: cerrado, errores: errs }, null, 1))
await b.close()
