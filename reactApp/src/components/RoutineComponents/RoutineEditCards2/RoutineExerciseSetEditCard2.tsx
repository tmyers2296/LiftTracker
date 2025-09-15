import styles from "./RoutineEditCard2.module.css";

import { routineExerciseSetObject } from "../../../types/routineTypes";
import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine";

interface RoutineExerciseSetEditCard2Props {
    setData: routineExerciseSetObject;
    exerciseId: number;
}

function RoutineExerciseEditCard2({
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

    return (
        <div>
            {setData && (
                <div>
                    <div>{`     set => ${setData.repRangeLow} | index => ${setData.id}`}</div>
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
                </div>
            )}
        </div>
    );
}

export default RoutineExerciseEditCard2;
