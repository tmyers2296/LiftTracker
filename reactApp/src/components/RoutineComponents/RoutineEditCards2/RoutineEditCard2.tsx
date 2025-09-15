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
                        {routineData.exercises
                            .sort((a, b) => a.order - b.order)
                            .map((exercise: routineExerciseObject) => (
                                <div key={exercise.id}>
                                    <div>{`----------------`}</div>
                                    <div>{`| ${exercise.id} (${exercise.order}) ${exercise.exerciseName} |`}</div>
                                    <div>{`----------------`}</div>
                                    <div>
                                        {exercise.sets
                                            .sort((a, b) => a.order - b.order)
                                            .map(
                                                (
                                                    set: routineExerciseSetObject
                                                ) => (
                                                    <div
                                                        key={set.id}
                                                    >{`${set.id}: (${set.order}) [${set.repRangeLow} - ${set.repRangeHigh}]`}</div>
                                                )
                                            )}
                                    </div>
                                </div>
                            ))}
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
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default RoutineEditCard2;
