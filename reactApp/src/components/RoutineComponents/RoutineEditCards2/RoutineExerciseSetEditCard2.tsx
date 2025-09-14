import styles from "./RoutineEditCard2.module.css";

import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "../../../types/routineTypes";
import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine";

interface RoutineExerciseSetEditCard2Props {
    setData: routineExerciseSetObject;
    exerciseIndex: number;
    setIndex: number;
}

function RoutineExerciseEditCard2({
    setData,
    exerciseIndex,
    setIndex,
}: RoutineExerciseSetEditCard2Props) {
    const { routineData, setRoutineData } = useRoutineData();

    const updateExerciseSet = (
        eIndex: number,
        sIndex: number,
        updated: routineExerciseSetObject
    ) => {
        if (routineData) {
            const newExercises: routineExerciseObject[] = [
                ...routineData.exercises,
            ];

            newExercises[eIndex].sets[sIndex] = updated;
            setRoutineData({ ...routineData, exercises: newExercises });
        }
    };

    return (
        <div>
            {setData && (
                <div>
                    <div>{`     set => ${setData.repRangeLow} | index => ${setIndex}`}</div>
                    <input
                        className={styles.inputBoxSmall}
                        defaultValue={setData.repRangeLow}
                        onChange={(e) =>
                            updateExerciseSet(exerciseIndex, setIndex, {
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
                            updateExerciseSet(exerciseIndex, setIndex, {
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
