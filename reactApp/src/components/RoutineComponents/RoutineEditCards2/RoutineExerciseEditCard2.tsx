import styles from "./RoutineEditCard2.module.css";

import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "../../../types/routineTypes";
import RoutineExerciseSetEditCard2 from "../RoutineEditCards2/RoutineExerciseSetEditCard2.tsx";
import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine";

interface RoutineExerciseEditCard2Props {
    exerciseData: routineExerciseObject;
    updateExercise: (updated: routineExerciseObject) => void;
    exerciseIndex: number;
}

function RoutineExerciseEditCard2({
    exerciseData,
    exerciseIndex,
}: RoutineExerciseEditCard2Props) {
    const { routineData, setRoutineData } = useRoutineData();

    const updateExercise = (index: number, updated: routineExerciseObject) => {
        if (routineData) {
            const newExercises: routineExerciseObject[] = [
                ...routineData.exercises,
            ];

            newExercises[index] = updated;
            setRoutineData({ ...routineData, exercises: newExercises });
        }
    };

    return (
        <div>
            {exerciseData && (
                <div>
                    <input
                        className={styles.inputBoxMed}
                        defaultValue={exerciseData.exerciseName}
                        onChange={(e) =>
                            updateExercise(exerciseIndex, {
                                ...exerciseData,
                                exerciseName: e.target.value,
                            })
                        }
                    ></input>
                    <div>{` * exercise => ${exerciseData.id} | index => ${exerciseIndex} * `}</div>
                    {exerciseData.sets.map(
                        (set: routineExerciseSetObject, index: number) => (
                            <RoutineExerciseSetEditCard2
                                setData={set}
                                exerciseIndex={exerciseIndex}
                                setIndex={index}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default RoutineExerciseEditCard2;
