import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Recipes from './Pages/Recipes'
import Category from './Pages/Category'

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/categories" element={<Category />} />
        </Routes>
      </div>
    </>
  )
}

export default App
