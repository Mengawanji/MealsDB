import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import styles from "../styles/favorites.module.css";

interface Ingredient {
  name: string;
  measure: string;
}

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const navigate = useNavigate();
  const [removing, setRemoving] = useState<string | null>(null);

  const getIngredients = (meal: any): Ingredient[] => {
    const result: Ingredient[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        result.push({ name: ingredient, measure: measure || "" });
      }
    }
    return result;
  };

  const handleRemove = (e: React.MouseEvent, meal: any) => {
    e.stopPropagation();
    setRemoving(meal.idMeal);
    setTimeout(() => {
      toggleFavorite(meal);
      setRemoving(null);
    }, 340);
  };

  const handleCardClick = (meal: any) => {
    navigate(`/details/${meal.idMeal}`, { state: { meal } });
  };

  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <button className={styles["back-btn"]} onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className={styles["header-text"]}>
          <h1 className={styles.title}>My Favourites</h1>
          <p className={styles.subtitle}>
            {favorites.length === 0
              ? "Nothing saved yet"
              : `${favorites.length} recipe${favorites.length > 1 ? "s" : ""} saved`}
          </p>
        </div>

        <div className={styles["heart-badge"]}>
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
              C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </header>

      {/* ── Empty state ── */}
      {favorites.length === 0 && (
        <div className={styles["empty-state"]}>
          <div className={styles["empty-icon"]}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <h2 className={styles["empty-title"]}>No favourites yet</h2>
          <p className={styles["empty-desc"]}>
            Tap the heart on any recipe to save it here for later.
          </p>
          <button className={styles["browse-btn"]} onClick={() => navigate("/")}>
            Browse Recipes
          </button>
        </div>
      )}

      {favorites.length > 0 && (
        <main className={styles.grid}>
          {favorites.map((meal, idx) => {
            const ingredients = getIngredients(meal);
            const isRemoving = removing === meal.idMeal;

            return (
              <article
                key={meal.idMeal}
                className={`${styles.card} ${isRemoving ? styles["card-exit"] : ""}`}
                style={{ animationDelay: `${idx * 60}ms` }}
                onClick={() => handleCardClick(meal)}
              >
                {/* Image */}
                <div className={styles["card-image-wrap"]}>
                  <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className={styles["card-image"]}
                  />
                  <div className={styles["card-overlay"]} />

                  {/* Category pill on image */}
                  <span className={styles["card-category"]}>{meal.strCategory}</span>

                  {/* Remove heart button */}
                  <button
                    className={styles["remove-btn"]}
                    onClick={(e) => handleRemove(e, meal)}
                    aria-label="Remove from favourites"
                  >
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                        2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                        C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                        c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>

                {/* Info */}
                <div className={styles["card-body"]}>
                  <h3 className={styles["card-name"]}>{meal.strMeal}</h3>

                  <div className={styles["card-ingredients"]}>
                    {ingredients.slice(0, 4).map((ing, i) => (
                      <span key={i} className={styles["ing-tag"]}>
                        {ing.name}
                      </span>
                    ))}
                    {ingredients.length > 4 && (
                      <span className={`${styles["ing-tag"]} ${styles["ing-more"]}`}>
                        +{ingredients.length - 4}
                      </span>
                    )}
                  </div>

                  <div className={styles["card-footer"]}>
                    <span className={styles["view-link"]}>View Recipe →</span>
                  </div>
                </div>
              </article>
            );
          })}
        </main>
      )}
    </div>
  );
}