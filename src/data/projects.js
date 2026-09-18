/**
 * Los proyectos del portafolio.
 *
 * Todos son reales y las capturas salen de correrlos. Los textos de cada caso
 * sí están para reescribir con tus palabras.
 *
 * - `datos` son hechos verificables del proyecto (medidos o contados), no
 *   métricas de negocio: estos son desarrollos propios, no encargos de
 *   clientes, así que no hay resultados comerciales que mostrar.
 * - `testimonio` queda en null a propósito. Cuando tengas uno real, se
 *   completa y aparece solo.
 * - Para sumar un video, poné el MP4 en `public/proyectos/` y apuntá `video`.
 * - `bloques` es opcional: cada uno abre una sección propia con su título, su
 *   texto y su galería. Sirve para contar por separado partes de un proyecto
 *   que no se explican con las mismas capturas (por ejemplo, un panel interno).
 */

export const PROJECTS = [
  {
    slug: 'oficio-barberia',
    name: 'Oficio Barbería',
    year: '2026',
    kind: 'Barbería',
    what: 'Sistema de turnos y gestión',
    sitio: null,
    lugar: 'Buenos Aires',
    rol: 'Diseño, frontend, backend y base de datos',
    duracion: 'Proyecto propio',
    stack: ['React', 'Vite', 'Node', 'Express', 'TypeScript', 'MySQL', 'Docker', 'Chart.js'],

    resumen:
      'Tres piezas que funcionan juntas: la web donde el cliente reserva, el panel donde los barberos manejan la agenda y la caja, y la API con roles que las conecta.',
    desafio:
      'Una barbería que toma turnos por WhatsApp pierde tiempo en cada reserva: hay que mirar la agenda, responder, anotar. Los turnos se superponen, los clientes no avisan que no vienen y a fin de mes nadie sabe bien cuánto entró ni cuánto le corresponde a cada barbero.',
    solucion:
      'El cliente elige barbero, día y hora en la web, y ve solo los huecos que están libres de verdad. Del otro lado, cada barbero abre su agenda del día, cobra, registra adelantos y ve su historial. El administrador suma la vista de finanzas, con el corte por barbero y por período.',
    entregables: [
      'Reserva de turno con disponibilidad real',
      'Agenda diaria por barbero',
      'Ficha de cliente con historial',
      'Caja, cobros y adelantos',
      'Liquidación por comisión de cada barbero',
      'Catálogo de servicios que alimenta la reserva',
      'Tres roles con permisos distintos',
    ],
    datos: [
      { n: '3', label: 'Aplicaciones conectadas' },
      { n: '12', label: 'Tablas en la base' },
      { n: '720 ms', label: 'Carga de la web pública' },
    ],
    testimonio: null,
    portada: '/proyectos/barberia-portada.webp',
    video: null,
    galeria: [
      { src: '/proyectos/barberia-1.webp', alt: 'Lista de precios y servicios de Oficio Barbería' },
      { src: '/proyectos/barberia-2.webp', alt: 'Sección de barberos del sitio' },
      { src: '/proyectos/barberia-3.webp', alt: 'Sucursales y datos de contacto' },
      { src: '/proyectos/barberia-movil.webp', alt: 'La web de la barbería en el celular' },
    ],
    bloques: [
      {
        titulo: 'El panel, por dentro',
        texto:
          'Lo que el cliente no ve es la mitad del proyecto. Cada barbero entra con su cuenta y ve su día: los turnos que tiene, cuánto lleva cobrado y qué le queda por hacer. El administrador ve lo mismo de todos, más la caja y las liquidaciones.',
        galeria: [
          {
            src: '/proyectos/barberia-panel-agenda.webp',
            alt: 'Panel de negocio con los ingresos y turnos del día, la semana y el mes',
          },
          {
            src: '/proyectos/barberia-panel-barberos.webp',
            alt: 'Equipo de barberos, con la comisión y los servicios que ofrece cada uno',
          },
          {
            src: '/proyectos/barberia-panel-servicios.webp',
            alt: 'Catálogo de servicios con precio, duración y barberos que lo realizan',
          },
          {
            src: '/proyectos/barberia-panel-finanzas.webp',
            alt: 'Caja del período, con ingresos y egresos separados por categoría',
          },
          {
            src: '/proyectos/barberia-panel-clientes.webp',
            alt: 'Directorio de clientes con su historial de turnos',
          },
          {
            src: '/proyectos/barberia-panel-horarios.webp',
            alt: 'Configuración de horarios de atención por barbero',
          },
          {
            src: '/proyectos/barberia-panel-movil.webp',
            alt: 'El panel de gestión funcionando en el celular',
          },
        ],
      },
      {
        titulo: 'Quién puede hacer qué',
        texto:
          'Tres roles, con permisos que se cruzan sin pisarse. El barbero maneja lo suyo y nada más. El administrador ve el negocio completo pero no atiende. Y el barbero administrador, que en una barbería chica suele ser el dueño, hace las dos cosas sin cambiar de cuenta.',
        galeria: [],
        lista: [
          {
            k: 'Barbero',
            v: 'Su agenda, sus turnos, sus clientes, sus cobros y sus adelantos. No ve la caja general ni lo que cobran los demás.',
          },
          {
            k: 'Administrador',
            v: 'El negocio completo: agenda de todos, altas de barberos, servicios y tarifas, caja y liquidaciones. Sin agenda propia.',
          },
          {
            k: 'Barbero administrador',
            v: 'Las dos cosas a la vez. Atiende y administra desde la misma cuenta, que es como funciona la mayoría de las barberías chicas.',
          },
        ],
      },
    ],
  },

  {
    slug: 'hardstore-asesor',
    name: 'HardStore',
    year: '2026',
    kind: 'Tienda de hardware',
    what: 'Asesor de ventas con IA',
    sitio: null,
    lugar: 'Proyecto propio',
    rol: 'Diseño, frontend, backend e integración con el modelo',
    duracion: 'Proyecto propio',
    stack: ['React', 'Vite', 'Node', 'Express', 'TypeScript', 'MySQL', 'Docker', 'Groq'],

    resumen:
      'Un asesor que se suma a la web que un comercio ya tiene. El visitante pregunta en su idioma, el modelo deduce las especificaciones que nunca escribió y busca en el catálogo real de la tienda.',
    desafio:
      'El que entra a comprar una pieza de computadora casi nunca sabe qué necesita. Un buscador con filtros no le sirve: para filtrar por socket o por TDP primero hay que saber qué son. Y un chatbot de preguntas frecuentes contesta cualquier cosa menos qué producto comprar.',
    solucion:
      'El modelo recibe la pregunta junto con una herramienta de búsqueda. En vez de contestar de memoria, pide las búsquedas con los criterios que dedujo, el backend las corre contra la base y recién ahí redacta, nombrando únicamente lo que existe en stock. Si no encuentra nada, relaja la búsqueda y lo aclara en vez de decir que no hay.',
    entregables: [
      'Asesor que consulta el stock real',
      'Catálogo con fichas de producto',
      'La clave del modelo nunca llega al navegador',
      'El modelo solo puede nombrar lo que devolvió la búsqueda',
      'Pruebas de seguridad, incluida inyección de instrucciones',
    ],
    datos: [
      { n: '41', label: 'Productos en el catálogo' },
      { n: '6', label: 'Categorías' },
      { n: '296 ms', label: 'Carga inicial' },
    ],
    testimonio: null,
    portada: '/proyectos/chatbot-portada.webp',
    video: null,
    galeria: [
      { src: '/proyectos/chatbot-1.webp', alt: 'El asesor respondiendo con tarjetas de producto reales' },
      { src: '/proyectos/chatbot-2.webp', alt: 'Catálogo de productos de HardStore' },
      { src: '/proyectos/chatbot-3.webp', alt: 'Ficha de un producto' },
      { src: '/proyectos/chatbot-movil.webp', alt: 'El asesor funcionando en el celular' },
    ],
  },

  {
    slug: 'gimnasio',
    name: 'gimnasio.',
    year: '2026',
    kind: 'Gimnasio',
    what: 'Sitio con disciplinas, sedes y planes',
    sitio: null,
    lugar: 'Buenos Aires',
    rol: 'Diseño y desarrollo',
    duracion: 'Proyecto propio',
    stack: ['React', 'Vite', 'React Router'],

    resumen:
      'Un sitio para un gimnasio con varias sedes, donde el que llega puede ver qué se entrena, dónde y cuánto sale, sin tener que escribir para averiguarlo.',
    desafio:
      'Un gimnasio con varias disciplinas y varias sedes tiene un problema de orden: el que entra quiere saber si hay CrossFit cerca de su casa, en qué horario y cuánto cuesta. Si eso no está a la vista, termina preguntando por Instagram y esperando respuesta.',
    solucion:
      'Cada disciplina y cada sede tienen su propia página, con horarios y fotos. Los planes se comparan en una sola pantalla y el botón de WhatsApp queda siempre a mano, con el mensaje ya escrito según de dónde salió.',
    entregables: [
      'Página por disciplina y por sede',
      'Comparación de planes',
      'Preguntas frecuentes en acordeón',
      'Blog para novedades',
      'WhatsApp flotante con mensaje según la sección',
    ],
    datos: [
      { n: '274 ms', label: 'Carga inicial' },
      { n: '37', label: 'Destinos enlazados' },
      { n: '100 %', label: 'Navegable desde el celular' },
    ],
    testimonio: null,
    portada: '/proyectos/gimnasio-portada.webp',
    video: null,
    galeria: [
      { src: '/proyectos/gimnasio-1.webp', alt: 'Sección de disciplinas del gimnasio' },
      { src: '/proyectos/gimnasio-2.webp', alt: 'Planes y precios' },
      { src: '/proyectos/gimnasio-3.webp', alt: 'Preguntas frecuentes y cierre' },
      { src: '/proyectos/gimnasio-movil.webp', alt: 'El sitio del gimnasio en el celular' },
    ],
  },

  {
    slug: 'itech-solutions',
    name: 'iTech Solutions',
    year: '2025',
    kind: 'Venta y reparación de iPhone',
    what: 'Landing de conversión',
    sitio: null,
    lugar: 'Buenos Aires',
    rol: 'Diseño y desarrollo',
    duracion: 'Proyecto propio',
    stack: ['React', 'Vite', 'CSS propio'],

    resumen:
      'Una landing de una sola página para un taller que vende y repara iPhone, armada para que la consulta termine en WhatsApp y no en una visita que se va sin escribir.',
    desafio:
      'El que rompió el teléfono quiere dos cosas: saber si se lo arreglan y cuánto tarda. Todo lo demás sobra. Y el que viene a comprar necesita confiar en que el equipo usado no le va a fallar en una semana.',
    solucion:
      'El sitio pregunta primero qué le pasó al equipo y desde ahí arma la consulta de WhatsApp. El catálogo de usados muestra estado y garantía por escrito, y el plan canje aparece antes del precio, que es lo que destraba la compra.',
    entregables: [
      'Diagnóstico guiado «¿qué le pasó?»',
      'Catálogo de equipos con estado y garantía',
      'Plan canje',
      'Cotización por WhatsApp con el mensaje precargado',
      'Términos y política de privacidad',
    ],
    datos: [
      { n: '7', label: 'Secciones en una sola página' },
      { n: '1', label: 'Objetivo: la consulta por WhatsApp' },
      { n: '0', label: 'Frameworks de CSS' },
    ],
    testimonio: null,
    portada: '/proyectos/iphone-portada.webp',
    video: null,
    galeria: [
      { src: '/proyectos/iphone-1.webp', alt: 'Catálogo de equipos y servicios de iTech Solutions' },
      { src: '/proyectos/iphone-2.webp', alt: 'Diagnóstico guiado según la falla del equipo' },
      { src: '/proyectos/iphone-3.webp', alt: 'Plan canje y sección de contacto' },
      { src: '/proyectos/iphone-movil.webp', alt: 'La landing en el celular' },
    ],
  },

  {
    slug: 'vetclinic',
    name: 'VetClinic',
    year: '2025',
    kind: 'Veterinaria',
    what: 'Sitio institucional con turnos',
    sitio: null,
    lugar: 'Buenos Aires',
    rol: 'Diseño y desarrollo',
    duracion: 'Proyecto propio',
    stack: ['React', 'Vite', 'Framer Motion', 'Wouter'],

    resumen:
      'Un sitio para una veterinaria que tenía que transmitir calma y resolver una sola cosa bien: que el dueño de la mascota pida el turno sin llamar por teléfono.',
    desafio:
      'La gente llega a la web de una veterinaria preocupada, muchas veces de noche y desde el celular. Un sitio cargado de texto o con la guardia escondida en el pie de página no sirve en ese momento.',
    solucion:
      'La guardia 24/7 y el botón de turno quedan arriba de todo. Cada servicio tiene su ficha, con lo que incluye y cuándo hace falta. El modo oscuro no es un adorno: la mitad de las consultas llegan de madrugada.',
    entregables: [
      'Agendado de cita desde cualquier sección',
      'Ficha por servicio',
      'Modo claro y oscuro',
      'Guardia 24/7 siempre visible',
      'Transiciones suaves entre páginas',
    ],
    datos: [
      { n: '252 ms', label: 'Carga inicial' },
      { n: '2', label: 'Temas: claro y oscuro' },
      { n: '6', label: 'Secciones' },
    ],
    testimonio: null,
    portada: '/proyectos/veterinaria-portada.webp',
    video: null,
    galeria: [
      { src: '/proyectos/veterinaria-1.webp', alt: 'Servicios de la veterinaria' },
      { src: '/proyectos/veterinaria-2.webp', alt: 'Sección sobre la clínica y su equipo' },
      { src: '/proyectos/veterinaria-3.webp', alt: 'Testimonios y cierre del sitio' },
      { src: '/proyectos/veterinaria-movil.webp', alt: 'El sitio de la veterinaria en el celular' },
    ],
  },
]

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug)

export const getNext = (slug) => {
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  return PROJECTS[(i + 1) % PROJECTS.length]
}
