import './testimonials.css'

const SECONDARY = [
  {
    quote:
      'Le mandé un logo y tres fotos y me devolvió algo que parecía de una empresa mucho más grande que la mía.',
    name: 'Julián Ferrer',
    role: 'Socio en Estudio Lindero',
    initials: 'JF',
  },
  {
    quote:
      'Lo que más valoro es que puedo cambiar los precios del catálogo yo misma, sin llamar a nadie ni esperar a que me contesten.',
    name: 'Andrea Quiroga',
    role: 'Herrería Sur',
    initials: 'AQ',
  },
]

function Avatar({ initials }) {
  return (
    <span className="pb-quote__avatar" aria-hidden="true">
      <span className="pb-mono">{initials}</span>
    </span>
  )
}

function Testimonials() {
  return (
    <section className="pb-section pb-inverse pb-tstm" aria-labelledby="tstm-title">
      <div className="container">
        <p className="pb-mono pb-head__label pb-tstm__label pb-reveal" id="tstm-title">
          (05) Lo que dicen
        </p>

        <figure className="pb-tstm__main pb-reveal">
          <blockquote>
            <p className="pb-display pb-tstm__quote">
              Pedí presupuesto a cuatro personas. Pedro fue el único que me preguntó cómo funcionaba
              mi negocio antes de pasarme un número.{' '}
              <em className="pb-tstm__hl">En dos semanas estaba online.</em>
            </p>
          </blockquote>
          <figcaption className="pb-tstm__by">
            <Avatar initials="MO" />
            <span>
              <span className="pb-display pb-tstm__name">Mariela Ocampo</span>
              <span className="pb-mono pb-muted">Dueña de Bruma Café</span>
            </span>
          </figcaption>
        </figure>

        <ul className="pb-tstm__more">
          {SECONDARY.map((t) => (
            <li key={t.name} className="pb-reveal">
              <figure>
                <blockquote>
                  <p className="pb-tstm__small">“{t.quote}”</p>
                </blockquote>
                <figcaption className="pb-tstm__by">
                  <Avatar initials={t.initials} />
                  <span>
                    <span className="pb-display pb-tstm__name pb-tstm__name--sm">{t.name}</span>
                    <span className="pb-mono pb-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
export default Testimonials
