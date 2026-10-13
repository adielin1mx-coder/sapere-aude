import { animate, splitText, stagger } from 'animejs';
import { scrub, useAnimeScope } from './anime';

/**
 * Frase que se ilumina palabra por palabra conforme avanza el scroll
 * (efecto de lectura guiada, sincronizado con anime.js onScroll).
 */
export default function ScrollWords({ as: Tag = 'p', className = '', children }) {
  const ref = useAnimeScope((el) => {
    const split = splitText(el, { words: true });
    const { words } = split;
    animate(words, {
      opacity: { from: 0.14 },
      filter: { from: 'blur(3px)' },
      ease: 'linear',
      delay: stagger(40),
      autoplay: scrub(el, { enter: 'bottom-=10% top', leave: 'center+=10% center', smooth: 0.4 }),
    });
    return () => split.revert();
  });

  return <Tag ref={ref} className={`scroll-words ${className}`}>{children}</Tag>;
}
