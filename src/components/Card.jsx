import { useEffect } from 'react';

/**
 * Superficie de vidrio con borde luminoso que sigue al cursor.
 * Port en CSS puro del componente "Glowing Effect" de 21st.dev (Aceternity),
 * con el degradado reconstruido con los colores del logo.
 */
export default function Card({
  as: Tag = 'div',
  pad = 'md',
  glow = true,
  accent,
  className = '',
  style,
  children,
  ...rest
}) {
  const classes = ['card', `card--pad-${pad}`, className].filter(Boolean).join(' ');
  return (
    <Tag
      className={classes}
      style={accent ? { '--accent': accent, ...style } : style}
      data-glow={glow ? '' : undefined}
      {...rest}
    >
      {glow && <span className="card__glow" aria-hidden="true" />}
      {children}
    </Tag>
  );
}

const PROXIMITY = 64;

/**
 * Un único listener global para todas las tarjetas (en lugar de un bucle
 * requestAnimationFrame permanente por tarjeta, como en la versión anterior).
 */
export function useGlowTracker() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches) return;

    let frame = 0;
    let last = null;

    const update = () => {
      frame = 0;
      if (!last) return;
      const { x, y } = last;
      const vh = window.innerHeight;
      document.querySelectorAll('[data-glow]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;

        const active =
          x > r.left - PROXIMITY && x < r.right + PROXIMITY &&
          y > r.top - PROXIMITY && y < r.bottom + PROXIMITY;
        el.style.setProperty('--active', active ? '1' : '0');
        if (!active) return;

        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const current = parseFloat(el.style.getPropertyValue('--start')) || 0;
        const target = (180 * Math.atan2(y - cy, x - cx)) / Math.PI + 90;
        // camino angular más corto para que el brillo no dé la vuelta completa
        const diff = ((((target - current) % 360) + 540) % 360) - 180;
        el.style.setProperty('--start', String(current + diff));
      });
    };

    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onMove = (e) => { last = { x: e.clientX, y: e.clientY }; schedule(); };

    document.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', schedule);
    };
  }, []);
}
