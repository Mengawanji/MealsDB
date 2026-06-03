import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import { getMeals } from "../../services/api"

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
              {mealData.map((meal: FilteredMeal) => (
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
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className={styles["meal-image"]}
                  />
                  <div className={styles["meal-info"]}>
                    <h4>{meal.strMeal}</h4>
                    {loadingMealId === meal.idMeal && (
                      <span style={{ fontSize: "0.75rem", color: "#888" }}>
                        Loading...
                      </span>
                    )}
                  </div>
                </div>
              ))}
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