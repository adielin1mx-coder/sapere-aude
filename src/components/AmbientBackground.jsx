/**
 * Fondo "aurora" con los colores del logo. Solo CSS (sin WebGL ni canvas):
 * las animaciones usan transform, así que corren en el compositor sin
 * redibujar la página. La versión anterior tenía dos canvas y un shader
 * redibujándose a 60 fps de forma permanente.
 */
export default function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__aurora">
        <span className="ambient__blob ambient__blob--1" />
        <span className="ambient__blob ambient__blob--2" />
        <span className="ambient__blob ambient__blob--3" />
        <span className="ambient__blob ambient__blob--4" />
      </div>
      <div className="ambient__grid" />
      <div className="ambient__noise" />
    </div>
  );
}
