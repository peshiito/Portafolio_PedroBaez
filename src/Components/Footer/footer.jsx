import { Link } from 'react-router-dom'
import Logo from '../Logo/logo'
import SectionLink from '../SectionLink'
import { linkWhatsApp } from '../../data/contacto'
import './footer.css'

const COLUMNS = [
  {
    title: 'Navegación',
    links: [
      { label: 'Servicios', id: 'servicios' },
      { label: 'Trabajos', id: 'trabajos' },
      { label: 'Proceso', id: 'proceso' },
      { label: 'Preguntas', id: 'preguntas' },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: 'Escribime', id: 'contacto' },
      { label: 'WhatsApp', href: linkWhatsApp(), externo: true },
      { label: 'Instagram', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos', href: '#' },
      { label: 'Privacidad', href: '#' },
    ],
  },
]

function Footer() {
  return (
    <footer className="pb-footer pb-inverse">
      <div className="container">
        <div className="pb-footer__top">
          <Link className="pb-footer__brand" to="/" aria-label="Pedro Baez, inicio">
            <Logo height={40} />
          </Link>

          <nav className="pb-footer__cols" aria-label="Pie de página">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="pb-mono pb-muted pb-footer__col-title">{col.title}</p>
                <ul>
                  {col.links.map((l) =>
                    l.id ? (
                      <li key={l.label}>
                        <SectionLink className="pb-mono pb-footer__link" id={l.id}>
                          {l.label}
                        </SectionLink>
                      </li>
                    ) : (
                      <li key={l.label}>
                        <a
                          className="pb-mono pb-footer__link"
                          href={l.href}
                          {...(l.externo ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                        >
                          {l.label}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="pb-footer__bottom">
          <p className="pb-mono pb-muted">© 2026 Pedro Baez</p>
          <p className="pb-mono pb-muted">Diseñado y programado por mí, obviamente</p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
