import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { canAnimate } from '../motion/anime';

/*
 * Fondos WebGL de ThreeUI (@designcodeio/threeui), adaptados a la marca:
 *  - "ribbon": cinta de puntos que reacciona al cursor → evoca los cuadros del logo.
 *  - "stream": haces de luz morado/magenta/azul → los colores del isotipo.
 *
 * Se eligieron por ser nativos (WebGL directo, ~5 KB cada uno). Los demás
 * componentes del paquete cargan Tailwind/GSAP desde CDNs dentro de iframes
 * o arrastran Three.js completo (~600 KB).
 *
 * Cada fondo se descarga solo cuando hace falta (React.lazy), se monta solo
 * mientras está cerca de la pantalla y no se usa con "reducir movimiento"
 * ni en navegadores sin WebGL.
 */
const SCENES = {
  ribbon: lazy(() =>
    import('@designcodeio/threeui/components/RibbonFieldBackground').then((m) => ({ default: m.RibbonFieldBackground }))
  ),
  stream: lazy(() =>
    import('@designcodeio/threeui/components/StreamConvergenceBackground').then((m) => ({ default: m.StreamConvergenceBackground }))
  ),
};

function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function ThreeBackdrop({ scene = 'ribbon', className = '', ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [enabled] = useState(() => canAnimate() && supportsWebGL());

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '200px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  const Scene = SCENES[scene];

  return (
    <div ref={ref} className={`backdrop backdrop--${scene} ${className}`} aria-hidden="true">
      {enabled && visible && (
        <Suspense fallback={null}>
          <Scene className="backdrop__scene" {...props} />
        </Suspense>
      )}
    </div>
  );
}
