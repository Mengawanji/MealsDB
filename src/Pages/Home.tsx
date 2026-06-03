import "../styles/home.css"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import Feature from "../components/Feature/Feature"
import MealsCard from "../components/MealsCard/MealsCard"
import { searchMeals as fetchMeals  } from "../services/api"
import Category from "../components/Category/Category"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: meals,
    isLoading: isSearching,
    error: searchError,
    refetch: refetchMeals,
  } = useQuery({
    queryKey: ['meals', searchQuery],
    queryFn: () => fetchMeals(searchQuery),
    enabled: false,
  });

  const handleSearch = (e:any) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      refetchMeals()
    }
  };

  if (isSearching) return <div className="message"><h2>Searching for meals...</h2></div>;
  if (searchError) return <div className="message"><h2>Error searching meals: {(searchError as Error).message}</h2></div>;

  return (
    <>
      <Feature />
      <div className="search-container">
        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for recipes, ingredients, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" type="submit">Search</button>
        </form>
      </div>

      {meals && meals.length > 0 ? (
        <div className="meals-list"> 
          {meals.map((singleMeal, index) => (
            <MealsCard key={index} meal={singleMeal} /> 
          ))}
        </div>
      ) : (
        <div className="container">
            <h2 className="section-title"> Searching for a recipe!</h2>
        </div>
      )}
      <Category />
    </>
  );
}
