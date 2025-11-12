import styles from "./styles.module.css"

export default function Footer () {
    return (
        <div className={styles["footer"]}>
            <div className={styles["container"]}>
                <div className={styles["footer-content"]}>
                    <div className={styles["footer-section"]}>
                        <h3>About TastyBites</h3>
                        <p>We're passionate about sharing delicious recipes from around the world to inspire your cooking journey.</p>
                    </div>
                    <div className={styles["footer-section"]}>
                        <h3>Quick Links</h3>
                        <a href="#">Home</a>
                        <a href="#">Recipes</a>
                        <a href="#">Categories</a>
                        <a href="#">About Us</a>
                    </div>
                    <div className={styles["footer-section"]}>
                        <h3>Contact Us</h3>
                        <p>Email: info@tastybites.com</p>
                        <p>Phone: +1 (555) 123-4567</p>
                    </div>
                </div>
                <div className={"copyright"}>
                    <p>&copy; 2023 TastyBites. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}