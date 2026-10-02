import { useEffect, useId, useRef } from 'react'
import './avatar.css'

/**
 * Pedro, ilustrado. Es decorativo: la presentación real está en el titular.
 *
 * - `pose`: 'neutral' | 'saluda' | 'senala' | 'piensa'. Cada pose es un brazo
 *   distinto; la cara y el cuerpo no cambian, así el cambio se lee rápido.
 * - Los ojos siguen al mouse. Se escribe el transform directo en el nodo, sin
 *   pasar por el estado de React, porque se actualiza en cada movimiento.
 */
function Avatar({ pose = 'neutral', className = '' }) {
  const raiz = useRef(null)
  const ojos = useRef(null)
  const clip = useId()

  useEffect(() => {
    const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches
    const conMouse = matchMedia('(hover: hover) and (pointer: fine)').matches
    if (quieto || !conMouse) return

    let cuadro = 0
    let x = 0
    let y = 0
    const mover = () => {
      cuadro = 0
      const r = raiz.current?.getBoundingClientRect()
      if (!r || !ojos.current) return
      const dx = x - (r.left + r.width / 2)
      const dy = y - (r.top + r.height * 0.45)
      const d = Math.hypot(dx, dy) || 1
      // Hasta 2.6 unidades del dibujo: lo justo para que se note la mirada
      const k = Math.min(1, d / 260) * 2.6
      ojos.current.style.transform = `translate(${(dx / d) * k}px, ${(dy / d) * k}px)`
    }
    const alMover = (e) => {
      x = e.clientX
      y = e.clientY
      if (!cuadro) cuadro = requestAnimationFrame(mover)
    }
    window.addEventListener('pointermove', alMover, { passive: true })
    return () => {
      window.removeEventListener('pointermove', alMover)
      cancelAnimationFrame(cuadro)
    }
  }, [])

  return (
    <svg
      ref={raiz}
      className={`pb-av pb-av--${pose} ${className}`}
      viewBox="-12 -12 184 184"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <clipPath id={clip}>
          <circle cx="80" cy="80" r="64" />
        </clipPath>
      </defs>

      <circle className="pb-av__fondo" cx="80" cy="80" r="64" />

      <g clipPath={`url(#${clip})`}>
        {/* Cuerpo: remera en el rojo de la marca */}
        <path className="pb-av__remera" d="M24 168 C26 130 50 116 80 116 C110 116 134 130 136 168 Z" />
        <rect className="pb-av__piel" x="71" y="96" width="18" height="22" rx="6" />
        <path className="pb-av__cuello" d="M70 117 L80 127 L90 117" />

        {/* Cabeza */}
        <circle className="pb-av__piel" cx="54" cy="79" r="6.5" />
        <circle className="pb-av__piel" cx="106" cy="79" r="6.5" />
        <ellipse className="pb-av__piel" cx="80" cy="76" rx="26" ry="29" />
        <path
          className="pb-av__pelo"
          d="M51 78 C45 50 61 34 81 34 C102 34 116 50 109 78 C107 69 104 63 100 60 L97 66 L91 58 L85 65 L78 57 L71 64 L65 58 L60 66 C56 69 53 73 51 78 Z"
        />

        <circle className="pb-av__cachete" cx="64" cy="88" r="5" />
        <circle className="pb-av__cachete" cx="96" cy="88" r="5" />

        <path className="pb-av__ceja" d="M64 69 Q70 66 75 68" />
        <path className="pb-av__ceja" d="M85 68 Q90 66 96 69" />

        <g className="pb-av__parpado">
          <g ref={ojos} className="pb-av__ojos">
            <ellipse className="pb-av__ojo" cx="70" cy="77" rx="3.3" ry="3.8" />
            <ellipse className="pb-av__ojo" cx="90" cy="77" rx="3.3" ry="3.8" />
          </g>
        </g>

        <path className="pb-av__boca" d="M71 90 Q80 98 89 90" />

        {/* El brazo de pensar sale del cuerpo, por eso va dentro del círculo */}
        <g className="pb-av__brazo pb-av__brazo--piensa">
          <path className="pb-av__manga" d="M46 150 Q50 124 64 110" />
          <circle className="pb-av__piel" cx="67" cy="104" r="8.5" />
        </g>
      </g>

      <circle className="pb-av__borde" cx="80" cy="80" r="64" />

      {/* Brazos que salen del círculo: uno por pose, sólo se ve el de la actual */}
      <g className="pb-av__brazo pb-av__brazo--saluda">
        <path className="pb-av__manga" d="M116 136 Q134 116 136 86" />
        <g className="pb-av__mano-saluda">
          <circle className="pb-av__piel" cx="136" cy="76" r="10" />
          <path className="pb-av__dedos" d="M130 68 L129 61 M135 66 L135 58 M140 67 L141 60" />
        </g>
      </g>

      <g className="pb-av__brazo pb-av__brazo--senala">
        <path className="pb-av__manga" d="M114 136 Q134 128 150 126" />
        <circle className="pb-av__piel" cx="154" cy="126" r="8" />
        <path className="pb-av__indice" d="M158 124 L168 121" />
      </g>

    </svg>
  )
}
export default Avatar
