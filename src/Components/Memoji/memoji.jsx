import { useEffect, useRef, useState } from 'react'
import { SECCIONES } from '../../data/memojis'
import { useSeccionesMontadas } from '../../hooks/seccionesDiferidas'
import './memoji.css'

/**
 * Pedro en versión Memoji. Los archivos viven en public/memojis:
 * WebP a 256 y 512 px, y un PNG de 512 para los navegadores sin WebP.
 *
 * - `prioridad`: solo para el del inicio, que se ve apenas carga la página.
 * - `sizes`: cuánto ocupa en pantalla, para que el navegador elija el archivo.
 */
function Memoji({ nombre, alt, sizes = '136px', prioridad = false }) {
  return (
    <picture className="pb-memoji">
      <source
        type="image/webp"
        srcSet={`/memojis/${nombre}-256.webp 256w, /memojis/${nombre}.webp 512w`}
        sizes={sizes}
      />
      <img
        src={`/memojis/${nombre}.png`}
        alt={alt}
        width={512}
        height={512}
        loading={prioridad ? 'eager' : 'lazy'}
        fetchPriority={prioridad ? 'high' : undefined}
        decoding="async"
      />
    </picture>
  )
}
export default Memoji

/* ---------- Movimiento atado al scroll ---------- */

// Un solo listener y un solo cuadro por página, sin importar cuántos Memojis haya
const moviles = new Set()
let cuadro = 0
let escritorio = null

const limitar = (v) => Math.min(1, Math.max(0, v))

// Acelera y frena de forma pareja, sin puntas en los cambios de dirección
const easing = (t) => (1 - Math.cos(Math.PI * t)) / 2

/**
 * Persigue un valor con arranque y frenado suaves, sin pasarse de largo.
 * A diferencia de sumar un porcentaje por cuadro, acelera al salir y va igual
 * en una pantalla de 60 Hz que en una de 120 Hz. `tiempo` es cuánto tarda en
 * llegar, en segundos, y `dt` lo que pasó desde el cuadro anterior.
 */
function suavizar(actual, meta, vel, tiempo, dt) {
  const w = 2 / tiempo
  const x = w * dt
  const decae = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
  const dif = actual - meta
  const temp = (vel + w * dif) * dt
  return [meta + (dif + temp) * decae, (vel - w * temp) * decae]
}

// Entre dos cuadros: acotado, para que volver a la pestaña no dé un salto
const entreCuadros = (ahora, antes) => Math.min(0.05, Math.max(0.001, (ahora - antes) / 1000))

let antes = 0

function pintar(ahora) {
  cuadro = 0
  let falta = false
  const alto = innerHeight
  const dt = entreCuadros(ahora, antes)
  antes = ahora

  moviles.forEach((m) => {
    const caja = m.caja.getBoundingClientRect()
    // Lejos de la pantalla no gasta: ni capa propia ni flotación
    const cerca = caja.bottom > -alto * 0.5 && caja.top < alto * 1.5
    if (cerca !== m.cerca) {
      m.cerca = cerca
      m.el.toggleAttribute('data-cerca', cerca)
    }
    if (!cerca) return

    // 0 cuando la caja asoma por abajo, 1 cuando se va por arriba
    const avance = (alto - caja.top) / (alto + caja.height)
    const meta = easing(limitar((avance - 0.12) / 0.76))
    ;[m.t, m.v] = suavizar(m.t, meta, m.v, 0.24, dt)
    if (Math.abs(meta - m.t) > 0.0005 || Math.abs(m.v) > 0.0005) falta = true

    const giro = (m.t - 0.5) * (m.haciaDerecha ? 10 : -10)

    if (m.modo === 'carril') {
      // Baja por el aire libre de la sección, pegado a su lado
      const x = m.haciaDerecha ? caja.width - m.ancho : 0
      const y = (caja.height - m.alto) * m.t
      m.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${giro.toFixed(2)}deg)`
    } else {
      // Sube, nunca baja: abajo está la línea con el nombre del proyecto
      const x = escritorio.matches ? (m.t - 0.5) * 18 : 0
      const y = (m.t - 1) * 28
      m.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${giro.toFixed(2)}deg)`
    }
  })

  if (falta) cuadro = requestAnimationFrame(pintar)
}

const pedirCuadro = () => {
  if (cuadro) return
  // Sin esto, el primer cuadro después de una pausa contaría toda la pausa
  antes = performance.now()
  cuadro = requestAnimationFrame(pintar)
}

