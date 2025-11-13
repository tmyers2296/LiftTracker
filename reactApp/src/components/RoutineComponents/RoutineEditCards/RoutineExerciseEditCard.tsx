import { routineExerciseObject } from "../../../types/routineTypes.ts";
import EditableCard from "../../EditableCard/EditableCard.tsx";
import RoutineExerciseSetEditCard from "./RoutineExerciseSetEditCard.tsx";

function RoutineExerciseEditCard(exercise: routineExerciseObject) {
    return (
        <EditableCard
            key={exercise.id}
            cardName={exercise.exerciseName}
            layerData={exercise}
            createItemButton={true}
            subComponent={RoutineExerciseSetEditCard}
        ></EditableCard>
    );
}

export default RoutineExerciseEditCard;
