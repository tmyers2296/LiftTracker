import styles from "./RoutineEditCard2.module.css";

import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "../../../types/routineTypes";
import { exerciseObject } from "../../../types/generalTypes";
import RoutineExerciseSetEditCard2 from "../RoutineEditCards2/RoutineExerciseSetEditCard2.tsx";
import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine";

interface RoutineExerciseEditCard2Props {
    exerciseData: routineExerciseObject;
    updateExercise: (updated: routineExerciseObject) => void;
}

function RoutineExerciseEditCard2({
    exerciseData,
}: RoutineExerciseEditCard2Props) {
    const { routineData, setRoutineData, allExercises } = useRoutineData();

    const updateExercise = (eId: number, updated: routineExerciseObject) => {
        if (routineData) {
            const newExercises = routineData.exercises.map((exercise) => {
                if (exercise.id !== eId) return exercise;
                return updated;
            });

            setRoutineData({ ...routineData, exercises: newExercises });
        }
    };

    const shiftOrderUp = (exerciseData: routineExerciseObject) => {
        if (!routineData) return;

        const newExercises = routineData.exercises.map((exercise) => {
            if (!(exerciseData.order >= 0 && routineData.exercises.length > 1))
                return exercise;

            if (exerciseData.order >= routineData.exercises.length - 1)
                return exercise;

            if (exercise.id === exerciseData.id) {
                return { ...exercise, order: exercise.order + 1 };
            } else if (exercise.order === exerciseData.order + 1) {
                return { ...exercise, order: exercise.order - 1 };
            }
            return exercise;
        });

        setRoutineData({ ...routineData, exercises: newExercises });
    };

    const shiftOrderDown = (exerciseData: routineExerciseObject) => {
        if (!routineData) return;

        const newExercises = routineData.exercises.map((exercise) => {
            if (!(exerciseData.order > 0)) return exercise;

            if (exercise.id === exerciseData.id) {
                return { ...exercise, order: exercise.order - 1 };
            } else if (exercise.order === exerciseData.order - 1) {
                return { ...exercise, order: exercise.order + 1 };
            }
            return exercise;
        });

        setRoutineData({ ...routineData, exercises: newExercises });
    };

    return (
        <div className={styles.exerciseCard}>
            {exerciseData && (
                <div>
                    <button
                        className={styles.updownButton2}
                        onClick={() => {
                            shiftOrderDown(exerciseData);
                        }}
                    >
                        ↑
                    </button>
                    <button
                        className={styles.updownButton2}
                        onClick={() => {
                            shiftOrderUp(exerciseData);
                        }}
                    >
                        ↓
                    </button>
                    <select defaultValue={exerciseData.exerciseId ?? ""}>
                        {allExercises.map((exercise: exerciseObject) => (
                            <option key={exercise.id} value={exercise.id}>
                                {exercise.name}
                            </option>
                        ))}
                    </select>
                    {exerciseData.sets
                        .sort((a, b) => a.order - b.order)
                        .map((set: routineExerciseSetObject) => (
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
