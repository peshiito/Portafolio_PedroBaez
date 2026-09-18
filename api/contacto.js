import { Resend } from 'resend'

/**
 * Recibe el formulario de contacto y lo manda por mail.
 *
 * Corre como función de Vercel: va en el mismo deploy que el sitio, no hay
 * servidor que mantener y no duerme. La clave y la casilla de destino viven
 * en variables de entorno del servidor, así que nunca llegan al navegador.
 */

const LIMITE = 4000 // un mensaje más largo que esto no es una consulta
const MIN_SEGUNDOS = 3 // nadie completa un formulario legítimo más rápido

const esEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)
const limpiar = (v, max) => String(v ?? '').trim().slice(0, max)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const clave = process.env.RESEND_API_KEY
  const destino = process.env.CONTACTO_DESTINO
  if (!clave || !destino) {
    // Falta configuración del lado del servidor: no es culpa del visitante,
    // y el detalle queda en los logs, no en la respuesta.
    console.error('Faltan RESEND_API_KEY o CONTACTO_DESTINO')
    return res.status(500).json({ error: 'No pudimos enviar el mensaje. Probá por WhatsApp.' })
  }

  const cuerpo = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {}

  // Trampa para bots: el campo está oculto, una persona nunca lo completa.
  if (limpiar(cuerpo.apellido, 50)) return res.status(200).json({ ok: true })

  // Enviado demasiado rápido para haberlo escrito.
  const demora = Number(cuerpo.t) ? (Date.now() - Number(cuerpo.t)) / 1000 : 99
  if (demora < MIN_SEGUNDOS) return res.status(200).json({ ok: true })

  const nombre = limpiar(cuerpo.nombre, 120)
  const email = limpiar(cuerpo.email, 160)
  const negocio = limpiar(cuerpo.negocio, 160)
  const necesita = limpiar(cuerpo.necesita, 120)
  const mensaje = limpiar(cuerpo.mensaje, LIMITE)

  const errores = {}
  if (!nombre) errores.nombre = 'Poné tu nombre así sé cómo llamarte.'
  if (!email) errores.email = 'Necesito un mail para contestarte.'
  else if (!esEmail(email)) errores.email = 'Revisá el mail, parece incompleto.'
  if (!mensaje) errores.mensaje = 'Contame aunque sea dos renglones.'
  if (Object.keys(errores).length) return res.status(422).json({ errores })

  const texto = [
    `Nombre:   ${nombre}`,
    `Email:    ${email}`,
    negocio && `Negocio:  ${negocio}`,
    necesita && `Necesita: ${necesita}`,
    '',
    mensaje,
  ]
    .filter(Boolean)
    .join('\n')

  try {
    const resend = new Resend(clave)
    const { error } = await resend.emails.send({
      from: process.env.CONTACTO_REMITENTE || 'Portafolio <onboarding@resend.dev>',
      to: destino,
      subject: `Consulta de ${nombre}${negocio ? ` — ${negocio}` : ''}`,
      // Responder al mail abre la respuesta directo al visitante
      replyTo: email,
      text: texto,
    })
    if (error) throw new Error(error.message)
    return res.status(200).json({ ok: true })
  } catch (e) {
    console.error('Resend falló:', e)
    return res.status(502).json({ error: 'No pudimos enviar el mensaje. Probá por WhatsApp.' })
  }
}
