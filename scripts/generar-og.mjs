/**
 * Genera la imagen que se ve al compartir el link (WhatsApp, redes, Google).
 * Se arma con las mismas fuentes y colores del sitio, renderizando HTML.
 *
 * Uso: node scripts/generar-og.mjs
 */
import { chromium } from 'playwright'

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=DM+Mono:wght@400&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:#E4E2DD;color:#3A352F;
    font-family:'Archivo',sans-serif;display:flex;flex-direction:column;
    justify-content:space-between;padding:64px 72px;overflow:hidden;position:relative}
  .barra{position:absolute;left:0;right:0;top:0;height:14px;background:#FF3131}
  .arriba{display:flex;align-items:center;gap:20px}
  .logo{height:56px}
  .kicker{font-family:'DM Mono',monospace;font-size:19px;letter-spacing:.14em;
    text-transform:uppercase;color:#5F594F}
  .nombre{font-variation-settings:'wdth' 112,'wght' 900;font-size:172px;line-height:.86;
    text-transform:uppercase;letter-spacing:-.035em}
  .rojo{color:#FF3131}
  .bajada{font-size:31px;line-height:1.35;max-width:23ch;color:#3A352F;margin-top:18px}
  .pie{display:flex;justify-content:space-between;align-items:flex-end}
  .datos{font-family:'DM Mono',monospace;font-size:18px;letter-spacing:.12em;
    text-transform:uppercase;color:#5F594F}
  .sello{font-family:'DM Mono',monospace;font-size:16px;letter-spacing:.12em;
    text-transform:uppercase;color:#fff;background:#FF3131;padding:13px 22px;border-radius:999px}
</style></head><body>
  <div class="barra"></div>
  <div>
    <div class="arriba">
      <img class="logo" src="http://localhost:5173/logo.png" alt="">
      <span class="kicker">Diseño y desarrollo web · Argentina</span>
    </div>
    <h1 class="nombre">Pedro <span class="rojo">Baez</span></h1>
    <p class="bajada">Sitios web a medida para negocios que ya funcionan bien en persona.</p>
  </div>
  <div class="pie">
    <span class="datos">5 proyectos · código propio · sin plantillas</span>
    <span class="sello">Te contesto hoy mismo</span>
  </div>
</body></html>`

const b = await chromium.launch()
const p = await (await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 })).newPage()
await p.setContent(html, { waitUntil: 'networkidle' })
await p.evaluate(() => document.fonts.ready)
await p.waitForTimeout(1200)
await p.screenshot({ path: 'public/og.png' })
await b.close()
console.log('public/og.png generada (1200×630)')
