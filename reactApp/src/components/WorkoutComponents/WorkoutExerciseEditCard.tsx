import { useWorkoutData } from "../../pages/WorkoutPages/RecordRoutineWorkout.tsx";
import { workoutExerciseObject } from "../../types/workoutTypes.ts";
import { removeItem } from "../../modules/editingFunctions.tsx";
import styles from "./WorkoutComponents.module.css";

interface WorkoutExerciseDisplayCardProps {
    exerciseData: workoutExerciseObject;
}

function WorkoutExerciseEditCard({
    exerciseData,
}: WorkoutExerciseDisplayCardProps) {
    const { allExercises, workoutData, setWorkoutData, setRecordedIDList } =
        useWorkoutData();

    const removeExercise = (exerciseId: number) => {
        if (!workoutData) return;
        const updatedExercises = removeItem(workoutData.exercises, exerciseId);

        setWorkoutData({ ...workoutData, exercises: updatedExercises });
    };

    return (
        <div className={styles.itemBox2}>
            <div className={styles.item}>
                {exerciseData &&
                    allExercises?.find(
                        (exercise) => exercise.id === exerciseData.exerciseId
                    )?.name}
            </div>
            <button
                onClick={() => {
                    removeExercise(exerciseData.id);

                    setRecordedIDList((prev) => {
                        const updated = { ...prev };
                        delete updated[exerciseData.id];
                        return updated;
                    });
                }}
            >
                💣
            </button>
        </div>
    );
}

export default WorkoutExerciseEditCard;
