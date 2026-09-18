/**
 * Datos de contacto.
 *
 * El teléfono NO está en texto plano a propósito. Los bots que juntan números
 * para spam hacen una búsqueda por patrón sobre el HTML y sobre los archivos
 * .js del sitio; si el número está escrito tal cual, lo encuentran en cuestión
 * de días. Acá va invertido y codificado, y se arma recién en el navegador.
 *
 * Esto frena la recolección automática, que es de donde viene casi todo el
 * spam. A una persona que se siente a mirar el código no la frena, y no
 * pretende hacerlo: el número tiene que poder marcarse.
 *
 * Para cambiarlo, usá `scripts/codificar-contacto.mjs`.
 */

const _n = 'OTA5MzAzNTIxMTk0NQ=='
const _v = 'OTA5My0wMzUyIDExIDkgNDUr'

const abrir = (s) => {
  try {
    return atob(s).split('').reverse().join('')
  } catch {
    return ''
  }
}

export const CONTACTO = {
  // A propósito en null: un correo escrito en el HTML lo cosechan los bots de
  // spam en cuestión de días. Las consultas entran por el formulario, que lo
  // manda a la casilla configurada en Vercel (CONTACTO_DESTINO), o por
  // WhatsApp. Si algún día querés mostrarlo, poné la dirección acá y aparece
  // sola en la barra de arriba, en contacto y en el pie.
  email: null,
  ciudad: 'Buenos Aires, Argentina',
}

/** El número, listo para usar. Se arma en el navegador, no viaja escrito. */
export const telefono = () => abrir(_n)

/** El número como se lee en pantalla. */
export const telefonoVisible = () => abrir(_v)

/** Abre WhatsApp con el mensaje ya escrito, para que no arranque en blanco. */
export function linkWhatsApp(mensaje = 'Hola Pedro, te escribo por tu sitio web.') {
  return `https://wa.me/${telefono()}?text=${encodeURIComponent(mensaje)}`
}
