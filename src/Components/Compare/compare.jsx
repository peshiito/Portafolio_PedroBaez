import { ArrowUpRight } from '../Logo/icons'
import './compare.css'

/* Cada fila nombra su tema en los dos lados: así se entiende sin depender
   de que el visitante lea las dos columnas en paralelo. */
const ROWS = [
  {
    tema: 'Cómo se ve',
    plantilla: 'Igual que las otras mil que usan el mismo diseño.',
    medida: 'Como tu negocio y como el de nadie más.',
  },
  {
    tema: 'Qué pagás',
    plantilla: 'Una cuota todos los meses, para siempre.',
    medida: 'Una sola vez. Después es tuyo.',
  },
  {
    tema: 'En el celular',
    plantilla: 'Pesada, con efectos que nadie pidió.',
    medida: 'Abre en menos de dos segundos.',
  },
  {
    tema: 'Cuando hay que cambiar algo',
    plantilla: 'Lo peleás vos un domingo a la noche.',
    medida: 'Me escribís y lo resuelvo.',
  },
  {
    tema: 'En Google',
    plantilla: 'Te encuentran de casualidad.',
    medida: 'Fichas, títulos y mapa configurados desde el día uno.',
  },
  {
    tema: 'Si algo se rompe',
    plantilla: 'Un chat automático que contesta en inglés.',
    medida: 'Mi teléfono.',
  },
]

function Compare() {
  return (
    <section className="pb-section pb-inverse pb-cmp" id="comparativa">
      <div className="container">
        <header className="pb-head pb-reveal">
          <div>
            <p className="pb-mono pb-head__label">(02) Antes de decidir</p>
            <h2 className="pb-display pb-d2">Hacerlo solo o hacerlo bien</h2>
          </div>
          <p className="pb-lead pb-muted">
            Casi todos los que me escriben vienen de probar una plantilla. Esto es lo que cambia
            cuando el sitio se hace para tu negocio y no para cualquiera.
          </p>
        </header>

        <div className="pb-cmp__grid pb-reveal">
          <div className="pb-cmp__col pb-cmp__col--tpl">
            <h3 className="pb-mono pb-cmp__col-title">Una plantilla</h3>
            <ul>
              {ROWS.map((r) => (
                <li key={r.tema}>
                  <span className="pb-mono pb-cmp__tema">{r.tema}</span>
                  <span className="pb-cmp__txt">{r.plantilla}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pb-cmp__col pb-cmp__col--mine">
            <h3 className="pb-mono pb-cmp__col-title">Hecho a medida</h3>
            <ul>
              {ROWS.map((r) => (
                <li key={r.tema}>
                  <span className="pb-mono pb-cmp__tema">{r.tema}</span>
                  <span className="pb-cmp__txt">{r.medida}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pb-cmp__foot pb-reveal">
          <p className="pb-cmp__cierre">
            Si tu negocio ya funciona, la web no debería ser el eslabón flojo.
          </p>
          <a className="pb-btn pb-btn--red" href="#contacto">
            Empecemos tu proyecto <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  )
}
export default Compare
