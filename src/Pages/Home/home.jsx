import Hero from '../../Components/Hero/hero'
import Marquee from '../../Components/Marquee/marquee'
import Services from '../../Components/Services/services'
import Compare from '../../Components/Compare/compare'
import Process from '../../Components/Process/process'
import Work from '../../Components/Work/work'
import Testimonials from '../../Components/Testimonials/testimonials'
import Faq from '../../Components/Faq/faq'
import Contact from '../../Components/Contact/contact'
import WhatsAppFlotante from '../../Components/WhatsAppFlotante/whatsappflotante'
import { useReveal } from '../../hooks/useReveal'
import { useMeta } from '../../hooks/useMeta'

function Home() {
  useReveal()
  useMeta({
    title: 'Pedro Baez — Diseño y desarrollo web para negocios',
    description:
      'Hago sitios web a medida para negocios que ya funcionan bien en persona. Pymes, comercios y emprendimientos. Entrega en dos semanas.',
    path: '/',
  })

  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Compare />
      <Process />
      <Work />
      <Testimonials />
      <Faq />
      <Contact />
      <WhatsAppFlotante />
    </>
  )
}
export default Home
