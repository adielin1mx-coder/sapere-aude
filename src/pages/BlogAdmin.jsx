import { useState } from 'react';
import Card from '../components/Card';
import FadeIn from '../components/FadeIn';
import Btn from '../components/Btn';

const ADMIN_PASSWORD = 'SapereAude2026';
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzfTBMUvbwkPK_m3FSlfOjFknP181HGYqOY6Jwn78LzdUlSybXu1s_LGa-nnaJBNY9_Vw/exec';

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginGate({ onAuth }) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      localStorage.setItem('blog_admin_auth', '1');
      onAuth();
    } else {
      setError(true);
      setPw('');
    }
  };

  return (
    <section className="section admin-gate">
      <FadeIn>
        <Card pad="xl" className="admin-login">
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🔐</div>
            <h2 style={{ color: 'var(--white)', fontWeight: 700, fontSize: 22 }}>Panel de Administración</h2>
            <p className="text-body" style={{ marginTop: 8 }}>Ingresa la contraseña para continuar.</p>
          </div>
          <form onSubmit={handleSubmit} className="admin-login-form">
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              placeholder="Contraseña"
              className={`field__input${error ? ' field__input--error' : ''}`}
              autoFocus
            />
            {error && <p className="admin-error">Contraseña incorrecta.</p>}
            <Btn type="submit" variant="primary" block>Entrar</Btn>
          </form>
        </Card>
      </FadeIn>
    </section>
  );
}

// ─── Formulario ───────────────────────────────────────────────────────────────
function UploadForm() {
  const [title, setTitle]       = useState('');
  const [category, setCategory] = useState('');
  const [excerpt, setExcerpt]   = useState('');
  const [pdfUrl, setPdfUrl]     = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [error, setError]       = useState('');
  const [status, setStatus]     = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim())  { setError('El título es obligatorio.'); return; }
    if (!pdfUrl.trim()) { setError('La URL del PDF es obligatoria.'); return; }
    setError('');
    setStatus('loading');

    const payload = {
      id:        Date.now().toString(),
      title:     title.trim(),
      category:  category.trim(),
      excerpt:   excerpt.trim(),
      pdfUrl:    pdfUrl.trim(),
      coverUrl:  coverUrl.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      // ⚠️ Sin Content-Type header — Apps Script lo requiere así
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setTitle(''); setCategory(''); setExcerpt('');
        setPdfUrl(''); setCoverUrl('');
      } else {
        setStatus('error');
        setError(data.error || 'Error al guardar en Sheets.');
      }
    } catch (err) {
      setStatus('error');
      setError('No se pudo conectar con Google Sheets. Verifica el Apps Script.');
    }
  };

  return (
    <Card pad="lg" glow={false} className="admin-card">
      <h3 className="upload-form__heading"><span>📤</span> Nuevo artículo</h3>
      <p className="text-body" style={{ fontSize: 13, marginBottom: 20, opacity: 0.7 }}>
        Sube tu PDF a Google Drive, compártelo como "Cualquiera con el enlace puede ver" y pega la URL aquí.
      </p>

      {status === 'success' && (
        <div className="form-success" role="status">
          ✅ Artículo guardado en Google Sheets correctamente.
        </div>
      )}

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="field">
          <label className="field__label">Título *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. Guía de finanzas para PyMEs 2025"
            className="field__input"
          />
        </div>
        <div className="field">
          <label className="field__label">Categoría</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Ej. Finanzas, Operaciones…"
            className="field__input"
          />
        </div>
        <div className="field">
          <label className="field__label">Descripción breve</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Un resumen de qué trata el artículo…"
            className="field__input field__input--area"
            rows={3}
          />
        </div>
        <div className="field">
          <label className="field__label">URL del PDF * (Google Drive)</label>
          <input
            type="url"
            value={pdfUrl}
            onChange={(e) => setPdfUrl(e.target.value)}
            placeholder="https://drive.google.com/file/d/..."
            className="field__input"
          />
        </div>
        <div className="field">
          <label className="field__label">URL de imagen de portada</label>
          <input
            type="url"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="https://drive.google.com/..."
            className="field__input"
          />
        </div>

        {error && <p className="admin-error">{error}</p>}

        <Btn
          type="submit"
          variant="primary"
          block
          disabled={status === 'loading'}
        >
          {status === 'loading' ? '⏳ Guardando...' : '✓ Publicar artículo'}
        </Btn>
      </form>
    </Card>
  );
}

// ─── Panel principal ──────────────────────────────────────────────────────────
export default function BlogAdmin() {
  const [authed, setAuthed] = useState(() => localStorage.getItem('blog_admin_auth') === '1');
  const [tab, setTab] = useState('new');

  const handleLogout = () => {
    localStorage.removeItem('blog_admin_auth');
    setAuthed(false);
  };

  if (!authed) return <LoginGate onAuth={() => setAuthed(true)} />;

  return (
    <>
      <section className="section section--compact">
        <div className="container section-header">
          <FadeIn>
            <p className="eyebrow">Administración</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <h1 className="page-title" style={{ marginBottom: 0 }}>Panel del Blog</h1>
              <Btn variant="ghost" small onClick={handleLogout}>Cerrar sesión</Btn>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="admin-tabs">
            <button
              className={`admin-tab ${tab === 'new' ? 'admin-tab--active' : ''}`}
              onClick={() => setTab('new')}
            >
              + Nuevo artículo
            </button>
            <button
              className={`admin-tab ${tab === 'sheet' ? 'admin-tab--active' : ''}`}
              onClick={() => setTab('sheet')}
            >
              Ver Google Sheet
            </button>
          </div>

          <FadeIn key={tab}>
            {tab === 'new' && <UploadForm />}
            {tab === 'sheet' && (
              <Card pad="lg" className="admin-card">
                <h3 style={{ color: 'var(--white)', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>
                  Tu Google Sheet
                </h3>
                <p className="text-body" style={{ marginBottom: 20 }}>
                  Abre tu hoja para agregar, editar o eliminar artículos.
                </p>
                <Btn
                  variant="primary"
                  onClick={() => window.open('https://docs.google.com/spreadsheets/d/1OfKeab2MG0vx0uLYpGYwPNMn1eQj-H3tU6LWnu1jaXU/edit', '_blank')}
                >
                  Abrir Google Sheet →
                </Btn>
              </Card>
            )}
          </FadeIn>
        </div>
      </section>
    </>
  );
}