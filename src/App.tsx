import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './components/Navbar/Navbar'
import Details from './Pages/DetailsPage'
import { FavoritesProvider } from './context/FavoritesContext'
import Favorites from './Pages/Favoritespage'

function App() {

  
  return (
    <FavoritesProvider>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
   </FavoritesProvider>
  )
}

export default App
