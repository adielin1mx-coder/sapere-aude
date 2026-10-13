import { useEffect, useRef } from 'react';
import { createScope, onScroll } from 'animejs';

export const canAnimate = () =>
  typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Patrón oficial de anime.js v4 para React: un Scope ligado a un ref que
 * revierte todas las animaciones (y los estilos que dejaron) al desmontar.
 * Si el usuario pidió reducir movimiento, no se ejecuta nada y el contenido
 * se queda en su estado final.
 */
export function useAnimeScope(setup, deps = []) {
  const root = useRef(null);
  useEffect(() => {
    if (!root.current || !canAnimate()) return;
    const scope = createScope({ root }).add((self) => setup(root.current, self));
    return () => scope.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return root;
}

/** Dispara una animación una sola vez cuando el elemento entra en pantalla. */
export const playOnEnter = (target, offset = 80) =>
  onScroll({ target, enter: `bottom-=${offset} top`, repeat: false });

/** Sincroniza el progreso de una animación con el scroll (scrub suavizado). */
export const scrub = (target, { enter = 'bottom top', leave = 'top bottom', smooth = 0.25 } = {}) =>
  onScroll({ target, enter, leave, sync: smooth });
