import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView";
import { NavBar } from "../../components/Navigation/NavBar";
import styles from "../MainPages.module.css";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
    const navigate = useNavigate();

    return (
        <AuthorizeView>
            <NavBar />
            <div>
                {" "}
                <button
                    className={styles.routineButton}
                    onClick={() => {
                        navigate(`/edit-dashboard/0`);
                    }}
                >
                    ⌖ Edit Dashboard
                </button>
            </div>
        </AuthorizeView>
    );
}

export default DashboardPage;
