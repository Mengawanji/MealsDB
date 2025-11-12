import "../styles/home.css"
import Navbar from "../components/Navbar/Navbar"
import Feature from "../components/Feature/Feature"
import MealsCard from "../components/MealsCard/MealsCard"

export default function Home () {
    return (
        <>
            <Navbar/>
            <Feature/>
            
        <div className="search-container">
            <div className="search-box">
                <input type="text" className="search-input" placeholder="Search for recipes, ingredients, or categories..."/>
                <button className="search-button">Search</button>
            </div>
        </div>
        <MealsCard/>
        </>
    )
}