import styles from "./RoutineCard.module.css";

import {
    routineExerciseObject,
    routineExerciseSetObject,
    routineObject,
} from "../../types/routineTypes";

interface RoutineCardProps {
    routineData: routineObject;
}

import { useState } from "react";

function RoutineCard({ routineData }: RoutineCardProps) {
    // state hooks for whether or not exercises or routine are expanded or minimised:
    const [expanded, setExpanded] = useState(false);
    const [exerciseExpanded, setExerciseExpanded] = useState<{
        [key: number]: boolean;
    }>({});

    // callback functions which change state hooks to exanded or not expanded
    const handleToggle = () => {
        setExpanded((prev) => !prev);
    };

    const handleExerciseToggle = (exerciseId: number) => {
        setExerciseExpanded((prev) => ({
            ...prev,
            [exerciseId]: !prev[exerciseId],
        }));
    };

    return (
        <div className={styles.routineCard}>
            <div
                className={`${styles.routineTitleRow} ${
                    expanded ? styles.expandedBorder : ""
                }`}
            >
                <span className={styles.routineTitle}>{routineData.name}</span>
                <button
                    className={styles.toggleButton}
                    onClick={handleToggle}
                    type="button"
                >
                    {expanded ? "−" : "+"}
                </button>
            </div>
            {expanded ? (
                routineData.exercises && routineData.exercises.length > 0 ? (
                    <div className={styles.routineExercises}>
                        {routineData.exercises.map(
                            (exercise: routineExerciseObject) => (
                                <div
                                    key={exercise.id}
                                    className={styles.routineExercise}
                                >
                                    <div
                                        className={`${styles.exerciseNameRow} ${
                                            exerciseExpanded[exercise.id]
                                                ? styles.expandedBorder
                                                : ""
                                        }`}
                                    >
                                        <div className={styles.exerciseName}>
                                            {exercise.exerciseName}
                                        </div>
                                        <button
                                            className={styles.toggleButton}
                                            onClick={() =>
                                                handleExerciseToggle(
                                                    exercise.id
                                                )
                                            }
                                            type="button"
                                        >
                                            {exerciseExpanded[exercise.id]
                                                ? "−"
                                                : "+"}
                                        </button>
                                    </div>
                                    {exerciseExpanded[exercise.id] && (
                                        <div className={styles.exerciseSets}>
                                            {exercise.sets.map(
                                                (
                                                    set: routineExerciseSetObject
                                                ) => (
                                                    <div
                                                        key={set.id}
                                                        className={
                                                            styles.exerciseSet
                                                        }
                                                    >
                                                        {set.repRangeLow} -{" "}
                                                        {set.repRangeHigh}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <p>No exercises in this routine..</p>
                )
            ) : null}
        </div>
    );
}

export default RoutineCard;
