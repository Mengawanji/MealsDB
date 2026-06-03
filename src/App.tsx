import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './components/Navbar/Navbar'
import Details from './Pages/DetailsPage'

function App() {

  
  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
    </>
  )
}

export default App