// El tamaño cambia solo al girar o redimensionar: no hace falta leerlo en cada cuadro
const medirTodos = () => {
  moviles.forEach((m) => {
    m.ancho = m.el.offsetWidth
    m.alto = m.el.offsetHeight
  })
  pedirCuadro()
}

/** Mueve el Memoji mientras se scrollea. Respeta prefers-reduced-motion. */
function useMovimiento({ modo, haciaDerecha }) {
  const el = useRef(null)
  const caja = useRef(null)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    escritorio ??= matchMedia('(min-width: 992px)')

    const movil = {
      el: el.current,
      caja: caja.current,
      modo,
      haciaDerecha,
      t: 0,
      v: 0,
      cerca: false,
      ancho: el.current.offsetWidth,
      alto: el.current.offsetHeight,
    }
    moviles.add(movil)
    if (moviles.size === 1) {
      addEventListener('scroll', pedirCuadro, { passive: true })
      addEventListener('resize', medirTodos, { passive: true })
    }
    pedirCuadro()

    return () => {
      moviles.delete(movil)
      if (moviles.size === 0) {
        removeEventListener('scroll', pedirCuadro)
        removeEventListener('resize', medirTodos)
        cancelAnimationFrame(cuadro)
        cuadro = 0
      }
    }
  }, [modo, haciaDerecha])

  return { el, caja }
}

/**
 * En celular, baja por una franja vacía de la página. La franja sale de `tipo`:
 * 'inicio' es el aire de arriba de la sección y 'cruce' el aire compartido con
 * la sección anterior. Por ahí no pasa ningún texto. En computadora no se
 * muestra: ahí el que recorre la página es MemojiViajero.
 */
