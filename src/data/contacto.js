/**
 * Datos de contacto, en un solo lugar.
 * El número va en formato internacional sin espacios ni signos.
 */
export const CONTACTO = {
  email: 'hola@pedrobaez.ar',
  // 54 = Argentina, 9 = celular, 11 = CABA
  whatsapp: '5491155555555',
  whatsappVisible: '+54 9 11 5555 5555',
  ciudad: 'Buenos Aires, Argentina',
}

/** Abre WhatsApp con el mensaje ya escrito, para que no arranque en blanco. */
export function linkWhatsApp(mensaje = 'Hola Pedro, te escribo por mi sitio web.') {
  return `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(mensaje)}`
}
