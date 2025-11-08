import styles from "./RoutineEditCard2.module.css";
import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "../../../types/routineTypes";
import { exerciseObject } from "../../../types/generalTypes";
import RoutineExerciseSetEditCard2 from "../RoutineEditCards2/RoutineExerciseSetEditCard2.tsx";
import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine";
import { swapOrder } from "../../../modules/editingFunctions";
import { createTempId } from "../../../modules/editingFunctions.tsx";

interface RoutineExerciseEditCard2Props {
    exerciseData: routineExerciseObject;
    updateExercise: (updated: routineExerciseObject) => void;
}

function RoutineExerciseEditCard2({
    exerciseData,
}: RoutineExerciseEditCard2Props) {
    const { routineData, setRoutineData, allExercises, tempIdCounter } =
        useRoutineData();

    const updateExercise = (eId: number, updated: routineExerciseObject) => {
        if (routineData) {
            const newExercises = routineData.exercises.map((exercise) => {
                if (exercise.id !== eId) return exercise;
                return updated;
            });

            setRoutineData({ ...routineData, exercises: newExercises });
        }
    };

    const addSet = (exercise: routineExerciseObject) => {
        if (exercise) {
            const newExercise: routineExerciseObject = exerciseData;

            const newSet: routineExerciseSetObject = {
                id: createTempId(tempIdCounter),
                repRangeLow: 6,
                repRangeHigh: 8,
                order: exercise.sets.length,
            };

            newExercise.sets = [...exercise.sets, newSet];
            newExercise.sets;

            updateExercise(exerciseData.id, newExercise);
        }
    };

    const shiftExerciseOrder = (direction: "up" | "down") => {
        if (!routineData) return;
        const newExercises = swapOrder(
            routineData.exercises,
            exerciseData.id,
            direction
        );
        setRoutineData({ ...routineData, exercises: newExercises });
    };

    const removeExercise = (exerciseId: number) => {
        if (!routineData) return;

        const exerciseToDelete = routineData.exercises.find(
            (exercise) => exercise.id === exerciseId
        );

        if (!exerciseToDelete) return;

        const newExercises = routineData.exercises
            .filter((exercise) => exercise.id !== exerciseId)
            .map((exercise) =>
                exercise.order > exerciseToDelete.order
                    ? { ...exercise, order: exercise.order - 1 }
                    : exercise
            );

        setRoutineData({ ...routineData, exercises: newExercises });
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
                    ></input>
                    <select
                        defaultValue={exerciseData.exerciseId ?? ""}
                        onChange={(e) =>
                            updateExercise(exerciseData.id, {
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
