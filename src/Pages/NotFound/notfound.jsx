import { Link } from 'react-router-dom'
import { ArrowRight } from '../../Components/Logo/icons'
import { useMeta } from '../../hooks/useMeta'
import './notfound.css'

function NotFound() {
  useMeta({ title: 'Página no encontrada — Pedro Baez' })

  return (
    <section className="pb-section pb-404">
      <div className="container">
        <p className="pb-mono pb-muted">Error 404</p>
        <h1 className="pb-display pb-404__title">Esta página no existe</h1>
        <p className="pb-lead pb-muted">
          Puede que el enlace esté viejo o que haya escrito mal la dirección. Desde el inicio
          llegás a todo.
        </p>
        <Link className="pb-btn pb-btn--red pb-404__cta" to="/">
          Volver al inicio <ArrowRight />
        </Link>
      </div>
    </section>
  )
}
export default NotFound
