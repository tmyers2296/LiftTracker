import styles from "./RoutineCard.module.css";
import { useNavigate } from "react-router-dom";

import {
    routineExerciseObject,
    routineExerciseSetObject,
    routineObject,
} from "../../types/routineTypes";

import ExpandableCard from "../ExpandableCard/ExpandableCard.tsx";

interface RoutineCardProps {
    routineData: routineObject;
}

function RoutineCard({ routineData }: RoutineCardProps) {
    const navigate = useNavigate();
    // rendering functions:
    const renderExercise = (exercise: routineExerciseObject) => {
        return (
            <ExpandableCard key={exercise.id} cardName={exercise.exerciseName}>
                <div className={styles.exerciseSets}>
                    {exercise.sets.map((set: routineExerciseSetObject) =>
                        renderSet(set)
                    )}
                </div>
            </ExpandableCard>
        );
    };

    const renderSet = (set: routineExerciseSetObject) => {
        return (
            <div key={set.id} className={styles.exerciseSet}>
                <div className={styles.setHeader}>set {set.order + 1}</div>

                <div>
                    {set.repRangeLow} - {set.repRangeHigh}
                </div>
            </div>
        );
    };

    const handleEdit = (routineId: number) => {
        navigate(`/edit-routine/${routineId}`);
    };

    let buttonsCallbacks: { [key: string]: () => void } = {
        "✏️": () => {
            handleEdit(routineData.id);
        },
    };

    return (
        <ExpandableCard
            cardName={routineData.name}
            className={styles.topLayerCard}
            buttons={buttonsCallbacks}
        >
            {routineData.exercises.map((exercise: routineExerciseObject) =>
                renderExercise(exercise)
            )}
        </ExpandableCard>
    );
}

export default RoutineCard;
