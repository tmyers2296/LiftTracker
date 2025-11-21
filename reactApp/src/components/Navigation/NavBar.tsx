import LogoutLink from "../LogoutLink.tsx";
import { AuthorizedUser } from "../AuthorizeView.tsx";
import { useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";

export function NavBar() {
    const links = [
        { name: "🌀 Routines", path: "/routines" },
        { name: "🔥 Workouts", path: "/workouts" },
    ];
    const navigate = useNavigate();

    return (
        <div className={styles.navBox}>
            <div>
                {links.map((link) => (
                    <button
                        onClick={() => navigate(link.path)}
                        className={styles.navItemButton}
                        key={link.name}
                    >
                        {link.name}
                    </button>
                ))}
            </div>
            <div className={styles.navItem}>
                <LogoutLink>
                    Logout <AuthorizedUser value="email" />
                </LogoutLink>
            </div>
        </div>
    );
}
