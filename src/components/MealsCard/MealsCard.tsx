import styles from "./styles.module.css"

export default function MealsCard () {
    return (
        <div className={styles["container"]}>
            <div className={styles["recipe-grid"]}>
                <div className={styles["recipe-card"]}>
                    <img src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Pancakes" className={styles["recipe-image"]}/>
                    <div className={styles["recipe-content"]}>
                        <h3 className={styles["recipe-title"]}>Fluffy Blueberry Pancakes</h3>
                        <div className={styles["recipe-meta"]}>
                            <span>⏱ 15 mins</span>
                            <span>⭐ 4.7 (200)</span>
                        </div>
                        <p className={styles["recipe-description"]}>Light and fluffy pancakes loaded with fresh blueberries.</p>
                        <a href="#" className={styles["recipe-button"]}>View Recipe</a>
                    </div>
                </div>
            </div>
        </div>
    )
}