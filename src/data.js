export const NAV_ITEMS = [
  'Inicio',
  'Servicios',
  'Nosotros',
  'Casos de Éxito',
  'Blog',
  'Contacto',
];

export const SERVICES = [
  {
    num: '01',
    title: 'Estrategia Empresarial',
    tagline: 'Claridad de rumbo. Decisiones con propósito.',
    desc: 'La mayoría de las PyMEs operan sin una estrategia explícita — reaccionan al mercado en lugar de liderarlo. Trabajamos contigo para definir dónde quiere estar tu empresa en 3 años y construimos el mapa para llegar.',
    ideal: 'Empresas en etapa de crecimiento o que enfrentan un punto de inflexión.',
    deliverables: [
      'Diagnóstico estratégico completo',
      'Análisis competitivo y de mercado',
      'Definición de propuesta de valor diferenciada',
      'Plan estratégico a 12 y 36 meses',
      'Indicadores clave de desempeño (KPIs)',
    ],
  },
  {
    num: '02',
    title: 'Finanzas y Rentabilidad',
    tagline: 'Transformamos tus números en decisiones.',
    desc: 'Control financiero, estructura de costos y optimización de márgenes. Hablamos de flujo de caja, márgenes y decisiones reales no de presentaciones académicas.',
    ideal: 'Empresas que crecen en ventas pero no ven el dinero en caja.',
    deliverables: [
      'Análisis de rentabilidad por línea de negocio',
      'Estructura de costos y punto de equilibrio',
      'Modelo de flujo de caja proyectado',
      'Estrategia de precios basada en valor',
      'Dashboard financiero ejecutivo',
    ],
  },
  {
    num: '03',
    title: 'Operaciones y Procesos',
    tagline: 'Eficiencia que se traduce en tiempo y dinero.',
    desc: "Mapeamos cómo opera tu empresa hoy, identificamos los cuellos de botella y rediseñamos los procesos clave para que el negocio funcione sin depender de una sola persona.",
    ideal: "Empresas que crecen rápido y sienten que 'todo depende del dueño'.",
    deliverables: [
      'Mapeo de procesos críticos',
      'Identificación de ineficiencias y duplicidades',
      'Manual de operaciones estandarizado',
      'Estructura organizacional clara',
      'Indicadores de productividad operativa',
    ],
  },
  {
    num: '04',
    title: 'Crecimiento y Expansión',
    tagline: 'Crecer con inteligencia, no con improvisación.',
    desc: 'Validamos mercados, diseñamos modelos de expansión y construimos el plan financiero para sostener el crecimiento sin poner en riesgo lo que ya existe.',
    ideal: 'Empresas que quieren expandirse a nuevas regiones o mercados.',
    deliverables: [
      'Análisis de oportunidades de crecimiento',
      'Validación de nuevos mercados o productos',
      'Plan de expansión con hitos y recursos',
      'Estrategia de canales de distribución',
      'Modelo financiero del crecimiento proyectado',
    ],
  },
];

