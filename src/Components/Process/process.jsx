import './process.css'

const STAGES = [
  {
    step: 'Etapa 01',
    title: 'Conversamos',
    text: 'Media hora por videollamada o un café. Me contás qué vendés y a quién. Salís de ahí sabiendo qué se puede hacer y para cuándo.',
  },
  {
    step: 'Etapa 02',
    title: 'Diseño',
    text: 'Te muestro cómo va a verse antes de escribir una sola línea de código. Ajustamos hasta que te guste de verdad.',
  },
  {
    step: 'Etapa 03',
    title: 'Desarrollo',
    text: 'Lo construyo a mano. Rápido en el celular, visible en Google y fácil de actualizar para vos.',
  },
  {
    step: 'Etapa 04',
    title: 'Entrega',
    text: 'Publicamos, te enseño a cargar contenido y quedo disponible treinta días por cualquier cosa.',
  },
]

function Process() {
  return (
    <section className="pb-section" id="proceso">
      <div className="container">
        <header className="pb-head pb-reveal">
          <div>
            <p className="pb-mono pb-head__label">(03) Cómo trabajo</p>
            <h2 className="pb-display pb-d2">De la primera charla al sitio publicado</h2>
          </div>
          <p className="pb-lead pb-muted">
            Cuatro etapas y nada de sorpresas. En cada una sabés qué está pasando, qué falta y
            cuándo te toca a vos.
          </p>
        </header>

        {/* Acá la numeración sí informa: es un orden real que el cliente recorre. */}
        <ol className="pb-process">
          {STAGES.map((s) => (
            <li className="pb-process__item pb-reveal" key={s.step}>
              <span className="pb-process__node" aria-hidden="true" />
              <p className="pb-mono pb-process__step pb-muted">{s.step}</p>
              <h3 className="pb-display pb-d3 pb-process__title">{s.title}</h3>
              <p className="pb-process__text">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
export default Process
