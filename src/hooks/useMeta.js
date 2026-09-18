import { useEffect } from 'react'

const SITIO = 'https://portafoliopedrobaez.vercel.app'
const IMAGEN_POR_DEFECTO = '/og.png'

function etiqueta(selector, crear) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = crear()
    document.head.appendChild(el)
  }
  return el
}

const meta = (attr, valor) =>
  etiqueta(`meta[${attr}="${valor}"]`, () => {
    const e = document.createElement('meta')
    e.setAttribute(attr.replace('[', '').replace(']', ''), valor)
    return e
  })

const absoluta = (ruta) => (ruta?.startsWith('http') ? ruta : SITIO + (ruta || IMAGEN_POR_DEFECTO))

/**
 * Título, descripción, canonical y tarjeta para compartir, por página.
 *
 * Al ser una SPA esto corrige lo que ven el visitante y los buscadores que
 * ejecutan JavaScript. WhatsApp y las redes leen el HTML sin ejecutarlo, así
 * que para ellos vale lo que está en index.html: por eso ahí ya están puestos
 * los valores de la home. Si el SEO pasa a importar de verdad, el paso
 * siguiente es prerenderizar.
 */
export function useMeta({ title, description, path, image, tipo = 'website' }) {
  useEffect(() => {
    if (title) {
      document.title = title
      meta('property', 'og:title').setAttribute('content', title)
      meta('name', 'twitter:title').setAttribute('content', title)
    }

    if (description) {
      meta('name', 'description').setAttribute('content', description)
      meta('property', 'og:description').setAttribute('content', description)
      meta('name', 'twitter:description').setAttribute('content', description)
    }

    if (path) {
      const url = SITIO + path
      etiqueta('link[rel="canonical"]', () => {
        const e = document.createElement('link')
        e.setAttribute('rel', 'canonical')
        return e
      }).setAttribute('href', url)
      meta('property', 'og:url').setAttribute('content', url)
    }

    // Cada proyecto se comparte con su propia captura, no con la genérica
    const img = absoluta(image)
    meta('property', 'og:image').setAttribute('content', img)
    meta('name', 'twitter:image').setAttribute('content', img)
    meta('property', 'og:type').setAttribute('content', tipo)
  }, [title, description, path, image, tipo])
}
