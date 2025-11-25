import { useWorkoutData } from "../../pages/WorkoutPages/RecordRoutineWorkout.tsx";
import { routineExerciseObject } from "../../types/routineTypes.ts";
import styles from "./WorkoutComponents.module.css";

interface RoutineExerciseDisplayCardProps {
    exerciseData: routineExerciseObject;
}

function RoutineExerciseDisplayCard({
    exerciseData,
}: RoutineExerciseDisplayCardProps) {
    const { allExercises } = useWorkoutData();

    return (
        <div className={styles.itemBox2}>
            <div className={styles.item}>
                {exerciseData &&
                    allExercises?.find(
                        (exercise) => exercise.id === exerciseData.exerciseId
                    )?.name}
            </div>
            <button className={styles.item}>💪</button>
        </div>
    );
}

export default RoutineExerciseDisplayCard;
