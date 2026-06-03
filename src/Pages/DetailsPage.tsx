import { useLocation, useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext"; // Imported context hook
import "../styles/detailsPage.css";

interface Meal {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea?: string;
  strInstructions: string;
  strYoutube?: string;
  idMeal: string; // Ensure idMeal is explicit for the favorite functions
  [key: string]: any;
}

interface Ingredient {
  name: string;
  measure: string;
}

export default function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const meal: Meal = location.state?.meal;
  
  // Hook up context actions
  const { toggleFavorite, isFavorite } = useFavorites();

  if (!meal) {
    return (
      <div className="container">
        <p>No meal data found. <button onClick={() => navigate("/")}>Go back</button></p>
      </div>
    );
  }

  const favorited = isFavorite(meal.idMeal);

  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ name: ingredient, measure: measure || "" });
    }
  }

  return (
    <div className="container">
      <div className="navigation-actions">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back
        </button>
        
        {/* Detail Page Favorite Button */}
        <button
          className={`favorite-details-btn ${favorited ? "favorited" : ""}`}
          onClick={() => toggleFavorite(meal)}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="heart-icon"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>{favorited ? "Saved to Favorites" : "Add to Favorites"}</span>
        </button>
      </div>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="meal-image"
      />

      <div className="meal-info">
        <h3 className="meal-name">{meal.strMeal}</h3>
        <span className="meal-category">{meal.strCategory}</span>
        {meal.strArea && (
          <span className="meal-area"> · {meal.strArea}</span>
        )}

        <div className="ingredients-title">Ingredients:</div>
        <div className="ingredients-list">
          {ingredients.map((ing, index) => (
            <span key={index} className="ingredient-tag">
              {ing.measure} {ing.name}
            </span>
          ))}
        </div>

        <div className="instructions-title">Instructions:</div>
        <p className="meal-instructions">{meal.strInstructions}</p>

        {meal.strYoutube && (
         <a 
            href={meal.strYoutube}
            target="_blank"
            rel="noreferrer"
            className="youtube-link"
          >
            ▶ Watch on YouTube
          </a>
        )}
      </div>
    </div>
  );
}