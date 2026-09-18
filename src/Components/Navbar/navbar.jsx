import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo/logo'
import SectionLink from '../SectionLink'
import { Sun, Moon, ArrowUpRight } from '../Logo/icons'
import { useTheme } from '../../hooks/useTheme'
import './navbar.css'

const LEFT = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'trabajos', label: 'Trabajos' },
]
const RIGHT = [
  { id: 'proceso', label: 'Proceso' },
  { id: 'preguntas', label: 'Preguntas' },
]

function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  // Cerrar el menú de mobile con Escape, y devolver el foco al botón
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className="pb-utility">
        <div className="container pb-utility__inner">
          <p className="pb-mono pb-utility__status">
            <span className="pb-utility__dot" aria-hidden="true" />
            Disponible para proyectos — marzo 2026
          </p>
          <a className="pb-mono pb-utility__mail" href="mailto:hola@pedrobaez.ar">
            hola@pedrobaez.ar
          </a>
        </div>
      </div>

      <header className="pb-nav">
        <nav className="container pb-nav__inner" aria-label="Principal">
          {/* Los enlaces se agrupan alrededor del logo en vez de irse a los
              bordes: el bloque de navegación se lee como una sola unidad. */}
          <div className="pb-nav__center">
            <ul className="pb-nav__list">
              {LEFT.map((l) => (
                <li key={l.id}>
                  <SectionLink className="pb-nav__link pb-mono" id={l.id}>
                    {l.label}
                  </SectionLink>
                </li>
              ))}
            </ul>

            <Link className="pb-nav__brand" to="/" aria-label="Pedro Baez, inicio">
              <Logo height={32} />
            </Link>

            <ul className="pb-nav__list">
              {RIGHT.map((l) => (
                <li key={l.id}>
                  <SectionLink className="pb-nav__link pb-mono" id={l.id}>
                    {l.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="pb-nav__right">
            <button
              type="button"
              className="pb-nav__theme"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            >
              {theme === 'dark' ? <Sun width={17} height={17} /> : <Moon width={17} height={17} />}
            </button>

            <SectionLink className="pb-btn pb-btn--solid pb-nav__cta" id="contacto">
              Empecemos tu proyecto
            </SectionLink>

            <button
              type="button"
              className="pb-nav__burger"
              aria-expanded={open}
              aria-controls="pb-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="visually-hidden">{open ? 'Cerrar menú' : 'Abrir menú'}</span>
              <span className={`pb-nav__burger-box ${open ? 'is-open' : ''}`} aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="pb-menu"
        ref={panelRef}
        className={`pb-menu ${open ? 'is-open' : ''}`}
        hidden={!open}
      >
        <ul className="pb-menu__list">
          {[...LEFT, ...RIGHT].map((l, i) => (
            <li key={l.id} style={{ '--pb-i': i }}>
              <SectionLink
                className="pb-display pb-menu__link"
                id={l.id}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </SectionLink>
            </li>
          ))}
        </ul>
        <SectionLink
          className="pb-btn pb-btn--red pb-btn--block"
          id="contacto"
          onClick={() => setOpen(false)}
        >
          Empecemos tu proyecto <ArrowUpRight />
        </SectionLink>
      </div>
    </>
  )
}
export default Navbar
