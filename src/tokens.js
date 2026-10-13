// Design tokens — paleta extraída del logo de Sapere Aude Solutions.
// Las variables CSS equivalentes viven en styles/base.css (:root).
export const T = {
  bg:       '#05060d',
  navy:     '#1b379c',
  sky:      '#30a8ea',
  cyan:     '#3bbfee',
  purple:   '#6a0e93',
  violet:   '#96208f',
  magenta:  '#f71070',
  orange:   '#fd8e00',
  yellow:   '#fed600',
  lime:     '#9ccf20',
  green:    '#28a537',
  white:    '#ffffff',
};

// Color de acento por área de consultoría (servicios, casos, formulario)
export const AREA_ACCENT = {
  'Estrategia Empresarial':  T.cyan,
  'Finanzas y Rentabilidad': T.lime,
  'Operaciones y Procesos':  T.orange,
  'Crecimiento y Expansión': T.magenta,
};

export const accentFor = (area) => AREA_ACCENT[area] || T.cyan;
