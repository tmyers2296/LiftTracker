import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView";
import { NavBar } from "../../components/Navigation/NavBar";
import { useDashboardByUser } from "../../hooks/dashboardHooks";
import styles from "../MainPages.module.css";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
    const navigate = useNavigate();
    const { data: userDashboard, isLoading, isError } = useDashboardByUser();

    return (
        <AuthorizeView>
            <NavBar />
            <div>
                {!isLoading && !isError && userDashboard && (
                    <div>{`${userDashboard.id}${userDashboard.createdByUserId}`}</div>
                )}
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
