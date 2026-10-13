import FadeIn from './FadeIn';
import ThreeBackdrop from './ThreeBackdrop';
import Scramble from '../motion/Scramble';
import SplitTitle from '../motion/SplitTitle';

/** Encabezado común de las páginas interiores. */
export default function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <section className="page-header">
      <ThreeBackdrop scene="ribbon" className="page-header__backdrop" pointerAmount={1.2} speed={0.8} />
      <div className="container page-header__inner">
        <p className="eyebrow">
          <span className="eyebrow__dot" />
          <Scramble trigger="load" delay={100}>{eyebrow}</Scramble>
        </p>
        <SplitTitle as="h1" trigger="load" delay={150} className="page-header__title">{title}</SplitTitle>
        {(subtitle || children) && (
          <FadeIn delay={450}>
            {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
            {children}
          </FadeIn>
        )}
      </div>
      <div className="page-header__rule" aria-hidden="true" />
    </section>
  );
}
