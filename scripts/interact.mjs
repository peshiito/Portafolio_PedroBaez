import { chromium } from 'playwright'
const b = await chromium.launch()
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } })
const p = await ctx.newPage()
const errs = []
p.on('pageerror', (e) => errs.push(e.message))
// Vite no ejecuta funciones de Vercel: la respuesta del servidor se simula
// para poder probar el flujo completo del formulario.
let modoApi = 'ok'
await p.route('**/api/contacto', async (route) => {
  if (modoApi === 'ok') return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
  return route.fulfill({
    status: 502,
    contentType: 'application/json',
    body: '{"error":"No pudimos enviar el mensaje. Probá por WhatsApp."}',
  })
})

await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await p.waitForTimeout(700)

// 1. Acordeón de servicios con teclado
const trigger = p.locator('.pb-svc__trigger').nth(2)
await trigger.focus()
const focusVisible = await p.evaluate(() => {
  const el = document.activeElement
  const cs = getComputedStyle(el)
  return { tag: el.tagName, outline: cs.outlineWidth + ' ' + cs.outlineColor }
})
await p.keyboard.press('Enter')
await p.waitForTimeout(500)
const opened = await p.locator('.pb-svc__trigger').nth(2).getAttribute('aria-expanded')
const closedOther = await p.locator('.pb-svc__trigger').nth(1).getAttribute('aria-expanded')

// 2. Toggle de tema
await p.locator('.pb-nav__theme').click()
await p.waitForTimeout(400)
const themeAfter = await p.evaluate(() => document.documentElement.getAttribute('data-bs-theme'))
const persisted = await p.evaluate(() => localStorage.getItem('pb-theme'))

// 3. Validación del formulario
await p.locator('#contacto').scrollIntoViewIfNeeded()
await p.locator('button[type=submit]').click()
await p.waitForTimeout(300)
const invalid = await p.locator('[aria-invalid="true"]').count()
const focusedAfterSubmit = await p.evaluate(() => document.activeElement?.getAttribute('name'))
const errorText = await p.locator('.pb-field__error').first().textContent()

// 4. El servidor falla: tiene que ofrecer WhatsApp, no dejarte colgado
await p.fill('#nombre', 'Mariela Ocampo')
await p.fill('#email', 'mariela@brumacafe.ar')
await p.fill('#mensaje', 'Tengo una cafetería y quiero vender online.')
modoApi = 'error'
await p.locator('button[type=submit]').click()
await p.waitForTimeout(1200)
const avisoFallo = await p.locator('.pb-contact__fallo').isVisible().catch(() => false)
const ofreceWhatsApp = await p.locator('.pb-contact__fallo a[href*="wa.me"]').count()

// 5. El campo trampa no debe verse ni recibir foco (con el formulario aún abierto)
const trampa = await p.evaluate(() => {
  const i = document.querySelector('input[name=apellido]')
  if (!i) return 'no existe'
  const r = i.getBoundingClientRect()
  return { visible: r.right > 0 && r.width > 2, tabIndex: i.tabIndex }
})

// 6. Envío correcto
modoApi = 'ok'
await p.locator('button[type=submit]').click()
await p.waitForTimeout(1200)
const done = await p.locator('.pb-contact__done').isVisible()


// 5. Orden de tabulación desde el inicio
await p.evaluate(() => window.scrollTo(0, 0))
await p.locator('body').press('Tab')
const firstTab = await p.evaluate(() => document.activeElement?.className || document.activeElement?.tagName)

console.log(JSON.stringify({
  focoVisible: focusVisible,
  acordeonAbrePorTeclado: opened, otroSeCerro: closedOther,
  temaTrasToggle: themeAfter, temaPersistido: persisted,
  camposInvalidos: invalid, focoEnPrimerError: focusedAfterSubmit, textoError: errorText,
  avisoDeFallo: avisoFallo, ofreceWhatsAppAlFallar: ofreceWhatsApp,
  confirmacionVisible: done,
  campoTrampa: trampa,
  primerTab: firstTab,
  errores: errs,
}, null, 2))
await b.close()
