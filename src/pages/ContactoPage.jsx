import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { CONTACT_INFO } from '../data';
import { accentFor, T } from '../tokens';
import Btn from '../components/Btn';
import Card from '../components/Card';
import FadeIn from '../components/FadeIn';
import PageHeader from '../components/PageHeader';
import { IconCheck, IconChevron, IconClock, IconMail, IconWhatsApp } from '../components/Icons';

const EMAILJS_SERVICE_ID = 'service_7mq0w6a';
const EMAILJS_TEMPLATE_ID = 'template_w49m3ei';
const EMAILJS_PUBLIC_KEY = 'BKBUS4dv9NRdu_Rre';

const AREAS = [
  'Estrategia Empresarial',
  'Finanzas y Rentabilidad',
  'Operaciones y Procesos',
  'Crecimiento y Expansión',
  'Gobierno Corporativo',
  'Regulacion Normativa',
  'Desarrollo de Tecnologias',
  'Otros / Necesito orientación',
];

const EXTRA_ACCENTS = {
  'Gobierno Corporativo':      T.violet,
  'Regulacion Normativa':      T.yellow,
  'Desarrollo de Tecnologias': T.sky,
  'Otros / Necesito orientación': '#c9d3ea',
};

const REGULACION_OPCIONES = ['SAT', 'IMSS', 'INFONAVIT', 'COFEPRIS', 'CERTIFICACIONES'];

const STEPS = [
  'Agendas una videollamada de 45 minutos.',
  'Analizamos las 4 palancas de tu empresa.',
  'Identificamos el área de mayor impacto.',
  'Te presentamos un plan de acción concreto.',
];

