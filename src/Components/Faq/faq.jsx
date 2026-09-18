import { useId, useState } from 'react'
import { Plus, Minus } from '../Logo/icons'
import './faq.css'

const QUESTIONS = [
  {
    q: '¿Cuánto tarda?',
    a: 'Una landing, dos semanas. Un sitio institucional, entre tres y cuatro. Una tienda online, entre cuatro y seis. El reloj arranca cuando me pasás los textos y las fotos, así que eso es lo primero que vamos a resolver juntos.',
  },
  {
    q: '¿Cómo se define el alcance?',
    a: 'En la primera charla vemos qué necesita tu negocio y armamos el alcance juntos: cuántas secciones, qué tiene que poder hacer cada una y qué queda para una segunda etapa. Con eso cerrado te paso una propuesta con un número fijo, que después no se mueve. No cobro por hora ni sumo extras a mitad del proyecto.',
  },
  {
    q: '¿Quién carga el contenido?',
    a: 'Lo cargo yo. Si tenés textos y fotos, los uso; si no los tenés, los escribo a partir de lo que hablamos y te los paso para que los apruebes. Nunca vas a recibir un sitio con “Lorem ipsum” adentro esperando que lo completes vos.',
  },
  {
    q: '¿Qué pasa después de que entregás?',
    a: 'Quedan treinta días de acompañamiento incluidos para ajustes y dudas. Después podés seguir solo, porque te enseño a cargar contenido, o contratar el mantenimiento mensual, que no tiene permanencia.',
  },
  {
    q: '¿Trabajás con negocios fuera de Argentina?',
    a: 'Sí. Trabajo por videollamada y el proyecto no cambia. Lo único que ajustamos es el horario de las reuniones y la forma de pago.',
  },
  {
    q: '¿Puedo actualizar el sitio sin saber programar?',
    a: 'Sí. Todo lo que cambia seguido —precios, productos, horarios, fotos— queda en un panel simple. Te grabo un video corto mostrando cómo se usa, para que lo tengas cuando lo necesites.',
  },
]

function Faq() {
  const [open, setOpen] = useState(0)
  const uid = useId()

  return (
    <section className="pb-section" id="preguntas">
      <div className="container pb-faq__grid">
        <div className="pb-faq__aside pb-reveal">
          <p className="pb-mono pb-head__label">(06) Preguntas</p>
          <h2 className="pb-display pb-faq__title">Antes de que me escribas</h2>
          <p className="pb-muted pb-faq__note">
            ¿No está tu pregunta acá? Escribime igual, contesto todo.
          </p>
        </div>

        <ul className="pb-faq">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i
            const panelId = `${uid}-faq-${i}`
            const btnId = `${uid}-faqbtn-${i}`
            return (
              <li className={`pb-faq__row ${isOpen ? 'is-open' : ''}`} key={item.q}>
                <h3 className="pb-faq__heading">
                  <button
                    type="button"
                    id={btnId}
                    className="pb-faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span className="pb-display pb-faq__q">{item.q}</span>
                    <span className="pb-faq__icon" aria-hidden="true">
                      {isOpen ? <Minus width={16} height={16} /> : <Plus width={16} height={16} />}
                    </span>
                  </button>
                </h3>
                <div
                  className="pb-faq__panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  inert={!isOpen}
                >
                  <div className="pb-faq__answer">
                    <p>{item.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
export default Faq