export function MemojiCarril({ tipo = 'cruce', haciaDerecha = true, seccion, ...memoji }) {
  const { el, caja } = useMovimiento({ modo: 'carril', haciaDerecha })
  const frase = SECCIONES[seccion]?.frase
  return (
    <div className={`pb-carril pb-carril--${tipo}`} ref={caja}>
      <div className="pb-carril__movil" data-lado={haciaDerecha ? 'der' : 'izq'} ref={el}>
        <div className="pb-flota">
          <Memoji sizes="96px" {...memoji} />
          {frase && (
            <p className="pb-globo" aria-hidden="true">
              {frase}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/** Se mece apenas dentro de su lugar: para las tarjetas de los trabajos. */
export function MemojiLeve({ className = '', ...memoji }) {
  const { el, caja } = useMovimiento({ modo: 'leve', haciaDerecha: true })
  return (
    <span className={`pb-leve ${className}`} ref={caja}>
      <span className="pb-leve__movil" ref={el}>
        <Memoji sizes="(min-width: 992px) 120px, 80px" {...memoji} />
      </span>
    </span>
  )
}

/* ---------- El que recorre la página ---------- */

const TRAMOS = 7 // veces que recorre la pantalla de punta a punta en toda la página
const ARRIBA = 190 // debajo de la barra de navegación, con lugar para el globo
const ABAJO = 100 // arriba del botón de WhatsApp
const BARRA = 90 // alto de la barra de navegación

/**
 * Solo en computadora. Recorre en vertical la franja lateral que le reservan
 * los .container de la home: mientras scrolleás baja y sube la pantalla, se
 * inclina con la velocidad y llega con inercia. Es decorativo: lo mismo está en el texto.
 */
export function MemojiViajero() {
  const [pasoCinta, setPasoCinta] = useState(false)
  const [enPie, setEnPie] = useState(false)
  const visible = pasoCinta && !enPie
  const [seccion, setSeccion] = useState('servicios')
  const cuerpo = useRef(null)
  const inclinable = useRef(null)
  const salto = useRef(null)
  const seccionAnterior = useRef(seccion)
  const montadas = useSeccionesMontadas()
  // Solo las poses que ya le tocaron: las demás no se descargan hasta entonces
  const [vistas, setVistas] = useState([])
  const { pose, frase } = SECCIONES[seccion]
  if (visible && !vistas.includes(pose)) setVistas([...vistas, pose])

  // Entra pasada la cinta del inicio y se retira antes del pie, porque esas
  // dos franjas van de lado a lado y no le dejan lugar. Se mide en cada scroll:
  // un IntersectionObserver no avisa si un salto la pasa sin que llegue a verse,
  // y el Memoji quedaba invisible para siempre.
  useEffect(() => {
    const cinta = document.querySelector('.pb-marquee')
    const pie = document.querySelector('footer')
    const medir = () => {
      // La barra de navegación ya la tapa antes de que salga de la pantalla
      setPasoCinta(cinta ? cinta.getBoundingClientRect().bottom < BARRA : true)
      setEnPie(pie ? pie.getBoundingClientRect().top < innerHeight : false)
    }
    medir()
    addEventListener('scroll', medir, { passive: true })
    addEventListener('resize', medir, { passive: true })
    return () => {
      removeEventListener('scroll', medir)
      removeEventListener('resize', medir)
    }
  }, [])

  // La sección que ocupa el centro de la pantalla manda la pose
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSeccion(e.target.id)),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    Object.keys(SECCIONES).forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
    // Las secciones se suman a medida que te acercás: hay que volver a mirar
  }, [montadas])

  // Un salto en cada cambio de sección
  useEffect(() => {
    if (seccionAnterior.current === seccion) return
    seccionAnterior.current = seccion
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    salto.current?.animate(
      [
        { transform: 'translateY(0) scale(1)' },
        { transform: 'translateY(-24px) scale(1.12)', offset: 0.4 },
        { transform: 'translateY(0) scale(1)' },
      ],
      { duration: 520, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' },
    )
  }, [seccion])

  // El recorrido. Se escribe el transform directo: pasa en cada cuadro.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let y = null
    let vy = 0
    let x = 0
    let vx = 0
    let giro = 0
    let vGiro = 0
    let inclinacion = 0
    let antesCuadro = 0
    let ultimoY = scrollY
    let ultimoT = performance.now()
    let altoCuerpo = cuerpo.current?.offsetHeight ?? 0

    const paso = (ahora) => {
      raf = 0
      const nodo = cuerpo.current
      if (!nodo) return
      const dt = entreCuadros(ahora, antesCuadro)
      antesCuadro = ahora

      const total = document.documentElement.scrollHeight - innerHeight
      const p = total > 0 ? limitar(scrollY / total) : 0

      // Zigzag: baja un tramo y sube el siguiente, frenando en cada punta
      const fase = (p * TRAMOS) % 2
      const ida = easing(fase <= 1 ? fase : 2 - fase)
      const recorrido = Math.max(0, innerHeight - altoCuerpo - ARRIBA - ABAJO)
      const metaY = ARRIBA + recorrido * ida
      const metaX = Math.sin(p * TRAMOS * Math.PI) * 6

      if (y === null) y = metaY
      ;[y, vy] = suavizar(y, metaY, vy, 0.38, dt)
      ;[x, vx] = suavizar(x, metaX, vx, 0.38, dt)
      inclinacion *= Math.exp(-dt * 5)
      ;[giro, vGiro] = suavizar(giro, inclinacion, vGiro, 0.16, dt)

      // Se inclina solo el Memoji: el globo lo acompaña derecho, porque por estar
      // lejos del eje de giro se salía de la pantalla
      nodo.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
      if (inclinable.current) inclinable.current.style.transform = `rotate(${giro.toFixed(2)}deg)`

      const quieto =
        Math.abs(metaY - y) < 0.1 &&
        Math.abs(vy) < 1 &&
        Math.abs(metaX - x) < 0.1 &&
        Math.abs(giro) < 0.03 &&
        Math.abs(inclinacion) < 0.03
      if (!quieto) raf = requestAnimationFrame(paso)
    }

    const alMover = () => {
      const t = performance.now()
      const v = (scrollY - ultimoY) / Math.max(16, t - ultimoT)
      ultimoY = scrollY
      ultimoT = t
      // Bajando se inclina para un lado y subiendo para el otro
      inclinacion = Math.max(-12, Math.min(12, v * 7))
      if (!raf) {
        antesCuadro = t
        raf = requestAnimationFrame(paso)
      }
    }
    const alRedimensionar = () => {
      altoCuerpo = cuerpo.current?.offsetHeight ?? 0
      alMover()
    }

    addEventListener('scroll', alMover, { passive: true })
    addEventListener('resize', alRedimensionar, { passive: true })
    alRedimensionar()
    return () => {
      removeEventListener('scroll', alMover)
      removeEventListener('resize', alRedimensionar)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="pb-viajero" data-visible={visible || undefined} aria-hidden="true">
      <div className="pb-viajero__cuerpo" ref={cuerpo}>
        <p className="pb-globo pb-globo--arriba" key={seccion}>
          {frase}
        </p>
        <div className="pb-viajero__inclina" ref={inclinable}>
          <div className="pb-flota" data-cerca={visible || undefined}>
            <div className="pb-viajero__salto" ref={salto}>
              {vistas.map((n) => (
                <div className="pb-viajero__pose" data-on={n === pose || undefined} key={n}>
                  <Memoji nombre={n} alt="" sizes="190px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
