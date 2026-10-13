import { useEffect, useRef } from 'react';
import { animate, onScroll } from 'animejs';

/** Barra de progreso de lectura con el espectro del logo, sincronizada al scroll. */
export default function ScrollProgress({ page }) {
  const ref = useRef(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    const anim = animate(bar, {
      scaleX: [0, 1],
      ease: 'linear',
      autoplay: onScroll({
        target: document.documentElement,
        enter: 'top top',
        leave: 'bottom bottom',
        sync: true,
      }),
    });
    return () => anim.revert();
  }, [page]);

  return <div className="scroll-progress" aria-hidden="true"><span ref={ref} className="scroll-progress__bar" /></div>;
}
