import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight, ArrowRight } from '../../Components/Logo/icons'
import Media from '../../Components/Media/media'
import Galeria from '../../Components/Galeria/galeria'
import NotFound from '../NotFound/notfound'
import { getProject, getNext } from '../../data/projects'
import { useReveal } from '../../hooks/useReveal'
import { useMeta } from '../../hooks/useMeta'
import './project.css'

function Project() {
  const { slug } = useParams()
  const p = getProject(slug)
  useReveal()
  useMeta(
    p
      ? {
          title: `${p.name} — ${p.what} | Pedro Baez`,
          description: p.resumen,
          path: `/proyectos/${p.slug}`,
        }
      : {},
  )

  if (!p) return <NotFound />

  const next = getNext(slug)
  const ficha = [
    { k: 'Proyecto', v: p.name },
    { k: 'Rubro', v: p.kind },
    { k: 'Qué hice', v: p.rol },
    { k: 'Año', v: p.year },
  ]

  return (
    <article className="pb-proj">
      <div className="container">
        <nav className="pb-proj__crumbs" aria-label="Migas de pan">
          <Link className="pb-mono pb-proj__back" to="/#trabajos">
            <ArrowRight width={13} height={13} className="pb-proj__back-arrow" />
            Todos los trabajos
          </Link>
        </nav>

        <header className="pb-proj__head">
          <p className="pb-mono pb-muted pb-proj__kicker">
            {p.kind} <span aria-hidden="true">/</span> {p.year}
          </p>
          <h1 className="pb-display pb-proj__title">{p.name}</h1>
          <p className="pb-lead pb-proj__resumen">{p.resumen}</p>
        </header>

        <Media
          src={p.portada}
          alt={`Pantalla principal del sitio de ${p.name}`}
          ratio="16 / 10"
          nota="Poné acá la captura principal (1600×1000)"
          className="pb-proj__portada pb-reveal"
          prioridad
        />

        <dl className="pb-proj__ficha pb-reveal">
          {ficha.map((f) => (
            <div key={f.k}>
              <dt className="pb-mono pb-muted">{f.k}</dt>
              <dd className="pb-proj__ficha-v">{f.v}</dd>
            </div>
          ))}
          {p.sitio && (
            <div>
              <dt className="pb-mono pb-muted">Sitio</dt>
              <dd className="pb-proj__ficha-v">
                <a
                  className="pb-proj__site"
                  href={`https://${p.sitio}`}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {p.sitio}
                  <ArrowUpRight width={14} height={14} />
                </a>
              </dd>
            </div>
          )}
        </dl>

        <section className="pb-proj__stack pb-reveal">
          <h2 className="pb-mono pb-muted pb-proj__sub">Con qué está hecho</h2>
          <ul>
            {p.stack.map((t) => (
              <li className="pb-tag" key={t}>
                {t}
              </li>
            ))}
          </ul>
        </section>

        <div className="pb-proj__caso">
          <section className=" pb-reveal">
            <h2 className="pb-mono pb-muted pb-proj__sub">El problema</h2>
            <p className="pb-proj__texto">{p.desafio}</p>
          </section>
          <section className=" pb-reveal">
            <h2 className="pb-mono pb-muted pb-proj__sub">Lo que hicimos</h2>
            <p className="pb-proj__texto">{p.solucion}</p>
            <ul className="pb-proj__entregables">
              {p.entregables.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="pb-proj__galeria-wrap">
        <div className="container">
          <h2 className="pb-mono pb-muted pb-proj__sub pb-reveal">Cómo quedó</h2>
          <Galeria items={p.galeria} />
        </div>
      </section>

      {/* Bloques extra: partes del proyecto que no se cuentan con las mismas
          capturas, como un panel interno o los permisos por rol. */}
      {p.bloques?.map((b) => (
        <section className="pb-proj__bloque" key={b.titulo}>
          <div className="container">
            <header className="pb-proj__bloque-head pb-reveal">
              <h2 className="pb-display pb-proj__bloque-title">{b.titulo}</h2>
              <p className="pb-proj__texto">{b.texto}</p>
            </header>

            {b.lista && (
              <dl className="pb-proj__roles pb-reveal">
                {b.lista.map((r) => (
                  <div key={r.k}>
                    <dt className="pb-display pb-proj__rol-k">{r.k}</dt>
                    <dd className="pb-proj__rol-v">{r.v}</dd>
                  </div>
                ))}
              </dl>
            )}

            {b.galeria.length > 0 && <Galeria items={b.galeria} />}
          </div>
        </section>
      ))}

      <div className="container">
        {p.video && (
          <section className="pb-proj__video pb-reveal">
            <h2 className="pb-mono pb-muted pb-proj__sub">El sitio andando</h2>
            <Media
              src={p.video}
              alt={`Recorrido por el sitio de ${p.name}`}
              kind="video"
              ratio="16 / 9"
            />
          </section>
        )}

        <section className="pb-proj__resultados pb-reveal">
          <h2 className="pb-mono pb-muted pb-proj__sub">En números</h2>
          <ul>
            {p.datos.map((r) => (
              <li key={r.label}>
                <span className="pb-display pb-proj__res-n">{r.n}</span>
                <span className="pb-mono pb-muted">{r.label}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {p.testimonio && (
        <section className="pb-inverse pb-proj__quote">
          <div className="container">
            <figure className="pb-reveal">
              <blockquote>
                <p className="pb-display pb-proj__quote-text">{p.testimonio.quote}</p>
              </blockquote>
              <figcaption className="pb-proj__quote-by">
                <span className="pb-quote__avatar" aria-hidden="true">
                  <span className="pb-mono">{p.testimonio.initials}</span>
                </span>
                <span>
                  <span className="pb-display pb-proj__quote-name">{p.testimonio.name}</span>
                  <span className="pb-mono pb-muted">{p.testimonio.role}</span>
                </span>
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <div className="container">
        <section className="pb-proj__next pb-reveal">
          <p className="pb-mono pb-muted pb-proj__sub">Siguiente proyecto</p>
          <Link className="pb-proj__next-link" to={`/proyectos/${next.slug}`}>
            <span className="pb-proj__next-mock">
              <img
                src={next.portada}
                alt={`Pantalla principal de ${next.name}`}
                width={1400}
                height={875}
                loading="lazy"
                decoding="async"
              />
            </span>
            <span className="pb-proj__next-text">
              <span className="pb-display pb-proj__next-name">
                {next.name}
                <ArrowUpRight width={22} height={22} />
              </span>
              <span className="pb-muted">
                {next.kind} <span aria-hidden="true">—</span> {next.what}
              </span>
            </span>
          </Link>
        </section>

        <section className="pb-proj__cta pb-reveal">
          <h2 className="pb-display pb-proj__cta-title">
            ¿Tenés algo parecido en mente?
          </h2>
          <a className="pb-btn pb-btn--red" href="/#contacto">
            Empecemos tu proyecto <ArrowUpRight />
          </a>
        </section>
      </div>
    </article>
  )
}
export default Project
