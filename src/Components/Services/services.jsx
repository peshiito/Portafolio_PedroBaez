import { useId, useState } from 'react'
import { Plus, Minus, ArrowUpRight } from '../Logo/icons'
import './services.css'

const SERVICES = [
  {
    code: 'SRV—01',
    name: 'Sitio institucional',
    blurb:
      'La casa de tu negocio en internet. Quién sos, qué hacés, por qué conviene elegirte y cómo te encuentran. Pensado para que alguien que te googlea a las once de la noche entienda todo sin llamarte.',
    tags: ['Hasta 6 secciones', 'Textos incluidos', 'Google Maps y horarios', 'Entrega en 3 semanas'],
  },
  {
    code: 'SRV—02',
    name: 'Landing de campaña',
    blurb:
      'Una sola página con un solo objetivo. Pensada para que la plata que ponés en publicidad termine en consultas y no en visitas que se van a los diez segundos.',
    tags: ['Copy persuasivo', 'Formulario a tu mail', 'Listo en 2 semanas', 'Métricas configuradas'],
  },
  {
    code: 'SRV—03',
    name: 'Tienda online',
    blurb:
      'Catálogo, carrito y cobro con tarjeta o transferencia. Cargás vos los productos desde el celular, sin depender de nadie ni pagar comisión por venta a una plataforma.',
    tags: ['Mercado Pago', 'Panel de carga', 'Cálculo de envíos', 'Stock y variantes'],
  },
  {
    code: 'SRV—04',
    name: 'Rediseño y migración',
    blurb:
      'Ya tenés sitio pero te da vergüenza mandarlo. Lo rehago conservando lo que Google ya sabe de vos, así no perdés las posiciones que te costaron años.',
    tags: ['Redirecciones 301', 'Sin perder posiciones', 'Contenido migrado', 'Mejora de velocidad'],
  },
  {
    code: 'SRV—05',
    name: 'Mantenimiento mensual',
    blurb:
      'Cambios chicos, respaldos, actualizaciones y alguien que atiende el teléfono cuando algo se rompe. Sin contrato de permanencia: si no lo necesitás, lo cortás.',
    tags: ['Cambios ilimitados', 'Respaldo semanal', 'Sin permanencia', 'Reporte mensual'],
  },
]

function Services() {
  // Arranca con la landing abierta: es el servicio que más piden.
  const [open, setOpen] = useState(1)
  const uid = useId()

  return (
    <section className="pb-section" id="servicios">
      <div className="container">
        <header className="pb-head pb-reveal">
          <div>
            <p className="pb-mono pb-head__label">(01) Servicios</p>
            <h2 className="pb-display pb-d2">Qué puedo hacer por tu negocio</h2>
          </div>
          <p className="pb-lead pb-muted">
            Cinco formas de empezar. Cada una se arma según lo que tu negocio necesita, no según un
            paquete cerrado que no sabe nada de vos.
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
