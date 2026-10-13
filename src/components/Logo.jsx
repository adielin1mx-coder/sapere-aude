import { useId } from 'react';
import { LOGO_SQUARES, LOGO_SUB, LOGO_SUB_COLOR, LOGO_WORD } from './logoGeometry';

/*
 * Logo vectorial con la geometría exacta del PNG original (cuadros y letras
 * medidos sobre él). El resplandor se suavizó a propósito: el halo blanco
 * del original tapaba las letras y las volvía ilegibles.
 *
 *  - "footer": composición vertical original.
 *  - "nav":    mismos cuadros y letras, acomodados en horizontal para la barra.
 */

// [desenfoque, intensidad] por capa
const GLOW = {
  squares: [[3, 0.6], [16, 0.9]],
  word:    [[8, 0.22]],
  sub:     [[6, 0.45]],
};

function Glow({ id, layers }) {
  return (
    <filter id={id} filterUnits="userSpaceOnUse" x="-400" y="-400" width="2400" height="1900" colorInterpolationFilters="sRGB">
      {layers.map(([blur], i) => (
        <feGaussianBlur key={`b${i}`} in="SourceGraphic" stdDeviation={blur} result={`b${i}`} />
      ))}
      {layers.map(([, k], i) => (
        <feColorMatrix key={`c${i}`} in={`b${i}`} type="matrix" values={`1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${k} 0`} result={`c${i}`} />
      ))}
      <feMerge>
        {layers.map((_, i) => <feMergeNode key={i} in={`c${layers.length - 1 - i}`} />)}
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}

function Mark({ f }) {
  return (
    <g filter={`url(#${f('sq')})`}>
      {LOGO_SQUARES.map((q, i) => <path key={i} fill={q.fill} d={q.d} />)}
    </g>
  );
}

function Type({ f }) {
  return (
    <>
      <path filter={`url(#${f('w')})`} fill="#fff" d={LOGO_WORD} />
      <path filter={`url(#${f('s')})`} fill={LOGO_SUB_COLOR} d={LOGO_SUB} />
    </>
  );
}

// Recuadros de cada parte en el lienzo original
const MARK_BOX = { x: 315.2, y: 64.5, w: 536.1, h: 470.6 };
const TYPE_BOX = { x: 114, y: 529, w: 1288, h: 261 };

// Variante horizontal: isotipo a la izquierda (a 1.25× la altura del texto) y texto a la derecha
const NAV_MARK_SCALE = (TYPE_BOX.h * 1.25) / MARK_BOX.h;
const NAV_MARK_W = MARK_BOX.w * NAV_MARK_SCALE;
const NAV_H = TYPE_BOX.h * 1.25;
const NAV_GAP = 56;
const NAV_TEXT_X = NAV_MARK_W + NAV_GAP;
const NAV_TEXT_Y = (NAV_H - TYPE_BOX.h) / 2;

export default function Logo({ size = 'nav' }) {
  const uid = useId().replace(/:/g, '');
  const f = (name) => `sa-${name}-${uid}`;
  const defs = (
    <defs>
      <Glow id={f('sq')} layers={GLOW.squares} />
      <Glow id={f('w')} layers={GLOW.word} />
      <Glow id={f('s')} layers={GLOW.sub} />
    </defs>
  );

  if (size === 'footer') {
    return (
      <span className="logo logo--footer">
        <svg className="logo-svg" viewBox="96 44 1324 766" role="img" aria-label="Sapere Aude Solutions">
          {defs}
          <Mark f={f} />
          <Type f={f} />
        </svg>
      </span>
    );
  }

  return (
    <span className="logo logo--nav">
      <svg
        className="logo-svg"
        viewBox={`-12 -12 ${NAV_TEXT_X + TYPE_BOX.w + 24} ${NAV_H + 24}`}
        role="img"
        aria-label="Sapere Aude Solutions"
      >
        {defs}
        <g transform={`scale(${NAV_MARK_SCALE}) translate(${-MARK_BOX.x} ${-MARK_BOX.y})`}>
          <Mark f={f} />
        </g>
        <g transform={`translate(${NAV_TEXT_X - TYPE_BOX.x} ${NAV_TEXT_Y - TYPE_BOX.y})`}>
          <Type f={f} />
        </g>
      </svg>
    </span>
  );
}
