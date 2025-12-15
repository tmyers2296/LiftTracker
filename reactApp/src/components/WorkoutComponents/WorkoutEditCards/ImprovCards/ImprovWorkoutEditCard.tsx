import { workoutDataGetSet } from "../../../../types/contextTypes.ts";
import { workoutExerciseObject } from "../../../../types/workoutTypes.ts";
import { useSaveWorkout } from "../../../../hooks/workoutHooks.tsx";
import styles from "../../WorkoutComponents.module.css";
import ImprovWorkoutExerciseEditCard from "./ImprovWorkoutExerciseEditCard.tsx";
import { createNewWorkoutExercise } from "../../../../modules/itemFactories.tsx";
import { addItem } from "../../../../modules/editingFunctions.tsx";

interface ImprovWorkoutEditCardProps {
    contextHookCallback: () => workoutDataGetSet;
}

function ImprovWorkoutEditCard({
    contextHookCallback,
}: ImprovWorkoutEditCardProps) {
    const { setWorkoutData, workoutData, allExercises, tempIdCounter } =
        contextHookCallback();

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
                    <input
                        value={workoutData.name}
                        onChange={(e) => {
                            setWorkoutData({
                                ...workoutData,
                                name: e.target.value,
                            });
                        }}
                        className={styles.item}
                    ></input>
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
                                    contextHookCallback={contextHookCallback}
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
