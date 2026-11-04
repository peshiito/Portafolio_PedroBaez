import { useId, useState } from 'react'
import { Plus, Minus, ArrowUpRight } from '../Logo/icons'
import { MemojiCarril } from '../Memoji/memoji'
import './services.css'

const SERVICES = [
  {
    code: 'SRV—01',
    name: 'Sitio institucional',
    blurb:
      'Quién sos, qué hacés y cómo te encuentran, para que te entiendan sin tener que llamarte.',
    tags: ['Hasta 6 secciones', 'Textos incluidos', 'Google Maps y horarios', 'Entrega en 3 semanas'],
  },
  {
    code: 'SRV—02',
    name: 'Landing de campaña',
    blurb:
      'Una sola página con un solo objetivo: que la plata que ponés en publicidad termine en consultas.',
    tags: ['Copy persuasivo', 'Formulario a tu mail', 'Listo en 2 semanas', 'Métricas configuradas'],
  },
  {
    code: 'SRV—03',
    name: 'Tienda online',
    blurb:
      'Catálogo, carrito y cobro con tarjeta o transferencia. Cargás los productos desde el celular, sin pagarle comisión a una plataforma.',
    tags: ['Mercado Pago', 'Panel de carga', 'Cálculo de envíos', 'Stock y variantes'],
  },
  {
    code: 'SRV—04',
    name: 'Rediseño y migración',
    blurb:
      'Rehago tu sitio conservando lo que Google ya sabe de vos, para que no pierdas posiciones.',
    tags: ['Redirecciones 301', 'Sin perder posiciones', 'Contenido migrado', 'Mejora de velocidad'],
  },
  {
    code: 'SRV—05',
    name: 'Mantenimiento mensual',
    blurb:
      'Cambios, respaldos y alguien que atiende cuando algo se rompe. Sin permanencia: si no lo necesitás, lo cortás.',
    tags: ['Cambios ilimitados', 'Respaldo semanal', 'Sin permanencia', 'Reporte mensual'],
  },
]

function Services() {
  // Arranca con la landing abierta: es el servicio que más piden.
  const [open, setOpen] = useState(1)
  const uid = useId()

  return (
    <section className="pb-section" id="servicios">
      <MemojiCarril
        tipo="inicio"
        seccion="servicios"
        nombre="servicios"
        alt="Memoji de Pedro con el dedo en alto y una lamparita encendida"
      />
      <div className="container">
        <header className="pb-head pb-reveal">
          <div>
            <p className="pb-mono pb-head__label">(01) Servicios</p>
            <h2 className="pb-display pb-d2">Qué puedo hacer por tu negocio</h2>
          </div>
          <p className="pb-lead pb-muted">
            Cinco formas de empezar, según lo que necesite tu negocio.
          </p>
        </header>

        <ul className="pb-svc">
          {SERVICES.map((s, i) => {
            const isOpen = open === i
            const panelId = `${uid}-panel-${i}`
            const btnId = `${uid}-btn-${i}`
            return (
              <li
                key={s.code}
                className={`pb-svc__row pb-reveal ${isOpen ? 'is-open' : ''}`}
              >
                <h3 className="pb-svc__heading">
                  <button
                    type="button"
                    id={btnId}
                    className="pb-svc__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="pb-mono pb-svc__code">{s.code}</span>
                    <span className="pb-display pb-svc__name">{s.name}</span>
                    <span className="pb-svc__icon" aria-hidden="true">
                      {isOpen ? <Minus width={18} height={18} /> : <Plus width={18} height={18} />}
                    </span>
                  </button>
                </h3>

                <div
                  className="pb-svc__panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  inert={!isOpen}
                >
                  <div className="pb-svc__clip">
                    <div className="pb-svc__panel-inner">
                      <p className="pb-svc__blurb">{s.blurb}</p>
                      <ul className="pb-svc__tags">
                        {s.tags.map((t) => (
                          <li className="pb-tag" key={t}>
                            {t}
                          </li>
                        ))}
                      </ul>
                      <a className="pb-link pb-svc__cta" href="#contacto">
                        Hablemos de esto <ArrowUpRight width={14} height={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
export default Services
