import { routineExerciseSetObject } from "../../../types/routineTypes";

interface RoutineExerciseSetEditCard2Props {
    setData: routineExerciseSetObject;
    setIndex: number;
}

function RoutineExerciseEditCard2({
    setData,
    setIndex,
}: RoutineExerciseSetEditCard2Props) {
    return (
        <div>
            {setData && (
                <div>
                    <div>{`     set => ${setData.id} | index => ${setIndex}`}</div>
                </div>
            )}
        </div>
    );
}

export default RoutineExerciseEditCard2;
