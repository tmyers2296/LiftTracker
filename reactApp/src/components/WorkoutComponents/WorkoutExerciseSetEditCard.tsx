import { useWorkoutData } from "../../pages/WorkoutPages/RecordRoutineWorkout.tsx";
import { useState } from "react";
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

    const [hasTyped, setHasTyped] = useState<boolean>(false);

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

    const updateSet = (
        exerciseId: number,
        updatedSet: workoutExerciseSetObject
    ) => {
        if (!workoutData) return;

        const exerciseToUpdate = workoutData.exercises.find(
            (ex) => ex.id === exerciseId
        );

        if (!exerciseToUpdate) return;

        const updatedExercise = {
            ...exerciseToUpdate,
            sets: updateItem(exerciseToUpdate.sets, updatedSet),
        };

        setWorkoutData({
            ...workoutData,
            exercises: updateItem(workoutData.exercises, updatedExercise),
        });
    };

    return (
        <div className={styles.itemBox2}>
            <div className={styles.item}>{`set #${setData.order + 1}`} </div>
            <input
                className={`${styles.item} ${styles.restrictWidth}`}
                value={!hasTyped && setData.reps === 0 ? "" : setData.reps}
                placeholder="6-8"
                onChange={(e) => {
                    setHasTyped(e.target.value === "" ? false : true);
                    updateSet(exerciseId, {
                        ...setData,
                        reps: Number(e.target.value),
                    });
                }}
            />
            <button
                className={styles.item}
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
