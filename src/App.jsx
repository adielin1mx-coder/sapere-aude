import { Suspense, useCallback, useEffect, useState, useTransition } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AmbientBackground from './components/AmbientBackground';
import { useGlowTracker } from './components/Card';
import ScrollProgress from './motion/ScrollProgress';
import { PAGES, ROUTES, preloadPage } from './routes';

const PAGE_BY_SLUG = Object.fromEntries(Object.entries(ROUTES).map(([p, s]) => [s, p]));

function readHash() {
  const [slug, anchor] = window.location.hash.replace(/^#\/?/, '').split('/');
  return { page: PAGE_BY_SLUG[slug] || 'Inicio', anchor: anchor || null };
}

function scrollToAnchor(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - 110;
  window.scrollTo({ top, behavior: 'smooth' });
  return true;
}

/** Mientras se descarga una página: la barra de progreso superior "respira". */
const PageFallback = () => <div className="page-loading" aria-hidden="true" />;

export default function App() {
  const [route, setRoute] = useState(readHash);
  // useTransition: la página actual sigue visible mientras la nueva se descarga,
  // en lugar de parpadear a una pantalla vacía.
  const [pending, startTransition] = useTransition();
  useGlowTracker();

  useEffect(() => {
    const onHash = () => startTransition(() => setRoute(readHash()));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Precarga en segundo plano las páginas más visitadas cuando el navegador está libre
  useEffect(() => {
    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500));
    idle(() => ['Servicios', 'Contacto', 'Nosotros'].forEach(preloadPage));
  }, []);

  // Tras cada cambio de página: ir al ancla pedida o al inicio de la página
  useEffect(() => {
    if (route.anchor) {
      requestAnimationFrame(() => {
        if (!scrollToAnchor(route.anchor)) window.scrollTo(0, 0);
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [route]);

  const goTo = useCallback((page, anchor) => {
    const hash = `#/${ROUTES[page] || 'inicio'}${anchor ? `/${anchor}` : ''}`;
    if (window.location.hash === hash) {
      if (anchor) scrollToAnchor(anchor);
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = hash;
  }, []);

  const { page } = route;
  const Page = PAGES[page];

  return (
    <>
      <AmbientBackground />
      <ScrollProgress page={page} />
      <div className={`app-shell${pending ? ' is-pending' : ''}`}>
        <Navbar page={page} setPage={goTo} />
        {/* Suspense fuera del <main> con key: durante la transición se conserva la página anterior */}
        <Suspense fallback={<PageFallback />}>
          <main id="contenido" className="app-main" key={page}>
            <Page setPage={goTo} />
          </main>
        </Suspense>
        <Footer setPage={goTo} />
      </div>
    </>
  );
}
