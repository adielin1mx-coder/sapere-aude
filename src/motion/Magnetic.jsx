import { createAnimatable } from 'animejs';
import { hasFinePointer, useAnimeScope } from './anime';

/**
 * Envoltura "magnética": el contenido se inclina hacia el cursor cuando
 * este se acerca y regresa con elasticidad al salir (anime.js createAnimatable).
 */
export default function Magnetic({ strength = 0.35, className = '', children }) {
  const ref = useAnimeScope((el) => {
    if (!hasFinePointer()) return;
    const target = el.firstElementChild;
    if (!target) return;
    const anim = createAnimatable(target, { x: 0, y: 0, ease: 'out(3)', duration: 500 });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      anim.x((e.clientX - (r.left + r.width / 2)) * strength);
      anim.y((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      anim.x(0, 900, 'outElastic(1, .4)');
      anim.y(0, 900, 'outElastic(1, .4)');
    };

    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [strength]);

  return <span ref={ref} className={`magnetic ${className}`}>{children}</span>;
}
