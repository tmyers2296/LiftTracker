import { NavBar } from "../../components/Navigation/NavBar";
import { useNavigate } from "react-router-dom";
import { useWorkouts } from "../../hooks/workoutHooks";
import { workoutObject } from "../../types/workoutTypes";
import WorkoutCard from "../../components/WorkoutComponents/WorkoutCard/WorkoutCard";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView";
import styles from "./WorkoutPages.module.css";
import { Tooltip } from "react-tooltip";

function WorkoutsPage() {
    const navigate = useNavigate();
    const { data: routines, isLoading, isError } = useWorkouts(1, 100);

    return (
        <AuthorizeView>
            <div>
                <NavBar />
                <div className={styles.itemBoxOutline}>
                    {!isLoading &&
                        !isError &&
                        routines &&
                        routines.map((data: workoutObject) => (
                            <WorkoutCard key={data.id} workoutData={data} />
                        ))}
                    <div className={styles.itemBox}>
                        <button
                            className={styles.addButtonOrange}
                            data-tooltip-id="routine-tooltip"
                            data-tooltip-content="Record workout from routine"
                            onClick={() => {
                                navigate(`/record-routine-workout/29`);
                            }}
                        >
                            +
                        </button>
                        <Tooltip
                            id="routine-tooltip"
                            className={styles.tooltip}
                        />
                        <button
                            className={styles.addButtonBlue}
                            data-tooltip-id="improv-tooltip"
                            data-tooltip-content="Improvise workout"
                        >
                            +
                        </button>
                        <Tooltip
                            id="improv-tooltip"
                            className={styles.tooltip}
                        />
                    </div>
                </div>
            </div>
        </AuthorizeView>
    );
}

export default WorkoutsPage;
