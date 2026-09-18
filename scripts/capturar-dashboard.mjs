import { chromium } from 'playwright'
const out = process.argv[2]
const RUTAS = [
  ['agenda', '/'],
  ['clientes', '/clients'],
  ['horarios', '/schedule'],
  ['barberos', '/admin/barbers'],
  ['finanzas', '/admin/finance'],
  ['servicios', '/admin/services'],
]
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 950 } })
const p = await ctx.newPage()
const errs = []
p.on('pageerror', (e) => errs.push(e.message.slice(0, 100)))

await p.goto('http://localhost:5174/login', { waitUntil: 'domcontentloaded' })
await p.waitForTimeout(2000)
await p.locator('input[type=email]').first().fill('administrador@barberia.com')
await p.locator('input[type=password]').first().fill('Admin1234!')
await p.getByRole('button', { name: /ingresar|entrar|acceder/i }).first().click()
await p.waitForTimeout(6000)
console.log('tras login ->', p.url())

for (const [nombre, ruta] of RUTAS) {
  try {
    await p.goto('http://localhost:5174' + ruta, { waitUntil: 'domcontentloaded' })
    await p.waitForTimeout(4500)
    await p.screenshot({ path: `${out}/dash-${nombre}.png`, timeout: 60000, animations: 'disabled' })
    const t = await p.evaluate(() => {
      const h = document.querySelector('h1, h2')
      return { titulo: h ? h.textContent.trim().slice(0, 60) : '', alto: document.documentElement.scrollHeight }
    })
    console.log(`  ${nombre.padEnd(11)} ${ruta.padEnd(18)} "${t.titulo}"`)
  } catch (e) {
    console.log(`  ${nombre}: ERROR ${e.message.slice(0, 70)}`)
  }
}
// una vista en celular del panel
const m = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2, storageState: await ctx.storageState() })
const mp = await m.newPage()
await mp.goto('http://localhost:5174/', { waitUntil: 'domcontentloaded' })
await mp.waitForTimeout(5000)
await mp.screenshot({ path: `${out}/dash-movil.png`, timeout: 60000, animations: 'disabled' })
await b.close()
console.log(errs.length ? 'errores: ' + [...new Set(errs)].slice(0, 3).join(' | ') : 'sin errores JS')
