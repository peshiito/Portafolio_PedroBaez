import { lazy, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../../Components/Hero/hero'
import Marquee from '../../Components/Marquee/marquee'
import WhatsAppFlotante from '../../Components/WhatsAppFlotante/whatsappflotante'
import Diferido from '../../Components/Diferido/diferido'
import { MemojiViajero } from '../../Components/Memoji/memoji'
import { SECCIONES } from '../../data/memojis'
import { useReveal } from '../../hooks/useReveal'
import { useMeta } from '../../hooks/useMeta'
import { irASeccion, useSeccionesMontadas } from '../../hooks/seccionesDiferidas'

// Lo que no se ve al entrar se descarga recién cuando te acercás
const Services = lazy(() => import('../../Components/Services/services'))
const Compare = lazy(() => import('../../Components/Compare/compare'))
const Process = lazy(() => import('../../Components/Process/process'))
const Work = lazy(() => import('../../Components/Work/work'))
const Testimonials = lazy(() => import('../../Components/Testimonials/testimonials'))
const Faq = lazy(() => import('../../Components/Faq/faq'))
const Contact = lazy(() => import('../../Components/Contact/contact'))

function Home() {
  const montadas = useSeccionesMontadas()
  const { hash } = useLocation()
  useReveal(montadas)
  useMeta({
    title: 'Pedro Baez — Diseño y desarrollo web para negocios',
    description:
      'Hago sitios web a medida para negocios que ya funcionan bien en persona. Pymes, comercios y emprendimientos. Entrega en dos semanas.',
    path: '/',
  })

  // Si se llega con un ancla (desde otra página o un link), esa sección tiene que existir
  useEffect(() => {
    const id = hash.slice(1)
    if (id in SECCIONES) irASeccion(id, 'instant')
  }, [hash])

  // Los enlaces del menú y los botones pueden apuntar a una sección que todavía no llegó
  useEffect(() => {
    const alClic = (e) => {
      const enlace = e.target.closest?.('a[href^="#"]')
      const id = enlace?.getAttribute('href').slice(1)
      if (!id || !(id in SECCIONES)) return
      e.preventDefault()
      history.pushState(null, '', `#${id}`)
      irASeccion(id)
    }
    document.addEventListener('click', alClic)
    return () => document.removeEventListener('click', alClic)
  }, [])

  return (
    <div className="pb-home">
      <Hero />
      <Marquee />
      <Diferido alto={1450} altoMovil={1360}>
        <Services />
      </Diferido>
      <Diferido alto={1260} altoMovil={1570}>
        <Compare />
      </Diferido>
      <Diferido alto={830} altoMovil={1190}>
        <Process />
      </Diferido>
      <Diferido alto={3090} altoMovil={3460}>
        <Work />
      </Diferido>
      <Diferido alto={1040} altoMovil={900}>
        <Testimonials />
      </Diferido>
      <Diferido alto={920} altoMovil={910}>
        <Faq />
      </Diferido>
      <Diferido alto={1140} altoMovil={1440}>
        <Contact />
      </Diferido>
      <WhatsAppFlotante />
      <MemojiViajero />
    </div>
  )
}
export default Home