const CONTACT_ICONS = { CORREO: IconMail, WHATSAPP: IconWhatsApp, HORARIO: IconClock };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function RegulacionDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = (op) => onChange(selected.includes(op) ? selected.filter((s) => s !== op) : [...selected, op]);

  return (
    <div ref={ref} className={`select${open ? ' is-open' : ''}`}>
      <button
        type="button"
        id="regulacion"
        className="field__input select__trigger"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected.length ? '' : 'is-placeholder'}>
          {selected.length === 0 ? 'Selecciona una o más opciones...' : selected.join(', ')}
        </span>
        <IconChevron className="select__chevron" />
      </button>

      {open && (
        <ul className="select__menu" role="listbox" aria-multiselectable="true">
          {REGULACION_OPCIONES.map((op) => {
            const active = selected.includes(op);
            return (
              <li key={op}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={`select__option${active ? ' is-active' : ''}`}
                  onClick={() => toggle(op)}
                >
                  <span className="checkbox">{active && <IconCheck width={12} height={12} strokeWidth={2.5} />}</span>
                  {op}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Field({ id, label, required, children }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label} {required && <span className="field__req">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function ContactoPage() {
  const [form, setForm] = useState({
    nombre: '', cargo: '', correo: '', tel: '',
    empresa: '', tamano: '', areas: [], regulacion: [], reto: '',
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const toggleArea = (area) => setForm((f) => ({
    ...f,
    areas: f.areas.includes(area) ? f.areas.filter((a) => a !== area) : [...f.areas, area],
    // al quitar "Regulacion Normativa" se limpia su sub-selección para no enviarla oculta
    regulacion: area === 'Regulacion Normativa' && f.areas.includes(area) ? [] : f.regulacion,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.correo.trim() || !form.empresa.trim()) {
      setError('Por favor completa los campos obligatorios: nombre, correo y empresa.');
      return;
    }
    if (!EMAIL_RE.test(form.correo.trim())) {
      document.getElementById('correo')?.reportValidity?.();
      return;
    }
    setError('');
    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          nombre:     form.nombre,
          cargo:      form.cargo,
          correo:     form.correo,
          tel:        form.tel,
          empresa:    form.empresa,
          tamano:     form.tamano,
          areas:      form.areas.join(', '),
          regulacion: form.regulacion.join(', '),
          reto:       form.reto,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Hubo un problema al enviar el mensaje. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const showRegulacion = form.areas.includes('Regulacion Normativa');

  return (
    <>
      <PageHeader eyebrow="Contacto" title="Hablemos de tu empresa." />

      <section className="section section--tight">
        <div className="container contact">
          <FadeIn>
            <Card pad="xl" glow={false} className="contact__form">
              {sent ? (
                <div className="success" role="status">
                  <span className="success__icon"><IconCheck width={34} height={34} strokeWidth={2} /></span>
                  <h2 className="success__title">¡Mensaje enviado!</h2>
                  <p className="success__text">Te contactaremos en menos de 24 horas hábiles.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <fieldset className="form-step">
                    <legend className="form-step__title"><span className="form-step__num">01</span>Información de contacto</legend>
                    {error && <div className="form-error" role="alert">{error}</div>}
                    <div className="form-grid">
                      <Field id="nombre" label="Nombre completo" required>
                        <input id="nombre" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej. Carlos Ramírez" className="field__input" autoComplete="name" required />
                      </Field>
                      <Field id="cargo" label="Cargo">
                        <input id="cargo" name="cargo" value={form.cargo} onChange={handleChange} placeholder="Ej. Director General" className="field__input" autoComplete="organization-title" />
                      </Field>
                      <Field id="correo" label="Correo electrónico" required>
                        <input id="correo" name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="correo@empresa.com" className="field__input" autoComplete="email" required />
                      </Field>
                      <Field id="tel" label="Teléfono">
                        <input id="tel" name="tel" type="tel" value={form.tel} onChange={handleChange} placeholder="+52 55 1234 5678" className="field__input" autoComplete="tel" />
                      </Field>
                    </div>
                  </fieldset>

                  <fieldset className="form-step">
                    <legend className="form-step__title"><span className="form-step__num">02</span>Tu empresa</legend>
                    <div className="form-grid">
                      <Field id="empresa" label="Nombre de la empresa" required>
                        <input id="empresa" name="empresa" value={form.empresa} onChange={handleChange} placeholder="Ej. Distribuidora XYZ" className="field__input" autoComplete="organization" required />
                      </Field>
                      <Field id="tamano" label="Tamaño de la empresa">
                        <div className="native-select">
                          <select id="tamano" name="tamano" value={form.tamano} onChange={handleChange} className="field__input">
                            <option value="">Selecciona...</option>
                            <option>1–10 empleados</option>
                            <option>11–50 empleados</option>
                            <option>51–200 empleados</option>
                            <option>200+ empleados</option>
                          </select>
                          <IconChevron className="select__chevron" />
                        </div>
                      </Field>
                    </div>
                  </fieldset>

                  <fieldset className="form-step">
                    <legend className="form-step__title"><span className="form-step__num">03</span>Áreas de interés</legend>
                    <p className="field__label">¿En qué área te gustaría trabajar con nosotros?</p>
                    <div className="chips">
                      {AREAS.map((area) => {
                        const active = form.areas.includes(area);
                        return (
                          <button
                            key={area}
                            type="button"
                            className={`chip chip--toggle${active ? ' is-active' : ''}`}
                            style={{ '--accent': EXTRA_ACCENTS[area] || accentFor(area) }}
                            onClick={() => toggleArea(area)}
                            aria-pressed={active}
                          >
                            <span className="chip__check" aria-hidden="true"><IconCheck width={12} height={12} strokeWidth={2.5} /></span>
                            {area}
                          </button>
                        );
                      })}
                    </div>

                    {showRegulacion && (
                      <div className="field field--reveal">
                        <label className="field__label" htmlFor="regulacion">¿Qué tipo de regulación normativa necesitas?</label>
                        <RegulacionDropdown
                          selected={form.regulacion}
                          onChange={(val) => setForm((f) => ({ ...f, regulacion: val }))}
                        />
                      </div>
                    )}
                  </fieldset>

                  <fieldset className="form-step">
                    <legend className="form-step__title"><span className="form-step__num">04</span>Cuéntanos más</legend>
                    <Field id="reto" label="¿Cuál es el principal reto que enfrenta tu empresa hoy?">
                      <textarea
                        id="reto" name="reto" value={form.reto} onChange={handleChange} rows={5}
                        placeholder="Describe brevemente la situación actual de tu empresa y qué resultado esperas de una consultoría..."
                        className="field__input field__input--area"
                      />
                    </Field>
                  </fieldset>

                  <Btn type="submit" variant="primary" large block arrow disabled={loading}>
                    {loading ? 'Enviando...' : 'Solicitar diagnóstico gratuito'}
                  </Btn>
                  <p className="form-note">
                    Responderemos en menos de 24 horas hábiles. Sin spam, sin compromiso.
                  </p>
                </form>
              )}
            </Card>
          </FadeIn>

          <aside className="contact__aside">
            <FadeIn delay={100}>
              <Card pad="md" className="info">
                <h3 className="aside-title">Información de contacto</h3>
                <ul className="info__list">
                  {CONTACT_INFO.map((f) => {
                    const Icon = CONTACT_ICONS[f.label];
                    return (
                      <li key={f.label} className={`info__item info__item--${f.label.toLowerCase()}`}>
                        <span className="info__icon">{Icon ? <Icon /> : f.icon}</span>
                        <div>
                          <p className="info__label">{f.label}</p>
                          {f.label === 'WHATSAPP' ? (
                            <a
                              className="info__value info__value--wa"
                              href={`https://wa.me/52${f.val.replace(/\D/g, '').slice(-10)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {f.val} →
                            </a>
                          ) : f.label === 'CORREO' ? (
                            <a className="info__value info__value--link" href={`mailto:${f.val}`}>{f.val}</a>
                          ) : (
                            <p className="info__value">{f.val}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </FadeIn>

            <FadeIn delay={180}>
              <Card pad="md" accent={T.magenta} className="quote">
                <p className="quote__text">
                  "El diagnóstico gratuito fue más valioso que consultorías por las que pagué miles de pesos."
                </p>
                <p className="quote__author">— Dueño de empresa manufacturera, Querétaro</p>
              </Card>
            </FadeIn>

            <FadeIn delay={260}>
              <Card pad="md" className="steps">
                <h3 className="aside-title">¿Cómo funciona el diagnóstico?</h3>
                <ol className="steps__list">
                  {STEPS.map((step, i) => (
                    <li key={step} className="steps__item">
                      <span className="steps__badge">{i + 1}</span>
                      <p>{step}</p>
                    </li>
                  ))}
                </ol>
              </Card>
            </FadeIn>
          </aside>
        </div>
      </section>
    </>
  );
}
