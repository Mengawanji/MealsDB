import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './components/Navbar/Navbar'

function App() {

  
  return (
    <>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
