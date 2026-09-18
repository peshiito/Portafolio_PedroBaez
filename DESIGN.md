# Pedro Baez — Sistema de diseño

Portafolio comercial. Público: pymes, comercios y emprendimientos que necesitan
una web y no saben cómo encargarla. Objetivo único de la página: que escriban.

## Concepto

**Taller de imprenta.** Rojo semáforo sobre papel sin blanquear, tipografía
condensada de cartel, tinta carbón. No es estética "startup tech": es estética
de oficio. Le habla a alguien que tiene un negocio real, no a un reclutador.

La estructura toma prestado el vocabulario de una **orden de trabajo**: los
servicios son partidas con código, el proceso son etapas, el contacto es un
pedido de presupuesto. Eso encoda algo verdadero del trabajo, no decora.

## Color

| token | hex | rol |
|---|---|---|
| `--pb-bone` | `#E4E2DD` | fondo, modo claro |
| `--pb-bone-2` | `#EDEBE7` | superficie elevada, modo claro |
| `--pb-ink` | `#3A352F` | fondo modo oscuro / texto principal en claro |
| `--pb-ink-2` | `#4A443C` | superficie elevada, modo oscuro |
| `--pb-red` | `#FF3131` | acento único |

Regla: el rojo es señalético, no decorativo. Aparece en el logo, en un elemento
activo por pantalla y en la acción principal. Nunca como relleno de fondo grande
ni como gradiente.

Los dos modos salen del brandbook: claro = imagen `fts/1.png`, oscuro = `fts/2.png`.
El tema vive en `<html data-bs-theme>`, así que Bootstrap y los componentes
propios cambian juntos, y un script en `index.html` lo aplica antes del primer
pintado para que no haya destello.

### El rojo y el contraste

`#FF3131` es un rojo de luminancia media: sobre hueso da **2.8:1**, así que no
llega a AA ni como texto grande. En vez de cambiar el color de marca, hay una
variante por contexto y el `#FF3131` se reserva para superficies, el logo y
texto grande sobre fondo oscuro:

| token | para qué | valor claro | valor oscuro |
|---|---|---|---|
| `--pb-red` | logo, rellenos, bordes | `#FF3131` | `#FF3131` |
| `--pb-red-text` | texto chico en rojo | `#B81E16` | `#FF7A6E` |
| `--pb-red-display` | titulares grandes en rojo | `#F02020` | `#FF3131` |
| `--pb-red-on-fg` | rojo sobre un bloque `--pb-fg` | `#FF3131` | `#C9201A` |

Cada uno tiene su gemelo `*-inv`, que `.pb-inverse` intercambia. Los botones
rojos van a 19px en negrita real (`font-weight: 700`, no sólo
`font-variation-settings`, que no cambia el peso computado): así entran en
"texto grande" de WCAG, donde el umbral es 3:1 y el blanco sobre el rojo de
marca pasa con 3,66.

## Tipografía

**Archivo** (Omnibus-Type, fundición argentina, variable) + **DM Mono**.

| rol | familia | ajustes |
|---|---|---|
| Display | Archivo | `wdth` 68–75, weight 800–900, uppercase, tracking `-0.02em`, leading `0.88` |
| Cuerpo | Archivo | `wdth` 100, weight 400, 17px, leading `1.6` |
| Utilidad | DM Mono | 11px, uppercase, tracking `0.12em` |

Escala: hero `clamp(64px, 14vw, 200px)` · h2 `clamp(40px, 7vw, 96px)` ·
h3 `30px` · cuerpo `17px` · mono `11px`.

Archivo condensada en peso Black da el efecto del ejemplo 3 sin usar Anton ni
Bebas Neue, que están en todos los portafolios.

## Estructura

Dos rutas, con `react-router-dom`:

| Ruta | Qué es |
|---|---|
| `/` | La página de venta completa |
| `/proyectos/:slug` | Caso de estudio por proyecto |

La home va: hero con la presentación · cinta · servicios · plantilla vs. a
medida · proceso · trabajos · testimonios · preguntas · contacto.

## Layout

- Ancho máximo `1280px`, gutter `24px`, grilla de 12 columnas.
- El navbar agrupa los enlaces alrededor del logo (dos y dos) en vez de
  mandarlos a los bordes, y las acciones quedan a la derecha. El logo se centra
  con una grilla propia para que los dos grupos, que no miden lo mismo, no lo
  corran.
