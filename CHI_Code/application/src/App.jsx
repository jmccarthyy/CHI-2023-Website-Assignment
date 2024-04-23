import Home from './pages/Home'
import Countries from './pages/Countries'
import Content from './pages/Content'
import Menu from './components/Menu'
import Footer from './components/Footer'
import { Routes, Route } from "react-router-dom"
 
/**
 * App
 *
 * This will show each component on the page  
 *  
 * @author Jake McCarthy
 */
function App() {
  return (
    <div className="App flex flex-col bg-gray-100 min-h-screen">
      <Menu />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/countries" element={<Countries />}/>
          <Route path="/content" element={<Content />}/>
          <Route path="*" element={<p>Not found</p>}/>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
 
export default App;