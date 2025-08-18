import { routineExerciseSetObject } from "../../../types/routineTypes";

interface RoutineExerciseSetEditCard2Props {
    setData: routineExerciseSetObject;
}

function RoutineExerciseEditCard2({
    setData,
}: RoutineExerciseSetEditCard2Props) {
    return (
        <div>
            {setData && (
                <div>
                    <div>{`     set => ${setData.id}`}</div>
                </div>
            )}
        </div>
    );
}

export default RoutineExerciseEditCard2;
