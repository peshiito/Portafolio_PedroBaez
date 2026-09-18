import { chromium } from 'playwright'
const out = process.argv[2]
const b = await chromium.launch()

// ---- Dashboard de la barbería: entra con la cuenta de admin ----
try {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage()
  await p.goto('http://localhost:5305/', { waitUntil: 'domcontentloaded' })
  await p.waitForTimeout(2500)
  await p.locator('input[type=email], input[name*=mail i]').first().fill('admin@barberia.com')
  await p.locator('input[type=password]').first().fill('Barberia-1acfabeb!')
  await p.getByRole('button', { name: /ingresar|entrar|acceder/i }).first().click()
  await p.waitForTimeout(6000)
  await p.screenshot({ path: `${out}/dashboard-in-0.png`, timeout: 60000, animations: 'disabled' })
  const alto = await p.evaluate(() => document.documentElement.scrollHeight)
  await p.evaluate((y) => window.scrollTo(0, y), Math.round(alto * 0.4))
  await p.waitForTimeout(1500)
  await p.screenshot({ path: `${out}/dashboard-in-1.png`, timeout: 60000, animations: 'disabled' })
  const links = await p.evaluate(() =>
    [...new Set([...document.querySelectorAll('a, nav button')].map((a) => a.textContent.trim()).filter(Boolean))].slice(0, 16),
  )
  console.log('dashboard secciones:', JSON.stringify(links))
  console.log('dashboard url:', p.url())
  await ctx.close()
} catch (e) {
  console.log('dashboard ERROR:', e.message.slice(0, 120))
}

// ---- ChatBot: catálogo cargado y una consulta real al asesor ----
try {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
  const p = await ctx.newPage()
  await p.goto('http://localhost:5306/', { waitUntil: 'domcontentloaded' })
  await p.waitForTimeout(4000)
  await p.screenshot({ path: `${out}/chatbot-in-0.png`, timeout: 60000, animations: 'disabled' })
  const alto = await p.evaluate(() => document.documentElement.scrollHeight)
  await p.evaluate((y) => window.scrollTo(0, y), Math.round(alto * 0.35))
  await p.waitForTimeout(1500)
  await p.screenshot({ path: `${out}/chatbot-in-1.png`, timeout: 60000, animations: 'disabled' })
  console.log('chatbot alto:', alto)
  await ctx.close()
} catch (e) {
  console.log('chatbot ERROR:', e.message.slice(0, 120))
}
await b.close()
