import { NavBar } from "../../components/Navigation/NavBar";
import { useNavigate } from "react-router-dom";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView";
import styles from "./WorkoutPages.module.css";
import { Tooltip } from "react-tooltip";

function WorkoutsPage() {
    const navigate = useNavigate();

    return (
        <AuthorizeView>
            <div>
                <NavBar />
                <div className={styles.itemBox}>
                    <button
                        className={styles.addButtonOrange}
                        data-tooltip-id="routine-tooltip"
                        data-tooltip-content="Record workout from routine"
                        onClick={() => {
                            navigate(`/record-routine-workout/27`);
                        }}
                    >
                        +
                    </button>
                    <Tooltip id="routine-tooltip" className={styles.tooltip} />
                    <button
                        className={styles.addButtonBlue}
                        data-tooltip-id="improv-tooltip"
                        data-tooltip-content="Improvise workout"
                    >
                        +
                    </button>
                    <Tooltip id="improv-tooltip" className={styles.tooltip} />
                </div>
            </div>
        </AuthorizeView>
    );
}

export default WorkoutsPage;
