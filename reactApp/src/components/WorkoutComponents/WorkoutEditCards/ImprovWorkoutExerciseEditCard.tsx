import { useWorkoutData } from "../../../pages/WorkoutPages/ImproviseWorkoutPage.tsx";
import {
    workoutExerciseObject,
    workoutExerciseSetObject,
} from "../../../types/workoutTypes.ts";
import { removeItem } from "../../../modules/editingFunctions.tsx";
import styles from "../WorkoutComponents.module.css";
import ImprovWorkoutExerciseSetEditCard from "./ImprovWorkoutExerciseSetEditCard.tsx";
import { createNewWorkoutExerciseSet } from "../../../modules/itemFactories.tsx";
import { updateItem } from "../../../modules/editingFunctions.tsx";
import { addItem } from "../../../modules/editingFunctions.tsx";

interface WorkoutExerciseDisplayCardProps {
    exerciseData: workoutExerciseObject;
}

function ImprovWorkoutExerciseEditCard({
    exerciseData,
}: WorkoutExerciseDisplayCardProps) {
    const { allExercises, workoutData, setWorkoutData, tempIdCounter } =
        useWorkoutData();

    const addSet = (exercise: workoutExerciseObject) => {
        if (!workoutData) return;
        if (!exercise) return;

        const newSet: workoutExerciseSetObject = createNewWorkoutExerciseSet(
            tempIdCounter,
            exercise.sets.length
        );

        const newExercises = updateItem(workoutData.exercises, {
            ...exercise,
            sets: addItem(exercise.sets, newSet),
        });

        setWorkoutData({ ...workoutData, exercises: newExercises });
    };

    const removeExercise = (exerciseId: number) => {
        if (!workoutData) return;
        const updatedExercises = removeItem(workoutData.exercises, exerciseId);

        setWorkoutData({ ...workoutData, exercises: updatedExercises });
    };

    return (
        <div className={styles.itemBoxNoPadding}>
            <div className={styles.itemBox2header}>
                <div className={styles.item}>
                    {exerciseData &&
                        allExercises?.find(
                            (exercise) =>
                                exercise.id === exerciseData.exerciseId
                        )?.name}
                </div>
                <button
                    onClick={() => {
                        removeExercise(exerciseData.id);
                    }}
                >
                    💣
                </button>
            </div>
            <div>
                <div>
                    {exerciseData.sets.map((set) => (
                        <ImprovWorkoutExerciseSetEditCard
                            key={set.id}
                            setData={set}
                            exerciseId={exerciseData.id}
                        />
                    ))}
                </div>
                <div>
                    {" "}
                    <button
                        className={styles.addButton}
                        onClick={() => {
                            addSet(exerciseData);
                        }}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImprovWorkoutExerciseEditCard;
