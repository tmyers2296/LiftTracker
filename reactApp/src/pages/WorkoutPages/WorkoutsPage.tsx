import { NavBar } from "../../components/Navigation/NavBar";
import { useNavigate } from "react-router-dom";
import { useWorkouts } from "../../hooks/workoutHooks";
import { workoutObject } from "../../types/workoutTypes";
import WorkoutCard from "../../components/WorkoutComponents/WorkoutCard/WorkoutCard";
import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView";
import styles from "./WorkoutPages.module.css";
import { Tooltip } from "react-tooltip";
import { useExercises } from "../../hooks/exerciseHooks";
import { useContext, createContext } from "react";
import { exerciseObject } from "../../types/generalTypes";

type exerciseDataContextItems = {
    allExercises: exerciseObject[] | null;
};

const exercisesContext = createContext<exerciseDataContextItems | null>(null);

function WorkoutsPage() {
    const navigate = useNavigate();
    const { data: routines, isLoading, isError } = useWorkouts(1, 100);
    const { data: allExercises } = useExercises(1, 100);

    return (
        <AuthorizeView>
            <exercisesContext.Provider
                value={{ allExercises: allExercises ? allExercises : null }}
            >
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
            </exercisesContext.Provider>
        </AuthorizeView>
    );
}

export function useExerciseData(): exerciseDataContextItems {
    const context = useContext(exercisesContext);
    if (!context) {
        throw new Error("useCounter must be used within a CounterProvider");
    }
    return context;
}

export default WorkoutsPage;
