import './media.css'

/**
 * Imagen o video de un proyecto. Mientras el archivo no exista, muestra un
 * marcador que dice qué va ahí, en vez de una imagen rota o un hueco gris.
 */
function Media({ src, alt, kind = 'imagen', ratio = '16 / 10', nota, className = '', prioridad = false }) {
  if (!src) {
    return (
      <div
        className={`pb-media pb-media--empty ${className}`}
        style={{ '--ratio': ratio }}
        role="img"
        aria-label={`Pendiente: ${alt}`}
      >
        <span className="pb-media__mark" aria-hidden="true">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {kind === 'video' ? (
              <>
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="m10 9 5 3-5 3z" />
              </>
            ) : (
              <>
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <circle cx="8.5" cy="9.5" r="1.5" />
                <path d="m21 16-5-5-6 6-3-3-4 4" />
              </>
            )}
          </svg>
        </span>
        <p className="pb-mono pb-media__label">{alt}</p>
        {nota && <p className="pb-mono pb-media__note">{nota}</p>}
      </div>
    )
  }

  if (kind === 'video') {
    return (
      <video
        className={`pb-media ${className}`}
        style={{ '--ratio': ratio }}
        src={src}
        controls
        playsInline
        preload="metadata"
        aria-label={alt}
      />
    )
  }

  return (
    <img
      className={`pb-media ${className}`}
      style={{ '--ratio': ratio }}
      src={src}
      alt={alt}
      loading={prioridad ? 'eager' : 'lazy'}
      fetchPriority={prioridad ? 'high' : undefined}
      decoding="async"
    />
  )
}
export default Media
