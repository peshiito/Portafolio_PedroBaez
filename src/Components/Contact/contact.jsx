import { useEffect, useRef, useState } from 'react'
import { Mail, Phone, Pin, ArrowUpRight } from '../Logo/icons'
import { WhatsAppIcon } from '../Logo/whatsapp'
import { CONTACTO, linkWhatsApp } from '../../data/contacto'
import './contact.css'

const NEEDS = [
  'Todavía no sé, quiero asesorarme',
  'Sitio institucional',
  'Landing de campaña',
  'Tienda online',
  'Rediseño de un sitio que ya tengo',
  'Mantenimiento mensual',
]

function Contact() {
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})
  const [fallo, setFallo] = useState('')
  const formRef = useRef(null)
  // Marca de cuándo se mostró el formulario: un envío instantáneo es un bot.
  // Se toma en un efecto porque leer el reloj durante el render es impuro.
  const abierto = useRef(0)
  useEffect(() => {
    abierto.current = Date.now()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next = {}
    if (!String(data.get('nombre') || '').trim()) next.nombre = 'Poné tu nombre así sé cómo llamarte.'
    const email = String(data.get('email') || '').trim()
    if (!email) next.email = 'Necesito un mail para contestarte.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Revisá el mail, parece incompleto.'
    if (!String(data.get('mensaje') || '').trim()) next.mensaje = 'Contame aunque sea dos renglones.'

    setErrors(next)
    setFallo('')

    if (Object.keys(next).length) {
      // El foco va al primer campo con problema, no al principio del formulario
      const first = formRef.current?.querySelector(`[name="${Object.keys(next)[0]}"]`)
      first?.focus()
      return
    }

    setStatus('sending')
    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(data), t: abierto.current || Date.now() }),
      })
      if (r.ok) {
        setStatus('sent')
        return
      }
      const cuerpo = await r.json().catch(() => ({}))
      if (cuerpo.errores) {
        // El servidor valida de nuevo: si algo no pasó, se muestra igual
        setErrors(cuerpo.errores)
        formRef.current?.querySelector(`[name="${Object.keys(cuerpo.errores)[0]}"]`)?.focus()
      } else {
        setFallo(cuerpo.error || 'No pudimos enviar el mensaje. Probá por WhatsApp.')
      }
      setStatus('idle')
    } catch {
      setFallo('No pudimos enviar el mensaje. Revisá tu conexión o escribime por WhatsApp.')
      setStatus('idle')
    }
  }

  return (
    <section className="pb-section pb-contact" id="contacto">
      <div className="container pb-contact__grid">
        <div className="pb-contact__aside pb-reveal">
          <p className="pb-mono pb-head__label">(07) Hablemos</p>
          <h2 className="pb-display pb-contact__title">
            Contame qué necesitás y vemos cómo resolverlo.{' '}
            <span className="pb-contact__title-red">Sin compromiso.</span>
          </h2>

          <div className="pb-contact__rapido">
            <a
              className="pb-btn pb-btn--red pb-contact__wa"
              href={linkWhatsApp('Hola Pedro, vi tu portafolio y quiero hacerte una consulta.')}
              target="_blank"
              rel="noreferrer noopener"
            >
              <WhatsAppIcon width={20} height={20} />
              Escribime por WhatsApp
            </a>
            <p className="pb-mono pb-muted pb-contact__wa-nota">
              Es por donde más rápido contesto
            </p>
          </div>

          <ul className="pb-contact__channels">
            <li>
              <Mail />
              <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a>
            </li>
            <li>
              <Phone />
              <a href={linkWhatsApp()} target="_blank" rel="noreferrer noopener">
                {CONTACTO.whatsappVisible}
              </a>
            </li>
            <li>
              <Pin />
              <span>{CONTACTO.ciudad}</span>
            </li>
          </ul>
        </div>

        <div className="pb-contact__card pb-reveal">
          <p className="pb-mono pb-muted pb-contact__card-titulo">
            O contame bien de qué se trata
          </p>
          {status === 'sent' ? (
            <div className="pb-contact__done" role="status" aria-live="polite">
              <p className="pb-display pb-contact__done-title">Listo, me llegó.</p>
              <p className="pb-muted">
                Te contesto hoy mismo al mail que dejaste. Si no querés esperar, escribime
                por WhatsApp y lo hablamos ahora.
              </p>
              <button
                type="button"
                className="pb-link pb-contact__again"
                onClick={() => setStatus('idle')}
              >
                Mandar otro mensaje
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="pb-field">
                <label className="pb-mono" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  placeholder="Mariela Ocampo"
                  aria-invalid={!!errors.nombre}
                  aria-describedby={errors.nombre ? 'err-nombre' : undefined}
                />
                {errors.nombre && (
                  <p className="pb-field__error" id="err-nombre">
                    {errors.nombre}
                  </p>
                )}
              </div>

              <div className="pb-field">
                <label className="pb-mono" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  placeholder="mariela@brumacafe.ar"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                />
                {errors.email && (
                  <p className="pb-field__error" id="err-email">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="pb-field">
                <label className="pb-mono" htmlFor="negocio">
                  De qué es tu negocio
                </label>
                <input
                  id="negocio"
                  name="negocio"
                  type="text"
                  autoComplete="organization"
                  placeholder="Cafetería de especialidad en Palermo"
                />
              </div>

              <div className="pb-field">
                <label className="pb-mono" htmlFor="necesita">
                  Qué necesitás
                </label>
                <select id="necesita" name="necesita" defaultValue={NEEDS[0]}>
                  {NEEDS.map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div className="pb-field">
                <label className="pb-mono" htmlFor="mensaje">
                  Contame un poco más
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  placeholder="Tengo la cafetería hace tres años y vendo sobre todo por Instagram…"
                  aria-invalid={!!errors.mensaje}
                  aria-describedby={errors.mensaje ? 'err-mensaje' : undefined}
                />
                {errors.mensaje && (
                  <p className="pb-field__error" id="err-mensaje">
                    {errors.mensaje}
                  </p>
                )}
              </div>

              {/* Trampa para bots: oculta a la vista y al lector de pantalla,
                  fuera del orden de tabulación. Una persona no la completa. */}
              <div className="pb-oculto" aria-hidden="true">
                <label htmlFor="apellido">No completes este campo</label>
                <input id="apellido" name="apellido" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {fallo && (
                <p className="pb-field__error pb-contact__fallo" role="alert">
                  {fallo}{' '}
                  <a
                    href={linkWhatsApp('Hola Pedro, quise escribirte por el formulario y no pude.')}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Escribime por WhatsApp
                  </a>
                </p>
              )}

              <button type="submit" className="pb-btn pb-btn--red pb-btn--block" disabled={status === 'sending'}>
                {status === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                {status !== 'sending' && <ArrowUpRight />}
              </button>

              <p className="pb-mono pb-muted pb-contact__promise">
                Te contesto hoy mismo · Sin compromiso
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
export default Contact
