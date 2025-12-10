import styles from "../WorkoutComponents.module.css";
import { useNavigate } from "react-router-dom";
import {
    workoutObject,
    workoutExerciseObject,
    workoutExerciseSetObject,
} from "../../../types/workoutTypes.ts";
import { useDeleteRoutine } from "../../../hooks/routineHooks.tsx";
import ExpandableCard from "../../ExpandableCard/ExpandableCard.tsx";

interface RoutineCardProps {
    workoutData: workoutObject;
}

function WorkoutCard({ workoutData }: RoutineCardProps) {
    const navigate = useNavigate();
    const deleteRoutineMutation = useDeleteRoutine();

    // rendering functions:
    const renderExercise = (exercise: workoutExerciseObject) => {
        return (
            <ExpandableCard
                key={exercise.id}
                cardName={`exercise id: ${String(exercise.exerciseId)}`}
            >
                <div className={styles.exerciseSets}>
                    {exercise.sets.map((set: workoutExerciseSetObject) =>
                        renderSet(set)
                    )}
                </div>
            </ExpandableCard>
        );
    };

    const renderSet = (set: workoutExerciseSetObject) => {
        return (
            <div key={set.id} className={styles.exerciseSet}>
                <div className={styles.setHeader}>set {set.order + 1}</div>

                <div>
                    {set.weight}kg for {set.reps} reps
                </div>
            </div>
        );
    };

    const handleEdit = (routineId: number) => {
        navigate(`/edit-routine/${routineId}`);
    };

    const handleDelete = () => {
        deleteRoutineMutation.mutate(workoutData.id);
    };

    let buttonsCallbacks: {
        [key: string]: { callback: () => void; style: string };
    } = {
        "✏️": {
            callback: () => {
                handleEdit(workoutData.id);
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
            cardName={workoutData.name}
            subTitle={`@ ${workoutData.date.getDate()}-${workoutData.date.getMonth()}-${workoutData.date.getFullYear()}`}
            className={styles.topLayerCard}
            buttons={buttonsCallbacks}
        >
            {workoutData.exercises.map((exercise: workoutExerciseObject) =>
                renderExercise(exercise)
            )}
        </ExpandableCard>
    );
}

export default WorkoutCard;
