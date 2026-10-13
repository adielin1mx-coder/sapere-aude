import Btn from './Btn';
import FadeIn from './FadeIn';
import ThreeBackdrop from './ThreeBackdrop';
import Magnetic from '../motion/Magnetic';
import SplitTitle from '../motion/SplitTitle';

/**
 * Llamada a la acción: borde de luz en movimiento (estilo 21st.dev) con los
 * haces de luz de ThreeUI en los colores del isotipo detrás.
 */
export default function CTABanner({
  title,
  subtitle,
  btnText = 'Agenda tu diagnóstico gratuito',
  onBtn,
}) {
  return (
    <section className="section">
      <div className="container">
        <FadeIn className="cta">
          <div className="cta__border" aria-hidden="true" />
          <div className="cta__panel">
            <ThreeBackdrop scene="stream" className="cta__backdrop" speed={0.6} />
            <div className="cta__copy">
              <SplitTitle className="cta__title">{title}</SplitTitle>
              {subtitle && <p className="cta__subtitle">{subtitle}</p>}
            </div>
            <Magnetic className="cta__btn">
              <Btn variant="white" large arrow onClick={onBtn}>
                {btnText}
              </Btn>
            </Magnetic>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
