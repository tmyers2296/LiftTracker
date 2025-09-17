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
}

function RoutineExerciseEditCard2({
    exerciseData,
}: RoutineExerciseEditCard2Props) {
    const { routineData, setRoutineData } = useRoutineData();

    const updateExercise = (eId: number, updated: routineExerciseObject) => {
        if (routineData) {
            const newExercises = routineData.exercises.map((exercise) => {
                if (exercise.id !== eId) return exercise;
                return updated;
            });

            setRoutineData({ ...routineData, exercises: newExercises });
        }
    };

    return (
        <div>
            {exerciseData && (
                <div>
                    <div>{"----------"}</div>
                    {/* <div>{` * exercise id => ${exerciseData.id} * `}</div> */}
                    <input
                        className={styles.inputBoxMed}
                        defaultValue={exerciseData.exerciseName}
                        onChange={(e) =>
                            updateExercise(exerciseData.id, {
                                ...exerciseData,
                                exerciseName: e.target.value,
                            })
                        }
                    ></input>
                    {exerciseData.sets.map((set: routineExerciseSetObject) => (
                        <RoutineExerciseSetEditCard2
                            key={set.id}
                            exerciseId={exerciseData.id}
                            setData={set}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default RoutineExerciseEditCard2;
