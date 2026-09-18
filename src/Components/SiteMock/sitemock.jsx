import './sitemock.css'

/**
 * Maqueta dibujada de un sitio. No es una captura: muestra la estructura
 * que se diseñó sin fingir un sitio que el visitante no puede abrir.
 *
 * Con `building`, los bloques aparecen escalonados, como si el sitio se
 * estuviera armando. Se usa así sólo en el hero.
 */
function SiteMock({ p, building = false, className = '' }) {
  return (
    <div
      className={`pb-mock ${building ? 'is-building' : ''} pb-mock--${p.layout} ${className}`}
      style={{ '--ink': p.ink, '--paper': p.paper, '--accent': p.accent }}
      aria-hidden="true"
    >
      <div className="pb-mock__chrome" style={{ '--i': 0 }}>
        <i />
        <i />
        <i />
        <span className="pb-mock__url" />
      </div>
      <div className="pb-mock__body">
        <div className="pb-mock__nav" style={{ '--i': 1 }}>
          <span className="pb-mock__logo" />
          <span className="pb-mock__links">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="pb-mock__stage">
          <span className="pb-mock__h1" style={{ '--i': 2 }} />
          <span className="pb-mock__h1 pb-mock__h1--short" style={{ '--i': 3 }} />
          <span className="pb-mock__p" style={{ '--i': 4 }} />
          <span className="pb-mock__btn" style={{ '--i': 5 }} />
        </div>
        <div className="pb-mock__tiles">
          <span style={{ '--i': 6 }} />
          <span style={{ '--i': 7 }} />
          <span style={{ '--i': 8 }} />
        </div>
      </div>
    </div>
  )
}
export default SiteMock
