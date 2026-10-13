import { animate, onScroll, stagger } from 'animejs';
import { T } from '../tokens';
import Card from './Card';
import { playOnEnter, useAnimeScope } from '../motion/anime';

const NODE_COLORS = [T.purple, T.magenta, T.orange, T.lime, T.cyan, T.sky];

/**
 * Línea de tiempo con haz de luz que avanza con el scroll (anime.js onScroll
 * en modo sync). Cada hito se enciende al pasar el haz y su tarjeta entra
 * desde el lado que le corresponde.
 */
export default function Timeline({ items = [] }) {
  const ref = useAnimeScope((root) => {
    const nodes = [...root.querySelectorAll('.tl__item')];

    animate(root, {
      '--progress': [0, 1],
      ease: 'linear',
      autoplay: onScroll({
        target: root,
        enter: 'bottom-=40% top',
        leave: 'bottom-=40% bottom',
        sync: 0.2,
        onUpdate: () => {
          const anchor = window.innerHeight * 0.6;
          nodes.forEach((n) => n.classList.toggle('is-lit', n.getBoundingClientRect().top + 28 <= anchor));
        },
      }),
    });

    nodes.forEach((item) => {
      const fromLeft = item.classList.contains('tl__item--left') && window.innerWidth > 860;
      animate(item.querySelector('.tl__card-wrap'), {
        opacity: { from: 0 },
        x: { from: fromLeft ? -60 : 60 },
        rotateY: { from: fromLeft ? 14 : -14 },
        duration: 1000,
        ease: 'out(4)',
        autoplay: playOnEnter(item, 80),
      });
      animate(item.querySelectorAll('.tl__year, .tl__text'), {
        opacity: { from: 0 },
        y: { from: 14 },
        duration: 700,
        ease: 'out(3)',
        delay: stagger(90, { start: 200 }),
        autoplay: playOnEnter(item, 80),
      });
    });
  }, [items.length]);

  return (
    <div ref={ref} className="tl">
      <div className="tl__track" aria-hidden="true">
        <span className="tl__fill" />
        <span className="tl__head" />
      </div>
      <ol className="tl__list">
        {items.map((item, i) => (
          <li
            key={item.year}
            className={`tl__item tl__item--${i % 2 === 0 ? 'left' : 'right'}${i === items.length - 1 ? ' tl__item--last' : ''}`}
            style={{ '--node': NODE_COLORS[i % NODE_COLORS.length] }}
          >
            <span className="tl__node" aria-hidden="true" />
            <div className="tl__card-wrap">
              <Card pad="md" className="tl__card">
                <span className="tl__year">{item.year}</span>
                <p className="tl__text">{item.text}</p>
              </Card>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