export const CASES = [
  {
    num: '01',
    tag: 'MANUFACTURA',
    area: 'Finanzas y Rentabilidad',
    company: 'Grupo Dark CO',
    info: '85 empleados · Guanajuato',
    challenge: 'La empresa crecía en ventas pero perdía rentabilidad. El dueño no entendía por qué más ingresos significaban menos dinero en caja.',
    action: 'Realizamos un análisis de rentabilidad por línea de producto y descubrimos que el 30% del catálogo generaba pérdidas ocultas. Rediseñamos la estructura de costos y la estrategia de precios.',
    results: [
      { val: '+18%', lbl: 'Margen bruto en 6 meses' },
      { val: '−30%', lbl: 'Líneas de producto no rentables eliminadas' },
      { val: '2.4×', lbl: 'Flujo de caja libre vs. año anterior' },
    ],
  },
  {
    num: '02',
    tag: 'RETAIL',
    area: 'Operaciones y Procesos',
    company: 'Grupo Textil Sky',
    info: '120 empleados · Ciudad de México',
    challenge: 'Cinco tiendas con operaciones completamente diferentes. Sin estándares, sin métricas. El dueño pasaba el 70% de su tiempo apagando incendios.',
    action: 'Estandarizamos los procesos de las 5 unidades, definimos roles y responsabilidades, e implementamos un tablero de control semanal que el dueño revisa en 20 minutos.',
    results: [
      { val: '−40%', lbl: 'Tiempo del dueño en operación' },
      { val: '+25%', lbl: 'Productividad del equipo' },
      { val: '5', lbl: 'Tiendas operando con estándares unificados' },
    ],
  },
  {
    num: '03',
    tag: 'SERVICIOS',
    area: 'Estrategia Empresarial',
    company: 'Grupo de Asesores GAE',
    info: '22 empleados · Ciudad de México',
    challenge: 'Buena reputación pero sin posicionamiento claro. Todos los clientes llegaban por referidos y el precio siempre era negociable.',
    action: 'Definimos tres segmentos de cliente, creamos una propuesta de valor específica para cada uno e implementamos un modelo de precios basado en valor entregado.',
    results: [
      { val: '+45%', lbl: 'Ticket promedio por cliente' },
      { val: '3×', lbl: 'Solicitudes entrantes en 9 meses' },
      { val: '0%', lbl: 'Descuentos otorgados desde la implementación' },
    ],
  },
  {
    num: '04',
    tag: 'TECNOLOGÍA',
    area: 'Estrategia Empresarial',
    company: 'MIJO Brand',
    info: '38 empleados · Jalisco',
    challenge: 'Startup de software con 4 años de operación, buen producto pero sin estrategia comercial clara. Crecían por referidos pero no podían predecir ni escalar sus ingresos.',
    action: 'Definimos el posicionamiento competitivo, rediseñamos la propuesta de valor para tres segmentos de cliente distintos e implementamos un modelo de ventas repetible con métricas de seguimiento.',
    results: [
      { val: '+90%', lbl: 'Ingresos recurrentes en 12 meses' },
      { val: '3×', lbl: 'Tasa de conversión de demos a contratos' },
      { val: '18 meses', lbl: 'Para alcanzar punto de equilibrio proyectado a 3 años' },
    ],
  },
];

export const VALUES = [
  {
    title: 'Franqueza radical',
    desc: 'Te decimos lo que necesitas escuchar, no lo que quieres oír. Si tu modelo de negocio tiene un problema estructural, lo decimos con claridad y con un plan para resolverlo.',
  },
  {
    title: 'Implementación sobre presentaciones',
    desc: 'No entregamos presentaciones de 80 diapositivas y desaparecemos. Acompañamos la ejecución hasta que los cambios se convierten en resultados medibles.',
  },
  {
    title: 'Contexto específico, no recetas',
    desc: 'Cada empresa es diferente. Nunca llegamos con un marco de referencia genérico. Cada intervención parte de entender tu empresa, tu industria y tu momento.',
  },
  {
    title: 'Resultados que se miden',
    desc: 'Si no podemos definir el éxito de forma concreta, no empezamos el proyecto. Trabajamos con métricas reales y reportamos con honestidad.',
  },
];

export const TIMELINE = [
  { year: '2009', text: 'Fundación de Sapere Aude Solutions en Ciudad de México.' },
  { year: '2013', text: 'Expansión a dar soluciones a empresas en cualquier parte Mexico.'},
  { year: '2017', text: 'Lanzamiento de la metodología propia de diagnóstico estratégico para PyMEs.' },
  { year: '2020', text: 'Adaptación al modelo híbrido. Acompañamos a más de 60 empresas durante la crisis.' },
  { year: '2024', text: 'Superamos las 200 PyMEs asesoradas. Tasa de renovación del 94%.' },
];

export const WHY_US = [
  {
    title: 'Diagnóstico profundo',
    body: 'Cada intervención parte de un análisis profundo de tu empresa, tu industria y tu momento.',
  },
  {
    title: 'Hasta ver resultados',
    body: 'No entregamos reportes y desaparecemos. Acompañamos la implementación hasta ver resultados.',
  },
  {
    title: 'Decisiones reales',
    body: 'Hablamos de flujo de caja, márgenes y decisiones reales — no de presentaciones académicas.',
  },
];

export const CONTACT_INFO = [
  { icon: '✉', label: 'CORREO', val: 'contacto@sapere-aude.com.mx' },
  { icon: '💬', label: 'WHATSAPP', val: '+52 55 4098 9964' },
  { icon: '🕐', label: 'HORARIO', val: 'Lunes a viernes, 9:00 – 18:00 CST' },
];
