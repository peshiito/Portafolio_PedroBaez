import { Asterisk } from '../Logo/icons'
import './marquee.css'

const ITEMS = [
  'Sitios institucionales',
  'Tiendas online',
  'Landing pages',
  'Rediseños',
  'Mantenimiento',
]

function Track({ ariaHidden }) {
  return (
    <div className="pb-marquee__track" aria-hidden={ariaHidden || undefined}>
      {ITEMS.map((item) => (
        <span className="pb-marquee__item" key={item}>
          <span className="pb-display">{item}</span>
          <Asterisk width={20} height={20} className="pb-marquee__star" />
        </span>
      ))}
    </div>
  )
}

function Marquee() {
  return (
    <div className="pb-marquee pb-inverse">
      {/* Dos pistas idénticas: la segunda tapa la costura del bucle. */}
      <Track />
      <Track ariaHidden />
    </div>
  )
}
export default Marquee
