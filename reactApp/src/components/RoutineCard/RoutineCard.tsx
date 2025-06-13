import styles from "./RoutineCard.module.css";

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
    // rendering functions:
    const renderExercise = (exercise: routineExerciseObject) => {
        return (
            <ExpandableCard cardName={exercise.exerciseName}>
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
                <div key={set.id} className={styles.exerciseSet}></div>
                {set.repRangeLow} - {set.repRangeHigh}
            </div>
        );
    };

    return (
        <ExpandableCard
            cardName={routineData.name}
            className={styles.topLayerCard}
        >
            {routineData.exercises.map((exercise: routineExerciseObject) =>
                renderExercise(exercise)
            )}
        </ExpandableCard>
    );
}

export default RoutineCard;
