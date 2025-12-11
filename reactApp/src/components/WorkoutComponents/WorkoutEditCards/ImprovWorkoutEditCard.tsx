import { useWorkoutData } from "../../../pages/WorkoutPages/ImproviseWorkoutPage.tsx";
import { workoutExerciseObject } from "../../../types/workoutTypes.ts";
import { useSaveWorkout } from "../../../hooks/workoutHooks.tsx";
import styles from "../WorkoutComponents.module.css";
import ImprovWorkoutExerciseEditCard from "./ImprovWorkoutExerciseEditCard.tsx";
import { createNewWorkoutExercise } from "../../../modules/itemFactories.tsx";
import { addItem } from "../../../modules/editingFunctions.tsx";

function ImprovWorkoutEditCard() {
    const { setWorkoutData, workoutData, allExercises, tempIdCounter } =
        useWorkoutData();

    const saveWorkoutMutation = useSaveWorkout();

    // Save function wrapper:
    function handleSave() {
        if (!workoutData) return;

        saveWorkoutMutation.mutate({
            endpoint: `https://localhost:5119/workouts/${workoutData.id}`,
            workout: workoutData,
        });
    }

    const addExercise = () => {
        if (!workoutData) return;

        const newExercise = createNewWorkoutExercise(
            workoutData.id,
            allExercises[0].id,
            tempIdCounter,
            workoutData.exercises.length
        );

        const newExercises = addItem(workoutData.exercises, newExercise);
        setWorkoutData({ ...workoutData, exercises: newExercises });
    };

    return (
        <div>
            <div className={styles.itemBoxNoPadding}>
                <div className={styles.itemBox2header}>
                    <div className={styles.item}>
                        Workout: {workoutData.name}
                    </div>
                    <button
                        className={styles.saveButton}
                        onClick={() => {
                            handleSave();
                        }}
                    >
                        💾
                    </button>
                </div>
                <div>
                    {workoutData &&
                        workoutData.exercises.map(
                            (exercise: workoutExerciseObject) => (
                                <ImprovWorkoutExerciseEditCard
                                    key={exercise.id}
                                    exerciseData={exercise}
                                />
                            )
                        )}
                </div>
                <div>
                    <button
                        className={styles.addButton}
                        onClick={() => {
                            addExercise();
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImprovWorkoutEditCard;
