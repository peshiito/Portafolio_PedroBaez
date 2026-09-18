/**
 * Genera las constantes codificadas de src/data/contacto.js.
 *
 * Uso:  node scripts/codificar-contacto.mjs 5491125303909 "+54 9 11 2530-3909"
 *
 * El primero es el número para WhatsApp (código de país, sin + ni espacios).
 * El segundo es cómo querés que se lea en pantalla.
 */
const [numero, visible] = process.argv.slice(2)

if (!numero || !visible) {
  console.error('Faltan argumentos.\n  node scripts/codificar-contacto.mjs 5491125303909 "+54 9 11 2530-3909"')
  process.exit(1)
}

const codificar = (s) => Buffer.from([...s].reverse().join('')).toString('base64')

console.log('\nPegá esto en src/data/contacto.js:\n')
console.log(`const _n = '${codificar(numero)}'`)
console.log(`const _v = '${codificar(visible)}'\n`)
