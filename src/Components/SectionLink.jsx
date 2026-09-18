import { Link, useLocation } from 'react-router-dom'

/**
 * Enlace a una sección de la home. Si ya estamos en la home usa el ancla
 * directa (y el scroll suave del navegador); desde otra página navega a la
 * home y ScrollToTop se encarga de bajar hasta la sección.
 */
function SectionLink({ id, children, className, onClick }) {
  const { pathname } = useLocation()

  if (pathname === '/') {
    return (
      <a className={className} href={`#${id}`} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link className={className} to={`/#${id}`} onClick={onClick}>
      {children}
    </Link>
  )
}
export default SectionLink
