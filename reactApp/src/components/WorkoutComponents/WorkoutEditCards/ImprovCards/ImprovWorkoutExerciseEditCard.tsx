import {
    workoutExerciseObject,
    workoutExerciseSetObject,
} from "../../../../types/workoutTypes.ts";
import { removeItem } from "../../../../modules/editingFunctions.tsx";
import styles from "../../WorkoutComponents.module.css";
import ImprovWorkoutExerciseSetEditCard from "./ImprovWorkoutExerciseSetEditCard.tsx";
import { createNewWorkoutExerciseSet } from "../../../../modules/itemFactories.tsx";
import { updateItem } from "../../../../modules/editingFunctions.tsx";
import { addItem } from "../../../../modules/editingFunctions.tsx";
import { exerciseObject } from "../../../../types/generalTypes.ts";
import { workoutDataGetSet } from "../../../../types/contextTypes.ts";

interface WorkoutExerciseDisplayCardProps {
    exerciseData: workoutExerciseObject;
    contextHookCallback: () => workoutDataGetSet;
}

function ImprovWorkoutExerciseEditCard({
    exerciseData,
    contextHookCallback,
}: WorkoutExerciseDisplayCardProps) {
    const { allExercises, workoutData, setWorkoutData, tempIdCounter } =
        contextHookCallback();

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

    const updateExercise = (updated: workoutExerciseObject) => {
        if (!workoutData) return;
        const newExercises = updateItem(workoutData.exercises, updated);

        setWorkoutData({ ...workoutData, exercises: newExercises });
    };

    return (
        <div className={styles.itemBoxNoPadding}>
            <div className={styles.itemBox2header}>
                <select
                    defaultValue={exerciseData.exerciseId ?? ""}
                    onChange={(e) =>
                        updateExercise({
                            ...exerciseData,
                            exerciseId: Number(e.target.value),
                        })
                    }
                    className={styles.item}
                >
                    {allExercises.map((exercise: exerciseObject) => (
                        <option key={exercise.id} value={exercise.id}>
                            {exercise.name}
                        </option>
                    ))}
                </select>
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
                            contextHookCallback={contextHookCallback}
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
