import { useEffect, useRef, useState } from 'react'
import Avatar from '../Avatar/avatar'
import './companero.css'

/**
 * El avatar que acompaña el scroll. Aparece cuando el del inicio sale de
 * pantalla y se queda en la esquina: se balancea mientras bajás, se inclina
 * para el lado al que vas y cambia de pose según la sección.
 *
 * La frase de cada sección se muestra una sola vez y se va sola. Es
 * decorativo: todo lo que dice ya está escrito en la página.
 */
const SECCIONES = {
  servicios: { pose: 'senala', frase: 'Elegí por dónde empezar.' },
  comparativa: { pose: 'neutral', frase: 'Esto es lo que cambia.' },
  proceso: { pose: 'neutral', frase: 'Así trabajamos juntos.' },
  trabajos: { pose: 'senala', frase: 'Entrá a cualquiera, se ven por dentro.' },
  preguntas: { pose: 'piensa', frase: '¿Dudas? Acá están las de siempre.' },
  contacto: { pose: 'saluda', frase: 'Escribime, te contesto hoy.' },
}

function Companero() {
  const [visible, setVisible] = useState(false)
  const [seccion, setSeccion] = useState(null)
  const [frase, setFrase] = useState(null)
  const cuerpo = useRef(null)
  const dichas = useRef(new Set())

  // Aparece cuando el avatar del inicio deja de verse
  useEffect(() => {
    const ancla = document.querySelector('.pb-hero__avatar')
    if (!ancla) return
    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting && e.boundingClientRect.top < 0))
    io.observe(ancla)
    return () => io.disconnect()
  }, [])

  // La sección que ocupa el centro de la pantalla manda la pose
  useEffect(() => {
    const els = Object.keys(SECCIONES)
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setSeccion(e.target.id))
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Una frase por sección, una sola vez, y se va a los 3,2 s
  useEffect(() => {
    if (!visible || !seccion || dichas.current.has(seccion)) return
    dichas.current.add(seccion)
    setFrase(SECCIONES[seccion].frase)
    const t = setTimeout(() => setFrase(null), 3200)
    return () => clearTimeout(t)
  }, [visible, seccion])

  // Balanceo con el scroll. Se escribe el transform directo en el nodo:
  // pasa en cada cuadro y no tiene por qué re-renderizar React.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ultimoY = scrollY
    let ultimoT = performance.now()
    let objetivo = 0
    let giro = 0
    let cuadro = 0

    const paso = () => {
      // Resorte simple hacia el objetivo, que a su vez decae a cero
      giro += (objetivo - giro) * 0.14
      objetivo *= 0.9
      const vaiven = Math.sin(scrollY / 70) * 3
      if (cuerpo.current) {
        cuerpo.current.style.transform = `translate(${giro * 1.1 + vaiven}px, ${Math.abs(vaiven) * -0.6}px) rotate(${giro}deg)`
      }
      cuadro = Math.abs(giro) > 0.05 || Math.abs(objetivo) > 0.05 ? requestAnimationFrame(paso) : 0
    }

    const alScrollear = () => {
      const t = performance.now()
      const v = (scrollY - ultimoY) / Math.max(16, t - ultimoT)
      ultimoY = scrollY
      ultimoT = t
      // Bajando se inclina a la derecha, subiendo a la izquierda
      objetivo = Math.max(-9, Math.min(9, v * 6))
      if (!cuadro) cuadro = requestAnimationFrame(paso)
    }

    window.addEventListener('scroll', alScrollear, { passive: true })
    return () => {
      window.removeEventListener('scroll', alScrollear)
      cancelAnimationFrame(cuadro)
    }
  }, [])

  const pose = SECCIONES[seccion]?.pose ?? 'neutral'

  return (
    <div className="pb-comp" data-visible={visible || undefined} aria-hidden="true">
      <p className="pb-comp__globo" data-on={(visible && frase) || undefined}>
        {frase}
      </p>
      <div className="pb-comp__cuerpo" ref={cuerpo}>
        <Avatar pose={pose} />
      </div>
    </div>
  )
}
export default Companero
