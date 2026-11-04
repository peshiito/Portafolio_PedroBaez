import { useEffect, useState } from 'react'

/**
 * Lo que comparten las secciones que se cargan al acercarse: avisan cuando ya
 * están en la página, porque quien busca sus elementos tiene que volver a mirar,
 * y se pueden pedir todas juntas para saltar a una que todavía no llegó.
 */
const MONTADA = 'pb:seccion-montada'
const TODAS = 'pb:montar-todas'
let todas = false

export const pidieronTodo = () => todas

export function alPedirTodo(hacer) {
  window.addEventListener(TODAS, hacer)
  return () => window.removeEventListener(TODAS, hacer)
}

export function avisarSeccionMontada() {
  window.dispatchEvent(new Event(MONTADA))
}

/** Cambia cada vez que se suma una sección: sirve de dependencia para volver a buscar. */
export function useSeccionesMontadas() {
  const [cuantas, setCuantas] = useState(0)
  useEffect(() => {
    const sumar = () => setCuantas((n) => n + 1)
    window.addEventListener(MONTADA, sumar)
    return () => window.removeEventListener(MONTADA, sumar)
  }, [])
  return cuantas
}

const hayHuecos = () => document.querySelector('.pb-dif__hueco')

/** Monta todas las secciones, espera a que estén y recién entonces baja hasta `id`. */
export function irASeccion(id, behavior = 'smooth') {
  todas = true
  window.dispatchEvent(new Event(TODAS))
  const limite = performance.now() + 4000
  const esperar = () => {
    if (hayHuecos() && performance.now() < limite) {
      requestAnimationFrame(esperar)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
  }
  requestAnimationFrame(esperar)
}
