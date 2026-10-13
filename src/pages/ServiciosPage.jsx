import { SERVICES } from '../data';
import { accentFor } from '../tokens';
import Card from '../components/Card';
import CTABanner from '../components/CTABanner';
import FadeIn from '../components/FadeIn';
import PageHeader from '../components/PageHeader';
import SplitTitle from '../motion/SplitTitle';
import { animate, stagger } from 'animejs';
import { playOnEnter, scrub, useAnimeScope } from '../motion/anime';

function jump(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' });
}

// Entregables en cascada + número gigante con parallax ligado al scroll
function ServiceBlock({ s }) {
  const ref = useAnimeScope((section) => {
    const list = section.querySelector('.deliverables');
    animate(list.querySelectorAll('.deliverable'), {
      opacity: { from: 0 },
      x: { from: -40 },
      duration: 800,
      ease: 'out(4)',
      delay: stagger(90),
      autoplay: playOnEnter(list, 60),
    });
    animate(list, {
      '--line': [0, 1],
      duration: 1400,
      ease: 'inOut(3)',
      autoplay: playOnEnter(list, 60),
    });
    animate(section.querySelector('.service__num'), {
      y: [40, -40],
      ease: 'linear',
      autoplay: scrub(section),
    });
  });

  return (
    <section
      ref={ref}
      id={`servicio-${s.num}`}
      className="section service"
      style={{ '--accent': accentFor(s.title) }}
    >
      <div className="container service__grid">
        <FadeIn className="service__aside">
          <Card pad="lg" accent={accentFor(s.title)} className="service__card">
            <span className="service__num" aria-hidden="true">{s.num}</span>
            <SplitTitle className="service__title">{s.title}</SplitTitle>
            <p className="service__tagline">{s.tagline}</p>
            <p className="service__desc">{s.desc}</p>
            <div className="ideal">
              <span className="ideal__arrow" aria-hidden="true">→</span>
              <p><strong>Ideal para:</strong> {s.ideal}</p>
            </div>
          </Card>
        </FadeIn>

        <div className="service__main">
          <FadeIn>
            <p className="label">Entregables</p>
          </FadeIn>
          <ol className="deliverables">
            {s.deliverables.map((d, di) => (
              <li key={d} className="deliverable">
                <span className="deliverable__num">{String(di + 1).padStart(2, '0')}</span>
                <p className="deliverable__text">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default function ServiciosPage({ setPage }) {
  return (
    <>
      <PageHeader eyebrow="Servicios" title="Intervenciones que mueven el negocio.">
        <div className="chips chips--nav">
          {SERVICES.map((s) => (
            <button
              key={s.num}
              type="button"
              className="chip"
              style={{ '--accent': accentFor(s.title) }}
              onClick={() => jump(`servicio-${s.num}`)}
            >
              <span className="chip__num">{s.num}</span>{s.title}
            </button>
          ))}
        </div>
      </PageHeader>

      {SERVICES.map((s) => <ServiceBlock key={s.num} s={s} />)}

      <CTABanner
        title="¿No sabes por dónde empezar?"
        subtitle="Agenda tu diagnóstico gratuito de 45 minutos y te diremos exactamente qué área tiene el mayor impacto potencial en tu empresa hoy."
        onBtn={() => setPage('Contacto')}
      />
    </>
  );
}
