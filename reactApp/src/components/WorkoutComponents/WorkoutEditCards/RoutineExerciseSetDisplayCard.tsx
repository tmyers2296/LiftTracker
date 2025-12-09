import { routineExerciseSetObject } from "../../../types/routineTypes.ts";
import styles from "../WorkoutComponents.module.css";
import { useWorkoutData } from "../../../pages/WorkoutPages/RecordRoutineWorkout.tsx";
import { updateItem, addItem } from "../../../modules/editingFunctions.tsx";
import { createNewWorkoutExerciseSet } from "../../../modules/itemFactories.tsx";
import { workoutExerciseSetObject } from "../../../types/workoutTypes.ts";

interface RoutineExerciseSetDisplayCardProps {
    setData: routineExerciseSetObject;
    workoutExerciseId: number;
}

function RoutineExerciseSetDisplayCard({
    setData,
    workoutExerciseId,
}: RoutineExerciseSetDisplayCardProps) {
    const { dispatchIdMappings, workoutData, setWorkoutData, tempIdCounter } =
        useWorkoutData();

    const addWorkoutSet = (workoutExerciseId: number) => {
        const exercise = workoutData.exercises.find(
            (workoutExercise) => workoutExercise.id === workoutExerciseId
        );

        if (!workoutData) return;
        if (!exercise) return;

        const newSet: workoutExerciseSetObject = createNewWorkoutExerciseSet(
            tempIdCounter,
            exercise.sets.length
        );

        const newExercises = updateItem(workoutData.exercises, {
            ...exercise,
            sets: addItem(exercise.sets, newSet),
        });

        setWorkoutData({ ...workoutData, exercises: newExercises });
    };

    return (
        <div className={styles.itemBox2Small}>
            <div
                className={styles.item}
            >{`${setData.repRangeLow} - ${setData.repRangeHigh}`}</div>
            <button
                className={styles.item}
                onClick={() => {
                    addWorkoutSet(workoutExerciseId);
                    dispatchIdMappings({
                        type: "MAP_SET",
                        routineSetId: setData.id,
                        workoutSetId: tempIdCounter.current + 1,
                    });
                }}
            >
                💪
            </button>
        </div>
    );
}

export default RoutineExerciseSetDisplayCard;
