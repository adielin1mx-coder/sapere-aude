import Logo from './Logo';

const FOOTER_NAV = ['Inicio', 'Servicios', 'Nosotros', 'Casos de Éxito', 'Contacto'];

export default function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="spectrum-line" aria-hidden="true" />
      <div className="container footer__inner">
        <div className="footer__grid">
          <div className="footer__brand">
            <button type="button" className="footer__logo" onClick={() => setPage('Inicio')} aria-label="Sapere Aude Solutions — Inicio">
              <Logo size="footer" />
            </button>
            <p className="footer__text">
              Consultoría estratégica para empresas que se atreven a crecer con inteligencia.
            </p>
          </div>

          <div>
            <p className="footer__heading">Navegación</p>
            <ul className="footer__list">
              {FOOTER_NAV.map((item) => (
                <li key={item}>
                  <button type="button" onClick={() => setPage(item)} className="footer__link">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer__heading">Contacto</p>
            <a className="footer__mail" href="mailto:contacto@sapere-aude.com.mx">
              contacto@sapere-aude.com.mx
            </a>
            <button type="button" onClick={() => setPage('Contacto')} className="footer__cta">
              Agenda tu diagnóstico gratuito →
            </button>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© 2026 Sapere Aude Solutions. Todos los derechos reservados.</p>
          <p className="footer__motto">"Atrévete a saber."</p>
        </div>
      </div>
    </footer>
  );
}
