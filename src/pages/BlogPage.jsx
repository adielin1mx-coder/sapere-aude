import { useEffect, useRef, useState } from 'react';
import { T } from '../tokens';
import Btn from '../components/Btn';
import Card from '../components/Card';
import FadeIn from '../components/FadeIn';
import Mosaic from '../components/Mosaic';
import PageHeader from '../components/PageHeader';
import { IconClose, IconDoc } from '../components/Icons';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRoUT7_rwpyQEQYphWI55cD5u798tmESSzPXJo5vr4hUiTsxTxZh_mQ021IgjOOcYgfCwNJ0jKvjBeG/pub?gid=0&single=true&output=csv';

const COVER_COLORS = [T.cyan, T.magenta, T.lime, T.orange, T.violet];

/** Parser CSV (RFC 4180): admite comas, comillas escapadas ("") y saltos de línea dentro de campos. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(field); field = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(field); rows.push(row); row = []; field = '';
    } else field += ch;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function csvToObjects(csv) {
  const [headers, ...lines] = parseCsv(csv.trim());
  if (!headers || !lines.length) return [];
  const keys = headers.map((h) => h.trim());
  return lines
    .map((values) => Object.fromEntries(keys.map((k, i) => [k, (values[i] || '').trim()])))
    .filter((r) => r.id && r.title);
}

function driveId(url) {
  return url?.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] || url?.match(/[?&]id=([a-zA-Z0-9_-]+)/)?.[1];
}

function toEmbedUrl(url) {
  const id = driveId(url);
  return id ? `https://drive.google.com/file/d/${id}/preview` : url || '';
}

function toDownloadUrl(url) {
  const id = driveId(url);
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : url || '';
}

// Las imágenes de Drive se sirven como miniatura; cualquier otra URL se usa tal cual.
function toImageUrl(url) {
  if (!url) return '';
  const id = driveId(url);
  return id && url.includes('drive.google.com') ? `https://drive.google.com/thumbnail?id=${id}&sz=w1000` : url;
}

function formatDate(value) {
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
}

function PdfModal({ post, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const prev = document.activeElement;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('no-scroll');
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('no-scroll');
      prev?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__head">
          <h3 id="modal-title" className="modal__title">{post.title}</h3>
          <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Cerrar">
            <IconClose />
          </button>
        </div>
        <div className="modal__body">
          <iframe src={toEmbedUrl(post.pdfUrl)} title={post.title} className="modal__frame" allow="autoplay" />
        </div>
        <div className="modal__foot">
          <Btn variant="primary" small href={toDownloadUrl(post.pdfUrl)} target="_blank" rel="noopener noreferrer">
            ⬇ Descargar PDF
          </Btn>
        </div>
      </div>
    </div>
  );
}

function Cover({ post, index }) {
  const [failed, setFailed] = useState(false);
  const src = toImageUrl(post.coverUrl);

  if (src && !failed) {
    return <img className="post__img" src={src} alt="" loading="lazy" onError={() => setFailed(true)} />;
  }
  return (
    <div className="post__placeholder" style={{ '--accent': COVER_COLORS[index % COVER_COLORS.length] }}>
      <Mosaic interactive={false} still />
    </div>
  );
}

function PostCard({ post, index, onOpen }) {
  const date = formatDate(post.createdAt);
  return (
    <FadeIn delay={(index % 3) * 80}>
      <Card as="article" pad="none" className="post" onClick={onOpen}>
        <div className="post__cover">
          <Cover post={post} index={index} />
          <span className="post__badge">PDF</span>
        </div>
        <div className="post__body">
          {post.category && <span className="post__category">{post.category}</span>}
          <h3 className="post__title">{post.title}</h3>
          {post.excerpt && <p className="post__excerpt">{post.excerpt}</p>}
          <div className="post__meta">
            {date && <time className="post__date" dateTime={post.createdAt}>{date}</time>}
            <Btn variant="outline" small onClick={(e) => { e.stopPropagation(); onOpen(); }}>Leer →</Btn>
          </div>
        </div>
      </Card>
    </FadeIn>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch(`${SHEET_URL}&t=${Date.now()}`)
      .then((r) => (r.ok ? r.text() : ''))
      .then((csv) => { if (alive) setPosts(csvToObjects(csv)); })
      .catch(() => {})
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return (
    <>
      <PageHeader eyebrow="Blog" title="Artículos e ideas." subtitle="Estrategia, finanzas y operaciones para PyMEs." />

      <section className="section section--tight">
        <div className="container">
          {loading ? (
            <div className="blog-grid" aria-busy="true">
              <p className="sr-only">Cargando artículos...</p>
              {[0, 1, 2].map((i) => <div key={i} className="skeleton" aria-hidden="true" />)}
            </div>
          ) : posts.length === 0 ? (
            <FadeIn>
              <Card pad="xl" className="empty">
                <span className="empty__icon"><IconDoc width={30} height={30} /></span>
                <h2 className="empty__title">Próximamente</h2>
                <p className="empty__text">Estamos preparando artículos sobre estrategia, finanzas y operaciones para PyMEs. Vuelve pronto.</p>
              </Card>
            </FadeIn>
          ) : (
            <div className="blog-grid">
              {posts.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} onOpen={() => setActivePost(post)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {activePost && <PdfModal post={activePost} onClose={() => setActivePost(null)} />}
    </>
  );
}