- La barra de scroll está oculta a propósito. El scroll sigue andando con
  rueda, teclado y touch, y el nav fijo da la referencia de dónde se está.
- Navbar del ejemplo 2: barra fina de utilidad arriba, debajo el navbar con la
  **B centrada**, links a la izquierda, acciones a la derecha.
- Radios: `0` en bloques estructurales, `999px` sólo en píldoras y botones.
  El contraste entre ambos es intencional; el logo ya es geométrico y redondeado.
- Ritmo vertical: secciones de `120px` a `160px` de padding.

## El elemento firma

La **maqueta que se arma sola** en el hero: un sitio dibujado cuyos bloques
aparecen escalonados al cargar. Es el servicio explicado sin una palabra, y
deja el peso tipográfico para los títulos de sección.

Segundo nivel: el acordeón de servicios como partidas numeradas `SRV—01`, y la
comparativa *plantilla vs. a medida*, donde la columna descartada va tachada y
apagada por color.

Una versión anterior abría con el apellido **BAEZ** en condensada gigante a
sangre. Se descartó: el portafolio tiene que presentar a la persona y hablarle
al cliente, no gritar el apellido.

## Tono

El sitio **no presume antigüedad**. `Est. 2026` está a la vista en el hero y en
el logo: la marca es nueva y no se disimula. Lo que se muestra en su lugar es
trabajo real y compromisos que se pueden cumplir.

El sitio **no pone plazos que enfríen**. Decía «respondo en menos de 24 horas
hábiles» en el hero, en el formulario y en la confirmación: un techo, escrito
como lo escribiría una empresa. Leído por alguien que está decidiendo si
escribe o no, ese número trabaja en contra —«si tarda un día, mejor ni le
escribo»—, y «hábiles» lo empeora. Ahora dice **«hoy mismo»** en los tres
lugares, que además es cumplible trabajando con pocos clientes a la vez.

El sitio **no habla de plata en los llamados a la acción**. El botón dice
«Empecemos tu proyecto», no «Pedir presupuesto»: el que entra a mirar no tiene
que sentir que lo están por cotizar. El precio se trata donde el visitante lo
busca —la pregunta «¿Cómo se define el alcance?» en las preguntas frecuentes—
y no antes.

## Piso de calidad

Verificado con axe-core (WCAG 2.0/2.1/2.2 A y AA) en ambos temas, y con pruebas
de teclado y formulario en Chromium:

- Responsive hasta 360px, sin scroll horizontal.
- Foco visible en rojo, 3px, en todo elemento interactivo.
- Acordeones con `aria-expanded` / `aria-controls`, operables por teclado, y
  panel cerrado marcado `inert` para que no reciba foco.
- El formulario valida en envío, marca `aria-invalid`, muestra el error al lado
  del campo y manda el foco al primero que falla.
- `prefers-reduced-motion` respetado en todo: la cinta se detiene y lo que
  aparece al scrollear queda visible sin moverse.
- Estados `:hover` detrás de `@media (hover: hover)` para que el táctil no los
  dispare al tocar.

**Cero violaciones** de contraste en las dos rutas y los dos temas.

Tres reglas que salieron de esas auditorías y conviene no olvidar:

- **Nunca apagar un bloque con `opacity`.** Bajar la opacidad de un contenedor
  arrastra el contraste de todo lo de adentro por debajo de AA. La columna
  «plantilla» de la comparativa se apaga con color y tachado, no con opacidad.
- **`font-variation-settings: 'wght' 700` no cambia el `font-weight` computado.**
  Ni el navegador ni las herramientas de contraste leen ese texto como negrita,
  así que los botones declaran además `font-weight: 700`.
- **`.visually-hidden` la define este proyecto, no Bootstrap.** Vive en el
  bundle completo, y acá sólo se importan reboot y grid: al adelgazar la
  importación dejó de existir y los rótulos para lectores de pantalla se
  volvieron texto visible. Lo mismo vale para cualquier utilidad de Bootstrap
  que se use fuera de la grilla.

Y una del visor: **`::backdrop` no hereda de ningún elemento**, así que las
variables del tema no llegan hasta ahí. Su color va literal.

