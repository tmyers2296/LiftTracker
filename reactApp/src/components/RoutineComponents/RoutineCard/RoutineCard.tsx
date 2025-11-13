import styles from "./RoutineCard.module.css";
import { useNavigate } from "react-router-dom";

import {
    routineExerciseObject,
    routineExerciseSetObject,
    routineObject,
} from "../../../types/routineTypes.ts";

import ExpandableCard from "../../ExpandableCard/ExpandableCard.tsx";

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

    async function handleDelete(routineId: number) {
        const response = await fetch(
            `https://localhost:5119/routines/${routineId}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!response.ok) throw new Error("Failed to delete entity");
    }

    let buttonsCallbacks: {
        [key: string]: { callback: () => void; style: string };
    } = {
        "✏️": {
            callback: () => {
                handleEdit(routineData.id);
            },
            style: styles.toggleButton,
        },
        "💣": {
            callback: () => {
                handleDelete(routineData.id);
            },
            style: styles.deleteButton,
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
