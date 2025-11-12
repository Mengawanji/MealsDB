import styles from "./styles.module.css"
import { Link } from "react-router-dom";
export default function Navbar () {
    return (
        <div className={styles["navbar"]}>
        <div className={styles["container"]}>
            <div className={styles["navbar-content"]}>
                <div className={styles["logo"]}>
                    <div className={styles["logo-icon"]}>🍳</div>
                    <div className={styles["logo-text"]}>Tasty<span>Bites</span></div>
                </div>
                <nav>
                    <ul>
                        <Link to="/">Home</Link>
                        <Link to="/recipes">Recipes</Link>
                        <Link to="/categories">Categories</Link>
                    </ul>
                </nav>
            </div>
        </div>
        </div>
    )
}