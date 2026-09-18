import { useEffect } from 'react'

/**
 * Marca los elementos .pb-reveal cuando entran en pantalla.
 *
 * Usa el atributo data-in y no una clase a propósito: React reescribe
 * className en cada re-renderizado (por ejemplo al abrir una fila del
 * acordeón) y borraba la clase, dejando el elemento en opacity 0. React no
 * toca atributos que no le pasamos, así que data-in sobrevive.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.pb-reveal:not([data-in])')
    if (!els.length) return

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.setAttribute('data-in', ''))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.setAttribute('data-in', '')
          io.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
