/**
 * Cambia el dominio del sitio en todos los archivos donde está escrito.
 *
 * El dominio aparece en el HTML, en los meta de cada página, en el
 * prerenderizado, en robots.txt y en el sitemap. Escribirlo a mano en cinco
 * lugares es pedir que uno quede viejo, y si queda viejo la tarjeta al
 * compartir apunta a un sitio que no existe y la imagen no carga.
 *
 * Uso:  node scripts/set-dominio.mjs https://midominio.com
 */
import { readFileSync, writeFileSync } from 'fs'

const nuevo = (process.argv[2] || '').replace(/\/+$/, '')
if (!/^https?:\/\/[^/]+$/.test(nuevo)) {
  console.error('Dominio inválido.\n  node scripts/set-dominio.mjs https://midominio.com')
  process.exit(1)
}

const ARCHIVOS = [
  'index.html',
  'src/hooks/useMeta.js',
  'scripts/prerender.mjs',
  'public/robots.txt',
  'public/sitemap.xml',
]

// cualquier dominio que estuviera antes
const ANTERIOR = /https?:\/\/(?:pedrobaez\.ar|[a-z0-9-]+\.vercel\.app|localhost:\d+)/g

let total = 0
for (const f of ARCHIVOS) {
  const antes = readFileSync(f, 'utf8')
  const despues = antes.replace(ANTERIOR, nuevo)
  const cambios = (antes.match(ANTERIOR) || []).length
  if (cambios) {
    writeFileSync(f, despues)
    console.log(`  ${f.padEnd(24)} ${cambios} reemplazo(s)`)
    total += cambios
  } else {
    console.log(`  ${f.padEnd(24)} sin cambios`)
  }
}
console.log(`\n${total} referencias apuntan ahora a ${nuevo}`)
console.log('Acordate de correr `npm run build`.')
