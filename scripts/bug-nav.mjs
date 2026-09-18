import { chromium } from 'playwright'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
const p = await ctx.newPage()

const medir = async (etiqueta) => {
  await p.evaluate(async () => {
    const alto = document.documentElement.scrollHeight
    for (let y = 0; y < alto; y += window.innerHeight * 0.7) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 160))
    }
  })
  await p.waitForTimeout(900)
  const r = await p.evaluate(() => {
    const todos = [...document.querySelectorAll('.pb-reveal')]
    const marcados = todos.filter((e) => e.hasAttribute('data-in'))
    const invisibles = todos.filter((e) => getComputedStyle(e).opacity === '0')
    return {
      url: location.pathname,
      reveal: todos.length,
      conDataIn: marcados.length,
      invisibles: invisibles.length,
    }
  })
  console.log(`${etiqueta.padEnd(28)} ${r.url.padEnd(30)} reveal=${String(r.reveal).padEnd(4)} marcados=${String(r.conDataIn).padEnd(4)} INVISIBLES=${r.invisibles}`)
  return r
}

await p.goto('http://localhost:5173/proyectos/oficio-barberia', { waitUntil: 'networkidle' })
await p.waitForTimeout(1200)
await medir('1. carga directa')

for (let i = 2; i <= 4; i++) {
  await p.locator('.pb-proj__next-link').scrollIntoViewIfNeeded()
  await p.waitForTimeout(400)
  await p.locator('.pb-proj__next-link').click()
  await p.waitForTimeout(1600)
  await medir(`${i}. tras "siguiente"`)
}

await p.reload({ waitUntil: 'networkidle' })
await p.waitForTimeout(1200)
await medir('5. tras F5')
await b.close()
