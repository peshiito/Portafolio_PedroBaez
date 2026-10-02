/**
 * Capturas de Comanda (el sistema del restaurante).
 *
 * Necesita la API en :4000 y el front en :5173, idealmente con
 * `npm run db:reset && npm run db:demo` para que el salón esté en servicio.
 *
 *   node scripts/capturar-restaurant.mjs /tmp/shots
 */
import { chromium } from 'playwright'

const out = process.argv[2]
const BASE = 'http://localhost:5173'

const b = await chromium.launch()
const errs = []

async function entrarConClave(ctx, email, password) {
  const p = await ctx.newPage()
  p.on('pageerror', (e) => errs.push(e.message.slice(0, 120)))
  await p.goto(BASE + '/entrar', { waitUntil: 'networkidle' })
  await p.getByRole('tab', { name: 'Caja y encargado' }).click()
  await p.locator('input[type=email]').fill(email)
  await p.locator('input[type=password]').fill(password)
  await p.locator('button.btn-primario').click()
  await p.waitForURL((u) => !u.pathname.startsWith("/entrar"), { timeout: 15000 }).catch(async (e) => { await p.screenshot({ path: `${out}/fallo-login.png` }); throw e })
  return p
}

async function entrarConPin(ctx, nombre, pin) {
  const p = await ctx.newPage()
  p.on('pageerror', (e) => errs.push(e.message.slice(0, 120)))
  await p.goto(BASE + '/entrar', { waitUntil: 'networkidle' })
  await p.getByRole('tab', { name: 'Salón y cocina' }).click()
  await p.locator('.login-usuario', { hasText: nombre }).first().click()
  await p.keyboard.type(pin)
  await p.waitForURL((u) => !u.pathname.startsWith("/entrar"), { timeout: 15000 }).catch(async (e) => { await p.screenshot({ path: `${out}/fallo-login.png` }); throw e })
  return p
}

const shot = async (p, nombre, ruta, espera = 2500) => {
  if (ruta) await p.goto(BASE + ruta, { waitUntil: 'networkidle' })
  await p.waitForTimeout(espera)
  await p.screenshot({ path: `${out}/${nombre}.png`, animations: 'disabled' })
  console.log(`  ${nombre.padEnd(16)} ${p.url()}`)
}

// Escritorio: encargado. 1440×950 es la proporción de la galería (1400×924);
// la portada va aparte, a 1440×900 (16:10).
const ctx = await b.newContext({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1 })
const login = await ctx.newPage()
await login.goto(BASE + '/entrar', { waitUntil: 'networkidle' })
await shot(login, 'login', null, 1200)
await login.close()

const enc = await entrarConClave(ctx, 'encargado@local.test', 'encargado1234')
await enc.setViewportSize({ width: 1440, height: 900 })
await shot(enc, 'cocina-portada', '/cocina')
await enc.setViewportSize({ width: 1440, height: 950 })
await shot(enc, 'salon-plano', '/salon')
await shot(enc, 'salon-lista', '/salon?vista=lista')
await shot(enc, 'caja', '/caja')
await shot(enc, 'cocina', '/cocina')
await shot(enc, 'reportes', '/admin/reportes', 3500)
await shot(enc, 'admin-caja', '/admin/caja')
await shot(enc, 'auditoria', '/admin/auditoria')
await shot(enc, 'carta', '/admin/carta')
await shot(enc, 'usuarios', '/admin/usuarios')

// Una cuenta grande abierta, desde la caja
await enc.goto(BASE + '/caja', { waitUntil: 'networkidle' })
await enc.locator('.cuenta-fila', { hasText: 'Mesa 14' }).first().click()
await shot(enc, 'cuenta', null)

// Una mesa ocupada, desde el salón
await enc.goto(BASE + '/salon?vista=lista', { waitUntil: 'networkidle' })
await enc.locator('button.mesa[aria-label^="Mesa 8,"]').first().click()
await shot(enc, 'mesa', null)
const rutaMesa = new URL(enc.url()).pathname

// Editor del plano, con una mesa elegida para que se vea el panel
await enc.goto(BASE + '/salon?vista=editar', { waitUntil: 'networkidle' })
await enc.waitForTimeout(1500)
const mesaEditor = enc.locator('[aria-label^="Mesa 8"]').first()
await mesaEditor.focus().catch(() => {})
await mesaEditor.click({ position: { x: 10, y: 10 } }).catch(() => {})
await shot(enc, 'plano-editor', null)

// La cocina va en una pantalla fija, sin el riel lateral
const t = await b.newContext({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 1, storageState: await ctx.storageState() })
const tab = await t.newPage()
await shot(tab, 'cocina-tablet', '/cocina')

// Celular: el mozo
const m = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
const mozo = await entrarConPin(m, 'Diego', '3333')
await shot(mozo, 'mozo-salon', '/salon')
await shot(mozo, 'mozo-mesa', rutaMesa)
await mozo.goto(BASE + '/salon', { waitUntil: 'networkidle' })
await mozo.screenshot({ path: `${out}/mozo-salon-largo.png`, fullPage: true, animations: 'disabled' })

await b.close()
console.log(errs.length ? 'errores: ' + [...new Set(errs)].slice(0, 3).join(' | ') : 'sin errores JS')
