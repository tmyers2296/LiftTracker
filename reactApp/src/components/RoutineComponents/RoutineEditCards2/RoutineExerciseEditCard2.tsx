import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "../../../types/routineTypes";
import RoutineExerciseSetEditCard2 from "../RoutineEditCards2/RoutineExerciseSetEditCard2.tsx";

interface RoutineExerciseEditCard2Props {
    exerciseData: routineExerciseObject;
    updateExercise: (updated: routineExerciseObject) => void;
    exerciseIndex: number;
}

function RoutineExerciseEditCard2({
    exerciseData,
    updateExercise,
    exerciseIndex,
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
                    <div>{` * exercise => ${exerciseData.id} | index => ${exerciseIndex} * `}</div>
                    {exerciseData.sets.map(
                        (set: routineExerciseSetObject, index: number) => (
                            <RoutineExerciseSetEditCard2
                                setData={set}
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
