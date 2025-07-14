import styles from "./RoutineEditCard.module.css";
import { useNavigate } from "react-router-dom";

import {
    routineExerciseObject,
    routineExerciseSetObject,
    routineObject,
} from "../../../types/routineTypes.ts";

import EditableCard from "../../EditableCard/EditableCard.tsx";

interface RoutineCardProps {
    routineData: routineObject;
}

function RoutineEditCard({ routineData }: RoutineCardProps) {
    const navigate = useNavigate();
    // rendering functions:
    const renderExercise = (exercise: routineExerciseObject) => {
        return (
            <EditableCard
                key={exercise.id}
                cardName={exercise.exerciseName}
                createItemButton={true}
            >
                <div className={styles.exerciseSets}>
                    {exercise.sets.map((set: routineExerciseSetObject) =>
                        renderSet(set)
                    )}
                </div>
            </EditableCard>
        );
    };

    const renderSet = (set: routineExerciseSetObject) => {
        return (
            <EditableCard
                key={set.id}
                className={styles.exerciseSet}
                createItemButton={false}
            >
                <div className={styles.setEditor}>
                    <input
                        defaultValue={set.repRangeLow}
                        className={styles.inputBox}
                    />
                    <span> - </span>
                    <input
                        defaultValue={set.repRangeHigh}
                        className={styles.inputBox}
                    />
                </div>
            </EditableCard>
        );
    };

    console.log(routineData);

    return (
        <EditableCard
            cardName={routineData.name}
            className={styles.topLayerCard}
            createItemButton={true}
        >
            {routineData.exercises.map((exercise: routineExerciseObject) =>
                renderExercise(exercise)
            )}
        </EditableCard>
    );
}

export default RoutineEditCard;
