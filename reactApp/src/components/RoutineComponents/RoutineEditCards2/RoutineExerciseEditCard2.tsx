import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "../../../types/routineTypes";
import RoutineExerciseSetEditCard2 from "../RoutineEditCards2/RoutineExerciseSetEditCard2.tsx";

interface RoutineExerciseEditCard2Props {
    exerciseData: routineExerciseObject;
    updateExercise: (updated: routineExerciseObject) => void;
}

function RoutineExerciseEditCard2({
    exerciseData,
    updateExercise,
}: RoutineExerciseEditCard2Props) {
    return (
        <div>
            {exerciseData && (
                <div>
                    <input
                        defaultValue={exerciseData.exerciseName}
                        onChange={(e) =>
                            updateExercise({
                                ...exerciseData,
                                exerciseName: e.target.value,
                            })
                        }
                    ></input>
                    <div>{` exercise => ${exerciseData.id}`}</div>
                    {exerciseData.sets.map((set: routineExerciseSetObject) => (
                        <RoutineExerciseSetEditCard2 setData={set} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default RoutineExerciseEditCard2;
