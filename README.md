# Portafolio — Pedro Baez

Página de venta para captar clientes de desarrollo web: pymes, comercios y
emprendimientos. No es un portafolio técnico para buscar empleo.

**React 19 + Vite + Bootstrap 5.3 + React Router** (de Bootstrap sólo reboot y
grilla; el resto es CSS propio con tokens de marca). Modo claro y oscuro sobre
`data-bs-theme`.

| Ruta | Qué es |
|---|---|
| `/` | La página de venta |
| `/proyectos/:slug` | Caso de estudio por proyecto |

La dirección visual, los tokens y las decisiones de accesibilidad están en
[`DESIGN.md`](./DESIGN.md).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Verificación

```bash
node scripts/a11y.mjs        # axe-core, WCAG A/AA, en los dos temas
node scripts/interact.mjs    # teclado, toggle de tema y formulario
node scripts/screenshot.mjs /tmp/shots
```

## Contenido

Los proyectos, testimonios y números son de relleno. Para reemplazarlos:

| Qué | Dónde |
|---|---|
| Servicios | `src/Components/Services/services.jsx` |
| Proyectos y casos de estudio | `src/data/projects.js` |
| Capturas de los proyectos | `public/proyectos/` |
| Plantilla vs. a medida | `src/Components/Compare/compare.jsx` |
| Testimonios | `src/Components/Testimonials/testimonials.jsx` |
| Preguntas | `src/Components/Faq/faq.jsx` |
| Tu foto | poné `public/portrait.jpg` (si falta, se muestra un monograma) |
| Fotos y videos de los casos | poné los archivos en `public/proyectos/` y apuntá a ellos desde `src/data/projects.js` |

Mientras una imagen o un video no exista, la página muestra un marcador que dice
qué va ahí, en vez de romperse.

Las capturas se regeneran levantando cada proyecto y corriendo
`scripts/capturar-proyectos.mjs` y `scripts/capturar-dashboard.mjs`.

## El formulario de contacto

No hay backend que mantener. `api/contacto.js` es una **función de Vercel**:
viaja en el mismo deploy que el sitio, arranca en milisegundos y no duerme.
Manda el mail con [Resend](https://resend.com).

Ni tu correo ni la clave aparecen nunca en el navegador: viven en variables de
entorno del servidor.

**Para que funcione, en Vercel → Project Settings → Environment Variables:**

| Variable | Qué es |
|---|---|
| `RESEND_API_KEY` | La clave de tu cuenta de Resend |
| `CONTACTO_DESTINO` | La casilla donde querés recibir las consultas |
| `CONTACTO_REMITENTE` | Opcional. Hasta verificar un dominio en Resend, dejá el de prueba |

Con el remitente de prueba (`onboarding@resend.dev`) sólo podés recibir en la
casilla de tu propia cuenta de Resend. Para mandar desde `hola@pedrobaez.ar`
hay que verificar el dominio en Resend, que es cargar unos registros DNS.

**Contra el spam**, sin captcha ni servicios de terceros: un campo trampa que
sólo completan los bots, un mínimo de tres segundos entre que se abre el
formulario y se envía, límites de largo en cada campo, y la misma validación
corriendo en el navegador y en el servidor.

Si el envío falla por lo que sea, el formulario ofrece WhatsApp en su lugar.

### Probarlo en local

`npm run dev` levanta sólo el sitio: Vite no ejecuta funciones de Vercel, así
que el formulario va a decir que no pudo enviar. Para probarlo de verdad:

```bash
npm i -g vercel
cp .env.example .env     # y completá las variables
vercel dev
```

## Despliegue

Es una SPA con rutas propias, así que el hosting tiene que devolver
`index.html` en cualquier ruta. Ya están `public/_redirects` (Netlify) y
`vercel.json` (Vercel).
