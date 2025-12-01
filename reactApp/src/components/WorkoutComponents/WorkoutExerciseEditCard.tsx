import { useWorkoutData } from "../../pages/WorkoutPages/RecordRoutineWorkout.tsx";
import { workoutExerciseObject } from "../../types/workoutTypes.ts";
import { removeItem } from "../../modules/editingFunctions.tsx";
import styles from "./WorkoutComponents.module.css";
import RoutineExerciseSetDisplayCard from "./RoutineExerciseSetDisplayCard.tsx";
import { routineExerciseObject } from "../../types/routineTypes.ts";

interface WorkoutExerciseDisplayCardProps {
    exerciseData: workoutExerciseObject;
}

function WorkoutExerciseEditCard({
    exerciseData,
}: WorkoutExerciseDisplayCardProps) {
    const {
        idMappings,
        dispatchIdMappings,
        allExercises,
        workoutData,
        setWorkoutData,
        routineData,
    } = useWorkoutData();

    const removeExercise = (exerciseId: number) => {
        if (!workoutData) return;
        const updatedExercises = removeItem(workoutData.exercises, exerciseId);

        setWorkoutData({ ...workoutData, exercises: updatedExercises });
    };

    return (
        <div className={styles.itemBox}>
            <div className={styles.itemBox2}>
                <div className={styles.item}>
                    {exerciseData &&
                        allExercises?.find(
                            (exercise) =>
                                exercise.id === exerciseData.exerciseId
                        )?.name}
                </div>
                <button
                    onClick={() => {
                        removeExercise(exerciseData.id);
                        dispatchIdMappings({
                            type: "DELETE_EXERCISE_MAPPING",
                            workoutExerciseId: exerciseData.id,
                        });
                    }}
                >
                    💣
                </button>
            </div>
            <div>
                <div>
                    {exerciseData.sets.map((set) => (
                        <div
                            key={set.id}
                        >{`set #${set.order} reps: ${set.reps}`}</div>
                    ))}
                </div>
                <div>
                    {routineData?.exercises
                        .find(
                            (exercise: routineExerciseObject) =>
                                exercise.id ===
                                idMappings.exerciseMap[exerciseData.id]
                        )
                        ?.sets.map((set) => (
                            <RoutineExerciseSetDisplayCard
                                key={set.id}
                                setData={set}
                                workoutExerciseId={exerciseData.id}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default WorkoutExerciseEditCard;
