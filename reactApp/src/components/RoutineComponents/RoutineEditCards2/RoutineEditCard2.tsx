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
                    <div>
                        {routineData.exercises.map(
                            (exercise: routineExerciseObject) => (
                                <div key={exercise.id}>
                                    <div>{`context exercise - ${exercise.id} ${exercise.exerciseName}`}</div>
                                    <div>
                                        {exercise.sets.map(
                                            (set: routineExerciseSetObject) => (
                                                <div
                                                    key={set.id}
                                                >{`context set - ${set.id}`}</div>
                                            )
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <br />
                    <div>{`${routineData.id} -> ${routineData.name}`}</div>
                    <input
                        defaultValue={routineData.name}
                        onChange={(e) =>
                            setRoutineData({
                                ...routineData,
                                name: e.target.value,
                            })
                        }
                    />
                    <br />
                    <br />
                    {routineData.exercises.map(
                        (exercise: routineExerciseObject, index: number) => (
                            <RoutineExerciseEditCard2
                                key={exercise.id}
                                exerciseData={exercise}
                                updateExercise={(updated) =>
                                    updateExercise(index, updated)
                                }
                                exerciseIndex={index}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default RoutineEditCard2;
