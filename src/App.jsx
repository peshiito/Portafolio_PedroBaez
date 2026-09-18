import { Routes, Route, useParams } from 'react-router-dom'
import Navbar from './Components/Navbar/navbar'
import Footer from './Components/Footer/footer'
import ScrollToTop from './Components/ScrollToTop'
import Home from './Pages/Home/home'
import Project from './Pages/Project/project'
import NotFound from './Pages/NotFound/notfound'

/**
 * Monta la página de proyecto de cero en cada slug. Sin la `key`, React
 * reutiliza el componente entre un proyecto y otro y arrastra estado del
 * anterior: el scroll, las imágenes ya reveladas y las que todavía no.
 */
function RutaProyecto() {
  const { slug } = useParams()
  return <Project key={slug} />
}

function App() {
  return (
    <>
      <a className="pb-skip" href="#main">
        Saltar al contenido
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos/:slug" element={<RutaProyecto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
export default App
