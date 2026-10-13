import { VALUES, TIMELINE } from '../data';
import { T } from '../tokens';
import Card from '../components/Card';
import CTABanner from '../components/CTABanner';
import FadeIn from '../components/FadeIn';
import Mosaic from '../components/Mosaic';
import PageHeader from '../components/PageHeader';
import Timeline from '../components/Timeline';
import Scramble from '../motion/Scramble';
import SplitTitle from '../motion/SplitTitle';
import { animate, stagger } from 'animejs';
import { playOnEnter, useAnimeScope } from '../motion/anime';

const VALUE_COLORS = [T.magenta, T.cyan, T.orange, T.lime];

export default function NosotrosPage({ setPage }) {
  // Valores: entran en diagonal, como piezas del mosaico acomodándose
  const valuesRef = useAnimeScope((grid) => {
    animate(grid.children, {
      opacity: { from: 0 },
      y: { from: 60 },
      rotate: { from: (_, i) => (i % 2 ? 3 : -3) },
      duration: 1000,
      ease: 'out(4)',
      delay: stagger(110, { grid: [2, 2], from: 'first' }),
      autoplay: playOnEnter(grid, 60),
    });
  });

  return (
    <>
      <PageHeader
        eyebrow="Nosotros"
        title="Un equipo que acompaña y en conjunto encontramos las soluciones más precisas."
      />

      <section className="section section--tight">
        <div className="container">
          <FadeIn>
            <Card pad="xl" className="story">
              <div className="story__text">
                <p>
                  Sapere Aude Solutions nació de una observación simple: la mayoría de las PyMEs en México no fracasan por falta de producto o de mercado. Fracasan por falta de claridad.
                </p>
                <p>
                  Trabajamos con empresas medianas y pequeñas que tienen el potencial de crecer, pero necesitan claridad, estructura y un socio que se comprometa con sus resultados.
                </p>
                <p className="story__highlight">
                  El nombre lo dice todo: <em>Sapere Aude</em> — la máxima de Kant que significa "atrévete a saber". Porque el primer acto de transformación empresarial es tener el valor de ver tu empresa como realmente es.
                </p>
              </div>
              <div className="story__visual" aria-hidden="true">
                <Mosaic interactive={false} />
              </div>
            </Card>
          </FadeIn>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FadeIn className="section-head section-head--center">
            <p className="eyebrow eyebrow--center"><span className="eyebrow__dot" /><Scramble>Trayectoria</Scramble></p>
            <SplitTitle className="section-title">15 años construyendo claridad.</SplitTitle>
          </FadeIn>
          <Timeline items={TIMELINE} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <FadeIn className="section-head">
            <p className="eyebrow"><span className="eyebrow__dot" /><Scramble>Lo que nos define</Scramble></p>
            <SplitTitle className="section-title">
              Valores que no son<br />decorativos.
            </SplitTitle>
          </FadeIn>
          <div className="grid-2" ref={valuesRef}>
            {VALUES.map((v, i) => (
              <div key={v.title}>
                <Card pad="lg" accent={VALUE_COLORS[i % VALUE_COLORS.length]} className="value">
                  <span className="value__index">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="value__title">{v.title}</h3>
                  <p className="value__desc">{v.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="¿Listo para trabajar con nosotros?"
        subtitle="El primer paso es una conversación honesta sobre tu empresa. Sin costo, sin compromiso."
        onBtn={() => setPage('Contacto')}
      />
    </>
  );
}
