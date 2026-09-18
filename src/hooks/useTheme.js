import { useCallback, useEffect, useState } from 'react'

const KEY = 'pb-theme'

function current() {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.getAttribute('data-bs-theme') || 'light'
}

/**
 * El tema vive en <html data-bs-theme>, que ya quedó puesto por el script
 * inline de index.html. Acá sólo lo leemos y lo cambiamos.
 */
export function useTheme() {
  const [theme, setTheme] = useState(current)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-bs-theme', theme)
    // Le avisa al navegador para que scrollbars y controles nativos acompañen
    root.style.colorScheme = theme
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#3a352f' : '#e4e2dd')
    try {
      localStorage.setItem(KEY, theme)
    } catch {
      /* modo privado: el tema dura lo que dure la pestaña */
    }
  }, [theme])

  const toggle = useCallback(() => {
    // Sin esto, cada propiedad con transition se anima a la vez al cambiar de tema
    const root = document.documentElement
    root.setAttribute('data-theme-switching', '')
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
    window.setTimeout(() => root.removeAttribute('data-theme-switching'), 80)
  }, [])

  return { theme, toggle }
}
