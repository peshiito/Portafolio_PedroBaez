import { useEffect, useId, useRef, useState } from 'react'
import './avatar.css'

/**
 * Pedro, ilustrado al estilo de un Memoji: volumen con degradés, luz desde
 * arriba a la izquierda y ojos con iris y brillo. Es decorativo: la
 * presentación real está en el titular.
 *
 * - `pose`: 'neutral' | 'saluda' | 'senala' | 'piensa' | 'pulgar'. Cada pose
 *   trae su brazo y su boca.
 * - `saludoBreve`: saluda y a los pocos segundos baja la mano. Al pasar el
 *   mouse por encima vuelve a saludar y guiña un ojo.
 * - La cabeza y los ojos siguen al mouse con un poco de inercia. Se escribe
 *   el transform directo en los nodos, sin pasar por el estado de React.
 */
const BOCA = { saluda: 'abierta', pulgar: 'abierta', piensa: 'duda' }

function Avatar({ pose = 'neutral', saludoBreve = false, className = '' }) {
  const raiz = useRef(null)
  const cabeza = useRef(null)
  const iris = useRef(null)
  const [saludo, setSaludo] = useState(saludoBreve ? 1 : 0)
  const [guino, setGuino] = useState(false)
  const u = useId().replace(/:/g, '')
  const id = (n) => `${u}-${n}`

  // El saludo breve: sube la mano, saluda y la baja
  useEffect(() => {
    if (!saludo) return
    const t = setTimeout(() => setSaludo(0), 2600)
    return () => clearTimeout(t)
  }, [saludo])

  const visible = saludo ? 'saluda' : saludoBreve ? 'neutral' : pose
  const boca = guino ? 'abierta' : BOCA[visible] ?? 'sonrisa'

  // Cabeza y mirada hacia el puntero, con inercia
  useEffect(() => {
    const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches
    const conMouse = matchMedia('(hover: hover) and (pointer: fine)').matches
    if (quieto || !conMouse) return

    let cuadro = 0
    let px = 0
    let py = 0
    const ahora = { x: 0, y: 0 }
    const meta = { x: 0, y: 0 }

    const paso = () => {
      ahora.x += (meta.x - ahora.x) * 0.12
      ahora.y += (meta.y - ahora.y) * 0.12
      if (cabeza.current) {
        cabeza.current.style.transform = `translate(${ahora.x * 2.4}px, ${ahora.y * 1.6}px) rotate(${ahora.x * 5}deg)`
      }
      if (iris.current) {
        iris.current.style.transform = `translate(${ahora.x * 2.8}px, ${ahora.y * 2.6}px)`
      }
      const quieta = Math.abs(meta.x - ahora.x) < 0.002 && Math.abs(meta.y - ahora.y) < 0.002
      cuadro = quieta ? 0 : requestAnimationFrame(paso)
    }

    const alMover = (e) => {
      px = e.clientX
      py = e.clientY
      const r = raiz.current?.getBoundingClientRect()
      if (!r || !r.width) return
      const dx = px - (r.left + r.width / 2)
      const dy = py - (r.top + r.height * 0.42)
      const d = Math.hypot(dx, dy) || 1
      const k = Math.min(1, d / 320)
      meta.x = (dx / d) * k
      meta.y = (dy / d) * k
      if (!cuadro) cuadro = requestAnimationFrame(paso)
    }

    window.addEventListener('pointermove', alMover, { passive: true })
    return () => {
      window.removeEventListener('pointermove', alMover)
      cancelAnimationFrame(cuadro)
    }
  }, [])

  const alEntrar = saludoBreve
    ? () => {
        setSaludo((n) => n + 1)
        setGuino(true)
        setTimeout(() => setGuino(false), 700)
      }
    : undefined

  return (
    <svg
      ref={raiz}
      className={`pb-av pb-av--${visible} ${guino ? 'pb-av--guino' : ''} ${className}`}
      viewBox="-24 -24 248 248"
      aria-hidden="true"
      focusable="false"
      onPointerEnter={alEntrar}
    >
      <defs>
        <clipPath id={id('circulo')}>
          <circle cx="100" cy="100" r="92" />
        </clipPath>
        <radialGradient id={id('fondo')} cx="35%" cy="28%" r="80%">
          <stop offset="0" stopColor="#fdfbf7" />
          <stop offset="1" stopColor="#e2dcd1" />
        </radialGradient>
        <radialGradient id={id('piel')} cx="42%" cy="36%" r="70%">
          <stop offset="0" stopColor="#ebb68e" />
          <stop offset="0.55" stopColor="#d59a6f" />
          <stop offset="1" stopColor="#b87a50" />
        </radialGradient>
        <linearGradient id={id('cuello')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a96e47" />
          <stop offset="1" stopColor="#c98d63" />
        </linearGradient>
        <radialGradient id={id('mano')} cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#ebb68e" />
          <stop offset="1" stopColor="#c48559" />
        </radialGradient>
        <linearGradient id={id('pelo')} x1="0.2" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#4d3324" />
          <stop offset="0.6" stopColor="#2c1c13" />
          <stop offset="1" stopColor="#1e130d" />
        </linearGradient>
        <linearGradient id={id('remera')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff5a4e" />
          <stop offset="1" stopColor="#d9231a" />
        </linearGradient>
        <radialGradient id={id('brillo')} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id('rubor')} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#d9604a" stopOpacity="0.28" />
          <stop offset="1" stopColor="#e5674f" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id('iris')} cx="45%" cy="40%" r="60%">
          <stop offset="0" stopColor="#9a6a40" />
          <stop offset="0.6" stopColor="#5b351b" />
          <stop offset="1" stopColor="#2b170b" />
        </radialGradient>
        <radialGradient id={id('esclera')} cx="50%" cy="40%" r="60%">
          <stop offset="0.6" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e6e0d8" />
        </radialGradient>
        <clipPath id={id('ojos')}>
          <ellipse cx="84" cy="97" rx="8" ry="9" />
          <ellipse cx="116" cy="97" rx="8" ry="9" />
        </clipPath>
      </defs>

      <circle cx="100" cy="100" r="92" fill={`url(#${id('fondo')})`} />

      <g clipPath={`url(#${id('circulo')})`}>
        <g className="pb-av__figura">
          {/* Torso */}
          <path d="M14 224 C18 172 56 152 100 152 C144 152 182 172 186 224 Z" fill={`url(#${id('remera')})`} />
          <ellipse cx="62" cy="172" rx="22" ry="9" fill={`url(#${id('brillo')})`} />
          <path d="M40 200 C46 186 52 178 60 172" fill="none" stroke="#b81a12" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />
          <path d="M160 200 C154 186 148 178 140 172" fill="none" stroke="#b81a12" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" />

          {/* Cuello */}
          <path d="M81 116 L81 150 Q100 165 119 150 L119 116 Z" fill={`url(#${id('cuello')})`} />
          <path d="M78 152 Q100 172 122 152" fill="none" stroke="#c01b13" strokeWidth="5" strokeLinecap="round" />

          {/* El brazo de pensar sale del cuerpo, por eso va dentro del círculo */}
          <g className="pb-av__brazo pb-av__brazo--piensa">
            <path d="M54 230 Q56 192 68 172" fill="none" stroke={`url(#${id('remera')})`} strokeWidth="28" strokeLinecap="round" />
            <path d="M68 172 Q76 154 86 142" fill="none" stroke={`url(#${id('mano')})`} strokeWidth="16" strokeLinecap="round" />
            <ellipse cx="92" cy="139" rx="11" ry="9.5" fill={`url(#${id('mano')})`} />
            <path d="M88 133 Q95 128 101 131" fill="none" stroke="#a86a42" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
          </g>

          <g className="pb-av__cabeza" ref={cabeza}>
            {/* Orejas */}
            <ellipse cx="61" cy="100" rx="8.5" ry="12" fill={`url(#${id('piel')})`} />
            <ellipse cx="62.5" cy="100" rx="4" ry="7" fill="#a46a43" opacity="0.5" />
            <ellipse cx="139" cy="100" rx="8.5" ry="12" fill={`url(#${id('piel')})`} />
            <ellipse cx="137.5" cy="100" rx="4" ry="7" fill="#a46a43" opacity="0.5" />

            {/* Cara */}
            <path
              d="M63 90 C63 58 80 42 100 42 C120 42 137 58 137 90 C137 108 134 120 126 129 C119 136 110 140 100 140 C90 140 81 136 74 129 C66 120 63 108 63 90 Z"
              fill={`url(#${id('piel')})`}
            />
            <ellipse cx="90" cy="70" rx="20" ry="10" fill={`url(#${id('brillo')})`} />
            <ellipse cx="78" cy="113" rx="10" ry="7" fill={`url(#${id('rubor')})`} />
            <ellipse cx="122" cy="113" rx="10" ry="7" fill={`url(#${id('rubor')})`} />

            {/* Sombra de barba, apenas */}
            <path
              d="M68 112 C71 124 78 133 88 137.5 C93 139.5 107 139.5 112 137.5 C122 133 129 124 132 112 C128 122 121 128 112 129.5 C108 126 92 126 88 129.5 C79 128 72 122 68 112 Z"
              fill="#3a2418"
              opacity="0.13"
            />

            {/* Nariz */}
            <ellipse cx="98" cy="102" rx="3" ry="7" fill="#fff" opacity="0.14" />
            <ellipse cx="100" cy="112" rx="6.5" ry="3.2" fill="#a2643c" opacity="0.32" />
            <path d="M94 111 Q100 116.5 106 111" fill="none" stroke="#965a35" strokeOpacity="0.7" strokeWidth="2.2" strokeLinecap="round" />

            {/* Ojos */}
            <ellipse cx="84" cy="95" rx="11" ry="8" fill="#a8693f" opacity="0.18" />
            <ellipse cx="116" cy="95" rx="11" ry="8" fill="#a8693f" opacity="0.18" />
            <g className="pb-av__ojo pb-av__ojo--izq">
              <ellipse cx="84" cy="97" rx="8" ry="9" fill={`url(#${id('esclera')})`} />
            </g>
            <g className="pb-av__ojo pb-av__ojo--der">
              <ellipse cx="116" cy="97" rx="8" ry="9" fill={`url(#${id('esclera')})`} />
            </g>
            <g clipPath={`url(#${id('ojos')})`}>
              <g className="pb-av__mirada">
                <g ref={iris}>
                  {[84, 116].map((cx) => (
                    <g key={cx} className={`pb-av__ojo ${cx < 100 ? 'pb-av__ojo--izq' : 'pb-av__ojo--der'}`}>
                      <circle cx={cx} cy="98" r="5.6" fill={`url(#${id('iris')})`} />
                      <circle cx={cx} cy="98" r="2.7" fill="#140b06" />
                      <circle cx={cx - 2} cy="95.6" r="1.7" fill="#fff" />
                      <circle cx={cx + 1.9} cy="100" r="0.8" fill="#fff" opacity="0.8" />
                    </g>
                  ))}
                </g>
              </g>
            </g>
            {/* Párpados: la línea de arriba de cada ojo */}
            <g className="pb-av__ojo pb-av__ojo--izq">
              <path d="M75.6 93.5 Q84 85 92.4 93.5" fill="none" stroke="#3a2216" strokeWidth="2.4" strokeLinecap="round" />
            </g>
            <g className="pb-av__ojo pb-av__ojo--der">
              <path d="M107.6 93.5 Q116 85 124.4 93.5" fill="none" stroke="#3a2216" strokeWidth="2.4" strokeLinecap="round" />
            </g>

            {/* Cejas */}
            <g className="pb-av__cejas">
              <path d="M72 84.5 C75 79.5 85 77.5 94.5 79.5 C94.4 82.4 93.4 83.4 91.6 83.2 C85.5 82 79 82.6 74 86.4 Z" fill="#2a1a12" />
              <path d="M128 84.5 C125 79.5 115 77.5 105.5 79.5 C105.6 82.4 106.6 83.4 108.4 83.2 C114.5 82 121 82.6 126 86.4 Z" fill="#2a1a12" />
            </g>

            {/* Bocas: una por gesto */}
            <g className={`pb-av__boca ${boca === 'sonrisa' ? 'is-on' : ''}`}>
              <path d="M89 122 Q100 131 111 122" fill="none" stroke="#7a3526" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M94 130 Q100 132.5 106 130" fill="none" stroke="#a7653f" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
            </g>
            <g className={`pb-av__boca ${boca === 'abierta' ? 'is-on' : ''}`}>
              <path d="M86.5 119.5 Q100 121.5 113.5 119.5 Q112 135 100 136 Q88 135 86.5 119.5 Z" fill="#5a1d15" />
              <path d="M88.5 120.8 Q100 122.5 111.5 120.8 L111 125 Q100 127 89 125 Z" fill="#fff" />
              <ellipse cx="100" cy="131.5" rx="6.5" ry="3.2" fill="#d4675a" />
            </g>
            <g className={`pb-av__boca ${boca === 'duda' ? 'is-on' : ''}`}>
              <path d="M93 126 Q100 122.5 108 124.5" fill="none" stroke="#7a3526" strokeWidth="2.8" strokeLinecap="round" />
            </g>

            {/* Pelo: costados cortos y volumen arriba, peinado hacia un lado */}
            <g className="pb-av__pelo">
              {/* Silueta: ancha arriba, costados cortos */}
              <path
                d="M61.5 88 C57 64 62 43 78 33 C90 25.5 106 24 119 27 C133 30.5 143 41 144 55 C145 66 141.5 78 138.5 88 C136.8 78.5 133.2 70.5 128.5 65.5 C121.5 63.5 113 61 105.5 58 C97 62 87.5 65 78.5 67.5 C70.5 70.5 64.5 77.5 61.5 88 Z"
                fill={`url(#${id('pelo')})`}
              />
              {/* Brillo general, de arriba a la izquierda */}
              <path
                d="M74 40 C84 31 100 28 114 30 C104 32 92 36 82 44 Z"
                fill="#8a654c"
                opacity="0.35"
              />
              {/* El mechón de adelante cae hacia la derecha */}
              <path
                d="M69 69 C74 55 89 46 109 45 C122 44.5 133 49.5 138.5 58.5 C128 54 115 53.5 103 57 C92.5 60 83 65.5 76.5 73.5 Z"
                fill="#3d291d"
              />
              <path d="M76 66 C82 56 94 50 108 49" fill="none" stroke="#7d5b45" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" />
              {/* Textura: mechones cortos, no rayas */}
              <g fill="none" stroke="#7a573f" strokeOpacity="0.45" strokeWidth="1.6" strokeLinecap="round">
                <path d="M88 37 q6 -4 13 -3" />
                <path d="M108 33 q7 -1 12 3" />
                <path d="M124 39 q6 3 9 9" />
                <path d="M96 43 q6 -3 12 -2" />
                <path d="M70 52 q3 -6 9 -9" />
              </g>
              <path d="M62.5 88 L65.5 102 L68.3 101.4 L67.2 84 Z" fill="#2c1c13" />
              <path d="M137.5 88 L134.5 102 L131.7 101.4 L132.8 84 Z" fill="#2c1c13" />
            </g>
          </g>
        </g>
      </g>

      <circle cx="100" cy="100" r="92" fill="none" stroke="#3a352f" strokeOpacity="0.55" strokeWidth="2.5" />

      {/* Brazos que salen del círculo */}
      <g className="pb-av__brazo pb-av__brazo--saluda">
        <path d="M146 188 Q158 172 164 158" fill="none" stroke={`url(#${id('remera')})`} strokeWidth="25" strokeLinecap="round" />
        <path d="M164 158 Q170 140 172 122" fill="none" stroke={`url(#${id('mano')})`} strokeWidth="16" strokeLinecap="round" />
        <g className="pb-av__mano-saluda">
          <rect x="160.5" y="84" width="6.4" height="20" rx="3.2" fill={`url(#${id('mano')})`} transform="rotate(-10 163.7 104)" />
          <rect x="167" y="80" width="6.6" height="22" rx="3.3" fill={`url(#${id('mano')})`} />
          <rect x="173.6" y="81.5" width="6.4" height="21" rx="3.2" fill={`url(#${id('mano')})`} transform="rotate(8 176.8 102)" />
          <rect x="179.6" y="87" width="5.8" height="17" rx="2.9" fill={`url(#${id('mano')})`} transform="rotate(18 182.5 104)" />
          <rect x="153" y="102" width="6.4" height="15" rx="3.2" fill={`url(#${id('mano')})`} transform="rotate(-48 156.2 112)" />
          <ellipse cx="171.5" cy="108" rx="12" ry="11" fill={`url(#${id('mano')})`} />
        </g>
      </g>

      <g className="pb-av__brazo pb-av__brazo--senala">
        <path d="M146 188 Q158 178 168 172" fill="none" stroke={`url(#${id('remera')})`} strokeWidth="25" strokeLinecap="round" />
        <path d="M168 172 Q180 164 192 158" fill="none" stroke={`url(#${id('mano')})`} strokeWidth="15" strokeLinecap="round" />
        <g className="pb-av__indice">
          <rect x="200" y="147.5" width="18" height="6.4" rx="3.2" fill={`url(#${id('mano')})`} transform="rotate(-12 200 151)" />
          <ellipse cx="198" cy="155" rx="10.5" ry="9" fill={`url(#${id('mano')})`} />
          <path d="M193 158 Q199 161 204 158" fill="none" stroke="#a86a42" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </g>

      <g className="pb-av__brazo pb-av__brazo--pulgar">
        <path d="M146 188 Q160 172 166 158" fill="none" stroke={`url(#${id('remera')})`} strokeWidth="25" strokeLinecap="round" />
        <path d="M166 158 Q170 148 172 140" fill="none" stroke={`url(#${id('mano')})`} strokeWidth="16" strokeLinecap="round" />
        <g className="pb-av__mano-pulgar">
          <rect x="169" y="104" width="8.4" height="24" rx="4.2" fill={`url(#${id('mano')})`} transform="rotate(-8 173 128)" />
          <rect x="161" y="120" width="24" height="22" rx="8" fill={`url(#${id('mano')})`} />
          <path d="M163 127 H180 M163 133 H180" stroke="#a86a42" strokeOpacity="0.5" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}
export default Avatar
