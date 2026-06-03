import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";

interface Meal {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strInstructions: string;
  idMeal: string;
  [key: string]: any;
}

interface MealsCardProps {
  meal: Meal;
}

interface Ingredient {
  name: string;
  measure: string;
}

export default function MealsCard({ meal }: MealsCardProps) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(meal.idMeal);

  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({ name: ingredient, measure: measure || "" });
    }
  }

  function limitOverviewByWords(text: string, maxWords: number) {
    if (!text || text.trim() === "") return "";
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + " . . .";
  }

  const instructionsPreview = limitOverviewByWords(meal?.strInstructions, 30);

  const handleClick = () => {
    navigate(`/details/${meal.idMeal}`, { state: { meal } });
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(meal);
  };

  return (
    <div className={styles.container}>
      <div className={styles["recipe-grid"]}>
        <div
          className={styles["recipe-card"]}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          <div className={styles["image-wrapper"]}>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className={styles["meal-image"]}
            />
            <button
              className={`${styles["favorite-btn"]} ${favorited ? styles["favorited"] : ""}`}
              onClick={handleFavorite}
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            >
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={styles["heart-icon"]}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                  C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                  c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>

          <div className={styles["meal-info"]}>
            <h3 className={styles["meal-name"]}>{meal.strMeal}</h3>
            <span className={styles["meal-category"]}>{meal.strCategory}</span>
            <p className={styles["meal-instructions"]}>{instructionsPreview}</p>

            <div className={styles["ingredients-title"]}>Key Ingredients:</div>
            <div className={styles["ingredients-list"]}>
              {ingredients.slice(0, 5).map((ing, index) => (
                <span key={index} className={styles["ingredient-tag"]}>
                  {ing.name}
                </span>
              ))}
              {ingredients.length > 5 && (
                <span className={styles["ingredient-tag"]}>
                  +{ingredients.length - 5} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}