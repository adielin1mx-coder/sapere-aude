import { animate, splitText, stagger } from 'animejs';
import { playOnEnter, useAnimeScope } from './anime';

/**
 * Título que se arma letra por letra: cada carácter sube desde una máscara
 * por palabra (anime.js splitText). El texto original se conserva intacto y
 * accesible para lectores de pantalla.
 *
 * trigger="load"   → anima al montar (encabezados de página)
 * trigger="scroll" → anima al entrar en pantalla
 */
export default function SplitTitle({ as: Tag = 'h2', className = '', trigger = 'scroll', delay = 0, children }) {
  const ref = useAnimeScope((el) => {
    const split = splitText(el, { words: { wrap: 'clip' }, chars: true });
    const { chars } = split;
    el.classList.add('is-split');
    animate(chars, {
      y: { from: '105%' },
      rotate: { from: 8 },
      opacity: { from: 0 },
      duration: 900,
      ease: 'out(4)',
      delay: stagger(18, { start: delay }),
      autoplay: trigger === 'load' ? true : playOnEnter(el, 40),
    });
    return () => split.revert();
  }, [trigger, delay]);

  return <Tag ref={ref} className={`split-title ${className}`}>{children}</Tag>;
}
