import { useRoutineData } from "../../../pages/RoutinePages/EditRoutine";
import RoutineExerciseEditCard2 from "../RoutineEditCards2/RoutineExerciseEditCard2.tsx";
import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "../../../types/routineTypes.ts";

function RoutineEditCard2() {
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
                </div>
            )}
        </div>
    );
}

export default RoutineEditCard2;
