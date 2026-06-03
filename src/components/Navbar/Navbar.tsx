import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className={styles["navbar"]}>
            <div className={styles["container"]}>
                <div className={styles["navbar-content"]}>
                    <div className={styles["logo"]}>
                        <Link to="/" className={styles["logo-link"]}>
                            <img 
                                src="/Tasty.png" 
                                alt="TastyBites Logo" 
                                className={styles["logo-img"]} 
                            />
                        </Link>
                    </div>

                    <nav>
                        <ul>
                            <li>
                                <Link to="/favorites">Favorites</Link>
                            </li>
                        </ul>
                    </nav>
                    
                </div>
            </div>
        </div>
    );
}