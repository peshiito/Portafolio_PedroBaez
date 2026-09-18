import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/navbar'
import Footer from './Components/Footer/footer'
import ScrollToTop from './Components/ScrollToTop'
import Home from './Pages/Home/home'
import Project from './Pages/Project/project'
import NotFound from './Pages/NotFound/notfound'

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
          <Route path="/proyectos/:slug" element={<Project />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
export default App
