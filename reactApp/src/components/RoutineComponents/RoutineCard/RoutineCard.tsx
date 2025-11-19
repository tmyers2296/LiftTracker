import styles from "./RoutineCard.module.css";
import { useNavigate } from "react-router-dom";
import {
    routineExerciseObject,
    routineExerciseSetObject,
    routineObject,
} from "../../../types/routineTypes.ts";
import { useDeleteRoutine } from "../../../hooks/routineHooks.tsx";
import ExpandableCard from "../../ExpandableCard/ExpandableCard.tsx";

interface RoutineCardProps {
    routineData: routineObject;
}

function RoutineCard({ routineData }: RoutineCardProps) {
    const navigate = useNavigate();
    const deleteRoutineMutation = useDeleteRoutine();
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

    const handleDelete = () => {
        deleteRoutineMutation.mutate(routineData.id);
    };

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
                handleDelete();
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
