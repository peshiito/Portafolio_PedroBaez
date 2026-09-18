/**
 * La B de la marca. Es roja en los dos temas —así está definida en el
 * brandbook— así que va como imagen y no hace falta recolorearla.
 */
function Logo({ height = 34, className = '', alt = 'Pedro Baez' }) {
  return (
    <img
      src="/logo.png"
      alt={alt}
      width={Math.round((height * 720) / 508)}
      height={height}
      className={`pb-logo ${className}`}
      style={{ height: `${height}px`, width: 'auto' }}
      decoding="async"
    />
  )
}
export default Logo
