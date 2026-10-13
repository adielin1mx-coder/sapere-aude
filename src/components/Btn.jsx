const VARIANTS = {
  primary:      'btn--primary',
  ghost:        'btn--ghost',
  outline:      'btn--outline',
  white:        'btn--light',
  whiteOutline: 'btn--ghost',
};

const Arrow = () => (
  <svg className="btn__arrow" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
    <path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Botón con barrido de brillo ("shimmer") inspirado en los botones de 21st.dev. */
export default function Btn({
  children,
  variant = 'primary',
  onClick,
  href,
  style,
  small = false,
  large = false,
  arrow = false,
  block = false,
  className = '',
  disabled = false,
  type = 'button',
  ...rest
}) {
  const classes = [
    'btn',
    VARIANTS[variant] || VARIANTS.primary,
    small && 'btn--sm',
    large && 'btn--lg',
    block && 'btn--block',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      <span className="btn__label">{children}</span>
      {arrow && <Arrow />}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} style={style} onClick={onClick} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} style={style} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
