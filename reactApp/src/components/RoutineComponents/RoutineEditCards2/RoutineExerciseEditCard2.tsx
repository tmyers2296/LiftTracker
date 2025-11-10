import styles from "./RoutineEditCard2.module.css";
import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "../../../types/routineTypes";
import { exerciseObject } from "../../../types/generalTypes";
import RoutineExerciseSetEditCard2 from "../RoutineEditCards2/RoutineExerciseSetEditCard2.tsx";
import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine";
import {
    swapOrder,
    updateItem,
    removeItem,
    addItem,
} from "../../../modules/editingFunctions";
import { createNewSet } from "../../../modules/itemFactories.tsx";

interface RoutineExerciseEditCard2Props {
    exerciseData: routineExerciseObject;
    updateExercise: (updated: routineExerciseObject) => void;
}

function RoutineExerciseEditCard2({
    exerciseData,
}: RoutineExerciseEditCard2Props) {
    const { routineData, setRoutineData, allExercises, tempIdCounter } =
        useRoutineData();

    // CRUD function wrappers:
    const updateExercise = (updated: routineExerciseObject) => {
        if (!routineData) return;
        const newExercises = updateItem(routineData.exercises, updated);

        setRoutineData({ ...routineData, exercises: newExercises });
    };

    const addSet = (exercise: routineExerciseObject) => {
        if (!routineData) return;
        if (!exercise) return;

        const newSet: routineExerciseSetObject = createNewSet(
            tempIdCounter,
            exercise.sets.length
        );

        const newExercises = updateItem(routineData.exercises, {
            ...exercise,
            sets: addItem(exercise.sets, newSet),
        });

        setRoutineData({ ...routineData, exercises: newExercises });
    };

    const removeExercise = (exerciseId: number) => {
        if (!routineData) return;
        const updatedExercises = removeItem(routineData.exercises, exerciseId);

        setRoutineData({ ...routineData, exercises: updatedExercises });
    };

    // Shifting function wrapper:
    const shiftExerciseOrder = (direction: "up" | "down") => {
        if (!routineData) return;

        setRoutineData({
            ...routineData,
            exercises: swapOrder(
                routineData.exercises,
                exerciseData.id,
                direction
            ),
        });
    };

    return (
        <div className={styles.exerciseCard}>
            {exerciseData && (
                <div>
                    <button
                        className={styles.updownButton2}
                        onClick={() => {
                            shiftExerciseOrder("down");
                        }}
                    >
                        ↑
                    </button>
                    <button
                        className={styles.updownButton2}
                        onClick={() => {
                            shiftExerciseOrder("up");
                        }}
                    >
                        ↓
                    </button>
                    <input
                        value={exerciseData.order}
                        className={styles.inputBoxSmall}
                        onChange={(e) =>
                            updateExercise({
                                ...exerciseData,
                                order: Number(e.target.value),
                            })
                        }
                    ></input>
                    <select
                        defaultValue={exerciseData.exerciseId ?? ""}
                        onChange={(e) =>
                            updateExercise({
                                ...exerciseData,
                                exerciseId: Number(e.target.value),
                            })
                        }
                    >
                        {allExercises.map((exercise: exerciseObject) => (
                            <option key={exercise.id} value={exercise.id}>
                                {exercise.name}
                            </option>
                        ))}
                    </select>
                    <button
                        className={styles.deleteButton}
                        onClick={() => {
                            removeExercise(exerciseData.id);
                        }}
                    >
                        ✖️
                    </button>
                    {exerciseData.sets
                        .sort((a, b) => a.order - b.order)
                        .map((set: routineExerciseSetObject) => (
                            <RoutineExerciseSetEditCard2
                                key={set.id}
                                exerciseId={exerciseData.id}
                                setData={set}
                            />
                        ))}
                    <button
                        className={styles.addButton}
                        onClick={() => {
                            addSet(exerciseData);
                        }}
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
}

export default RoutineExerciseEditCard2;
