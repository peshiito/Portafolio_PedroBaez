/**
 * Genera un HTML propio para cada proyecto, con sus meta tags ya escritos.
 *
 * WhatsApp, Instagram, LinkedIn y los buscadores leen el HTML sin ejecutar
 * JavaScript. Como esto es una SPA, sin este paso todas las rutas servirían
 * el mismo index.html y al compartir un proyecto se vería la tarjeta de la
 * home. Acá se escribe un archivo por ruta con su título, su descripción y
 * su imagen; la aplicación sigue funcionando igual al abrirlo.
 *
 * Corre solo después de `vite build`.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, join } from 'path'

const SITIO = 'https://portafoliopedrobaez.vercel.app'
const DIST = 'dist'

const fuente = readFileSync('src/data/projects.js', 'utf8')
const campo = (bloque, clave) =>
  bloque.match(new RegExp(`${clave}:\\s*'((?:[^'\\\\]|\\\\.)*)'`))?.[1]?.replace(/\\'/g, "'")

const proyectos = fuente
  .split(/\n  \{\n/)
  .slice(1)
  .map((b) => ({
    slug: campo(b, 'slug'),
    name: campo(b, 'name'),
    what: campo(b, 'what'),
    resumen: campo(b, 'resumen'),
    portada: campo(b, 'portada'),
  }))
  .filter((p) => p.slug && p.name)

const escapar = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const base = readFileSync(join(DIST, 'index.html'), 'utf8')

for (const p of proyectos) {
  const titulo = `${p.name} — ${p.what} | Pedro Baez`
  const url = `${SITIO}/proyectos/${p.slug}`
  // JPG y no WebP: algunos lectores de enlaces todavía no muestran WebP
  const img = `${SITIO}/proyectos/${p.slug}-og.jpg`

  const html = base
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapar(titulo)}</title>`)
    .replace(/(<meta\s+name="description"[\s\S]*?content=")[\s\S]*?(")/, `$1${escapar(p.resumen)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:type" content=")[^"]*(")/, `$1article$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapar(titulo)}$2`)
    .replace(/(<meta\s+property="og:description"[\s\S]*?content=")[\s\S]*?(")/, `$1${escapar(p.resumen)}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${img}$2`)
    .replace(/(<meta property="og:image:width" content=")[^"]*(")/, `$11200$2`)
    .replace(/(<meta property="og:image:height" content=")[^"]*(")/, `$1630$2`)
    .replace(/(<meta\s+property="og:image:alt"[\s\S]*?content=")[\s\S]*?(")/, `$1Pantalla principal del sitio de ${escapar(p.name)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapar(titulo)}$2`)
    .replace(/(<meta\s+name="twitter:description"[\s\S]*?content=")[\s\S]*?(")/, `$1${escapar(p.resumen)}$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${img}$2`)

  const destino = join(DIST, 'proyectos', p.slug, 'index.html')
  mkdirSync(dirname(destino), { recursive: true })
  writeFileSync(destino, html)
  console.log(`  proyectos/${p.slug}/index.html`)
}

console.log(`\n${proyectos.length} páginas con sus propios meta tags.`)
