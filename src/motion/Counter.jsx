import { animate } from 'animejs';
import { playOnEnter, useAnimeScope } from './anime';

const NUMBER = /^([^\d]*)(\d+(?:\.\d+)?)(.*)$/s;

/**
 * Cifra que cuenta desde 0 hasta su valor al entrar en pantalla.
 * Conserva prefijos y sufijos ("+", "−", "%", "×", " meses"…) y decimales.
 * El HTML inicial ya contiene el valor final (SEO y sin JavaScript).
 */
export default function Counter({ value, className = '', duration = 1800 }) {
  const ref = useAnimeScope((el) => {
    const m = String(value).match(NUMBER);
    if (!m) return;
    const [, prefix, digits, suffix] = m;
    const decimals = digits.includes('.') ? digits.split('.')[1].length : 0;
    const state = { v: 0 };
    animate(state, {
      v: parseFloat(digits),
      duration,
      ease: 'out(4)',
      autoplay: playOnEnter(el, 40),
      onRender: () => { el.textContent = `${prefix}${state.v.toFixed(decimals)}${suffix}`; },
      onComplete: () => { el.textContent = value; },
    });
    el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;
  }, [value]);

  return <span ref={ref} className={className}>{value}</span>;
}
