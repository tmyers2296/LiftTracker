import {
    routineExerciseObject,
    routineExerciseSetObject,
} from "../../../types/routineTypes.ts";
import EditableCard from "../../EditableCard/EditableCard.tsx";
import styles from "./RoutineEditCard.module.css";
import RoutineExerciseSetEditCard from "./RoutineExerciseSetEditCard.tsx";

function RoutineExerciseEditCard(exercise: routineExerciseObject) {
    return (
        <EditableCard
            key={exercise.id}
            cardName={exercise.exerciseName}
            layerData={exercise}
            createItemButton={true}
            subComponent={RoutineExerciseSetEditCard}
        >
            <div className={styles.exerciseSets}>
                {exercise.sets.map((set: routineExerciseSetObject) =>
                    RoutineExerciseSetEditCard(set)
                )}
            </div>
        </EditableCard>
    );
}

export default RoutineExerciseEditCard;
