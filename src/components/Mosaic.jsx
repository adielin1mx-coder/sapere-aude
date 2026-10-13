import { useEffect, useRef } from 'react';
import { createAnimatable } from 'animejs';
import { T } from '../tokens';
import { canAnimate, hasFinePointer } from '../motion/anime';

// Cuadros del isotipo, medidos sobre el logo original (posición/tamaño en % del lienzo).
export const SQUARES = [
  { x: 15.5, y: 29,   s: 23.3, c: T.purple,  d: 0.6 },
  { x: 31,   y: 25,   s: 18.1, c: T.violet,  d: 0.9 },
  { x: 50,   y: 17,   s: 18.1, c: T.green,   d: 1.2 },
  { x: 59.5, y: 17,   s: 14.7, c: T.lime,    d: 1.6 },
  { x: 48.3, y: 68,   s: 19,   c: T.magenta, d: 0.8 },
  { x: 43,   y: 48,   s: 19,   c: T.magenta, d: 1.1 },
  { x: 19,   y: 65,   s: 17.2, c: T.navy,    d: 0.7 },
  { x: 28.4, y: 59,   s: 13.8, c: T.sky,     d: 1.4 },
  { x: 76.2, y: 69.6, s: 7.8,  c: T.orange,  d: 1.8 },
  { x: 67.2, y: 73,   s: 13.8, c: T.yellow,  d: 1.5 },
  { x: 91,   y: 83.6, s: 5.5,  c: T.navy,    d: 2.2 },
  { x: 86.2, y: 88,   s: 7.8,  c: T.cyan,    d: 2.0 },
];

/**
 * Isotipo de Sapere Aude en capas: cuadros con brillo propio, flotación suave,
 * parallax con el cursor y — en la portada — cuadros que se pueden arrastrar
 * y regresan a su lugar con un resorte (anime.js createAnimatable).
 */
export default function Mosaic({ className = '', interactive = true, draggable = false, still = false }) {
  const ref = useRef(null);

  // Parallax con el cursor
  useEffect(() => {
    const el = ref.current;
    if (!el || !interactive || !hasFinePointer() || !canAnimate()) return;
    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--mx', ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3));
        el.style.setProperty('--my', ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [interactive]);

  // Arrastrar cuadros con regreso elástico
  useEffect(() => {
    const el = ref.current;
    if (!el || !draggable || !canAnimate()) return;
    const cleanups = [...el.querySelectorAll('.mosaic__drag')].map((node) => {
      const anim = createAnimatable(node, { x: 0, y: 0, rotate: 0, scale: 1, ease: 'out(3)' });
      let start = null;

      const down = (e) => {
        start = { x: e.clientX, y: e.clientY };
        node.setPointerCapture(e.pointerId);
        node.classList.add('is-dragging');
        el.classList.add('is-dragging');
        anim.scale(1.12, 300);
      };
      const move = (e) => {
        if (!start) return;
        const dx = e.clientX - start.x;
        const dy = e.clientY - start.y;
        anim.x(dx, 120);
        anim.y(dy, 120);
        anim.rotate(dx * 0.12, 200);
      };
      const up = () => {
        if (!start) return;
        start = null;
        node.classList.remove('is-dragging');
        el.classList.remove('is-dragging');
        anim.x(0, 1400, 'outElastic(1, .45)');
        anim.y(0, 1400, 'outElastic(1, .45)');
        anim.rotate(0, 1400, 'outElastic(1, .45)');
        anim.scale(1, 600, 'out(3)');
      };

      node.addEventListener('pointerdown', down);
      node.addEventListener('pointermove', move);
      node.addEventListener('pointerup', up);
      node.addEventListener('pointercancel', up);
      return () => {
        node.removeEventListener('pointerdown', down);
        node.removeEventListener('pointermove', move);
        node.removeEventListener('pointerup', up);
        node.removeEventListener('pointercancel', up);
        anim.revert();
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, [draggable]);

  return (
    <div
      ref={ref}
      className={`mosaic${still ? ' mosaic--still' : ''}${draggable ? ' mosaic--draggable' : ''} ${className}`}
      aria-hidden="true"
    >
      {SQUARES.map((q, i) => (
        <span
          key={i}
          className="mosaic__cell"
          style={{ left: `${q.x}%`, top: `${q.y}%`, width: `${q.s}%`, '--c': q.c, '--d': q.d, '--i': i }}
        >
          <span className="mosaic__drag">
            <span className="mosaic__sq" />
          </span>
        </span>
      ))}
    </div>
  );
}
