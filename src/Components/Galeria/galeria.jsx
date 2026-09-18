import { useCallback, useEffect, useRef, useState } from 'react'
import Media from '../Media/media'
import './galeria.css'

/**
 * Galería de un caso. Las capturas de un panel no se leen en un teléfono,
 * así que cada una se puede abrir a pantalla completa.
 *
 * Usa <dialog> nativo: trae encierro del foco, cierre con Escape y fondo
 * inerte sin tener que reimplementarlos.
 */
function Galeria({ items, className = '' }) {
  const [abierta, setAbierta] = useState(null)
  const dialogo = useRef(null)

  const cerrar = useCallback(() => setAbierta(null), [])

  useEffect(() => {
    const d = dialogo.current
    if (!d) return
    if (abierta !== null && !d.open) d.showModal()
    if (abierta === null && d.open) d.close()
  }, [abierta])

  const mover = useCallback(
    (paso) => {
      setAbierta((i) => {
        if (i === null) return i
        const visibles = items.filter((g) => g.src)
        const actual = visibles.findIndex((g) => g === items[i])
        const siguiente = (actual + paso + visibles.length) % visibles.length
        return items.indexOf(visibles[siguiente])
      })
    },
    [items],
  )

  useEffect(() => {
    if (abierta === null) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') mover(1)
      if (e.key === 'ArrowLeft') mover(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [abierta, mover])

  const actual = abierta !== null ? items[abierta] : null

  return (
    <>
      <div className={`pb-proj__galeria ${className}`}>
        {items.map((g, i) => {
          const esMovil = g.src && g.src.includes('movil')
          const media = (
            <Media
              src={g.src}
              alt={g.alt}
              ratio={esMovil ? '620 / 1342' : '1400 / 924'}
              nota="Imagen del proyecto"
              className={esMovil ? 'pb-proj__movil' : ''}
            />
          )
          if (!g.src) return <div className="pb-reveal" key={g.alt}>{media}</div>

          return (
            <button
              type="button"
              className={`pb-galeria__btn pb-reveal${esMovil ? ' pb-galeria__btn--movil' : ''}`}
              key={g.alt}
              onClick={() => setAbierta(i)}
            >
              {media}
              <span className="pb-galeria__lupa" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
                </svg>
              </span>
              <span className="visually-hidden">Ampliar: {g.alt}</span>
            </button>
          )
        })}
      </div>

      <dialog className="pb-visor" ref={dialogo} onClose={cerrar}>
        {actual && (
          <>
            <img className="pb-visor__img" src={actual.src} alt={actual.alt} />
            <p className="pb-mono pb-visor__pie">{actual.alt}</p>
            <div className="pb-visor__mandos">
              <button type="button" className="pb-visor__nav" onClick={() => mover(-1)}>
                <span aria-hidden="true">←</span>
                <span className="visually-hidden">Imagen anterior</span>
              </button>
              <button type="button" className="pb-visor__nav" onClick={() => mover(1)}>
                <span aria-hidden="true">→</span>
                <span className="visually-hidden">Imagen siguiente</span>
              </button>
            </div>
            <button type="button" className="pb-visor__cerrar" onClick={cerrar}>
              <span aria-hidden="true">✕</span>
              <span className="visually-hidden">Cerrar</span>
            </button>
          </>
        )}
      </dialog>
    </>
  )
}
export default Galeria
