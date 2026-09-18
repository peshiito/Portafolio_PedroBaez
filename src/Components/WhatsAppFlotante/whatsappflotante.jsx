import { useEffect, useState } from 'react'
import { WhatsAppIcon } from '../Logo/whatsapp'
import { linkWhatsApp } from '../../data/contacto'
import './whatsappflotante.css'

/**
 * Atajo a WhatsApp que acompaña el scroll.
 *
 * Aparece recién después del hero: arriba de todo competiría con el llamado
 * principal, y en el hero el botón ya está a la vista.
 */
function WhatsAppFlotante() {
  const [pasoElHero, setPasoElHero] = useState(false)
  const [enContacto, setEnContacto] = useState(false)

  useEffect(() => {
    const onScroll = () => setPasoElHero(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // En la sección de contacto el botón ya está en la página, y además este
  // quedaba encima del de enviar, los dos en rojo.
  useEffect(() => {
    const seccion = document.querySelector('#contacto')
    if (!seccion || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setEnContacto(e.isIntersecting), {
      rootMargin: '-25% 0px -10% 0px',
    })
    io.observe(seccion)
    return () => io.disconnect()
  }, [])

  const visible = pasoElHero && !enContacto

  return (
    <a
      className={`pb-wa ${visible ? 'is-in' : ''}`}
      href={linkWhatsApp('Hola Pedro, vi tu portafolio y quiero hacerte una consulta.')}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Escribime por WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <WhatsAppIcon width={22} height={22} />
      <span className="pb-wa__texto">Escribime</span>
    </a>
  )
}
export default WhatsAppFlotante
