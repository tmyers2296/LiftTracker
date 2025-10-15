import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine";
import { useRef } from "react";
import RoutineExerciseEditCard2 from "../RoutineEditCards2/RoutineExerciseEditCard2.tsx";
import { routineExerciseObject } from "../../../types/routineTypes.ts";
import styles from "./RoutineEditCard2.module.css";

function RoutineEditCard2() {
    const { routineData, setRoutineData, allExercises } = useRoutineData();

    let tempIdCounter = useRef(-1);

    function createTempId() {
        return tempIdCounter.current--; // e.g. -1, -2, -3...
    }

    const updateExercise = (index: number, updated: routineExerciseObject) => {
        if (routineData) {
            const newExercises: routineExerciseObject[] = [
                ...routineData.exercises,
            ];

            newExercises[index] = updated;
            setRoutineData({ ...routineData, exercises: newExercises });
        }
    };

    const addExercise = () => {
        if (routineData) {
            const newExercise: routineExerciseObject = {
                id: createTempId(),
                exerciseId: allExercises[0].id,
                routineId: routineData.id,
                exerciseName: allExercises[0].name,
                order: routineData.exercises.length,
                sets: [],
            };

            const newExercises: routineExerciseObject[] = [
                ...routineData.exercises,
                newExercise,
            ];

            setRoutineData({ ...routineData, exercises: newExercises });
        }
    };

    return (
        <div>
            {routineData && (
                <div>
                    {routineData.exercises
                        .sort((a, b) => a.order - b.order)
                        .map(
                            (
                                exercise: routineExerciseObject,
                                index: number
                            ) => (
                                <RoutineExerciseEditCard2
                                    key={exercise.id}
                                    exerciseData={exercise}
                                    updateExercise={(updated) =>
                                        updateExercise(index, updated)
                                    }
                                />
                            )
                        )}
                    <button
                        className={styles.addButton}
                        onClick={() => {
                            addExercise();
                        }}
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
}

export default RoutineEditCard2;
