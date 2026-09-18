import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from '../Logo/icons'
import { PROJECTS } from '../../data/projects'
import './work.css'

function Work() {
  return (
    <section className="pb-section" id="trabajos">
      <div className="container">
        <header className="pb-head pb-reveal">
          <div>
            <p className="pb-mono pb-head__label">(04) Trabajos</p>
            <h2 className="pb-display pb-d2">Proyectos que construí</h2>
          </div>
          <p className="pb-lead pb-muted">
            Sitios y sistemas completos, de la primera pantalla a la base de datos. Entrá a
            cualquiera para ver cómo está hecho por dentro.
          </p>
        </header>

        <ul className="pb-work">
          {PROJECTS.map((p) => (
            <li className="pb-work__item pb-reveal" key={p.slug}>
              <Link className="pb-work__link" to={`/proyectos/${p.slug}`}>
                <span className="pb-work__media">
                  <img
                    src={p.portada}
                    alt={`Pantalla principal del sitio de ${p.name}`}
                    width={1400}
                    height={875}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="pb-work__meta">
                  <span className="pb-display pb-work__name">
                    {p.name}
                    <ArrowUpRight className="pb-work__arrow" width={20} height={20} />
                  </span>
                  <span className="pb-mono pb-muted pb-work__year">{p.year}</span>
                </span>
                <span className="pb-work__desc pb-muted">
                  {p.kind} <span aria-hidden="true">—</span> {p.what}
                </span>
                <span className="pb-work__stack">
                  {p.stack.slice(0, 4).map((t) => (
                    <span className="pb-mono pb-work__chip" key={t}>
                      {t}
                    </span>
                  ))}
                  {p.stack.length > 4 && (
                    <span className="pb-mono pb-work__chip">+{p.stack.length - 4}</span>
                  )}
                </span>
                <span className="pb-mono pb-work__more">
                  Ver el proyecto <ArrowRight width={13} height={13} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
export default Work
