import { lazy } from 'react';

/*
 * Cada página es un fragmento de JavaScript independiente (code-splitting).
 * `preloadPage` lo descarga por adelantado cuando el usuario pasa el cursor
 * o enfoca un enlace, así al hacer clic la página ya está lista.
 */
const loaders = {
  'Inicio':         () => import('./pages/HomePage'),
  'Servicios':      () => import('./pages/ServiciosPage'),
  'Nosotros':       () => import('./pages/NosotrosPage'),
  'Casos de Éxito': () => import('./pages/CasosPage'),
  'Blog':           () => import('./pages/BlogPage'),
  'Contacto':       () => import('./pages/ContactoPage'),
  'Admin':          () => import('./pages/BlogAdmin'),
};

export const PAGES = Object.fromEntries(Object.entries(loaders).map(([k, load]) => [k, lazy(load)]));

const preloaded = new Set();
export function preloadPage(page) {
  if (!loaders[page] || preloaded.has(page)) return;
  preloaded.add(page);
  loaders[page]().catch(() => preloaded.delete(page));
}

// Rutas por hash: funcionan en GitHub Pages / GoDaddy sin configurar el servidor.
export const ROUTES = {
  'Inicio':         'inicio',
  'Servicios':      'servicios',
  'Nosotros':       'nosotros',
  'Casos de Éxito': 'casos-de-exito',
  'Blog':           'blog',
  'Contacto':       'contacto',
  'Admin':          'admin',
};
