import { useWorkoutData } from "../../pages/WorkoutPages/RecordRoutineWorkout.tsx";
import { workoutExerciseObject } from "../../types/workoutTypes.ts";
import styles from "./WorkoutComponents.module.css";

interface WorkoutExerciseDisplayCardProps {
    exerciseData: workoutExerciseObject;
}

function WorkoutExerciseEditCard({
    exerciseData,
}: WorkoutExerciseDisplayCardProps) {
    const { allExercises } = useWorkoutData();

    return (
        <div className={styles.itemBox2}>
            <div className={styles.item}>
                {exerciseData &&
                    allExercises?.find(
                        (exercise) => exercise.id === exerciseData.exerciseId
                    )?.name}
            </div>
        </div>
    );
}

export default WorkoutExerciseEditCard;
