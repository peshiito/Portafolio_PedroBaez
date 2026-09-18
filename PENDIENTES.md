# Lo que falta para publicar

Ordenado por urgencia. Todo lo demás ya está funcionando.

---

## 1. Cargar las variables en Vercel  ⚠️ FALTA

El formulario ya está **probado y funcionando** (envío real confirmado). Sólo
falta repetir la configuración en Vercel, porque hoy vive en el `.env` local,
que no se sube al repo.

En **Vercel → Project Settings → Environment Variables**:

| Variable | Valor |
|---|---|
| `RESEND_API_KEY` | Tu clave de Resend |
| `CONTACTO_DESTINO` | `pedrogbaez1@gmail.com` |
| `CONTACTO_REMITENTE` | `Portafolio <onboarding@resend.dev>` |

> **Rotá la clave.** La que está en uso pasó por un chat. En Resend → API Keys,
> borrala, creá otra y pegá la nueva directamente en Vercel.

> **Sobre el remitente:** con el de prueba sólo llegan mails a la casilla de tu
> cuenta de Resend. Para que salgan desde tu dominio hay que verificarlo ahí
> (unos registros DNS) y recién entonces cambiar `CONTACTO_REMITENTE`.

Si el envío falla por lo que sea, el formulario ofrece WhatsApp.

---

## 2. Contacto  ✅ LISTO

Tu WhatsApp (`+54 9 11 2530-3909`) ya está cargado, y **no viaja en texto
plano**: en `src/data/contacto.js` está invertido y codificado, y se arma recién
en el navegador. Verificado sobre el build: el número no aparece en ningún
archivo, ni en el HTML ni en los `.js`.

Para cambiarlo más adelante:

```bash
node scripts/codificar-contacto.mjs 5491125303909 "+54 9 11 2530-3909"
```

y pegás las dos constantes que imprime.

**El correo no se muestra, a propósito.** Las consultas entran por el formulario
(que las manda a `CONTACTO_DESTINO`) o por WhatsApp. Si algún día querés
mostrarlo, poné la dirección en `email` de ese mismo archivo y aparece sola.

> **Hasta dónde llega esto:** frena la recolección automática, que es de donde
> viene casi todo el spam. A alguien que se siente a mirar el código no lo
> frena, y no puede: el número tiene que poder marcarse.

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

- Instagram y LinkedIn → tus perfiles (los completás vos)
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
