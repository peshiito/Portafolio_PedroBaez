import { useEffect } from 'react'

const SITE = 'https://pedrobaez.ar'

function tag(selector, create) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  return el
}

/**
 * Título, descripción y canonical por página. Al ser una SPA, esto sólo
 * corrige lo que ve el visitante y los crawlers que ejecutan JS; si el SEO
 * pasa a importar de verdad, el paso siguiente es prerenderizar.
 */
export function useMeta({ title, description, path }) {
  useEffect(() => {
    if (title) document.title = title

    if (description) {
      const m = tag('meta[name="description"]', () => {
        const e = document.createElement('meta')
        e.setAttribute('name', 'description')
        return e
      })
      m.setAttribute('content', description)
    }

    if (path) {
      const c = tag('link[rel="canonical"]', () => {
        const e = document.createElement('link')
        e.setAttribute('rel', 'canonical')
        return e
      })
      c.setAttribute('href', SITE + path)
    }

    const og = [
      ['og:title', title],
      ['og:description', description],
      ['og:url', path ? SITE + path : null],
    ]
    og.forEach(([prop, val]) => {
      if (!val) return
      const e = tag(`meta[property="${prop}"]`, () => {
        const n = document.createElement('meta')
        n.setAttribute('property', prop)
        return n
      })
      e.setAttribute('content', val)
    })
  }, [title, description, path])
}
