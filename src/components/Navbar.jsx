import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NAV_ITEMS } from '../data';
import Logo from './Logo';
import Btn from './Btn';
import { preloadPage } from '../routes';

/**
 * Barra flotante con indicador "tubelight" (port del Tubelight Navbar de 21st.dev):
 * una lámpara de luz se desliza hasta la sección activa.
 */
export default function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pillRef = useRef(null);
  const linkRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Posiciona la lámpara bajo el enlace activo
  useLayoutEffect(() => {
    const place = () => {
      const pill = pillRef.current;
      const link = linkRefs.current[page];
      if (!pill) return;
      if (!link) { pill.style.setProperty('--lamp-o', '0'); return; }
      pill.style.setProperty('--lamp-x', `${link.offsetLeft}px`);
      pill.style.setProperty('--lamp-w', `${link.offsetWidth}px`);
      pill.style.setProperty('--lamp-o', '1');
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [page]);

  // Menú móvil: bloquea el scroll y se cierra con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.body.classList.add('no-scroll');
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handleNav = (item) => {
    setPage(item);
    setOpen(false);
  };

  return (
    <header className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}>
      <div className="nav__bar">
        <button type="button" className="nav__brand" onClick={() => handleNav('Inicio')} aria-label="Sapere Aude Solutions — Inicio">
          <Logo size="nav" />
        </button>

        <nav className="nav__pill" ref={pillRef} aria-label="Principal">
          <span className="nav__lamp" aria-hidden="true"><span className="nav__lamp-light" /></span>
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              ref={(el) => { linkRefs.current[item] = el; }}
              onClick={() => handleNav(item)}
              onPointerEnter={() => preloadPage(item)}
              onFocus={() => preloadPage(item)}
              className={`nav__link${page === item ? ' is-active' : ''}`}
              aria-current={page === item ? 'page' : undefined}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="nav__cta">
          <Btn variant="primary" small onClick={() => handleNav('Contacto')} onPointerEnter={() => preloadPage('Contacto')}>
            Agenda una consulta
          </Btn>
        </div>

        <button
          type="button"
          className="nav__burger"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          aria-expanded={open}
          aria-controls="menu-movil"
        >
          <span /><span />
        </button>
      </div>

      <div id="menu-movil" className="nav__sheet" hidden={!open}>
        <nav className="nav__sheet-links" aria-label="Principal">
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item}
              type="button"
              onClick={() => handleNav(item)}
              onTouchStart={() => preloadPage(item)}
              className={`nav__sheet-link${page === item ? ' is-active' : ''}`}
              style={{ '--i': i }}
            >
              <span className="nav__sheet-num">{String(i + 1).padStart(2, '0')}</span>
              {item}
            </button>
          ))}
        </nav>
        <Btn variant="primary" block onClick={() => handleNav('Contacto')}>
          Agenda una consulta
        </Btn>
      </div>
    </header>
  );
}
