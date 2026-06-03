import { useLocation, useNavigate } from "react-router-dom";
import "../styles/detailsPage.css";

interface Meal {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea?: string;
  strInstructions: string;
  strYoutube?: string;
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

  if (!meal) {
    return (
      <div className="container">
        <p>No meal data found. <button onClick={() => navigate("/")}>Go back</button></p>
      </div>
    );
  }

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
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

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