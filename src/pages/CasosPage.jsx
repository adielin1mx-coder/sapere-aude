import { CASES } from '../data';
import { accentFor } from '../tokens';
import Card from '../components/Card';
import CTABanner from '../components/CTABanner';
import FadeIn from '../components/FadeIn';
import PageHeader from '../components/PageHeader';
import Counter from '../motion/Counter';
import SplitTitle from '../motion/SplitTitle';

export default function CasosPage({ setPage }) {
  return (
    <>
      <PageHeader eyebrow="Casos de éxito" title="Resultados reales de empresas reales." />

      {CASES.map((c) => {
        const accent = accentFor(c.area);
        return (
          <section key={c.num} className="section section--tight">
            <div className="container">
              <FadeIn>
                <Card as="article" pad="xl" accent={accent} className="case">
                  <header className="case__head">
                    <div>
                      <div className="case__meta">
                        <span className="case__num">{c.num}</span>
                        <span className="tag">{c.tag}</span>
                      </div>
                      <SplitTitle className="case__company">{c.company}</SplitTitle>
                      <p className="case__info">{c.info}</p>
                    </div>
                    <span className="case__area">
                      <span className="case__area-dot" />
                      {c.area}
                    </span>
                  </header>

                  <div className="case__grid">
                    <div className="case__story">
                      <div className="case__block">
                        <p className="label">El desafío</p>
                        <p className="case__text">{c.challenge}</p>
                      </div>
                      <div className="case__block">
                        <p className="label">Lo que hicimos</p>
                        <p className="case__text">{c.action}</p>
                      </div>
                    </div>

                    <div>
                      <p className="label">Resultados</p>
                      <ul className="results">
                        {c.results.map((r, ri) => (
                          <FadeIn as="li" key={r.lbl} delay={ri * 90} className="result">
                            <Counter className="result__value" value={r.val} />
                            <span className="result__label">{r.lbl}</span>
                          </FadeIn>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            </div>
          </section>
        );
      })}

      <CTABanner
        title="¿Tu empresa podría ser el siguiente caso?"
        subtitle="Agenda tu diagnóstico gratuito y descubre qué palanca tiene el mayor impacto potencial en tu negocio hoy."
        onBtn={() => setPage('Contacto')}
      />
    </>
  );
}
