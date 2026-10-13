import { animate, stagger } from 'animejs';
import { SERVICES, WHY_US } from '../data';
import { accentFor, T } from '../tokens';
import Btn from '../components/Btn';
import Card from '../components/Card';
import CTABanner from '../components/CTABanner';
import FadeIn from '../components/FadeIn';
import Mosaic from '../components/Mosaic';
import { IconChart, IconScan, IconTarget } from '../components/Icons';
import Counter from '../motion/Counter';
import Magnetic from '../motion/Magnetic';
import Scramble from '../motion/Scramble';
import ScrollWords from '../motion/ScrollWords';
import SplitTitle from '../motion/SplitTitle';
import { playOnEnter, scrub, useAnimeScope } from '../motion/anime';

const STATS = [
  { n: '+200', l: 'PyMEs asesoradas' },
  { n: '94%',  l: 'Tasa de renovación' },
  { n: '3',    l: 'Ciudades de presencia' },
];

const WHY_ICONS = [IconScan, IconTarget, IconChart];
const WHY_COLORS = [T.cyan, T.magenta, T.lime];

export default function HomePage({ setPage }) {
  // Parallax de salida del hero: el isotipo se aleja y el texto se desvanece al bajar
  const heroRef = useAnimeScope((hero) => {
    const opts = { enter: 'top top', leave: 'bottom top', smooth: 0.3 };
    animate(hero.querySelector('.hero__visual'), {
      y: [0, 140], scale: [1, 0.88], opacity: [1, 0.25], ease: 'linear',
      autoplay: scrub(hero, opts),
    });
    animate(hero.querySelector('.hero__copy'), {
      y: [0, -70], opacity: [1, 0], ease: 'linear',
      autoplay: scrub(hero, { ...opts, leave: 'bottom+=10% top' }),
    });
  });

  // Tarjetas del bento: entran inclinadas en 3D y se enderezan en cascada
  const bentoRef = useAnimeScope((grid) => {
    animate(grid.querySelectorAll('.bento__cell'), {
      opacity: { from: 0 },
      y: { from: 80 },
      rotateX: { from: 22 },
      scale: { from: 0.94 },
      duration: 1100,
      ease: 'out(4)',
      delay: stagger(110),
      autoplay: playOnEnter(grid, 60),
    });
  });

  // Tarjetas "por qué nosotros": aparecen desde el centro hacia los lados
  const whyRef = useAnimeScope((grid) => {
    // se anima el contenedor, no la tarjeta, para no chocar con las transiciones CSS de .card
    animate(grid.children, {
      opacity: { from: 0 },
      y: { from: 50 },
      duration: 900,
      ease: 'out(4)',
      delay: stagger(120, { from: 'center' }),
      autoplay: playOnEnter(grid, 60),
    });
    animate(grid.querySelectorAll('.feature__icon'), {
      scale: { from: 0 },
      rotate: { from: -90 },
      duration: 1200,
      ease: 'outElastic(1, .6)',
      delay: stagger(120, { from: 'center', start: 250 }),
      autoplay: playOnEnter(grid, 60),
    });
  });

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" ref={heroRef}>
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--pill hero__in" style={{ '--d': 0 }}>
              <span className="eyebrow__pulse" />
              <Scramble trigger="load" delay={300}>Consultoría estratégica para PyMEs</Scramble>
            </p>
            <h1 className="hero__title">
              <span className="hero__line hero__in" style={{ '--d': 1 }}>Claridad para crecer.</span>
              <span className="hero__line hero__line--accent hero__in" style={{ '--d': 2 }}>Inteligencia para decidir.</span>
            </h1>
            <p className="hero__lead hero__in" style={{ '--d': 3 }}>
              Somos el socio estratégico que tu empresa necesita para dejar de reaccionar y empezar a liderar con soluciones que dan resultados medibles.
            </p>
            <div className="hero__actions hero__in" style={{ '--d': 4 }}>
              <Magnetic>
                <Btn variant="primary" large arrow onClick={() => setPage('Servicios')}>
                  Conoce nuestros servicios
                </Btn>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Btn variant="ghost" large onClick={() => setPage('Contacto')}>
                  Agenda un diagnóstico
                </Btn>
              </Magnetic>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__orbit" aria-hidden="true" />
            <Mosaic className="hero__mosaic" draggable />
            <ul className="hero__stats">
              {STATS.map((s, i) => (
                <li key={s.l} className={`hero__stat hero__stat--${i + 1}`}>
                  <Card pad="sm" className="stat">
                    <p className="stat__value"><Counter value={s.n} /></p>
                    <p className="stat__label">{s.l}</p>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hero__fade" aria-hidden="true" />
      </section>

      {/* ── FILOSOFÍA ── */}
      <section className="section">
        <div className="container container--narrow">
          <FadeIn>
            <p className="eyebrow eyebrow--center">
              <span className="eyebrow__line" />
              <Scramble>Nuestra filosofía</Scramble>
              <span className="eyebrow__line" />
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <Card pad="xl" className="manifesto">
              <ScrollWords as="h2" className="manifesto__quote">
                "La mayoría de los problemas empresariales no son de recursos — son de{' '}
                <em className="manifesto__em">claridad.</em>{' '}
                Nosotros ponemos orden donde hay desconcierto."
              </ScrollWords>
              <div className="spectrum-line spectrum-line--short" aria-hidden="true" />
              <p className="manifesto__body">
                <em>Sapere Aude</em> — atrévete a saber. No somos una consultora de presentaciones bonitas. Somos el socio que te dice lo que necesitas escuchar y te acompaña a ejecutarlo.
              </p>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* ── ÁREAS DE CONSULTORÍA (bento) ── */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <SplitTitle className="section-title">Áreas de consultoría</SplitTitle>
            <FadeIn delay={200}>
              <p className="section-lead">
                Intervenciones concretas en las cuatro palancas que determinan el desempeño de cualquier PyME.
              </p>
            </FadeIn>
          </div>

          <div className="bento" ref={bentoRef}>
            {SERVICES.map((s, i) => (
              <div key={s.num} className={`bento__cell bento__cell--${i + 1}`}>
                <Card
                  as="article"
                  pad="lg"
                  accent={accentFor(s.title)}
                  className="service-tile"
                  onClick={() => setPage('Servicios', `servicio-${s.num}`)}
                >
                  <span className="service-tile__ghost" aria-hidden="true">{s.num}</span>
                  <div className="service-tile__top">
                    <span className="service-tile__num">{s.num}</span>
                    <span className="service-tile__bar" aria-hidden="true" />
                  </div>
                  <h3 className="service-tile__title">{s.title}</h3>
                  <p className="service-tile__tagline">{s.tagline}</p>
                  <p className="service-tile__desc">{s.desc}</p>
                  <button
                    type="button"
                    className="link-arrow"
                    onClick={(e) => { e.stopPropagation(); setPage('Servicios', `servicio-${s.num}`); }}
                  >
                    Ver detalles →
                  </button>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POR QUÉ NOSOTROS ── */}
      <section className="section">
        <div className="container">
          <div className="grid-3" ref={whyRef}>
            {WHY_US.map((f, i) => {
              const Icon = WHY_ICONS[i % WHY_ICONS.length];
              return (
                <div key={f.title}>
                  <Card pad="md" accent={WHY_COLORS[i]} className="feature">
                    <span className="feature__icon"><Icon /></span>
                    <h3 className="feature__title">{f.title}</h3>
                    <p className="feature__body">{f.body}</p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner
        title="El primer paso es el más importante."
        subtitle="Agenda tu diagnóstico gratuito de 45 minutos. Sin compromiso, con claridad total sobre dónde está tu empresa y hacia dónde puede ir."
        onBtn={() => setPage('Contacto')}
      />
    </>
  );
}
