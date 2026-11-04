import { Link } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from '../Logo/icons'
import { PROJECTS } from '../../data/projects'
import { MemojiCarril, MemojiLeve } from '../Memoji/memoji'
import './work.css'

// Qué Memoji acompaña a cada proyecto, según el tipo de sitio que es
const MEMOJI = {
  comanda: { nombre: 'comanda', alt: 'Memoji de Pedro llevando una bandeja con un plato de comida' },
  'oficio-barberia': { nombre: 'barberia', alt: 'Memoji de Pedro con una tijera y un peine de barbero' },
  'tienda-recargas': { nombre: 'tienda', alt: 'Memoji de Pedro con un diamante en la mano' },
  'hardstore-asesor': { nombre: 'chatbot', alt: 'Memoji de Pedro con un robotito en la mano' },
  gimnasio: { nombre: 'institucional', alt: 'Memoji de Pedro pensando, con la mano en el mentón' },
  'itech-solutions': { nombre: 'landing', alt: 'Memoji de Pedro mostrando un celular' },
  vetclinic: { nombre: 'institucional', alt: 'Memoji de Pedro pensando, con la mano en el mentón' },
}

function Work() {
  return (
    <section className="pb-section" id="trabajos">
      <MemojiCarril
        haciaDerecha={false}
        seccion="trabajos"
        nombre="chatbot"
        alt="Memoji de Pedro con un robotito en la mano"
      />
      <div className="container">
        <header className="pb-head pb-reveal">
          <div>
            <p className="pb-mono pb-head__label">(04) Trabajos</p>
            <h2 className="pb-display pb-d2">Proyectos que construí</h2>
          </div>
          <p className="pb-lead pb-muted">
            Sitios y sistemas completos. Entrá a cualquiera para ver cómo está hecho por dentro.
          </p>
        </header>

        <ul className="pb-work">
          {PROJECTS.map((p) => (
            <li className="pb-work__item pb-reveal" key={p.slug}>
              <Link className="pb-work__link" to={`/proyectos/${p.slug}`}>
                <span className="pb-work__figura">
                  <span className="pb-work__media">
                    <img
                      src={p.tarjeta ?? p.portada}
                      alt={`Pantalla principal del sitio de ${p.name}`}
                      width={1400}
                      height={875}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  {MEMOJI[p.slug] && <MemojiLeve className="pb-work__memoji" {...MEMOJI[p.slug]} />}
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