## Un error que costó encontrar

La aparición al scrollear marca los elementos con el atributo **`data-in`**, no
con una clase. La primera versión agregaba `is-in` con `classList` desde un
`IntersectionObserver`; al abrir una fila del acordeón React reescribía el
`className` de ese `<li>` y borraba la clase, dejando la fila en `opacity: 0`.
Desaparecían justo las dos filas que cambiaban de estado. React no toca
atributos que no le pasamos, así que `data-in` sobrevive a los re-renderizados.

Regla general: **no mezclar manipulación directa del DOM con propiedades que
React administra.**

El panel cerrado del acordeón colapsa con `grid-template-rows: 0fr`, y por eso
el ítem de la grilla (`.pb-svc__clip`) no lleva padding propio: si lo llevara,
el panel cerrado conservaría ese alto en vez de llegar a cero.

## Los casos de estudio

Cada proyecto tiene su página en `/proyectos/:slug`, armada desde
`src/data/projects.js`. Las capturas salen de correr cada proyecto y
fotografiarlo, no de maquetas dibujadas.

- **`datos`** son hechos verificables (medidos o contados), no métricas de
  negocio: son desarrollos propios, no encargos, así que no hay resultados
  comerciales que mostrar sin inventarlos.
- **`testimonio`** queda en `null`. El bloque aparece solo cuando haya uno real.
- **`bloques`** es opcional y abre secciones propias con su título, su texto y
  su galería. Oficio Barbería lo usa para contar el panel de gestión aparte de
  la web pública, y para la tabla de permisos por rol.
- Las imágenes de galería se pueden **ampliar**: una captura de panel es
  ilegible en un teléfono. El visor usa `<dialog>` nativo, así que el encierro
  del foco, el cierre con Escape y el fondo inerte vienen del navegador; se le
  suma navegación con las flechas.

## Contacto: dos caminos

La sección de contacto ofrece **WhatsApp primero** y el formulario después. Son
dos personas distintas: la que sólo quiere saber si respondés, y la que quiere
contar bien su proyecto. Antes WhatsApp era un renglón más de la lista, con el
mismo peso que la dirección.

Un atajo flotante a WhatsApp acompaña el scroll, pero **aparece recién pasado
el hero** —arriba competiría con el llamado principal— y **se retira en la
sección de contacto**, donde el botón ya está en la página y además quedaba
encima del de enviar, los dos en rojo.

El envío lo resuelve una función de Vercel (`api/contacto.js`), no un servidor
propio: el detalle está en el README.

## Pendientes

- `public/portrait.jpg` no existe: el hero muestra un monograma «PB» en su
  lugar. Al poner la foto ahí, aparece sola.
- **Los testimonios de la home son inventados.** Son los únicos datos falsos
  que quedan, y ahora conviven con cinco proyectos reales, así que conviene
  reemplazarlos por reales o sacar la sección.
- Los tres números del hero son verificables y **ninguno habla de antigüedad**:
  el de proyectos se calcula solo desde `projects.js`, el «100 % código propio»
  es el mismo argumento de la comparativa, y el «hoy» es un compromiso propio.
  Decía «4 años programando» y era falso: la marca arrancó en 2026. Para alguien
  que recién empieza, el trabajo mostrado convence más que los años, y un número
  inflado se cae en la primera charla.
- Faltan videos de recorrido. Van en `public/proyectos/` y se apuntan desde
  `video`; sin ellos, la sección no se renderiza.
- Resend necesita un dominio verificado para que el mail salga desde
  `hola@pedrobaez.ar`. Mientras tanto usa el remitente de prueba, que sólo
  entrega en la casilla de la cuenta de Resend.
- Los proyectos, testimonios, números y textos de los casos son inventados.
- El sitio es una SPA: los metadatos por página los pone `useMeta` en el
  cliente. Si el SEO pasa a importar de verdad, el paso siguiente es
  prerenderizar.

## Herramientas del repo

```bash
npm run dev                            # servidor de desarrollo
node scripts/screenshot.mjs <salida>   # capturas en ambos temas + mobile
node scripts/sections.mjs <salida> <ancho> <tema>   # capturas por sección
node scripts/a11y.mjs                  # auditoría axe en ambos temas
node scripts/interact.mjs              # teclado, tema y formulario
```
