# Lo que falta para publicar

Ordenado por urgencia. Todo lo demás ya está funcionando.

---

## 1. Para que el formulario envíe

No van al repo: se cargan en **Vercel → Project Settings → Environment Variables**.

| Variable | Qué es | De dónde sale |
|---|---|---|
| `RESEND_API_KEY` | La clave que permite mandar mails | Cuenta gratis en [resend.com](https://resend.com) → API Keys → Create |
| `CONTACTO_DESTINO` | La casilla donde querés recibir las consultas | Tu correo de verdad |

> **Ojo con esto:** con el remitente de prueba de Resend sólo vas a recibir en la
> casilla con la que te registraste. Para que el mail salga desde tu dominio hay
> que verificarlo en Resend (cargar unos registros DNS) y después setear
> `CONTACTO_REMITENTE`.

Mientras tanto el formulario no rompe: si falla, ofrece WhatsApp.

---

## 2. Datos de contacto reales

**Archivo:** `src/data/contacto.js`

| Campo | Ahora (inventado) | Qué poner |
|---|---|---|
| `email` | `hola@pedrobaez.ar` | Tu correo |
| `whatsapp` | `5491155555555` | Tu número, formato internacional sin `+` ni espacios |
| `whatsappVisible` | `+54 9 11 5555 5555` | El mismo, como querés que se lea |
| `ciudad` | `Buenos Aires, Argentina` | Si es otra |

El número se usa en el botón de contacto, en el flotante y en el pie.

---

## 3. Tu foto

**Dónde:** `public/portrait.jpg`

Se muestra redonda en el hero, al lado de «Hola, soy Pedro Baez». Cuadrada, de
400×400 px para arriba, media vuelta o de frente. Se pasa a blanco y negro por
CSS, no hace falta que la edites.

Si no la ponés, aparece un monograma «PB» y no se rompe nada.

---

## 4. Los testimonios son inventados

**Archivo:** `src/Components/Testimonials/testimonials.jsx`

Es **lo único falso que queda** en todo el sitio, y ahora convive con cinco
proyectos reales. Tres opciones:

- Reemplazarlos por testimonios reales cuando los tengas.
- Sacar la sección hasta entonces (son unas pocas líneas, la saco yo).
- Cambiarla por otra cosa que sí puedas respaldar.

---

## 5. Enlaces vacíos

**Archivo:** `src/Components/Footer/footer.jsx` — hoy apuntan a `#`

- Instagram y LinkedIn → tus perfiles
- Términos y Privacidad → hay que escribirlos, o sacarlos del pie

---

## 6. Opcionales

- **Dominio.** `src/hooks/useMeta.js` tiene `https://pedrobaez.ar` para el
  canonical y las tarjetas al compartir. Cambialo por el real cuando lo tengas.
- **Sitios publicados.** En `src/data/projects.js`, cada proyecto tiene
  `sitio: null`. Si alguno está online, poné el dominio y aparece el enlace solo.
- **Videos de los casos.** MP4 en `public/proyectos/`, apuntados desde `video`.
  Sin ellos, la sección no se renderiza.
- **«Disponible para proyectos — marzo 2026»** en la barra de arriba
  (`src/Components/Navbar/navbar.jsx`): acordate de actualizar la fecha.
