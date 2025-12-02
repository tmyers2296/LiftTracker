import { useWorkoutData } from "../../pages/WorkoutPages/RecordRoutineWorkout.tsx";
import { workoutExerciseSetObject } from "../../types/workoutTypes.ts";
import { removeItem, updateItem } from "../../modules/editingFunctions.tsx";
import styles from "./WorkoutComponents.module.css";

interface WorkoutExerciseDisplayCardProps {
    exerciseId: number;
    setData: workoutExerciseSetObject;
}

function WorkoutExerciseSetEditCard({
    exerciseId,
    setData,
}: WorkoutExerciseDisplayCardProps) {
    const { dispatchIdMappings, workoutData, setWorkoutData } =
        useWorkoutData();

    const removeSet = (exerciseId: number, setId: number) => {
        if (!workoutData) return;

        const exerciseToUpdate = workoutData.exercises.find(
            (ex) => ex.id === exerciseId
        );

        if (!exerciseToUpdate) return;

        const updatedExercises = updateItem(workoutData.exercises, {
            ...exerciseToUpdate,
            sets: removeItem(exerciseToUpdate.sets, setId),
        });

        setWorkoutData({ ...workoutData, exercises: updatedExercises });
    };

    return (
        <div className={styles.itemBox2}>
            <div className={styles.item}>{`set #${setData.order + 1} reps: ${
                setData.reps
            }`}</div>
            <button
                onClick={() => {
                    removeSet(exerciseId, setData.id);
                    dispatchIdMappings({
                        type: "DELETE_SET_MAPPING",
                        workoutSetId: setData.id,
                    });
                }}
            >
                💣
            </button>
        </div>
    );
}

export default WorkoutExerciseSetEditCard;
