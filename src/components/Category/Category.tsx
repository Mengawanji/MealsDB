import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { getMeals } from "../../services/api";
import { useFavorites } from "../../context/FavoritesContext"; // 1. Imported context hook

interface FilteredMeal {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
}

const CATEGORIES = [
  "Beef", "Chicken", "Dessert", "Lamb",
  "Pasta", "Seafood", "Pork", "Vegan"
];

export default function Category() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [loadingMealId, setLoadingMealId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites(); // 2. Grab context methods

  const {
    data: mealData,
    isLoading,
    isError: searchError,
  } = useQuery<FilteredMeal[]>({
    queryKey: ["filtered-meals", activeCategory],
    queryFn: () => getMeals(activeCategory),
    enabled: true,
  });

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
  };

  // Fetch full meal details by ID, then navigate with state
  const handleMealClick = async (mealId: string) => {
    setLoadingMealId(mealId);
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await res.json();
      const fullMeal = data.meals?.[0];

      if (fullMeal) {
        navigate(`/details/${mealId}`, { state: { meal: fullMeal } });
      }
    } catch (err) {
      console.error("Failed to fetch meal details:", err);
    } finally {
      setLoadingMealId(null);
    }
  };

  // 3. Handle favorite toggle asynchronously or locally using the filtered meal properties
  const handleFavorite = (e: React.MouseEvent, meal: FilteredMeal) => {
    e.stopPropagation(); // Stop card click navigation
    
    // Note: Since Category API returns minimal info, we pass the structure it expects.
    // If your Details page crashes without instructions/category, you can optionally fetch the full 
    // object here first, but this handles simple storage perfectly.
    toggleFavorite({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strCategory: activeCategory, // Fallback to current category context
      strInstructions: ""
    });
  };

  if (isLoading) return <div className="message"><h2>Loading meals...</h2></div>;
  if (searchError) return <div className="message"><h2>Error searching meals</h2></div>;

  return (
    <div className={styles["container"]}>
      <div className={styles.categories}>
        <h2 className={styles["section-title"]}>Popular Categories</h2>
        <div className={styles["category-list"]}>
          {CATEGORIES.map((category: string) => (
            <div
              key={category}
              className={`${styles.category} ${
                category === activeCategory ? styles.active : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      <h3 className={styles["section-title"]}>{activeCategory} Meals</h3>

      <div className={styles["recipe-grid"]}>
        <div className={styles["recipe-card"]}>
          {mealData && mealData.length > 0 ? (
            <div className={styles["meal-details"]}>
              {mealData.map((meal: FilteredMeal) => {
                const favorited = isFavorite(meal.idMeal); // Check favorite status per item

                return (
                  <div
                    key={meal.idMeal}
                    className={styles["meal-card"]}
                    onClick={() => handleMealClick(meal.idMeal)}
                    style={{
                      cursor: loadingMealId === meal.idMeal ? "wait" : "pointer",
                      opacity: loadingMealId === meal.idMeal ? 0.6 : 1,
                      transition: "opacity 0.2s ease",
                    }}
                  >
                    {/* 4. Wrapped image and added the heart button wrapper */}
                    <div className={styles["image-wrapper"]}>
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className={styles["meal-image"]}
                      />
                      <button
                        className={`${styles["favorite-btn"]} ${favorited ? styles["favorited"] : ""}`}
                        onClick={(e) => handleFavorite(e, meal)}
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
                      <h4>{meal.strMeal}</h4>
                      {loadingMealId === meal.idMeal && (
                        <span style={{ fontSize: "0.75rem", color: "#888" }}>
                          Loading...
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="message">
              <p>No meals found for {activeCategory} category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}