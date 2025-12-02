import { useWorkoutData } from "../../pages/WorkoutPages/RecordRoutineWorkout.tsx";
import { routineExerciseObject } from "../../types/routineTypes.ts";
import styles from "./WorkoutComponents.module.css";
import { addItem } from "../../modules/editingFunctions.tsx";
import { createNewWorkoutExercise } from "../../modules/itemFactories.tsx";

interface RoutineExerciseDisplayCardProps {
    exerciseData: routineExerciseObject;
}

function RoutineExerciseDisplayCard({
    exerciseData,
}: RoutineExerciseDisplayCardProps) {
    const {
        dispatchIdMappings,
        allExercises,
        workoutData,
        setWorkoutData,
        tempIdCounter,
    } = useWorkoutData();

    const addWorkoutExercise = () => {
        if (!workoutData) return;

        const newExercise = createNewWorkoutExercise(
            workoutData.id,
            exerciseData.exerciseId,
            tempIdCounter,
            workoutData.exercises.length
        );

        const newExercises = addItem(workoutData.exercises, newExercise);
        setWorkoutData({ ...workoutData, exercises: newExercises });
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
                className={styles.item}
                onClick={() => {
                    addWorkoutExercise();
                    dispatchIdMappings({
                        type: "MAP_EXERCISE",
                        workoutExerciseId: tempIdCounter.current + 1,
                        routineExerciseId: exerciseData.id,
                    });
                }}
            >
                💪
            </button>
        </div>
    );
}

export default RoutineExerciseDisplayCard;
