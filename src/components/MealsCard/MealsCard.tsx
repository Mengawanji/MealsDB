import styles from "./styles.module.css";

interface Meal {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strInstructions: string;
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

    const ingredients: Ingredient[] = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`]
            const measure = meal[`strMeasure${i}`]

        if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
            name: ingredient,
            measure: measure || "",
        });
        }
    }

    const displayInstruction = `${meal?.strInstructions}`

    function limitOverviewByWords(text:string, maxWords:number) {
        if (!text || text.trim() === '') {
            return '';
        }
        const words = text.split(/\s+/).filter(Boolean);

        if (words.length <= maxWords) {
            return text;
        }
        const truncatedWords = words.slice(0, maxWords);

        return truncatedWords.join(' ') + ' . . .';
    }

    const instructionsPreview =  limitOverviewByWords(displayInstruction , 30)

    return (
        <div className={styles.container}>
        <div className={styles["recipe-grid"]}>
            <div className={styles["recipe-card"]}>
            <img src={meal.strMealThumb} alt={meal.strMeal} className={styles["meal-image"]}  />
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
};

