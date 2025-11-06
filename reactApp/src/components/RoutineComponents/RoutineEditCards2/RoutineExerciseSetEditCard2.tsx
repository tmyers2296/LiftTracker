import styles from "./RoutineEditCard2.module.css";

import { routineExerciseSetObject } from "../../../types/routineTypes";
import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine";
import { swapOrder } from "../../../modules/editingFunctions";

interface RoutineExerciseSetEditCard2Props {
    setData: routineExerciseSetObject;
    exerciseId: number;
}

function RoutineExerciseEditSetCard2({
    setData,
    exerciseId,
}: RoutineExerciseSetEditCard2Props) {
    const { routineData, setRoutineData } = useRoutineData();

    const updateExerciseSet = (
        exerciseId: number,
        updated: routineExerciseSetObject
    ) => {
        if (!routineData) return;

        const newExercises = routineData.exercises.map((exercise) => {
            if (exercise.id !== exerciseId) return exercise;

            return {
                ...exercise,
                sets: exercise.sets.map((set) =>
                    set.id === updated.id ? updated : set
                ),
            };
        });

        setRoutineData({ ...routineData, exercises: newExercises });
    };

    const removeSet = (exerciseId: number, setId: number) => {
        if (!routineData) return;

        const newExercises = routineData.exercises.map((exercise) => {
            if (exercise.id !== exerciseId) return exercise;

            return {
                ...exercise,
                sets: exercise.sets.filter((set) => set.id !== setId),
            };
        });

        setRoutineData({ ...routineData, exercises: newExercises });
    };

    // **Shifting functions**

    const shiftSetOrder = (direction: "up" | "down") => {
        if (!routineData) return;

        const exercise = routineData.exercises.find((e) => e.id === exerciseId);
        if (!exercise) return;

        const newSets = swapOrder(exercise.sets, setData.id, direction);

        setRoutineData({
            ...routineData,
            exercises: routineData.exercises.map((exercise) =>
                exercise.id === exerciseId
                    ? { ...exercise, sets: newSets }
                    : exercise
            ),
        });
    };

    return (
        <div>
            {setData && (
                <div>
                    {/* <div>{`     set => ${setData.repRangeLow} | id => ${setData.id}`}</div> */}
                    <button
                        className={styles.updownButton}
                        onClick={() => {
                            shiftSetOrder("down");
                        }}
                    >
                        ↑
                    </button>
                    <button
                        className={styles.updownButton}
                        onClick={() => {
                            shiftSetOrder("up");
                        }}
                    >
                        ↓
                    </button>
                    <input
                        className={styles.inputBoxSmallBlue}
                        defaultValue={setData.order}
                        onChange={(e) =>
                            updateExerciseSet(exerciseId, {
                                ...setData,
                                order: Number(e.target.value),
                            })
                        }
                    ></input>
                    |
                    <input
                        className={styles.inputBoxSmall}
                        defaultValue={setData.repRangeLow}
                        onChange={(e) =>
                            updateExerciseSet(exerciseId, {
                                ...setData,
                                repRangeLow: Number(e.target.value),
                            })
                        }
                    ></input>
                    -
                    <input
                        className={styles.inputBoxSmall}
                        defaultValue={setData.repRangeHigh}
                        onChange={(e) =>
                            updateExerciseSet(exerciseId, {
                                ...setData,
                                repRangeHigh: Number(e.target.value),
                            })
                        }
                    ></input>
                    <button
                        className={styles.deleteButton}
                        onClick={() => {
                            removeSet(exerciseId, setData.id);
                        }}
                    >
                        ✖️
                    </button>
                </div>
            )}
        </div>
    );
}

export default RoutineExerciseEditSetCard2;
