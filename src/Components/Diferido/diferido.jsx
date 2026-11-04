import { Suspense, useEffect, useRef, useState } from 'react'
import { avisarSeccionMontada, alPedirTodo, pidieronTodo } from '../../hooks/seccionesDiferidas'
import './diferido.css'

// Se arma antes de llegar: al entrar a la pantalla ya está lista para aparecer
const ANTICIPO = '700px 0px'

function Esqueleto({ alto, altoMovil }) {
  return (
    <div
      className="pb-dif__hueco"
      style={{ '--pb-dif-alto': `${alto}px`, '--pb-dif-alto-m': `${altoMovil}px` }}
      aria-hidden="true"
    >
      <div className="container">
        <span className="pb-dif__linea" />
        <span className="pb-dif__linea pb-dif__linea--titulo" />
        <span className="pb-dif__linea pb-dif__linea--titulo" />
        <span className="pb-dif__linea" />
      </div>
    </div>
  )
}

function Aviso() {
  useEffect(avisarSeccionMontada, [])
  return null
}

/**
 * Una sección que se descarga y se monta recién cuando te acercás. Mientras
 * tanto ocupa un lugar de su tamaño aproximado, así la barra de scroll no salta.
 * Una vez montada no se desmonta: lo ya visto queda.
 */
function Diferido({ alto, altoMovil, children }) {
  const [montado, setMontado] = useState(pidieronTodo)
  const lugar = useRef(null)

  useEffect(() => {
    if (montado) return
    const soltar = alPedirTodo(() => setMontado(true))
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setMontado(true), {
      rootMargin: ANTICIPO,
    })
    io.observe(lugar.current)
    return () => {
      soltar()
      io.disconnect()
    }
  }, [montado])

  const esqueleto = <Esqueleto alto={alto} altoMovil={altoMovil} />
  if (!montado) return <div ref={lugar}>{esqueleto}</div>
  return (
    <Suspense fallback={esqueleto}>
      {children}
      <Aviso />
    </Suspense>
  )
}
export default Diferido
