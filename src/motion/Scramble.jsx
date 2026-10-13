import { animate, scrambleText } from 'animejs';
import { playOnEnter, useAnimeScope } from './anime';

/**
 * Texto que se "decodifica" al aparecer (anime.js scrambleText).
 * Termina siempre en el texto original; el tamaño no cambia porque solo
 * se reemplazan caracteres.
 */
export default function Scramble({ as: Tag = 'span', className = '', trigger = 'scroll', delay = 0, children }) {
  const ref = useAnimeScope((el) => {
    animate(el, {
      innerHTML: scrambleText({ chars: 'A-Z0-9', cursor: true }),
      duration: 1100,
      delay,
      autoplay: trigger === 'load' ? true : playOnEnter(el, 20),
    });
  }, [trigger, delay]);

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
