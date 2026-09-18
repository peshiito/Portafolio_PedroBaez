import { useState } from 'react'
import { ArrowUpRight, ArrowRight } from '../Logo/icons'
import SiteMock from '../SiteMock/sitemock'
import { PROJECTS } from '../../data/projects'
import './hero.css'

// Los tres salen de algo comprobable y ninguno habla de antigüedad: para
// alguien que recién arranca, el trabajo mostrado pesa más que los años.
const STATS = [
  { n: String(PROJECTS.length), label: 'Proyectos construidos' },
  { n: '100 %', label: 'Código propio, sin plantillas' },
  { n: 'Hoy', label: 'Te contesto el mismo día' },
]

// La maqueta no es de ningún cliente: es un sitio genérico en los colores de
// la marca, para que se lea como ejemplo y no como trabajo real.
const DEMO = {
  layout: 'editorial',
  ink: '#3a352f',
  paper: '#edebe7',
  accent: '#ff3131',
}

function Hero() {
  // Mientras no exista /portrait.jpg, la presentación usa el monograma.
  const [hasPhoto, setHasPhoto] = useState(true)

  return (
    <section className="pb-hero" id="inicio">
      <div className="container">
        <p className="pb-mono pb-hero__eyebrow pb-muted">
          Diseño y desarrollo web <span aria-hidden="true">/</span> Argentina{' '}
          <span aria-hidden="true">/</span> Est. 2026
        </p>

        <div className="pb-hero__top">
          <div className="pb-hero__claim">
            <div className="pb-hero__me">
              <span className="pb-hero__avatar">
                {hasPhoto ? (
                  <img
                    src="/portrait.jpg"
                    alt="Pedro Baez"
                    width={112}
                    height={112}
                    onError={() => setHasPhoto(false)}
                  />
                ) : (
                  <span className="pb-mono" aria-hidden="true">
                    PB
                  </span>
                )}
              </span>
              <h1 className="pb-display pb-hero__title">
                Hola, soy <span className="pb-hero__title-red">Pedro Baez</span>
              </h1>
            </div>

            <p className="pb-lead pb-hero__lead">
              Diseño y programo sitios web a medida para negocios que ya funcionan bien en persona.
              Trabajo con pocos clientes a la vez, así que el que me escribe habla conmigo.
            </p>

            <div className="pb-hero__actions">
              <a className="pb-btn pb-btn--red" href="#contacto">
                Empecemos tu proyecto <ArrowUpRight />
              </a>
              <a className="pb-link" href="#trabajos">
                Ver trabajos <ArrowRight width={14} height={14} />
              </a>
            </div>
          </div>

          {/* Se arma sola al cargar: es lo que hace el servicio, en chico */}
          <div className="pb-hero__mock">
            <SiteMock p={DEMO} building />
            <p className="pb-mono pb-hero__mock-note pb-muted">
              <span className="pb-hero__mock-dot" aria-hidden="true" />
              Así arranca cada proyecto
            </p>
          </div>
        </div>

        <ul className="pb-hero__stats">
          {STATS.map((s) => (
            <li key={s.label}>
              <span className="pb-display pb-hero__stat-n">{s.n}</span>
              <span className="pb-mono pb-muted">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
export default Hero
